---
updated: 2026-09-22
---
A payment receipt closes the loop that an invoice opens. It tells the customer "we got your money", tells your accountant which invoice the money settled, and — for cash — gives you the paper trail income-tax rules expect. This generator produces itemised receipts for **UPI, cash, card, cheque and bank transfer**, prints on A4 or an 80 mm thermal roll, and can embed a UPI QR for the balance still due. Nothing is uploaded; the receipt is built in your browser and saved as PDF or PNG.

## Why a receipt is not the same as an invoice

An invoice is a **demand** for payment; a receipt is **evidence** of payment. Under GST you issue a tax invoice on supply and, when an advance comes in before supply, a *receipt voucher* under Rule 50 showing the amount and, for services, the tax on it. For payments against an already-issued invoice, a plain receipt is enough — there is no fresh GST. The differences between the four documents are laid out in [Invoice vs bill vs receipt vs quotation](/blog/invoice-vs-bill-vs-receipt-vs-quotation).

Customers ask for receipts most often when they pay cash, when a company is reimbursing an employee, and when they pay in instalments and want the running balance on paper.

## Cash: the rules that make receipts essential

- **Section 269ST** bars receiving ₹2 lakh or more in cash from a person in a day, for a single transaction, or for one event — with a penalty equal to the amount. A dated, numbered receipt is your proof of the amount and the mode.
- **Section 40A(3)** disallows business expenses paid in cash above ₹10,000 per person per day, so your business customers will insist on a receipt showing "UPI" or "NEFT" to keep the deduction.
- **Revenue stamp**: a ₹1 revenue stamp is customary on cash receipts above ₹5,000 under the Indian Stamp Act, though enforcement varies by state; the template leaves space for one.

The full set of limits is in [Cash transaction limits under income tax](/blog/cash-transaction-limits-income-tax-269st-40a3).

## What the receipt should show

| Element | Why |
|---|---|
| Receipt number and date | Sequential numbering makes audits painless |
| Received from | Customer name, phone or GSTIN |
| Amount in figures and words | Prevents tampering |
| Mode of payment | UPI (with UTR/reference), cash, cheque number and bank, NEFT/IMPS reference |
| Against invoice number(s) | Links the payment to the sale |
| Amount due before, paid now, balance | For part-payments and EMIs |
| Received by | Signature or name of the person collecting |

## How to use the generator

1. Fill your business details — they are remembered in local storage for next time.
2. Enter the customer, the invoice reference, and the amount received. Choose the mode; for UPI paste the 12-digit UTR from the app.
3. For part-payment, enter the total and the previously received amount; the receipt prints the balance and can carry a UPI QR for it.
4. Pick **A4** for email/print or **80 mm thermal** for a counter printer. The thermal layout uses a narrow font stack that prints crisply on 203 dpi rolls — setup notes are in [Thermal receipt printer setup](/blog/thermal-printer-80mm-gst-bills-setup).
5. Download, print or share on WhatsApp with one tap.

## Receipts for specific situations

- **Advances for services**: GST is payable on the advance in the month received; use the receipt as your Rule 50 voucher and show the tax component.
- **Security deposits**: not a supply, no GST; mark it clearly as refundable.
- **Rent**: use the dedicated [rent receipt generator](/tools/rent-receipt), which adds the landlord's PAN for HRA claims.
- **Tuition, memberships, subscriptions**: itemise the period covered so the customer's employer or insurer accepts it.

## Related tools

- [GST invoice](/tools/gst-invoice) — the document a receipt settles.
- [UPI QR standee](/tools/upi-standee) — a fixed counter QR for walk-in payments.
- [Rent receipt](/tools/rent-receipt) — HRA-ready receipts with PAN.
- [Late payment interest](/tools/late-payment-interest) — when the balance is overdue.
- [Barcode & QR scanner](/tools/barcode-scanner) — verify a customer's UPI QR before you pay a supplier.

## FAQ

### Is a payment receipt mandatory under GST?

For advances received before supply, yes — a receipt voucher under Rule 50. For payments against an invoice already issued, it is good practice and expected by customers, but not a GST requirement.

### Do I charge GST on a receipt?

No new tax. The receipt records money received against an invoice that already carries GST. The exception is an advance for services, where the tax becomes payable on receipt and should be shown.

### Should I put a revenue stamp on it?

Customary for cash receipts above ₹5,000; many businesses still do it and some customers ask. It is unnecessary for UPI, card or bank transfers.

### Can I issue a receipt for a partial payment?

Yes. Enter the invoice total and the amount received; the receipt shows the balance due, and you can embed a UPI QR for that balance.

### How long should I keep receipts?

GST records must be kept for 72 months from the annual return due date; the Income-tax Act expects books for six years from the end of the relevant assessment year. Keep PDFs in a dated folder or your accounting software.
