# TrendLift AI Listings Optimizer

Local Trendyol listing optimization app for testing seller-account workflows.

## Start

```bash
npm start
```

Open:

```text
http://localhost:4173
```

## Real Account Testing

Use **Settings** in the app and enter:

- Trendyol Seller ID
- API key
- API secret
- Production or Stage environment
- Saudi Arabia storefront code `SA`

The browser sends credentials to `server.js`, which keeps them in memory for the current local server session. You can also start with environment variables:

```bash
TRENDYOL_SELLER_ID=123456 TRENDYOL_API_KEY=key TRENDYOL_API_SECRET=secret TRENDYOL_STOREFRONT_CODE=SA npm start
```

## What Works

- Dashboard metrics and priority listing audit
- Listings view with filters, search, JSON import, and draft export
- Keywords view with demand scoring and optimization policy controls
- Settings view with Trendyol credential testing and publishing safety controls
- Local proxy endpoint for approved Trendyol product sync
- Product sync fallback from V2 approved/unapproved endpoints to V1 filtering when an account returns `404`
- Image-verified title, description, search-term, and product-detail recommendations
- Image-aware mismatch warnings when the product photo disagrees with the existing title or description
- Image-first new product workspace with AI-generated English title, description, keywords and additional product photos
- Live title and description publishing through Trendyol `content-bulk-update`
- Optional dry-run publishing flow for safe testing

## AI Providers

OpenAI and Google Gemini can analyze listing images and create titles and descriptions. Product-image variants can be generated with OpenAI, Google Gemini, or Ideogram. In **Settings > AI providers**, choose the provider used for analysis and the provider used for image creation independently.

The server automatically loads `OPENAI_API_KEY`, `GEMINI_API_KEY`, `GOOGLE_API_KEY`, or `IDEOGRAM_API_KEY` from the ignored `.env.local` file at startup. Keys entered through Settings only replace them for the current server session and are not stored in browser local storage.

Default models:

- OpenAI analysis: `gpt-5.4-mini`
- OpenAI images: `gpt-image-2`
- Google analysis: `gemini-2.5-flash`
- Google images: `gemini-3-pro-image-preview` (Nano Banana Pro, professional-quality preset)
- Ideogram images: prompt-based reference image editing through `/v1/edit`

The Create Listing workspace generates five 1200 × 1800 portrait images sequentially: hero lifestyle, standard lifestyle, bilingual features, four-angle approximate-size infographic, and pure-white catalog image. Each completed image appears immediately, opens in a full-size preview when clicked, and can be deleted or regenerated with seller instructions. A seller logo can be uploaded once, saved in the browser, cleaned to remove a near-white background, and fixed consistently in the top-left or top-right corner of all five images.

Technical Trendyol fields such as `productMainId`, content ID, barcode, stock code, and model code are never used as customer-facing copy. A listing stays in **Needs analysis** until its product photo has been checked successfully.

The app defaults to English output and supports Arabic output from the Search Terms policy panel. Prices are displayed and exported in Saudi riyals (`SAR`). **Prepare Excel batch** analyzes up to 5 pending product photos and exports only complete rows containing `RecommendedTitle`, `RecommendedDescription`, and `SearchTerms`. Small batches help stay within provider request limits; processing pauses after the first rate-limit response.

Image analysis targets a natural title close to the 100-character marketplace limit and a detailed description of at least 500 characters. A useful shorter title is accepted rather than discarding the full analysis; titles are capped at 100 characters. The app also suggests a category name and, when a live Saudi Trendyol store is connected, matches it against Trendyol's current category tree to propose a leaf category ID.

For verified Google Trends terms, select an image-analyzed listing, open **Keywords**, click **Open Saudi Google Trends**, export the related-queries chart as CSV, and import it with **Import Google Trends CSV**. Google Trends values are relative interest rather than monthly search volume.

The seller enters barcode, model code and stock code manually. Saudi Arabia (`SA`) is the default origin. AI prepares visible product attributes, and the server attempts to match those names and values to the selected Trendyol category during submission. Generated image URLs are attached automatically when the app is running on its public Railway domain; localhost images cannot be fetched by Trendyol.

## Publishing Note

`/api/publish` sends approved-product title and description updates to Trendyol's `content-bulk-update` endpoint when Dry-run is off. Trendyol processes updates asynchronously and returns a `batchRequestId`; check Seller Center or the batch status endpoint for completion.
