---
updated: 2026-09-22
---
Structured data is how you tell search engines, in their own vocabulary, that this page is a shop with these hours, a product at this price, an article by this author, a how-to with these steps. Google uses it for rich results — stars, prices, breadcrumbs, opening hours — and AI systems use it to summarise you accurately. This generator produces **valid Schema.org JSON-LD** for the types small businesses need — LocalBusiness (and its subtypes), Product, Service, Article, FAQPage, HowTo, BreadcrumbList, Organization — from a form, with a preview and a link to Google's validator. Everything runs in your browser.

## Which type for which page

| Page | Schema type |
|---|---|
| Home / contact page of a shop, clinic, restaurant, agency | `LocalBusiness` (or `Store`, `Restaurant`, `MedicalClinic`, `ProfessionalService`) with address, geo, hours, phone, price range |
| Company home page | `Organization` with logo, contact points, social profiles (`sameAs`) |
| Product page | `Product` with `Offer` (price in INR, availability), brand, SKU, GTIN/EAN from the [barcode generator](/tools/barcode-generator), aggregate rating if you show real reviews |
| Service page | `Service` with provider, area served, offers |
| Blog post | `Article` / `BlogPosting` with headline, author, dates, image |
| Guide with steps | `HowTo` with tools, supplies and steps |
| FAQ section | `FAQPage` — see the [FAQ schema generator](/tools/faq-schema) |
| Every inner page | `BreadcrumbList` |

## How to use the generator

1. Pick the type; fill the form — required fields are marked, recommended ones explained.
2. For LocalBusiness, enter address exactly as on your Google Business Profile, opening hours per day, and a price range (₹₹).
3. For Product, use the price **including GST** in INR, availability, and only real ratings.
4. Preview the JSON-LD; copy the `<script type="application/ld+json">` block into the page `<head>` (WordPress: SEO plugin's schema field or Custom HTML; Shopify: theme.liquid; builders: custom code).
5. Test with the Rich Results Test; fix any warnings; re-test after edits. Validate hand edits in the [JSON tool](/tools/json-base64).

## Rules that keep you out of trouble

- Markup must match **visible content**: no ratings you do not show, no prices that differ from the page.
- Use one entity per page for LocalBusiness; multiple branches get separate pages or `subOrganization`.
- Keep `name`, address and phone identical across your site, Google Business Profile and directories (NAP consistency).
- Use `@id` URLs to connect Organization, WebSite and LocalBusiness so search engines see one entity.
- Update hours for festivals via `specialOpeningHoursSpecification`.

## Why this matters more now

Google's AI Mode and AI Overviews synthesise answers from structured and unstructured data; a page with clean LocalBusiness and Product schema is easier to cite correctly than one without. Schema also supports the review, FAQ and how-to snippets that lift click-through — the local playbook is in [Google AI Mode and local SEO for Indian businesses](/blog/google-ai-mode-local-seo-for-indian-businesses-2026). Brand consistency in the `Organization` entity matters for trademark clarity too; registering your mark is covered in [Trademark registration in India](/blog/trademark-registration-india-small-business-cost-process).

## Related tools

- [FAQ schema generator](/tools/faq-schema) — FAQPage in the same format.
- [Meta tag generator](/tools/meta-tags) — title, description, canonical and Open Graph.
- [SERP snippet preview](/tools/serp-preview) — what the listing looks like.
- [Robots.txt generator](/tools/robots-txt) — make sure the pages are crawlable.
- [Google review request builder](/tools/google-review) — real reviews to reference.

## FAQ

### JSON-LD or microdata?

JSON-LD — Google's recommended format, easier to add and maintain, and it does not touch your HTML layout.

### Where does the code go?

Anywhere in the page's HTML, usually the `<head>`. One `<script>` per type, or several types combined in an `@graph`.

### Will schema improve my ranking?

Not directly, but it enables rich results and better understanding, which improve click-through and visibility in AI-generated answers.

### Can I mark up prices with GST?

Yes — use the consumer price including GST in INR. For B2B pages you may add the taxable price as a separate `PriceSpecification`.

### How do I check it works?

Use Google's Rich Results Test and the Schema.org validator (both linked in the tool), then monitor "Enhancements" in Search Console.
