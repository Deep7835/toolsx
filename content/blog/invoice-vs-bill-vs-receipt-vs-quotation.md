---
title: "Invoice vs bill vs receipt vs quotation: what each document does and when to issue it"
description: "The four documents every business handles, explained with GST context — which one records a sale, which proves payment, which is a price offer, and which is a 'bill of supply'. With a decision table and the mandatory contents of each."
date: "2026-09-21"
kind: guide
hero: true
tags: [billing, gst]
tools: [gst-invoice, payment-receipt, service-quote, proforma-invoice]
---

Customers ask for a "bill", accountants ask for the "invoice", the bank wants a "receipt", and the client wanted a "quotation" first. They are four different documents with four different legal jobs, and using the wrong one causes real problems — from GST notices to unpaid dues you cannot enforce.

## One-line definitions

| Document | Issued by | When | Legal effect |
|---|---|---|---|
| **Quotation / estimate** | Seller | *Before* the sale | An offer of price; no obligation until accepted |
| **Proforma invoice** | Seller | After acceptance, before supply | A request for advance / confirmation; not a tax document |
| **Invoice (tax invoice)** | Seller | At/after supply | Records the sale, creates the debt, carries GST, enables buyer's ITC |
| **Bill of supply** | Seller (composition / exempt) | At supply | Same as invoice but with **no GST** shown |
| **Receipt** | Seller (or anyone receiving money) | When payment is received | Proof of payment; discharges the debt |
| **Delivery challan** | Seller | Movement without sale | Proof of dispatch; not a sale |

"Bill" in everyday Indian usage means the invoice — and in GST law a "bill of supply" specifically means the non-tax version.

## Quotation

A quotation says "we can do X for ₹Y, valid until Z". Include scope, itemised prices, taxes (or "plus GST"), validity, payment terms and exclusions. Once the client accepts in writing, it becomes a contract. The [quotation builder](/tools/service-quote) produces one with scope-of-work and timeline fields; for goods, the same format works. Full guide: [how to write a quotation](/blog/quotation-format-how-to-write-a-quotation).

## Proforma invoice

Looks like an invoice, says "proforma", and is used to request advance payment or for the buyer's internal approval/import formalities. It has **no GST consequence**: no liability for you, no ITC for the buyer. Issue the real invoice on supply. Tool: [proforma invoice](/tools/proforma-invoice).

## Invoice

The invoice is the document that matters legally:

- Creates the **receivable** — the buyer owes you.
- Under GST, the **tax invoice** must be issued at supply (goods) or within 30 days (services) with the [16 mandatory fields](/blog/gst-invoice-format-mandatory-fields).
- Reported in GSTR-1; appears in the buyer's IMS; gives them ITC.
- For MSE suppliers, the invoice/acceptance date starts the [45-day payment clock](/blog/section-43b-h-45-day-payment-rule).

Composition dealers and suppliers of exempt goods issue a **bill of supply** instead, stating that GST is not charged. Tool: [GST invoice generator](/tools/gst-invoice) (switch off tax for a bill of supply).

## Receipt

A receipt proves money was received: date, amount, mode (UPI/cash/cheque with number), what it is against (invoice number), balance due if any, and signature. Under GST, advance receipts need a **receipt voucher**; regular payments against an invoice need a plain receipt. Customers keep receipts for warranty and returns; you keep them for reconciliation. Tool: [payment receipt](/tools/payment-receipt) with A4 and thermal layouts and a "part paid" stamp.

## Decision guide

- Customer asks for a price → **quotation**
- Customer says yes, you want money up front → **proforma invoice** (then receipt voucher when the advance arrives)
- You deliver / complete the service → **tax invoice** (or bill of supply)
- Customer pays → **receipt**, referencing the invoice
- Customer returns goods → **credit note** against the invoice ([guide](/blog/credit-note-vs-debit-note))
- Goods move to your own godown or a job worker → **delivery challan**

## Why mixing them up hurts

- Sending a **quotation** as an "invoice" and reporting it in GSTR-1 creates tax liability for a sale that never happened.
- Treating a **proforma** as final means no GST-valid document exists; the buyer's ITC is denied.
- Issuing a **receipt** without an invoice leaves no record of what was sold — a problem in disputes and audits.
- A **bill of supply** that shows GST (from a composition dealer) is an offence: the tax collected must be deposited and cannot be passed as ITC.

## FAQ

### Is a "cash memo" an invoice?
A cash memo is a retail invoice-cum-receipt for over-the-counter sales. For GST it must still carry the mandatory fields (B2C invoices under ₹200 can be consolidated daily).

### Can an invoice and receipt be one document?
For cash sales, yes — mark it "paid" with the mode and date. For credit sales, keep them separate so the receivable is tracked.

### Do freelancers need to issue invoices?
Yes — for every payment received, even without GST registration. It is your proof of income and the client's proof of expense.

### Is an emailed PDF invoice valid?
Yes. A digitally generated invoice with the mandatory fields and a signature (or DSC/IRN where applicable) is valid; keep copies for six years.
