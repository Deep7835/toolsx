---
updated: 2026-09-22
---
Every business eventually issues an invoice that turns out to be wrong — a customer returns two of ten cartons, a rate was typed as ₹1,200 instead of ₹1,020, or a post-sale discount is agreed. Under GST you do not cancel or overwrite the original invoice; you issue a **credit note** under Section 34 of the CGST Act. This generator creates a compliant credit note that references the original invoice, reverses the right amount of CGST/SGST or IGST, and exports as a PDF you can send to the customer and attach to your GSTR-1.

## When a credit note is the correct document

Section 34(1) allows a supplier to issue a credit note when the tax invoice shows a **higher** taxable value or tax than what is actually due, or when goods are returned, or when the supply is found deficient. Typical triggers:

- Sales returns, partial or full
- Quantity shortages or damaged goods accepted by you
- Rate corrections downward (overbilling)
- Post-sale discounts that were agreed **before or at the time of supply** and can be linked to specific invoices (Section 15(3)(b))
- Cancellation of a service after invoicing

If the original invoice was **under**-billed, you need the opposite document — a [debit note](/tools/debit-note). The two are compared in [Credit note vs debit note under GST](/blog/credit-note-vs-debit-note).

## The 30 November deadline

A credit note that reduces your GST liability must be declared in the return for the month it was issued, and no later than **30 November following the end of the financial year** of the original supply, or the date of filing the annual return — whichever is earlier. After that you can still issue a commercial credit note to settle accounts, but you cannot reduce the tax already paid. For an invoice dated 10 January 2026 (FY 2025-26), the last return to declare a tax credit note is the October 2026 GSTR-1, filed by 11 November 2026.

Since the Invoice Management System went live, your customer must also **accept** the credit note in IMS for your liability to reduce; if they reject it, the reduction is reversed. The mechanics are in [GST IMS explained](/blog/gst-invoice-management-system-ims-explained).

## Mandatory contents (Rule 53)

| Field | Note |
|---|---|
| "Credit Note" title and a unique serial number (≤16 characters) | Separate series from invoices |
| Date of issue | Determines the return period |
| Your name, address, GSTIN | Same as the original invoice |
| Recipient name, address, GSTIN | Must match the original B2B invoice |
| Original invoice number(s) and date(s) | One note can cover several invoices to the same recipient |
| Taxable value and tax being reduced, per rate | CGST/SGST or IGST as on the original |
| Signature | Physical or digital |

The generator carries all of these and computes the tax reversal per line, so a return of 2 units at ₹500 + 18% shows a reduction of ₹1,000 taxable and ₹180 tax.

## How to use it

1. Enter the original invoice number, date and the customer exactly as billed.
2. Add the items or amounts being credited — quantity returned, or the difference in rate.
3. Choose the same tax type (intra- or inter-state) as the original invoice; the tool splits CGST/SGST or IGST accordingly.
4. State the reason (return, shortage, discount, cancellation) — it goes on the document and helps at audit.
5. Download the PDF. Report the note in Table 9B of GSTR-1 for the month.

## Common mistakes

- **Issuing a fresh invoice with a minus sign.** Not valid; a negative invoice is not a document under the Act.
- **Missing the original invoice reference.** Without it the note cannot be matched to your outward supplies.
- **Reducing tax after the deadline.** Issue a commercial (financial) credit note without GST instead and let the customer reverse their ITC.
- **Using a credit note for bad debts.** Non-payment is not a ground under Section 34; GST paid on unpaid invoices is not refundable this way.
- **Issuing it to consumers without records.** B2C credit notes are reported net in GSTR-1; keep the register anyway.

## Related tools

- [Debit note](/tools/debit-note) — for under-billing and price increases.
- [GST invoice](/tools/gst-invoice) — the original document.
- [Payment receipt](/tools/payment-receipt) — record the refund or adjustment.
- [GST calculator](/tools/gst-calculator) — check the tax on the reversed value.
- [GST filing calendar](/tools/gst-calendar) — the GSTR-1 dates for reporting.

## FAQ

### Can one credit note cover multiple invoices?

Yes. Since 2019 a single credit note may relate to several tax invoices issued to the same recipient in the same financial year. List each invoice number and date on the note.

### Does the customer have to reverse ITC?

Yes. When your credit note reduces tax, the recipient must reduce their input tax credit by the same amount. In IMS they do this by accepting the note.

### What about a discount decided after the sale?

If the discount was not agreed before supply and cannot be linked to invoices, it cannot reduce GST. Issue a commercial credit note for the amount without tax; the GST already paid stays.

### Do I need the customer's signature?

No. Only the supplier signs. Send it to the customer and keep a copy for your records for at least 72 months from the annual return due date.

### Can I issue a credit note for an e-invoice?

Yes, and if you are covered by e-invoicing (turnover above ₹5 crore) the credit note itself must be reported on the IRP to obtain an IRN.
