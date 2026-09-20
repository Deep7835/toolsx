---
title: "UPI MDR starts 15 October: what the NPCI circular actually says, who is exempt, and the flat ₹5 for fuel"
description: "The 15 September circular fixed the details — 0.4% on person-to-merchant payments above ₹2,000, capped at ₹300, zero for merchants receiving up to ₹1 lakh a month, flat ₹5 for fuel, railways and telecom, 18% GST with input credit. Plus: petrol pumps threatening to refuse UPI, and what the government says about pass-through."
date: "2026-09-20"
kind: trending
tags: [upi, payments, retail]
tools: [upi-mdr-calculator, upi-standee, gst-invoice, payment-receipt]
---

For a week the country has argued about UPI fees — an actor's op-ed, a Supreme Court petition, Ghaziabad traders' "cash only from 15 October" posters, petrol-pump associations in Madhya Pradesh and Mumbai threatening to refuse UPI above ₹2,000. Underneath the noise is a single **NPCI circular dated 15 September 2026**, and it is more precise than most of the coverage. Here is what it says and what to do.

## The rules, exactly

| Situation | MDR from 15 October 2026 |
|---|---|
| Person-to-person transfers | **Nil** |
| P2PM small merchants — up to **₹1 lakh per month** received via UPI QR | **Nil** on every transaction |
| Person-to-merchant payment of **₹2,000 or less** | **Nil** |
| Person-to-merchant payment **above ₹2,000** | **0.4%** of the amount, **capped at ₹300** (the cap bites at ₹75,000) |
| Fuel, railways, telecom — payment above ₹2,000 | **Flat ₹5** per transaction |
| GST | **18% on the MDR**, claimable as input tax credit by GST-registered merchants |

Two things the circular does *not* do: it does not charge consumers anything, and it does not permit merchants to add a surcharge. The Finance Ministry has said it will monitor merchant behaviour daily and act against pass-through. The government has also ruled out a rollback while the Supreme Court petition is heard.

## What it costs — three real examples

- **Boutique, average bill ₹4,500, 300 UPI bills a month above ₹2,000:** ₹18 per bill + ₹3.24 GST → ≈ **₹6,400 a month**, of which ₹970 comes back as ITC. Effective cost 0.47%.
- **Mobile shop selling a ₹28,000 phone:** ₹112 + ₹20 GST. The customer pays ₹28,000; you receive ₹27,868.
- **Petrol pump, ₹3,000 diesel fill:** flat **₹5** + ₹0.90 GST — not ₹12. The pump associations' objection is about thin per-litre margins (a few rupees per litre), not the rate itself.

Run your own ticket size and volume through the [MDR calculator](/tools/upi-mdr-calculator), which now models the essential-sector flat fee and the P2PM exemption.

## "Can I split a ₹6,000 bill into three ₹2,000 payments?"

NPCI's answer, reported this week: **no**. PSPs are expected to apply velocity checks on repeated sub-₹2,000 payments from one payer to one merchant within a short window and treat them as a single transaction for MDR. Do not build a workflow around it.

## Will cash come back?

RBI's Deputy Governor said this week that the MDR "apprehension is unlikely to spur higher cash usage", and the maths agrees. Cash costs a retailer 1–2% in handling, counting, deposit trips, counterfeit risk and Section 269ST compliance. A 0.4% fee on the slice of transactions above ₹2,000 is cheaper. Traders who put up "cash only" boards will lose the customers who no longer carry cash — which, in metro India, is most of them under 40.

## Five things to do before 15 October

1. **Confirm your classification with your PSP.** If your UPI QR receipts are under ₹1 lakh a month, you should be P2PM and see no deduction. Screenshot the confirmation.
2. **Get your GSTIN onto the PSP account** so the monthly MDR invoice carries it and you can claim the 18% as ITC.
3. **Keep the static QR for small tickets** — everything up to ₹2,000 is free. Print a fresh standee with the [UPI standee tool](/tools/upi-standee).
4. **Use dynamic invoice QRs for large bills** so the amount is exact and reconciliation is clean — the [GST invoice generator](/tools/gst-invoice) embeds one.
5. **Reprice, don't surcharge.** If margins are genuinely thin on high-ticket items, adjust the price list; a "2% extra on UPI" sign is a rule violation and a sales killer.

## If you're in fuel, telecom or railway ticketing

You are in the flat-₹5 category. On a ₹2,500 payment that is 0.2%; on ₹10,000 it is 0.05%. Petrol pumps that stop accepting UPI above ₹2,000 will push customers to cards — which cost the pump 0.75–1% — or to the next pump. Take the ₹5.

## FAQ

### Does the customer pay anything extra?
No. MDR is deducted from the merchant's settlement. Surcharging customers is prohibited.

### I'm a freelancer receiving ₹1.5 lakh a month by UPI from clients. Am I a merchant?
If clients pay a personal VPA it is P2P and free. If they pay a merchant QR or payment link, you are a merchant; above ₹1 lakh a month you are P2M and the 0.4% applies to payments above ₹2,000. Many freelancers will prefer bank transfer for large invoices.

### Is the ₹300 cap per transaction or per day?
Per transaction. ₹1 lakh received in one payment costs ₹300 + GST.

### Where is the official text?
NPCI's circular of 15 September 2026 on its website; your PSP's fee schedule implements it. A gazette notification was still awaited at the time of writing.
