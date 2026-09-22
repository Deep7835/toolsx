---
updated: 2026-09-22
---
The tiny icon in the browser tab, the home-screen icon when a customer saves your site, the image next to your name in Google search results — all come from the same small set of files, and most small-business websites are missing half of them. This generator turns your **logo or initials** into a complete favicon and app-icon bundle: SVG, 16/32/48 px ICO, 180 px Apple touch icon, 192 and 512 px Android/PWA icons, a maskable variant and the `manifest.webmanifest` and HTML tags to wire them up. It runs in your browser; your logo is never uploaded.

## What the bundle contains

| File | Used by |
|---|---|
| `favicon.svg` | Modern browsers; scales to any size, supports dark mode |
| `favicon.ico` (16, 32, 48) | Older browsers and Windows shortcuts |
| `apple-touch-icon.png` (180 × 180) | iPhone/iPad "Add to Home Screen" |
| `icon-192.png`, `icon-512.png` | Android home screen, PWA install, Chrome |
| `icon-maskable.png` | Android adaptive icons (safe zone inside a circle) |
| `manifest.webmanifest` | App name, colours, icons for installable sites |
| HTML `<link>` and `<meta>` tags | Paste into the site's `<head>` |

Google shows a site's favicon in mobile and desktop search results; a missing or low-contrast one hurts click-through and looks unfinished next to competitors — see [Google AI Mode and local search](/blog/google-ai-mode-local-seo-for-indian-businesses-2026).

## How to use the generator

1. **Text mode**: type 1–3 letters (your initials or first letter of the brand), pick the font, weight, colours and corner radius. **Image mode**: upload a square logo (PNG with transparency is best) and set padding.
2. Preview at real sizes — 16 px in a tab, 48 px in a bookmark, 180 px on a phone — and in light and dark.
3. Adjust: at 16 px, fine details vanish; a bold letter or a simplified mark works best.
4. Download the ZIP; upload the files to your site's root (or `/icons/`) and paste the tags into `<head>`.
5. Verify with the [SERP snippet preview](/tools/serp-preview) and by adding the site to a phone's home screen.

## Design rules for icons

- **Simplify**: one shape or one letter; drop taglines and thin lines.
- **Contrast**: the icon sits on white tabs, dark tabs and coloured phone wallpapers — test all three.
- **Safe zone** for maskable icons: keep the mark within the central 80% so Android's circle or squircle does not clip it.
- **Match your brand colours** across the icon, the [letterhead](/tools/letterhead), the [email signature](/tools/email-signature) and the [social posts](/tools/social-post).
- **Don't use a trademark you do not own** — and consider registering yours; the process and cost are in [Trademark registration in India](/blog/trademark-registration-india-small-business-cost-process).

## For WordPress, Shopify and builders

WordPress: Appearance → Customize → Site Identity → Site Icon accepts the 512 px PNG and generates the rest; add the SVG via the theme's header or a plugin. Shopify: Theme settings → Favicon (32 px is generated; add the touch icon via theme code). Wix/Squarespace: site settings accept a PNG. For custom sites, use the generated tags as-is; the [robots.txt generator](/tools/robots-txt) and [meta tag generator](/tools/meta-tags) finish the basic on-page setup.

## Related tools

- [Meta tag generator](/tools/meta-tags) — title, description and Open Graph tags for the same `<head>`.
- [SERP snippet preview](/tools/serp-preview) — see the icon next to your title in results.
- [Background remover](/tools/background-remover) — clean up a logo before making icons.
- [Photo resizer](/tools/photo-resizer) — resize logos for other uses.
- [Email signature maker](/tools/email-signature) — consistent branding in mail.

## FAQ

### Is my logo uploaded to a server?

No. Rendering happens in your browser with the Canvas API; the ZIP is built locally.

### Which sizes do I actually need?

At minimum: `favicon.svg` (or a 32 px PNG), `favicon.ico`, the 180 px Apple touch icon and 192/512 px PNGs with a manifest. The bundle includes all of them plus the tags.

### Can the favicon adapt to dark mode?

Yes — the SVG favicon supports a `prefers-color-scheme` media query; enable "dark variant" and the generator embeds both colourways.

### Why does Google not show my favicon?

It must be a multiple of 48 px (the SVG or 48 px ICO works), accessible at a stable URL, and the site must be crawlable. Changes take days to weeks to appear.

### What is a maskable icon?

An Android icon with the mark inside a safe zone so the OS can crop it into a circle, squircle or rounded square without cutting off edges.
