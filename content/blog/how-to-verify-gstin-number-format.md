---
title: "How to verify a GST number (GSTIN): the 15-character format, free online check, and spotting fakes"
description: "What each character of a GSTIN means, how to check any GST number on the portal in 30 seconds, why the check digit matters, what a 'suspended' or 'cancelled' status means for your ITC, and how fake GSTINs on invoices are caught."
date: "2026-09-21"
kind: guide
hero: true
tags: [gst, compliance]
tools: [gstin-validator, gst-invoice, barcode-scanner, purchase-order]
---

> Paste any number into the [GSTIN validator](/tools/gstin-validator) to check its format and check digit instantly, and to decode the state, PAN and taxpayer type.

Every B2B invoice you accept carries your supplier's GSTIN, and under the IMS matching system a wrong or fake one means lost input tax credit. "GST number check" is searched hundreds of thousands of times a month because it is the cheapest fraud prevention there is: thirty seconds on the portal.

## Anatomy of a GSTIN

`07 AAAAA0000A 1 Z 5`

| Position | Meaning | Example |
|---|---|---|
| 1–2 | **State code** (census code) | 07 = Delhi, 27 = Maharashtra, 29 = Karnataka, 33 = Tamil Nadu, 36 = Telangana, 09 = UP, 24 = Gujarat, 19 = West Bengal |
| 3–12 | **PAN** of the business | AAAAA0000A |
| 13 | **Entity number** — how many registrations this PAN has in the state (1 = first, 2 = second… then A–Z) | 1 |
| 14 | Always **Z** (reserved) | Z |
| 15 | **Check digit** computed from the first 14 characters | 5 |

So you can read a GSTIN: a Maharashtra GSTIN starts with 27; characters 3–12 tell you the PAN, and the PAN's 4th letter tells you the entity type (P = individual/proprietor, C = company, F = firm, H = HUF, T = trust, A = AOP).

The [GST invoice generator](/tools/gst-invoice) validates the format (state code, PAN pattern, position 14 = Z) as you type, which catches typos before they reach your buyer's IMS.

## Verify on the portal (30 seconds)

1. Go to gst.gov.in → **Search Taxpayer** → *Search by GSTIN/UIN*.
2. Enter the 15 characters and the captcha.
3. You see: legal name, trade name, state, registration date, taxpayer type (regular/composition), **status** (Active / Suspended / Cancelled), and the return-filing table showing whether GSTR-1 and 3B have been filed month by month.

No login needed. The same page has *Search by PAN* (all GSTINs under a PAN) and *Search Composition Taxpayer*.

## What to check before you accept an invoice

- **Status is Active.** A suspended or cancelled supplier's invoices do not give you ITC for the period of suspension/cancellation.
- **Legal name matches** the invoice. Trade names can differ; the legal name must match.
- **Type is Regular**, not Composition — composition dealers cannot charge GST or pass ITC; their invoice must say "composition taxable person, not eligible to collect tax".
- **Returns are being filed.** If GSTR-3B is pending for two or more months, your ITC is at risk (Rule 36(4) and IMS will show the invoice, but the tax may never be paid).
- **State code matches the place of supply** logic on the invoice (CGST/SGST vs IGST).

For new suppliers, put the GSTIN on your [purchase order](/tools/purchase-order) so both sides are checking the same number.

## Fake GSTINs: how they are caught

- **Format fakes** — wrong check digit or position 14 not Z — fail instantly on the portal and in validating software.
- **Real GSTIN, wrong business** — the number belongs to someone else. The legal name on the portal won't match.
- **Shell registrations** — real, active, but created for fake ITC. Signs: registered weeks ago, no returns filed, address is a residential flat with dozens of GSTINs. The department's data analytics flag these; if you claimed ITC from one, expect a notice.
- **Cancelled retrospectively** — the supplier's registration is cancelled from a back date; ITC for that period is reversed for buyers. Check status quarterly for large suppliers.

## Verify other IDs while you're at it

- **PAN**: format `AAAAA9999A`; verify on the income-tax e-filing portal (*Verify Your PAN*).
- **Udyam**: udyamregistration.gov.in → *Verify Udyam Registration Number* — relevant for the 45-day payment rule.
- **IEC**: DGFT portal for exporters.
- **E-invoice QR**: for suppliers above ₹5 crore, scan the invoice QR with the [scanner](/tools/barcode-scanner) — the signed payload includes the IRN and both GSTINs; a missing/invalid QR on a covered supplier's invoice is a red flag.

## FAQ

### Can I find a GST number by company name?
The portal searches by GSTIN or PAN, not name. Ask the supplier for their PAN and use *Search by PAN*, or check the GSTIN printed on their invoice/signboard.

### What does "Suspended" mean?
The registration is temporarily inactive — usually for non-filing or pending cancellation. The taxpayer cannot issue tax invoices during suspension.

### Is there an API for bulk verification?
Yes — GSTN's Search Taxpayer API through GSPs, used by accounting software. For a few checks a month, the portal is enough.

### My own GSTIN shows a wrong trade name. How to fix?
File a non-core amendment (Services → Registration → Amendment of Registration Non-Core Fields). Core-field changes (legal name, principal place) need officer approval.
