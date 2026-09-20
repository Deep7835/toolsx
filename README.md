# Kaagazo

Kaagazo (kaagazo.com) — 115 free, private, browser-based business utilities for Indian shops, freelancers and MSMEs — GST invoices, UPI QR standees, salary & tax calculators, barcodes, labels, legal policies, SEO helpers and more. Everything runs client-side; nothing is uploaded.

## Stack

- **Next.js 16** (App Router, static export of every tool route) · **TypeScript** · **Tailwind CSS v4**
- `lucide-react` icons · `qrcode` · `jsbarcode` · `jspdf` + `html2canvas-pro` (PDF) · `pdf-lib` · `tesseract.js` (OCR) · `@imgly/background-removal` · `html5-qrcode` (camera) · `browser-image-compression` · `jszip`

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

### Environment variables (all optional)

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for sitemap, robots, canonical tags and OG image URLs (default `https://kaagazo.com`) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID — loads only after the visitor accepts analytics in the cookie banner (Consent Mode v2) |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible domain — cookie-free analytics, loads without consent |
| `NEXT_PUBLIC_FORM_ENDPOINT` | POST endpoint for the contact form (Formspree/Web3Forms/your own); without it the form falls back to `mailto:` |
| `FORCE_HTTPS` | Set `false` to disable the http→https redirect in `src/proxy.ts` (on by default in production for non-localhost hosts) |

No server-side secrets are used anywhere; every tool runs client-side.

## Deploy (Cloudflare Workers)

The site runs on Cloudflare Workers via [OpenNext](https://opennext.js.org/cloudflare) — config in `wrangler.jsonc` and `open-next.config.ts`. Prerendered pages and the generated OG images are served as static assets (`staticAssetsIncrementalCache`), so no KV/R2/D1 bindings are needed.

```bash
npx wrangler login   # once
npm run cf:preview   # build + run the Worker locally in workerd
npm run deploy       # build + deploy to kaagazo.com / www.kaagazo.com
```

Public env vars (`NEXT_PUBLIC_*`, `FORCE_HTTPS`) go in `wrangler.jsonc` → `vars` and take effect on the next deploy. `src/proxy.ts` redirects `www.` → apex and http → https.

## Launch checklist (done)

Privacy policy · Terms · no front-end secrets · HTTPS redirect + HSTS/security headers · cookie-consent banner gating analytics · meta titles/descriptions + canonicals on every route · per-page social preview images (`/og/blog/*`, `/og/tool/*`, `/og/default`) · SVG favicon + generated Apple touch icon · sitemap.xml + robots.txt · alt text on images · pre-rendered 1200×630 + 600×315 preview images (no runtime optimiser), lazy-loaded via `next/image` · lazy-loaded tool chunks (shared JS ≈ 128 KB gz) · WCAG-AA colour contrast on all tokens · mobile-first layout · custom 404 with search · zero broken internal links (crawled 163 pages) · validated forms (GSTIN/PAN/IFSC/UPI, contact) · honeypot + timing bot protection · analytics hooks · one primary CTA per page.

## Structure

```
src/
  app/                 routes: /, /tools, /tools/[slug], /categories, /favorites, /guides, /m (digital menu), legal pages
  lib/registry.ts      metadata for all 115 tools (name, category, keywords, FAQs)
  lib/content.ts       how-to steps & FAQs
  lib/format.ts        ₹ formatting, lakh/crore words, dates
  lib/tax.ts           income-tax slabs (new/old regime), surcharge, rebate
  lib/export.ts        PDF / PNG / print / WhatsApp / clipboard helpers
  components/ui        Button, Field, Card, Stat, Badge, Toast…
  components/shell     CalculatorShell, DocumentShell + PaperPreview, SimpleCalc engine, LineItems, QR, Barcode, Scanner
  tools/index.ts       slug → lazy component loader (code-split per tool)
  tools/billing        invoice family (InvoiceLike engine), receipts
  tools/calc           55 calculators (specs.tsx = declarative KPI calcs)
  tools/shop, hr, logistics, freelancer, marketing, media, legal
  data/hsn.ts          HSN/SAC codes with GST 2.0 rates
public/sw.js           offline service worker (registered in production)
```

## Design

Minimal, elegant: white surfaces with black pill buttons and a blue link accent, pastel-sky hero, Inter with tight bold headlines, semantic colour tokens with a full dark mode, ⌘K search, 8-pt spacing, Lucide icons only. Documents are rendered as fixed-width "paper" (A4, A5, 80 mm thermal, 4×6 label, CR80 card) scaled to fit, then rasterised to PDF/PNG.

## Notes

- Statutory rates (GST 2.0 slabs, income-tax slabs, TDS, PT, PF, bonus) reflect rules as understood for FY 2026-27 and are labelled in each tool; verify with a professional before filing.
- Business details, logo, UPI ID, favourites and drafts persist only in `localStorage`.
- The AI social-post generator is template-driven (no API key, fully offline). Background removal and OCR download open-source models on first use and are cached by the browser.
