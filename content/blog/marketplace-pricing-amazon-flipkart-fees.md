---
title: "Pricing for Amazon, Flipkart and Meesho: the fee stack, volumetric weight, and the formula that protects your margin"
description: "Referral commission, closing fee, shipping by weight slab, payment fee, returns and GST — how they compound, why a ₹300 product can lose money, and a backwards-from-margin formula with a worked example."
date: "2026-03-15"
updated: "2026-09-11"
kind: guide
hero: true
tags: [ecommerce, finance]
tools: [seller-pricing, volumetric-weight, profit-margin, shipping-label]
---

"Amazon seller fees calculator" is searched by thousands of new sellers every month, usually after their first settlement report shows a payout far below the listing price. Fee schedules change every year — this guide teaches the *structure* so you can price correctly whatever the current numbers are.

## The fee stack

| Fee | What it is | Typical range |
|---|---|---|
| **Referral / commission** | % of item price, by category | 2–25% (electronics low, fashion & beauty high) |
| **Closing fee** | Fixed per unit, by price band | ₹5–₹60 |
| **Shipping / fulfilment** | By chargeable weight slab and zone (local/regional/national) | ₹40–₹120 for the first 500 g |
| **Pick & pack / storage** | For platform-fulfilled (FBA/Smart) inventory | Per unit + per cubic foot per month |
| **Payment / collection** | On COD and sometimes prepaid | 1–2% |
| **Returns** | Reverse shipping on customer returns; some categories refund the referral fee | Same as forward shipping |
| **GST on fees** | 18% on all platform fees | — |

Meesho charges zero commission but recovers via shipping and penalties; Flipkart's structure mirrors Amazon's with different bands. Always download the *current* rate card from Seller Central.

## Weight: the fee nobody prices for

Shipping is charged on the **higher of actual and volumetric weight** (L × W × H ÷ 5000 for most Indian carriers, in cm and kg). A 500 g soft toy in a 30 × 25 × 20 cm box has a volumetric weight of **3 kg** — six times the shipping fee you expected. Check every SKU in the [volumetric calculator](/tools/volumetric-weight) and shrink the box.

## The backwards formula

Start from what you need to *keep*, not from a "nice" price:

> Price (ex-GST) = (product cost + packaging + shipping + fixed fees) ÷ (1 − commission% − payment% − target margin%)

Then add GST for the listing price (customers see MRP inclusive).

### Worked example
- Product cost ₹320, packaging ₹25
- Box 25 × 18 × 10 cm → 0.9 kg chargeable → shipping ₹90 (two 0.5 kg slabs)
- Closing fee ₹20
- Commission 12%, payment fee 2%, target margin 20%
- GST 12%

Landed cost = 320 + 25 + 90 + 20 = ₹455
Price ex-GST = 455 ÷ (1 − 0.12 − 0.02 − 0.20) = 455 ÷ 0.66 = **₹689**
Listing price = 689 × 1.12 = **₹772** → list at ₹779.

Payout ≈ 689 − 12% − 2% = ₹593; minus landed cost ₹455 = **₹138 profit** (20% of ex-GST price). The [seller pricing workflow](/tools/seller-pricing) does this chain in one screen.

## Returns kill thin margins

A 15% return rate on fashion means forward + reverse shipping on 15% of orders, plus damaged returns you can't resell. Add an expected-return cost per unit: (return rate × 2 × shipping) + (return rate × damage rate × product cost). For the example: 0.15 × 180 + 0.15 × 0.2 × 320 ≈ ₹37 per unit — build it into landed cost.

## Why ₹300 products lose money

At ₹300, shipping (₹70+), closing (₹20) and commission (₹36) eat ₹126 before packaging and returns. Unless product cost is under ₹80, you're underwater. Fixes: bundle (2-pack, 3-pack), raise price with a coupon that creates perceived value, or use platform fulfilment for lower shipping slabs.

## Ads and discounts

Sponsored ads (ACoS) and platform-funded vs seller-funded coupons are on top of everything above. A 10% ACoS on the example costs ₹69 — more than a third of profit. Track profit per SKU monthly with the [profit margin calculator](/tools/profit-margin); pause ads on SKUs where ACoS exceeds margin.

## GST on the seller side

- You collect GST on the sale (at the product's rate) and pay it via GSTR-3B.
- Platforms collect **TCS at 0.5%** (reduced from 1% in July 2024) and report it; claim it in your electronic cash ledger.
- You get ITC on the 18% GST charged on all platform fees — don't forget it; it's 1–3% of revenue.

## FAQ

### Is Meesho really commission-free?
Yes on referral, but shipping is charged per order and penalties for cancellations/RTO are significant. Model it fully.

### How do I find my category's referral fee?
Seller Central → Fee schedule (Amazon) / Rate card (Flipkart). Fees vary by price band within a category.

### Should I use FBA / Flipkart Smart?
For fast-moving SKUs with stable demand, yes — lower shipping slabs and better ranking. For slow movers, storage fees pile up.

### Can I set different prices on different platforms?
Yes, but many platforms' algorithms suppress listings priced above your own website or another marketplace. Keep parity or use different pack sizes.
