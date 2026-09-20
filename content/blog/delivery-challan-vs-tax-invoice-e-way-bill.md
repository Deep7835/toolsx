---
title: "Delivery challan vs tax invoice, and when you need an e-way bill"
description: "Moving goods without a sale — job work, branch transfers, approval basis, exhibitions — needs a delivery challan, not an invoice. The formats, the ₹50,000 e-way bill threshold, validity by distance, and the penalties for getting caught without one."
date: "2026-03-05"
updated: "2026-09-06"
kind: guide
hero: true
tags: [gst, logistics]
tools: [delivery-challan, gst-invoice, shipping-label, volumetric-weight]
---

Not every truck leaving your godown carries a sale. Goods go for job work, to your own branch, to a customer on approval, to an exhibition — and each of those needs a **delivery challan** rather than a tax invoice, plus an **e-way bill** above the threshold. Search interest in "delivery challan format" and "e-way bill limit" peaks every festive season when stock moves fastest.

## Invoice or challan?

| Movement | Document |
|---|---|
| Sale to a customer | Tax invoice (or bill of supply) |
| Goods sent for job work and return | Delivery challan |
| Transfer between your own branches (same GSTIN) | Delivery challan |
| Transfer to a branch with a different GSTIN (another state) | Tax invoice — it's a supply |
| Goods on approval / sale-or-return | Delivery challan; invoice when accepted (or after 6 months) |
| Exhibition / demo | Delivery challan |
| Supply in multiple lots against one invoice | Invoice with the first lot; challans for the rest, referencing it |
| Liquid gas where quantity is unknown at dispatch | Delivery challan; invoice after delivery |

The [delivery challan tool](/tools/delivery-challan) produces the Rule 55 format with vehicle, driver, LR and e-way bill fields.

## Delivery challan contents (Rule 55)

Serial number (max 16 characters, one series per FY); date; consignor's name, address, GSTIN; consignee's details; HSN and description; quantity (provisional if unknown); taxable value; tax rate and amount *where the movement is a supply* (e.g. for approval-basis goods); place of supply for inter-state; signature. Three copies: original for consignee, duplicate for transporter, triplicate for consignor.

## E-way bill: the essentials

- Required for movement of goods worth **more than ₹50,000** (invoice value including tax) — per consignment, in a vehicle.
- Generated on **ewaybillgst.gov.in** by the supplier, recipient or transporter, before movement begins. **Part A** has the invoice details; **Part B** the vehicle number.
- Some states set lower thresholds for intra-state movement (e.g. ₹1 lakh in several states, but others have kept ₹50,000; some exempt certain goods) — check your state.
- Not required for: non-motorised conveyance, goods exempt from GST, movement within 50 km for a transporter's weighment, and a specific list of exempt goods (LPG, kerosene, jewellery under certain conditions…).

## Validity

| Distance | Validity |
|---|---|
| Up to 200 km | 1 day |
| Every additional 200 km | +1 day |
| Over-dimensional cargo | 1 day per 20 km |

Validity can be extended within 8 hours before or after expiry if the consignment is in transit. A Part B vehicle number can be updated any number of times.

## Penalties for movement without an e-way bill

Detention under Section 129: **penalty of 200% of the tax** (or 2% of value for exempt goods) if the owner comes forward; higher otherwise. Goods and vehicle are held until paid. This is the single most expensive routine GST mistake — a ₹5 lakh consignment at 18% GST means ₹1.8 lakh in penalty.

## Practical tips

- For job work, the challan value is the value of goods; no tax is charged, but the challan must say "for job work".
- Goods returned by a job worker need a challan from *their* side (or an endorsement on yours).
- Keep e-way bills with the transporter's LR; the driver must show them on demand. A printed [4×6 label](/tools/shipping-label) with the e-way bill number on the outer carton helps at checkpoints.
- Check volumetric weight for courier shipments — freight is charged on the higher of actual and volumetric ([calculator](/tools/volumetric-weight)).
- For approval-basis goods across states, the challan must carry tax details and an e-way bill; issue the invoice within 6 months or the movement is deemed a supply.

## FAQ

### Do I need an e-way bill for a ₹40,000 consignment?
Not under the ₹50,000 central threshold, unless your state has notified a lower limit for intra-state movement.

### Can I generate an e-way bill on a delivery challan?
Yes. Select "Outward – Job work / Others" and enter the challan number as the document.

### Is a delivery challan valid for transporting goods sold?
No — a sale needs a tax invoice. Using a challan to move sold goods and invoicing later is treated as evasion.

### Who is liable if the transporter didn't carry the e-way bill?
The person in charge of the conveyance must carry it, but the penalty is recovered from the owner of the goods (supplier or recipient).
