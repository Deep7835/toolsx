---
updated: 2026-09-22
---
A photo of a supplier's invoice, a stack of visiting cards from an exhibition, a printed price list, a screenshot of a bank statement, a page from a bound ledger — all of them are text trapped in pixels until something reads them. This tool extracts **editable text from images and scans using on-device OCR** (English, Hindi and other Indian scripts), keeps line structure, detects tables where it can, and lets you copy, search or download the result — without uploading the image anywhere. Receipts, GSTINs and card details stay on your device.

## What it reads well

- **Printed documents**: invoices, purchase orders, bank statements, contracts, price lists — near-perfect with a straight, well-lit capture.
- **Business cards**: names, phones, emails; export as a contact or build a [vCard QR](/tools/vcard-qr).
- **Screenshots**: WhatsApp orders, app screens, PDFs you cannot copy from.
- **Labels and packaging**: batch numbers, MRPs, ingredient lists.
- **Handwriting**: only clear block capitals; cursive is unreliable.

## How to use the extractor

1. Drop an image (JPEG/PNG/HEIC) or a PDF page, or use the camera on a phone.
2. Choose the language(s) — English, Hindi (Devanagari), and others; mixed English–Hindi documents work with both selected.
3. Wait for recognition (the language model downloads on first use and is cached).
4. Review the text; corrections are quick for the odd misread digit. Use **table mode** for invoices and statements to get columns.
5. Copy, download as TXT/CSV, or send the text to the [word counter](/tools/word-counter), [JSON tool](/tools/json-base64) or a spreadsheet.

## Getting accurate results

- Photograph straight-on in even light; avoid shadows across the page.
- Fill the frame with the document; crop before OCR.
- 300 dpi scans or 12-megapixel phone photos are plenty; blurry images are the main cause of errors.
- Verify **numbers** — a 5 read as 6 on an invoice total matters; the tool highlights low-confidence characters.
- For multi-page documents, split the PDF with the [PDF merge & split](/tools/pdf-merge-split) tool and OCR each page.

## Business uses

- **Purchase entry**: OCR supplier invoices to capture invoice number, date, GSTIN, taxable value and tax into your books; verify the GSTIN format with [How to verify a GSTIN](/blog/how-to-verify-gstin-number-format).
- **Expense claims**: staff photograph bills; the text goes into the claim sheet.
- **Digitising old records**: ledgers and registers into searchable text before they fade.
- **Lead capture**: exhibition visiting cards into a contact list, then a [WhatsApp link](/tools/whatsapp-direct) follow-up.
- **Price comparison**: a competitor's printed price list into a sheet next to yours, then the [discount calculator](/tools/discount-calculator).

The wider set of AI tools that genuinely help a small shop — and the ones that do not — is in [AI for the small shop in 2026](/blog/ai-for-kirana-and-small-shops-2026).

## Privacy

Invoices carry GSTINs and amounts; cards carry personal contacts; statements carry account numbers. Because recognition runs in your browser, none of it is transmitted. Delete photos of customer documents once processed and keep only what you need, as the DPDP Act expects — the checklist is in [DPDP Rules 2025 for small businesses](/blog/dpdp-rules-2025-checklist-for-small-websites).

## Related tools

- [PDF merge & split](/tools/pdf-merge-split) — prepare multi-page scans.
- [Word counter](/tools/word-counter) — check and clean the extracted text.
- [vCard contact QR](/tools/vcard-qr) — turn a scanned card into a QR.
- [Background remover](/tools/background-remover) — the other on-device AI tool.
- [JSON & Base64 tool](/tools/json-base64) — structure extracted data.

## FAQ

### Are my images uploaded?

No. The OCR engine and language data run in your browser; images and text stay on your device.

### Which languages are supported?

English, Hindi and most major Indian scripts (Bengali, Tamil, Telugu, Marathi via Devanagari, Gujarati, Kannada, Malayalam, Punjabi), plus common European languages. Select the ones present in the document.

### How accurate is it?

Typically 95–99% on clear printed text; lower on small fonts, poor lighting, decorative fonts and handwriting. Always check numbers.

### Can it read tables?

Table mode reconstructs columns from aligned text and exports CSV; complex merged-cell layouts may need manual cleanup.

### Can it OCR a PDF?

Yes — drop a PDF and select the page; for scanned multi-page PDFs, process pages one at a time or split them first.
