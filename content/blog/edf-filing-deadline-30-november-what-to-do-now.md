---
title: "Your first EDF is due on 30 November: a one-evening setup for exporters who have never filed one"
seoTitle: "First EDF due 30 November: a setup checklist"
description: "October invoices on foreign clients must be declared to your bank by 30 November 2026. What to ask your AD bank, the six fields that hold filings up, how to handle invoices you raised before the rule started, and a free tool that tracks every deadline."
seoDescription: "October export invoices must be declared by 30 November 2026. What to ask your bank, the fields that hold filings up, and a free deadline tracker."
date: "2026-10-02"
updated: "2026-10-02"
kind: trending
tags: [compliance, freelancing, finance, msme]
tools: [edf-filing, hsn-finder, currency-converter, gst-invoice, business-days]
---

The rule started on 1 October. The first deadline is **30 November 2026**, and almost nobody who needs to file has done it before, because until last month services exporters had no routine declaration to make at all.

If you raised even one invoice on a foreign client in October — a retainer, a milestone, a SaaS subscription, a single consulting day — this is the short version of what to do, and most of it can be done in an evening. The background on the regulation itself is in [EDF filing is now compulsory for service exporters](/blog/edf-filing-service-exporters-october-2026); this is the operational list.

## Step 1: Find out how your bank wants it (today)

There is no single national portal for a services EDF. Your Authorised Dealer bank decides the channel, and in the first weeks the practice is genuinely inconsistent — some banks have a trade-services portal screen, some want a signed PDF emailed to a trade desk, some still want a branch visit.

Ask your relationship manager four questions and write the answers down:

1. Which channel — portal, email template, or branch?
2. Will you accept **one consolidated EDF per month**, or do you want one per invoice?
3. What supporting documents do you want with it — invoices, contract, SOW?
4. What do you charge, per filing and for the eBRC?

That fourth question matters. The RBI told banks in **A.P. (DIR Series) Circular No. 12 of 1 October 2025** to review charges in line with the simplified process and barred penal charges for delays caused by the bank. Quote it if the number sounds invented.

Software exporters have a choice the others do not: your AD bank **or** STPI can certify. If you are already registered with STPI and the process works, stay there; if you are not, the bank route now exists and is usually simpler.

## Step 2: Build the invoice list

Everything you need is on the invoices themselves. For each October invoice:

| Field | Where it trips people up |
|---|---|
| Invoice number and date | The date decides both deadlines — use the invoice date, not the payment date |
| Client name, address, country | Must match the contract and the remittance details |
| Currency and amount | As invoiced |
| **INR value** | Use the RBI reference rate **for the invoice date**, not today's — the [currency converter](/tools/currency-converter) shows both |
| **SAC code** | Six digits, and identical to the one on your invoice — find it in the [HSN/SAC finder](/tools/hsn-finder) |
| PAN | Mandatory. IEC and GSTIN are usually optional for services |

The two that hold up filings are the SAC code and the exchange rate. A consulting engagement billed under 9983 on the invoice and declared as 9984 on the EDF gets queried; so does a rupee value computed at the rate on the day you filled the form.

## Step 3: Work out the two deadlines per invoice

- **Filing**: 30 days from the **end of the invoice month**. Every October invoice, whether dated the 2nd or the 31st, is due **30 November 2026**.
- **Realisation**: nine months from **each invoice's own date** — so 2 October 2026 means the money must be in by 2 July 2027. Twelve months if you invoiced in rupees.

The [EDF filing helper](/tools/edf-filing) does both for a whole invoice list, flags anything dated before 1 October, marks which invoices fall under the ₹10 lakh self-declaration route, and exports a CSV you can send with the filing. It stores everything in your browser, not on a server.

## Step 4: Decide what to do about September and earlier

Nothing. The obligation attaches to invoices **dated on or after 1 October 2026**, regardless of when the money arrives. A 28 September invoice paid in January stays under the earlier framework — software exporters' SOFTEX position for those months is unchanged, and non-software services had no declaration requirement at all.

Do not file an EDF for them "to be safe". You will create an EDPMS entry that then has to be closed.

## Step 5: Set up the monthly rhythm

- **1st of every month**: export last month's invoice list.
- **By the 10th**: send the EDF to the bank — well inside the 30-day window, and early enough that a query still leaves you time.
- **When payment lands**: get the FIRA for anything above ₹10 lakh; for ₹10 lakh and under your bank can close the EDPMS entry on your own declaration, and may accept those declarations quarterly in one consolidated format.
- **After closure**: collect the **eBRC**. This is the document that unblocks a GST refund on zero-rated exports, so do not let it drift.
- **Quarterly**: reconcile — every invoice should be either closed or inside its nine months.

Put the dates next to your GST ones so compliance happens on a single day each month; the [business days calculator](/tools/business-days) will tell you where 30 November falls against a weekend, and the [GST filing calendar](/tools/gst-calendar) covers the rest of the month.

## What happens if you simply do not file

Not much, immediately — which is the problem. The invoice sits as an open EDPMS entry against your PAN; the remittance arrives and cannot be matched; no eBRC is issued, so a GST refund claim stalls; and persistent overdue entries can lead to caution-listing, after which further exports need prior bank approval. Contraventions are punishable under **Section 13 of FEMA** — up to three times the amount involved where quantifiable, or up to ₹2 lakh where not, plus ₹5,000 a day while it continues — and can be compounded under Section 15, which costs money and time.

For a freelancer with four invoices a month, filing takes fifteen minutes. The unwinding, two years later, does not.

## FAQ

### When is my first EDF due?

30 November 2026, for any invoice raised on a foreign client during October 2026.

### Can I file one form for the whole month?

Most banks accept a single consolidated EDF covering a month's invoices, but confirm with yours — practice varies in these first weeks.

### Which exchange rate do I use?

The RBI reference rate for the invoice date, not the rate on the day you file or the day the money arrives.

### Do I need an IEC for service exports?

Generally no. PAN is the mandatory identifier for services; IEC and GSTIN are usually optional on the services EDF, though some banks ask for them if you have them.

### What if I raised the invoice in September but get paid in December?

No EDF. The requirement applies to invoices dated on or after 1 October 2026, whatever the payment date.

### Who files if I am in an SEZ?

The Development Commissioner of the SEZ, rather than your AD bank.
