---
updated: 2026-09-22
---
A parcel with a hand-written address, a smudged phone number and no barcode is a parcel that comes back. Courier networks sort by scanning; a proper **4 × 6 inch shipping label** with a Code 128 AWB barcode, clear ship-to and return addresses, COD amount and weight moves through Delhivery, Blue Dart, DTDC, Xpressbees, Ecom Express, Speed Post and every marketplace hub without a human reading it. This generator produces that label for self-ship orders on Amazon, Flipkart, Meesho, your own website or WhatsApp, as PDF for thermal printers or PNG, from your browser.

## When you need your own label

- **Self-ship marketplace orders** where the platform does not fulfil (Amazon Easy Ship "self ship", Flipkart seller-shipped, Meesho supplier dispatch).
- **Website and WhatsApp orders** shipped through a courier aggregator or your own account.
- **Returns** you receive from customers.
- **B2B consignments** going by surface courier with a [delivery challan](/tools/delivery-challan) or [GST invoice](/tools/gst-invoice) inside.

Marketplace-fulfilled orders (FBA, Flipkart Smart) come with the platform's own label — use that; do not substitute.

## What the label carries

| Zone | Content |
|---|---|
| Top | Courier name/logo, service type (surface/air, COD/prepaid), AWB number as Code 128 barcode and text |
| Ship to | Name, full address with landmark, PIN code in large type, phone |
| Return to | Your business name, address, phone |
| Order box | Order ID, order date, SKU list or item count, declared value |
| Parcel | Weight (actual and volumetric), dimensions, "This side up"/fragile marks |
| COD | Amount to collect in large type, or "PREPAID" |
| Footer | Handling instructions; a QR to your [WhatsApp](/tools/whatsapp-direct) for the customer |

## How to use the generator

1. Select the courier (or "generic") and paste the AWB number from your courier account or aggregator; the tool validates common formats and encodes it as Code 128.
2. Enter the delivery address — PIN code first, so it prints in the bold block scanners and sorters expect.
3. Fill your return address (saved for next time), order ID and items.
4. Enter weight and dimensions; the [volumetric weight calculator](/tools/volumetric-weight) is built in, so the chargeable weight prints automatically.
5. Mark COD amount if applicable, then download PDF for a 4 × 6 thermal printer (100 × 150 mm) or A4 (two labels per sheet), or PNG.

## Printing notes

- **Thermal 4 × 6** direct-thermal labels are the standard; set the printer to 100% scale, no margins. Setup for phones and browsers is in [Thermal printer setup](/blog/thermal-printer-80mm-gst-bills-setup).
- On A4, print two labels and cut; use a plastic pouch so rain does not blur the barcode.
- Do not tape over the barcode; matte tape only if you must.
- Test one label by scanning it with the [barcode & QR scanner](/tools/barcode-scanner).

## Documents that go inside

The invoice goes inside the parcel (and a copy in the pouch for B2B): a [GST invoice](/tools/gst-invoice) for sales, a delivery challan for non-sale movements. Consignments over ₹50,000 need an e-way bill; the courier will ask for the number. For inter-state B2C e-commerce sales, GST registration is mandatory regardless of turnover and the invoice must show the place of supply.

## Cutting shipping cost

Chargeable weight is the higher of actual and volumetric (L × W × H ÷ 5000 for most couriers). A slightly smaller box is the cheapest optimisation there is; the fee stack for marketplaces is laid out in [Pricing for Amazon, Flipkart and Meesho](/blog/marketplace-pricing-amazon-flipkart-fees), and the [seller pricing workflow](/tools/seller-pricing) folds shipping into the listing price.

## Related tools

- [Volumetric weight calculator](/tools/volumetric-weight) — chargeable weight before you book.
- [Delivery challan](/tools/delivery-challan) — transport document for non-sale shipments.
- [GST invoice generator](/tools/gst-invoice) — the invoice inside the box.
- [Barcode generator](/tools/barcode-generator) — extra barcodes for cartons and SKUs.
- [On-time delivery rate](/tools/on-time-delivery) — track courier performance.

## FAQ

### Will the barcode scan at the courier hub?

Yes — the AWB is encoded as Code 128, the symbology courier scanners expect, at a size within their specification. Print at 100% scale and test one label.

### Can I use this label for Amazon or Flipkart orders?

For self-ship orders, yes. For orders fulfilled by the platform's logistics, use the label the platform generates; hubs reject substitutes.

### Where do I get an AWB number?

From your courier account, a courier aggregator (Shiprocket, Pickrr, iThink and others), or the marketplace's self-ship flow. The generator encodes whatever AWB you paste.

### What size should I print?

4 × 6 inches (100 × 150 mm) is the standard thermal label size accepted by every courier. A4 with two labels works for occasional shipments.

### Do I need an e-way bill for a parcel?

Only if the consignment value exceeds ₹50,000. Most e-commerce parcels are below the threshold; B2B consignments often are not.
