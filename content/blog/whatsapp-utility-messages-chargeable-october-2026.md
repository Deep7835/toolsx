---
title: "WhatsApp just started charging for order updates: the 24-hour free window ended on 1 October"
seoTitle: "WhatsApp utility messages are chargeable from 1 Oct"
description: "Meta now bills utility messages sent inside the customer-service window at about ₹0.115 each before GST, and gives each business number 1,000 free service replies a month. What it costs a shop sending order and delivery updates — and how to stay near zero."
seoDescription: "From 1 October 2026 WhatsApp bills utility messages inside the 24-hour window at about ₹0.115 each, with 1,000 free service replies a month per number."
date: "2026-10-02"
updated: "2026-10-02"
kind: trending
tags: [whatsapp, marketing, retail, payments]
tools: [whatsapp-direct, payment-receipt, google-review, social-post, first-response-time]
---

Until last week, a business on the WhatsApp Business Platform could send order confirmations and delivery updates free as long as the customer had messaged in the last 24 hours. That window closed on **1 October 2026**. Meta now charges for **utility messages inside the service window**, at roughly **₹0.115 per delivered message in India before GST** — about ₹0.136 with 18% GST — while giving each business phone number **1,000 free service replies a month**.

For most small shops this is a few hundred rupees a month at worst. For anyone running automated order flows at volume, it is a line item that needs watching from today.

## What changed, precisely

| Message type | Before 1 October 2026 | From 1 October 2026 |
|---|---|---|
| Service replies (your answer inside a customer-initiated conversation) | Free | **First 1,000 per business number per month free**, charged after that |
| Utility messages (order confirmation, dispatch, delivery, payment receipt) sent inside the 24-hour window | Free | **Charged** at the India utility rate, about ₹0.115 + GST |
| Utility messages outside the window | Charged | Charged |
| Marketing messages | Charged (roughly ₹0.78–0.80) | Charged |
| Authentication / OTP | Charged | Charged |
| Click-to-WhatsApp ads and Page CTA entry points | 72-hour free window | **72-hour free window retained** |
| Customers messaging you | Free | Free |

The free-reply counter resets on the 1st of each month and does not carry over. Customers are never charged.

Our fuller breakdown of how the per-message model works — written before this change — is in [WhatsApp Business per-message pricing](/blog/whatsapp-business-per-message-pricing-2026); the 24-hour free-utility position described there no longer holds.

## Does this hit you at all?

Only if you are on the **WhatsApp Business Platform (the API)**, directly or through a provider like AiSensy, Interakt, Wati or Gupshup. If you run the free **WhatsApp Business app** on a phone and type replies yourself, you send nothing through the platform and pay Meta nothing. Most kiranas, salons, tailors and single-location restaurants are in the second group and can stop reading here.

If you are on the API, your provider adds its own markup and platform fee on top of Meta's rate, so check their October price sheet rather than assuming ₹0.115.

## What it actually costs

Work it out per order, not per message. A typical D2C flow sends four utility messages — order confirmed, packed, shipped with tracking, delivered:

- 4 × ₹0.115 = ₹0.46 + GST ≈ **₹0.54 per order**
- 500 orders a month ≈ **₹270**
- 3,000 orders a month ≈ **₹1,630**

Add service replies beyond the free 1,000: a store answering 1,800 customer messages a month pays for 800 of them, about ₹92 + GST. Against a ₹600 average order value, the whole thing is under 0.1% of revenue — materially cheaper than the [UPI MDR](/tools/upi-mdr-calculator) on the same orders, and far cheaper than a missed delivery call.

The GST on your provider's invoice is **input tax credit** if you are registered, so give them your GSTIN if you have not.

## Five ways to keep the bill near zero

1. **Merge the updates.** "Packed" and "shipped" in one message with the tracking link halves that flow. Send three messages per order, not six.
2. **Use the free service window for what it is for.** Replies to a customer who messaged you are free for the first 1,000 a month — answer questions there rather than pushing a templated utility message.
3. **Keep click-to-WhatsApp ads in the mix.** Conversations started from a CTWA ad or a Page button still carry a 72-hour free window, which covers most of a purchase conversation.
4. **Put the tracking link where it costs nothing**: on the [payment receipt](/tools/payment-receipt) PDF and the dispatch email, so the WhatsApp message becomes optional rather than the only channel.
5. **Do not pay to chase reviews.** A review request is better asked at the counter or on the bill via a QR from the [Google review request builder](/tools/google-review) than as a paid message.

And the first-order fix that costs nothing at all: answer faster. A business that replies inside the free service window converts better than one that pays for a template an hour later — measure it with the [first response time](/tools/first-response-time) calculator.

## The rules have not relaxed

Pricing changed; consent did not. Promotional and marketing templates still need opt-in, template approval and DLT-style registration discipline, and TRAI's 2026 anti-spam norms apply to business messaging — see [TRAI's new anti-spam rules](/blog/trai-anti-spam-rules-2026-businesses-that-call-or-message-customers). Sending marketing content under a utility template is the fastest way to lose template approval and, eventually, the number.

## If you are on the free app, you are fine

Keep a [wa.me link](/tools/whatsapp-direct) in your Instagram bio, on your website and on packaging, use quick replies for the ten questions you answer every day, and you will pay Meta nothing. The API is worth it when you cannot keep up by hand — roughly past 50–100 conversations a day, or when order updates need to fire automatically from a shop system.

## FAQ

### What exactly became chargeable on 1 October 2026?

Utility messages — order confirmations, dispatch and delivery updates, payment confirmations — sent inside the 24-hour customer-service window, which used to be free on the WhatsApp Business Platform.

### How much does a utility message cost in India now?

About ₹0.115 per delivered message before tax, roughly ₹0.136 with 18% GST. Your API provider's markup sits on top of that.

### How many free messages do I get?

Each business phone number gets 1,000 free service replies a month. The count resets on the 1st and unused messages do not carry over.

### Does this affect the free WhatsApp Business app?

No. If you reply manually from the app on a phone, nothing changes and you pay Meta nothing. The charges apply to the WhatsApp Business Platform (API).

### Are customers charged?

No. Customers message businesses and receive replies free as before.

### Can I claim the GST on WhatsApp charges?

Yes, if you are GST-registered and your provider's invoice carries your GSTIN. Add it to their billing profile.
