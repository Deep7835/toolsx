---
title: "E-invoicing in 2026: the ₹5 crore threshold, the 30-day IRN rule, and what happens if you miss it"
description: "E-invoicing is mandatory for every business with turnover above ₹5 crore in any year since 2017-18. Larger businesses must report invoices within 30 days. Here is who is covered, how the IRN works, and how to comply without new software."
date: "2026-08-14"
updated: "2026-09-02"
kind: trending
tags: [gst, billing, compliance]
tools: [gst-invoice, hsn-finder, gst-calendar]
---

Every year a fresh batch of businesses crosses ₹5 crore and discovers that their invoices are no longer valid without an **IRN** — an Invoice Reference Number issued by a government portal. With GST 2.0 boosting sales volumes and the tax department pushing for a lower threshold, "e-invoice applicability" is a top-searched compliance topic in 2026.

## Who must e-invoice

You are covered if your **aggregate annual turnover (PAN-level, all GSTINs) exceeded ₹5 crore in *any* financial year from 2017-18 onward**. Once covered, always covered — even if turnover later drops.

Exempt regardless of turnover: SEZ units, banks and NBFCs, insurers, GTAs, passenger transport, cinema admissions, and — importantly — **B2C invoices**. E-invoicing applies to B2B supplies, exports, and supplies to SEZ/deemed exports. A **6-digit HSN** is mandatory on e-invoices.

A further reduction to ₹1 crore or ₹2 crore has been discussed repeatedly; nothing is notified as of September 2026, but the direction is clear. Businesses between ₹2–5 crore should be ready.

## How it works

1. You create the invoice in your software with the mandatory schema fields (seller and buyer GSTIN, document number, HSN, taxable value, tax, place of supply, etc.).
2. The JSON is pushed to an **Invoice Registration Portal** (IRP) — NIC or one of the private IRPs.
3. The IRP validates, generates a 64-character **IRN** and a **signed QR code**, and returns them.
4. You print the invoice *with* the IRN and QR. Without them the document is not a valid tax invoice; the buyer cannot claim ITC on it.
5. The data auto-populates your GSTR-1 and, if applicable, Part A of the e-way bill.

## The 30-day reporting rule

Since **1 April 2025**, businesses with turnover of **₹10 crore or more** must upload invoices to the IRP within **30 days of the invoice date**. The portal simply rejects older documents. Miss it and you cannot generate an IRN for that invoice at all — you'd have to cancel and reissue, which means a new invoice date and a mess in your books. Build a weekly upload habit; daily is better.

## What if you issue an invoice without an IRN?

- The invoice is treated as **not issued**. Penalty under Section 122: ₹10,000 per invoice or 100% of tax, whichever is higher, plus ₹25,000 for incorrect invoicing.
- Your buyer's ITC is at risk, which quickly becomes a commercial problem.
- E-way bills cannot be generated without Part A data for covered taxpayers.

## Complying without expensive software

- The government's **free offline utility** and the GePP tool on the e-invoice portal let small covered businesses generate IRNs manually — fine for under 50 invoices a month.
- Most accounting apps (Tally, Zoho, Vyapar, Busy) have built-in IRP integration; enable it and map your HSN masters to 6 digits with the [HSN finder](/tools/hsn-finder).
- For B2C invoices you can continue to use simple templates such as the [GST invoice generator](/tools/gst-invoice); B2C does not need an IRN (a dynamic QR is separately required only for turnover above ₹500 crore).
- Cancel an IRN within **24 hours** if an invoice is wrong; after that, use a credit note.

## Checklist before you cross ₹5 crore

- [ ] Register on the e-invoice portal and enable API/GSP access in your software
- [ ] Convert all product HSNs to 6 digits
- [ ] Verify customer GSTINs — an invalid GSTIN is the most common IRP rejection
- [ ] Decide who uploads and when (daily is safest)
- [ ] Update your invoice format to print IRN, acknowledgment number and QR
- [ ] Add the due dates to your [GST calendar](/tools/gst-calendar)

## FAQ

### My turnover crossed ₹5 crore this year. From when do I e-invoice?
From 1 April of the *next* financial year. Applicability is tested on any previous year's turnover.

### Are exports and SEZ supplies covered?
Yes. Exports (with or without payment of IGST) and supplies to SEZ units require an IRN.

### Do I need an IRN on a delivery challan or proforma invoice?
No. Only tax invoices, credit notes and debit notes for B2B/export supplies are reported.

### Can the 30-day limit be extended?
Not for individual taxpayers. The portal enforces it automatically for those at ₹10 crore and above.
