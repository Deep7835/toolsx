---
updated: 2026-09-22
---
Every line on a GST invoice needs an HSN code (goods) or SAC code (services) — and the code decides the tax rate, the GSTR-1 HSN summary, and whether your customer's ITC matches. Yet most small businesses copy codes from a supplier's bill and hope. This finder lets you search by product or service name, shows the code with its current GST rate under the post-September-2025 slabs, and tells you how many digits you must print based on turnover. It runs on a curated database in your browser; no lookups are sent anywhere.

## HSN and SAC, briefly

**HSN** (Harmonised System of Nomenclature) is the World Customs Organization's 6-digit classification, extended to 8 digits in India's Customs Tariff. Chapter (2 digits) → heading (4) → sub-heading (6) → tariff item (8). Chapter 09 is coffee, tea and spices; 0902 is tea; 090240 is black tea in bulk. **SAC** (Services Accounting Code) is India's 6-digit scheme starting with 99: 9954 construction, 9983 professional services, 9984 telecom, 9988 job work, 9997 personal services. The structure and pitfalls are explained in [HSN and SAC codes explained](/blog/hsn-and-sac-codes-explained).

## How many digits you must show

| Aggregate turnover (previous FY) | B2B invoices | B2C invoices |
|---|---|---|
| Up to ₹5 crore | 4-digit HSN mandatory | 4-digit optional |
| Above ₹5 crore | 6-digit HSN mandatory | 6-digit mandatory |
| Exports and imports | 8 digits | 8 digits |

Services always use the 6-digit SAC (4 digits accepted for turnover up to ₹5 crore). The same digit rule applies to the HSN-wise summary in Table 12 of GSTR-1, and e-invoices reject codes with fewer digits than required.

## How to use the finder

1. Type a product or service — "biscuits", "LED bulb", "software development", "courier".
2. Pick the closest match; the tool shows the HSN/SAC, the GST rate and notes on conditions (for example, footwear rate by price, textiles by fibre).
3. Copy the code into your [GST invoice](/tools/gst-invoice) line, or check the rate in the [GST calculator](/tools/gst-calculator).
4. For borderline items, note the chapter and confirm on the CBIC rate schedule; the tool links you to the relevant notification.

## Why the right code matters

- **Rate**: cotton handloom fabric at 5% versus synthetic at 18%; a wrong code means short-paid or over-charged tax.
- **ITC matching**: buyers' systems compare your HSN against their purchase master; mismatches cause invoice rejection in IMS.
- **Penalty**: wrong or missing HSN can attract a general penalty up to ₹25,000 under Section 125, and repeated errors invite scrutiny.
- **E-way bills and e-invoices** require the code at the mandated digit level.
- **Customs**: for exporters, the 8-digit code fixes duty drawback and RoDTEP rates.

Rate changes under GST 2.0 moved hundreds of items between slabs; if your master data predates September 2025, re-verify each code with the [GST 2.0 rate changes](/blog/gst-2-0-new-rates-what-changed-for-small-business) guide.

## Classification tips

- Classify by **what the item is**, not what it is used for — a plastic chair is furniture (9401), not "plastics".
- **Composite supplies** take the code and rate of the principal supply; **mixed supplies** take the highest rate among components.
- **Job work** on someone else's goods is a service (9988), taxed at 5%, 12%-legacy or 18% depending on the goods.
- Packaged and branded versions of exempt goods (rice, wheat flour) attract 5%.
- Keep a **product master** with the code, rate and effective date; update it when rates change.

## Related tools

- [GST invoice generator](/tools/gst-invoice) — HSN per line, with the digit rule enforced.
- [GST calculator](/tools/gst-calculator) — the rate applied to a price.
- [Price tag generator](/tools/price-tag-generator) — print the right inclusive price after finding the rate.
- [Purchase order](/tools/purchase-order) — put HSN on POs so suppliers invoice correctly.
- [GSTIN validator](/tools/gstin-validator) — check the supplier's GST number while you are at it.
- [GST filing calendar](/tools/gst-calendar) — the HSN summary goes into GSTR-1 each month.

## FAQ

### Is HSN mandatory for small businesses?

Yes. Since April 2021, every registered taxpayer must print at least 4-digit HSN on B2B invoices; those above ₹5 crore turnover must print 6 digits on all invoices.

### Are these rates current?

The database reflects the slab structure effective 22 September 2025 and subsequent notifications, but always confirm high-value or unusual items against the CBIC schedule. The tool shows the notification reference where available.

### What if I cannot find my product?

Search by material or broader category, then narrow down using the chapter notes. If still unsure, an advance ruling or a CA's opinion is worth it for high-volume items.

### Do services need HSN?

Services use SAC codes (six digits starting with 99). The finder searches both.

### Can a wrong HSN lead to a penalty?

Yes — up to ₹25,000 under Section 125, plus demand for short-paid tax with interest if the wrong code led to a lower rate.
