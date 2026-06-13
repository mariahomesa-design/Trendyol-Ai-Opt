const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");
const { execFile } = require("node:child_process");
const { promisify } = require("node:util");

let sharp;
try {
  sharp = require("sharp");
} catch {
  sharp = null;
}
const execFileAsync = promisify(execFile);

try {
  process.loadEnvFile(path.join(__dirname, ".env.local"));
} catch {
  // Local env file is optional when credentials are supplied by the shell.
}

const PORT = Number(process.env.PORT || 4173);
const HOST = process.env.HOST || "0.0.0.0";
const ROOT = __dirname;
const EXPORT_DIR = "/Users/user/Documents/listing opt excel";
let OPENAI_API_KEY = sanitizeApiKey(process.env.OPENAI_API_KEY || "");
let OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-5.4-mini";
let OPENAI_IMAGE_MODEL = process.env.OPENAI_IMAGE_MODEL || "gpt-image-2";
let GOOGLE_API_KEY = sanitizeApiKey(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "");
let GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
let GEMINI_IMAGE_MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-3-pro-image-preview";
let IDEOGRAM_API_KEY = sanitizeApiKey(process.env.IDEOGRAM_API_KEY || "");
let IDEOGRAM_IMAGE_MODEL = process.env.IDEOGRAM_IMAGE_MODEL || "ideogram-v4-default";
let AI_ANALYSIS_PROVIDER = process.env.AI_ANALYSIS_PROVIDER || (OPENAI_API_KEY ? "openai" : "google");
let AI_IMAGE_PROVIDER = process.env.AI_IMAGE_PROVIDER || (OPENAI_API_KEY ? "openai" : "google");
const GENERATED_DIR = path.join(ROOT, "generated");
const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

function sanitizeApiKey(value) {
  return String(value || "").replace(/[\s\u00a0\u1680\u180e\u2000-\u200d\u2028\u2029\u202f\u205f\u2060\ufeff]/g, "");
}

function safeHeaderValue(value) {
  return String(value || "").replace(/[^\t\x20-\x7e]/g, "");
}

function sanitizeImageUrl(value) {
  const cleaned = String(value || "").trim().replace(/[\u00a0\u202f\u2007]/g, "");
  try {
    return encodeURI(cleaned);
  } catch {
    return cleaned;
  }
}

function safeImageMimeType(value) {
  const mimeType = String(value || "").split(";")[0].trim().toLowerCase();
  if (/^image\/[a-z0-9.+-]+$/.test(mimeType)) return mimeType;
  return "image/png";
}

const session = {
  sellerId: process.env.TRENDYOL_SELLER_ID || "",
  apiKey: process.env.TRENDYOL_API_KEY || "",
  apiSecret: process.env.TRENDYOL_API_SECRET || "",
  environment: process.env.TRENDYOL_ENV || "prod",
  storeFrontCode: process.env.TRENDYOL_STOREFRONT_CODE || "SA"
};
const categoryCache = new Map();

function rootUrl() {
  return session.environment === "stage"
    ? "https://stageapigw.trendyol.com"
    : "https://apigw.trendyol.com";
}

function authHeader() {
  return `Basic ${Buffer.from(`${session.apiKey}:${session.apiSecret}`).toString("base64")}`;
}

function hasCredentials() {
  return Boolean(session.sellerId && session.apiKey && session.apiSecret);
}

function publicBaseUrl(req) {
  const configured = String(process.env.PUBLIC_BASE_URL || "").trim();
  if (configured) return configured.replace(/\/+$/, "");
  const railwayDomain = String(process.env.RAILWAY_PUBLIC_DOMAIN || "").trim();
  if (railwayDomain) return `https://${railwayDomain}`.replace(/\/+$/, "");
  const forwardedProto = String(req.headers["x-forwarded-proto"] || "").split(",")[0].trim();
  const forwardedHost = String(req.headers["x-forwarded-host"] || req.headers.host || "").split(",")[0].trim();
  if (forwardedProto === "https" && forwardedHost && !/^(localhost|127\.0\.0\.1)(:|$)/i.test(forwardedHost)) {
    return `https://${forwardedHost}`;
  }
  return "";
}

function generatedPublicUrl(req, image) {
  if (/^https:\/\//i.test(String(image || ""))) return image;
  const base = publicBaseUrl(req);
  return base && String(image || "").startsWith("/") ? `${base}${image}` : "";
}

function friendlyOpenAiError(message) {
  const text = String(message || "");
  if (/rate limit reached|requests per day|rpd/i.test(text)) {
    const reset = text.match(/try again in\s+([^.\n]+)/i)?.[1];
    return `Daily OpenAI request limit reached.${reset ? ` Try again in ${reset}.` : ""} The app paused to avoid wasting requests.`;
  }
  if (/billing hard limit|quota|insufficient_quota/i.test(text)) {
    return "OpenAI project billing limit reached. Increase the project budget or add API credits, then try again.";
  }
  return text;
}

function friendlyGoogleAiError(message) {
  const text = String(message || "");
  if (/high demand|overload|temporar|service unavailable/i.test(text)) {
    return "Gemini image generation is temporarily busy. The app retried automatically; please try again shortly.";
  }
  if (/resource_exhausted|quota|rate limit|too many requests/i.test(text)) {
    return "Google AI request limit reached. Check the Gemini API quota, billing, or retry later.";
  }
  if (/api key not valid|invalid api key|permission_denied|unauthenticated/i.test(text)) {
    return "Google AI API key was rejected. Check the key in Google AI Studio and try again.";
  }
  return text;
}

function friendlyIdeogramError(message) {
  const text = String(message || "");
  if (/rate limit|too many requests|service unavailable|temporar/i.test(text)) {
    return "Ideogram image generation is temporarily busy or rate limited. Please retry shortly.";
  }
  if (/unauthorized|forbidden|api.?key|authentication/i.test(text)) {
    return "Ideogram API key was rejected. Check the API key in your Ideogram account.";
  }
  if (/payment|required|credit|billing/i.test(text)) {
    return "Ideogram API credits or billing are required. Ideogram subscriptions and API billing are separate.";
  }
  return text;
}

function providerKey(provider) {
  if (provider === "google") return sanitizeApiKey(GOOGLE_API_KEY);
  if (provider === "ideogram") return sanitizeApiKey(IDEOGRAM_API_KEY);
  return sanitizeApiKey(OPENAI_API_KEY);
}

function providerLabel(provider) {
  if (provider === "google") return "Google Gemini";
  if (provider === "ideogram") return "Ideogram";
  return "OpenAI";
}

const IDEOGRAM_MODEL_OPTIONS = {
  "ideogram-v4-turbo": {
    label: "Ideogram 4.0 Turbo",
    endpoint: "https://api.ideogram.ai/v1/ideogram-v4/remix",
    family: "v4",
    renderingSpeed: "TURBO",
    resolution: "1664x2496"
  },
  "ideogram-v4-default": {
    label: "Ideogram 4.0 Default",
    endpoint: "https://api.ideogram.ai/v1/ideogram-v4/remix",
    family: "v4",
    renderingSpeed: "DEFAULT",
    resolution: "1664x2496"
  },
  "ideogram-v4-quality": {
    label: "Ideogram 4.0 Quality",
    endpoint: "https://api.ideogram.ai/v1/ideogram-v4/remix",
    family: "v4",
    renderingSpeed: "QUALITY",
    resolution: "1664x2496"
  },
  "ideogram-v3-flash": {
    label: "Ideogram 3.0 Flash",
    endpoint: "https://api.ideogram.ai/v1/ideogram-v3/remix",
    family: "v3",
    renderingSpeed: "FLASH"
  },
  "ideogram-v3-turbo": {
    label: "Ideogram 3.0 Turbo",
    endpoint: "https://api.ideogram.ai/v1/ideogram-v3/remix",
    family: "v3",
    renderingSpeed: "TURBO"
  },
  "ideogram-v3-default": {
    label: "Ideogram 3.0 Default",
    endpoint: "https://api.ideogram.ai/v1/ideogram-v3/remix",
    family: "v3",
    renderingSpeed: "DEFAULT"
  },
  "ideogram-v3-quality": {
    label: "Ideogram 3.0 Quality",
    endpoint: "https://api.ideogram.ai/v1/ideogram-v3/remix",
    family: "v3",
    renderingSpeed: "QUALITY"
  },
  "ideogram-v3-character-turbo": {
    label: "Ideogram 3.0 Turbo with Character Reference",
    endpoint: "https://api.ideogram.ai/v1/ideogram-v3/remix",
    family: "v3",
    renderingSpeed: "TURBO",
    characterReference: true
  },
  "ideogram-v3-character-default": {
    label: "Ideogram 3.0 Default with Character Reference",
    endpoint: "https://api.ideogram.ai/v1/ideogram-v3/remix",
    family: "v3",
    renderingSpeed: "DEFAULT",
    characterReference: true
  },
  "ideogram-v3-character-quality": {
    label: "Ideogram 3.0 Quality with Character Reference",
    endpoint: "https://api.ideogram.ai/v1/ideogram-v3/remix",
    family: "v3",
    renderingSpeed: "QUALITY",
    characterReference: true
  },
  "ideogram-v2-turbo": {
    label: "Ideogram 2.0 Turbo",
    endpoint: "https://api.ideogram.ai/remix",
    family: "legacy",
    model: "V_2_TURBO"
  },
  "ideogram-v2-default": {
    label: "Ideogram 2.0 Default",
    endpoint: "https://api.ideogram.ai/remix",
    family: "legacy",
    model: "V_2"
  },
  "ideogram-v2a-turbo": {
    label: "Ideogram 2a Turbo",
    endpoint: "https://api.ideogram.ai/remix",
    family: "legacy",
    model: "V_2A_TURBO"
  },
  "ideogram-v2a-default": {
    label: "Ideogram 2a Default",
    endpoint: "https://api.ideogram.ai/remix",
    family: "legacy",
    model: "V_2A"
  },
  "ideogram-v1-turbo": {
    label: "Ideogram 1.0 Turbo",
    endpoint: "https://api.ideogram.ai/remix",
    family: "legacy",
    model: "V_1_TURBO"
  },
  "ideogram-v1-default": {
    label: "Ideogram 1.0 Default",
    endpoint: "https://api.ideogram.ai/remix",
    family: "legacy",
    model: "V_1"
  },
  "ideogram-edit": {
    label: "Ideogram Instructional Edit",
    endpoint: "https://api.ideogram.ai/v1/edit",
    family: "edit"
  }
};

function ideogramModelConfig(model) {
  return IDEOGRAM_MODEL_OPTIONS[model] || IDEOGRAM_MODEL_OPTIONS["ideogram-v4-default"];
}

async function requestJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
  });
  res.end(JSON.stringify(payload));
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function excelHtml(rows) {
  const headers = Object.keys(rows[0] || {});
  return `
    <html>
      <head><meta charset="UTF-8" /></head>
      <body>
        <table>
          <thead><tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead>
          <tbody>
            ${rows.map((row) => `<tr>${headers.map((header) => `<td>${escapeHtml(row[header])}</td>`).join("")}</tr>`).join("")}
          </tbody>
        </table>
      </body>
    </html>
  `;
}

function safeFilename(filename) {
  return String(filename || "TrendLift_export.xls")
    .replace(/[/:*?"<>|\\]/g, "-")
    .replace(/\s+/g, "_")
    .slice(0, 160);
}

function storefrontCandidates() {
  if (session.storeFrontCode) return [session.storeFrontCode];
  return ["", "TR", "SA", "AE", "KW", "QA", "BH", "OM", "DE", "RO", "GR"];
}

async function trendyolFetch(endpoint, options = {}) {
  if (!hasCredentials()) {
    const error = new Error("Missing Trendyol credentials. Add them in Settings first.");
    error.statusCode = 400;
    throw error;
  }

  const response = await fetch(`${rootUrl()}${endpoint}`, {
    ...options,
    headers: {
      Authorization: authHeader(),
      "Content-Type": "application/json",
      "User-Agent": `${session.sellerId} - SelfIntegration`,
      ...(options.storeFrontCode ? { storeFrontCode: options.storeFrontCode } : {}),
      ...(options.acceptLanguage ? { "Accept-Language": options.acceptLanguage } : {}),
      ...(options.headers || {})
    }
  });
  const text = await response.text();
  let body = {};
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = { raw: text };
  }
  if (!response.ok) {
    const error = new Error(body.message || body.error || `Trendyol API returned ${response.status}`);
    error.statusCode = response.status;
    error.body = body;
    throw error;
  }
  return body;
}

async function optimizeWithImage(listing) {
  if (!providerKey(AI_ANALYSIS_PROVIDER)) {
    const error = new Error(`${providerLabel(AI_ANALYSIS_PROVIDER)} image analysis is not configured. Add its API key in Settings.`);
    error.statusCode = 400;
    throw error;
  }
  const outputLanguage = listing.outputLanguage === "ar" ? "Arabic" : "English";
  const prompt = [
    "Inspect the image first. Identify the actual physical product.",
    "Compare it with the current title and description and flag any mismatch.",
    `Create one accurate ${outputLanguage} Trendyol Saudi Arabia product title and description for the product visible in the image.`,
    `Write the title, description, warning, detected product type and keywords in ${outputLanguage}.`,
    "The target marketplace is Saudi Arabia. Use natural Saudi marketplace wording and do not mention another marketplace or currency.",
    "Use only facts visible in the supplied listing fields and image.",
    "Never describe a different product type.",
    "Ignore any title, description, category, attribute or keyword that conflicts with the product visible in the image.",
    "Never include marketplace identifiers or system fields such as productMainId, contentId, variantId, barcode, stock code, model code, category ID or brand ID.",
    "Write natural customer-facing copy. Do not repeat awkward keyword phrases.",
    "The title must be between 90 and 100 characters, targeting as close to 100 characters as natural wording allows. Never exceed 100 characters.",
    "The description must be detailed and between 600 and 1000 characters, written as useful customer-facing paragraphs.",
    "The title must name the visible product clearly. The description must explain visible design, color, material, storage, shape and suitable use only when supported by the image.",
    "Return 5 concise customer search terms that describe the visible product in the requested language.",
    "Return a comprehensive bilingual attributes array using only details visible in the image. Include English and Arabic names and values for useful fields such as color, material, style, finish, shape, room or use, pattern, adjustable features, storage features and approximate dimensions only when visually supportable.",
    "Do not mention SEO, optimization, keywords, search volume, AI, or the listing process.",
    "Naturally include only relevant supplied keywords.",
    `Current title: ${listing.title || ""}`,
    `Current description: ${listing.description || ""}`,
    `Brand: ${listing.brand || ""}`,
    `Category: ${listing.category || ""}`,
    `Visible product attributes: ${JSON.stringify({
      color: listing.metadata?.color || "",
      material: listing.metadata?.material || "",
      size: listing.metadata?.size || ""
    })}`,
    `Relevant keyword candidates: ${(listing.keywords || []).map((keyword) => keyword.term).join(", ")}`,
    'Return only JSON: {"detectedProductType":"...","suggestedCategory":"...","mismatch":true,"warning":"...","title":"...","description":"...","color":"...","material":"...","keywords":["..."],"attributes":[{"attributeName":"...","attributeNameAr":"...","customAttributeValue":"...","customAttributeValueAr":"..."}]}'
  ].join("\n");
  let result = await requestStructuredAnalysis(prompt, listing.image);
  result = normalizeAnalysisResult(result);

  for (let attempt = 0; attempt < 4 && analysisValidationError(result); attempt += 1) {
    const repairPrompt = [
      `Rewrite this ${outputLanguage} Saudi marketplace listing while preserving the identified product facts.`,
      "Return the same JSON keys only.",
      "The title MUST contain 90-100 characters, including spaces, and should naturally approach 100 characters.",
      "The description MUST contain 600-1000 characters and use useful customer-facing paragraphs.",
      "Keep five concise product search terms.",
      "Keep a complete attributes array containing only visible product facts.",
      "Do not include IDs, barcode, stock code, model code, SEO commentary, or unsupported product claims.",
      `Validation problem: ${analysisValidationError(result)}`,
      `Draft JSON: ${JSON.stringify(result)}`,
      'Return only JSON: {"detectedProductType":"...","suggestedCategory":"...","mismatch":true,"warning":"...","title":"...","description":"...","color":"...","material":"...","keywords":["..."],"attributes":[{"attributeName":"...","attributeNameAr":"...","customAttributeValue":"...","customAttributeValueAr":"..."}]}'
    ].join("\n");
    result = normalizeAnalysisResult(await requestStructuredAnalysis(repairPrompt, listing.image));
  }

  const validationError = analysisValidationError(result);
  if (validationError) throw new Error(`Image analysis could not prepare valid listing copy: ${validationError}`);
  return result;
}

async function requestStructuredAnalysis(prompt, image) {
  if (AI_ANALYSIS_PROVIDER === "google") {
    return requestGeminiStructuredAnalysis(prompt, image);
  }
  return requestOpenAiStructuredAnalysis(prompt, image);
}

async function requestOpenAiStructuredAnalysis(prompt, image) {
  const content = [{ type: "input_text", text: prompt }];
  if (image) content.push({ type: "input_image", image_url: image });
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: safeHeaderValue(`Bearer ${providerKey("openai")}`),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      input: [{ role: "user", content }]
    })
  });
  const body = await response.json();
  if (!response.ok) {
    const error = new Error(friendlyOpenAiError(body.error?.message || `OpenAI returned ${response.status}`));
    error.statusCode = response.status;
    error.provider = "openai";
    throw error;
  }
  const text = (body.output || [])
    .flatMap((item) => item.content || [])
    .find((item) => item.type === "output_text")?.text || "";
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("Image-aware AI returned an invalid response.");
  return JSON.parse(match[0]);
}

async function imageToGeminiPart(image) {
  const dataMatch = String(image || "").match(/^data:(image\/(?:png|jpeg|webp|heic|heif));base64,(.+)$/i);
  if (dataMatch) {
    return { inline_data: { mime_type: dataMatch[1].toLowerCase(), data: dataMatch[2] } };
  }
  if (!/^https?:\/\//i.test(String(image || ""))) {
    throw new Error("Google AI requires a valid uploaded image or public image URL.");
  }
  const imageUrl = sanitizeImageUrl(image);
  const response = await fetch(imageUrl);
  if (!response.ok) throw new Error(`Could not download the product image (${response.status}).`);
  const mimeType = safeImageMimeType(response.headers.get("content-type"));
  if (!/^image\/(png|jpeg|webp|heic|heif)$/i.test(mimeType)) {
    throw new Error("The product image format is not supported by Google AI.");
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length > 18 * 1024 * 1024) throw new Error("The product image is too large for inline Google AI analysis.");
  return { inline_data: { mime_type: mimeType, data: bytes.toString("base64") } };
}

async function requestGeminiStructuredAnalysis(prompt, image) {
  const parts = [{ text: prompt }];
  if (image) parts.unshift(await imageToGeminiPart(image));
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(GEMINI_MODEL)}:generateContent`,
    {
      method: "POST",
      headers: {
        "x-goog-api-key": safeHeaderValue(providerKey("google")),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{ role: "user", parts }],
        generationConfig: { responseMimeType: "application/json" }
      })
    }
  );
  const body = await response.json();
  if (!response.ok) {
    const error = new Error(friendlyGoogleAiError(body.error?.message || `Google AI returned ${response.status}`));
    error.statusCode = response.status;
    error.provider = "google";
    throw error;
  }
  const text = (body.candidates?.[0]?.content?.parts || []).map((part) => part.text || "").join("");
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("Google AI returned an invalid product-analysis response.");
  return JSON.parse(match[0]);
}

function normalizeAnalysisResult(value) {
  const result = { ...value };
  result.title = sanitizeGeneratedCopy(result.title).slice(0, 100).trim();
  result.description = sanitizeGeneratedCopy(result.description);
  result.warning = sanitizeGeneratedCopy(result.warning);
  result.detectedProductType = sanitizeGeneratedCopy(result.detectedProductType);
  result.suggestedCategory = sanitizeGeneratedCopy(result.suggestedCategory);
  result.keywords = Array.isArray(result.keywords)
    ? result.keywords.map(sanitizeGeneratedCopy).filter(Boolean)
    : [];
  result.attributes = Array.isArray(result.attributes)
    ? result.attributes
      .map((attribute) => ({
        attributeName: sanitizeGeneratedCopy(attribute?.attributeName),
        attributeNameAr: sanitizeGeneratedCopy(attribute?.attributeNameAr),
        customAttributeValue: sanitizeGeneratedCopy(attribute?.customAttributeValue),
        customAttributeValueAr: sanitizeGeneratedCopy(attribute?.customAttributeValueAr)
      }))
      .filter((attribute) => attribute.attributeName && attribute.customAttributeValue)
    : [];
  return result;
}

function analysisValidationError(result) {
  if (!result.title || !result.description || containsTechnicalIdentifier(result.title) || containsTechnicalIdentifier(result.description)) {
    return "the generated copy was empty or contained marketplace system identifiers";
  }
  if (result.title.length > 100) {
    return `the title was ${result.title.length} characters and exceeded the 100-character maximum`;
  }
  if (result.description.length < 500) {
    return `the description was ${result.description.length} characters instead of at least 500`;
  }
  if (!result.keywords.length) return "no product search terms were returned";
  return "";
}

function containsTechnicalIdentifier(value) {
  return /\b(product\s*main\s*id|productmainid|content\s*id|variant\s*id|category\s*id|brand\s*id|stock\s*code|model\s*code|barcode)\b/i.test(String(value || ""));
}

function sanitizeGeneratedCopy(value) {
  return String(value || "")
    .split(/(?<=[.!?])\s+/)
    .filter((sentence) => !containsTechnicalIdentifier(sentence))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function flattenCategories(categories, parentPath = []) {
  return (Array.isArray(categories) ? categories : []).flatMap((category) => {
    const name = String(category.name || category.categoryName || "").trim();
    const pathParts = [...parentPath, name].filter(Boolean);
    const children = category.subCategories || category.children || [];
    const current = [{
      id: Number(category.id || category.categoryId),
      name,
      path: pathParts.join(" > "),
      leaf: !children.length
    }];
    return [...current, ...flattenCategories(children, pathParts)];
  });
}

function categoryMatchScore(category, query) {
  const queryWords = String(query || "").toLowerCase().split(/[^\p{L}\p{N}]+/u).filter((word) => word.length > 2);
  const text = `${category.name} ${category.path}`.toLowerCase();
  return queryWords.reduce((score, word) => score + (text.includes(word) ? 4 : 0), 0)
    + (text.includes(String(query || "").toLowerCase()) ? 10 : 0)
    + (category.leaf ? 2 : 0);
}

async function fetchProductCategories(language = "en") {
  const cacheKey = `${session.environment}:${session.storeFrontCode || "SA"}:${language}`;
  const cached = categoryCache.get(cacheKey);
  if (cached && Date.now() - cached.createdAt < 30 * 60 * 1000) return cached.categories;
  const body = await trendyolFetch("/integration/product/product-categories", {
    method: "GET",
    storeFrontCode: "SA",
    acceptLanguage: language
  });
  const categories = flattenCategories(body.categories || body.content || body)
    .filter((category) => category.id && category.name)
    .sort((a, b) => String(a.path || a.name).localeCompare(String(b.path || b.name), language));
  categoryCache.set(cacheKey, { createdAt: Date.now(), categories });
  return categories;
}

function normalizedAttributeText(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .toLowerCase();
}

async function fetchCategoryAttributes(categoryId) {
  if (!Number(categoryId)) return [];
  const body = await trendyolFetch(`/integration/product/product-categories/${categoryId}/attributes`, {
    method: "GET",
    storeFrontCode: session.storeFrontCode,
    acceptLanguage: "en"
  });
  return body.categoryAttributes || body.attributes || body.content || [];
}

function categoryAttributeId(entry) {
  return Number(entry.attribute?.id || entry.attributeId || entry.id);
}

function categoryAttributeName(entry) {
  return String(entry.attribute?.name || entry.name || entry.attributeName || "").trim();
}

function categoryAttributeRequired(entry) {
  const value = entry.required ?? entry.mandatory ?? entry.isRequired;
  return value === true || value === 1 || String(value).toLowerCase() === "true";
}

function categoryAttributeValues(entry) {
  return entry.attributeValues || entry.values || [];
}

function unresolvedRequiredAttributes(categoryAttributes, resolved) {
  const resolvedIds = new Set(resolved.map((attribute) => Number(attribute.attributeId)));
  return categoryAttributes
    .filter((entry) => categoryAttributeRequired(entry) && !resolvedIds.has(categoryAttributeId(entry)))
    .map((entry) => ({
      attributeId: categoryAttributeId(entry),
      name: categoryAttributeName(entry),
      allowCustom: Boolean(entry.allowCustom || entry.allowCustomValue),
      values: categoryAttributeValues(entry).slice(0, 100).map((value) => ({
        id: Number(value.id || value.attributeValueId),
        name: String(value.name || value.value || value.attributeValue || "").trim()
      })).filter((value) => value.id && value.name)
    }));
}

function mergeResolvedAttributes(...groups) {
  const merged = new Map();
  groups.flat().forEach((attribute) => {
    const attributeId = Number(attribute?.attributeId);
    if (!attributeId) return;
    if (!Number(attribute.attributeValueId) && !String(attribute.customAttributeValue || "").trim()) return;
    merged.set(attributeId, {
      attributeId,
      ...(Number(attribute.attributeValueId)
        ? { attributeValueId: Number(attribute.attributeValueId) }
        : { customAttributeValue: String(attribute.customAttributeValue).trim() })
    });
  });
  return [...merged.values()];
}

async function resolveCategoryAttributes(categoryId, suppliedAttributes, categoryAttributes = null) {
  const attributes = Array.isArray(suppliedAttributes) ? suppliedAttributes : [];
  const alreadyResolved = attributes.filter((attribute) => Number(attribute?.attributeId));
  const aiAttributes = attributes.filter((attribute) =>
    !Number(attribute?.attributeId) && attribute?.attributeName && attribute?.customAttributeValue
  );
  if (!aiAttributes.length || !hasCredentials()) return mergeResolvedAttributes(alreadyResolved);
  const availableAttributes = categoryAttributes || await fetchCategoryAttributes(categoryId);
  const resolved = [...alreadyResolved];

  for (const aiAttribute of aiAttributes) {
    const requestedName = normalizedAttributeText(aiAttribute.attributeName);
    const requestedValue = normalizedAttributeText(aiAttribute.customAttributeValue);
    const categoryAttribute = availableAttributes.find((entry) => {
      const name = normalizedAttributeText(entry.attribute?.name || entry.name || entry.attributeName);
      return name === requestedName || name.includes(requestedName) || requestedName.includes(name);
    });
    if (!categoryAttribute) continue;
    const attributeId = Number(categoryAttribute.attribute?.id || categoryAttribute.attributeId || categoryAttribute.id);
    if (!attributeId) continue;
    const values = categoryAttributeValues(categoryAttribute);
    const matchedValue = values.find((entry) => {
      const value = normalizedAttributeText(entry.name || entry.value || entry.attributeValue);
      return value === requestedValue || value.includes(requestedValue) || requestedValue.includes(value);
    });
    if (matchedValue) {
      resolved.push({
        attributeId,
        attributeValueId: Number(matchedValue.id || matchedValue.attributeValueId)
      });
    } else if (categoryAttribute.allowCustom || categoryAttribute.allowCustomValue) {
      resolved.push({
        attributeId,
        customAttributeValue: String(aiAttribute.customAttributeValue).trim()
      });
    }
  }
  return mergeResolvedAttributes(resolved);
}

async function prepareCategoryAttributes(categoryId, suppliedAttributes, image, productContext = {}) {
  const categoryAttributes = await fetchCategoryAttributes(categoryId);
  let resolved = await resolveCategoryAttributes(categoryId, suppliedAttributes, categoryAttributes);
  let missing = unresolvedRequiredAttributes(categoryAttributes, resolved);

  let aiWarning = "";
  if (missing.length && image && providerKey(AI_ANALYSIS_PROVIDER)) {
    const schema = missing.map((attribute) => ({
      attributeId: attribute.attributeId,
      name: attribute.name,
      allowCustom: attribute.allowCustom,
      allowedValues: attribute.values
    }));
    try {
      const result = await requestStructuredAnalysis([
        "Inspect the product image and complete the mandatory Trendyol category attributes.",
        "Choose only an allowed attributeValueId from the supplied schema when allowed values exist.",
        "Use customAttributeValue only when allowCustom is true.",
        "Do not invent dimensions, certifications, warranty, age, gender, origin, or materials that cannot be supported by the image or supplied product details.",
        "Omit an attribute when there is not enough evidence. The app will ask the seller to complete it.",
        `Product title: ${productContext.title || ""}`,
        `Product description: ${productContext.description || ""}`,
        `Detected product type: ${productContext.productType || ""}`,
        `Mandatory attribute schema: ${JSON.stringify(schema)}`,
        'Return only JSON: {"attributes":[{"attributeId":123,"attributeValueId":456},{"attributeId":789,"customAttributeValue":"value"}]}'
      ].join("\n"), image);

      const allowedById = new Map(missing.map((attribute) => [attribute.attributeId, attribute]));
      const aiResolved = (Array.isArray(result.attributes) ? result.attributes : []).flatMap((attribute) => {
        const attributeId = Number(attribute.attributeId);
        const schemaAttribute = allowedById.get(attributeId);
        if (!schemaAttribute) return [];
        const attributeValueId = Number(attribute.attributeValueId);
        if (attributeValueId && schemaAttribute.values.some((value) => value.id === attributeValueId)) {
          return [{ attributeId, attributeValueId }];
        }
        const customAttributeValue = String(attribute.customAttributeValue || "").trim();
        if (customAttributeValue && schemaAttribute.allowCustom) {
          return [{ attributeId, customAttributeValue }];
        }
        return [];
      });
      resolved = mergeResolvedAttributes(resolved, aiResolved);
      missing = unresolvedRequiredAttributes(categoryAttributes, resolved);
    } catch (error) {
      aiWarning = error.message || "AI could not complete category attributes.";
    }
  }

  return {
    attributes: resolved,
    missingRequiredAttributes: missing.map(({ attributeId, name, allowCustom, values }) => ({
      attributeId,
      name,
      allowCustom,
      values: values.slice(0, 20)
    })),
    requiredCount: categoryAttributes.filter(categoryAttributeRequired).length,
    aiWarning
  };
}

async function analyzeNewProductImage(image, outputLanguage = "en") {
  return optimizeWithImage({
    title: "",
    description: "",
    brand: "",
    category: "",
    metadata: {},
    keywords: [],
    image,
    outputLanguage
  });
}

function dataUrlToBlob(dataUrl) {
  const match = String(dataUrl).match(/^data:(.+?);base64,(.+)$/);
  if (!match) throw new Error("Invalid uploaded image.");
  return new Blob([Buffer.from(match[2], "base64")], { type: safeImageMimeType(match[1]) });
}

async function imageInputToBlob(image) {
  if (/^data:/i.test(String(image || ""))) return dataUrlToBlob(image);
  const imageUrl = sanitizeImageUrl(image);
  if (!/^https:\/\//i.test(imageUrl)) throw new Error("A valid product image is required.");
  const response = await fetch(imageUrl);
  if (!response.ok) throw new Error(`Could not download the product image (${response.status}).`);
  const contentType = safeImageMimeType(response.headers.get("content-type"));
  const bytes = Buffer.from(await response.arrayBuffer());
  if (!bytes.length || bytes.length > 20 * 1024 * 1024) throw new Error("The product image is empty or too large.");
  return new Blob([bytes], { type: contentType });
}

const FURNITURE_IMAGE_GUIDES = [
  {
    name: "dining chair",
    match: ["dining chair", "dining chairs", "kitchen chair", "cane dining chair", "rattan dining chair", "كرسي طعام", "كراسي طعام"],
    scenes: {
      diningChairHero: "Image 1: close dining-room lifestyle hero. One dining chair is the main subject beside a dining table, with another matching chair partially visible when natural. Keep the same realistic photographer composition style: bright daylight, warm natural wood, white walls, large windows, rug, table decor, sharp HD detail and no humans.",
      diningChairSet: "Image 2: full dining room lifestyle set. Show a saleable set of four to six matching dining chairs around a dining table in the same bright room family, captured straight-on like a professional furniture catalog photo. The room decor can change, but the camera height, clean composition and realistic photographer quality must stay consistent.",
      diningChairRoomAngle: "Image 3: elevated wide dining-room angle. Show the same dining chair design as a full dining setup from above or a higher corner angle, with the dining table, rug, windows and sideboard visible. It must look like the same photoshoot in one real room, not a render or collage.",
      diningChairAlternateAngle: "Image 4: alternate close lifestyle angle. Capture the dining chair beside the dining table from another realistic photographer angle, showing chair back/seat detail, table edge, rug and room context. Keep it sharp, natural and consistent with the same room-series look.",
      white: "Image 5: clean HD marketplace catalog image on a pure white background. Show exactly one dining chair, fully visible at a flattering three-quarter front angle, crisp cane/rattan/wood/fabric texture, accurate shape, no props, no logo, no text and subtle contact shadow."
    }
  },
  {
    name: "hanging wall mirror",
    match: ["hanging mirror", "wall mirror", "round mirror", "bathroom mirror", "vanity mirror", "decorative mirror", "مرآة جدارية", "مراية جدارية", "مرآة حائط", "مراية حائط"],
    scenes: {
      wallMirrorHero: "Image 1: close HD lifestyle hero focused on the hanging wall mirror. Mirror is the main subject, mounted above a console or cabinet in a warm premium home setting, with clean wall, decor, natural sunlight, realistic reflection and very sharp frame detail.",
      wallMirrorLifestyle: "Image 2: second lifestyle image with the same mirror size and shape consistency, placed above a vanity, cabinet or console in the same premium home style. Keep correct scale, warm natural daylight, clean beige/neutral interior and realistic reflection.",
      wallMirrorDetail: "Image 3: close-up detail photograph of the mirror edge and frame. Crop into the round or shaped frame with clean wall background, sharp HD frame finish, mirror surface detail and realistic product-material focus.",
      wallMirrorSize: "Image 4: clean dimensions image. Mirror centered on a white/light background with enough empty space for the app to add simple grey measurement lines and cm labels. Do not render any text, numbers, inches or arrows yourself.",
      wallMirrorWhite: "Image 5: clear HD white-background catalog image. Show exactly one hanging wall mirror centered and fully visible, accurate frame color/shape/thickness, clean reflective surface, subtle contact shadow if needed, no props, no text and no logo."
    }
  },
  {
    name: "decorative vase",
    match: ["vase", "flower vase", "ceramic vase", "decorative vase", "ribbed vase", "مزهرية", "فازة"],
    scenes: {
      vaseHero: "Image 1: clear lifestyle hero of the vase as the main focus on a light table or corner surface, soft beige/white wall background, natural light, flowers or dried stems inside, clean realistic texture and premium minimal home styling.",
      vaseLifestyle: "Image 2: second clear lifestyle photo with the same vase design in a warm beige/white decor setting, shallow background, dried flowers or pampas, and a second matching vase only if it helps show the set. Keep the product sharp and premium.",
      vaseFeatures: "Image 3: feature/detail image showing ribbed texture and minimalist design with clean beige background and space for app-added labels. Product texture must be sharp, elegant and close-up.",
      vaseSize: "Image 4: clean size base image on white background with the vase fully visible and enough blank space for the app to add cm measurement lines and the +/-2 cm note. Do not render inches or any text yourself.",
      vaseWhite: "Image 5: pure white-background catalog image of exactly one vase, very clear, product fills the frame tastefully, ribbed texture sharp, no flowers, no props, no text and no logo."
    }
  },
  {
    name: "sofa",
    match: ["sofa", "couch", "loveseat", "sectional", "كنبة", "اريكة"],
    scenes: {
      hero: "Lifestyle hero in a premium Saudi living room, full sofa visible, no humans.",
      lifestyle: "Living room lifestyle from another angle with realistic decor and scale.",
      features: "Feature image for upholstery, frame, legs, cushions and practical benefits.",
      size: "Dimensions image with multiple sofa angles and simple average cm values only.",
      detail: "Fabric close-up image showing weave, texture, stitching and material quality.",
      benefits: "Seating capacity and comfort image showing cushions, depth and everyday relaxation."
    }
  },
  {
    name: "chair",
    match: ["chair", "armchair", "dining chair", "office chair", "lounge chair", "bar stool", "stool", "كرسي"],
    scenes: {
      hero: "Lifestyle hero in the correct room: office chair in office, lounge chair in lounge, dining chair in dining room, bar stool at counter.",
      lifestyle: "Lifestyle image from another direction; for dining chairs or bar stools show a saleable set only when appropriate.",
      features: "Feature image for back support, legs, upholstery, frame and finish.",
      size: "Dimensions image with multiple chair angles and simple average cm values only.",
      detail: "Material detail image showing fabric, leather, wood, metal or stitching close-up.",
      benefits: "Comfort and usage image showing ergonomic shape, seat comfort and intended room use without humans."
    }
  },
  {
    name: "dining table",
    match: ["dining table", "dining set", "kitchen table", "طاولة طعام", "سفرة"],
    scenes: {
      hero: "Bright dining room lifestyle hero with the table fully visible and styled for Saudi home dining. Use airy daylight, white or warm neutral walls, light flooring, premium decor and clean HD exposure. Avoid dark rooms, heavy shadows and moody lighting.",
      lifestyle: "Bright dining room lifestyle from another direction with realistic chairs only if they support the table presentation. Keep the room sunlit, fresh, clean and upscale, with the table clearly visible and not underexposed.",
      features: "Bright feature image for tabletop, base, finish, stability and easy cleaning. Use light studio-lifestyle styling, clear surface detail and crisp HD exposure without dark backgrounds.",
      size: "Clean bright dimensions image with multiple table angles and simple average cm values only. Use a white or very light background, balanced spacing and no dark shadows.",
      detail: "Bright marble or wood close-up image showing surface texture, edge profile and finish. Use soft daylight or studio light so the material looks premium, sharp and not dark.",
      benefits: "Bright seating capacity image showing practical family dining capacity without crowded styling. Use an airy Saudi dining-room scene with natural daylight and clear table visibility."
    }
  },
  {
    name: "coffee table",
    match: ["coffee table", "center table", "side table", "طاولة قهوة", "طاولة وسط"],
    scenes: {
      hero: "Lifestyle hero in a living room seating area with the coffee table fully visible.",
      lifestyle: "Lifestyle image from another angle with sofa, rug and decor used only as context.",
      features: "Feature image for surface, legs, storage shelf, finish and easy styling.",
      size: "Dimensions image with multiple table angles and simple average cm values only.",
      detail: "Material detail close-up showing wood, marble, glass, metal or surface finish.",
      benefits: "Styling inspiration image showing tasteful decor placement and daily living use."
    }
  },
  {
    name: "bed",
    match: ["bed", "bed frame", "headboard", "سرير", "لوح سرير"],
    scenes: {
      hero: "Bedroom lifestyle hero with the bed fully visible in a premium calm bedroom.",
      lifestyle: "Bedroom lifestyle from another direction with bedding and nightstands as realistic context.",
      features: "Feature image for frame, support, upholstery, legs and finish.",
      size: "Dimensions image with multiple bed angles and simple average cm values only.",
      detail: "Headboard detail close-up showing upholstery, stitching, wood or panel texture.",
      benefits: "Storage or comfort benefits image showing under-bed storage, support or comfort details when relevant."
    }
  },
  {
    name: "shoe cabinet / storage",
    match: ["shoe cabinet", "shoe rack", "storage cabinet", "cabinet", "wardrobe", "dresser", "خزانة", "جزامة", "تخزين"],
    scenes: {
      hero: "Entryway lifestyle hero with the storage or shoe cabinet fully visible and correctly placed.",
      lifestyle: "Entryway lifestyle from another direction with realistic shoes or decor only as supporting context.",
      features: "Feature image for doors, shelves, handles, ventilation, legs and finish.",
      size: "Dimensions image with multiple cabinet angles and simple average cm values only.",
      detail: "Material detail close-up showing wood grain, rattan, carving, handle or surface finish.",
      benefits: "Storage capacity image showing organized shelves or compartments without clutter."
    }
  },
  {
    name: "mirror",
    match: ["mirror", "standing mirror", "wall mirror", "مرآة", "مراية"],
    scenes: {
      hero: "Lifestyle hero with the mirror correctly placed in bedroom, entryway or living area.",
      lifestyle: "Lifestyle image from another angle showing how the mirror improves the room.",
      features: "Feature image for frame, shape, mounting, finish and reflective surface.",
      size: "Dimensions image with multiple mirror angles and simple average cm values only.",
      detail: "Frame detail close-up showing texture, material, edge and finish.",
      benefits: "Room enhancement image showing brightness, depth and decorative impact."
    }
  },
  {
    name: "wall art",
    match: ["wall art", "canvas", "painting", "frame art", "decorative panel", "لوحة", "فن جداري"],
    scenes: {
      hero: "Lifestyle wall hero with the artwork correctly placed on a living room, dining or hallway wall.",
      lifestyle: "Lifestyle wall image from another room angle with realistic decor and scale.",
      features: "Feature image for print quality, frame, hanging style, texture and finish.",
      size: "Dimensions image with multiple art angles and simple average cm values only.",
      detail: "Texture detail close-up showing canvas, print, relief, frame or surface detail.",
      benefits: "Decor inspiration image showing room styling and wall enhancement."
    }
  }
];

function imageGuideFor(productType, title) {
  const haystack = `${productType || ""} ${title || ""}`.toLowerCase();
  const guide = FURNITURE_IMAGE_GUIDES.find((item) => item.match.some((word) => haystack.includes(word)));
  if (guide) return guide;
  return {
    name: productType || "furniture product",
    scenes: {
      hero: "Lifestyle hero in the most suitable room for this product category, full product visible, no humans.",
      lifestyle: "Second lifestyle image from another direction in a correct real-use environment.",
      features: "Feature image highlighting visible construction, material, finish and practical benefits.",
      size: "Dimensions image with multiple product angles and simple average cm values only.",
      detail: "Material or texture close-up showing the most important product detail.",
      benefits: "Usage, capacity, comfort, styling or storage benefit image depending on what the product is."
    }
  };
}

const PRODUCT_IMAGE_SCENES = {
  diningChairHero: {
    label: "Dining chair hero",
    prompt: "Create image 1 for a dining chair: a premium realistic dining-room lifestyle photograph. Place the exact reference chair beside a dining table as the main subject, with one matching chair partially visible only if it feels natural. Match this style: professional furniture photographer, bright natural daylight through large windows, warm wood floor, white or soft neutral walls, light rug, clean table styling, crisp cane/rattan/wood/fabric detail, accurate shadows, no humans and no text. Keep the chair fully clear and sharp. The room environment may vary between listings, but composition, camera height and chair placement must feel like a real catalog photoshoot series."
  },
  diningChairSet: {
    label: "Dining chair set lifestyle",
    prompt: "Create image 2 for a dining chair: a full dining room lifestyle set photograph. Use the exact reference chair design as a saleable set of four to six matching chairs around a dining table. Keep all chairs consistent in shape, material, color, woven pattern, cushion and legs. Use a bright realistic dining room with windows, rug, table decor and warm natural wood. Straight professional catalog composition, sharp HD detail, no humans, no text, no distorted chairs, no duplicate artifacts."
  },
  diningChairRoomAngle: {
    label: "Dining room wide angle",
    prompt: "Create image 3 for a dining chair: an elevated wide-angle dining-room photograph from another photographer angle. Show the same reference chair design around the table in a complete realistic room with rug, sideboard or cabinet, windows and soft daylight. It should look like the same product photoshoot in one room, captured from above or a higher corner angle. Keep furniture scale correct, materials sharp, no humans, no text and no AI blur."
  },
  diningChairAlternateAngle: {
    label: "Dining chair alternate angle",
    prompt: "Create image 4 for a dining chair: a close alternate lifestyle photograph from another realistic camera angle. Place the exact chair beside the dining table, showing the chair back, seat cushion, legs and table edge with room context. Keep the same bright dining room photoshoot feeling, natural daylight, realistic lens perspective, crisp product texture, no humans, no text, no extra logos and no distorted duplicated chairs."
  },
  wallMirrorHero: {
    label: "Wall mirror hero",
    prompt: "Create image 1 for a hanging wall mirror: a very clear HD close lifestyle hero photograph. The mirror must be the main focus, mounted on a clean warm wall above a wood console, cabinet or shelf with tasteful decor such as books, vase or bowl. Use premium home interior styling, soft natural sunlight, realistic wall shadows, accurate mirror reflection, crisp frame edge, no humans and no text. Keep the mirror size, shape, frame color and thickness exactly faithful to the uploaded reference."
  },
  wallMirrorLifestyle: {
    label: "Wall mirror lifestyle",
    prompt: "Create image 2 for a hanging wall mirror: a second premium lifestyle photo in the same high-end home style, such as above a bathroom vanity, rattan cabinet, console or sink. Keep the exact same mirror size, shape and frame proportion as image 1. Show realistic scale, clean beige/neutral walls, warm natural daylight, premium decor, sharp HD reflection and frame detail. No humans, no text, no extra logos and no distorted reflection."
  },
  wallMirrorDetail: {
    label: "Mirror frame close-up",
    prompt: "Create image 3 for a hanging wall mirror: a close-up product detail photograph of the mirror frame and edge. Crop into the frame curve or side profile so the frame finish, bevel, metal or wood texture and mirror surface are very clear. Use a clean light wall background, professional macro/product photography, sharp HD focus, no text, no props, no humans and no logo."
  },
  wallMirrorSize: {
    label: "Mirror cm dimensions",
    prompt: "Create image 4 for a hanging wall mirror: a clean catalog dimension base image on a white or very light grey background. Center exactly one mirror, fully visible, front-facing, with enough blank space around it for the app to add grey measurement lines and cm labels. Do not render any words, numbers, inch marks, arrows, measurement lines or logos yourself. Keep the mirror shape, frame thickness and color accurate and sharp.",
    geminiPrompt: "Create image 4 for a hanging wall mirror: clean white/light grey catalog base image, one centered front-facing mirror, fully visible, accurate frame and reflection, with generous empty space for measurement overlay. Do not render text, numbers, inches, arrows, logos or measurement lines."
  },
  wallMirrorWhite: {
    label: "Mirror white background",
    prompt: "Create image 5 for a hanging wall mirror: a very clear HD marketplace catalog photograph on a pure white background. Show exactly one mirror centered and fully visible, front-facing or very slight three-quarter if needed to show frame thickness. Preserve the exact shape, frame color, thickness, mirror surface and proportions from the reference. No props, no text, no humans, no logo, clean soft shadow only."
  },
  vaseHero: {
    label: "Vase lifestyle hero",
    prompt: "Create image 1 for a decorative vase: a clear premium lifestyle hero photograph. Place the exact reference vase as the main focus on a light table, shelf or clean corner surface against a soft beige/white wall. Add tasteful dried stems, flowers or pampas inside only if suitable for the vase, with natural daylight, soft shadows, realistic ceramic/glass/stone texture, and clean minimal home styling. No humans, no text, no extra logos. Keep the vase shape, ribbed texture, color, opening and proportions faithful to the reference."
  },
  vaseLifestyle: {
    label: "Vase lifestyle",
    prompt: "Create image 2 for a decorative vase: a second clear lifestyle photograph in the same warm minimal home style. Show the vase with dried flowers or pampas on a white/light table surface, soft beige background and shallow depth of field. A second matching vase may appear only if the product is a set or if it helps show styling; keep every vase consistent with the reference. Premium realistic product photography, no humans, no text, no logo, no distorted shapes."
  },
  vaseFeatures: {
    label: "Vase feature detail",
    prompt: "Create image 3 for a decorative vase: a feature/detail base image like a premium Amazon product feature photo. Show two clean close-up views of the exact vase on a soft beige/cream background: one angled view focusing on the opening and ribbed side texture, and one bottom/base or side texture view. Leave clean space in the upper-left and lower-right for the app to add the words Ribbed Texture and Minimalist Design. Do not render words, letters, badges, arrows or logos yourself. Keep ceramic/material texture sharp, elegant and bright.",
    geminiPrompt: "Create image 3 for a decorative vase: clean premium feature/detail base image with two close-up views of the exact vase, ribbed texture and minimalist design on beige/cream background. Leave space upper-left and lower-right for labels. Do not render text, letters, badges, arrows or logos."
  },
  vaseSize: {
    label: "Vase cm dimensions",
    prompt: "Create image 4 for a decorative vase: a clean product size base image on a pure white/light background. Place the exact vase upright and fully visible slightly left of center, leaving large blank space at the top-left for a PRODUCT SIZE label and on the right for the app to add a size note. Do not render text, numbers, inch marks, arrows, measurement lines, reference cans or logos yourself. Keep the vase texture and shape accurate, bright and clear.",
    geminiPrompt: "Create image 4 for a decorative vase: clean white/light product-size base image, one upright vase slightly left of center, fully visible, accurate shape and ribbed texture, large blank space top-left and right for app overlay. Do not render text, numbers, inches, arrows, logos or measurement lines."
  },
  vaseWhite: {
    label: "Vase white background",
    prompt: "Create image 5 for a decorative vase: a very clear HD marketplace catalog photograph on a pure white background. Show exactly one vase only, no flowers, no props, centered and filling the frame tastefully, with accurate ribbed texture, opening, base, material color and proportions. No text, no humans, no logo, clean soft contact shadow only."
  },
  optimizationRequested: {
    label: "Optimized listing image",
    prompt: "Create a premium marketplace image for an existing listing using the seller's requested direction. Match the quality level of a professional furniture or home-decor brand photoshoot: realistic scale, crisp product detail, accurate material texture, natural lighting, clean composition, correct room context, and 1200 x 1800 portrait framing. Remove any existing logo, watermark, badge, text overlay, sticker, old brand mark or corner branding from the reference image and background. Leave one clean corner for the app to place the seller's uploaded logo afterward unless the seller asks for a pure white background. Do not invent a logo. Do not make a low-quality cutout, collage, render, duplicate product or blurry resized image."
  },
  hero: {
    label: "Hero lifestyle image",
    prompt: "Create image 1 of exactly 3: a lifestyle image showing the exact uploaded item in a natural setting. The product must be full, clear, sharp, realistically placed, and not cropped. Preserve the same item exactly: shape, color, material, pattern, legs, handles, frame, proportions and all visible details. Use a premium furniture-brand lifestyle scene with natural lighting and realistic shadows. No people, no text, no extra logos. Leave a clean corner for the seller logo."
  },
  lifestyle: {
    label: "Lifestyle image",
    prompt: "Create image 2 of exactly 3: another lifestyle image from a different angle. If the item is part of a set or naturally sold as multiples, such as dining chairs, bar stools, paired decor or a modular group, show the set clearly and realistically. If it is not a set, show only the same single item from another natural angle or position in the correct room. The product must remain full, clear, accurate and not cropped. No people, no text, no extra logos. Leave a clean corner for the seller logo."
  },
  elevated: {
    label: "Elevated room angle",
    prompt: "Create image 3: a premium lifestyle photograph captured from above or a higher corner angle, like a professional photographer standing above the room. Keep the same exact reference product in the same room style as images 1 and 2, with bright natural light, clean decor, correct scale, visible product details and a realistic full-room feeling. The product must remain accurate, sharp and not redesigned. No people, no text, no extra logos. Leave a clean corner for the seller logo."
  },
  features: {
    label: "Bilingual features image",
    prompt: "Create image 4: a feature/description base image in a premium Amazon-style furniture infographic layout. Keep the exact product large and clear in a beautiful lifestyle setting on the left/top area. Leave clean space on the right side and lower section for the app to add Arabic and English feature text, icons and small detail cards. The image should feel like a luxury product description graphic, not a simple bottom table. Do not render any words, letters, icons, arrows, badges, measurements or extra logos yourself; the app adds the typography afterward. Keep clean corner space for the seller logo.",
    geminiPrompt: "Create image 4: premium furniture feature infographic base. Exact product large and sharp in lifestyle setting on left/top, clean right side and lower section for app-added Arabic/English feature text, icons and cards. Do not render words, letters, icons, arrows, badges, logos or measurements."
  },
  size: {
    label: "Dimensions image",
    prompt: "Create image 5: a premium product dimensions base image like a clean furniture catalog. Show the exact product on a white or very light grey background with one large main view and, when helpful, one smaller detail or storage/inside view. Leave clear blank areas above and around the product for the app to add measurement arrows, cm labels and kg load labels. Do not render any words, numbers, inch marks, lbs, kg, arrows, measurement lines, logos or badges yourself. Keep the product color, material and proportions accurate and sharp.",
    geminiPrompt: "Create image 5: clean furniture dimensions base on white/light grey background, exact product large and sharp with optional small detail view. Leave blank space for app-added measurement arrows, cm labels and kg load labels. Do not render text, numbers, inches, lbs, kg, arrows, logos or measurement lines."
  },
  white: {
    label: "Pure white background image",
    prompt: "Create image 3 of exactly 3: a pure white-background marketplace image. Show the entire exact item perfectly, fully visible, centered, sharp and uncropped. Use a clean seamless white background with only a subtle realistic contact shadow. Preserve accurate color, material, pattern, texture, proportions and construction details. No props, no lifestyle room, no text, no people and absolutely no logo."
  }
};

async function generateProductImage({ image, productType, title, scene, customPrompt }) {
  if (!providerKey(AI_IMAGE_PROVIDER)) {
    const error = new Error(`${providerLabel(AI_IMAGE_PROVIDER)} image generation is not configured. Add its API key in Settings.`);
    error.statusCode = 400;
    throw error;
  }
  const sceneConfig = PRODUCT_IMAGE_SCENES[scene];
  if (!sceneConfig) {
    const error = new Error("Unknown product image scene.");
    error.statusCode = 400;
    throw error;
  }
  const guide = imageGuideFor(productType, title);
  const prompt = [
    `Edit the uploaded reference into a professional image of this exact ${productType || "product"} (${title || ""}).`,
    `Furniture category guide: ${guide.name}. Required scene purpose: ${guide.scenes[scene] || "Create the most suitable marketplace image for this furniture product."}`,
    guide.name === "dining chair" ? "Dining chair approved style reference: every lifestyle image must look like one clear professional photographer shot a matching dining chair collection in a bright real dining room. Use consistent realistic chair placement beside or around a dining table, natural daylight, white/neutral walls, warm wood floor, rug, large windows, tasteful table decor and luxury furniture-brand clarity. The room can change across listings, but the camera language and product realism must stay the same." : "",
    guide.name === "dining table" ? "Dining table approved style reference: make every dining table image look bright, airy and premium, like a luxury furniture-brand catalog shot in a Saudi dining room during daylight. Use white or warm neutral walls, large windows, light wood or marble tones, clean table styling, soft high-key exposure, crisp HD details and realistic shadows. Do not create dark interiors, brown-heavy rooms, dramatic low light, underexposed corners or gloomy contrast." : "",
    guide.name === "hanging wall mirror" ? "Hanging/wall mirror approved style reference: create a realistic premium home photoshoot series. The mirror must stay the same size, shape, frame color and thickness across all images. Lifestyle images should look like one professional photographer shot a clear HD mirror in a warm beige/neutral home, above a console, cabinet, vanity or sink, with natural sunlight, realistic reflection and clean decor. Detail and catalog images must be extra sharp and never blurry." : "",
    guide.name === "decorative vase" ? "Decorative vase approved style reference: create a clear premium ecommerce photoshoot series. Lifestyle images should use warm beige/white minimal interiors, light table or shelf surfaces, soft daylight, dried flowers or pampas when suitable, and very sharp vase texture. Feature images should show ribbed texture and minimalist design. Size and white-background images must be clean, bright and uncluttered." : "",
    "The uploaded product is the immutable source of truth.",
    "Preserve its identity, silhouette, geometry, upholstery pattern, color placement, materials, seams, openings, legs, hardware, proportions and construction details with extremely high fidelity.",
    "Remove any existing logos, watermarks, old seller marks, badges, text overlays or corner branding from the source image and generated scene. Only the app may add the seller's uploaded logo afterward.",
    "Do not redesign, simplify, stretch, widen, narrow, recolor, re-pattern or replace any part of the product.",
    "Do not duplicate the product unless the category guide says a set is appropriate or the dimensions image requires multiple consistent views.",
    "For new listing generation, only three final image types are allowed: image 1 lifestyle, image 2 second lifestyle angle or set when appropriate, image 3 pure white background. Do not create feature images, dimension images, description images, close-up images or extra benefit images unless the scene explicitly asks for them.",
    ["hero", "features", "detail", "benefits", "white", "optimizationRequested", "wallMirrorHero", "wallMirrorLifestyle", "wallMirrorDetail", "wallMirrorSize", "wallMirrorWhite", "vaseHero", "vaseFeatures", "vaseSize", "vaseWhite"].includes(scene) ? "This image must contain exactly one product instance. Count it before finishing: one product, not two." : "",
    "The result must look like premium professional ecommerce photography, not a low-resolution composite, cutout, render, illustration or enlarged screenshot.",
    "Use crisp edges, fine material texture, realistic lens perspective, coherent lighting, natural shadows and high dynamic range.",
    "Compose the final image vertically in a 2:3 portrait aspect ratio for a 1200 pixel wide by 1800 pixel tall marketplace image.",
    AI_IMAGE_PROVIDER === "google" && sceneConfig.geminiPrompt ? sceneConfig.geminiPrompt : sceneConfig.prompt,
    customPrompt ? `Additional seller direction: ${String(customPrompt).slice(0, 1000)}` : ""
  ].filter(Boolean).join(" ");
  if (AI_IMAGE_PROVIDER === "google") {
    return generateGeminiProductImage({ image, prompt, sceneConfig, scene });
  }
  if (AI_IMAGE_PROVIDER === "ideogram") {
    return generateIdeogramProductImage({ image, prompt, sceneConfig, scene });
  }
  return generateOpenAiProductImage({ image, prompt, sceneConfig, scene });
}

async function generateOpenAiProductImage({ image, prompt, sceneConfig, scene }) {
  const form = new FormData();
  form.append("model", OPENAI_IMAGE_MODEL);
  form.append("image", await imageInputToBlob(image), "product.png");
  form.append("prompt", prompt);
  form.append("n", "1");
  form.append("size", "1024x1536");
  form.append("quality", "high");
  // GPT Image 2 preserves reference images without accepting the legacy
  // input_fidelity field on the image edits endpoint.
  if (!/^gpt-image-2(?:$|-)/i.test(OPENAI_IMAGE_MODEL)) {
    form.append("input_fidelity", "high");
  }
  form.append("output_format", "png");
  const response = await fetch("https://api.openai.com/v1/images/edits", {
    method: "POST",
    headers: { Authorization: safeHeaderValue(`Bearer ${providerKey("openai")}`) },
    body: form
  });
  const body = await response.json();
  if (!response.ok) {
    const error = new Error(friendlyOpenAiError(body.error?.message || `OpenAI image API returned ${response.status}`));
    error.statusCode = response.status;
    error.provider = "openai";
    throw error;
  }
  await fs.mkdir(GENERATED_DIR, { recursive: true });
  const item = body.data?.[0];
  if (!item) throw new Error("OpenAI did not return a generated image.");
  let imageBuffer;
  if (item.url) {
    const imageResponse = await fetch(item.url);
    if (!imageResponse.ok) throw new Error("Could not download the generated OpenAI image.");
    imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
  } else if (item.b64_json) {
    imageBuffer = Buffer.from(item.b64_json, "base64");
  } else {
    throw new Error("OpenAI returned an unsupported image response.");
  }
  return saveGeneratedPortrait(imageBuffer, sceneConfig.label, scene);
}

async function generateGeminiProductImage({ image, prompt, sceneConfig, scene }) {
  const imagePart = await imageToGeminiPart(image);
  const preferredModel = GEMINI_IMAGE_MODEL;
  const fallbackModel = preferredModel === "gemini-3-pro-image-preview"
    ? "gemini-3.1-flash-image-preview"
    : "";
  let body;
  let modelUsed = preferredModel;
  let usedFallback = false;

  try {
    body = await requestGeminiImageWithRetry(preferredModel, imagePart, prompt);
  } catch (error) {
    if (!fallbackModel || !error.temporaryOverload) throw error;
    modelUsed = fallbackModel;
    usedFallback = true;
    body = await requestGeminiImageWithRetry(fallbackModel, imagePart, prompt, 2);
  }
  const imageResult = (body.candidates?.[0]?.content?.parts || []).find((part) => part.inlineData || part.inline_data);
  const inlineData = imageResult?.inlineData || imageResult?.inline_data;
  if (!inlineData?.data) throw new Error("Google AI did not return a generated image.");
  return {
    ...await saveGeneratedPortrait(Buffer.from(inlineData.data, "base64"), sceneConfig.label, scene),
    modelUsed,
    usedFallback
  };
}

async function requestGeminiImageWithRetry(model, imagePart, prompt, maxAttempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: "POST",
        headers: {
          "x-goog-api-key": safeHeaderValue(providerKey("google")),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }, imagePart] }],
          generationConfig: {
            responseModalities: ["IMAGE"],
            imageConfig: {
              aspectRatio: "2:3",
              imageSize: /^gemini-3/i.test(model) ? "4K" : undefined
            }
          }
        })
      }
    );
    const body = await response.json();
    if (response.ok) return body;

    const rawMessage = body.error?.message || `Google AI image API returned ${response.status}`;
    const temporaryOverload = response.status === 503 || /high demand|overload|temporar|unavailable/i.test(rawMessage);
    lastError = new Error(friendlyGoogleAiError(rawMessage));
    lastError.statusCode = response.status;
    lastError.provider = "google";
    lastError.temporaryOverload = temporaryOverload;
    if (!temporaryOverload || attempt === maxAttempts) break;
    await new Promise((resolve) => setTimeout(resolve, attempt * 2500));
  }
  throw lastError;
}

async function generateIdeogramProductImage({ image, prompt, sceneConfig, scene }) {
  const config = ideogramModelConfig(IDEOGRAM_IMAGE_MODEL);
  const imageBlob = await imageInputToBlob(image);
  const form = new FormData();
  if (config.family === "v4") {
    form.append("image", imageBlob, "product.png");
    form.append("text_prompt", prompt);
    form.append("image_weight", "70");
    form.append("resolution", config.resolution || "1664x2496");
    form.append("rendering_speed", config.renderingSpeed || "DEFAULT");
  } else if (config.family === "v3") {
    form.append("image", imageBlob, "product.png");
    form.append("prompt", prompt);
    form.append("num_images", "1");
    form.append("aspect_ratio", "2x3");
    form.append("image_weight", "70");
    form.append("rendering_speed", config.renderingSpeed || "DEFAULT");
    form.append("magic_prompt", "OFF");
    form.append("style_type", "REALISTIC");
    if (config.characterReference) {
      form.append("character_reference_images", imageBlob, "product-character.png");
    }
  } else if (config.family === "legacy") {
    const request = {
      prompt,
      aspect_ratio: "ASPECT_2_3",
      image_weight: 70,
      magic_prompt_option: "OFF",
      model: config.model || "V_2"
    };
    if (!/^V_1/.test(request.model)) {
      request.style_type = "REALISTIC";
    }
    form.append("image_request", JSON.stringify(request));
    form.append("image_file", imageBlob, "product.png");
  } else {
    form.append("images", imageBlob, "product.png");
    form.append("prompt", prompt);
    form.append("num_images", "1");
    form.append("aspect_ratio", "2x3");
    form.append("magic_prompt", "OFF");
    form.append("transparent_background", "false");
  }
  const response = await fetch(config.endpoint, {
    method: "POST",
    headers: { "Api-Key": safeHeaderValue(providerKey("ideogram")) },
    body: form
  });
  const body = await response.json();
  if (!response.ok) {
    const detail = Array.isArray(body.detail)
      ? body.detail.map((item) => item.msg || item.message || "").filter(Boolean).join("; ")
      : body.detail;
    const error = new Error(friendlyIdeogramError(body.error || detail || body.message || `Ideogram returned ${response.status}`));
    error.statusCode = response.status;
    error.provider = "ideogram";
    throw error;
  }
  const imageUrl = body.data?.[0]?.url;
  if (!imageUrl) throw new Error("Ideogram did not return a generated image.");
  const imageResponse = await fetch(imageUrl);
  if (!imageResponse.ok) throw new Error("Could not download the generated Ideogram image.");
  return {
    ...await saveGeneratedPortrait(Buffer.from(await imageResponse.arrayBuffer()), sceneConfig.label, scene),
    modelUsed: config.label || IDEOGRAM_IMAGE_MODEL || "Ideogram",
    usedFallback: false
  };
}

function normalizeBatchItems(body) {
  return body.items || body.content || body.results || [];
}

function batchFailureMessages(items) {
  return items.flatMap((item) => {
    const reasons = item.failureReasons || item.errors || item.reasons || [];
    if (Array.isArray(reasons)) {
      return reasons.map((reason) => reason.message || reason.errorMessage || reason.description || String(reason));
    }
    return reasons ? [String(reasons)] : [];
  }).filter(Boolean);
}

async function saveGeneratedPortrait(imageBuffer, label, scene) {
  await fs.mkdir(GENERATED_DIR, { recursive: true });
  const filename = `product-${scene}-${Date.now()}.png`;
  const filePath = path.join(GENERATED_DIR, filename);
  if (sharp) {
    await sharp(imageBuffer)
      .rotate()
      .resize(1200, 1800, {
        fit: "cover",
        position: "centre"
      })
      .png({ quality: 95, compressionLevel: 8 })
      .toFile(filePath);
  } else if (process.platform === "darwin") {
    const sourcePath = path.join(GENERATED_DIR, `source-${scene}-${Date.now()}.png`);
    const resizedPath = path.join(GENERATED_DIR, `resized-${scene}-${Date.now()}.png`);
    await fs.writeFile(sourcePath, imageBuffer);
    try {
      await execFileAsync("/usr/bin/sips", ["-Z", "1800", sourcePath, "--out", resizedPath]);
      await execFileAsync("/usr/bin/sips", ["-c", "1800", "1200", resizedPath, "--out", filePath]);
    } finally {
      await fs.unlink(sourcePath).catch(() => {});
      await fs.unlink(resizedPath).catch(() => {});
    }
  } else {
    throw new Error("Image resizing is unavailable. Install project dependencies and redeploy.");
  }
  return {
    image: `/generated/${filename}`,
    label,
    scene,
    width: 1200,
    height: 1800
  };
}

function productItemsFromBody(body) {
  return body.content || body.items || body.products || [];
}

function endpointWithPage(endpoint, page) {
  const [pathname, query = ""] = endpoint.split("?");
  const params = new URLSearchParams(query);
  params.set("page", String(page));
  return `${pathname}?${params}`;
}

function dedupeProducts(items) {
  const seen = new Set();
  const deduped = [];
  for (const item of items) {
    const variants = Array.isArray(item.variants) ? item.variants : [item];
    const variantKeys = variants.map((variant) => variant.variantId || variant.barcode || variant.stockCode).filter(Boolean);
    const key = item.contentId || item.id || item.listingId || item.barcode || variantKeys.join("|") || JSON.stringify(item).slice(0, 120);
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(item);
  }
  return deduped;
}

async function fetchRemainingPages(firstResult, size) {
  const totalPages = Number(firstResult.body.totalPages || 1);
  const firstPage = Number(firstResult.body.page || 0);
  const pagesToFetch = [];
  for (let page = firstPage + 1; page < totalPages; page += 1) {
    pagesToFetch.push(page);
  }
  if (!pagesToFetch.length) return firstResult;

  const allItems = [...firstResult.items];
  for (const page of pagesToFetch) {
    const endpoint = endpointWithPage(firstResult.endpoint, page);
    const body = await trendyolFetch(endpoint, {
      storeFrontCode: firstResult.storeFrontCode,
      acceptLanguage: ["SA", "AE", "KW", "QA", "BH", "OM"].includes(firstResult.storeFrontCode) ? "en" : undefined
    });
    allItems.push(...productItemsFromBody(body));
  }

  return {
    ...firstResult,
    items: allItems,
    body: {
      ...firstResult.body,
      content: allItems,
      size: Number(size),
      fetchedPages: totalPages,
      totalElements: firstResult.body.totalElements || allItems.length
    }
  };
}

async function fetchProducts({ state = "approved", size = "50", page = "0", nextPageToken = "", paginate = true } = {}) {
  if (state === "all") {
    const approved = await fetchProducts({ state: "approved", size, page, nextPageToken, paginate });
    const unapproved = await fetchProducts({ state: "unapproved", size, page, nextPageToken, paginate });
    const items = dedupeProducts([...approved.items, ...unapproved.items]);
    const storeFrontCode = approved.storeFrontCode || unapproved.storeFrontCode || "";
    return {
      body: {
        totalElements: items.length,
        totalElementsReported: (approved.body.totalElements || 0) + (unapproved.body.totalElements || 0),
        content: items,
        diagnostics: [...(approved.body.diagnostics || []), ...(unapproved.body.diagnostics || [])]
      },
      endpoint: "combined approved + unapproved product sync",
      storeFrontCode,
      items
    };
  }

  const suffix = state === "unapproved" ? "unapproved" : "approved";
  const statusValues = state === "approved" ? ["", "onSale", "notOnSale", "archived", "locked", "blacklisted"] : [""];
  if (nextPageToken) {
    // nextPageToken is only meaningful for the V2 endpoints.
  }

  const endpoints = [];
  for (const status of statusValues) {
    const v2Params = new URLSearchParams({ size, page, supplierId: session.sellerId });
    const v2BasicParams = new URLSearchParams({ size, page });
    if (nextPageToken) {
      v2Params.set("nextPageToken", nextPageToken);
      v2BasicParams.set("nextPageToken", nextPageToken);
    }
    if (status) {
      v2Params.set("status", status);
      v2BasicParams.set("status", status);
    }
    endpoints.push(`/integration/product/sellers/${session.sellerId}/products/${suffix}?${v2Params}`);
    endpoints.push(`/integration/product/sellers/${session.sellerId}/products/${suffix}?${v2BasicParams}`);
  }

  const v1Params = new URLSearchParams({ size, page });
  if (state === "approved") v1Params.set("approved", "true");
  if (state === "unapproved") v1Params.set("approved", "false");
  endpoints.push(`/integration/product/sellers/${session.sellerId}/products?${v1Params}`);
  endpoints.push(`/integration/product/sellers/${session.sellerId}/products?size=${size}&page=${page}`);

  const failures = [];
  const emptySuccesses = [];

  for (const storeFrontCode of storefrontCandidates()) {
    for (const endpoint of endpoints) {
    try {
      const body = await trendyolFetch(endpoint, {
        storeFrontCode,
        acceptLanguage: storeFrontCode ? "en" : undefined
      });
      const items = productItemsFromBody(body);
      const summary = {
        endpoint,
        storeFrontCode: storeFrontCode || "none",
        totalElements: body.totalElements,
        totalPages: body.totalPages,
        itemCount: items.length
      };
      if (!items.length) {
        emptySuccesses.push(summary);
        continue;
      }
      const firstResult = {
        body,
        endpoint,
        storeFrontCode,
        items
      };
      return paginate ? fetchRemainingPages(firstResult, size) : firstResult;
    } catch (error) {
      failures.push({
        endpoint,
        storeFrontCode: storeFrontCode || "none",
        statusCode: error.statusCode,
        message: error.message
      });
      if ([401, 403, 429].includes(error.statusCode)) throw error;
    }
    }
  }

  if (emptySuccesses.length) {
    return {
      body: {
        totalElements: 0,
        totalPages: 0,
        content: [],
        diagnostics: emptySuccesses,
        failures
      },
      endpoint: emptySuccesses[0].endpoint,
      items: []
    };
  }

  const error = new Error(
    "Could not find a Trendyol product listing endpoint for this account. Check Production/Stage, Seller ID, and whether this is a Türkiye Marketplace seller account."
  );
  error.statusCode = 404;
  error.body = { tried: failures };
  throw error;
}

async function handleApi(req, res, url) {
  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  try {
    if (url.pathname === "/api/health") {
      sendJson(res, 200, {
        ok: true,
        service: "trendlift",
        status: "healthy"
      });
      return;
    }

    if (url.pathname === "/api/status") {
      const analysisReady = Boolean(providerKey(AI_ANALYSIS_PROVIDER));
      const imageReady = Boolean(providerKey(AI_IMAGE_PROVIDER));
      sendJson(res, 200, {
        ok: true,
        connected: hasCredentials(),
        environment: session.environment,
        sellerId: session.sellerId ? `${session.sellerId.slice(0, 3)}***` : ""
        ,
        storeFrontCode: session.storeFrontCode || "auto",
        imageAiAvailable: analysisReady && imageReady,
        analysisAiAvailable: analysisReady,
        generationAiAvailable: imageReady,
        analysisProvider: AI_ANALYSIS_PROVIDER,
        imageProvider: AI_IMAGE_PROVIDER,
        openAiConfigured: Boolean(OPENAI_API_KEY),
        googleAiConfigured: Boolean(GOOGLE_API_KEY),
        ideogramConfigured: Boolean(IDEOGRAM_API_KEY),
        openAiModel: OPENAI_MODEL,
        openAiImageModel: OPENAI_IMAGE_MODEL,
        geminiModel: GEMINI_MODEL,
        geminiImageModel: GEMINI_IMAGE_MODEL,
        ideogramImageModel: IDEOGRAM_IMAGE_MODEL,
        publicImageHosting: Boolean(publicBaseUrl(req)),
        publicBaseUrl: publicBaseUrl(req),
        imageAiModel: AI_ANALYSIS_PROVIDER === "google" ? GEMINI_MODEL : OPENAI_MODEL
      });
      return;
    }

    if (url.pathname === "/api/connect" && req.method === "POST") {
      const body = await requestJson(req);
      session.sellerId = String(body.sellerId || "");
      session.apiKey = String(body.apiKey || "");
      session.apiSecret = String(body.apiSecret || "");
      session.environment = body.environment === "stage" ? "stage" : "prod";
      session.storeFrontCode = String(body.storeFrontCode || "").trim().toUpperCase();
      const result = await fetchProducts({ state: "all", size: "100", page: "0", paginate: false });
      if (!session.storeFrontCode && result.storeFrontCode) {
        session.storeFrontCode = result.storeFrontCode;
      }
      sendJson(res, 200, {
        ok: true,
        message: "Trendyol credentials verified.",
        endpoint: result.endpoint,
        storeFrontCode: result.storeFrontCode || session.storeFrontCode || "none",
        count: result.items.length
      });
      return;
    }

    if (url.pathname === "/api/config-ai" && req.method === "POST") {
      const body = await requestJson(req);
      const openAiKey = sanitizeApiKey(body.openAiApiKey || body.apiKey || "");
      const googleApiKey = sanitizeApiKey(body.googleApiKey || "");
      const ideogramApiKey = sanitizeApiKey(body.ideogramApiKey || "");
      const nextOpenAiKey = openAiKey || OPENAI_API_KEY;
      const nextGoogleApiKey = googleApiKey || GOOGLE_API_KEY;
      const nextIdeogramApiKey = ideogramApiKey || IDEOGRAM_API_KEY;
      const nextAnalysisProvider = body.analysisProvider === "google" ? "google" : "openai";
      const nextImageProvider = ["google", "ideogram"].includes(body.imageProvider) ? body.imageProvider : "openai";
      const nextProviderKey = (provider) => {
        if (provider === "google") return nextGoogleApiKey;
        if (provider === "ideogram") return nextIdeogramApiKey;
        return nextOpenAiKey;
      };
      if (!nextProviderKey(nextAnalysisProvider)) {
        sendJson(res, 400, { ok: false, message: `${providerLabel(nextAnalysisProvider)} API key is required for product analysis.` });
        return;
      }
      if (!nextProviderKey(nextImageProvider)) {
        sendJson(res, 400, { ok: false, message: `${providerLabel(nextImageProvider)} API key is required for image generation.` });
        return;
      }
      OPENAI_API_KEY = nextOpenAiKey;
      GOOGLE_API_KEY = nextGoogleApiKey;
      IDEOGRAM_API_KEY = nextIdeogramApiKey;
      OPENAI_MODEL = String(body.openAiModel || body.model || OPENAI_MODEL || "gpt-5.4-mini").trim();
      OPENAI_IMAGE_MODEL = String(body.openAiImageModel || body.imageModel || OPENAI_IMAGE_MODEL || "gpt-image-2").trim();
      GEMINI_MODEL = String(body.geminiModel || GEMINI_MODEL || "gemini-2.5-flash").trim();
      GEMINI_IMAGE_MODEL = String(body.geminiImageModel || GEMINI_IMAGE_MODEL || "gemini-3-pro-image-preview").trim();
      IDEOGRAM_IMAGE_MODEL = String(body.ideogramImageModel || IDEOGRAM_IMAGE_MODEL || "ideogram-edit").trim();
      AI_ANALYSIS_PROVIDER = nextAnalysisProvider;
      AI_IMAGE_PROVIDER = nextImageProvider;
      sendJson(res, 200, {
        ok: true,
        message: `${providerLabel(AI_ANALYSIS_PROVIDER)} analysis and ${providerLabel(AI_IMAGE_PROVIDER)} image generation are enabled.`,
        analysisProvider: AI_ANALYSIS_PROVIDER,
        imageProvider: AI_IMAGE_PROVIDER,
        model: AI_ANALYSIS_PROVIDER === "google" ? GEMINI_MODEL : OPENAI_MODEL,
        imageModel: AI_IMAGE_PROVIDER === "google"
          ? GEMINI_IMAGE_MODEL
          : AI_IMAGE_PROVIDER === "ideogram"
            ? IDEOGRAM_IMAGE_MODEL
            : OPENAI_IMAGE_MODEL,
        openAiConfigured: Boolean(OPENAI_API_KEY),
        googleAiConfigured: Boolean(GOOGLE_API_KEY),
        ideogramConfigured: Boolean(IDEOGRAM_API_KEY)
      });
      return;
    }

    if (url.pathname === "/api/products" && req.method === "GET") {
      const state = url.searchParams.get("state") || "approved";
      const size = url.searchParams.get("size") || "50";
      const page = url.searchParams.get("page") || "0";
      const nextPageToken = url.searchParams.get("nextPageToken");
      const paginate = url.searchParams.get("paginate") !== "false";
      const result = await fetchProducts({ state, size, page, nextPageToken, paginate });
      sendJson(res, 200, {
        ok: true,
        endpoint: result.endpoint,
        storeFrontCode: result.storeFrontCode || session.storeFrontCode || "none",
        items: result.items,
        nextPageToken: result.body.nextPageToken || null,
        raw: result.body
      });
      return;
    }

    if (url.pathname === "/api/category-suggestions" && req.method === "GET") {
      const query = String(url.searchParams.get("q") || "").trim();
      if (!query) {
        sendJson(res, 400, { ok: false, message: "A product or category name is required." });
        return;
      }
      const language = url.searchParams.get("language") === "ar" ? "ar" : "en";
      const categories = (await fetchProductCategories(language))
        .map((category) => ({ ...category, score: categoryMatchScore(category, query) }))
        .filter((category) => category.score > 0)
        .sort((a, b) => b.score - a.score || Number(b.leaf) - Number(a.leaf))
        .slice(0, 8);
      sendJson(res, 200, { ok: true, query, categories });
      return;
    }

    if (url.pathname === "/api/categories" && req.method === "GET") {
      const language = url.searchParams.get("language") === "ar" ? "ar" : "en";
      const categories = await fetchProductCategories(language);
      sendJson(res, 200, {
        ok: true,
        language,
        count: categories.length,
        categories
      });
      return;
    }

    if (url.pathname === "/api/export-excel" && req.method === "POST") {
      const body = await requestJson(req);
      const rows = Array.isArray(body.rows) ? body.rows : [];
      if (!rows.length) {
        sendJson(res, 400, { ok: false, message: "No rows were provided for export." });
        return;
      }
      await fs.mkdir(EXPORT_DIR, { recursive: true });
      const filename = safeFilename(body.filename || `TrendLift_${rows.length}_listings.xls`);
      const filePath = path.join(EXPORT_DIR, filename.endsWith(".xls") ? filename : `${filename}.xls`);
      await fs.writeFile(filePath, excelHtml(rows), "utf8");
      sendJson(res, 200, {
        ok: true,
        filename: path.basename(filePath),
        path: filePath,
        folder: EXPORT_DIR,
        message: `Saved ${rows.length} listings to ${filePath}`
      });
      return;
    }

    if (url.pathname === "/api/optimize-listing" && req.method === "POST") {
      const body = await requestJson(req);
      const result = await optimizeWithImage(body.listing || {});
      sendJson(res, 200, {
        ok: true,
        title: result.title,
        description: result.description,
        detectedProductType: result.detectedProductType,
        suggestedCategory: result.suggestedCategory || "",
        mismatch: Boolean(result.mismatch),
        warning: result.warning || "",
        color: result.color || "",
        material: result.material || "",
        keywords: result.keywords || [],
        model: AI_ANALYSIS_PROVIDER === "google" ? GEMINI_MODEL : OPENAI_MODEL,
        provider: AI_ANALYSIS_PROVIDER
      });
      return;
    }

    if (url.pathname === "/api/analyze-new-product" && req.method === "POST") {
      const body = await requestJson(req);
      const result = await analyzeNewProductImage(body.image, body.outputLanguage);
      sendJson(res, 200, {
        ok: true,
        productType: result.detectedProductType,
        suggestedCategory: result.suggestedCategory || "",
        title: result.title,
        description: result.description,
        warning: result.warning || "AI-generated fields require review.",
        origin: "SA",
        attributes: [
          ...(result.attributes || []),
          ...(result.color ? [{ attributeName: "Color", customAttributeValue: result.color }] : []),
          ...(result.material ? [{ attributeName: "Material", customAttributeValue: result.material }] : [])
        ].filter((attribute, index, rows) =>
          rows.findIndex((candidate) => normalizedAttributeText(candidate.attributeName) === normalizedAttributeText(attribute.attributeName)) === index
        ),
        keywords: result.keywords || []
      });
      return;
    }

    if (url.pathname === "/api/generate-product-image" && req.method === "POST") {
      const body = await requestJson(req);
      const result = await generateProductImage(body);
      sendJson(res, 200, {
        ok: true,
        ...result,
        provider: AI_IMAGE_PROVIDER,
        publicUrl: generatedPublicUrl(req, result.image),
        message: `${result.label} created and added to the listing review.`
      });
      return;
    }

    if (url.pathname === "/api/save-generated-image" && req.method === "POST") {
      const body = await requestJson(req);
      const match = String(body.image || "").match(/^data:image\/png;base64,(.+)$/);
      if (!match) {
        sendJson(res, 400, { ok: false, message: "A valid branded PNG image is required." });
        return;
      }
      const imageBuffer = Buffer.from(match[1], "base64");
      if (!imageBuffer.length || imageBuffer.length > 20 * 1024 * 1024) {
        sendJson(res, 400, { ok: false, message: "The branded image is empty or too large." });
        return;
      }
      await fs.mkdir(GENERATED_DIR, { recursive: true });
      const scene = safeFilename(String(body.scene || "branded")).replace(/\.[^.]+$/, "") || "branded";
      const filename = `product-${scene}-branded-${Date.now()}.png`;
      await fs.writeFile(path.join(GENERATED_DIR, filename), imageBuffer);
      const image = `/generated/${filename}`;
      sendJson(res, 200, {
        ok: true,
        image,
        publicUrl: generatedPublicUrl(req, image),
        width: 1200,
        height: 1800
      });
      return;
    }

    if (url.pathname === "/api/prepare-product-attributes" && req.method === "POST") {
      const body = await requestJson(req);
      const categoryId = Number(body.categoryId);
      if (!categoryId) {
        sendJson(res, 400, { ok: false, message: "Select a Trendyol category before preparing attributes." });
        return;
      }
      const prepared = await prepareCategoryAttributes(
        categoryId,
        body.attributes,
        body.image,
        {
          title: body.title,
          description: body.description,
          productType: body.productType
        }
      );
      sendJson(res, 200, {
        ok: true,
        ...prepared,
        message: prepared.missingRequiredAttributes.length
          ? `${prepared.attributes.length} attributes prepared. ${prepared.missingRequiredAttributes.length} mandatory attributes still need review.`
          : `All ${prepared.requiredCount} mandatory category attributes are ready.`
      });
      return;
    }

    if (url.pathname === "/api/create-product" && req.method === "POST") {
      const body = await requestJson(req);
      const barcode = String(body.barcode || "").trim().slice(0, 40);
      const modelCode = String(body.modelCode || "").trim().slice(0, 40);
      const stockCode = String(body.stockCode || "").trim().slice(0, 100);
      if (!barcode || !modelCode || !stockCode) {
        sendJson(res, 400, { ok: false, message: "Barcode, model code and stock code are required." });
        return;
      }
      const title = String(body.title || "").trim().slice(0, 100);
      const description = String(body.description || "").trim();
      const brandId = Number(body.brandId);
      const categoryId = Number(body.categoryId);
      const listPrice = Number(body.listPrice);
      const salePrice = Number(body.salePrice);
      const images = (Array.isArray(body.images) ? body.images : [])
        .map((url) => String(url || "").trim())
        .filter((url) => /^https:\/\//i.test(url))
        .slice(0, 8);
      if (!title || !description || !brandId || !categoryId || !(listPrice > 0) || !(salePrice > 0)) {
        sendJson(res, 400, { ok: false, message: "Title, description, brand, category and positive SAR prices are required." });
        return;
      }
      if (!images.length || images.length !== (Array.isArray(body.images) ? body.images.length : 0)) {
        sendJson(res, 400, { ok: false, message: "Every product image must use a public HTTPS URL that Trendyol can download." });
        return;
      }
      const categoryAttributes = await fetchCategoryAttributes(categoryId);
      const attributes = await resolveCategoryAttributes(categoryId, body.attributes, categoryAttributes);
      const missingRequiredAttributes = unresolvedRequiredAttributes(categoryAttributes, attributes);
      if (missingRequiredAttributes.length) {
        sendJson(res, 400, {
          ok: false,
          message: `Complete the mandatory category attributes before listing: ${missingRequiredAttributes.map((attribute) => attribute.name).join(", ")}.`,
          missingRequiredAttributes: missingRequiredAttributes.map(({ attributeId, name, allowCustom, values }) => ({
            attributeId,
            name,
            allowCustom,
            values: values.slice(0, 20)
          }))
        });
        return;
      }
      const item = {
        barcode,
        title,
        description,
        productMainId: modelCode,
        brandId,
        categoryId,
        quantity: Number(body.quantity || 0),
        stockCode,
        origin: String(body.origin || "SA").slice(0, 2),
        dimensionalWeight: Number(body.dimensionalWeight || 1),
        listPrice,
        salePrice,
        vatRate: Number(body.vatRate || 0),
        images: images.map((url) => ({ url })),
        attributes
      };
      const result = await trendyolFetch(`/integration/product/sellers/${session.sellerId}/v2/products`, {
        method: "POST",
        storeFrontCode: session.storeFrontCode,
        acceptLanguage: "en",
        body: JSON.stringify({ items: [item] })
      });
      sendJson(res, 200, {
        ok: true,
        batchRequestId: result.batchRequestId || null,
        codes: { barcode, productMainId: modelCode, stockCode },
        raw: result,
        message: result.batchRequestId
          ? `Product submitted to Trendyol. Batch request ID: ${result.batchRequestId}`
          : "Product submitted to Trendyol for approval."
      });
      return;
    }

    if (url.pathname === "/api/product-batch-status" && req.method === "GET") {
      const batchRequestId = String(url.searchParams.get("batchRequestId") || "").trim();
      if (!batchRequestId) {
        sendJson(res, 400, { ok: false, message: "Batch request ID is required." });
        return;
      }
      const body = await trendyolFetch(
        `/integration/product/sellers/${session.sellerId}/products/batch-requests/${encodeURIComponent(batchRequestId)}`,
        {
          method: "GET",
          storeFrontCode: session.storeFrontCode,
          acceptLanguage: "en"
        }
      );
      const items = normalizeBatchItems(body);
      const failures = batchFailureMessages(items);
      const statuses = items.map((item) => String(item.status || item.state || item.result || "").toUpperCase()).filter(Boolean);
      const failed = failures.length > 0 || statuses.some((status) => /FAIL|ERROR|REJECT/.test(status));
      const pending = !items.length || statuses.some((status) => /PENDING|PROCESS|WAIT|CREATED/.test(status));
      sendJson(res, 200, {
        ok: true,
        batchRequestId,
        state: failed ? "failed" : pending ? "processing" : "completed",
        itemCount: items.length,
        failures,
        items,
        raw: body,
        message: failed
          ? `Trendyol rejected the product: ${failures.join(" | ") || statuses.join(", ")}`
          : pending
            ? "Trendyol is still processing this product."
            : "Trendyol processed the product successfully. It may still be waiting for marketplace approval."
      });
      return;
    }

    if (url.pathname === "/api/update-product-images" && req.method === "POST") {
      const body = await requestJson(req);
      const source = body.source || {};
      const variant = source.variants?.[0] || source;
      const sourcePrice = variant.price || source.price || {};
      const sourceStock = variant.stock || source.stock || {};
      const images = (Array.isArray(body.images) ? body.images : [])
        .map((image) => String(image || "").trim())
        .filter((image) => /^https:\/\//i.test(image))
        .slice(0, 8);
      if (!images.length) {
        sendJson(res, 400, { ok: false, message: "At least one public HTTPS image is required." });
        return;
      }
      const item = {
        barcode: String(variant.barcode || source.barcode || body.barcode || "").trim(),
        title: String(source.title || body.title || "").trim().slice(0, 100),
        description: String(source.description || body.description || "").trim(),
        productMainId: String(source.productMainId || source.modelCode || body.modelCode || body.productMainId || "").trim(),
        brandId: Number(source.brandId || source.brand?.id),
        categoryId: Number(source.categoryId || source.pimCategoryId || source.category?.id),
        quantity: Number(sourceStock.quantity ?? variant.quantity ?? source.quantity ?? body.quantity ?? 0),
        stockCode: String(variant.stockCode || source.stockCode || source.stockId || body.stockCode || "").trim(),
        origin: String(source.origin || "SA").slice(0, 2),
        dimensionalWeight: Number(variant.dimensionalWeight || source.dimensionalWeight || 1),
        listPrice: Number(sourcePrice.listPrice || source.listPrice || body.listPrice),
        salePrice: Number(sourcePrice.salePrice || source.salePrice || source.discountedPrice || body.salePrice),
        vatRate: Number(variant.vatRate || source.vatRate || 15),
        images: images.map((image) => ({ url: image })),
        attributes: Array.isArray(source.attributes)
          ? source.attributes.map((attribute) => ({
            attributeId: Number(attribute.attributeId || attribute.attribute?.id),
            ...(Number(attribute.attributeValueId || attribute.attributeValue?.id)
              ? { attributeValueId: Number(attribute.attributeValueId || attribute.attributeValue?.id) }
              : {
                customAttributeValue: String(
                  attribute.customAttributeValue
                  || attribute.attributeValue?.name
                  || attribute.attributeValue
                  || ""
                ).trim()
              })
          })).filter((attribute) => attribute.attributeId)
          : []
      };
      const required = ["barcode", "title", "description", "productMainId", "brandId", "categoryId", "stockCode", "listPrice", "salePrice"];
      const missing = required.filter((field) => !item[field]);
      if (missing.length) {
        sendJson(res, 400, { ok: false, message: `Trendyol did not return enough data to update images. Missing: ${missing.join(", ")}.` });
        return;
      }
      const result = await trendyolFetch(`/integration/product/sellers/${session.sellerId}/v2/products`, {
        method: "PUT",
        storeFrontCode: session.storeFrontCode,
        acceptLanguage: "en",
        body: JSON.stringify({ items: [item] })
      });
      sendJson(res, 200, {
        ok: true,
        batchRequestId: result.batchRequestId || null,
        message: result.batchRequestId
          ? `Image update submitted. Batch request ID: ${result.batchRequestId}`
          : "Image update submitted to Trendyol."
      });
      return;
    }

    if (url.pathname === "/api/publish" && req.method === "POST") {
      const body = await requestJson(req);
      const listing = body.listing || {};
      if (!listing.contentId) {
        sendJson(res, 400, {
          ok: false,
          message: "Cannot publish this listing because Trendyol did not provide a contentId. Sync approved products again and retry."
        });
        return;
      }

      if (body.dryRun) {
        sendJson(res, 200, {
          ok: true,
          dryRun: true,
          message: "Dry run complete. Turn off Dry-run publishing in Settings to send title and description to Trendyol."
        });
        return;
      }

      const updateBody = {
        items: [
          {
            contentId: Number(listing.contentId),
            title: String(listing.title || "").trim(),
            description: String(listing.description || "").trim()
          }
        ]
      };
      const result = await trendyolFetch(`/integration/product/sellers/${session.sellerId}/products/content-bulk-update`, {
        method: "POST",
        storeFrontCode: session.storeFrontCode,
        acceptLanguage: session.storeFrontCode ? "en" : undefined,
        body: JSON.stringify(updateBody)
      });
      sendJson(res, 200, {
        ok: true,
        dryRun: false,
        batchRequestId: result.batchRequestId || result.id || null,
        raw: result,
        message: result.batchRequestId
          ? `Submitted to Trendyol. Batch request ID: ${result.batchRequestId}`
          : "Submitted to Trendyol. Check Seller Center or batch status for completion."
      });
      return;
    }

    sendJson(res, 404, { ok: false, message: "API route not found." });
  } catch (error) {
    console.error(`[api-error] ${req.method} ${url.pathname}`, error.stack || error.message || error);
    const isGoogleRateLimit = error.provider === "google" && error.statusCode === 429;
    const isOpenAiRateLimit = error.provider === "openai" && error.statusCode === 429;
    const isIdeogramRateLimit = error.provider === "ideogram" && error.statusCode === 429;
    sendJson(res, error.statusCode || 500, {
      ok: false,
      message: error.message || "Server error",
      code: isGoogleRateLimit
        ? "GOOGLE_RATE_LIMIT"
        : isIdeogramRateLimit
          ? "IDEOGRAM_RATE_LIMIT"
        : isOpenAiRateLimit
          ? "OPENAI_RATE_LIMIT"
          : error.provider === "openai" && error.statusCode === 402
            ? "OPENAI_BILLING"
            : "",
      detail: error.body || null
    });
  }
}

async function serveStatic(req, res, url) {
  const cleanPath = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  const filePath = path.normalize(path.join(ROOT, cleanPath));
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  try {
    const file = await fs.readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" });
    res.end(file);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname.startsWith("/api/")) {
    await handleApi(req, res, url);
    return;
  }
  await serveStatic(req, res, url);
});

server.listen(PORT, HOST, () => {
  console.log(`TrendLift ready on http://${HOST}:${PORT}`);
  console.log("Use Settings to test Trendyol Seller ID, API key, and API secret.");
});
