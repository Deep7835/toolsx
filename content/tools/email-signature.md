---
updated: 2026-09-22
---
An email signature is read more often than your website: every quote, invoice, follow-up and reply carries it. Done well, it gives the recipient your name, role, phone, a one-tap WhatsApp link and a reason to click — a banner for the current offer, a link to reviews. Done badly, it is a 4 MB image that lands in spam or a mess of broken tables. This maker builds a **clean HTML email signature** that renders correctly in Gmail, Outlook, Apple Mail and phones, with your logo, brand colour, social links, banner and legal footer, and installs in a couple of clicks.

## What to include

| Line | Guidance |
|---|---|
| Name and designation | Two lines; keep titles short |
| Company and logo | Logo 120–160 px wide, PNG; the [background remover](/tools/background-remover) makes it transparent |
| Phone and WhatsApp | The WhatsApp number as a [wa.me link](/tools/whatsapp-direct) with a pre-filled "Hi, I got your email…" |
| Email and website | Website with https:// |
| Address (optional) | Registered office for companies (the Companies Act expects it on official communications) |
| GSTIN (optional) | Useful for vendors and B2B buyers |
| Social links | Only the profiles you keep active |
| Banner | One offer, one CTA — "Diwali catalogue → " or "Rate us on Google" via the [review link](/tools/google-review) |
| Legal footer | Confidentiality line for professionals; DPDP-related notice if you handle personal data |

Keep the whole thing under 8 lines and under 50 KB.

## How to use the maker

1. Fill in the fields; the preview shows the signature exactly as it will render, on light and dark backgrounds.
2. Choose a layout (logo left, stacked, minimal), font, colour and icon style.
3. Add a banner image (600 × 100 px works everywhere) with its link, and social icons.
4. Click **Copy signature** and paste into Gmail (Settings → Signature), Outlook (Options → Signatures), or Apple Mail; or download the HTML for your IT team to deploy across the company.
5. Send a test to yourself and open it on a phone.

## Why HTML signatures break, and how this one does not

Email clients strip CSS, ignore modern layout and resize images unpredictably. The maker outputs table-based HTML with inline styles, absolute image URLs (or embedded data for small logos), fixed widths, and `alt` text — the approach that survives Outlook. Images are hosted from a link you provide or embedded as Base64 (see the [JSON & Base64 tool](/tools/json-base64) if you want to inspect it); very large embedded images can trigger spam filters, so logos are compressed automatically.

## Consistency and compliance

- Match colours and logo with your [letterhead](/tools/letterhead), [favicon](/tools/favicon-generator) and invoices.
- Companies should show the registered name, CIN and office address in official emails.
- For marketing emails and bulk sends, consent and unsubscribe rules apply; a signature is not a newsletter. TRAI's 2026 messaging norms are summarised in [TRAI's new anti-spam rules](/blog/trai-anti-spam-rules-2026-businesses-that-call-or-message-customers).
- Do not paste your signature into WhatsApp messages; use the [vCard QR](/tools/vcard-qr) instead for contact sharing.

## Related tools

- [WhatsApp direct link](/tools/whatsapp-direct) — the click-to-chat link in the signature.
- [vCard contact QR](/tools/vcard-qr) — for printed material and slides.
- [Letterhead generator](/tools/letterhead) — matching stationery.
- [Favicon & app icon generator](/tools/favicon-generator) — the same logo for the browser tab.
- [Google review request builder](/tools/google-review) — the banner's best use.

## FAQ

### Will the signature work in Outlook?

Yes. The generated HTML uses tables and inline styles, which Outlook renders reliably. Test with a message to yourself.

### Should the logo be embedded or linked?

Linked from your website is most robust if the image URL is stable; embedded (Base64) works offline but can be stripped by some clients. The maker supports both.

### How big should the banner be?

600 × 100 px (or 600 × 150) at under 40 KB. One message, one link.

### Can I make signatures for my whole team?

Yes — save the design and change names, roles and numbers per person; download each as HTML or copy directly into their mail client.

### Does a signature count as marketing?

No, unless it becomes the primary content of bulk sends. Keep the banner subtle and rotate it with your campaigns.
