---
title: "Barcodes for your products: EAN-13 vs Code 128, GS1 India registration cost, and when a free barcode is enough"
description: "What retailers and marketplaces require, how the 890 prefix works, what GS1 India charges, how to compute the check digit, and how to print labels that scanners read the first time."
date: "2026-02-20"
updated: "2026-09-08"
kind: guide
hero: true
tags: [retail, ecommerce, logistics]
tools: [barcode-generator, price-tag-generator, barcode-scanner, shipping-label]
---

The moment you sell through a modern-trade store, a marketplace or a distributor with a scanner, "how to get a barcode for my product" becomes urgent. The answer depends on where the product is sold.

## Two kinds of barcode, two jobs

| | EAN-13 (GTIN) | Code 128 |
|---|---|---|
| Looks like | 13 digits under bars, starts with 890 in India | Any text/number, no fixed length |
| Who issues | **GS1** (globally unique) | You (internal) |
| Required by | Supermarkets, Amazon/Flipkart listings, distributors, export buyers | Nobody — it's for your own inventory, labels, AWBs |
| Cost | GS1 India subscription | Free |

If your product is sold **only in your own store or website**, a Code 128 SKU barcode from the [barcode generator](/tools/barcode-generator) is enough. If it goes to **any retailer or marketplace**, you need a GS1 EAN.

## How an EAN-13 is built

**890** (India) + **company prefix** (4–7 digits, assigned by GS1) + **item reference** (you assign) + **check digit** (computed). Example: 890 1234 56789 **X**.

The check digit: multiply the 12 digits alternately by 1 and 3, sum, and subtract from the next multiple of 10. The generator tool computes it from 12 digits with one click — never type the 13th digit yourself.

## GS1 India: what it costs

GS1 India licenses a company prefix with capacity for 100, 1,000, 10,000 or more GTINs. Fees in 2026 (indicative, GST extra):

| Capacity | Registration | Annual |
|---|---|---|
| 100 GTINs | ≈ ₹11,000 | ≈ ₹5,000 |
| 1,000 GTINs | ≈ ₹22,000 | ≈ ₹10,000 |
| 10,000 GTINs | ≈ ₹44,000 | ≈ ₹18,000 |

Registration is online (gs1india.org), needs GSTIN/Udyam/PAN, and takes 2–5 days. Udyam-registered MSMEs get discounted rates. Marketplaces validate the number against GS1's database — codes bought from "barcode resellers" are usually reused or invalid and get listings rejected.

## What marketplaces accept

- **Amazon:** GTIN (EAN/UPC) required per listing; exemption possible for handmade, private-label brands enrolled in Brand Registry, and some categories.
- **Flipkart / Meesho:** EAN recommended; many categories allow "no barcode" with brand approval.
- **Modern trade (DMart, Reliance, Big Bazaar successors):** EAN mandatory, plus an ITF-14 on outer cartons.
- **ONDC / local delivery apps:** any scannable code, EAN preferred for catalogue matching.

## Printing labels that scan

- **Bar height ≥ 15 mm**, width per module ≥ 0.33 mm (don't shrink below 80% of nominal size).
- **Quiet zones:** at least 3.6 mm of white on both sides of an EAN.
- Black bars on white or light background; never print on red or on glossy foil.
- Thermal transfer or laser printing; inkjet bleeds.
- Test every new label with the [scanner](/tools/barcode-scanner) before you print 5,000.

The [price tag generator](/tools/price-tag-generator) prints label sheets with EAN-13 or Code 128 plus MRP and batch, and the [shipping label](/tools/shipping-label) encodes AWBs as Code 128.

## Variants, cartons and batches

- Every **variant** (size, colour, pack size) needs its own GTIN.
- **Outer cartons** use ITF-14 (14 digits: packaging indicator + the item's GTIN).
- Batch numbers and expiry go in a **GS1-128** or **2D DataMatrix**, not in the EAN.
- Pharma and food are moving to **GS1 Digital Link QR codes** ("Sunrise 2027") that carry GTIN, batch and expiry in one scannable QR.

## FAQ

### Can I generate an EAN-13 for free?
You can *render* any 13-digit number, but a GTIN is unique only if the prefix is licensed to you by GS1. Marketplaces check.

### Do I need a barcode for each product or each unit?
Each product variant has one GTIN; every unit carries the same barcode.

### What barcode does a kirana store need for its own billing?
Code 128 SKU codes are fine, or simply use the supplier's EAN already printed on packaged goods.

### Is UPC the same as EAN?
UPC-A is 12 digits (North America); EAN-13 is 13 digits. Scanners read both; Amazon.in accepts both.
