---
updated: 2026-09-22
---
`robots.txt` is a one-file instruction sheet at the root of your website telling search-engine crawlers where they may and may not go — and it is surprisingly easy to get wrong in a way that removes your whole site from Google. This generator builds a **correct robots.txt** from simple choices: which folders to block (admin, cart, account, search results), which bots to allow or disallow (including AI crawlers), your sitemap location, and any crawl-delay for aggressive bots — with a validator that warns before you block everything.

## What robots.txt does

| Directive | Effect |
|---|---|
| `User-agent: *` | Rules that follow apply to all crawlers |
| `Disallow: /admin/` | Do not crawl this path |
| `Allow: /admin/public/` | Exception within a disallowed path |
| `Sitemap: https://example.com/sitemap.xml` | Where the sitemap lives |
| `Crawl-delay: 10` | Seconds between requests (honoured by Bing, Yandex; ignored by Google) |

It controls **crawling**, not indexing: a blocked page can still appear in results if other sites link to it. To keep a page out of the index, use a `noindex` meta tag (from the [meta tag generator](/tools/meta-tags)) and let it be crawled. And robots.txt is public — never list secret paths in it.

## How to use the generator

1. Choose your platform preset — WordPress, Shopify, WooCommerce, custom — to pre-fill sensible blocks (`/wp-admin/`, `/cart`, `/checkout`, `/account`, `/search`).
2. Add or remove paths; add exceptions (`/wp-admin/admin-ajax.php` for WordPress).
3. Decide on AI crawlers: allow or block `GPTBot`, `ClaudeBot`, `CCBot`, `Google-Extended`, `PerplexityBot` and others individually.
4. Enter your sitemap URL (one line per sitemap).
5. Validate, download `robots.txt`, and upload it to the site root so it is reachable at `https://yourdomain.com/robots.txt`. Test in Google Search Console's robots report.

## Blocking AI crawlers: the trade-off

Blocking `Google-Extended` stops your content being used for Gemini training but does **not** affect Google Search or AI Overviews, which use the normal Googlebot. Blocking `GPTBot` or `ClaudeBot` keeps your pages out of those companies' training and some of their browsing features — which can also mean not being cited when a customer asks an AI assistant for "GST invoice generator near me". For a small business that wants to be found, allowing search and answer engines while blocking pure dataset crawlers (`CCBot`) is a common middle path. The 2026 landscape is discussed in [Google AI Mode and local SEO](/blog/google-ai-mode-local-seo-for-indian-businesses-2026).

## Mistakes that hurt

- `Disallow: /` under `User-agent: *` — blocks the entire site (the validator flags it).
- Blocking CSS and JS folders — Google cannot render pages and ranks them lower.
- Blocking `/wp-content/uploads/` — your product images vanish from image search.
- Assuming robots.txt hides pages — it does not; use `noindex` or authentication.
- Forgetting the sitemap line, the cheapest discovery boost there is.

## Part of basic site hygiene

A robots.txt, an XML sitemap, correct [meta tags](/tools/meta-tags), a [favicon](/tools/favicon-generator), [schema markup](/tools/schema-markup), a [privacy policy](/tools/privacy-policy-generator) and an updated CMS are the launch checklist for any business site — the WordPress-specific hardening steps are in [WordPress 7.1.1 security checklist](/blog/wordpress-7-1-1-click2shell-update-now-checklist).

## Related tools

- [Meta tag generator](/tools/meta-tags) — `noindex` for pages that must stay out of search.
- [Schema markup generator](/tools/schema-markup) — structured data for the pages you do want found.
- [SERP snippet preview](/tools/serp-preview) — how indexed pages appear.
- [Favicon & app icon generator](/tools/favicon-generator) — the rest of the root files.
- [Password generator](/tools/password-generator) — protect the admin you just hid.

## FAQ

### Does robots.txt hide pages from Google?

No. It stops crawling, not indexing. Use a `noindex` meta tag (and allow crawling) to remove a page from results, or password-protect it.

### Where do I upload the file?

At the root of your domain: `https://yourdomain.com/robots.txt`. Subdirectories are ignored. On WordPress, a plugin or the SEO plugin's file editor writes it for you.

### Should I block AI crawlers?

It depends on whether you want to be cited by AI assistants. Blocking `Google-Extended` does not affect Google Search; blocking `GPTBot`/`ClaudeBot` may reduce visibility in those assistants.

### Can I block a specific bad bot?

Yes, by its user-agent, but malicious bots ignore robots.txt. Use server rules or a firewall for those.

### Do I need a crawl-delay?

Rarely. Google ignores it; set it only if Bing or other crawlers are overloading a small server.
