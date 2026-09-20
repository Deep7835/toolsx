---
title: "GST IMS explained: accept, reject or keep pending — and how it decides your ITC"
description: "The Invoice Management System on the GST portal now sits between your supplier's GSTR-1 and your GSTR-2B. A plain guide to what each action does, common mistakes, and a 15-minute monthly routine."
date: "2026-09-08"
kind: trending
tags: [gst, compliance]
tools: [gst-calendar, purchase-order, gst-invoice]
---

The **Invoice Management System (IMS)** went live on the GST portal in October 2024, became decisive for input tax credit in 2025, and by 2026 is the single most common source of "why is my ITC less than my purchase register?" questions. If you buy from GST-registered suppliers, you need to know it.

## What IMS is

When a supplier files GSTR-1 (or IFF), each invoice, credit note and debit note they report against your GSTIN appears in **your IMS dashboard**. For each document you can:

| Action | Effect on your GSTR-2B (and therefore ITC) |
|---|---|
| **Accept** | Included in GSTR-2B; ITC flows to your GSTR-3B |
| **Reject** | Excluded; the supplier sees the rejection and must amend |
| **Pending** | Held for a later month; not in this month's 2B (not allowed for some documents, e.g. certain credit notes) |
| **No action** | Treated as *deemed accepted* when 2B is generated on the 14th |

GSTR-2B is generated on the **14th** of the following month from whatever state IMS is in. You can act until you file GSTR-3B, then regenerate 2B.

## Why it matters more than it looks

1. **Deemed acceptance is dangerous.** If a supplier uploads a fake or wrong invoice against your GSTIN and you ignore IMS, it lands in your ITC. Later scrutiny can reverse it with interest.
2. **Credit notes flip liability.** When a supplier issues you a credit note, accepting it *reduces* your ITC. Rejecting a genuine credit note means the supplier's liability isn't reduced and you have over-claimed — a mess for both sides. Since the October 2025 changes, you can keep certain credit notes pending and the ITC reversal is tied to your acceptance, which makes timing important.
3. **Pending is not forever.** Documents can be kept pending only until the ITC time limit (30 November after the financial year). After that they lapse.

## A 15-minute monthly routine

1. **Between the 12th and 14th**, open IMS. Filter "No action".
2. **Match to your purchase register** — invoice number, date, taxable value, tax. Purchase orders help here: if you issue POs with the [PO generator](/tools/purchase-order), matching is a two-column check.
3. **Accept** everything that matches.
4. **Reject** anything you never received, duplicates, or invoices meant for another GSTIN (common with group companies).
5. **Pending** genuine invoices where goods are in transit or the invoice is disputed — but note the deadline.
6. **Regenerate GSTR-2B** if you acted after the 14th, then file 3B.

## Common mistakes

- **Accepting everything blindly.** It defeats the purpose and exposes you to ITC reversal on fake invoices.
- **Rejecting to "save time"** when an amount is slightly off. Rejection kicks the invoice back to the supplier; if they don't amend, you lose the ITC. Better: accept and ask for a debit/credit note.
- **Ignoring supplier-side amendments.** An amended invoice appears again in IMS as a fresh entry; the original is replaced.
- **Forgetting QRMP.** Quarterly filers still see monthly IMS entries and must act before the quarterly 2B.

## What suppliers should know

Your buyers now see every document you upload and can reject it. Get invoices right first time — correct GSTIN, correct place of supply, correct HSN — because a rejected invoice delays their ITC and your payment. The [GST invoice generator](/tools/gst-invoice) validates GSTIN length and separates CGST/SGST from IGST automatically.

## FAQ

### If I take no action in IMS, do I lose ITC?
No — untouched invoices are deemed accepted and flow into GSTR-2B. The risk is the opposite: accepting bad invoices by default.

### Can I change an action after GSTR-2B is generated?
Yes, until you file GSTR-3B for that period. Change the action and click "Compute GSTR-2B" to regenerate.

### Do I have to act on every single invoice?
No. Deemed acceptance handles the routine ones. Focus on mismatches, credit notes and unknown suppliers.

### Is IMS mandatory for composition dealers?
Composition dealers don't claim ITC, so IMS is informational for them. Their suppliers' invoices still appear.
