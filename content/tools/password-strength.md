---
updated: 2026-09-22
---
Most password advice is wrong in a specific way: it rewards symbols and punishes length. "Diwali@2024!" satisfies every corporate rule and falls in seconds to a dictionary attack with common substitutions; "yellow tractor ledger monsoon" satisfies none and holds for centuries. This checker estimates a password's **real resistance to cracking** — entropy in bits, time to brute-force at realistic attacker speeds, and pattern weaknesses like dictionary words, dates, keyboard walks and repeated characters — entirely in your browser. The password you type is never sent anywhere.

## How the score is computed

1. **Pattern analysis**: the checker looks for dictionary words (English, Hindi transliterations, Indian names and places), years and dates, keyboard sequences (qwerty, 12345), repeats (aaa, 121212), and l33t substitutions — and counts each as one "guess", not as random characters.
2. **Entropy**: what remains is scored as random characters from the sets used; log₂ of the search space gives bits.
3. **Crack time**: guesses ÷ attacker speed — from 10 per second (online, rate-limited) to 10 billion per second (offline against a leaked hash on GPUs).
4. **Verdict**: very weak to very strong, with the specific weaknesses listed and a suggestion.

"Shop@2024" scores about 25 bits — cracked offline in under a second. "kaagazo-ledger-cobra-72" scores above 70 bits — thousands of years at the same speed.

## How to use the checker

1. Type or paste the password; the analysis updates as you type. It is masked by default.
2. Read the entropy, the crack-time estimates for online and offline attacks, and the list of detected patterns.
3. Follow the suggestion — usually "add length" or "remove the dictionary word/date" — and re-check.
4. Generate a replacement with the [password generator](/tools/password-generator) if the verdict is below "strong".
5. Repeat for the handful of accounts that matter most: email, bank, GST portal, marketplace, social.

## What a strong password looks like

- 16 or more characters, or a passphrase of 4–6 random words.
- No name, shop name, city, vehicle number, phone number, or year.
- Unique to the account — reuse is the most common failure; a breach elsewhere becomes a login here.
- Backed by two-factor authentication.

Symbols help a little; length helps a lot. Two extra characters roughly multiply the search space by several thousand.

## Why this matters for a small business

Account takeover is the fastest-growing fraud against Indian SMEs: a compromised email leads to marketplace payout changes, GST portal access, or fake invoices sent to your customers with a different bank account. The attack patterns and the six-point defence are in [GST scam calls, fake notices and OTP fraud](/blog/gst-scam-calls-and-fake-notices). Website admin accounts are the other soft spot — the [WordPress hardening checklist](/blog/wordpress-7-1-1-click2shell-update-now-checklist) covers them.

## Related tools

- [Password generator](/tools/password-generator) — strong random passwords and passphrases.
- [Store WiFi QR](/tools/wifi-qr) — share a strong WiFi password without typing it.
- [Privacy policy generator](/tools/privacy-policy-generator) — state your security commitments.
- [Robots.txt generator](/tools/robots-txt) — keep admin paths out of search.
- [Barcode & QR scanner](/tools/barcode-scanner) — inspect QR payloads safely.

## FAQ

### Is my password sent to a server?

No. The analysis runs entirely in your browser. Even so, prefer testing a *similar* password rather than the exact one for your most critical accounts.

### Why does a long simple passphrase score higher than a short complex one?

Because attackers try dictionary words with substitutions first; length multiplies the search space far faster than symbols do.

### What entropy is "enough"?

Above 60 bits for important accounts; above 80 for anything protecting money or data at scale. Below 40 is crackable offline in seconds.

### Does adding my shop name help?

No — names and places are in attackers' word lists, including Indian ones. The checker flags them.

### Should I use the same strong password everywhere?

Never. One breach exposes all. Use a password manager and unique passwords, with 2FA on the important accounts.
