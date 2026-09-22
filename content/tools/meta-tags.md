---
updated: 2026-09-22
---
The title tag and meta description are the only parts of your page most people ever see — in a Google result, a WhatsApp link preview, a LinkedIn share. Get them right and a page earns clicks it has not "ranked" for; get them wrong and Google rewrites them. This generator builds a complete, correct **`<head>` block**: title, meta description, canonical URL, robots directives, Open Graph and Twitter Card tags for social previews, viewport and language — with live pixel-width checks against Google's limits and a preview of the search and social cards.

## What each tag does

| Tag | Purpose | Guidance |
|---|---|---|
| `<title>` | The blue link in results; the browser tab | 50–60 characters (~580 px); keyword first, brand last |
| `meta description` | The grey snippet | 140–155 characters (~920 px); a reason to click, include the offer or answer |
| `canonical` | The preferred URL when duplicates exist | Absolute URL, self-referencing on most pages |
| `robots` | `index, follow` or `noindex` for account, cart, thank-you pages | Use with the [robots.txt generator](/tools/robots-txt) |
| Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) | Facebook, WhatsApp, LinkedIn previews | Image 1200 × 630, under 1 MB, absolute URL |
| Twitter Card | X previews | `summary_large_image` with the same image |
| `viewport`, `lang`, `charset` | Mobile rendering and language | `width=device-width, initial-scale=1`; `lang="en-IN"` or `hi-IN` |

## How to use the generator

1. Enter the page URL, title and description; the pixel meters turn amber and red as you approach Google's cut-off.
2. Set robots (index/noindex), canonical (defaults to the URL), language and site name.
3. Upload or link the social image; the Open Graph and Twitter cards preview instantly. Make images with the [photo resizer](/tools/photo-resizer).
4. Copy the generated tags into the page `<head>`; in WordPress, use your SEO plugin's fields (Rank Math/Yoast) which write the same tags.
5. Check the final result in the [SERP snippet preview](/tools/serp-preview) and, for schema, add [structured data](/tools/schema-markup).

## Writing titles and descriptions that get clicked

- Lead with what the searcher typed: "GST Invoice Generator — Free, No Login | Kaagazo".
- Add the differentiator: price, city, speed, "free", "same-day".
- Descriptions are ad copy: answer the query and add a nudge ("Print or WhatsApp the bill in 1 minute").
- One title per page; duplicate titles across pages dilute all of them.
- Match the page: Google rewrites titles that do not reflect the content.
- For local pages, include the area: "Custom Cakes in Indiranagar, Bengaluru".

## Social previews for WhatsApp

Most Indian sharing happens on WhatsApp, which reads Open Graph tags. Without them, a shared link shows a bare URL; with them, a card with image and title — several times the tap rate. The `og:image` must be an absolute HTTPS URL and load quickly; WhatsApp caches it, so change the file name when you update the image. Use the same image for X and LinkedIn via the Twitter Card tags.

## The rest of the on-page checklist

Titles and descriptions sit alongside a crawlable site ([robots.txt](/tools/robots-txt)), [schema markup](/tools/schema-markup), a [favicon](/tools/favicon-generator), fast images and a [privacy policy](/tools/privacy-policy-generator). For local businesses, the profile and reviews matter as much — the 2026 playbook is in [Google AI Mode and local SEO](/blog/google-ai-mode-local-seo-for-indian-businesses-2026).

## Related tools

- [SERP snippet preview](/tools/serp-preview) — desktop and mobile rendering of your tags.
- [Schema markup generator](/tools/schema-markup) — structured data for the same page.
- [Robots.txt generator](/tools/robots-txt) — crawl rules.
- [Favicon & app icon generator](/tools/favicon-generator) — the icon beside your title.
- [Word counter](/tools/word-counter) — quick character checks.

## FAQ

### How long should a title tag be?

50–60 characters, or under about 580 pixels on desktop. The generator measures pixels, which is what Google actually truncates on.

### Does the meta description affect ranking?

Not directly, but it affects click-through rate, and Google often uses it as the snippet when it matches the query.

### Why does Google show a different title from mine?

Google rewrites titles it finds misleading, too long, keyword-stuffed or mismatched with the H1. Keep title and H1 consistent and descriptive.

### What image size for Open Graph?

1200 × 630 pixels, JPEG or PNG under 1 MB, with the subject centred (WhatsApp crops to square in some views).

### Should every page have a canonical tag?

Yes, self-referencing by default; point it at the preferred URL when the same content exists at several addresses (filters, tracking parameters, http/https).
