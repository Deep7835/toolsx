---
title: "HSN and SAC codes explained: how to find yours, how many digits you need, and what happens if it's wrong"
description: "What HSN/SAC codes are, the 4/6/8-digit rules by turnover, how to read a code, where to look them up after GST 2.0, and the penalty for mistakes — with the most common codes for retail and services."
date: "2026-01-12"
updated: "2026-09-16"
kind: guide
hero: true
tags: [gst, billing]
tools: [hsn-finder, gst-invoice, gst-calculator]
---

Every GST invoice needs a code that tells the tax system *what* you sold. **HSN** (Harmonised System of Nomenclature) classifies goods; **SAC** (Services Accounting Code) classifies services. Get the code right and the rate follows; get it wrong and you under- or over-pay, and your buyer's ITC is questioned.

## How many digits

| Aggregate turnover (previous FY) | B2B invoices | B2C invoices |
|---|---|---|
| Up to ₹5 crore | **4 digits** mandatory | Optional |
| Above ₹5 crore | **6 digits** mandatory | 6 digits |
| Exports / imports | **8 digits** | — |

GSTR-1 Table 12 must match — 4 digits for ≤ ₹5 crore, 6 digits above. The portal now validates HSN entries against its master and rejects invalid codes.

## Reading an HSN code

Take **1006 30 10** (basmati rice):

- **10** — chapter (cereals)
- **1006** — heading (rice)
- **1006 30** — sub-heading (semi-milled or wholly milled rice)
- **1006 30 10** — tariff item (basmati)

SAC codes are 6 digits starting with **99**: **9983 14** = IT design and development services; **9963 11** = room accommodation.

## After GST 2.0

The rate rationalisation in September 2025 changed the *rates* attached to codes, not the codes themselves. Your HSN for shampoo (3305) is unchanged; its rate went from 18% to 5%. Re-map rates in your software; don't re-map codes. The [HSN finder](/tools/hsn-finder) shows both the code and the current rate.

## Common codes for small business

| Item | Code | Rate |
|---|---|---|
| Restaurant service | 9963 | 5% |
| Salon / beauty | 9997 | 5% |
| Consulting / IT services | 9983 | 18% |
| Accounting / legal | 9982 | 18% |
| Courier | 9965 | 18% |
| Garments ≤ ₹2,500 | 61/62xx | 5% |
| Mobile phones | 8517 | 18% |
| Laptops | 8471 | 18% |
| Cement | 2523 | 18% |
| Rice (branded, packed) | 1006 | 5% |
| Medicines | 3004 | 5% |
| Furniture | 9403 | 18% |

## Where to look codes up

1. The [HSN/SAC finder](/tools/hsn-finder) — search by product name.
2. The GST portal's "Search HSN" tool (Services → User Services).
3. The CBIC tariff for edge cases and 8-digit export codes.
4. Your supplier's invoice — for resold goods, use the same HSN.

## Composite and mixed supplies

- **Composite supply** (naturally bundled, one principal item — e.g. a laptop with a charger): use the principal item's HSN and rate.
- **Mixed supply** (a gift hamper of unrelated items sold for one price): the highest rate among the items applies.

## Penalties for wrong codes

- General penalty up to **₹25,000** per return for incorrect or missing HSN (Section 125).
- If the wrong code led to short payment, the tax difference plus interest and penalty under Section 73/74.
- Buyers may reject invoices in IMS if the code makes the rate look wrong.

Honest classification disputes (is a "paratha" bread at 0% or a "ready-to-eat" item at 5%?) go to Advance Ruling; for everyday items, follow the supplier's classification and the CBIC circulars.

## FAQ

### Do I need HSN codes on B2C bills?
Not if turnover is ≤ ₹5 crore. Above that, 6 digits are mandatory on all invoices.

### Can I use 8 digits even if 4 are required?
Yes. More digits are always acceptable; fewer are not.

### Is HSN the same worldwide?
The first 6 digits are international (WCO). India adds 2 more for tariff items.

### What HSN do I use for a service + goods package like AMC with parts?
It's usually a composite supply of service; use the service SAC (e.g. 9987 for repair) with the parts listed under it.
