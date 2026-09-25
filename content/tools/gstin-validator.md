---
updated: 2026-09-26
---
Before you claim input tax credit on a supplier's invoice, before you add a new B2B customer, and before you pay an advance to someone you met on a marketplace, one 15-character string is worth thirty seconds of attention: the GSTIN. This validator checks the **format and the check digit** of any GST number in your browser, decodes the state, the PAN behind it and the type of taxpayer, and tells you exactly which character is wrong when it does not add up — then links you to the GST portal to confirm the registration is actually active.

## What the 15 characters mean

Take `27AAPFU0939F1ZV`:

| Position | Value | Meaning |
|---|---|---|
| 1–2 | `27` | State code — 27 is Maharashtra, 07 Delhi, 09 Uttar Pradesh, 29 Karnataka, 33 Tamil Nadu, 24 Gujarat |
| 3–12 | `AAPFU0939F` | The PAN of the business |
| 6th character overall (4th of the PAN) | `F` | Type of holder — F firm/LLP, C company, P individual/proprietor, H HUF, T trust, A AOP, G government |
| 13 | `1` | Entity number: the first registration of that PAN in that state; a second branch registration would be 2, then 3…9, A…Z |
| 14 | `Z` | Fixed for every GSTIN |
| 15 | `V` | Check digit, computed from the previous fourteen characters |

Because the PAN sits inside the GSTIN, a supplier's GST number and their PAN must agree — a mismatch between the two on an invoice is a reliable sign that something was typed wrong or invented.

## The check digit

The last character is not decorative. Each of the first fourteen characters is converted to a value (0–9 then A–Z as 10–35), multiplied alternately by 1 and 2, the quotient and remainder of each product on division by 36 are added up, and the check digit is whatever brings the total to the next multiple of 36. A single mistyped character almost always breaks it — which is why this tool catches transposed digits that look perfectly plausible to the eye. When the check fails, it shows the number with the correct final character so you can see whether it was a simple slip.

## How to use it

1. Paste the GST number from the invoice, the purchase order or the vendor form. Spaces, dashes and lower case are cleaned up automatically.
2. Read the verdict. A valid number shows the state, the PAN, the taxpayer type and how many registrations that PAN holds in the state.
3. If it fails, the message names the reason — wrong length, bad state code, malformed PAN, missing Z, or a check-digit mismatch.
4. Click through to the GST portal's search to confirm the registration is **active** and matches the legal name on the invoice.

## Format valid is not the same as registered

This tool proves a number is *well formed*. It cannot tell you whether the registration exists, is active, is suspended or cancelled, or belongs to the business named on the invoice — only the GST portal can, and it is free. Do both checks for any new supplier, because input tax credit depends on the supplier actually filing. The wider verification routine, including what to do when a GSTIN turns out to be cancelled, is in [How to verify a GST number (GSTIN)](/blog/how-to-verify-gstin-number-format).

## When to check a GSTIN

- **New supplier onboarding** — before the first [purchase order](/tools/purchase-order) goes out.
- **Every B2B invoice you receive**, at least for large amounts; a wrong GSTIN on your purchase means your credit will not appear in GSTR-2B.
- **Before invoicing a business customer** — a wrong GSTIN on the invoice you issue costs *them* the credit and gets the bill returned. The [GST invoice generator](/tools/gst-invoice) validates the field as you type.
- **Marketplace and tender counterparties**, where a plausible-looking but invented number is a common fraud.
- **Fake notices and calls** — scammers quote GST numbers that do not validate; the patterns are described in [GST scam calls, fake notices and OTP fraud](/blog/gst-scam-calls-and-fake-notices).

## Related tools

- [GST invoice generator](/tools/gst-invoice) — invoices with GSTIN validation built in.
- [HSN/SAC code finder](/tools/hsn-finder) — the other field auditors check.
- [GST calculator](/tools/gst-calculator) — CGST/SGST or IGST from the place of supply.
- [Purchase order](/tools/purchase-order) — capture the supplier's GSTIN up front.
- [GST filing calendar](/tools/gst-calendar) — when the credit actually lands.

## FAQ

### Does this check whether the GST number is active?

No. It validates the format and the check digit offline. Use the "Check status on the GST portal" link to confirm the registration is active and see the legal name and filing status.

### What does the 13th character mean?

It is the entity number — how many registrations that PAN holds in that state. `1` is the first, `2` the second branch or vertical, continuing 3–9 then A–Z.

### Can two businesses have the same GSTIN?

No. A GSTIN is unique to one PAN in one state. The same PAN gets a different GSTIN in each state it registers in, differing in the first two characters.

### Is my GST number sent to a server?

No. The validation runs entirely in your browser; nothing is uploaded or logged.

### What is a sample GSTIN I can test with?

`27AAPFU0939F1ZV` is the format example used in GST documentation, and the tool offers three more placeholder numbers with correct check digits. They are valid in structure but are not live registrations.
