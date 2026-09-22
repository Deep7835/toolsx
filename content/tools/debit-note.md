---
updated: 2026-09-22
---
A debit note is the GST document for the moments when you charged **too little**: the invoice shows 100 units but you shipped 120, the agreed rate went up after the PO, or a tax rate was wrongly applied at 5% instead of 18%. Instead of cancelling the invoice, Section 34(3) lets the supplier issue a debit note (also called a supplementary invoice) for the difference. This generator creates one that references the original invoice, adds the correct CGST/SGST or IGST on the extra value, and exports as a PDF for the customer and for your GSTR-1.

## When to issue a debit note

- **Under-billing**: quantity, rate or value on the invoice was lower than what was supplied.
- **Price escalation** agreed in the contract — steel, cement, freight surcharges.
- **Wrong tax rate** applied on the original (say 5% instead of 18%), where the tax needs topping up.
- **Additional charges** that arise after invoicing: detention, extra packaging, expedited delivery.
- **Interest on delayed payment**, which is part of the value of supply under Section 15(2)(d) and attracts GST at the rate of the underlying goods or services. Compute the amount with the [late payment interest calculator](/tools/late-payment-interest).

Buyers sometimes issue their own "debit notes" to suppliers for shortages or rejections. Under GST that buyer-side document has no effect on tax; only the **supplier's** credit note reduces the liability. If you are the buyer, ask the seller for a [credit note](/tools/credit-note). The full picture is in [Credit note vs debit note under GST](/blog/credit-note-vs-debit-note).

## Timing and reporting

Unlike credit notes, there is **no outer time limit** on issuing a debit note — the extra tax simply becomes payable in the month you issue it, with interest at 18% per annum from the original due date if the under-billing was your error. Report it in Table 9B of GSTR-1 for the month of issue; the recipient can claim ITC on it up to 30 November of the following financial year (counted from the debit note's own date, since the 2022 amendment).

If your turnover exceeds ₹5 crore, the debit note must be reported to the e-invoice portal for an IRN like any invoice — see [E-invoicing in 2026](/blog/e-invoicing-2026-are-you-covered).

## Mandatory contents (Rule 53)

| Field | Requirement |
|---|---|
| Title "Debit Note" | Along with "Supplementary Invoice" if you prefer |
| Serial number and date | Unique series, up to 16 characters |
| Supplier and recipient details | Names, addresses, GSTINs as on the original |
| Original invoice number and date | May reference several invoices to the same recipient |
| Additional taxable value and tax, per rate | CGST + SGST or IGST, matching the original place of supply |
| Signature | Physical or digital |

## How to use the generator

1. Enter the original invoice number, date and the customer as billed.
2. Add the additional quantity, the rate difference, or the extra charge as line items. For a rate correction, enter the **difference** per unit, not the new full rate.
3. Pick the same tax type as the original invoice; IGST for inter-state.
4. Write the reason — it is not mandatory but makes reconciliation painless for both accounts teams.
5. Download the PDF, share it, and add the note to GSTR-1.

## Practical tips

- **Interest on late payment** is taxable only when actually received. Issue the debit note when the customer pays the interest, not when you claim it.
- **Keep the HSN/SAC** of the original goods on the note so the correct rate is obvious.
- **Freight billed separately** after delivery takes the rate of the goods if it is part of a composite supply; a standalone transport service is 5% or 18% depending on the provider.
- **Match your books**: a debit note raises the receivable; record it in the customer's ledger the same day.

## Related tools

- [Credit note](/tools/credit-note) — the mirror document for over-billing and returns.
- [GST invoice](/tools/gst-invoice) — the original tax invoice.
- [Late payment interest](/tools/late-payment-interest) — MSMED Act interest or contract-rate interest.
- [GST calculator](/tools/gst-calculator) — tax on the extra value.
- [Purchase order](/tools/purchase-order) — for the buyer's side of the paperwork.

## FAQ

### What is the difference between a debit note and a supplementary invoice?

Under GST they are the same document. The Act uses "debit note" and treats a supplementary invoice as one, so either title is acceptable as long as Rule 53 contents are present.

### Is there a time limit for issuing one?

No statutory limit for the supplier. The tax on it is due in the month of issue, plus interest from the original due date if the shortfall arose from an error on your side.

### Can the customer claim ITC on a debit note?

Yes. The recipient claims credit on the additional tax, subject to the 30 November deadline counted from the financial year in which the debit note is dated.

### Should a buyer issue a debit note to a supplier?

Commercially, yes — many companies do for rejections and shortages. For GST purposes only the supplier's credit note counts; the buyer's document is an accounting entry.

### Does interest on delayed payment attract GST?

Yes, at the same rate as the original supply, because Section 15 includes interest or late fees for delayed payment in the value of supply. Issue the debit note when the interest is received.
