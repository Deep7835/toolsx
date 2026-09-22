---
updated: 2026-09-22
---
A barcode is the difference between a product that scans at any POS and one that gets typed in by hand — or refused by a distributor. This generator creates **print-ready barcodes** in the formats Indian retail actually uses: EAN-13 for packaged goods, UPC-A for exports to the US, Code 128 for internal SKUs, cartons and courier AWBs, ITF-14 for outer cases, and Code 39 for older systems. It renders at high resolution as PNG or SVG, in single labels or sheets, with human-readable digits and correct check digits, entirely in your browser.

## Which format do you need?

| Format | Use | Digits |
|---|---|---|
| EAN-13 | Retail products sold through modern trade, marketplaces, distributors | 13, with GS1 prefix (890 for India) |
| UPC-A | Products for US retail | 12 |
| Code 128 | Internal SKUs, shelf labels, cartons, AWB numbers, ID cards | Any length, alphanumeric |
| ITF-14 | Shipping cases containing EAN-13 items | 14 |
| Code 39 | Legacy warehouse and inventory systems | Alphanumeric, lower density |
| QR | Links and payments — use the [URL QR](/tools/url-qr) or [UPI](/tools/upi-standee) tools | — |

A **real EAN-13** for sale through Amazon, Flipkart, Reliance or DMart must come from a GS1 India company prefix (₹4,000–12,000 a year plus a one-time fee, depending on the number of codes). For internal use — your own shop's inventory, a Meesho listing without brand registry, a kirana's shelf labels — any unique number encoded as Code 128 or a self-assigned EAN-13 works. The trade-offs and registration steps are in [Barcodes for your products: EAN-13 vs Code 128, GS1 India](/blog/barcode-ean-gs1-india-for-products).

## How to use the generator

1. Choose the format. For EAN-13 enter 12 digits and the tool computes the 13th (check digit), or paste all 13 to validate.
2. Set size — width of bars (X-dimension), height, quiet zone — and whether to print the digits beneath.
3. Add a product name and price line if you want a full label; for grids, set columns and rows for A4 sheets or 50 × 25 mm thermal labels.
4. Download PNG (300 dpi) or SVG (vector, any size) or print directly.
5. Scan the printout with the [barcode & QR scanner](/tools/barcode-scanner) before printing a thousand.

## Printing rules that make barcodes scan

- **Size**: EAN-13 nominal is 37.29 × 25.93 mm; do not go below 80% magnification. Code 128 needs an X-dimension of at least 0.25 mm on office printers.
- **Quiet zone**: leave at least 10× the X-dimension of blank space on each side; the generator adds it.
- **Contrast**: black on white or a very light background; never red bars (scanners see red as white).
- **Print quality**: laser or thermal transfer; inkjet bleeds. Matte labels over glossy.
- **Placement**: on a flat surface, not across a seam or curve; for pouches, the back lower third.

## Labels and compliance

Packaged goods must also carry MRP, net quantity, manufacturer details, date and (for food) FSSAI number and veg/non-veg mark; the barcode is not a legal substitute for any of them. The [price tag generator](/tools/price-tag-generator) produces the MRP/offer label, and the FSSAI label checklist is in [FSSAI rules for small food businesses](/blog/fssai-labelling-rules-small-food-business).

## Related tools

- [Barcode & QR scanner](/tools/barcode-scanner) — verify your printed codes.
- [Price tag generator](/tools/price-tag-generator) — MRP and offer labels with barcodes.
- [Shipping label generator](/tools/shipping-label) — Code 128 AWB labels for parcels.
- [Staff ID card creator](/tools/staff-id-card) — ID barcodes for attendance.
- [Seller pricing workflow](/tools/seller-pricing) — before you list the product.

## FAQ

### Can I use a barcode from this tool on Amazon or Flipkart?

For listings that require GTIN/EAN, the number must come from GS1 (or the platform's exemption). This tool renders any number you have; it does not issue GS1 numbers.

### What is the check digit?

The last digit of an EAN-13 or UPC-A, computed from the others so scanners can detect misreads. The generator calculates it automatically.

### Which format for my own shop's inventory?

Code 128 with your own SKU numbers. It is compact, alphanumeric, and every POS scanner reads it.

### What label size should I print?

50 × 25 mm thermal labels are standard for small products; 100 × 50 mm for cartons. Keep the barcode at least 30 mm wide for EAN-13.

### Does the generator store my product data?

No. Codes are rendered locally in your browser and nothing is uploaded.
