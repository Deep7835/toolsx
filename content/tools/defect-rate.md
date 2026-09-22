---
updated: 2026-09-22
---
A 3% defect rate sounds small until it is 30 rejected pieces in a 1,000-piece export order, a returned batch of 200 boxes of sweets, or a marketplace account suspended for returns. Defect rate is the share of output that fails inspection or is returned as faulty; yield is its mirror. This calculator computes **defect rate, first-pass yield and DPMO** (defects per million opportunities) from your inspection counts, estimates the cost of quality — rework, scrap, returns — and tracks it by batch, line, supplier or shift so the cause shows itself.

## The formulas

- **Defect rate** = Defective units ÷ Units produced (or inspected) × 100.
- **First-pass yield** = Units passing without rework ÷ Units started × 100.
- **DPMO** = Defects ÷ (Units × Opportunities per unit) × 1,000,000 — for products with several checkpoints.
- **Cost of poor quality** = Scrap × unit cost + Rework × rework cost + Returns × return cost.

A batch of 2,400 shirts had 84 rejected at final inspection and 110 reworked → defect rate 3.5%, first-pass yield 91.9%. With 6 inspection points per shirt, 240 total defects gives a DPMO of 16,667 — about a 3.6-sigma process. At ₹220 per scrapped shirt and ₹35 per rework, the batch cost ₹22,330 in quality losses.

## How to use the calculator

1. Enter units produced or inspected, defective units, and (optionally) reworked units and the number of defects.
2. Enter opportunities per unit if you want DPMO and sigma level.
3. Enter unit cost, rework cost and return cost to see the cost of poor quality.
4. Tag results by batch, supplier, machine, shift or operator and compare.
5. Track weekly; set a target and alert threshold (for example 2% target, 4% alert).

## Where defects come from

| Symptom | Likely cause | Where to look |
|---|---|---|
| Defects concentrated in one shift | Training, fatigue, supervision | [Capacity utilisation](/tools/capacity-utilization) — is the shift overloaded? |
| Defects rise with a new supplier lot | Input quality | Incoming inspection; note it on the [purchase order](/tools/purchase-order) terms |
| Defects found only by customers | Weak final inspection | Add a checkpoint; track [order accuracy](/tools/order-accuracy) and returns |
| Damage in transit | Packaging | Box size and cushioning — the [volumetric weight](/tools/volumetric-weight) trade-off |
| Random, low-level defects | Process variation | Standard work, jigs, calibrated tools |

## Quality and the customer

Marketplaces measure "return due to defect" and suspend listings above roughly 1–2%; B2B buyers specify AQL (acceptable quality levels) in the PO and reject whole lots above it. A supplier's [credit note](/tools/credit-note) for rejected goods and the buyer's [debit note](/tools/debit-note) follow. For food businesses, defect control includes labelling and hygiene under FSSAI — see [FSSAI rules for small food businesses](/blog/fssai-labelling-rules-small-food-business).

## Reducing the rate

- Inspect **early** (incoming and in-process), not only at the end; a defect caught at cutting costs ₹5, at packing ₹220.
- Write a one-page standard for each operation with a photo of "good" and "not good".
- Track the top three defect types and fix the biggest first — 60–70% of defects usually have one or two causes.
- Reward first-pass yield, not just output.
- Re-measure after every change; the trend line is the proof.

## Related tools

- [Order accuracy](/tools/order-accuracy) — fulfilment errors downstream of production.
- [Capacity utilisation](/tools/capacity-utilization) — overloaded lines make more defects.
- [Credit note](/tools/credit-note) — for goods rejected by customers.
- [Purchase order](/tools/purchase-order) — put AQL terms on supplier orders.
- [Gross margin calculator](/tools/gross-margin) — the margin quality losses eat into.

## FAQ

### What is a good defect rate?

Below 1% for finished goods in most trades; garment factories often run 2–4% at final inspection; food and pharma aim far lower. The trend and the cost matter more than a benchmark.

### What is the difference between defect rate and yield?

Yield is the share of good units; defect rate is the share of bad ones. First-pass yield also excludes units that needed rework.

### What is DPMO?

Defects per million opportunities — a normalised measure for products with several inspection points, used to compute a sigma level. 3.4 DPMO is six sigma; most small manufacturers are between 3 and 4 sigma.

### Should returns be included?

Yes, as customer-found defects, separately from those caught in-house. The ratio of the two tells you how good your final inspection is.

### How do I cost a defect?

Scrap at full unit cost; rework at labour plus materials; returns at reverse shipping plus refund plus handling. The calculator totals them for the period.
