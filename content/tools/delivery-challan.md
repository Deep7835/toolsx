---
updated: 2026-09-22
---
Not every movement of goods is a sale. Sending fabric to a job worker, moving stock to your second branch, delivering machinery for a trial, or shipping in instalments against one order — for each of these GST provides the **delivery challan** under Rule 55, a transport document that travels with the goods when a tax invoice cannot or should not be issued yet. This generator produces a compliant challan in triplicate with consignor and consignee details, item descriptions and HSN, quantities, vehicle number and the reason for transport, as a PDF ready for the driver.

## When to use a delivery challan instead of an invoice

| Situation | Document |
|---|---|
| Sale of goods | Tax invoice ([GST invoice generator](/tools/gst-invoice)) |
| Job work — sending inputs to a job worker or receiving them back | Delivery challan |
| Stock transfer between your own branches under the same GSTIN | Delivery challan |
| Goods sent on approval or sale-or-return | Delivery challan; invoice when approved or after 6 months |
| Supply of liquid gas where quantity is unknown at dispatch | Delivery challan |
| Goods in semi-knocked-down condition or shipped in lots | Invoice with the first lot, challan with each lot |
| Exhibition or demo material | Delivery challan |
| Own goods to a third-party warehouse | Delivery challan |

Transfers between branches with **different** GSTINs (different states) are supplies and need an invoice. The decision, with e-way bill implications, is explained in [Delivery challan vs tax invoice, and when you need an e-way bill](/blog/delivery-challan-vs-tax-invoice-e-way-bill).

## What Rule 55 requires

- Date and a unique serial number (up to 16 characters, one series per financial year)
- Name, address and GSTIN of the consignor (and consignee, if registered)
- HSN code and description of goods
- Quantity — provisional where the exact quantity is not known
- Taxable value; and tax rate and amount where the transport is to the consignee
- Place of supply for inter-state movement
- Signature

Three copies: original for the consignee, duplicate for the transporter, triplicate for the consignor. The generator marks them.

## E-way bill

An e-way bill is required for movement of goods worth more than **₹50,000** (some states lower the intra-state threshold), including on a delivery challan. Generate it on the e-way bill portal citing the challan number; Part B carries the vehicle number. Job work sent inter-state needs an e-way bill regardless of value. For your own vehicle, the challan plus e-way bill printout (or the number on the phone) is what an officer will ask for.

## How to use the generator

1. Fill your business profile once; it is saved locally in the browser.
2. Enter the consignee (a job worker, your branch, a customer for approval goods) and the delivery address.
3. Add items with HSN, quantity, unit and value; mark the quantity provisional if needed.
4. Choose the **reason** — job work, stock transfer, approval, exhibition, lot supply — and enter the vehicle number, transporter and e-way bill number if generated.
5. Download the PDF (three copies) and hand it to the driver; keep the triplicate in your challan file.

## Job work reminders

Inputs sent to a job worker must return (or be supplied from the job worker's premises) within **one year** (three years for capital goods), or the original dispatch is treated as a supply from the date sent. File **ITC-04** for the period showing goods sent and received. Track the outstanding challans; the [business days calculator](/tools/business-days) helps set follow-up dates.

## Related tools

- [GST invoice generator](/tools/gst-invoice) — for actual sales.
- [Shipping label generator](/tools/shipping-label) — courier labels for the parcels.
- [Volumetric weight calculator](/tools/volumetric-weight) — freight cost for the consignment.
- [Purchase order](/tools/purchase-order) — job-work orders to the vendor.
- [HSN/SAC finder](/tools/hsn-finder) — codes for the challan lines.

## FAQ

### Is a delivery challan a tax document?

It is a transport document under GST, not an invoice. No tax is charged on it, and it does not go into GSTR-1 (job-work movements are reported in ITC-04).

### Do I need an e-way bill with a challan?

Yes, if the consignment value exceeds ₹50,000, and for inter-state job work at any value. Quote the challan number when generating it.

### Can I use a challan for goods sold on credit?

No. A sale needs a tax invoice at or before delivery. A challan cannot substitute for an invoice to delay tax.

### How many copies are needed?

Three: original for the consignee, duplicate for the transporter, triplicate for you. The generator labels each.

### What if goods sent for approval are accepted?

Issue the tax invoice on acceptance, or at six months from dispatch if the customer has not decided, whichever is earlier.
