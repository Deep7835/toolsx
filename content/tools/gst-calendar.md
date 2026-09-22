---
updated: 2026-09-22
---
GST compliance is a calendar problem before it is an accounting problem. GSTR-1 on the 11th, GSTR-3B on the 20th (or the 22nd/24th under QRMP), IFF on the 13th, CMP-08 quarterly, GSTR-4 by 30 June, GSTR-9 by 31 December — and each missed date costs ₹50 a day plus 18% interest on tax. This calendar builds the full FY 2026-27 schedule for **your** filing profile — monthly, QRMP or composition — shows the next deadline at a glance, and exports every date as an `.ics` file for Google or Outlook Calendar.

## The return cycle in one table

| Return | Who | Frequency | Due date |
|---|---|---|---|
| GSTR-1 | Regular taxpayers (monthly) | Monthly | 11th of the next month |
| IFF | QRMP taxpayers wanting to pass ITC monthly | Optional, months 1–2 of a quarter | 13th of the next month |
| GSTR-1 (quarterly) | QRMP taxpayers | Quarterly | 13th of the month after the quarter |
| GSTR-3B | Regular (monthly) | Monthly | 20th of the next month |
| GSTR-3B (QRMP) | Turnover up to ₹5 crore, opted in | Quarterly, with PMT-06 monthly by the 25th | 22nd (southern/western states) or 24th (others) of the month after the quarter |
| CMP-08 | Composition dealers | Quarterly | 18th of the month after the quarter |
| GSTR-4 | Composition dealers | Annual | 30 June following the financial year |
| GSTR-9 / 9C | Turnover above ₹2 crore / ₹5 crore | Annual | 31 December following the financial year |

The calendar applies the state rule for the QRMP 3B date automatically. A narrative walk-through of the year, including the IMS steps between GSTR-1 and 3B, is in [GST due dates FY 2026-27](/blog/gst-filing-calendar-fy-2026-27-due-dates).

## Two rules that changed the stakes

**Hard-locking of GSTR-3B**: the tax liability in 3B is now auto-populated from GSTR-1/IFF and cannot be edited downward; corrections go through GSTR-1A before filing 3B. **The three-year bar**: returns cannot be filed more than three years after their due date, which permanently blocks late filing (and the ITC in it). Both are explained in [GSTR-3B hard-locking and the 3-year filing bar](/blog/gstr-3b-hard-locking-and-3-year-time-bar). Since GSTR-2B is generated from what suppliers file and what you accept in IMS, your own GSTR-1 timing affects your customers' credit too; see [GST IMS explained](/blog/gst-invoice-management-system-ims-explained).

## How to use the calendar

1. Choose your profile: **monthly**, **QRMP** (and your state), or **composition**.
2. Pick the financial year; FY 2026-27 loads by default.
3. Scan the month-wise cards; the next due date is highlighted with the days remaining.
4. Download the `.ics` file and import it into Google Calendar or Outlook — every date becomes an all-day event with a reminder.
5. Re-download if you switch schemes mid-year; QRMP opt-in/opt-out happens quarterly.

## Late fees and interest

- **Late fee**: ₹50 per day (₹25 CGST + ₹25 SGST), or ₹20 per day for nil returns, capped by turnover — ₹500 for nil, ₹2,000 for turnover up to ₹1.5 crore, ₹5,000 up to ₹5 crore, ₹10,000 above, per return.
- **Interest**: 18% per annum on tax paid late, computed on the net cash liability from the due date to the payment date.
- **GSTR-1 not filed** blocks GSTR-3B filing; two consecutive 3Bs unfiled can block e-way bill generation.
- Compute the interest for a late payment with the [late payment interest calculator](/tools/late-payment-interest) in simple-interest mode.

## Practical rhythm for a small business

- **By the 5th**: close the previous month's sales register from your [GST invoices](/tools/gst-invoice); reconcile purchase invoices with GSTR-2B.
- **By the 10th**: file GSTR-1 (or IFF) so your B2B customers see ITC on time.
- **By the 18th**: check IMS actions, compute cash liability, arrange funds.
- **By the 20th**: file 3B and pay. Use the [business days calculator](/tools/business-days) if a due date lands on a Sunday — extensions are not automatic.

## Related tools

- [GST invoice generator](/tools/gst-invoice) — the source of your GSTR-1 data.
- [GST calculator](/tools/gst-calculator) — check liability figures.
- [Late payment interest](/tools/late-payment-interest) — 18% interest on delayed tax.
- [Business days calculator](/tools/business-days) — count working days to a deadline.
- [HSN/SAC finder](/tools/hsn-finder) — HSN summary in GSTR-1 needs correct codes.

## FAQ

### What is the GSTR-3B due date for QRMP taxpayers?

The 22nd of the month after the quarter for Chhattisgarh, MP, Gujarat, Maharashtra, Karnataka, Goa, Kerala, Tamil Nadu, Telangana, Andhra Pradesh and the southern/western UTs; the 24th for the rest of India.

### Is the due date extended if it falls on a Sunday or holiday?

Not automatically. The portal accepts filings on holidays; extensions happen only by notification. File before the weekend.

### What is the late fee for a nil GSTR-3B?

₹20 per day (₹10 CGST + ₹10 SGST), capped at ₹500 per return.

### Can I file a return more than three years late?

No. Since late 2024 the portal blocks returns whose due date is more than three years past, and the ITC in them is lost.

### When is GSTR-4 due for composition dealers?

30 June following the end of the financial year (moved from 30 April for FY 2024-25 onwards). CMP-08 remains quarterly by the 18th.
