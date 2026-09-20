---
title: "GSTR-3B hard-locking and the 3-year filing bar: two rules that changed how you file"
description: "Since the July 2025 tax period, the liability in GSTR-3B is auto-filled and non-editable, and returns older than three years cannot be filed at all. What it means for late filers and how to correct mistakes now."
date: "2026-08-20"
updated: "2026-09-10"
kind: trending
tags: [gst, compliance]
tools: [gst-calendar, gst-invoice, credit-note]
---

Two GST portal changes rolled out together in 2025 and are still catching businesses out a year later. Search interest for "GSTR-3B not editable" and "GST return time barred" doubled after each quarter-end. Here is what changed and how to work with it.

## Rule 1: GSTR-3B liability is locked from GSTR-1

From the **July 2025 tax period** (filed in August 2025), the outward-supply tax figures in Table 3 of GSTR-3B are **auto-populated from GSTR-1/IFF and cannot be edited**. Previously you could type any number in 3B; the portal merely flagged a mismatch.

**Why:** thousands of taxpayers reported higher sales in GSTR-1 (so buyers got ITC) and lower tax in 3B. Locking closes that gap.

**What to do if GSTR-1 was wrong:**
- Use **GSTR-1A** — the amendment window that opens after you file GSTR-1 and stays open until you file 3B for the same period. Add missed invoices, correct values, or amend earlier periods there. The corrected figures then flow into 3B.
- For errors discovered *after* filing 3B, amend in the **next period's GSTR-1** (Table 9/10) as before. The tax difference reflects in that later 3B.
- Credit and debit notes remain the right way to change values on issued invoices — generate them with the [credit note tool](/tools/credit-note) and report them in GSTR-1.

**ITC is still editable.** Table 4 (input tax credit) continues to be auto-drafted from GSTR-2B but can be adjusted, subject to the IMS rules explained in [our IMS guide](/blog/gst-invoice-management-system-ims-explained).

## Rule 2: Returns cannot be filed after three years

Under Section 37/39/44/52 amendments effective **1 July 2025**, the portal blocks filing of any GSTR-1, 3B, 4, 5, 6, 7, 8 or 9 once **three years have passed from its due date**. In July 2025 this meant returns for periods up to June 2022 were permanently barred; every month, another period drops off.

**Consequences of a barred return:**
- The liability does not disappear. The department can still assess it under Section 73/74 with interest and penalty.
- Buyers who claimed ITC on your unfiled invoices face reversal.
- Your registration is likely already suspended or cancelled for non-filing.

**If you have old unfiled returns:** file everything that is still within the window immediately, oldest first. Late fee is capped (₹500 per return for nil, ₹2,000 for others under the amnesty caps for older periods, ₹50/day otherwise) but interest at 18% runs on unpaid tax.

## A monthly routine that avoids both traps

| When | Do |
|---|---|
| By the 5th | Reconcile sales register with invoices issued; raise credit notes for returns |
| By the 11th | File GSTR-1 (monthly) — this now *is* your 3B liability |
| 12th–19th | Check GSTR-1A for any corrections; act on IMS to fix GSTR-2B |
| By the 20th | File GSTR-3B and pay |
| Quarterly | Compare books vs portal for the quarter; investigate any variance above ₹1,000 |

Put every due date in your calendar with the [GST filing calendar](/tools/gst-calendar) — it exports an `.ics` with 3-day reminders.

## FAQ

### I filed GSTR-1 with a wrong invoice value. Can I fix it in 3B?
No. Amend it in GSTR-1A before filing 3B for that month, or in the next month's GSTR-1. The 3B figure follows GSTR-1.

### Is the 3-year bar applied from the original due date or the extended one?
From the due date as notified for that period (including any general extension notified at the time).

### Does hard-locking apply to QRMP quarterly filers?
Yes — the quarterly GSTR-3B is auto-populated from the quarter's GSTR-1 and IFF filings and is non-editable in the same way.

### Can I still claim ITC for an old period after three years?
ITC is separately time-barred: it must be claimed by 30 November following the financial year of the invoice (or the annual return, whichever is earlier). Old ITC is lost regardless of the return bar.
