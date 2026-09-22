---
updated: 2026-09-22
---
API work for a small business is mostly plumbing: the payment gateway's webhook payload that will not parse, the marketplace's product feed with a missing comma, the Base64 blob in a GST e-invoice response, the logo that a form wants as a data URL. This developer utility handles the daily set — **JSON formatting, validation, minifying, sorting and diffing, plus Base64 encoding and decoding of text and files** — in your browser, with no data sent to any server, which matters when the payload contains customer or tax data.

## What it does

| Tool | Use |
|---|---|
| JSON pretty-print | Indent a minified payload for reading; choose 2 or 4 spaces |
| JSON validate / lint | Find the exact line and character of a syntax error (trailing commas, single quotes, unquoted keys) |
| JSON minify | Strip whitespace before pasting into a config or a URL |
| Sort keys | Alphabetise keys to compare two payloads |
| JSON diff | Side-by-side differences between two documents |
| JSON → CSV / table | Flatten an array of objects into a spreadsheet-ready table |
| Base64 encode / decode | Text or file ↔ Base64; URL-safe variant; data URLs for images |
| JWT peek | Decode the header and payload of a token (without verifying the signature) |

## Where Indian businesses meet these formats

- **E-invoicing**: the IRP returns the signed invoice and QR as Base64 JSON; decoding it lets you verify what was signed. Background in [E-invoicing in 2026](/blog/e-invoicing-2026-are-you-covered).
- **Payment gateways** (Razorpay, Cashfree, PayU) send webhooks as JSON; the signature check needs the raw minified body.
- **Marketplace feeds**: product uploads as JSON or CSV; the table view catches a wrong field before 500 listings fail.
- **UPI and QR payloads**: the [barcode & QR scanner](/tools/barcode-scanner) decodes; this tool formats what came out.
- **Schema markup**: the [schema markup generator](/tools/schema-markup) and [FAQ schema generator](/tools/faq-schema) produce JSON-LD; validate edits here before publishing.
- **Images in HTML email**: the [email signature maker](/tools/email-signature) can embed a logo as a Base64 data URL.

## How to use it

1. Paste JSON into the left pane; errors are highlighted with a message. Click **Format** or **Minify**.
2. Use **Sort** and **Diff** to compare a working payload with a failing one.
3. For Base64, paste text or drop a file; choose standard or URL-safe; copy the output or download the decoded file.
4. For a JWT, paste the token to read its claims (expiry, issuer) — the signature is not verified here.
5. Everything clears when you close the tab.

## Privacy note

Payloads often contain names, phone numbers, GSTINs and amounts — personal data under the DPDP Act. Because this tool runs locally, pasting them here does not transfer data to a third party; pasting into an online formatter that logs input might. The checklist for handling customer data in small businesses is in [DPDP Rules 2025 for small websites](/blog/dpdp-rules-2025-checklist-for-small-websites).

## Related tools

- [Schema markup generator](/tools/schema-markup) — JSON-LD for your pages.
- [FAQ schema generator](/tools/faq-schema) — FAQPage JSON-LD.
- [Barcode & QR scanner](/tools/barcode-scanner) — decode QR payloads.
- [Password generator](/tools/password-generator) — API keys and secrets.
- [Meta tag generator](/tools/meta-tags) — the rest of the `<head>`.

## FAQ

### Is my JSON sent to a server?

No. Parsing, formatting and encoding run in your browser. Nothing is logged.

### Why does my JSON fail validation?

Common causes: trailing commas, single quotes instead of double, unquoted keys, comments, or `NaN`/`undefined`. The linter points to the line and character.

### What is URL-safe Base64?

A variant that replaces `+` and `/` with `-` and `_` and drops padding, so the string can go in URLs and file names. Some APIs require it.

### Can I decode a Base64 image?

Yes — paste the string (or a data URL) and the tool shows the image and offers a download.

### Does the JWT tool verify tokens?

No. It decodes the header and payload for inspection only. Verification needs the signing key and should be done server-side.
