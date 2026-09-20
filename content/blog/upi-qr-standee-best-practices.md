---
title: "UPI QR standee: the checklist for a counter QR that actually gets scanned"
description: "Static vs dynamic QR, why your standee should show the name customers expect, print sizes that scan from a metre away, error correction, placing it so phones can reach, and the fraud-swap check every shop should do weekly."
date: "2026-01-08"
updated: "2026-09-07"
kind: guide
hero: true
tags: [upi, payments, retail]
tools: [upi-standee, barcode-scanner, gst-invoice, payment-receipt]
---

A UPI QR is the cheapest piece of payment infrastructure ever built — free to make, free to accept (for small merchants). But a bad standee loses sales: too small to scan, wrong name that makes customers hesitate, placed where a phone can't reach. Here is the checklist.

## Static vs dynamic

| | Static QR (standee) | Dynamic QR (on bill) |
|---|---|---|
| Amount | Customer types it | Embedded — exact |
| Where | Counter, door, table | Invoice, receipt, WhatsApp |
| Errors | Typos in amount happen | None |
| Best for | Small tickets, walk-ins | Bills above ₹500, deliveries, credit settlement |

Use both: a static standee from the [UPI standee tool](/tools/upi-standee) at the counter, and dynamic QRs on invoices from the [GST invoice generator](/tools/gst-invoice) or [receipt tool](/tools/payment-receipt).

## The name on the QR

When a customer scans, their app shows the **payee name** from the VPA. If your VPA is `9876543210@ybl` and the name shows "RAMESH KUMAR" while your board says "Sharma Electricals", a first-time customer pauses. Fixes:

- Get a **merchant VPA** from your PSP in the business name (`sharmaelectricals@ybl`).
- Print the expected name on the standee: "Payee name will show as: Ramesh Kumar".

## Size and print

- **Minimum QR size: 5 × 5 cm** for scanning from arm's length; **8–10 cm** for a wall-mounted or hanging standee that people scan from a metre away.
- Print at **300 dpi** from the PDF export, not a screenshot.
- **Error correction level H** (30%) survives scratches, tape and a small logo in the centre; the standee tool uses H by default.
- **Quiet zone**: keep a white margin at least 4 modules wide around the code — don't crop it to the edge.
- Matte lamination; glossy reflects shop lights and defeats cameras.
- Black on white. Coloured QRs look nice and scan worse; if you must, keep contrast above 4:1 and never invert (light code on dark).

## Placement

- **At the point of payment, at phone height** (100–130 cm) — not behind the cashier's head.
- Not under a glass counter that reflects.
- One QR per counter. Multiple QRs confuse the app's camera.
- On delivery bikes: a laminated card with the QR, so customers can pay at the door.

## The weekly fraud check

QR-swap fraud — someone sticks their own QR over yours — is real. Every week:

1. Scan your own standee with the [scanner](/tools/barcode-scanner) — it decodes the QR and shows the exact VPA.
2. Confirm the VPA is yours.
3. Check that no sticker has been layered on top.

Also enable transaction alerts so you see every credit in real time and can match it to the bill.

## Content beyond the QR

- Business name and phone.
- "Scan & pay · GPay · PhonePe · Paytm · BHIM" — customers look for their app's name.
- Optional: fixed-amount standees for single-price items (₹20 chai, ₹50 parking).
- A second, smaller QR for Google reviews on the same standee doubles as your review engine.

## Multiple counters or staff

Use one merchant VPA with a PSP that gives **per-QR identifiers** (most soundbox providers do) so you can see which counter or staff member collected what. Soundboxes cost ₹1–2/day and stop "sir, payment nahi aaya" disputes.

## FAQ

### Is a UPI QR free to make?
Yes. Any static UPI QR is just your VPA encoded in the standard format; the [standee tool](/tools/upi-standee) generates one at print resolution without any account.

### Can customers pay any amount with a static QR?
Yes, up to their app/bank limit (typically ₹1 lakh per transaction).

### Should I print my mobile number-based VPA?
It works, but a business-name VPA looks more trustworthy and survives a change of phone number.

### Do I need a soundbox?
Not for a low-volume counter; transaction alerts on your phone suffice. For busy counters, a soundbox removes the need to check the phone.
