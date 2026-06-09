const demoListings = [
  {
    id: "TR-48291",
    barcode: "86800048291",
    sku: "MODA-BAG-214",
    title: "Kadın Siyah Omuz Çantası",
    brand: "TrendLift Studio",
    category: "Bags",
    price: "799 SAR",
    stock: 42,
    status: "needs",
    score: 48,
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80",
    description: "Siyah kadın omuz çantası.",
    keywords: [
      { term: "siyah omuz çantası", searches: 18400, competition: "High" },
      { term: "günlük kadın çanta", searches: 12750, competition: "Medium" },
      { term: "fermuarlı çanta", searches: 8200, competition: "Medium" },
      { term: "minimal çanta", searches: 6100, competition: "Low" }
    ],
    metadata: { color: "Siyah", material: "Suni deri", closure: "Fermuar" }
  },
  {
    id: "TR-51704",
    barcode: "86800051704",
    sku: "HOME-LAMP-088",
    title: "LED Masa Lambası Dokunmatik",
    brand: "Luma Home",
    category: "Home & Living",
    price: "459 SAR",
    stock: 18,
    status: "review",
    score: 68,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
    description: "Dokunmatik LED masa lambası.",
    keywords: [
      { term: "dokunmatik masa lambası", searches: 9600, competition: "Medium" },
      { term: "çalışma masası lambası", searches: 8900, competition: "High" },
      { term: "şarjlı led lamba", searches: 7200, competition: "Medium" },
      { term: "göz yormayan lamba", searches: 5400, competition: "Low" }
    ],
    metadata: { power: "USB şarjlı", room: "Çalışma odası", lightModes: "3 mod" }
  },
  {
    id: "TR-53012",
    barcode: "86800053012",
    sku: "SPORT-SHOE-330",
    title: "Erkek Spor Ayakkabı Rahat Taban",
    brand: "Moveon",
    category: "Shoes",
    price: "1,249 SAR",
    stock: 9,
    status: "needs",
    score: 41,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    description: "Rahat tabanlı erkek spor ayakkabı.",
    keywords: [
      { term: "erkek spor ayakkabı", searches: 30200, competition: "High" },
      { term: "rahat yürüyüş ayakkabısı", searches: 15100, competition: "Medium" },
      { term: "hafif spor ayakkabı", searches: 11200, competition: "Medium" },
      { term: "nefes alan ayakkabı", searches: 8700, competition: "Low" }
    ],
    metadata: { material: "Tekstil", sole: "Esnek kauçuk", activity: "Yürüyüş" }
  },
  {
    id: "TR-61173",
    barcode: "86800061173",
    sku: "BEAUTY-SERUM-092",
    title: "C Vitamini Serum 30 ml",
    brand: "Glow Lab",
    category: "Beauty",
    price: "349 SAR",
    stock: 57,
    status: "optimized",
    score: 91,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80",
    description: "C vitamini içeren aydınlatıcı yüz bakım serumu.",
    keywords: [
      { term: "c vitamini serum", searches: 22100, competition: "High" },
      { term: "leke karşıtı serum", searches: 11900, competition: "Medium" },
      { term: "aydınlatıcı serum", searches: 10800, competition: "Medium" },
      { term: "yüz serumu 30 ml", searches: 4300, competition: "Low" }
    ],
    metadata: { skinType: "Tüm cilt tipleri", volume: "30 ml", benefit: "Aydınlatıcı" }
  }
];

const PRODUCT_PROFILES = [
  {
    type: "table lamp",
    match: ["table lamp", "desk lamp", "bedside lamp", "masa lambası", "led lamp", "reading lamp"],
    keywords: ["table lamp", "LED table lamp", "desk lamp", "bedside reading lamp", "modern table lamp"],
    benefits: ["focused task lighting", "comfortable reading light", "a compact design for desks and bedside tables"]
  },
  {
    type: "floor lamp",
    match: ["floor lamp", "standing lamp", "lambader"],
    keywords: ["floor lamp", "modern standing lamp", "living room floor lamp", "corner lamp"],
    benefits: ["ambient room lighting", "a space-saving standing design", "easy placement beside sofas and reading chairs"]
  },
  {
    type: "ceiling light",
    match: ["chandelier", "ceiling light", "pendant light", "avize", "sarkıt"],
    keywords: ["ceiling light", "modern pendant light", "decorative chandelier", "living room lighting"],
    benefits: ["balanced overhead lighting", "a decorative focal point", "lighting for dining and living spaces"]
  },
  {
    type: "shoulder bag",
    match: ["shoulder bag", "crossbody bag", "handbag", "omuz çantası", "çanta"],
    keywords: ["women's shoulder bag", "crossbody bag", "everyday handbag", "zip shoulder bag"],
    benefits: ["organized everyday storage", "comfortable carrying", "easy styling for work and casual outfits"]
  },
  {
    type: "sports shoes",
    match: ["sports shoes", "sneaker", "running shoe", "walking shoe", "spor ayakkabı"],
    keywords: ["men's sports shoes", "comfortable walking shoes", "lightweight sneakers", "breathable sports shoes"],
    benefits: ["comfortable daily walking", "lightweight movement", "breathable support for extended wear"]
  },
  {
    type: "face serum",
    match: ["serum", "vitamin c", "hyaluronic", "retinol", "niacinamide"],
    keywords: ["face serum", "brightening serum", "daily skincare serum", "skin care serum"],
    benefits: ["easy use in a daily skincare routine", "a lightweight skin feel", "targeted facial care"]
  },
  {
    type: "dining table",
    match: ["dining table", "kitchen table", "yemek masası", "masa"],
    keywords: ["dining table", "modern kitchen table", "family dining table", "home dining furniture"],
    benefits: ["comfortable everyday dining", "a practical surface for family meals", "easy coordination with modern interiors"]
  },
  {
    type: "chair",
    match: ["chair", "dining chair", "office chair", "sandalye", "koltuk"],
    keywords: ["comfortable chair", "modern dining chair", "home seating chair", "ergonomic chair"],
    benefits: ["comfortable seating", "support for everyday use", "easy coordination with home or office spaces"]
  }
];

const TITLE_TRANSLATIONS = new Map([
  ["kadın", "women's"],
  ["erkek", "men's"],
  ["siyah", "black"],
  ["beyaz", "white"],
  ["masa", "table"],
  ["lambası", "lamp"],
  ["lamba", "lamp"],
  ["dokunmatik", "touch control"],
  ["şarjlı", "rechargeable"],
  ["omuz", "shoulder"],
  ["çantası", "bag"],
  ["çanta", "bag"],
  ["spor", "sports"],
  ["ayakkabı", "shoes"],
  ["rahat", "comfortable"],
  ["taban", "sole"],
  ["vitamini", "vitamin"],
  ["yüz", "face"],
  ["aydınlatıcı", "brightening"]
]);

const state = {
  connected: false,
  mode: "none",
  activeView: "dashboard",
  activeFilter: "all",
  listingPage: 1,
  pageSize: 50,
  sortMode: "score",
  selectedId: null,
  listings: [],
  importedRows: [],
  keywordDataset: [],
  newProductImageData: "",
  newProductAnalysis: null,
  generatedProductImages: [],
  missingCategoryAttributes: [],
  requiredCategoryAttributeCount: 0,
  preparingCategoryAttributes: false,
  categoryAttributesPrepared: false,
  publicImageHosting: false,
  latestProductSubmission: null,
  recentProductSubmissions: [],
  categoryDirectory: [],
  categoryDirectoryLoadedAt: 0,
  categoryDirectoryLoading: false,
  batchPollTimer: null,
  sellerLogoData: "",
  sellerLogoPosition: "top-left",
  lastSyncMessage: "",
  lastOperation: "Ready",
  imageAiAvailable: false,
  analysisAiAvailable: false,
  generationAiAvailable: false,
  settings: {
    dryRun: false,
    requireDraftReview: true,
    proxyUrl: "",
    storeFrontCode: "SA",
    titleLimit: 100,
    minSearches: 3000,
    languageMode: "en",
    protectBrandTerms: true,
    analysisProvider: "openai",
    imageProvider: "openai"
  }
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
const SESSION_TIMEOUT_MS = 30 * 60 * 1000;
const SESSION_STORAGE_KEY = "trendlift-timed-session";
const CATEGORY_DIRECTORY_STORAGE_KEY = "trendlift-category-directory";
const SESSION_CATALOG_LIMIT = 5000;

const els = {
  connectionCard: $("#connectionCard"),
  connectBanner: $("#connectBanner"),
  dashboardListingTable: $("#dashboardListingTable"),
  listingTable: $("#listingTable"),
  catalogSummary: $("#catalogSummary"),
  listingPager: $("#listingPager"),
  pageInfo: $("#pageInfo"),
  keywordTable: $("#keywordTable"),
  searchInput: $("#searchInput"),
  toast: $("#toast"),
  viewTitle: $("#viewTitle"),
  viewEyebrow: $("#viewEyebrow"),
  selectedTitle: $("#selectedTitle"),
  selectedScore: $("#selectedScore"),
  insightEmpty: $("#insightEmpty"),
  insightBody: $("#insightBody"),
  selectedImage: $("#selectedImage"),
  detailTitle: $("#detailTitle"),
  detailStatus: $("#detailStatus"),
  detailBody: $("#detailBody"),
  targetList: $("#targetList"),
  keywordChips: $("#keywordChips"),
  titlePreview: $("#titlePreview"),
  descriptionPreview: $("#descriptionPreview"),
  optimizeBtn: $("#optimizeBtn"),
  publishBtn: $("#publishBtn")
};

async function init() {
  loadSavedSettings();
  bindEvents();
  hydrateSettingsForms();
  bindSessionActivity();
  await restoreTimedSession();
  await checkServerStatus();
  startBatchPolling();
  render();
}

function bindEvents() {
  $$("[data-view]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });
  $$("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeFilter = button.dataset.filter;
      state.listingPage = 1;
      $$("[data-filter]").forEach((item) => item.classList.toggle("active", item === button));
      renderListings();
    });
  });

  $("#sidebarConnectBtn").addEventListener("click", () => setView("settings"));
  $("#bannerSettingsBtn").addEventListener("click", () => setView("settings"));
  $("#demoBtn").addEventListener("click", connectDemo);
  $("#syncBtn").addEventListener("click", syncListings);
  $("#bulkOptimizeBtn").addEventListener("click", bulkDraft);
  $("#exportBtn").addEventListener("click", exportDrafts);
  $("#importInput").addEventListener("change", importReviewedFile);
  $("#publishImportedBtn").addEventListener("click", publishImportedRows);
  $("#prevPageBtn").addEventListener("click", () => changePage(-1));
  $("#nextPageBtn").addEventListener("click", () => changePage(1));
  $("#pageSize").addEventListener("change", () => {
    state.pageSize = Number($("#pageSize").value) || 50;
    state.listingPage = 1;
    renderListings();
  });
  $("#sortMode").addEventListener("change", () => {
    state.sortMode = $("#sortMode").value;
    state.listingPage = 1;
    renderListings();
  });
  $("#refreshKeywordsBtn").addEventListener("click", () => {
    showToast("Keyword demand refreshed using current listing categories.");
    renderKeywords();
  });
  $("#openGoogleTrendsBtn").addEventListener("click", openGoogleTrendsForSelected);
  $("#googleTrendsInput").addEventListener("change", importGoogleTrendsCsv);
  $("#keywordDataInput").addEventListener("change", importKeywordDataset);
  $("#newProductImage").addEventListener("change", loadNewProductImage);
  $("#sellerLogoInput").addEventListener("change", loadSellerLogo);
  $("#sellerLogoPosition").addEventListener("change", saveSellerLogoPosition);
  $("#removeSellerLogoBtn").addEventListener("click", removeSellerLogo);
  $("#analyzeNewProductBtn").addEventListener("click", analyzeNewProduct);
  $("#generateImagesBtn").addEventListener("click", generateNewProductImages);
  $("#newProductForm").addEventListener("submit", submitNewProduct);
  $("#checkProductBatchBtn").addEventListener("click", checkLatestProductBatch);
  $("#listAnotherProductBtn").addEventListener("click", resetNewProductForm);
  $("#recentBatchSearch").addEventListener("input", renderRecentlyListedProducts);
  $("#refreshCategoryDirectoryBtn").addEventListener("click", () => loadCategoryDirectory({ force: true }));
  $("#categoryDirectorySearch").addEventListener("input", renderCategoryDirectory);
  $("#categoryDirectoryFilter").addEventListener("change", renderCategoryDirectory);
  $("#newTitle").addEventListener("input", updateNewTitleCount);
  $("#newCategoryId").addEventListener("change", prepareProductAttributes);
  $("#newBrandId").addEventListener("change", () => {
    localStorage.setItem("trendlift-default-brand-id", $("#newBrandId").value.trim());
    renderListingReadiness();
  });
  [
    "newTitle", "newDescription", "newListPrice", "newSalePrice", "newQuantity",
    "newBarcode", "newModelCode", "newStockCode", "newAttributes"
  ].forEach((id) => $(`#${id}`).addEventListener("input", renderListingReadiness));
  ["newPackageHeight", "newPackageWidth", "newPackageLength"].forEach((id) => {
    $(`#${id}`).addEventListener("input", calculateTrendyolDimensionalWeight);
  });
  $("#imageLightboxClose").addEventListener("click", closeImageLightbox);
  $("#imageLightbox").addEventListener("click", (event) => {
    if (event.target === $("#imageLightbox")) closeImageLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeImageLightbox();
  });
  els.searchInput.addEventListener("input", () => {
    state.listingPage = 1;
    renderListings();
    renderDashboardListings();
  });
  els.optimizeBtn.addEventListener("click", createDraftForSelected);
  els.publishBtn.addEventListener("click", publishSelected);
  $("#credentialsForm").addEventListener("submit", connectRealStore);
  $("#policyForm").addEventListener("submit", savePolicy);
  $("#publishSettingsForm").addEventListener("submit", savePublishSettings);
  $("#aiSettingsForm").addEventListener("submit", saveAiSettings);
  $("#disconnectBtn").addEventListener("click", disconnectStore);
}

function loadSavedSettings() {
  const saved = localStorage.getItem("trendlift-settings");
  if (saved) {
    try {
      state.settings = { ...state.settings, ...JSON.parse(saved) };
      state.settings.languageMode = ["en", "ar"].includes(state.settings.languageMode) ? state.settings.languageMode : "en";
      state.settings.storeFrontCode = state.settings.storeFrontCode || "SA";
      state.settings.dryRun = false;
    } catch {
      localStorage.removeItem("trendlift-settings");
    }
  }
  state.sellerLogoData = localStorage.getItem("trendlift-seller-logo") || "";
  state.sellerLogoPosition = localStorage.getItem("trendlift-logo-position") === "top-right" ? "top-right" : "top-left";
  $("#newBrandId").value = localStorage.getItem("trendlift-default-brand-id") || "";
  try {
    state.latestProductSubmission = JSON.parse(localStorage.getItem("trendlift-latest-product-submission") || "null");
  } catch {
    state.latestProductSubmission = null;
  }
  try {
    state.recentProductSubmissions = JSON.parse(localStorage.getItem("trendlift-recent-product-submissions") || "[]");
  } catch {
    state.recentProductSubmissions = [];
  }
  $("#productBatchLookup").value = state.latestProductSubmission?.batchRequestId || "";
  renderProductSubmissionStatus();
  renderRecentlyListedProducts();
}

function saveSettings() {
  localStorage.setItem("trendlift-settings", JSON.stringify(state.settings));
}

function readTimedSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}

function writeTimedSession(update = {}) {
  const current = readTimedSession() || {};
  try {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
      ...current,
      ...update,
      lastActivity: Date.now()
    }));
  } catch {
    showToast("Browser storage is full. Session details may need to be entered again after refresh.");
  }
}

function sessionListingSnapshot(listing) {
  return {
    id: listing.id,
    barcode: listing.barcode,
    sku: listing.sku,
    title: listing.title,
    brand: listing.brand,
    category: listing.category,
    price: listing.price,
    stock: listing.stock,
    status: listing.status,
    score: listing.score,
    image: listing.image,
    images: listing.images || [],
    description: listing.description,
    keywords: listing.keywords || [],
    metadata: listing.metadata || {},
    draft: listing.draft || null,
    issues: listing.issues || [],
    imageWarning: listing.imageWarning || "",
    imagesDirty: Boolean(listing.imagesDirty)
  };
}

function persistSessionState(update = {}) {
  const catalog = state.listings.slice(0, SESSION_CATALOG_LIMIT).map(sessionListingSnapshot);
  writeTimedSession({
    mode: state.mode,
    selectedId: state.selectedId,
    lastSyncMessage: state.lastSyncMessage,
    listings: catalog,
    importedRows: state.importedRows,
    keywordDataset: state.keywordDataset,
    ...update
  });
}

function clearTimedSession(showMessage = false) {
  localStorage.removeItem(SESSION_STORAGE_KEY);
  localStorage.removeItem(CATEGORY_DIRECTORY_STORAGE_KEY);
  state.connected = false;
  state.mode = "none";
  state.selectedId = null;
  state.listings = [];
  state.importedRows = [];
  state.keywordDataset = [];
  state.categoryDirectory = [];
  state.categoryDirectoryLoadedAt = 0;
  state.lastSyncMessage = "";
  $("#sellerId").value = "";
  $("#apiKey").value = "";
  $("#apiSecret").value = "";
  $("#openAiApiKey").value = "";
  $("#googleAiApiKey").value = "";
  $("#ideogramApiKey").value = "";
  renderCategoryDirectory();
  if (showMessage) {
    showToast("Session ended after 30 minutes of inactivity. Enter your APIs again to continue.");
    setOperation("Session expired");
    render();
  }
}

function bindSessionActivity() {
  let lastWrite = 0;
  const markActivity = () => {
    const session = readTimedSession();
    if (!session) return;
    const now = Date.now();
    if (now - lastWrite < 15000) return;
    lastWrite = now;
    writeTimedSession();
  };
  ["click", "keydown", "input", "pointermove"].forEach((eventName) => {
    window.addEventListener(eventName, markActivity, { passive: true });
  });
  window.setInterval(() => {
    const session = readTimedSession();
    if (session && Date.now() - Number(session.lastActivity || 0) >= SESSION_TIMEOUT_MS) {
      clearTimedSession(true);
    }
  }, 30000);
}

async function restoreTimedSession() {
  const saved = readTimedSession();
  if (!saved) return;
  if (Date.now() - Number(saved.lastActivity || 0) >= SESSION_TIMEOUT_MS) {
    clearTimedSession();
    return;
  }
  try {
    if (saved.ai) {
      await apiFetch("/api/config-ai", {
        method: "POST",
        body: JSON.stringify(saved.ai)
      });
      $("#openAiApiKey").value = saved.ai.openAiApiKey || "";
      $("#googleAiApiKey").value = saved.ai.googleApiKey || "";
      $("#ideogramApiKey").value = saved.ai.ideogramApiKey || "";
      if (saved.ai.openAiModel) $("#openAiModel").value = saved.ai.openAiModel;
      if (saved.ai.openAiImageModel) $("#openAiImageModel").value = saved.ai.openAiImageModel;
      if (saved.ai.geminiModel) $("#geminiModel").value = saved.ai.geminiModel;
      if (saved.ai.geminiImageModel) $("#geminiImageModel").value = saved.ai.geminiImageModel;
    }
    if (saved.trendyol) {
      const result = await apiFetch("/api/connect", {
        method: "POST",
        body: JSON.stringify(saved.trendyol)
      });
      state.connected = true;
      state.mode = "live";
      $("#sellerId").value = saved.trendyol.sellerId || "";
      $("#apiKey").value = saved.trendyol.apiKey || "";
      $("#apiSecret").value = saved.trendyol.apiSecret || "";
      $("#environment").value = saved.trendyol.environment || "prod";
      $("#storeFrontCode").value = result.storeFrontCode || saved.trendyol.storeFrontCode || "SA";
    }
    if (Array.isArray(saved.keywordDataset)) state.keywordDataset = saved.keywordDataset;
    if (Array.isArray(saved.importedRows)) state.importedRows = saved.importedRows;
    if (Array.isArray(saved.listings) && saved.listings.length) {
      state.listings = saved.listings.map((listing) => enrichListing({ ...listing }));
      state.selectedId = saved.selectedId && state.listings.some((listing) => listing.id === saved.selectedId)
        ? saved.selectedId
        : state.listings[0]?.id || null;
      state.mode = saved.mode || state.mode;
      state.connected = state.mode !== "none";
      state.lastSyncMessage = saved.lastSyncMessage || "";
      setOperation(`Restored ${state.listings.length} listings from the 30-minute session cache`);
    }
    writeTimedSession();
  } catch {
    clearTimedSession();
  }
}

function hydrateSettingsForms() {
  $("#dryRunMode").checked = state.settings.dryRun;
  $("#requireDraftReview").checked = state.settings.requireDraftReview;
  $("#proxyUrl").value = state.settings.proxyUrl;
  $("#storeFrontCode").value = state.settings.storeFrontCode || "";
  $("#titleLimit").value = state.settings.titleLimit;
  $("#minSearches").value = state.settings.minSearches;
  $("#languageMode").value = state.settings.languageMode;
  $("#protectBrandTerms").checked = state.settings.protectBrandTerms;
  $("#analysisProvider").value = state.settings.analysisProvider || "openai";
  $("#imageProvider").value = state.settings.imageProvider || "openai";
  $("#sellerLogoPosition").value = state.sellerLogoPosition;
  renderSellerLogoSettings();
}

function setOperation(message) {
  state.lastOperation = message;
  const node = $("#operationLog");
  if (node) node.textContent = message;
}

async function checkServerStatus() {
  try {
    const response = await apiFetch("/api/status");
    $("#serverStatus").textContent = response.ok ? "Proxy online" : "Static mode";
    state.imageAiAvailable = Boolean(response.imageAiAvailable);
    state.analysisAiAvailable = Boolean(response.analysisAiAvailable);
    state.generationAiAvailable = Boolean(response.generationAiAvailable);
    state.publicImageHosting = Boolean(response.publicImageHosting);
    state.settings.analysisProvider = response.analysisProvider || state.settings.analysisProvider;
    state.settings.imageProvider = response.imageProvider || state.settings.imageProvider;
    $("#analysisProvider").value = state.settings.analysisProvider;
    $("#imageProvider").value = state.settings.imageProvider;
    updateProviderState("#openAiConfiguredState", response.openAiConfigured);
    updateProviderState("#googleConfiguredState", response.googleAiConfigured);
    updateProviderState("#ideogramConfiguredState", response.ideogramConfigured);
    $("#aiStatus").textContent = state.imageAiAvailable ? "Ready" : state.analysisAiAvailable ? "Analysis ready" : "Not configured";
    $("#createAiStatus").textContent = state.analysisAiAvailable ? "Ready to analyze" : "AI check required";
    renderListingReadiness();
  } catch {
    $("#serverStatus").textContent = "Static mode";
    state.imageAiAvailable = false;
    state.analysisAiAvailable = false;
    state.generationAiAvailable = false;
    $("#aiStatus").textContent = "Server offline";
    $("#createAiStatus").textContent = "AI unavailable";
    renderListingReadiness();
  }
}

function updateProviderState(selector, configured) {
  const node = $(selector);
  if (!node) return;
  node.textContent = configured ? "Configured" : "Not configured";
  node.classList.toggle("ready", Boolean(configured));
}

async function saveAiSettings(event) {
  event.preventDefault();
  const button = event.submitter;
  button.disabled = true;
  const aiPayload = {
    analysisProvider: $("#analysisProvider").value,
    imageProvider: $("#imageProvider").value,
    openAiApiKey: $("#openAiApiKey").value.trim(),
    openAiModel: $("#openAiModel").value.trim(),
    openAiImageModel: $("#openAiImageModel").value.trim(),
    googleApiKey: $("#googleAiApiKey").value.trim(),
    geminiModel: $("#geminiModel").value.trim(),
    geminiImageModel: $("#geminiImageModel").value.trim(),
    ideogramApiKey: $("#ideogramApiKey").value.trim()
  };
  try {
    const result = await apiFetch("/api/config-ai", {
      method: "POST",
      body: JSON.stringify(aiPayload)
    });
    state.imageAiAvailable = true;
    state.analysisAiAvailable = true;
    state.generationAiAvailable = true;
    state.settings.analysisProvider = result.analysisProvider;
    state.settings.imageProvider = result.imageProvider;
    saveSettings();
    const currentSession = readTimedSession() || {};
    persistSessionState({
      ai: {
        ...currentSession.ai,
        ...aiPayload,
        openAiApiKey: aiPayload.openAiApiKey || currentSession.ai?.openAiApiKey || "",
        googleApiKey: aiPayload.googleApiKey || currentSession.ai?.googleApiKey || "",
        ideogramApiKey: aiPayload.ideogramApiKey || currentSession.ai?.ideogramApiKey || ""
      }
    });
    $("#openAiApiKey").value = aiPayload.openAiApiKey || currentSession.ai?.openAiApiKey || "";
    $("#googleAiApiKey").value = aiPayload.googleApiKey || currentSession.ai?.googleApiKey || "";
    $("#ideogramApiKey").value = aiPayload.ideogramApiKey || currentSession.ai?.ideogramApiKey || "";
    updateProviderState("#openAiConfiguredState", result.openAiConfigured);
    updateProviderState("#googleConfiguredState", result.googleAiConfigured);
    updateProviderState("#ideogramConfiguredState", result.ideogramConfigured);
    $("#aiStatus").textContent = "Ready";
    $("#createAiStatus").textContent = "Ready for image";
    showToast(result.message || "AI providers saved.");
    setOperation(`${result.analysisProvider} analysis · ${result.imageProvider} image generation`);
  } catch (error) {
    $("#aiStatus").textContent = "Setup failed";
    showToast(error.message || "Could not save AI providers.");
  } finally {
    button.disabled = false;
  }
}

function setView(view) {
  state.activeView = view;
  $$("[data-view]").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  $$("[data-view-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.viewPanel === view));
  const titles = {
    dashboard: ["Seller workspace", "Review and improve your Trendyol listings"],
    listings: ["Products", "Review your store listings"],
    keywords: ["Search terms", "Product search terms"],
    create: ["New product", "Create a listing from one product photo"],
    settings: ["Setup", "Store and image analysis settings"]
  };
  els.viewEyebrow.textContent = titles[view][0];
  els.viewTitle.textContent = titles[view][1];
  if (view === "create") loadCategoryDirectory();
  render();
}

function connectDemo() {
  state.connected = true;
  state.mode = "demo";
  state.listings = demoListings.map((listing) => enrichListing({ ...listing }));
  state.selectedId = state.listings[0]?.id || null;
  state.lastSyncMessage = "";
  persistSessionState();
  showToast("Demo store loaded. You can test every section without using real credentials.");
  setOperation("Demo catalog loaded");
  setView("listings");
}

async function connectRealStore(event) {
  event.preventDefault();
  const payload = {
    sellerId: $("#sellerId").value.trim(),
    apiKey: $("#apiKey").value.trim(),
    apiSecret: $("#apiSecret").value.trim(),
    environment: $("#environment").value,
    storeFrontCode: $("#storeFrontCode").value
  };
  if (!payload.sellerId || !payload.apiKey || !payload.apiSecret) {
    showToast("Seller ID, API key, and API secret are required.");
    return;
  }

  try {
    $("#serverStatus").textContent = "Testing...";
    const result = await apiFetch("/api/connect", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    if (!result.ok) throw new Error(result.message || "Connection failed");
    state.connected = true;
    state.mode = "live";
    state.settings.storeFrontCode = result.storeFrontCode && result.storeFrontCode !== "none" ? result.storeFrontCode : payload.storeFrontCode;
    $("#storeFrontCode").value = state.settings.storeFrontCode || "";
    saveSettings();
    persistSessionState({
      trendyol: {
        ...payload,
        storeFrontCode: state.settings.storeFrontCode || payload.storeFrontCode
      }
    });
    $("#serverStatus").textContent = "Connected";
    showToast("Trendyol connection verified. Click Sync to load all active and inactive listings.");
    setOperation("Connection verified. Ready to sync.");
    setView("dashboard");
  } catch (error) {
    $("#serverStatus").textContent = "Proxy needed";
    showToast(error.message || "Could not connect. Start server.js and try again.");
  }
}

async function syncListings() {
  if (state.mode === "none") {
    showToast("Connect a store or load demo data first.");
    return;
  }
  if (state.mode === "demo") {
    state.listings = state.listings.map((listing) => enrichListing({ ...listing, score: Math.min(96, listing.score + 1) }));
    persistSessionState();
    showToast("Demo listings synced and keyword signals refreshed.");
    setOperation("Demo sync completed");
    setView("listings");
    return;
  }

  try {
    $("#syncBtn").disabled = true;
    $("#syncBtn").innerHTML = `<span data-lucide="loader-circle"></span> Loading all`;
    showToast("Loading all active and inactive listings. Large catalogs can take a little time.");
    setOperation("Sync started: loading all active and inactive listings");
    refreshIcons();
    const result = await apiFetch("/api/products?state=all&size=100");
    const products = Array.isArray(result.items) ? result.items : [];
    state.listings = products.map(normalizeTrendyolProduct).map(enrichListing);
    state.selectedId = state.listings[0]?.id || null;
    if (!state.listings.length) {
      state.lastSyncMessage =
        "Connected, but Trendyol returned 0 products from approved and unapproved product APIs. Try selecting the exact Storefront Code in Settings, then Test connection again. Also check that the Seller ID is the Supplier ID for these API credentials and Product Integration permission is enabled.";
      if (state.settings.storeFrontCode) {
        state.lastSyncMessage += ` Storefront tested: ${state.settings.storeFrontCode}.`;
      } else {
        state.lastSyncMessage += " The proxy also tried common storefront codes automatically.";
      }
      showToast("Connected, but Trendyol returned 0 listings. See the Listings empty state for checks.");
      setOperation("Sync completed with 0 listings returned from Trendyol");
    } else {
      state.lastSyncMessage = "";
      const reported = result.raw?.totalElementsReported || result.raw?.totalElements;
      const countText = reported && reported !== state.listings.length ? `${state.listings.length} loaded from ${reported} reported` : `${state.listings.length} loaded`;
      showToast(`${countText} via ${result.endpoint || "product endpoint"}.`);
      setOperation(`Sync completed: ${countText}`);
    }
    persistSessionState();
    setView("listings");
  } catch (error) {
    showToast(error.message || "Live sync failed. Check credentials and local proxy.");
    setOperation(`Sync failed: ${error.message || "unknown error"}`);
  } finally {
    $("#syncBtn").disabled = false;
    $("#syncBtn").innerHTML = `<span data-lucide="refresh-cw"></span> Sync`;
    refreshIcons();
  }
}

function disconnectStore() {
  clearTimedSession();
  state.connected = false;
  state.mode = "none";
  state.selectedId = null;
  state.listings = [];
  state.lastSyncMessage = "";
  showToast("Store disconnected in this browser session.");
  setOperation("Store disconnected");
  render();
}

function savePolicy(event) {
  event.preventDefault();
  const previousLanguage = state.settings.languageMode;
  state.settings.titleLimit = Number($("#titleLimit").value) || 100;
  state.settings.minSearches = Number($("#minSearches").value) || 0;
  state.settings.languageMode = $("#languageMode").value;
  state.settings.protectBrandTerms = $("#protectBrandTerms").checked;
  if (previousLanguage !== state.settings.languageMode) {
    state.listings.forEach((listing) => {
      if (listing.status === "optimized") return;
      listing.draft = null;
      listing.keywords = [];
      listing.status = "needs";
      listing.issues = [`Analyze the product photo again to create a ${state.settings.languageMode === "ar" ? "Arabic" : "English"} recommendation.`];
    });
  }
  state.listings = state.listings.map(enrichListing);
  saveSettings();
  persistSessionState();
  showToast(`Output settings saved. New recommendations will be written in ${state.settings.languageMode === "ar" ? "Arabic" : "English"}.`);
  setOperation(`Recommendation language set to ${state.settings.languageMode === "ar" ? "Arabic" : "English"}`);
  render();
}

function savePublishSettings(event) {
  event.preventDefault();
  state.settings.dryRun = $("#dryRunMode").checked;
  state.settings.requireDraftReview = $("#requireDraftReview").checked;
  state.settings.proxyUrl = $("#proxyUrl").value.trim();
  saveSettings();
  persistSessionState();
  showToast("Publishing settings saved.");
  setOperation("Publishing settings saved");
}

function normalizeTrendyolProduct(product) {
  const variant = product.variants?.[0] || product;
  const images = normalizeImages(product.images);
  const image = images[0] || "";
  const salePrice = variant.price?.salePrice || product.price?.salePrice || product.salePrice || product.price || "";
  const listPrice = variant.price?.listPrice || product.price?.listPrice || product.listPrice || salePrice;
  const brand = displayValue(product.brand?.name || product.brand || product.brandName || "Unknown brand");
  const category = displayValue(product.category?.name || product.categoryName || product.category || "Uncategorized");
  return {
    id: String(variant.variantId || product.id || product.contentId || product.listingId || variant.barcode || product.barcode || crypto.randomUUID()),
    barcode: String(variant.barcode || product.barcode || ""),
    sku: String(variant.stockCode || product.stockCode || product.sku || product.productCode || variant.barcode || product.barcode || "NO-SKU"),
    title: displayValue(product.title || product.name || "Untitled Trendyol product"),
    brand,
    category,
    price: salePrice ? formatSaudiPrice(salePrice) : listPrice ? formatSaudiPrice(listPrice) : "No price",
    stock: Number(variant.stock?.quantity || product.stock?.quantity || product.quantity || product.stock || product.availableQuantity || 0),
    status: "needs",
    image,
    images,
    description: displayValue(product.description || ""),
    keywords: generateKeywords(product.title || "", category, {
      color: getAttributeValue(product, ["color", "colour", "renk"]),
      size: getAttributeValue(product, ["size", "beden"])
    }),
    metadata: {
      brandId: product.brand?.id || product.brandId,
      categoryId: product.category?.id || product.pimCategoryId || product.categoryId,
      vatRate: variant.vatRate || product.vatRate,
      cargoCompanyId: variant.cargoCompanyId || product.cargoCompanyId,
      contentId: product.contentId,
      variantId: variant.variantId,
      color: getAttributeValue(product, ["color", "colour", "renk"]),
      size: getAttributeValue(product, ["size", "beden"]),
      modelCode: product.modelCode,
      dimensionalWeight: variant.dimensionalWeight || product.dimensionalWeight,
      productMainId: product.productMainId,
      approved: product.approved,
      archived: product.archived,
      locked: product.locked,
      onSale: product.onSale
    },
    source: product
  };
}

function normalizeImages(images) {
  if (!Array.isArray(images)) return [];
  return images
    .map((image) => normalizeImageUrl(image?.url || image))
    .filter(Boolean);
}

function getAttributeValue(product, names) {
  const attributes = product.attributes || product.productAttributes || [];
  const match = attributes.find((attribute) => {
    const name = String(attribute.attributeName || attribute.name || "").toLowerCase();
    return names.some((candidate) => name.includes(candidate));
  });
  return displayValue(match?.attributeValue || match?.value || "");
}

function normalizeImageUrl(url) {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("/")) return `https://cdn.dsmcdn.com${url}`;
  return url;
}

function formatSaudiPrice(value) {
  const amount = Number(String(value).replace(/,/g, ""));
  if (!Number.isFinite(amount)) return `${displayValue(value)} SAR`;
  return `${new Intl.NumberFormat("en-SA", { maximumFractionDigits: 2 }).format(amount)} SAR`;
}

function enrichListing(listing) {
  listing.title = displayValue(listing.title);
  listing.description = displayValue(listing.description);
  listing.brand = displayValue(listing.brand);
  listing.category = displayValue(listing.category);
  listing.price = displayValue(listing.price);
  listing.barcode = displayValue(listing.barcode);
  listing.sku = displayValue(listing.sku);
  const hasVerifiedDraft = Boolean(listing.draft?.metadata?.detectedProductType);
  const keywords = hasVerifiedDraft ? listing.keywords || [] : listing.image ? [] : generateKeywords(listing.title, listing.category, listing.metadata);
  const issues = listing.image && !hasVerifiedDraft
    ? ["Analyze the product photo before creating a recommendation."]
    : getIssues(listing, keywords);
  const score = listing.status === "optimized" ? Math.max(listing.score || 0, 90) : calculateScore(listing, keywords, issues);
  return { ...listing, keywords, issues, score, draft: hasVerifiedDraft ? listing.draft : null };
}

function generateKeywords(title, category, metadata = {}) {
  const profile = detectProductProfile({ title, category, metadata });
  const englishTitle = translateTitleToEnglish(title);
  const color = translateTitleToEnglish(metadata?.color || "").toLowerCase();
  const imported = state.keywordDataset
    .filter((row) => {
      const term = cleanKeyword(row.Keyword || row.keyword || row.Term || row.term);
      const productType = cleanKeyword(row.ProductType || row.productType || row.Category || row.category);
      return term && (!productType || productType === profile.type || isRelevantKeyword(term, profile));
    })
    .map((row) => ({
      term: cleanKeyword(row.Keyword || row.keyword || row.Term || row.term),
      searches: Number(row.Searches || row.searches || row.MonthlySearches || row.monthlySearches || 0),
      competition: displayValue(row.Competition || row.competition || "Medium"),
      source: "Imported last-month keyword dataset"
    }))
    .filter((row) => row.searches > 0 && isRelevantKeyword(row.term, profile));
  const candidates = [
    profile.type,
    ...profile.keywords,
    color ? `${color} ${profile.type}` : "",
    englishTitle.toLowerCase()
  ].filter(Boolean);
  const estimated = [...new Set(candidates.map(cleanKeyword))]
    .filter((term) => term && isRelevantKeyword(term, profile))
    .slice(0, 6)
    .map((term, index) => ({
      term,
      searches: estimatedMonthlySearches(term, profile.type, index),
      competition: index < 2 ? "High" : index < 4 ? "Medium" : "Low",
      source: "Estimated relevance model"
    }));
  return [...imported, ...estimated]
    .sort((a, b) => b.searches - a.searches)
    .filter((keyword, index, rows) => rows.findIndex((candidate) => candidate.term === keyword.term) === index)
    .slice(0, 6);
}

function detectProductProfile(listing) {
  const visualFacts = [
    listing.metadata?.detectedProductType,
    listing.metadata?.color,
    listing.metadata?.material,
    listing.metadata?.size
  ].filter(Boolean).join(" ");
  const haystack = `${displayValue(listing.title)} ${displayValue(listing.category)} ${visualFacts}`.toLowerCase();
  return PRODUCT_PROFILES.find((profile) => profile.match.some((term) => haystack.includes(term))) || {
    type: "product",
    keywords: [],
    benefits: []
  };
}

function cleanKeyword(value) {
  return String(value).replace(/\s+/g, " ").trim().toLowerCase();
}

function containsTechnicalIdentifier(value) {
  return /\b(product\s*main\s*id|productmainid|content\s*id|variant\s*id|category\s*id|brand\s*id|stock\s*code|model\s*code|barcode)\b/i.test(String(value || ""));
}

function sanitizeSellerCopy(value) {
  return displayValue(value)
    .split(/(?<=[.!?])\s+/)
    .filter((sentence) => !containsTechnicalIdentifier(sentence))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function isRelevantKeyword(keyword, profile) {
  const typeWords = profile.type.split(/\s+/);
  return typeWords.some((word) => keyword.includes(word)) || profile.keywords.some((term) => keyword.includes(term) || term.includes(keyword));
}

function estimatedMonthlySearches(term, type, index) {
  let hash = 0;
  for (const char of `${type}:${term}`) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return Math.max(800, 24000 - index * 3100 - (hash % 4200));
}

function getIssues(listing, keywords) {
  const issues = [];
  const title = listing.title.toLowerCase();
  const description = (listing.description || "").trim();
  const topKeyword = keywords[0]?.term || "";
  if (topKeyword && !title.includes(topKeyword.split(" ")[0])) issues.push("Title misses one or more high-demand buyer terms.");
  if (listing.title.length < 45) issues.push("Title is short and leaves useful search space unused.");
  if (description.length < 130) issues.push("Description needs stronger benefits, material details, and use cases.");
  if (Object.keys(listing.metadata || {}).filter((key) => listing.metadata[key]).length < 3) issues.push("Metadata attributes are incomplete for filtering and category relevance.");
  if (!listing.stock || listing.stock < 10) issues.push("Low stock can reduce conversion after traffic improves.");
  return issues.length ? issues : ["Listing is strong. Continue monitoring keyword demand and conversion."];
}

function calculateScore(listing, keywords, issues) {
  const demandBonus = keywords.filter((keyword) => keyword.searches >= state.settings.minSearches).length * 7;
  const titleScore = Math.min(30, listing.title.length * 0.45);
  const descriptionScore = Math.min(25, (listing.description || "").length * 0.12);
  const metadataScore = Math.min(20, Object.keys(listing.metadata || {}).length * 5);
  return Math.max(22, Math.min(96, Math.round(titleScore + descriptionScore + metadataScore + demandBonus - issues.length * 4)));
}

function translateTitleToEnglish(value) {
  return displayValue(value)
    .split(/\s+/)
    .map((word) => {
      const key = word.toLocaleLowerCase("tr").replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
      return TITLE_TRANSLATIONS.get(key) || word;
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function clipAtWord(value, limit) {
  if (value.length <= limit) return value;
  return value.slice(0, limit + 1).replace(/\s+\S*$/, "").trim();
}

function selectedProductQuery() {
  const listing = selectedListing();
  return listing?.draft?.metadata?.detectedProductType || state.newProductAnalysis?.productType || "";
}

function openGoogleTrendsForSelected() {
  const query = selectedProductQuery();
  if (!query) {
    showToast("Analyze a product photo first, then open Google Trends.");
    return;
  }
  const url = `https://trends.google.com/trends/explore?date=today%203-m&geo=SA&q=${encodeURIComponent(query)}`;
  window.open(url, "_blank", "noopener,noreferrer");
  setOperation(`Opened Saudi Google Trends for ${query}`);
}

function importGoogleTrendsCsv(event) {
  const file = event.target.files?.[0];
  const listing = selectedListing();
  if (!file || !listing?.draft?.metadata?.detectedProductType) {
    showToast("Select and analyze a listing before importing its Google Trends CSV.");
    event.target.value = "";
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    const terms = parseGoogleTrendsRows(String(reader.result));
    if (!terms.length) {
      showToast("No Google Trends related queries were found in this CSV.");
      return;
    }
    listing.keywords = terms.slice(0, 10).map((row) => ({
      term: row.term,
      searches: row.value,
      competition: "Google Trends",
      source: "Google Trends Saudi Arabia CSV"
    }));
    showToast(`Imported ${listing.keywords.length} Google Trends terms for ${listing.draft.metadata.detectedProductType}.`);
    setOperation(`Google Trends Saudi Arabia terms imported for ${listing.sku}`);
    render();
  };
  reader.readAsText(file);
  event.target.value = "";
}

function parseGoogleTrendsRows(csv) {
  const lines = csv.replace(/^\uFEFF/, "").split(/\r?\n/).filter((line) => line.trim());
  const headerIndex = lines.findIndex((line) => {
    const values = parseCsvLine(line).map((value) => value.trim().toLowerCase());
    return values.some((value) => ["query", "related queries", "term"].includes(value));
  });
  const dataLines = headerIndex >= 0 ? lines.slice(headerIndex + 1) : lines;
  return dataLines.map((line) => {
    const values = parseCsvLine(line);
    return {
      term: displayValue(values[0]).trim(),
      value: Number(String(values[1] || 0).replace(/[^\d.]/g, ""))
    };
  }).filter((row) => row.term && !/^(top|rising|query|related queries)$/i.test(row.term));
}

function updateNewTitleCount() {
  const length = $("#newTitle").value.length;
  $("#newTitleCount").textContent = `${length}/100 characters`;
}

function calculateTrendyolDimensionalWeight() {
  const height = Number($("#newPackageHeight").value);
  const width = Number($("#newPackageWidth").value);
  const length = Number($("#newPackageLength").value);
  if (!(height > 0 && width > 0 && length > 0)) return;
  $("#newDimensionalWeight").value = Math.max(1, Math.ceil((height * width * length) / 3000 * 10) / 10);
  renderListingReadiness();
}

function readCachedCategoryDirectory() {
  try {
    const saved = JSON.parse(localStorage.getItem(CATEGORY_DIRECTORY_STORAGE_KEY) || "null");
    if (!saved || Date.now() - Number(saved.createdAt || 0) > SESSION_TIMEOUT_MS) return [];
    return Array.isArray(saved.categories) ? saved.categories : [];
  } catch {
    return [];
  }
}

function writeCachedCategoryDirectory(categories) {
  try {
    localStorage.setItem(CATEGORY_DIRECTORY_STORAGE_KEY, JSON.stringify({
      createdAt: Date.now(),
      categories
    }));
  } catch {
    showToast("Category list is too large for browser cache. It will reload when needed.");
  }
}

async function loadCategoryDirectory({ force = false } = {}) {
  if (state.categoryDirectoryLoading) return;
  const status = $("#categoryDirectoryStatus");
  if (!force && state.categoryDirectory.length) {
    renderCategoryDirectory();
    return;
  }
  if (!force) {
    const cached = readCachedCategoryDirectory();
    if (cached.length) {
      state.categoryDirectory = cached;
      state.categoryDirectoryLoadedAt = Date.now();
      status.textContent = `${cached.length} cached Trendyol categories loaded.`;
      renderCategoryDirectory();
      return;
    }
  }
  if (state.mode !== "live") {
    status.textContent = "Connect your live Trendyol store to load all Saudi categories.";
    renderCategoryDirectory();
    return;
  }
  state.categoryDirectoryLoading = true;
  status.textContent = "Loading all Trendyol Saudi categories...";
  $("#refreshCategoryDirectoryBtn").disabled = true;
  renderCategoryDirectory();
  try {
    const result = await apiFetch(`/api/categories?language=${state.settings.languageMode}`);
    const categories = result.categories || [];
    state.categoryDirectory = categories;
    state.categoryDirectoryLoadedAt = Date.now();
    writeCachedCategoryDirectory(categories);
    status.textContent = `${categories.length} Trendyol categories loaded A-Z.`;
    showToast(`Loaded ${categories.length} Trendyol categories.`);
  } catch (error) {
    status.textContent = error.message || "Could not load Trendyol categories.";
    showToast(error.message || "Could not load Trendyol categories.");
  } finally {
    state.categoryDirectoryLoading = false;
    $("#refreshCategoryDirectoryBtn").disabled = false;
    renderCategoryDirectory();
    refreshIcons();
  }
}

function renderCategoryDirectory() {
  const tbody = $("#categoryDirectoryRows");
  if (!tbody) return;
  const query = $("#categoryDirectorySearch")?.value.trim().toLowerCase() || "";
  const leafOnly = $("#categoryDirectoryFilter")?.value !== "all";
  let rows = state.categoryDirectory;
  if (leafOnly) rows = rows.filter((category) => category.leaf);
  if (query) {
    rows = rows.filter((category) =>
      [category.id, category.name, category.path].join(" ").toLowerCase().includes(query)
    );
  }
  const visible = rows.slice(0, 150);
  if (!state.categoryDirectory.length && state.categoryDirectoryLoading) {
    tbody.innerHTML = `<tr><td colspan="3">Loading categories...</td></tr>`;
    return;
  }
  if (!state.categoryDirectory.length) {
    tbody.innerHTML = `<tr><td colspan="3">No categories loaded yet. Click Load categories after connecting Trendyol.</td></tr>`;
    return;
  }
  if (!visible.length) {
    tbody.innerHTML = `<tr><td colspan="3">No category matches your search.</td></tr>`;
    return;
  }
  tbody.innerHTML = visible.map((category) => `
    <tr class="${category.leaf ? "leaf" : "parent"}" data-category-id="${Number(category.id)}">
      <td>${Number(category.id)}</td>
      <td>${escapeHtml(category.name)}${category.leaf ? "" : " <span>Parent</span>"}</td>
      <td>${escapeHtml(category.path || category.name)}</td>
    </tr>
  `).join("");
  $$("#categoryDirectoryRows tr[data-category-id]").forEach((row) => {
    row.addEventListener("click", () => selectCategoryDirectoryRow(Number(row.dataset.categoryId)));
  });
}

async function selectCategoryDirectoryRow(categoryId) {
  const category = state.categoryDirectory.find((item) => Number(item.id) === categoryId);
  if (!category) return;
  if (!category.leaf) {
    showToast("This is a parent category. Select the lowest-level category for Trendyol listing.");
  }
  $("#newCategoryId").value = category.id;
  $("#newSuggestedCategory").value = category.path || category.name;
  $$("#categoryDirectoryRows tr").forEach((row) => row.classList.toggle("selected", Number(row.dataset.categoryId) === Number(category.id)));
  setOperation(`Selected category ${category.id}: ${category.path || category.name}`);
  renderListingReadiness();
  await prepareProductAttributes();
}

async function loadCategorySuggestions(query) {
  const suggested = displayValue(query).trim();
  if (!suggested) return;
  const datalist = $("#newCategoryOptions");
  datalist.innerHTML = "";
  if (state.mode !== "live") {
    $("#newSuggestedCategory").value = suggested;
    return;
  }
  try {
    const result = await apiFetch(`/api/category-suggestions?q=${encodeURIComponent(suggested)}&language=${state.settings.languageMode}`);
    const categories = result.categories || [];
    datalist.innerHTML = categories.map((category) =>
      `<option value="${category.id}">${escapeHtml(category.path || category.name)}</option>`
    ).join("");
    if (categories[0]?.id) {
      $("#newCategoryId").value = categories[0].id;
      $("#newSuggestedCategory").value = categories[0].path || categories[0].name;
      await prepareProductAttributes();
    }
  } catch (error) {
    $("#newSuggestedCategory").value = `${suggested} · Enter the matching leaf category ID`;
    setOperation(`Category name suggested; live Trendyol category lookup failed: ${error.message}`);
  }
}

function readNewProductAttributes() {
  try {
    const attributes = JSON.parse($("#newAttributes").value || "[]");
    return Array.isArray(attributes) ? attributes : [];
  } catch {
    return null;
  }
}

async function prepareProductAttributes() {
  const categoryId = Number($("#newCategoryId").value);
  if (!categoryId || !state.newProductImageData || state.preparingCategoryAttributes) {
    renderListingReadiness();
    return false;
  }
  const attributes = readNewProductAttributes();
  if (!attributes) {
    showToast("Category attributes must be valid JSON before preparation.");
    return false;
  }
  state.preparingCategoryAttributes = true;
  state.categoryAttributesPrepared = false;
  renderListingReadiness();
  try {
    const result = await apiFetch("/api/prepare-product-attributes", {
      method: "POST",
      body: JSON.stringify({
        categoryId,
        attributes,
        image: state.newProductImageData,
        title: $("#newTitle").value.trim(),
        description: $("#newDescription").value.trim(),
        productType: state.newProductAnalysis?.productType || ""
      })
    });
    $("#newAttributes").value = JSON.stringify(result.attributes || [], null, 2);
    state.missingCategoryAttributes = result.missingRequiredAttributes || [];
    state.requiredCategoryAttributeCount = Number(result.requiredCount || 0);
    state.categoryAttributesPrepared = true;
    renderRequiredAttributeFields();
    return state.missingCategoryAttributes.length === 0;
  } catch (error) {
    state.missingCategoryAttributes = [];
    state.requiredCategoryAttributeCount = 0;
    state.categoryAttributesPrepared = false;
    renderRequiredAttributeFields();
    showToast(error.message || "Could not prepare category attributes.");
    return false;
  } finally {
    state.preparingCategoryAttributes = false;
    renderListingReadiness();
  }
}

function renderRequiredAttributeFields() {
  const container = $("#requiredAttributeFields");
  const missing = state.missingCategoryAttributes;
  container.classList.toggle("hidden", !missing.length);
  if (!missing.length) {
    container.innerHTML = "";
    return;
  }
  container.innerHTML = `
    <h3>Complete ${missing.length} attribute${missing.length === 1 ? "" : "s"} AI could not verify</h3>
    <p class="field-note">Choose the accurate value. These are live values accepted by the selected Trendyol category.</p>
    <div class="form-grid">
      ${missing.map((attribute) => `
        <label>
          ${escapeHtml(attribute.name)}
          ${attribute.values?.length
            ? `<select data-required-attribute="${attribute.attributeId}">
                <option value="">Select value</option>
                ${attribute.values.map((value) => `<option value="${value.id}">${escapeHtml(value.name)}</option>`).join("")}
              </select>`
            : `<input data-required-attribute="${attribute.attributeId}" placeholder="Enter accurate value" />`}
        </label>
      `).join("")}
    </div>
  `;
  $$("[data-required-attribute]").forEach((control) => {
    control.addEventListener("change", () => applyRequiredAttributeValue(control));
  });
}

function applyRequiredAttributeValue(control) {
  const attributeId = Number(control.dataset.requiredAttribute);
  const missing = state.missingCategoryAttributes.find((attribute) => attribute.attributeId === attributeId);
  if (!missing || !control.value.trim()) return;
  const current = readNewProductAttributes() || [];
  current.push(missing.values?.length
    ? { attributeId, attributeValueId: Number(control.value) }
    : { attributeId, customAttributeValue: control.value.trim() });
  $("#newAttributes").value = JSON.stringify(current, null, 2);
  state.missingCategoryAttributes = state.missingCategoryAttributes.filter((attribute) => attribute.attributeId !== attributeId);
  renderRequiredAttributeFields();
  renderListingReadiness();
}

function renderListingReadiness() {
  const container = $("#listingReadinessItems");
  if (!container) return;
  const attributes = readNewProductAttributes();
  const expectedImages = getRequiredProductImageScenes().length;
  const publicImages = state.generatedProductImages.length > 0 && state.generatedProductImages.every((item) =>
    /^https:\/\//i.test(item.publicUrl || item.image)
  );
  const checks = [
    {
      label: "AI product content",
      detail: $("#newTitle").value.trim() && $("#newDescription").value.trim().length >= 500
        ? "Title and description ready"
        : "Analyze or complete product copy",
      ready: Boolean($("#newTitle").value.trim() && $("#newDescription").value.trim().length >= 500)
    },
    {
      label: "Category attributes",
      detail: state.preparingCategoryAttributes
        ? "Checking Trendyol requirements"
        : state.missingCategoryAttributes.length
          ? `${state.missingCategoryAttributes.length} value${state.missingCategoryAttributes.length === 1 ? "" : "s"} need review`
          : state.categoryAttributesPrepared
            ? "Live category check passed"
            : Number($("#newCategoryId").value) ? "Run live category check" : "Select a category",
      ready: Boolean(!state.preparingCategoryAttributes && state.categoryAttributesPrepared && attributes && !state.missingCategoryAttributes.length)
    },
    {
      label: "Public product images",
      detail: publicImages
        ? `${state.generatedProductImages.length} of ${expectedImages} public images ready`
        : state.generatedProductImages.length
          ? `${state.generatedProductImages.length} of ${expectedImages} images created. Open the deployed Railway app to publish`
          : "Generate listing images",
      ready: publicImages
    },
    {
      label: "Seller product codes",
      detail: $("#newBarcode").value.trim() && $("#newModelCode").value.trim() && $("#newStockCode").value.trim()
        ? "Barcode, model and stock code ready"
        : "Enter barcode, model and stock code",
      ready: Boolean($("#newBarcode").value.trim() && $("#newModelCode").value.trim() && $("#newStockCode").value.trim())
    },
    {
      label: "Price and inventory",
      detail: Number($("#newListPrice").value) > 0 && Number($("#newSalePrice").value) > 0 && Number($("#newDimensionalWeight").value) > 0
        ? "SAR prices, stock and package size ready"
        : "Enter prices and package dimensions",
      ready: Boolean(Number($("#newListPrice").value) > 0 && Number($("#newSalePrice").value) > 0 && Number($("#newDimensionalWeight").value) > 0)
    },
    {
      label: "Brand",
      detail: Number($("#newBrandId").value) > 0 ? "Saved brand ID ready" : "Enter your Trendyol brand ID once",
      ready: Boolean(Number($("#newBrandId").value) > 0)
    }
  ];
  const readyCount = checks.filter((check) => check.ready).length;
  container.innerHTML = checks.map((check) => `
    <div class="readiness-item ${check.ready ? "ready" : ""}">
      <span data-lucide="${check.ready ? "circle-check" : "circle-alert"}"></span>
      <div><strong>${escapeHtml(check.label)}</strong><span>${escapeHtml(check.detail)}</span></div>
    </div>
  `).join("");
  $("#listingReadinessBadge").textContent = readyCount === checks.length ? "Ready" : `${readyCount}/${checks.length}`;
  $("#listingReadinessSummary").textContent = readyCount === checks.length
    ? "Every required section passed preflight."
    : "Complete the remaining items before listing.";
  refreshIcons();
}

async function createDraftForSelected() {
  const listing = selectedListing();
  if (!listing) return;
  if (!listing.image) {
    showToast("This listing has no product image to analyze.");
    return;
  }
  if (!state.analysisAiAvailable) {
    showToast("Enable product image analysis in Settings first.");
    setOperation("Choose and configure an AI analysis provider before creating recommendations.");
    setView("settings");
    return;
  }
  const buttons = [els.optimizeBtn, $("#detailOptimizeBtn")].filter(Boolean);
  buttons.forEach((button) => {
    button.disabled = true;
    button.innerHTML = `<span data-lucide="loader-circle"></span> Analyzing photo`;
  });
  refreshIcons();
  try {
    await analyzeListingImage(listing);
    showToast(`${listing.sku} is ready for review.`);
    setOperation(`Photo analyzed for ${listing.sku}. Review the new title and description.`);
    render();
  } catch (error) {
    buttons.forEach((button) => {
      button.disabled = false;
      button.innerHTML = `<span data-lucide="scan-search"></span> Analyze product photo`;
    });
    refreshIcons();
    showToast(error.message || "Image analysis failed. No recommendation was created.");
    setOperation(`Image analysis failed and no listing text was changed: ${error.message}`);
  }
}

async function analyzeListingImage(listing) {
  const result = await apiFetch("/api/optimize-listing", {
    method: "POST",
    body: JSON.stringify({
      listing: {
        title: listing.title,
        description: listing.description,
        brand: listing.brand,
        category: listing.category,
        metadata: {
          color: listing.metadata?.color || "",
          material: listing.metadata?.material || "",
          size: listing.metadata?.size || ""
        },
        keywords: [],
        image: listing.image,
        outputLanguage: state.settings.languageMode
      }
    })
  });
  const title = clipAtWord(sanitizeSellerCopy(result.title), state.settings.titleLimit);
  const description = sanitizeSellerCopy(result.description);
  const searchTerms = (result.keywords || [])
    .map(sanitizeSellerCopy)
    .filter((term) => term && !containsTechnicalIdentifier(term))
    .slice(0, 6);
  if (!title || !description || containsTechnicalIdentifier(title) || containsTechnicalIdentifier(description)) {
    throw new Error("The generated copy included invalid system data. Please analyze the photo again.");
  }
  if (title.length > 100) {
    throw new Error("The title must not exceed 100 characters.");
  }
  if (description.length < 500) {
    throw new Error("The description must contain at least 500 characters.");
  }
  if (!searchTerms.length) {
    throw new Error("No product search terms were returned. Please analyze the photo again.");
  }
  listing.draft = {
    title,
    description,
    metadata: {
      ...listing.metadata,
      color: sanitizeSellerCopy(result.color) || listing.metadata?.color || "",
      material: sanitizeSellerCopy(result.material) || listing.metadata?.material || "",
      detectedProductType: sanitizeSellerCopy(result.detectedProductType) || "product",
      suggestedCategory: sanitizeSellerCopy(result.suggestedCategory) || sanitizeSellerCopy(result.detectedProductType) || "",
      imageMismatch: Boolean(result.mismatch),
      generatedBy: result.model || "Image analysis",
      optimizedAt: new Date().toISOString()
    }
  };
  listing.imageWarning = result.mismatch
    ? sanitizeSellerCopy(result.warning) || `The photo shows a ${result.detectedProductType}, but the current listing text describes another product.`
    : "";
  listing.keywords = searchTerms
    .map((term, index) => ({
      term: cleanKeyword(term),
      searches: estimatedMonthlySearches(term, result.detectedProductType || "product", index),
      competition: index < 2 ? "High" : "Medium",
      source: "Image-verified product analysis"
    }));
  listing.status = "draft";
  listing.score = Math.max(listing.score, 86);
  listing.issues = [
    ...(listing.imageWarning ? [listing.imageWarning] : []),
    "Review the image-verified title and description, then publish when ready."
  ];
  persistSessionState();
}

async function bulkDraft() {
  if (!state.listings.length) {
    showToast("No listings are available to analyze.");
    return;
  }
  if (!state.analysisAiAvailable) {
    showToast("Enable product image analysis in Settings first.");
    setView("settings");
    return;
  }
  const queue = state.listings.filter((listing) => listing.image && !listing.draft && listing.status !== "optimized").slice(0, 5);
  if (!queue.length) {
    showToast("The next listings are already ready for review.");
    return;
  }
  const button = $("#bulkOptimizeBtn");
  button.disabled = true;
  let completed = 0;
  for (const listing of queue) {
    button.innerHTML = `<span data-lucide="loader-circle"></span> Analyzing ${completed + 1} of ${queue.length}`;
    refreshIcons();
    try {
      await analyzeListingImage(listing);
      completed += 1;
    } catch (error) {
      listing.issues = [`Photo analysis failed: ${error.message}`];
      if (["OPENAI_RATE_LIMIT", "GOOGLE_RATE_LIMIT", "IDEOGRAM_RATE_LIMIT"].includes(error.code)) {
        showToast(error.message);
        break;
      }
    }
  }
  button.disabled = false;
  button.innerHTML = `<span data-lucide="scan-search"></span> Analyze next 5`;
  showToast(`${completed} listings are ready for review.`);
  setOperation(`Analyzed ${completed} of ${queue.length} listing photos`);
  persistSessionState();
  render();
}

async function publishSelected() {
  const listing = selectedListing();
  if (!listing) return;
  if (state.settings.requireDraftReview && listing.status !== "draft") {
    showToast("Create and review a draft before publishing.");
    return;
  }
  const payload = {
    dryRun: state.settings.dryRun,
    listing: buildPublishPayload(listing)
  };
  if (!payload.listing.title || payload.listing.title.length > 100) {
    showToast("Approved title is required and must not exceed 100 characters.");
    return;
  }
  if (payload.listing.description.length < 500) {
    showToast("Approved description must contain at least 500 characters.");
    return;
  }

  if (state.mode !== "live") {
    listing.status = "optimized";
    listing.score = 93;
    persistSessionState();
    showToast("Demo publish completed. In live mode this sends through the local proxy.");
    render();
    return;
  }

  try {
    els.publishBtn.disabled = true;
    els.publishBtn.innerHTML = `<span data-lucide="loader-circle"></span> Publishing`;
    refreshIcons();
    const result = await apiFetch("/api/publish", { method: "POST", body: JSON.stringify(payload) });
    listing.status = result.dryRun ? "draft" : "optimized";
    listing.title = payload.listing.title;
    listing.description = payload.listing.description;
    listing.batchRequestId = result.batchRequestId || null;
    persistSessionState();
    showToast(result.message || "Publish request completed.");
    setOperation(result.batchRequestId ? `Publish submitted. Batch ${result.batchRequestId}` : "Publish request completed");
    render();
  } catch (error) {
    showToast(error.message || "Publish failed. Review proxy logs.");
    setOperation(`Publish failed: ${error.message || "unknown error"}`);
  } finally {
    els.publishBtn.innerHTML = `<span data-lucide="send"></span> Publish approved changes`;
    refreshIcons();
  }
}

function buildPublishPayload(listing) {
  const detailTitle = $("#detailTitlePreview")?.value.trim();
  const detailDescription = $("#detailDescriptionPreview")?.value.trim();
  const title = detailTitle || els.titlePreview.value.trim() || listing.draft?.title || listing.title;
  const description = detailDescription || els.descriptionPreview.value.trim() || listing.draft?.description || listing.description;
  return {
    contentId: listing.metadata?.contentId || listing.source?.contentId || null,
    barcode: listing.barcode,
    title,
    description,
    metadata: listing.draft?.metadata || listing.metadata,
    source: listing.source || null
  };
}

function selectedListing() {
  return state.listings.find((listing) => listing.id === state.selectedId);
}

function render() {
  renderConnection();
  renderMetrics();
  renderDashboardListings();
  renderListings();
  renderSelectedListing();
  renderListingDetails();
  renderKeywords();
  refreshIcons();
}

function renderConnection() {
  els.connectBanner.classList.toggle("hidden", state.connected);
  const label = state.mode === "live" ? "Live store connected" : state.mode === "demo" ? "Demo store connected" : "Not connected";
  const detail = state.mode === "live"
    ? `${state.listings.length} listings synced through local proxy.`
    : state.mode === "demo"
      ? "Demo data loaded for full workflow testing."
      : "Add Trendyol credentials in Settings, or load demo data.";
  els.connectionCard.classList.toggle("connected", state.connected);
  els.connectionCard.innerHTML = `
    <div class="connection-icon"><span data-lucide="${state.connected ? "badge-check" : "plug-zap"}"></span></div>
    <h2>${label}</h2>
    <p>${detail}</p>
    <button class="${state.connected ? "ghost-btn" : "primary-btn"} full" id="dynamicSidebarBtn" type="button">
      <span data-lucide="${state.connected ? "refresh-cw" : "key-round"}"></span>
      ${state.connected ? "Sync now" : "Open settings"}
    </button>
  `;
  $("#dynamicSidebarBtn").addEventListener("click", state.connected ? syncListings : () => setView("settings"));
}

function renderMetrics() {
  const analyzed = state.listings.filter((item) => item.draft?.metadata?.detectedProductType).length;
  const needsWork = state.listings.filter((item) => item.status === "needs" || item.status === "review").length;
  const readyDrafts = state.listings.filter((item) => item.status === "draft").length;
  $("#optimizationScore").textContent = analyzed;
  $("#listingCount").textContent = state.listings.length;
  $("#trafficLift").textContent = readyDrafts;
  $("#needsWork").textContent = needsWork;
}

function filteredListings() {
  const query = els.searchInput.value.trim().toLowerCase();
  const filtered = state.listings.filter((listing) => {
    const filterMatch =
      state.activeFilter === "all" ||
      (state.activeFilter === "needs" && ["needs", "review"].includes(listing.status)) ||
      listing.status === state.activeFilter;
    const queryMatch = [listing.title, listing.sku, listing.barcode, listing.category, ...(listing.keywords || []).map((k) => k.term)]
      .join(" ")
      .toLowerCase()
      .includes(query);
    return filterMatch && queryMatch;
  });
  return sortListings(filtered);
}

function sortListings(listings) {
  return [...listings].sort((a, b) => {
    if (state.sortMode === "title") return a.title.localeCompare(b.title);
    if (state.sortMode === "stock") return Number(a.stock || 0) - Number(b.stock || 0);
    if (state.sortMode === "updated") return Date.parse(b.draft?.metadata?.optimizedAt || 0) - Date.parse(a.draft?.metadata?.optimizedAt || 0);
    return Number(a.score || 0) - Number(b.score || 0);
  });
}

function renderDashboardListings() {
  const listings = filteredListings()
    .filter((listing) => listing.status !== "optimized")
    .sort((a, b) => a.score - b.score)
    .slice(0, 5);
  els.dashboardListingTable.innerHTML = renderListingRows(listings, "No priority listings yet.");
}

function renderListings() {
  const listings = filteredListings();
  const totalPages = Math.max(1, Math.ceil(listings.length / state.pageSize));
  state.listingPage = Math.min(Math.max(1, state.listingPage), totalPages);
  const start = (state.listingPage - 1) * state.pageSize;
  const pageRows = listings.slice(start, start + state.pageSize);
  els.listingTable.innerHTML = renderListingRows(pageRows, "No listings match the current filter.");
  renderCatalogSummary(listings.length, start, pageRows.length, totalPages);
}

function renderCatalogSummary(filteredCount, start, visibleCount, totalPages) {
  const total = state.listings.length;
  if (els.catalogSummary) {
    const from = filteredCount ? start + 1 : 0;
    const to = start + visibleCount;
    els.catalogSummary.textContent = `${from}-${to} of ${filteredCount} shown • ${total} total`;
  }
  if (els.pageInfo) {
    els.pageInfo.textContent = `Page ${state.listingPage} of ${totalPages}`;
  }
  const prev = $("#prevPageBtn");
  const next = $("#nextPageBtn");
  if (prev) prev.disabled = state.listingPage <= 1;
  if (next) next.disabled = state.listingPage >= totalPages;
}

function changePage(direction) {
  const totalPages = Math.max(1, Math.ceil(filteredListings().length / state.pageSize));
  state.listingPage = Math.min(Math.max(1, state.listingPage + direction), totalPages);
  renderListings();
  refreshIcons();
}

function renderListingRows(listings, emptyMessage) {
  if (!state.connected) {
    return emptyState("store", "Connect a Trendyol store or load demo data to show listings.");
  }
  if (!listings.length) return emptyState("search-x", state.lastSyncMessage || emptyMessage);
  return listings.map(renderListingRow).join("");
}

function renderListingRow(listing) {
  const labels = { needs: "Needs analysis", review: "Needs analysis", draft: "Ready to review", optimized: "Published" };
  setTimeout(() => bindListingRows(), 0);
  return `
    <button class="listing-row ${listing.id === state.selectedId ? "selected" : ""}" type="button" data-id="${listing.id}">
      <div class="listing-product">
        ${listing.image ? `<img src="${listing.image}" alt="${escapeHtml(listing.title)}" />` : `<div class="image-placeholder"><span data-lucide="image"></span></div>`}
        <div class="product-copy">
          <strong>${escapeHtml(listing.title)}</strong>
          <span>${escapeHtml(listing.sku)} • ${escapeHtml(listing.category)} • ${escapeHtml(listing.price)}</span>
          <span>Barcode ${escapeHtml(listing.barcode || "missing")} • Stock ${listing.stock ?? 0}</span>
        </div>
      </div>
      <span class="chip ${listing.status}">${labels[listing.status] || "Review"}</span>
    </button>
  `;
}

function bindListingRows() {
  $$(".listing-row").forEach((row) => {
    row.onclick = () => {
      state.selectedId = row.dataset.id;
      render();
      if (state.activeView === "listings" && els.detailBody) {
        els.detailBody.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    };
  });
}

function renderSelectedListing() {
  const listing = selectedListing();
  if (!listing) {
    els.insightEmpty.classList.remove("hidden");
    els.insightBody.classList.add("hidden");
    els.selectedTitle.textContent = "No listing selected";
    els.selectedScore.textContent = "--";
    return;
  }
  els.insightEmpty.classList.add("hidden");
  els.insightBody.classList.remove("hidden");
  els.selectedTitle.textContent = listing.title;
  els.selectedScore.textContent = listing.status === "draft" ? "Ready to review" : listing.status === "optimized" ? "Published" : "Needs analysis";
  els.selectedImage.src = listing.image || "";
  els.selectedImage.alt = listing.title;
  els.targetList.innerHTML = listing.issues.map((issue) => `<li>${escapeHtml(issue)}</li>`).join("");
  $("#keywordDemandTitle").textContent = listing.draft ? "Relevant search terms" : "Search terms after photo analysis";
  els.keywordChips.innerHTML = listing.keywords.length
    ? listing.keywords.map((keyword) => {
      const suffix = keyword.source === "Imported last-month keyword dataset" ? ` · ${formatSearches(keyword.searches)}` : "";
      return `<span class="keyword-chip">${escapeHtml(keyword.term)}${suffix}</span>`;
    }).join("")
    : `<span class="pending-copy">Analyze the photo to identify the correct product and search terms.</span>`;
  els.titlePreview.value = listing.draft?.title || "";
  els.descriptionPreview.value = listing.draft?.description || "";
  const textDirection = state.settings.languageMode === "ar" ? "rtl" : "ltr";
  els.titlePreview.dir = textDirection;
  els.descriptionPreview.dir = textDirection;
  els.titlePreview.placeholder = listing.draft ? "" : "A recommendation will appear after product photo analysis.";
  els.descriptionPreview.placeholder = listing.draft ? "" : "No description is generated from unverified listing text.";
  els.titlePreview.disabled = !listing.draft;
  els.descriptionPreview.disabled = !listing.draft;
  els.optimizeBtn.disabled = listing.status === "optimized";
  els.publishBtn.disabled = !state.connected || (state.settings.requireDraftReview && listing.status !== "draft");
}

function renderListingDetails() {
  const listing = selectedListing();
  if (!els.detailBody) return;
  if (!listing) {
    els.detailTitle.textContent = "Select a listing";
    els.detailStatus.textContent = "--";
    els.detailBody.innerHTML = emptyState("mouse-pointer-click", "Click any listing to view all images, current details, and recommended updates.");
    return;
  }

  const draft = listing.draft;
  const recommendationPending = Boolean(listing.image && !listing.draft);
  const images = listing.images?.length ? listing.images : listing.image ? [listing.image] : [];
  els.detailTitle.textContent = listing.title;
  els.detailStatus.textContent = listing.status === "draft" ? "Ready to review" : listing.status === "optimized" ? "Published" : "Needs analysis";
  els.detailBody.innerHTML = `
    <div class="detail-grid">
      ${listing.imageWarning ? `<div class="warning-box"><strong>Image mismatch detected</strong><span>${escapeHtml(listing.imageWarning)}</span></div>` : ""}
      <section>
        <h3>Images</h3>
        <div class="gallery-grid">
          ${images.length ? images.map((image, index) => `
            <div class="editable-gallery-item">
              <img src="${image}" alt="${escapeHtml(listing.title)} image ${index + 1}" />
              <div class="gallery-order-actions">
                <button type="button" data-image-action="left" data-image-index="${index}" ${index === 0 ? "disabled" : ""} title="Move image left"><span data-lucide="arrow-left"></span></button>
                <button type="button" data-image-action="right" data-image-index="${index}" ${index === images.length - 1 ? "disabled" : ""} title="Move image right"><span data-lucide="arrow-right"></span></button>
                <button type="button" data-image-action="delete" data-image-index="${index}" title="Remove image"><span data-lucide="trash-2"></span></button>
              </div>
            </div>
          `).join("") : `<div class="image-placeholder"><span data-lucide="image"></span></div>`}
        </div>
        <div class="button-grid detail-actions">
          <label class="listing-image-request">
            Describe the image you want
            <textarea id="detailImagePrompt" rows="3" placeholder="Example: Place this exact chair in a luxury Saudi living room, one chair only, warm daylight, logo at top left."></textarea>
          </label>
          <button class="ghost-btn" id="detailGenerateImageBtn" type="button" ${!state.generationAiAvailable || !listing.image ? "disabled" : ""}>
            <span data-lucide="images"></span>
            Create requested image
          </button>
          <button class="primary-btn" id="detailSaveImagesBtn" type="button" ${!listing.imagesDirty ? "disabled" : ""}>
            <span data-lucide="save"></span>
            Save image order
          </button>
        </div>
      </section>
      <section>
        <h3>Current listing</h3>
        <div class="comparison-card">
          <strong>Current title</strong>
          <p>${escapeHtml(listing.title)}</p>
          <strong>Current description</strong>
          <p>${escapeHtml(listing.description || "No description returned by Trendyol.")}</p>
        </div>
      </section>
      <section>
        <h3>Recommended update</h3>
        <div class="comparison-card recommended">
          <strong>Recommended title</strong>
          ${recommendationPending
            ? `<p>Analyze the product photo to create a verified title.</p>`
            : `<textarea id="detailTitlePreview" maxlength="100" dir="${state.settings.languageMode === "ar" ? "rtl" : "ltr"}" rows="2">${escapeHtml(draft?.title || listing.title)}</textarea>`}
          <strong>Recommended description</strong>
          ${recommendationPending
            ? `<p>No recommendation is shown until the product photo has been analyzed.</p>`
            : `<textarea id="detailDescriptionPreview" dir="${state.settings.languageMode === "ar" ? "rtl" : "ltr"}" rows="6">${escapeHtml(draft?.description || listing.description)}</textarea>`}
        </div>
        <div class="button-grid detail-actions">
          <button class="primary-btn" id="detailOptimizeBtn" type="button" ${listing.status === "optimized" ? "disabled" : ""}>
            <span data-lucide="scan-search"></span>
            Analyze product photo
          </button>
          <button class="ghost-btn" id="detailPublishBtn" type="button" ${!state.connected || (state.settings.requireDraftReview && listing.status !== "draft") ? "disabled" : ""}>
            <span data-lucide="send"></span>
            Publish approved changes
          </button>
        </div>
      </section>
      <section>
        <h3>Listing details</h3>
        <div class="details-table">
          ${detailRow("Content ID", listing.metadata?.contentId)}
          ${detailRow("Variant ID", listing.metadata?.variantId)}
          ${detailRow("Barcode", listing.barcode)}
          ${detailRow("SKU", listing.sku)}
          ${detailRow("Brand", listing.brand)}
          ${detailRow("Category", listing.category)}
          ${detailRow("Photo detected product", draft?.metadata?.detectedProductType || "Not analyzed yet")}
          ${detailRow("Suggested Trendyol category", draft?.metadata?.suggestedCategory || "Not analyzed yet")}
          ${detailRow("Color", listing.metadata?.color)}
          ${detailRow("Size", listing.metadata?.size)}
          ${detailRow("Price", listing.price)}
          ${detailRow("Stock", listing.stock)}
          ${detailRow("Keywords", listing.keywords.map((keyword) => keyword.term).join(", "))}
          ${detailRow("Search term source", listing.keywords[0]?.source || "Waiting for product photo analysis")}
          ${detailRow("Recommendation source", draft?.metadata?.generatedBy || "Waiting for product photo analysis")}
        </div>
      </section>
    </div>
  `;
  $("#detailOptimizeBtn")?.addEventListener("click", createDraftForSelected);
  $("#detailPublishBtn")?.addEventListener("click", publishSelected);
  $("#detailGenerateImageBtn")?.addEventListener("click", generateImageForSelectedListing);
  $("#detailSaveImagesBtn")?.addEventListener("click", saveSelectedListingImages);
  $$("[data-image-action]").forEach((button) => {
    button.addEventListener("click", () => changeSelectedListingImageOrder(button.dataset.imageAction, Number(button.dataset.imageIndex)));
  });
  refreshIcons();
}

function changeSelectedListingImageOrder(action, index) {
  const listing = selectedListing();
  if (!listing) return;
  const images = listing.images?.length ? [...listing.images] : listing.image ? [listing.image] : [];
  if (!images[index]) return;
  if (action === "left" && index > 0) {
    [images[index - 1], images[index]] = [images[index], images[index - 1]];
  } else if (action === "right" && index < images.length - 1) {
    [images[index + 1], images[index]] = [images[index], images[index + 1]];
  } else if (action === "delete") {
    images.splice(index, 1);
  }
  listing.images = images;
  listing.image = images[0] || "";
  listing.imagesDirty = true;
  persistSessionState();
  render();
}

async function generateImageForSelectedListing() {
  const listing = selectedListing();
  if (!listing?.image) return;
  const customPrompt = $("#detailImagePrompt").value.trim();
  if (!customPrompt) {
    showToast("Describe the image you want AI to create.");
    return;
  }
  const button = $("#detailGenerateImageBtn");
  button.disabled = true;
  button.innerHTML = `<span data-lucide="loader-circle"></span> Creating`;
  refreshIcons();
  try {
    const generated = await apiFetch("/api/generate-product-image", {
      method: "POST",
      body: JSON.stringify({
        image: listing.image,
        productType: listing.draft?.metadata?.detectedProductType || listing.category || "product",
        title: listing.draft?.title || listing.title,
        scene: "lifestyle",
        customPrompt: `${customPrompt} Keep exactly one product only. Reserve a clean ${state.sellerLogoPosition === "top-right" ? "top-right" : "top-left"} area for the seller logo.`
      })
    });
    const result = await applySellerLogo(generated);
    const imageUrl = result.publicUrl || result.image;
    listing.images = [...(listing.images?.length ? listing.images : listing.image ? [listing.image] : []), imageUrl];
    listing.image = listing.images[0] || listing.image;
    listing.imagesDirty = true;
    persistSessionState();
    showToast("New lifestyle image added to this listing.");
    render();
  } catch (error) {
    showToast(error.message || "Could not create listing image.");
  }
}

async function saveSelectedListingImages() {
  const listing = selectedListing();
  if (!listing?.images?.length) return;
  const images = listing.images.map((image) => new URL(image, window.location.origin).href);
  if (images.some((image) => /https?:\/\/(?:localhost|127\.0\.0\.1)(?::|\/)/i.test(image))) {
    showToast("Image changes must be saved from the public Railway app so Trendyol can access generated images.");
    return;
  }
  const button = $("#detailSaveImagesBtn");
  button.disabled = true;
  button.innerHTML = `<span data-lucide="loader-circle"></span> Saving`;
  refreshIcons();
  try {
    const result = await apiFetch("/api/update-product-images", {
      method: "POST",
      body: JSON.stringify({
        source: listing.source || listing.metadata || {},
        barcode: listing.barcode,
        title: listing.title,
        description: listing.description,
        stockCode: listing.sku,
        images
      })
    });
    listing.imagesDirty = false;
    listing.batchRequestId = result.batchRequestId || null;
    if (result.batchRequestId) {
      saveRecentProductSubmission({
        batchRequestId: result.batchRequestId,
        barcode: listing.barcode,
        title: `${listing.title} · image update`,
        state: "processing",
        message: "Trendyol accepted the image update and is processing it.",
        submittedAt: new Date().toISOString()
      });
    }
    persistSessionState();
    showToast(result.message || "Image update submitted to Trendyol.");
    setOperation(result.batchRequestId ? `Image update submitted. Batch ${result.batchRequestId}` : "Image update submitted");
    render();
  } catch (error) {
    showToast(error.message || "Could not save image changes to Trendyol.");
    render();
  }
}

function detailRow(label, value) {
  return `
    <div>
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value ?? "") || "Not provided"}</strong>
    </div>
  `;
}

function renderKeywords() {
  if (!state.listings.length) {
    els.keywordTable.innerHTML = emptyState("search-check", "Load listings to build keyword demand research.");
    return;
  }
  const keywords = new Map();
  state.listings.forEach((listing) => {
    listing.keywords.forEach((keyword) => {
      const current = keywords.get(keyword.term) || { ...keyword, listings: 0 };
      current.searches = Math.max(current.searches, keyword.searches);
      current.listings += 1;
      keywords.set(keyword.term, current);
    });
  });
  els.keywordTable.innerHTML = [...keywords.values()]
    .sort((a, b) => b.searches - a.searches)
    .map((keyword) => `
      <div class="keyword-row">
        <div>
          <strong>${escapeHtml(keyword.term)}</strong>
          <span>${keyword.listings} listing matches • ${keyword.competition} competition</span>
        </div>
        <strong>${formatSearches(keyword.searches)}</strong>
      </div>
    `)
    .join("");
}

async function exportDrafts() {
  if (!state.listings.length) {
    showToast("No listings to export yet.");
    return;
  }
  if (!state.analysisAiAvailable) {
    showToast("Enable product image analysis in Settings before preparing Excel.");
    setView("settings");
    return;
  }
  const pending = state.listings.filter((listing) => listing.image && !listing.draft && listing.status !== "optimized");
  const batch = pending.slice(0, 5);
  const button = $("#exportBtn");
  button.disabled = true;
  let analyzed = 0;
  for (const listing of batch) {
    button.innerHTML = `<span data-lucide="loader-circle"></span> Preparing ${analyzed + 1} of ${batch.length}`;
    refreshIcons();
    try {
      await analyzeListingImage(listing);
      analyzed += 1;
    } catch (error) {
      listing.issues = [`Excel preparation failed: ${error.message}`];
      if (["OPENAI_RATE_LIMIT", "GOOGLE_RATE_LIMIT", "IDEOGRAM_RATE_LIMIT"].includes(error.code)) {
        showToast(error.message);
        break;
      }
    }
  }
  const readyListings = state.listings.filter((listing) => listing.draft?.title && listing.draft?.description);
  if (!readyListings.length) {
    button.disabled = false;
    button.innerHTML = `<span data-lucide="file-spreadsheet"></span> Prepare Excel batch`;
    refreshIcons();
    showToast("No recommendations are ready to export. Check the image analysis setup.");
    render();
    return;
  }
  const rows = readyListings.map(buildExportRow);
  const timestamp = new Date().toISOString().slice(0, 16).replace("T", "_").replace(":", "-");
  const language = state.settings.languageMode === "ar" ? "Arabic" : "English";
  const baseName = `TrendLift_Saudi_${language}_${rows.length}_ready_${timestamp}`;
  const filename = `${baseName}.xls`;
  try {
    const result = await apiFetch("/api/export-excel", {
      method: "POST",
      body: JSON.stringify({ filename, rows })
    });
    $("#lastExportName").textContent = `${result.filename} saved in ${result.folder}`;
    const remaining = Math.max(0, pending.length - analyzed);
    showToast(`Saved ${rows.length} complete recommendations. ${remaining} listings remain for later batches.`);
    setOperation(`Saudi bulk Excel saved to ${result.path}. ${remaining} listings still need analysis.`);
    return;
  } catch (error) {
    downloadExcelHtml(rows, filename);
    $("#lastExportName").textContent = `${filename} downloaded by browser. Server folder save failed.`;
    showToast(`Server save failed, browser downloaded ${filename}.`);
    setOperation(`Export fallback download used: ${error.message || "server save failed"}`);
  } finally {
    button.disabled = false;
    button.innerHTML = `<span data-lucide="file-spreadsheet"></span> Prepare Excel batch`;
    refreshIcons();
    render();
  }
}

function buildExportRow(listing) {
  const draft = listing.draft || { title: "", description: "" };
  return {
    Publish: listing.status === "draft" ? "YES" : "NO",
    ContentId: listing.metadata?.contentId || "",
    VariantId: listing.metadata?.variantId || "",
    Barcode: listing.barcode || "",
    SKU: listing.sku || "",
    Brand: listing.brand || "",
    Category: listing.category || "",
    SuggestedCategory: draft.metadata?.suggestedCategory || "",
    Marketplace: "Saudi Arabia",
    Currency: "SAR",
    OutputLanguage: state.settings.languageMode === "ar" ? "Arabic" : "English",
    Color: listing.metadata?.color || "",
    Size: listing.metadata?.size || "",
    Price: listing.price || "",
    Stock: listing.stock ?? "",
    CurrentTitle: listing.title || "",
    CurrentDescription: listing.description || "",
    RecommendedTitle: draft.title || "",
    RecommendedDescription: draft.description || "",
    SearchTerms: (listing.keywords || []).map((keyword) => keyword.source === "Imported last-month keyword dataset"
      ? `${keyword.term} (${keyword.searches})`
      : keyword.term).join(", "),
    SearchTermSource: listing.keywords.some((keyword) => keyword.source === "Imported last-month keyword dataset")
      ? "Imported Saudi monthly keyword dataset"
      : listing.keywords.some((keyword) => keyword.source === "Google Trends Saudi Arabia CSV")
        ? "Google Trends Saudi Arabia CSV"
        : "Image-verified seed terms; import Google Trends CSV for verified Trends terms",
    GoogleTrendsUrl: draft.metadata?.detectedProductType
      ? `https://trends.google.com/trends/explore?date=today%203-m&geo=SA&q=${encodeURIComponent(draft.metadata.detectedProductType)}`
      : "",
    Images: (listing.images?.length ? listing.images : listing.image ? [listing.image] : []).join("\n"),
    MetadataJson: JSON.stringify(listing.metadata || {}),
    RawListingJson: JSON.stringify(listing.source || {})
  };
}

function downloadCsv(rows, filename) {
  const headers = Object.keys(rows[0] || {});
  const csv = [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => `"${String(row[header] ?? "").replace(/"/g, '""')}"`).join(","))
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function downloadExcelHtml(rows, filename) {
  const headers = Object.keys(rows[0] || {});
  const html = `
    <html>
      <head><meta charset="UTF-8" /></head>
      <body>
        <table>
          <thead><tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead>
          <tbody>
            ${rows.map((row) => `<tr>${headers.map((header) => `<td>${escapeHtml(row[header] ?? "")}</td>`).join("")}</tr>`).join("")}
          </tbody>
        </table>
      </body>
    </html>
  `;
  const blob = new Blob([html], { type: "application/vnd.ms-excel" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function importReviewedFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const rows = parseReviewRows(reader.result, file.name);
      state.importedRows = rows;
      applyImportedRows(rows);
      persistSessionState({ importedRows: state.importedRows });
      showToast(`Imported ${rows.length} reviewed rows. Click Publish imported to send rows marked YES.`);
      setOperation(`Imported ${rows.length} reviewed rows`);
      render();
    } catch {
      showToast("Could not import the review file. Use the exported Excel format.");
      setOperation("Review file import failed");
    }
  };
  if (window.XLSX && !file.name.toLowerCase().endsWith(".csv")) {
    reader.readAsArrayBuffer(file);
  } else {
    reader.readAsText(file);
  }
  event.target.value = "";
}

function parseReviewRows(result, filename) {
  if (window.XLSX && !filename.toLowerCase().endsWith(".csv")) {
    const workbook = XLSX.read(result, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    return XLSX.utils.sheet_to_json(sheet, { defval: "" });
  }
  const text = String(result);
  if (text.trim().startsWith("<")) return parseHtmlTable(text);
  return parseCsv(text);
}

function parseHtmlTable(html) {
  const documentFragment = new DOMParser().parseFromString(html, "text/html");
  const rows = [...documentFragment.querySelectorAll("tr")].map((row) => [...row.children].map((cell) => cell.textContent || ""));
  const headers = rows.shift() || [];
  return rows.map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] || ""])));
}

function parseCsv(csv) {
  const lines = csv.split(/\r?\n/).filter(Boolean);
  const headers = parseCsvLine(lines.shift() || "");
  return lines.map((line) => {
    const values = parseCsvLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, values[index] || ""]));
  });
}

function importKeywordDataset(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const rows = parseCsv(String(reader.result));
      const validRows = rows.filter((row) => {
        const keyword = row.Keyword || row.keyword || row.Term || row.term;
        const searches = row.Searches || row.searches || row.MonthlySearches || row.monthlySearches;
        return keyword && Number(searches) > 0;
      });
      if (!validRows.length) throw new Error("No valid rows");
      state.keywordDataset = validRows;
      state.listings = state.listings.map(enrichListing);
      persistSessionState();
      showToast(`Imported ${validRows.length} verified monthly keyword rows.`);
      setOperation(`Imported monthly keyword dataset with ${validRows.length} rows`);
      render();
    } catch {
      showToast("Keyword CSV needs Keyword and Searches columns. ProductType is optional.");
    }
  };
  reader.readAsText(file);
  event.target.value = "";
}

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"' && line[index + 1] === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      values.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  values.push(current);
  return values;
}

function applyImportedRows(rows) {
  const byContent = new Map(state.listings.map((listing) => [String(listing.metadata?.contentId || ""), listing]));
  const byBarcode = new Map(state.listings.map((listing) => [String(listing.barcode || ""), listing]));
  rows.forEach((row) => {
    const listing = byContent.get(String(row.ContentId || "")) || byBarcode.get(String(row.Barcode || ""));
    if (!listing) return;
    listing.draft = {
      title: String(row.RecommendedTitle || listing.draft?.title || listing.title).trim(),
      description: String(row.RecommendedDescription || listing.draft?.description || listing.description).trim(),
      metadata: listing.draft?.metadata || listing.metadata
    };
    if (row.SearchTerms) {
      listing.keywords = String(row.SearchTerms)
        .split(",")
        .map((term) => term.replace(/\s*\(\d+\)\s*$/, "").trim())
        .filter(Boolean)
        .map((term) => ({
          term,
          searches: 0,
          competition: "Reviewed",
          source: "Imported reviewed Excel"
        }));
    }
    if (isYes(row.Publish)) listing.status = "draft";
  });
}

async function publishImportedRows() {
  const rows = state.importedRows.filter((row) => isYes(row.Publish));
  if (!rows.length) {
    showToast("Import a review file and mark rows as YES in the Publish column first.");
    return;
  }
  let published = 0;
  let failed = 0;
  setOperation(`Publishing ${rows.length} imported rows`);
  for (const row of rows) {
    const payload = {
      dryRun: state.settings.dryRun,
      listing: {
        contentId: row.ContentId,
        barcode: row.Barcode,
        title: String(row.RecommendedTitle || "").trim(),
        description: String(row.RecommendedDescription || "").trim()
      }
    };
    if (!payload.listing.contentId || !payload.listing.title || !payload.listing.description) {
      failed += 1;
      continue;
    }
    try {
      await apiFetch("/api/publish", { method: "POST", body: JSON.stringify(payload) });
      published += 1;
    } catch {
      failed += 1;
    }
  }
  const message = `Submitted ${published} imported rows to Trendyol${failed ? `, ${failed} failed or skipped` : ""}.`;
  persistSessionState({ importedRows: state.importedRows });
  showToast(message);
  setOperation(message);
}

function isYes(value) {
  return ["yes", "y", "true", "1", "publish"].includes(String(value || "").trim().toLowerCase());
}

function loadNewProductImage(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    state.newProductImageData = String(reader.result);
    state.generatedProductImages = [];
    state.missingCategoryAttributes = [];
    state.requiredCategoryAttributeCount = 0;
    state.categoryAttributesPrepared = false;
    $("#newProductPreview").src = state.newProductImageData;
    $("#newProductPreview").classList.remove("hidden");
    renderGeneratedProductImages();
    $("#createAiStatus").textContent = "Ready to analyze";
    $("#newProductWarning").classList.add("hidden");
    $("#imageGenerationStatus").classList.add("hidden");
    renderRequiredAttributeFields();
    renderListingReadiness();
  };
  reader.readAsDataURL(file);
}

async function loadSellerLogo(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    state.sellerLogoData = await prepareTransparentLogo(file);
    try {
      localStorage.setItem("trendlift-seller-logo", state.sellerLogoData);
    } catch {
      throw new Error("The logo is too large to save. Choose a smaller logo file.");
    }
    renderSellerLogoSettings();
    showToast("Logo saved and its white background was removed.");
    await refreshGalleryBranding();
  } catch (error) {
    showToast(error.message || "Could not prepare the logo.");
  } finally {
    event.target.value = "";
  }
}

async function saveSellerLogoPosition() {
  state.sellerLogoPosition = $("#sellerLogoPosition").value === "top-right" ? "top-right" : "top-left";
  localStorage.setItem("trendlift-logo-position", state.sellerLogoPosition);
  await refreshGalleryBranding();
  showToast(`Logo position saved: ${state.sellerLogoPosition === "top-right" ? "top right" : "top left"}.`);
}

async function removeSellerLogo() {
  state.sellerLogoData = "";
  localStorage.removeItem("trendlift-seller-logo");
  state.generatedProductImages = state.generatedProductImages.map((item) => ({
    ...item,
    image: item.sourceImage || item.image,
    publicUrl: ""
  }));
  renderSellerLogoSettings();
  renderGeneratedProductImages();
  showToast("Saved seller logo removed.");
}

function renderSellerLogoSettings() {
  const hasLogo = Boolean(state.sellerLogoData);
  $("#sellerLogoPreviewWrap").classList.toggle("hidden", !hasLogo);
  $("#removeSellerLogoBtn").classList.toggle("hidden", !hasLogo);
  $("#sellerLogoUploadText").textContent = hasLogo ? "Change logo" : "Upload logo";
  if (hasLogo) $("#sellerLogoPreview").src = state.sellerLogoData;
}

async function prepareTransparentLogo(file) {
  const source = await fileToDataUrl(file);
  const image = await loadCanvasImage(source);
  const maxDimension = 600;
  const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth, image.naturalHeight));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  const context = canvas.getContext("2d", { willReadFrequently: true });
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
  for (let index = 0; index < pixels.data.length; index += 4) {
    const red = pixels.data[index];
    const green = pixels.data[index + 1];
    const blue = pixels.data[index + 2];
    const minimum = Math.min(red, green, blue);
    const maximum = Math.max(red, green, blue);
    if (minimum >= 242 && maximum - minimum <= 18) {
      pixels.data[index + 3] = Math.max(0, Math.round((255 - minimum) * 18));
    }
  }
  context.putImageData(pixels, 0, 0);
  return canvas.toDataURL("image/png");
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read the logo file."));
    reader.readAsDataURL(file);
  });
}

function loadCanvasImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not load the image."));
    image.src = src;
  });
}

async function analyzeNewProduct() {
  if (!state.newProductImageData) {
    showToast("Add a product image first.");
    return;
  }
  if (!state.analysisAiAvailable) {
    showToast("Enable image analysis in Settings first.");
    $("#createAiStatus").textContent = "AI key required";
    return;
  }
  const button = $("#analyzeNewProductBtn");
  button.disabled = true;
  button.innerHTML = `<span data-lucide="loader-circle"></span> Analyzing`;
  refreshIcons();
  try {
    const result = await apiFetch("/api/analyze-new-product", {
      method: "POST",
      body: JSON.stringify({ image: state.newProductImageData, outputLanguage: state.settings.languageMode })
    });
    state.newProductAnalysis = result;
    $("#newTitle").value = result.title || "";
    $("#newDescription").value = result.description || "";
    $("#newSuggestedCategory").value = result.suggestedCategory || result.productType || "";
    updateNewTitleCount();
    $("#newTitle").dir = state.settings.languageMode === "ar" ? "rtl" : "ltr";
    $("#newDescription").dir = state.settings.languageMode === "ar" ? "rtl" : "ltr";
    $("#newOrigin").value = result.origin || "SA";
    $("#newAttributes").value = JSON.stringify(result.attributes || [], null, 2);
    await loadCategorySuggestions(result.suggestedCategory || result.productType);
    $("#createAiStatus").textContent = result.productType || "Analyzed";
    const warning = $("#newProductWarning");
    warning.textContent = `${result.warning || "AI-generated fields require review."} Add the exact Trendyol brand ID, category ID, barcode, model code and stock code before submission.`;
    warning.classList.remove("hidden");
    setOperation(`New product image analyzed as ${result.productType || "product"}`);
    renderListingReadiness();
  } catch (error) {
    showToast(error.message || "Image analysis failed.");
    $("#createAiStatus").textContent = "Analysis failed";
  } finally {
    button.disabled = false;
    button.innerHTML = `<span data-lucide="scan-search"></span> Analyze image`;
    refreshIcons();
  }
}

function newProductImageProfileText() {
  return [
    state.newProductAnalysis?.productType,
    $("#newTitle")?.value,
    $("#imageCreativeDirection")?.value
  ].map((value) => String(value || "").toLowerCase()).join(" ");
}

function isDiningChairImageProfile() {
  const text = newProductImageProfileText();
  return /\b(dining|kitchen)\s+chairs?\b/.test(text)
    || /\bchairs?\s+(for|with)\s+dining\b/.test(text)
    || /كرسي\s*طعام|كراسي\s*طعام/.test(text);
}

function isWallMirrorImageProfile() {
  const text = newProductImageProfileText();
  return /\b(hanging|wall|round|bathroom|vanity|decorative)\s+mirrors?\b/.test(text)
    || /\bmirrors?\s+(for|with|on)\s+(wall|bathroom|vanity|entryway|console)\b/.test(text)
    || /مرآة\s*(جدارية|حائط)|مراية\s*(جدارية|حائط)/.test(text);
}

function isVaseImageProfile() {
  const text = newProductImageProfileText();
  return /\b(flower|ceramic|decorative|ribbed)?\s*vases?\b/.test(text)
    || /مزهرية|فازة/.test(text);
}

function getRequiredProductImageScenes() {
  if (isDiningChairImageProfile()) {
    return ["diningChairHero", "diningChairSet", "diningChairRoomAngle", "diningChairAlternateAngle", "white"];
  }
  if (isWallMirrorImageProfile()) {
    return ["wallMirrorHero", "wallMirrorLifestyle", "wallMirrorDetail", "wallMirrorSize", "wallMirrorWhite"];
  }
  if (isVaseImageProfile()) {
    return ["vaseHero", "vaseLifestyle", "vaseFeatures", "vaseSize", "vaseWhite"];
  }
  return ["hero", "lifestyle", "features", "size", "detail", "benefits", "white"];
}

async function generateNewProductImages() {
  if (!state.newProductImageData || !state.newProductAnalysis) {
    showToast("Analyze the main product image first.");
    return;
  }
  if (!state.generationAiAvailable) {
    showToast("Enable an image generation provider in Settings first.");
    return;
  }
  const button = $("#generateImagesBtn");
  button.disabled = true;
  const detectedType = displayValue(state.newProductAnalysis.productType).trim().toLowerCase();
  const sellerDirection = $("#imageCreativeDirection").value.trim();
  if ((!detectedType || ["product", "item", "object", "furniture"].includes(detectedType)) && sellerDirection.length < 12) {
    button.disabled = false;
    showToast("AI is not sure what this item is. Add the product type in Image direction, then generate images.");
    $("#imageCreativeDirection").focus();
    return;
  }
  const scenes = getRequiredProductImageScenes();
  const totalImages = scenes.length;
  const status = $("#imageGenerationStatus");
  status.classList.remove("hidden");
  refreshIcons();
  let completed = state.generatedProductImages.filter((item) => scenes.includes(item.scene)).length;
  for (const scene of scenes) {
    if (state.generatedProductImages.some((item) => item.scene === scene)) continue;
    button.innerHTML = `<span data-lucide="loader-circle"></span> Creating ${completed + 1} of ${totalImages}`;
    status.innerHTML = `<strong>${completed} of ${totalImages} images created</strong><span>Creating the next image. You can review each image as it appears.</span>`;
    refreshIcons();
    try {
      const result = await createGeneratedImage(scene, sellerDirection);
      state.generatedProductImages.push(result);
      completed += 1;
      renderGeneratedProductImages();
      const fallbackNote = result.usedFallback ? " Pro was busy, so Gemini Flash completed this image." : "";
      status.innerHTML = `<strong>${completed} of ${totalImages} images created</strong><span>${escapeHtml(result.label)} was added to the listing.${fallbackNote}</span>`;
      showToast(`${completed} of ${totalImages} created: ${result.label}${fallbackNote}`);
      renderListingReadiness();
    } catch (error) {
      status.innerHTML = `<strong>${completed} of ${totalImages} images created</strong><span>${escapeHtml(error.message || "The next image could not be generated.")}</span>`;
      showToast(error.message || `Image ${completed + 1} failed.`);
      break;
    }
  }
  button.disabled = false;
  button.innerHTML = `<span data-lucide="images"></span> ${completed === totalImages ? "Regenerate missing images" : "Continue image generation"}`;
  setOperation(`${completed} of ${totalImages} listing images created`);
  refreshIcons();
}

async function createGeneratedImage(scene, customPrompt = "") {
  const generated = await apiFetch("/api/generate-product-image", {
    method: "POST",
    body: JSON.stringify({
      image: state.newProductImageData,
      productType: state.newProductAnalysis.productType,
      title: $("#newTitle").value,
      scene,
      customPrompt: [
        customPrompt,
        state.sellerLogoData
          ? `Reserve a clean ${state.sellerLogoPosition === "top-right" ? "top-right" : "top-left"} corner for the seller logo. Do not invent or redraw a logo; the app will place the exact transparent logo afterward.`
          : ""
      ].filter(Boolean).join(" ")
    })
  });
  const polished = await applyListingImageOverlay(generated);
  return applySellerLogo(polished);
}

async function applyListingImageOverlay(generated) {
  if (!["features", "size", "wallMirrorSize", "vaseFeatures", "vaseSize"].includes(generated.scene)) return generated;
  const productImage = await loadCanvasImage(generated.image);
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 1800;
  const context = canvas.getContext("2d");
  context.drawImage(productImage, 0, 0, canvas.width, canvas.height);

  if (["features", "vaseFeatures"].includes(generated.scene)) {
    drawFeatureOverlay(context);
  } else {
    drawDimensionOverlay(context, generated.scene);
  }
  const saved = await saveCanvasImage(canvas, generated.scene);
  return {
    ...generated,
    image: saved.image,
    publicUrl: saved.publicUrl || "",
    sourceImage: saved.image
  };
}

function drawFeatureOverlay(context) {
  const attributes = (state.newProductAnalysis?.attributes || []).slice(0, 4);
  const entries = attributes.length ? attributes : [
    { attributeName: "Product detail", attributeNameAr: "تفاصيل المنتج", customAttributeValue: state.newProductAnalysis?.productType || "Product", customAttributeValueAr: "" }
  ];
  const panelY = 1320;
  context.fillStyle = "rgba(255, 255, 255, 0.96)";
  context.fillRect(0, panelY, 1200, 480);
  context.fillStyle = "#172033";
  context.font = "700 42px Arial, sans-serif";
  context.textAlign = "left";
  context.fillText("Product features", 72, panelY + 72);
  context.textAlign = "right";
  context.fillText("مميزات المنتج", 1128, panelY + 72);

  const columnWidth = 510;
  entries.forEach((attribute, index) => {
    const column = index % 2;
    const row = Math.floor(index / 2);
    const left = 72 + column * 560;
    const top = panelY + 125 + row * 150;
    context.fillStyle = "#f1f4f8";
    context.fillRect(left, top, columnWidth, 126);
    context.fillStyle = "#172033";
    context.textAlign = "left";
    context.font = "700 25px Arial, sans-serif";
    context.fillText(String(attribute.attributeName || "Feature").slice(0, 32), left + 22, top + 36);
    context.font = "400 22px Arial, sans-serif";
    context.fillText(String(attribute.customAttributeValue || "").slice(0, 42), left + 22, top + 72);
    context.textAlign = "right";
    context.font = "600 22px Arial, sans-serif";
    context.fillText(String(attribute.attributeNameAr || translateAttributeName(attribute.attributeName)).slice(0, 34), left + columnWidth - 22, top + 105);
  });
}

function drawDimensionOverlay(context, scene = "size") {
  const attributes = state.newProductAnalysis?.attributes || [];
  const analyzedDimensions = attributes.filter((attribute) =>
    /(dimension|height|width|depth|size|length)/i.test(attribute.attributeName || "")
  ).slice(0, 3);
  const enteredDimensions = [
    $("#newPackageHeight").value ? `${$("#newPackageHeight").value} Cm` : "",
    $("#newPackageWidth").value ? `${$("#newPackageWidth").value} Cm` : "",
    $("#newPackageLength").value ? `${$("#newPackageLength").value} Cm` : ""
  ].filter(Boolean);
  const analyzedValues = analyzedDimensions.map((attribute) =>
    String(attribute.customAttributeValue || "").replace(/\b(width|height|length|depth)\b\s*:?\s*/gi, "").replace(/\bcm\b/gi, "Cm").trim()
  ).filter(Boolean);
  const dimensions = enteredDimensions.length === 3 ? enteredDimensions : analyzedValues;
  const displayValues = dimensions.length ? dimensions.slice(0, 3) : [
    "Front view",
    "Side view",
    "Back view"
  ];
  const panelY = 1540;
  context.fillStyle = "rgba(255, 255, 255, 0.97)";
  context.fillRect(0, panelY, 1200, 260);
  context.fillStyle = "#172033";
  context.textAlign = "left";
  context.font = "700 38px Arial, sans-serif";
  context.fillText(dimensions.length ? "Average size" : "Multiple product angles", 64, panelY + 62);
  context.textAlign = "right";
  context.fillText(dimensions.length ? "المقاس التقريبي" : "زوايا متعددة", 1136, panelY + 62);

  displayValues.forEach((value, index) => {
    const left = 64 + index * 365;
    context.fillStyle = "#f1f4f8";
    context.fillRect(left, panelY + 98, 320, 82);
    context.fillStyle = "#172033";
    context.textAlign = "center";
    context.font = "700 34px Arial, sans-serif";
    context.fillText(String(value).slice(0, 18), left + 160, panelY + 151);
  });

  context.fillStyle = "#687387";
  context.font = "400 22px Arial, sans-serif";
  context.textAlign = "left";
  const note = scene === "vaseSize"
    ? "Size may vary by -2 cm / +2 cm."
    : "Confirm exact measurements before publishing.";
  const noteAr = scene === "vaseSize"
    ? "قد يختلف المقاس بمقدار -2 سم / +2 سم"
    : "يرجى تأكيد القياسات الدقيقة قبل النشر";
  context.fillText(note, 64, panelY + 224);
  context.textAlign = "right";
  context.fillText(noteAr, 1136, panelY + 224);
}

function translateAttributeName(name) {
  const translations = {
    color: "اللون",
    material: "الخامة",
    style: "النمط",
    finish: "التشطيب",
    pattern: "النقشة",
    shape: "الشكل",
    height: "الارتفاع",
    width: "العرض",
    depth: "العمق",
    dimensions: "الأبعاد",
    use: "الاستخدام"
  };
  return translations[String(name || "").trim().toLowerCase()] || "ميزة المنتج";
}

async function saveCanvasImage(canvas, scene) {
  return apiFetch("/api/save-generated-image", {
    method: "POST",
    body: JSON.stringify({
      image: canvas.toDataURL("image/png"),
      scene
    })
  });
}

async function applySellerLogo(generated) {
  if (!state.sellerLogoData || ["white", "wallMirrorWhite", "vaseWhite"].includes(generated.scene)) return generated;
  const sourceImage = generated.sourceImage || generated.image;
  const [productImage, logoImage] = await Promise.all([
    loadCanvasImage(sourceImage),
    loadCanvasImage(state.sellerLogoData)
  ]);
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 1800;
  const context = canvas.getContext("2d");
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(productImage, 0, 0, canvas.width, canvas.height);
  const maxWidth = 300;
  const maxHeight = 200;
  const scale = Math.min(maxWidth / logoImage.naturalWidth, maxHeight / logoImage.naturalHeight);
  const width = Math.round(logoImage.naturalWidth * scale);
  const height = Math.round(logoImage.naturalHeight * scale);
  const margin = 54;
  const left = state.sellerLogoPosition === "top-right" ? canvas.width - width - margin : margin;
  context.drawImage(logoImage, left, margin, width, height);
  const saved = await saveCanvasImage(canvas, generated.scene);
  return {
    ...generated,
    image: saved.image,
    publicUrl: saved.publicUrl || "",
    sourceImage,
    logoPosition: state.sellerLogoPosition
  };
}

async function refreshGalleryBranding() {
  if (!state.generatedProductImages.length) return;
  if (!state.sellerLogoData) {
    renderGeneratedProductImages();
    return;
  }
  const status = $("#imageGenerationStatus");
  status.classList.remove("hidden");
  status.innerHTML = `<strong>Updating logo placement</strong><span>Applying the saved logo to lifestyle/detail images and keeping the final white-background image clean.</span>`;
  try {
    state.generatedProductImages = await Promise.all(
      state.generatedProductImages.map((item) => applySellerLogo(item))
    );
    renderGeneratedProductImages();
    status.innerHTML = `<strong>Logo updated</strong><span>The same logo position is applied to generated images except the final white-background image.</span>`;
  } catch (error) {
    status.innerHTML = `<strong>Logo update failed</strong><span>${escapeHtml(error.message || "Could not update the generated images.")}</span>`;
  }
}

function renderGeneratedProductImages() {
  const referenceCard = state.newProductImageData ? `
    <article class="generated-image-card reference">
      <button class="image-preview-button" type="button" data-image-src="${state.newProductImageData}" data-image-title="Uploaded reference">
        <img src="${state.newProductImageData}" alt="Uploaded reference product" />
      </button>
      <div class="generated-image-copy">
        <strong>Uploaded reference</strong>
        <span>Used to preserve the product design</span>
      </div>
    </article>
  ` : "";
  const generatedCards = state.generatedProductImages.map((item) => `
    <article class="generated-image-card" data-scene="${escapeHtml(item.scene)}">
      <button class="image-preview-button" type="button" data-image-src="${escapeHtml(item.image)}" data-image-title="${escapeHtml(item.label)}">
        <img src="${item.image}" alt="${escapeHtml(item.label)}" />
      </button>
      <div class="generated-image-copy">
        <strong>${escapeHtml(item.label)}</strong>
        <span>1200 × 1800 px${item.modelUsed ? ` · ${escapeHtml(displayImageModel(item.modelUsed))}` : ""}${item.usedFallback ? " · Pro fallback" : ""}</span>
      </div>
      <textarea class="image-edit-prompt" rows="2" placeholder="Describe changes for this image"></textarea>
      <div class="image-card-actions">
        <button class="ghost-btn regenerate-image-btn" type="button" data-scene="${escapeHtml(item.scene)}">
          <span data-lucide="wand-sparkles"></span> Edit
        </button>
        <button class="danger-icon-btn delete-image-btn" type="button" data-scene="${escapeHtml(item.scene)}" title="Delete generated image" aria-label="Delete ${escapeHtml(item.label)}">
          <span data-lucide="trash-2"></span>
        </button>
      </div>
    </article>
  `).join("");
  $("#newProductGallery").innerHTML = referenceCard + generatedCards;
  $$(".image-preview-button").forEach((button) => button.addEventListener("click", () => {
    openImageLightbox(button.dataset.imageSrc, button.dataset.imageTitle);
  }));
  $$(".delete-image-btn").forEach((button) => button.addEventListener("click", () => deleteGeneratedImage(button.dataset.scene)));
  $$(".regenerate-image-btn").forEach((button) => button.addEventListener("click", () => regenerateGeneratedImage(button)));
  refreshIcons();
}

function displayImageModel(model) {
  const labels = {
    "gemini-3-pro-image-preview": "Gemini Pro",
    "gemini-3.1-flash-image-preview": "Gemini Flash",
    "gemini-2.5-flash-image": "Gemini 2.5 Flash",
    "gpt-image-2": "OpenAI GPT Image 2",
    "ideogram-edit": "Ideogram Edit"
  };
  return labels[model] || model;
}

function openImageLightbox(src, title) {
  if (!src) return;
  $("#imageLightboxImage").src = src;
  $("#imageLightboxImage").alt = title || "Product image preview";
  $("#imageLightboxTitle").textContent = title || "Product image";
  $("#imageLightboxMeta").textContent = title === "Uploaded reference" ? "Reference image" : "1200 × 1800 px";
  $("#imageLightbox").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeImageLightbox() {
  const lightbox = $("#imageLightbox");
  if (!lightbox || lightbox.classList.contains("hidden")) return;
  lightbox.classList.add("hidden");
  $("#imageLightboxImage").removeAttribute("src");
  document.body.style.overflow = "";
}

function deleteGeneratedImage(scene) {
  state.generatedProductImages = state.generatedProductImages.filter((item) => item.scene !== scene);
  const expectedImages = getRequiredProductImageScenes().length;
  renderGeneratedProductImages();
  $("#imageGenerationStatus").classList.remove("hidden");
  $("#imageGenerationStatus").innerHTML = `<strong>${state.generatedProductImages.length} of ${expectedImages} images created</strong><span>The deleted image can be generated again.</span>`;
  showToast("Generated image removed from this listing.");
  renderListingReadiness();
}

async function regenerateGeneratedImage(button) {
  const scene = button.dataset.scene;
  const card = button.closest(".generated-image-card");
  const customPrompt = card.querySelector(".image-edit-prompt").value.trim();
  button.disabled = true;
  button.innerHTML = `<span data-lucide="loader-circle"></span> Editing`;
  refreshIcons();
  try {
    const result = await createGeneratedImage(scene, customPrompt);
    state.generatedProductImages = state.generatedProductImages.map((item) => item.scene === scene ? result : item);
    renderGeneratedProductImages();
    showToast(`${result.label} updated.`);
  } catch (error) {
    button.disabled = false;
    button.innerHTML = `<span data-lucide="wand-sparkles"></span> Edit`;
    refreshIcons();
    showToast(error.message || "Image edit failed.");
  }
}

async function submitNewProduct(event) {
  event.preventDefault();
  if (!state.generatedProductImages.length) {
    showToast("Generate at least one listing image before submission.");
    return;
  }
  const attributesReady = await prepareProductAttributes();
  if (!attributesReady || state.missingCategoryAttributes.length) {
    showToast("Complete the mandatory category attributes shown in Listing readiness.");
    return;
  }
  const imageUrls = state.generatedProductImages.map((item) =>
    item.publicUrl || new URL(item.image, window.location.origin).href
  );
  if (imageUrls.some((url) => /https?:\/\/(?:localhost|127\.0\.0\.1)(?::|\/)/i.test(url))) {
    showToast("These images exist only on this computer. Open the public Railway app, generate the images there, then click List on Trendyol.");
    return;
  }
  const attributes = readNewProductAttributes();
  if (!attributes) {
    showToast("Category attributes must be valid JSON.");
    return;
  }
  const invalidAttribute = attributes.some((attribute) => {
    if (!attribute) return true;
    if (Number(attribute.attributeId)) {
      return !Number(attribute.attributeValueId) && !String(attribute.customAttributeValue || "").trim();
    }
    return !String(attribute.attributeName || "").trim() || !String(attribute.customAttributeValue || "").trim();
  });
  if (invalidAttribute) {
    showToast("Each AI attribute needs a name and value.");
    return;
  }
  const payload = {
    title: $("#newTitle").value.trim(),
    description: $("#newDescription").value.trim(),
    brandId: Number($("#newBrandId").value),
    categoryId: Number($("#newCategoryId").value),
    listPrice: Number($("#newListPrice").value),
    salePrice: Number($("#newSalePrice").value),
    quantity: Number($("#newQuantity").value),
    vatRate: Number($("#newVatRate").value),
    dimensionalWeight: Number($("#newDimensionalWeight").value),
    origin: $("#newOrigin").value.trim().toUpperCase(),
    barcode: $("#newBarcode").value.trim(),
    modelCode: $("#newModelCode").value.trim(),
    stockCode: $("#newStockCode").value.trim(),
    images: imageUrls,
    attributes
  };
  if (!payload.title || !payload.description || !payload.brandId || !payload.categoryId || !payload.listPrice || !payload.salePrice
    || !payload.barcode || !payload.modelCode || !payload.stockCode) {
    showToast("Complete the listing details, barcode, model code and stock code.");
    return;
  }
  if (!payload.title || payload.title.length > 100) {
    showToast("Title is required and must not exceed 100 characters.");
    return;
  }
  if (payload.description.length < 500) {
    showToast("Description must contain at least 500 characters.");
    return;
  }
  try {
    const result = await apiFetch("/api/create-product", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    state.latestProductSubmission = result.batchRequestId ? {
      batchRequestId: result.batchRequestId,
      barcode: payload.barcode,
      title: payload.title,
      state: "processing",
      message: "Trendyol accepted the request and is processing it.",
      submittedAt: new Date().toISOString()
    } : null;
    if (state.latestProductSubmission) {
      localStorage.setItem("trendlift-latest-product-submission", JSON.stringify(state.latestProductSubmission));
      saveRecentProductSubmission(state.latestProductSubmission);
      $("#productBatchLookup").value = result.batchRequestId;
      renderProductSubmissionStatus();
      $("#listAnotherProductBtn").classList.remove("hidden");
      setTimeout(checkLatestProductBatch, 5000);
    }
    showToast(result.message || "Product submitted to Trendyol.");
    setOperation(result.batchRequestId ? `New product submitted. Batch ${result.batchRequestId}` : "New product submitted");
  } catch (error) {
    showToast(error.message || "Product submission failed.");
  }
}

function renderProductSubmissionStatus() {
  const box = $("#newProductSubmissionStatus");
  if (!box) return;
  const submission = state.latestProductSubmission;
  box.classList.toggle("hidden", !submission);
  box.classList.remove("failed", "completed");
  if (!submission) return;
  box.classList.toggle("failed", submission.state === "failed");
  box.classList.toggle("completed", submission.state === "completed");
  $("#newProductSubmissionTitle").textContent = submission.state === "failed"
    ? "Product rejected"
    : submission.state === "completed"
      ? "Batch processed"
      : "Trendyol is processing";
  $("#newProductSubmissionMessage").textContent = `${submission.title || submission.barcode || "Product"} · ${submission.message || ""} · Batch ${submission.batchRequestId}`;
  $("#checkProductBatchBtn").disabled = submission.checking;
  refreshIcons();
}

function saveRecentProductSubmission(submission) {
  const existing = state.recentProductSubmissions.filter((item) => item.batchRequestId !== submission.batchRequestId);
  state.recentProductSubmissions = [{ ...submission }, ...existing].slice(0, 50);
  localStorage.setItem("trendlift-recent-product-submissions", JSON.stringify(state.recentProductSubmissions));
  renderRecentlyListedProducts();
}

function renderRecentlyListedProducts() {
  const container = $("#recentlyListedProducts");
  if (!container) return;
  const query = $("#recentBatchSearch")?.value.trim().toLowerCase() || "";
  const rows = state.recentProductSubmissions.filter((item) =>
    [item.batchRequestId, item.title, item.barcode, item.state].join(" ").toLowerCase().includes(query)
  );
  container.innerHTML = rows.length ? rows.map((item) => `
    <article class="recent-product-row">
      <div>
        <strong>${escapeHtml(item.title || "Submitted product")}</strong>
        <span>Barcode ${escapeHtml(item.barcode || "not recorded")}</span>
      </div>
      <div>
        <strong>${escapeHtml(item.batchRequestId)}</strong>
        <span>${item.submittedAt ? new Date(item.submittedAt).toLocaleString() : "Submission time not recorded"}</span>
      </div>
      <span class="recent-status ${escapeHtml(item.state || "processing")}">${escapeHtml(item.state || "processing")}</span>
      <button class="ghost-btn recent-check-btn" type="button" data-batch-id="${escapeHtml(item.batchRequestId)}">
        <span data-lucide="refresh-cw"></span>
        Check
      </button>
    </article>
  `).join("") : `<div class="insight-empty"><span data-lucide="history"></span><p>No matching product submissions yet.</p></div>`;
  $$(".recent-check-btn").forEach((button) => {
    button.addEventListener("click", () => {
      $("#productBatchLookup").value = button.dataset.batchId;
      checkLatestProductBatch();
    });
  });
  refreshIcons();
}

function resetNewProductForm() {
  const savedBrandId = localStorage.getItem("trendlift-default-brand-id") || "";
  $("#newProductForm").reset();
  $("#newBrandId").value = savedBrandId;
  $("#newQuantity").value = "1";
  $("#newVatRate").value = "15";
  $("#newDimensionalWeight").value = "1";
  $("#newPackageHeight").value = "";
  $("#newPackageWidth").value = "";
  $("#newPackageLength").value = "";
  $("#newOrigin").value = "SA";
  $("#newProductImage").value = "";
  $("#newProductPreview").removeAttribute("src");
  $("#newProductPreview").classList.add("hidden");
  state.newProductImageData = "";
  state.newProductAnalysis = null;
  state.generatedProductImages = [];
  state.missingCategoryAttributes = [];
  state.requiredCategoryAttributeCount = 0;
  state.categoryAttributesPrepared = false;
  state.latestProductSubmission = null;
  localStorage.removeItem("trendlift-latest-product-submission");
  $("#productBatchLookup").value = "";
  $("#newProductSubmissionStatus").classList.add("hidden");
  $("#listAnotherProductBtn").classList.add("hidden");
  $("#imageGenerationStatus").classList.add("hidden");
  $("#newProductWarning").classList.add("hidden");
  renderGeneratedProductImages();
  renderRequiredAttributeFields();
  renderListingReadiness();
  updateNewTitleCount();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startBatchPolling() {
  window.clearInterval(state.batchPollTimer);
  state.batchPollTimer = window.setInterval(async () => {
    if (!state.connected || document.hidden) return;
    const pending = state.recentProductSubmissions.filter((item) => item.state === "processing").slice(0, 5);
    for (const submission of pending) {
      await checkProductSubmission(submission, false);
    }
  }, 30000);
}

async function checkProductSubmission(submission, notify = true) {
  if (!submission?.batchRequestId || submission.checking) return;
  submission.checking = true;
  try {
    const result = await apiFetch(`/api/product-batch-status?batchRequestId=${encodeURIComponent(submission.batchRequestId)}`);
    submission.state = result.state;
    submission.message = result.message;
    submission.failures = result.failures || [];
    saveRecentProductSubmission(submission);
    if (state.latestProductSubmission?.batchRequestId === submission.batchRequestId) {
      state.latestProductSubmission = { ...submission };
      localStorage.setItem("trendlift-latest-product-submission", JSON.stringify(state.latestProductSubmission));
    }
    if (notify) showToast(result.message);
    return result;
  } catch (error) {
    submission.message = error.message || "Could not check batch status.";
    if (notify) showToast(submission.message);
    return null;
  } finally {
    submission.checking = false;
    saveRecentProductSubmission(submission);
    renderProductSubmissionStatus();
  }
}

async function checkLatestProductBatch() {
  const enteredBatchRequestId = $("#productBatchLookup").value.trim();
  if (!enteredBatchRequestId) {
    showToast("Paste a Trendyol batch request ID first.");
    return;
  }
  if (!state.latestProductSubmission || state.latestProductSubmission.batchRequestId !== enteredBatchRequestId) {
    state.latestProductSubmission = {
      batchRequestId: enteredBatchRequestId,
      title: "Existing product submission",
      state: "processing",
      message: "Checking this batch with Trendyol."
    };
  }
  const submission = state.latestProductSubmission;
  if (submission.checking) return;
  renderProductSubmissionStatus();
  const result = await checkProductSubmission(submission, true);
  if (result) {
    if (result.state === "completed") {
      setOperation(`Product batch processed: ${submission.batchRequestId}. Sync listings to check approval.`);
    } else if (result.state === "failed") {
      setOperation(`Product rejected: ${(result.failures || []).join(" | ") || result.message}`);
    }
  }
}

function emptyState(icon, message) {
  return `
    <div class="insight-empty">
      <span data-lucide="${icon}"></span>
      <p>${escapeHtml(message)}</p>
    </div>
  `;
}

async function apiFetch(path, options = {}) {
  const base = state.settings.proxyUrl.replace(/\/$/, "");
  const response = await fetch(`${base}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || `Request failed: ${response.status}`);
    error.code = data.code || "";
    error.status = response.status;
    throw error;
  }
  return data;
}

function formatSearches(value) {
  return new Intl.NumberFormat("en", { notation: "compact" }).format(value);
}

function displayValue(value) {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return value.map(displayValue).filter(Boolean).join(", ");
  if (typeof value === "object") {
    return displayValue(
      value.name ||
        value.title ||
        value.value ||
        value.attributeValue ||
        value.attributeName ||
        value.text ||
        JSON.stringify(value)
    );
  }
  return String(value);
}

function escapeHtml(value) {
  return displayValue(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => els.toast.classList.remove("visible"), 3600);
}

function refreshIcons() {
  if (window.lucide) window.lucide.createIcons();
}

init();
