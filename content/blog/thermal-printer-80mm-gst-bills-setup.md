---
title: "Thermal receipt printer setup for GST bills: 80 mm vs 58 mm, what to buy, and how to print from a phone or browser"
description: "The complete guide to running a shop counter on a thermal printer — paper widths, Bluetooth vs USB vs LAN, which printers work with Android and Windows, driver setup, GST-compliant receipt layout, and the paper that fades."
date: "2026-01-30"
updated: "2026-09-02"
kind: guide
hero: true
tags: [retail, billing]
tools: [payment-receipt, wage-slip, gst-invoice, shipping-label]
---

A thermal printer is the difference between a handwritten kachcha bill and a receipt customers keep. They cost ₹2,000–8,000, need no ink, and print a GST-compliant bill in two seconds. "Thermal printer for shop" and "80mm bill format" are perennial searches — here's the guide to buying and running one.

## 58 mm or 80 mm?

| | 58 mm (2 inch) | 80 mm (3 inch) |
|---|---|---|
| Print width | ~48 mm, ~32 characters | ~72 mm, ~48 characters |
| Fits | Item, qty, amount — tight | Item, HSN, qty, rate, GST, amount |
| GST bill with tax breakup | Cramped | Comfortable |
| Paper cost | Lower | Slightly higher |
| Typical use | Food carts, parking, small kiosks | Retail, pharmacy, restaurants, salons |

For any business issuing GST bills with CGST/SGST lines, **80 mm** is the right choice. The [payment receipt tool](/tools/payment-receipt) and [wage slip generator](/tools/wage-slip) have an 80 mm thermal layout that prints edge to edge.

## Connectivity

- **USB**: cheapest, reliable, needs a PC/laptop at the counter.
- **Bluetooth**: prints from Android phones and tablets; pair once. Best for mobile shops and delivery.
- **LAN/Wi-Fi**: multiple devices print to one printer; good for restaurants with kitchen and counter printers.
- **Auto-cutter**: worth the extra ₹1,000 for busy counters.

Popular models in India in the ₹2,500–7,000 range: TVS-E RP 3160 series, Epson TM-T82, Everycom EC-80, Xprinter XP-80, and several Bluetooth 58 mm units for delivery riders. Check for **ESC/POS** support — the universal command set.

## Printing from a browser (no software)

Every tool on this site prints via the browser's print dialog:

1. Open the receipt/slip tool, fill the details, choose the **thermal** layout.
2. Click **Print**. In the dialog, choose your thermal printer, set paper size to **80 × 297 mm** (or "Receipt 80mm" if the driver offers it), margins to **none**, scale **100%**.
3. Save these as the default; subsequent prints are one click.
4. Alternatively, **Download PDF** — the file is sized to the paper width and prints correctly from any device.

On Android, Chrome's print dialog finds Bluetooth printers via the manufacturer's print service app (or "RawBT" for ESC/POS printers).

## Driver setup on Windows

Install the manufacturer's driver, set the paper size to 80 mm × receipt, and print a test page. If the receipt is cut off on the right, the page width is set to A4 somewhere — fix it in the printer's Printing Preferences, not just the browser.

## A GST-compliant thermal receipt

Must have: business name, address, GSTIN; invoice number and date; item description, quantity, rate; taxable value; CGST/SGST (or IGST) with rate; total; and for B2B, the buyer's GSTIN. HSN codes are needed if turnover exceeds ₹5 crore (or for B2B otherwise, at 4 digits). Amount in words is good practice. Keep the QR for UPI at the bottom — it should be at least 25 mm wide to scan.

## Paper: the part everyone regrets

Thermal paper is coated; it **fades** in months if exposed to heat, sunlight or plastic (PVC sleeves). For records:

- Keep the digital copy — the PDF export is your permanent record.
- Buy **BPA-free, 55 gsm or heavier** rolls; cheap 48 gsm paper jams and fades faster.
- Store rolls away from sunlight; a printed receipt in a wallet fades in weeks.
- For warranty receipts customers keep, print an A4 invoice or send the PDF on WhatsApp.

## Maintenance

Wipe the print head with isopropyl alcohol monthly. Never pull paper backwards through the cutter. If prints are faint, it's usually low-quality paper or a dirty head, not a dying printer.

## FAQ

### Can I print A4 invoices and thermal receipts from the same tool?
Yes — the receipt tool toggles between A4 and 80 mm thermal layouts.

### Do I need billing software to use a thermal printer?
No. A browser tool that outputs a thermal-sized page or PDF is enough for most counters.

### Why does my Bluetooth printer print blank pages?
Wrong paper type in the driver (thermal printers print blank on the wrong side) or the roll is loaded upside down. The coated side faces the print head.

### Is a thermal receipt legally valid for GST?
Yes, if it carries the mandatory fields. Keep a digital copy for the 6-year retention requirement, since thermal prints fade.
