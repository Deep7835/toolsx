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

Set `NEXT_PUBLIC_SITE_URL` for correct sitemap/robots URLs in production.

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
