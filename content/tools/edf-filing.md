---
updated: 2026-10-02
---
Since **1 October 2026** every invoice an Indian business raises on a foreign client has two clocks running against it: thirty days to declare it to your bank on an **Export Declaration Form**, and nine months to get the money in. Miss either and the entry sits open in the RBI's EDPMS against your PAN, no eBRC is issued, and your GST refund on zero-rated exports stalls behind it. This tool keeps both clocks visible: enter your export invoices once, and it works out every filing date, every realisation deadline, which invoices can be closed on a self-declaration, and produces a summary you can hand to your AD bank.

## What it calculates

| Output | Rule behind it |
|---|---|
| **EDF due date** | 30 days from the end of the month in which the invoice was raised — Regulation 3(2) of FEMA 23(R)/2026-RB |
| **Realisation deadline** | Nine months from the invoice date; twelve months where the invoice is in rupees — Regulation 5(1) |
| **Filing authority** | Your AD bank for services; AD bank *or* STPI for software; the Development Commissioner for SEZ units — Regulation 2(f) |
| **Closure route** | Entries of ₹10 lakh or less can be closed on your own declaration; above that your bank will want the FIRA |
| **Pre-rule invoices** | Anything dated before 1 October 2026 is flagged and excluded — the old framework applies |

Days remaining are counted from today, so overdue filings turn red and anything due inside a week turns amber.

## How to use it

1. **Set up once.** Your name, PAN, IEC (optional for services), AD bank and AD code. Say whether you export software or other services, and whether you are in the domestic tariff area or an SEZ — the tool then names the authority you file with. Everything is stored in your browser, not on a server.
2. **Add each export invoice**: number, date, client, country, currency, amount and SAC code. Use the [HSN/SAC finder](/tools/hsn-finder) if you are unsure of the code, and keep it identical to the one on the invoice itself.
3. **Enter the exchange rate** for foreign-currency invoices — the RBI reference rate for the invoice date. The [currency converter](/tools/currency-converter) shows the day's rate and what your bank's margin costs you.
4. **Read the schedule.** The month-wise panel shows one line per invoice month with its filing date, which is what most banks want: a single EDF covering that month's invoices.
5. **Export.** Download the CSV for your bank, or print the summary for your file. Re-open the tool next month and the rows are still there.

## The deadlines, concretely

For invoices raised anywhere in **October 2026**, the EDF is due by **30 November 2026**. November invoices are due by 30 December. The clock starts at month-end, not at the invoice date, so an invoice on the 2nd and one on the 31st of the same month share a deadline.

The realisation clock, though, runs from each invoice's own date. A $2,500 invoice dated 2 October 2026 must be realised by **2 July 2027**. Bill the same client in rupees and you get until 2 October 2027. Project exports follow the payment terms of the contract instead.

## Who this is for

Freelancers and consultants with overseas clients, design and marketing agencies, IT and ITeS companies, SaaS businesses billing abroad, GCCs and captive centres — anyone whose invoices leave India. Software exporters: the unified EDF replaced SOFTEX for exports on or after 1 October 2026, and an AD bank can now certify it, so STPI is an option rather than a requirement. The full background is in [EDF filing is now compulsory for service exporters](/blog/edf-filing-service-exporters-october-2026).

## What the tool does not do

It does not file anything for you — EDFs go to your bank through its own portal, email template or branch form, and practice still varies between banks. It also cannot tell you whether a payment has been matched in EDPMS; only your bank sees that. Treat the output as your filing checklist and your record, and ask your relationship manager once how they want the monthly declaration.

## Keeping the rest of the paperwork straight

Export invoices themselves still need the usual contents — raise them with the [GST invoice generator](/tools/gst-invoice), which handles zero-rated exports under an LUT, and request advances on a [proforma invoice](/tools/proforma-invoice). Price the work so the bank's conversion margin and your compliance time are covered using the [freelance rate calculator](/tools/freelance-rate). The tax side — 44ADA, GST registration at ₹20 lakh, the LUT — is covered in [Freelancer taxes in India](/blog/freelancer-taxes-india-44ada-gst).

## Related tools

- [GST invoice generator](/tools/gst-invoice) — zero-rated export invoices with bank details.
- [Currency converter](/tools/currency-converter) — the INR value for each invoice, and what the bank's margin costs.
- [Business days calculator](/tools/business-days) — count working days to a filing date.
- [Freelance rate calculator](/tools/freelance-rate) — price export work with compliance built in.
- [Late payment interest](/tools/late-payment-interest) — when a foreign client drifts past the nine-month mark.

## FAQ

### When is the EDF due?

Within 30 days from the end of the month in which the invoice was raised. Invoices from October 2026 are due by 30 November 2026.

### Is the data I enter uploaded anywhere?

No. Your exporter details and invoice rows are saved in your browser's local storage on this device. Export the CSV if you want a backup.

### Does this file the EDF with my bank?

No. It calculates the deadlines and produces the summary; the declaration itself goes to your AD bank (or STPI, or the SEZ Development Commissioner) through whatever channel they use.

### How does it decide the realisation date?

Nine months from the invoice date, or twelve months if the invoice currency is INR, per Regulation 5(1). Where a month has no matching date — a 31st rolling into a 30-day month — it uses that month's last day.

### What about invoices raised before 1 October 2026?

They are flagged and left out of the totals. The declaration requirement applies to invoices dated on or after 1 October 2026, regardless of when the payment arrives.
