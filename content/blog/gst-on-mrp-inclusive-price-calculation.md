---
title: "How to calculate GST from MRP: the inclusive formula, reverse calculation and a rate-wise table"
description: "MRP already includes GST, so you divide — you don't multiply. The exact formula, worked examples at 5%, 18% and 40%, how to split CGST/SGST, how retailers show tax on an MRP bill, and the common mistake that overstates tax by 18%."
date: "2026-09-21"
kind: guide
hero: true
tags: [gst, retail, billing]
tools: [gst-calculator, gst-invoice, price-tag-generator, hsn-finder]
---

Every packaged product in India carries an **MRP — maximum retail price — inclusive of all taxes**. So when a customer asks "how much is the GST on this?", or when you make a bill from MRP, you must work *backwards*. Getting this wrong (multiplying instead of dividing) is the most common billing error in retail, and it overstates the tax you owe.

## The formula

**Taxable value = MRP ÷ (1 + GST rate)**
**GST amount = MRP − taxable value**

| MRP | Rate | Taxable value | GST |
|---|---|---|---|
| ₹100 | 5% | 100 ÷ 1.05 = **₹95.24** | ₹4.76 |
| ₹100 | 18% | 100 ÷ 1.18 = **₹84.75** | ₹15.25 |
| ₹100 | 40% | 100 ÷ 1.40 = **₹71.43** | ₹28.57 |
| ₹1,180 | 18% | ₹1,000 | ₹180 |
| ₹525 | 5% | ₹500 | ₹25 |

Quick mental shortcuts: at 18%, GST is about **15.25%** of the MRP; at 5%, about **4.76%**; at 40%, about **28.57%**.

The [GST calculator](/tools/gst-calculator) has a "Remove GST (inclusive)" mode that does this and splits CGST/SGST.

## The mistake to avoid

Wrong: ₹100 MRP × 18% = ₹18 GST, taxable ₹82.
Right: ₹100 ÷ 1.18 = ₹84.75 taxable, ₹15.25 GST.

The wrong method makes you pay ₹2.75 extra tax per ₹100 — and your invoice totals won't add up to the MRP.

## Splitting into CGST and SGST

For a sale within your state, split the GST equally:

₹1,180 MRP at 18% → taxable ₹1,000 → CGST ₹90 + SGST ₹90.

Inter-state → IGST ₹180. Your bill shows the taxable value, each tax component and the total (= MRP).

## Billing from MRP in a shop

1. Enter items at MRP with the correct rate — the [invoice generator](/tools/gst-invoice) has an "inclusive" toggle that back-calculates every line.
2. Discounts: apply to the MRP, then back-calculate GST on the discounted price. A ₹1,180 item sold at 10% off = ₹1,062 → taxable ₹900, GST ₹162.
3. Mixed rates in one bill: each line has its own rate; the totals table shows tax at each rate.
4. Print the HSN if required (turnover above ₹5 crore, or B2B). Look up rates in the [HSN finder](/tools/hsn-finder).

## Selling *above* MRP is illegal; below is fine

Legal Metrology prohibits charging more than MRP (including any "cooling charge" on cold drinks). You may sell below MRP at any discount. After the September 2025 rate cuts, manufacturers revised MRPs downward; you must sell at the new printed MRP even for old stock, and your ITC on that stock stays intact.

## For manufacturers: setting MRP

MRP = (ex-factory price + distributor margin + retailer margin) × (1 + GST rate), rounded to a sensible number. Print "MRP ₹___ (inclusive of all taxes)". The [price tag generator](/tools/price-tag-generator) prints shelf tags with MRP and offer price for retailers.

## Services: inclusive quotes

The same maths applies when a client insists on an all-inclusive fee. A ₹1,00,000 "all-in" consulting fee at 18% = taxable ₹84,746 + GST ₹15,254. Quote "plus GST" to avoid this silent haircut — see [how to write a quotation](/blog/quotation-format-how-to-write-a-quotation).

## FAQ

### Does MRP include GST?
Yes. By law, MRP is the maximum price inclusive of all taxes. GST is inside it, not on top.

### How do I find the GST rate for a product?
Search the item in the [HSN finder](/tools/hsn-finder); rates are 0, 5, 18 or 40% for most goods after the 2025 restructuring (3% for gold, 1.5% for diamonds).

### Can a shop charge GST on top of MRP?
No. Charging above MRP is an offence under the Legal Metrology Act, regardless of the reason.

### How do I calculate GST inclusive price from a base price?
Multiply: ₹1,000 × 1.18 = ₹1,180. Use the calculator's "Add GST" mode.
