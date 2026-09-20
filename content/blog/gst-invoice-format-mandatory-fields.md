---
title: "GST invoice format: the 16 mandatory fields, with a free template"
description: "What a valid tax invoice must contain under Rule 46, when to use a bill of supply instead, how CGST/SGST vs IGST is decided, numbering rules, and the mistakes that get ITC denied."
date: "2026-02-04"
updated: "2026-09-15"
kind: guide
hero: true
tags: [gst, billing]
tools: [gst-invoice, hsn-finder, credit-note, gst-calculator]
---

A tax invoice is the document that lets your customer claim input tax credit and lets you prove your sale. Get a field wrong and the buyer's ITC can be denied under the IMS matching regime, which is why "GST invoice format" remains one of India's most searched business queries every single month.

## The mandatory fields (Rule 46, CGST Rules)

1. **Supplier's name, address and GSTIN**
2. **Invoice number** — consecutive, unique for the financial year, max 16 characters, letters/numerals/`-`/`/` only
3. **Date of issue**
4. **Recipient's name, address and GSTIN** (if registered); for unregistered buyers, name and address if the value exceeds ₹50,000
5. **HSN code** for goods / **SAC** for services — 4 digits if turnover ≤ ₹5 crore, 6 digits above
6. **Description** of goods or services
7. **Quantity** and unit (for goods)
8. **Total value**
9. **Taxable value** after discounts
10. **Rate of tax** — CGST, SGST/UTGST, IGST, cess separately
11. **Amount of tax** — each component separately
12. **Place of supply** with state name and code, for inter-state supplies
13. **Delivery address** if different from place of supply
14. **Whether tax is payable on reverse charge**
15. **Signature or digital signature** of the supplier or authorised person (not required on e-invoices with IRN)
16. **QR code with IRN** for e-invoicing-covered businesses (turnover > ₹5 crore, B2B)

The [GST invoice generator](/tools/gst-invoice) includes every one of these, auto-increments numbers per month, and validates the GSTIN length.

## CGST + SGST or IGST?

- **Same state** (supplier's state = place of supply) → **CGST + SGST**, each at half the rate.
- **Different states** or exports/SEZ → **IGST** at the full rate.

For goods, the place of supply is where delivery ends. For most services, it is the recipient's registered address. Getting this wrong means paying the wrong government, and the fix is a refund claim plus fresh payment — avoid it.

## Tax invoice vs bill of supply vs others

| Document | When |
|---|---|
| **Tax invoice** | Taxable supply by a registered regular dealer |
| **Bill of supply** | Composition dealers, and supplies of exempt goods/services (no tax shown) |
| **Receipt voucher** | Advance received before supply |
| **Delivery challan** | Movement without a sale — job work, branch transfer, exhibition |
| **Credit / debit note** | Reducing or increasing the value of an earlier invoice — see [credit note vs debit note](/blog/credit-note-vs-debit-note) |
| **Proforma invoice** | A quote-like document before supply; not a GST document |

## Timing

- **Goods:** issue on or before removal/delivery.
- **Services:** within **30 days** of supply (45 days for banks/NBFCs).
- **Continuous supply:** on or before the due date of each payment.

## Copies

Goods: three copies marked *Original for Recipient*, *Duplicate for Transporter*, *Triplicate for Supplier*. Services: two copies. Digital PDFs satisfy this if marked appropriately.

## Numbering rules people get wrong

- One series per financial year; you may run multiple series (e.g. `INV/`, `RET/`) but each must be consecutive.
- Restart at 1 on 1 April, or continue — either is fine, but state it in your books.
- No gaps. A cancelled invoice stays in the series, marked cancelled.

## Small-value simplifications

- B2C invoices under ₹200 need not be issued if the customer doesn't ask; issue a consolidated invoice at day-end.
- Unregistered B2C buyers don't need their address on the invoice below ₹50,000.
- Rounding: total tax may be rounded to the nearest rupee.

## The mistakes that get ITC denied

- Wrong GSTIN of the buyer (a typo puts the credit in someone else's IMS).
- Missing or 2-digit HSN when 4/6 digits are required.
- IGST charged on an intra-state supply.
- Invoice date before the supplier's GST registration date.
- Duplicate invoice numbers across two series.

Check the rate for any item with the [HSN finder](/tools/hsn-finder) and the split with the [GST calculator](/tools/gst-calculator).

## FAQ

### Is a handwritten invoice valid under GST?
Yes, if it contains all mandatory fields. Printed or digital is easier to keep consecutive and legible.

### Can I issue an invoice without the buyer's GSTIN?
Yes for B2C. For B2B, the buyer needs their GSTIN on the invoice to claim ITC.

### Do I need a digital signature?
A physical or digital signature by the authorised person is required except on e-invoices carrying an IRN, and on invoices issued through the portal's e-invoicing schema.

### What is the invoice number limit?
16 characters, alphanumeric with hyphen or slash, unique within the financial year.
