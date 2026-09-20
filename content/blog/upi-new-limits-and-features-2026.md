---
title: "UPI in 2026: new transaction limits, UPI Circle, Lite auto top-up and what they mean for merchants"
description: "Higher per-transaction caps for insurance, education and tax, delegated payments via UPI Circle, ₹1,000 offline payments with UPI Lite, and biometric authentication. A merchant-focused rundown of the changes that arrived through 2025–26."
date: "2026-08-30"
updated: "2026-09-20"
kind: trending
tags: [upi, payments]
tools: [upi-standee, barcode-scanner, payment-receipt, whatsapp-direct]
---

UPI keeps changing, and each change generates a wave of searches — "UPI limit per day 2026", "UPI Circle kya hai", "UPI Lite limit". Here is the consolidated picture as of September 2026, written for the people who *accept* UPI rather than only send it.

## Transaction limits

The default cap is still **₹1 lakh per transaction** for ordinary P2P and P2M. But NPCI has carved out higher limits for verified merchant categories (effective from mid-September 2025 and expanded since):

| Category (verified merchants) | Per transaction | Per day |
|---|---|---|
| Capital markets, insurance, government e-marketplace, travel | ₹5 lakh | ₹10 lakh |
| Credit card bill payments, loan collections, EMI | ₹5 lakh | ₹6 lakh |
| Tax payments, hospitals, education, IPO/RBI retail direct | ₹5 lakh | ₹10 lakh |
| Jewellery | ₹2 lakh (some banks) | varies |
| Everything else | ₹1 lakh | as per bank (typically ₹1 lakh) |

Banks may set lower limits than NPCI. If a customer's ₹1.5 lakh payment for a hospital bill fails, it is usually their bank's cap, not UPI's.

**Merchant takeaway:** if you are in a listed category, ask your PSP to tag your MCC correctly so large payments go through.

## UPI Circle: delegated payments

UPI Circle lets a primary user (say, a parent) let a secondary user (a child, a domestic helper, an elderly parent without a bank account) pay from the primary's account — either with per-transaction approval or within a monthly limit (currently ₹15,000, ₹5,000 per transaction) for full delegation.

**Merchant takeaway:** nothing changes at the counter; the QR scan works the same. But expect more payments from users who previously paid cash — especially teenagers and senior citizens.

## UPI Lite and offline payments

UPI Lite (on-device wallet, no PIN) now allows **₹1,000 per transaction** and a **₹5,000 balance**, with **auto top-up** so users no longer need to reload manually. UPI Lite X works offline between NFC-capable phones.

**Merchant takeaway:** small-ticket checkout is faster — no PIN prompt — which matters for tea stalls, canteens and parking. Nothing to set up on your side.

## Biometric and new authentication

NPCI has enabled **fingerprint/face authentication** as an alternative to the UPI PIN on supported apps. It reduces failed transactions from wrong PIN entry — a common reason customers abandon at the counter.

## Cheques are dying: UPI for B2B

Business-to-business UPI is the quiet trend of 2026. Distributors now settle with retailers over UPI up to ₹1 lakh per transaction (or higher via the merchant categories above). For amounts above the limit, most use IMPS/NEFT from the same app. If you are a supplier, print your UPI ID on invoices and let the [invoice QR](/tools/gst-invoice) carry the exact amount — settlements come in faster than with "please transfer to account no…".

## Fraud rules that affect you

- **Collect requests** from unknown merchants are progressively restricted; P2P collect is largely disabled. Use a QR or a payment link, not a collect request.
- **Transaction ID display** is mandatory on merchant receipts. The [payment receipt tool](/tools/payment-receipt) has a reference field for it.
- **Chargebacks:** UPI disputes are raised via the customer's app and adjudicated by NPCI's system; keep delivery proof for high-value orders.

## Checklist for a merchant in 2026

1. Confirm your MCC/category with your PSP if you need limits above ₹1 lakh.
2. Print a static QR standee for small tickets and use dynamic QRs for large bills — see the [UPI standee](/tools/upi-standee).
3. Put the UPI transaction ID on every receipt.
4. Test a payment yourself with the [scanner](/tools/barcode-scanner) — it decodes UPI QRs and shows the VPA and amount so you can verify your own code.
5. Read the [MDR article](/blog/upi-mdr-2026-how-to-prepare-your-shop) if your UPI inflows exceed ₹40 lakh a year.

## FAQ

### What is the UPI daily limit in 2026?
For ordinary transactions most banks cap at ₹1 lakh per day. Verified merchant categories allow up to ₹10 lakh per day.

### Can a customer pay ₹3 lakh by UPI at my clinic?
If your PSP has tagged you under hospitals/healthcare, yes — up to ₹5 lakh per transaction. Otherwise the ₹1 lakh limit applies.

### Does UPI Lite money come to me instantly?
Yes. UPI Lite payments settle to the merchant like any UPI payment; the only difference is on the payer's side.

### Is there a fee for receiving UPI?
Not for P2P or small merchants (up to ₹1 lakh/month of UPI QR receipts). From 15 October 2026 other merchants pay 0.4% (capped ₹300) on transactions above ₹2,000, with a flat ₹5 for fuel, railways and telecom — see the MDR guide.
