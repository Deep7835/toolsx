---
updated: 2026-09-22
---
"What's the WiFi password?" is asked at every café, clinic, coworking desk and guest house a hundred times a week — and answered by reading a 16-character string aloud while the customer types it wrong. A WiFi QR code fixes this: the customer points the camera, taps "Join", and is connected. This generator creates the standard `WIFI:` QR that Android and iPhone cameras recognise natively, with your network name, password and security type, and gives you a printable card or sticker you can place at the counter, on tables, or in rooms.

## How a WiFi QR works

The QR encodes a short text record — `WIFI:T:WPA;S:YourNetwork;P:YourPassword;;` — that both Android (since 10) and iOS (since 11) understand. The camera app shows a "Join network" prompt; the phone saves the credentials like any manually entered network. Nothing is sent to Kaagazo: the QR image is generated in your browser and the password never leaves your device.

You can also encode a **hidden** network (the phone still joins if the SSID is marked hidden) and an open network with no password — though we recommend against open networks for a business.

## Where businesses use it

- **Cafés and restaurants**: table tents next to the [menu QR](/tools/menu-creator) and the [UPI QR](/tools/upi-standee).
- **Clinics and salons**: a waiting-room card so patients stop asking reception.
- **Hotels, homestays and PGs**: in-room cards with the guest network only.
- **Offices and coworking spaces**: a guest-network QR at the front desk instead of a shared password in the WhatsApp group.
- **Retail showrooms**: customers who join your WiFi can browse your catalogue and pay faster.

## Security basics before you print

- **Use a separate guest network.** Every consumer router (Jio, Airtel, TP-Link, D-Link) offers a guest SSID that cannot see your billing PC or CCTV DVR. Print the QR for the guest network only.
- **WPA2 or WPA3**, never WEP or open. The generator defaults to WPA/WPA2.
- **Rotate the password** every few months or after staff changes; regenerate and reprint the card — it takes a minute. The [password generator](/tools/password-generator) makes a strong but typeable passphrase.
- **Cap the guest bandwidth** in the router so one customer's video call does not stall your UPI terminal.
- **Do not print the admin password anywhere**, and change the router's default login.

## How to use the generator

1. Type the network name (SSID) exactly as it appears on phones — it is case-sensitive.
2. Enter the password and choose the security type (WPA/WPA2 for almost everyone).
3. Tick "hidden network" only if you have disabled SSID broadcast in the router.
4. Choose a card layout — table tent, A6 card or sticker — and add a line such as "Free WiFi · Scan to connect".
5. Download PNG or PDF, print, and test with an iPhone and an Android before laminating.

## Design tips

- Keep the QR at least 3 cm wide; 4–5 cm for wall placement.
- Black on white scans fastest; keep any brand colour to the border.
- Add the SSID in text beneath the QR for guests on older phones who still type it in.
- If you also want a QR for your Instagram or Google reviews, make one with the [URL QR generator](/tools/url-qr) and the [Google review request builder](/tools/google-review), and keep them visually distinct so customers scan the right one.

Router and admin credentials are part of basic security hygiene; the OTP and account-takeover scams targeting small businesses are described in [GST scam calls, fake notices and OTP fraud](/blog/gst-scam-calls-and-fake-notices), and website-side hardening in [WordPress security checklist](/blog/wordpress-7-1-1-click2shell-update-now-checklist).

## Related tools

- [UPI QR standee](/tools/upi-standee) — the payment QR beside it.
- [Menu creator & QR](/tools/menu-creator) — for cafés and restaurants.
- [Password generator](/tools/password-generator) — a strong guest password.
- [Password strength checker](/tools/password-strength) — test the one you already use.
- [vCard contact QR](/tools/vcard-qr) — let visitors save your number in one scan.

## FAQ

### Does it work on iPhone?

Yes. iOS 11 and later recognise WiFi QR codes in the Camera app and show a "Join network" banner. Android 10 and later do the same; older Android phones need a QR app.

### Is my password sent anywhere?

No. The QR is rendered locally in your browser. Kaagazo has no server that receives the SSID or password.

### Can guests see my password after scanning?

On most phones the password is saved but hidden. Anyone can decode the QR with a scanner app, though — which is why you should print it only for a guest network.

### What if I change the password?

Generate a new QR and replace the cards. Old QRs will simply fail to connect.

### Can I make one QR for 5 GHz and 2.4 GHz?

If both bands share one SSID and password (the default on most routers), one QR covers both. If you have separate SSIDs, make two cards or merge the bands in the router settings.
