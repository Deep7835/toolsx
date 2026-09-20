---
title: "Credit note vs debit note under GST: when to issue which, with formats and the 30 November rule"
description: "Sales return, discount after sale, short supply, price correction — which document fixes it, who issues it, how it flows through GSTR-1 and IMS, the time limit, and the two mistakes that get ITC reversed."
date: "2026-02-11"
updated: "2026-09-09"
kind: guide
hero: true
tags: [gst, billing]
tools: [credit-note, debit-note, gst-invoice]
---

Once a tax invoice is issued, you cannot edit it. Every change — a return, a discount, a mistake in quantity or price — is made with a **credit note** or a **debit note** under Section 34 of the CGST Act. Confusing the two is the most common billing error in small businesses.

## The one-line rule

- **Credit note**: the supplier *reduces* what the buyer owes (and reduces the supplier's tax liability).
- **Debit note**: the supplier *increases* what the buyer owes (and increases tax liability).

Both are issued by the **supplier**. A buyer who wants to return goods asks the supplier for a credit note; a buyer's own "debit note" is an accounting memo, not a GST document (though in practice buyers send them to trigger the supplier's credit note).

## When to issue which

| Situation | Document |
|---|---|
| Customer returns goods | Credit note |
| Post-sale discount agreed in advance | Credit note (with GST) |
| Goods found deficient / short delivered | Credit note |
| Invoice value or tax charged too high by mistake | Credit note |
| Price increase after invoice (contract escalation) | Debit note |
| Invoice value or tax charged too low | Debit note |
| Extra goods delivered against the same order | Debit note (or a fresh invoice) |

Generate them with the [credit note](/tools/credit-note) and [debit note](/tools/debit-note) tools — both reference the original invoice and compute the GST reversal.

## Mandatory contents (Rule 53)

Supplier name/address/GSTIN; document type; a unique consecutive number; date; recipient's details; **the original invoice number and date**; taxable value and tax being adjusted; and signature. One credit note can cover multiple invoices of the same financial year (since 2019).

## How it flows through GST

1. The supplier reports the note in **GSTR-1** (Table 9B) for the month it is issued.
2. It appears in the buyer's **IMS**. The buyer must **accept** the credit note — the ITC reduction is tied to acceptance under the 2025 IMS rules.
3. The supplier's liability reduces in GSTR-3B; the buyer's ITC reduces in GSTR-2B.

If the buyer rejects a genuine credit note, the supplier's tax stays high and the buyer has excess ITC — sort it out before the 3B deadline. See the [IMS guide](/blog/gst-invoice-management-system-ims-explained).

## The time limit

A credit note reducing tax must be declared by **30 November following the financial year** of the original invoice, or the date of filing the annual return, whichever is earlier. Miss it and you can still issue a *commercial* credit note (without GST) to adjust the price, but you cannot reduce your GST liability.

Debit notes have no such limit — the tax must be paid whenever the note is issued, with interest from the original due date if it corrects an under-charge.

## Discounts: with or without GST?

- Discount known **before or at** supply and shown on the invoice: reduces taxable value directly.
- Post-sale discount **agreed in advance** (in a contract or scheme) and linked to specific invoices: credit note **with GST**; the buyer reverses proportionate ITC.
- Post-sale discount **not agreed in advance** (goodwill, year-end incentive): **commercial credit note without GST**; no change to tax on either side.

## Two mistakes that get ITC reversed

1. **Issuing a fresh negative invoice** instead of a credit note. Invoices cannot be negative; the portal rejects them and the buyer's ITC is stranded.
2. **Not linking the original invoice.** A credit note without the invoice reference is invalid, and IMS cannot match it.

## FAQ

### Can I cancel an invoice instead of issuing a credit note?
Only if it was never acted upon and, for e-invoices, within 24 hours of IRN generation. Otherwise, use a credit note.

### Does a credit note need the buyer's signature?
No. It is a unilateral document from the supplier, reported in GSTR-1.

### Can a credit note be issued for a B2C sale?
Yes. Report it under the B2C tables in GSTR-1 (net of the adjustment), without the buyer's GSTIN.

### What about a sales return by a composition dealer?
Composition dealers issue credit notes as well; they are reported in CMP-08/GSTR-4 as reductions in turnover.
