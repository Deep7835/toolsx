---
updated: 2026-09-22
---
Sometimes you need to read a code, not make one: check that the barcode you printed actually decodes, verify a supplier's UPI QR before paying ₹80,000, read the EAN on a competitor's pack to look up the product, or pull the tracking number off a courier label. This scanner reads **QR codes and 1D barcodes** (EAN-13, EAN-8, UPC, Code 128, Code 39, ITF) straight from your phone or laptop camera, or from an uploaded image or screenshot, and shows the decoded content — with a safety check on UPI and URL payloads. It runs entirely in your browser; no image or result leaves your device.

## What it decodes

| Code | Typical content | What the scanner shows |
|---|---|---|
| UPI QR | `upi://pay?pa=…&pn=…&am=…` | The payee VPA, name, amount and a warning if it is a *collect* request |
| URL QR | A web link | The full URL, domain highlighted, with an "open" button |
| vCard / WiFi QR | Contact or network details | The parsed fields |
| EAN-13 / UPC | Product identifier | The number and its GS1 prefix (890 = India) |
| Code 128 / 39 | SKUs, AWBs, IDs | The raw text |
| Plain text QR | Anything | The text |

## How to use the scanner

1. Tap **Camera** and allow access; point at the code. It reads automatically — no button to press.
2. Or tap **Upload** and choose a photo or screenshot (a WhatsApp forward of a QR, for example).
3. Read the decoded result. For URLs, check the domain before opening; for UPI, confirm the VPA and payee name match the person you intend to pay.
4. Copy the result, open the link, or add the contact.
5. For batch checks (a sheet of printed labels), scan each in turn; the history list keeps the session's results.

## Verifying your own printed codes

Print a sample from the [barcode generator](/tools/barcode-generator), [UPI standee](/tools/upi-standee) or [URL QR generator](/tools/url-qr), and scan it under shop lighting from the distance customers will use. If it fails, the usual causes are low contrast, a code printed too small, a missing quiet zone, or glossy lamination. Fix and reprint before ordering 500 labels.

## Fraud checks the scanner helps with

- **Pasted-over QR**: fraudsters stick their own QR over a shop's standee. Scan your own standee weekly and confirm the VPA is yours.
- **"Collect request" QRs**: a QR that asks you to *approve* a payment is pulling money from you, not paying you. The scanner flags `upi://collect` and any amount field on an incoming QR.
- **Look-alike links**: a QR to `kaagazo-support.xyz` is not Kaagazo. Read the domain.
- **Fake GST or delivery notices with QRs**: never pay a "penalty" from a QR in a message; the scam patterns are described in [GST scam calls, fake notices and OTP fraud](/blog/gst-scam-calls-and-fake-notices).

## Privacy

Camera frames are processed in your browser with an open-source decoder; nothing is streamed or stored. Camera access can be revoked in the browser at any time. Uploaded images are read locally and discarded when you close the tab.

## Related tools

- [Barcode generator](/tools/barcode-generator) — make the codes you are testing.
- [UPI QR standee](/tools/upi-standee) — your own payment QR.
- [URL QR generator](/tools/url-qr) — link codes.
- [Shipping label generator](/tools/shipping-label) — AWB barcodes for parcels.
- [Password strength checker](/tools/password-strength) — the other half of basic security hygiene.

## FAQ

### Does it work on a laptop?

Yes, with a webcam, though phone cameras focus better on small codes. Uploading a photo works on any device.

### Can it read a barcode from a photo on WhatsApp?

Yes. Save the image and use Upload, or paste a screenshot. Clear, straight-on images decode best.

### Will it pay a UPI QR?

No. It only decodes and displays the VPA, name and amount so you can verify before paying with your UPI app.

### Which barcode formats are supported?

QR, EAN-13, EAN-8, UPC-A, UPC-E, Code 128, Code 39, Code 93, ITF and Codabar; Data Matrix and PDF417 support depends on the device.

### Is camera footage stored?

No. Frames are decoded in memory in your browser and never uploaded.
