---
updated: 2026-09-22
---
A GST invoice is the one document every registered business in India must get right. It is the buyer's proof for claiming input tax credit, your record for GSTR-1, and, increasingly, the paper a customer scans to pay you. This free generator builds a compliant tax invoice in your browser, adds a UPI QR code that carries the exact bill amount, and lets you download an A4 PDF, print an 80 mm receipt, or share the bill on WhatsApp — without creating an account or uploading a single line of your data.

## Who needs a GST invoice, and when

If you are registered under GST, every taxable supply to a business customer needs a tax invoice, and every supply to a consumer above ₹200 needs one too (below that you may issue a consolidated invoice at day end). Composition dealers issue a **bill of supply** instead, without tax columns — the generator handles this when you leave the GSTIN blank or turn tax off. Unregistered sellers below the ₹40 lakh goods / ₹20 lakh services threshold can still use it to raise a plain bill; the tax section simply disappears.

Timing matters. For goods, the invoice must be issued at or before removal or delivery; for services, within 30 days of supply (45 days for banks and NBFCs). If your aggregate turnover crossed ₹5 crore in any year since 2017-18, the invoice must also be reported on the e-invoice portal to get an IRN — see [our e-invoicing guide](/blog/e-invoicing-2026-are-you-covered) for the 30-day reporting rule.

## What a compliant invoice must contain

Rule 46 of the CGST Rules lists the mandatory fields. The generator prints all of them:

| Field | Why it matters |
|---|---|
| Your name, address and GSTIN | Identifies the supplier for the buyer's ITC |
| Consecutive, unique invoice number (max 16 characters) | Must be unique within a financial year; the tool auto-increments |
| Date of issue | Determines the tax period and the 30 November credit-note deadline |
| Buyer's name, address and GSTIN (if registered) | B2B invoices without the buyer's GSTIN cannot be matched in GSTR-2B |
| HSN or SAC code per line | 4 digits if turnover ≤ ₹5 crore, 6 digits above; use the [HSN finder](/tools/hsn-finder) |
| Description, quantity, unit, rate, taxable value | The basis for every tax figure |
| Rate and amount of CGST + SGST or IGST | Intra-state gets CGST + SGST; inter-state gets IGST |
| Place of supply with state code | Decides which tax applies |
| Signature or digital signature | Optional for e-invoices, still expected on printed copies |

The full list, with examples of what an officer looks for, is in [GST invoice format: the 16 mandatory fields](/blog/gst-invoice-format-mandatory-fields).

## How to use the generator

1. Fill your business details once — name, address, GSTIN, logo and UPI ID. They are saved in your browser's local storage, so the next invoice starts pre-filled.
2. Add the customer. Pick **intra-state** for CGST + SGST or **inter-state** for IGST; the tool takes the state code from the GSTIN prefix.
3. Add line items with HSN/SAC, quantity, rate and GST slab. If your prices already include tax, switch on **inclusive** and the base value is back-calculated.
4. Optional extras: discount, round-off, bank details, terms, and notes such as "Reverse charge: No".
5. Download the PDF, print, or share. The UPI QR uses the standard `upi://pay` deep link with the amount pre-filled, so GPay, PhonePe, Paytm and every bank app open with the right figure.

## Getting the tax right

Since 22 September 2025 most goods and services fall in the 5% or 18% slab, with 40% reserved for tobacco, pan masala, aerated drinks and luxury cars, and 0% or 3% for a small list. If you are billing an old order at 12% or 28%, type a custom rate. For inclusive pricing the base is **MRP ÷ (1 + rate)**: a ₹1,180 item at 18% has a taxable value of ₹1,000 and GST of ₹180. Run quick what-ifs in the [GST calculator](/tools/gst-calculator), and read the rate-wise worked examples in [How to calculate GST from MRP](/blog/gst-on-mrp-inclusive-price-calculation).

Rounding is done on the final invoice value under Section 170, to the nearest rupee, not per line — the generator follows this.

## Mistakes that cost money

- **Wrong tax type.** Charging CGST + SGST on an inter-state sale (or vice versa) means paying the correct tax again and claiming a refund of the wrong one.
- **Duplicate or skipped numbers.** GSTR-1 asks for the invoice series; gaps invite questions. Let the tool number sequentially and never reuse a number after a cancellation — issue a [credit note](/tools/credit-note) instead.
- **Missing buyer GSTIN on B2B sales.** The buyer loses ITC and will push the bill back. Check the 15-character format with [How to verify a GSTIN](/blog/how-to-verify-gstin-number-format).
- **Cash above ₹2 lakh.** Section 269ST bars accepting ₹2 lakh or more in cash from one person in a day, even across several invoices — put the QR on the bill and take UPI. Details in [cash transaction limits](/blog/cash-transaction-limits-income-tax-269st-40a3).

## Related tools

- [Proforma invoice](/tools/proforma-invoice) for quotes and advance requests before the tax invoice.
- [Payment receipt](/tools/payment-receipt) to acknowledge cash, UPI or bank transfers against an invoice.
- [Credit note](/tools/credit-note) and [debit note](/tools/debit-note) to correct an issued invoice under Section 34.
- [Delivery challan](/tools/delivery-challan) when goods move without a sale — job work, branch transfers, approval basis.
- [UPI QR standee](/tools/upi-standee) for a counter QR that works for any amount.

## FAQ

### Is an invoice made with this tool legally valid?

Yes. Validity depends on the content, not the software. The invoice carries every field Rule 46 requires, a unique serial number and the correct tax split. If e-invoicing applies to you (turnover above ₹5 crore), you still need to report it on the IRP to get the IRN and QR — this tool prepares the document; it does not talk to the government portal.

### Do I need a GSTIN to use it?

No. Without a GSTIN it produces a plain bill of supply with no tax columns, which is the correct document for unregistered sellers and composition dealers.

### Will the UPI QR work with every app?

It uses NPCI's standard `upi://pay` link with your VPA, name and the invoice amount, which is what GPay, PhonePe, Paytm, BHIM and bank apps all read. It is a dynamic QR — the amount is fixed to the bill — so customers cannot mistype it.

### Where are my invoices stored?

Nowhere but your device. Business details and the running invoice number sit in your browser's local storage; each invoice is generated on the fly for download. If you need a permanent archive, save the PDFs to Drive or your accounting software.

### Can I edit an invoice after sending it?

Legally you should not alter an issued invoice. If the value or tax changes, issue a credit or debit note referencing the original number; the deadline for credit notes is 30 November of the following financial year or the annual return date, whichever is earlier.
