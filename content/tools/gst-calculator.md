---
updated: 2026-09-22
---
Whether you are adding GST to a quote, backing it out of an MRP, or checking whether a supplier's invoice split CGST and SGST correctly, the arithmetic is simple but the mistakes are expensive. This GST calculator does it live: pick a rate, type an amount, and see the taxable value, CGST, SGST or IGST, and the total — in **add-GST** (exclusive) or **remove-GST** (inclusive) mode, with a composition-scheme comparison for small dealers. It reflects the slab structure in force since 22 September 2025.

## The GST slabs in 2026

The GST Council's "GST 2.0" rationalisation collapsed the four main slabs into two, plus a demerit rate:

| Rate | What falls here |
|---|---|
| 0% | Unbranded food grains, fresh produce, milk, education, health services, most books |
| 3% | Gold, silver, precious stones (0.25% on rough diamonds) |
| 5% | Most packaged food, footwear and apparel up to the threshold, restaurants without ITC, hotel rooms ≤ ₹7,500, small cars, cement's former 28% moved to 18% |
| 18% | The default for most goods and services — electronics, furniture, telecom, professional services, larger vehicles |
| 40% | Tobacco, pan masala, aerated and sugary drinks, luxury cars and the former "sin" list |

What moved where, item by item, is in [GST 2.0 rate changes](/blog/gst-2-0-new-rates-what-changed-for-small-business). Use the custom-rate field for invoices dated before the change (12% or 28%) or for rare rates like 1.5% and 7.5%.

## The formulas

- **Add GST**: tax = base × rate; total = base × (1 + rate). ₹10,000 at 18% → ₹1,800 tax, ₹11,800 total.
- **Remove GST** (inclusive price): base = total ÷ (1 + rate); tax = total − base. ₹11,800 inclusive at 18% → base ₹10,000, tax ₹1,800. A common error is computing 18% *of* ₹11,800 (₹2,124), which overstates the tax.
- **Intra-state** supplies split the rate equally: 18% = 9% CGST + 9% SGST. **Inter-state** supplies charge the full rate as IGST. The place of supply — usually the buyer's location for goods — decides which.

Worked examples by rate, including MRP reverse calculations, are in [How to calculate GST from MRP](/blog/gst-on-mrp-inclusive-price-calculation).

## How to use the calculator

1. Choose **Add GST** if you know the base price, or **Remove GST** if you have an inclusive price or MRP.
2. Tap a slab button or enter a custom rate.
3. Switch to **IGST** for inter-state sales; the CGST/SGST split appears otherwise.
4. Optionally open the **composition** comparison to see what a composition dealer would pay on the same turnover (1% for traders and manufacturers, 5% for restaurants, 6% for other service providers).
5. Copy the figures into a [GST invoice](/tools/gst-invoice) or a [price tag](/tools/price-tag-generator).

## Composition vs regular: a quick sanity check

A trader with ₹80 lakh turnover pays 1% (₹80,000) under composition and cannot collect GST from customers or claim input credit. Under the regular scheme they collect 18% on sales and set off 18% on purchases, so the *net* tax is 18% of value added. Composition wins when margins are thin and inputs are tax-free; regular wins when customers are businesses that want ITC. The full decision is in the [GST composition scheme guide](/blog/gst-composition-scheme-2026-complete-guide).

## Common mistakes

- **Applying the slab to the wrong base**: discounts shown on the invoice reduce the taxable value before GST.
- **Rounding per line**: Section 170 rounds the invoice total, not each line.
- **Charging IGST to a customer in your own state** because their billing address is elsewhere — place of supply for goods is where delivery ends.
- **Forgetting cess** on aerated drinks, coal or cars where compensation cess still applies in addition to the slab.
- **Using old rates** for supplies after 22 September 2025 — the rate on the date of supply governs.

## Related tools

- [HSN/SAC finder](/tools/hsn-finder) — find the code and rate for your product.
- [GST invoice generator](/tools/gst-invoice) — put the numbers on a compliant invoice.
- [Discount calculator](/tools/discount-calculator) — discounts before or after tax.
- [Profit margin calculator](/tools/profit-margin) — margins on tax-exclusive prices.
- [GST filing calendar](/tools/gst-calendar) — when the collected tax is due.

## FAQ

### How do I calculate GST from an inclusive price?

Divide by (1 + rate). For 18%, base = price ÷ 1.18; the tax is the difference. The calculator's Remove mode does this and splits CGST/SGST.

### When do I charge IGST instead of CGST + SGST?

When the location of the supplier and the place of supply are in different states or union territories. For goods, place of supply is where the movement ends; for most B2B services, the recipient's registered address.

### Which rates changed in September 2025?

The 12% and 28% slabs were removed; most items moved to 5% or 18%, and a 40% rate replaced 28% plus cess for tobacco, sugary drinks and luxury goods.

### Is GST charged on the discounted price?

Yes, if the discount is recorded on the invoice at the time of supply. Post-supply discounts reduce tax only through credit notes when agreed in advance.

### Does the calculator handle cess?

Add cess as a custom percentage on top of the slab where applicable (for example on aerated drinks or coal). The base is the same taxable value.
