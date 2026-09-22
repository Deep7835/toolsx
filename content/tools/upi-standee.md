---
updated: 2026-09-22
---
The QR standee on your counter is the most-used piece of paper in your shop. Customers scan it fifty times a day; if it is faded, tiny, or printed from a screenshot of an app, it fails — and a failed scan becomes a cash sale or a lost one. This tool builds a **print-quality UPI QR standee** with your business name, UPI ID and an optional fixed amount, sized for A5 counter stands or A4 wall posters, and exports a crisp PDF or PNG. The QR is generated in your browser from the NPCI `upi://pay` standard, so it works with GPay, PhonePe, Paytm, BHIM and every bank app.

## Static vs dynamic QR: which one is this?

This is a **static** QR. It encodes your VPA and name; the customer types the amount. That is exactly what a counter standee should be — one code, any amount, no app needed at your end. When you want the amount baked in (so the customer cannot mistype ₹1,180 as ₹118), use the dynamic QR that the [GST invoice](/tools/gst-invoice) and [payment receipt](/tools/payment-receipt) tools print on each bill. Fixed-price counters — a ₹20 chai stall, a ₹50 parking slot — can lock an amount on the standee itself using the optional field.

Step-by-step instructions, including how to get your VPA from each app, are in [How to make a UPI QR code for your shop](/blog/how-to-make-upi-qr-code-for-shop-free).

## What makes a standee scan reliably

- **Size.** The QR should be at least 4 cm across for a counter, 8–10 cm for a wall. The A5 layout gives 9 cm; A4 gives 14 cm.
- **Quiet zone.** A white margin of at least four modules around the code. The template enforces it.
- **Contrast.** Black on white scans fastest; the colour themes keep the QR itself dark on a light panel even when the background is coloured.
- **Error correction.** Level M (15% recovery) is used so a scuff or sticker corner does not kill the code.
- **Lamination.** Matte lamination; glossy film reflects the shop's tube light straight into the phone camera.
- **Placement.** Eye level or on the counter facing the customer, not behind the cashier's arm.

The full checklist, with placement photos, is in [UPI QR standee: the checklist for a counter QR that actually gets scanned](/blog/upi-qr-standee-best-practices).

## How to use the generator

1. Enter your UPI ID (for example `shopname@okaxis` or `9876543210@ybl`) and the name customers should see on the payment screen. The tool validates the VPA format.
2. Optionally fix an amount for single-price counters.
3. Choose **A5** (counter stand) or **A4** (wall poster) and a colour theme; add a short line such as "Scan & pay · No cash change needed".
4. Download the PDF and print at 100% scale (no "fit to page"), or download PNG to share with your printer or on WhatsApp.
5. Test the printed copy with two different apps before laminating.

## Reconciling payments

A static QR means every payment lands in your account labelled with the customer's name, not your bill number. To keep books tidy: print bill-specific dynamic QRs for large sales, note the UTR on the [payment receipt](/tools/payment-receipt), and export the bank statement weekly. If you receive more than ₹1 lakh a month via QR, your bank or PSP will move you from the P2PM "small merchant" tag to a full merchant category — relevant now that UPI MDR applies to P2M transactions above ₹2,000 from 15 October 2026. Estimate the impact with the [UPI MDR calculator](/tools/upi-mdr-calculator) and read [UPI MDR is here: how to prepare your shop](/blog/upi-mdr-2026-how-to-prepare-your-shop).

## Security notes

- Never accept a "refund QR" or "collect request" from a stranger — scanning a QR only ever **sends** money.
- Check your standee weekly; fraudsters have been known to paste their own QR over shop codes. Scan it yourself with the [barcode & QR scanner](/tools/barcode-scanner) to confirm the VPA.
- Use a business VPA linked to a current account so payouts and statements stay separate from personal spending.

## Related tools

- [Payment receipt](/tools/payment-receipt) — dynamic QR with the exact amount, plus thermal printing.
- [GST invoice](/tools/gst-invoice) — bill-specific QR on every invoice.
- [WhatsApp direct link & QR](/tools/whatsapp-direct) — a second QR for orders and queries.
- [Store WiFi QR](/tools/wifi-qr) — the other QR customers ask for.
- [Barcode & QR scanner](/tools/barcode-scanner) — verify any QR before trusting it.

## FAQ

### Will this QR work with every UPI app?

Yes. It follows NPCI's `upi://pay` specification with your VPA (`pa`) and payee name (`pn`), which every UPI app in India reads. It is not a BharatQR card code, so card-only POS scanners will not read it.

### Is it safe to print my UPI ID publicly?

Yes. A VPA can only receive money; nobody can debit your account with it. Do not print your phone number as the VPA if you prefer privacy — create a custom handle in your bank app.

### Does the standee expire?

No. A static QR stays valid as long as the VPA is active. Regenerate it if you change banks or close the account behind the VPA.

### Can I put my logo in the middle of the QR?

The generator keeps the code clean for maximum scan reliability and places your logo and name above it. Logos inside the QR reduce readability on cheap phone cameras.

### Should I charge customers extra for UPI now that MDR applies?

No. NPCI rules prohibit passing MDR on to customers, and most shops will remain under the P2PM exemption anyway. Build the cost into pricing if you are a large merchant.
