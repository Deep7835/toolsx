---
title: "How to make a UPI QR code for your shop — free, in two minutes, no app required"
description: "Three ways to get a UPI QR code (your bank app, a payment app, or generate one yourself), how the upi:// format works, static vs dynamic QR with amount, print sizes, and how to check your code before printing 100 copies."
date: "2026-09-21"
kind: guide
hero: true
tags: [upi, payments, retail]
tools: [upi-standee, gst-invoice, payment-receipt, barcode-scanner]
---

A UPI QR code is nothing more than your UPI ID written in a standard format that every payment app can read. You do not need a soundbox, a merchant account or an agent to get one — though each of those adds something. Here is how to make one yourself, what the options are, and the checks to do before you print.

## The three routes

| Route | Best for | Time | Cost |
|---|---|---|---|
| **Your bank / UPI app** (GPay, PhonePe, Paytm, BHIM, bank app → "My QR") | Individuals, very small sellers | 1 minute | Free |
| **Merchant onboarding** (PhonePe for Business, Paytm for Business, BharatPe, bank merchant QR) | Shops wanting a soundbox, settlement reports, a business VPA, MDR-exempt P2PM tagging | 1–2 days | Free; soundbox ₹1–2/day |
| **Generate your own** from your VPA (this guide) | Standees, invoices, receipts, delivery cards, menus — any print material | 2 minutes | Free |

All three produce codes that customers scan with any UPI app. The difference is on *your* side: a merchant VPA shows your business name to the customer and gives you proper reports.

## How a UPI QR works

The QR encodes a link in this format:

```
upi://pay?pa=shop@okicici&pn=Sharma%20Electricals&cu=INR
```

- `pa` — your UPI ID (VPA)
- `pn` — payee name shown in the app
- `am` — amount (optional; makes it a **dynamic** QR)
- `tn` — transaction note (optional, e.g. invoice number)
- `cu` — currency, always INR

Any QR generator that can encode text can make one, but a purpose-built tool avoids mistakes with encoding spaces and symbols.

## Make one in two minutes

1. Open the [UPI standee tool](/tools/upi-standee).
2. Enter your UPI ID and the name customers should see.
3. Pick A5 (counter) or A4 (wall), a colour, and optionally a fixed amount.
4. Download the PDF (print-quality) or PNG (for WhatsApp).
5. **Scan it yourself** with the [scanner](/tools/barcode-scanner) — it decodes the QR and shows the exact VPA and any amount. If it isn't yours, don't print.

For bills, use a **dynamic** QR: the [GST invoice generator](/tools/gst-invoice) and [payment receipt tool](/tools/payment-receipt) embed one carrying the exact amount and the invoice number, so customers can't mistype and your reconciliation is automatic.

## Print it right

- **Size:** at least 5 × 5 cm at the counter, 8–10 cm if customers scan from a metre away.
- **Contrast:** black on white. Coloured or inverted codes scan badly.
- **Error correction H** so a scratch or a small logo in the middle doesn't break it (the tool defaults to H).
- **Quiet zone:** keep white space around the code; don't crop to the edge.
- **Matte lamination**, not glossy.

Full checklist in [UPI QR standee best practices](/blog/upi-qr-standee-best-practices).

## Fees in 2026

Receiving UPI is free for small merchants (up to ₹1 lakh a month via UPI QR). From 15 October 2026, larger merchants pay 0.4% (capped ₹300) on transactions above ₹2,000, with a flat ₹5 for fuel, railways and telecom. Person-to-person and all transactions up to ₹2,000 stay free. Details in the [MDR explainer](/blog/upi-mdr-from-15-october-npci-circular-explained).

## Common questions at the counter

- **"Payment nahi aaya"** — check the transaction ID in your app; ask the customer to show the "success" screen with your name and the UTR. Print the UTR on the receipt.
- **"Scan nahi ho raha"** — dirty or reflective lamination, code too small, or the customer's camera; keep a second copy at phone height.
- **"Can I pay ₹2 lakh?"** — per-transaction limits are set by the customer's bank (usually ₹1 lakh); split or use bank transfer.

## FAQ

### Do I need a merchant account to accept UPI?
No. A personal VPA works. A merchant VPA (free from your PSP) shows your business name, gives settlement reports and is what NPCI uses for P2PM classification.

### Can one QR code accept any amount?
Yes — a static QR without `am` lets the customer type the amount. Add `am` to fix it.

### Is it safe to print my UPI ID publicly?
Yes. A VPA can only *receive* money; nobody can debit your account with it. Never share the UPI PIN.

### Can I put my QR on my website or Instagram?
Yes — customers can scan from another device, or tap a UPI link on mobile. Use a static QR; check it monthly for tampering if it's on a physical surface.
