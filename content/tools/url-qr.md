---
updated: 2026-09-22
---
A QR code is the bridge between anything printed and anything online: a poster to a booking page, a bill to a feedback form, a product box to the instruction video, a menu to the order link. This generator creates **high-resolution URL QR codes** — customised with your colours, size, margin and error-correction level — and exports them as PNG for print, SVG for designers, or a data URL for your website. It runs entirely in your browser; the link is never sent anywhere and the code never expires.

## Static vs dynamic QR

The codes made here are **static**: the URL is encoded directly, they work forever, and they need no service. **Dynamic** QRs (offered by paid services) encode a short redirect link that you can change later and that counts scans — useful when the destination will change, but they stop working if the service does. A middle path: point the static QR at a page you control (your site, a Google Form, a WhatsApp link) and change the page's content instead of the code.

## How to use the generator

1. Paste the URL, including `https://`. Shorten long tracking URLs first; shorter links make simpler, more scannable codes.
2. Set size (300–2000 px), foreground and background colours, and corner style. Keep contrast high — dark on light.
3. Choose error correction: **L** for large clean prints, **M** (default) for most uses, **H** if you will place a logo in the centre or the code may get scuffed.
4. Add a caption line ("Scan to book", "Menu", "Pay here") and download PNG or SVG.
5. Test with two phones and, if the destination is a form, submit a test entry.

## Where each QR earns its space

- **Google review request** — see the [review request builder](/tools/google-review).
- **Digital menu** — [menu creator](/tools/menu-creator) generates one automatically.
- **Order on WhatsApp** — the [wa.me link](/tools/whatsapp-direct) with a pre-filled message.
- **Payments** — use the [UPI QR standee](/tools/upi-standee), not a URL; payment QRs follow a different standard.
- **Product information**: care instructions, warranty registration, authenticity check.
- **Event tickets and certificates**: verification pages, as on the [award certificate](/tools/award-certificate).
- **Job postings, catalogues, brochure PDFs**: keep printed matter short and link the rest.

## Print and placement rules

- Minimum size is roughly scan distance ÷ 10: a code read from 30 cm should be at least 3 cm; a wall poster read from 2 m needs 20 cm.
- Quiet zone of four modules around the code; the generator includes it — do not crop it in your layout.
- Avoid printing on glossy laminate under strong lights; matte scans better.
- Never invert (light code on dark background); many scanners fail on inverted codes.
- Put a call to action beside it — codes without a caption get 30–50% fewer scans.

## Tracking scans without a paid service

Add UTM parameters to the URL (`?utm_source=poster&utm_medium=qr&utm_campaign=diwali`) and read the visits in your analytics. The [meta tag generator](/tools/meta-tags) and [SERP preview](/tools/serp-preview) tools help make the landing page itself look right once people arrive.

## Related tools

- [WhatsApp direct link & QR](/tools/whatsapp-direct) — chat links with pre-filled text.
- [vCard contact QR](/tools/vcard-qr) — save-my-number codes.
- [UPI QR standee](/tools/upi-standee) — payment codes.
- [Store WiFi QR](/tools/wifi-qr) — network access codes.
- [Barcode & QR scanner](/tools/barcode-scanner) — test what you printed.

## FAQ

### Does the QR code expire?

No. A static QR encodes the URL itself and works as long as the URL does. There is no account, service or subscription involved.

### Can I change the link after printing?

Not in a static QR. Point the code at a page you control and update the page, or use a URL shortener that lets you edit the destination.

### Can I put my logo in the middle?

Yes, with error-correction level H and a logo covering no more than about 20% of the code. Test carefully; logos reduce scan reliability on cheap cameras.

### PNG or SVG?

SVG for anything a designer or printer will scale (posters, packaging); PNG at 1000 px or more for social posts, documents and web.

### Why won't my QR scan?

Usually low contrast, too small, missing quiet zone, or a colour scheme with a light code on a dark background. Regenerate with default colours at a larger size and test again.
