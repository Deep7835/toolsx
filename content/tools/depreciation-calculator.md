---
updated: 2026-09-22
---
Depreciation is where accounting and tax go their separate ways in India. The Income-tax Act uses **written-down value on a block of assets** at prescribed rates; the Companies Act 2013 uses **useful lives** from Schedule II and lets you choose straight-line or WDV. Small businesses need both — one for the tax return, one for the books — and get them wrong in predictable ways (full-year depreciation on a March purchase, or 60% on a laptop bought after 2017). This calculator produces both schedules year by year, with the half-year rule, additional depreciation for manufacturers, and residual value handling.

## Income-tax depreciation: block of assets

Under Section 32, assets are grouped into blocks with the same rate; depreciation is charged on the block's opening WDV plus additions minus sale proceeds. Key rates as of FY 2026-27:

| Block | Rate |
|---|---|
| Residential buildings | 5% |
| Non-residential buildings; furniture and fittings | 10% |
| Plant and machinery (general); motor cars | 15% |
| Commercial vehicles used for hire (taxis, buses, lorries) | 30% |
| Computers, software, books, pollution-control equipment | 40% |
| Intangibles — patents, know-how, licences, franchises | 25% |
| Purely temporary structures | 40% |

Two rules bite: **the half-rate rule** — an asset put to use for fewer than 180 days in the year gets half the rate for that year — and **additional depreciation** of 20% for manufacturers buying new plant and machinery (10% if used under 180 days, with the balance next year). Businesses opting for the concessional 22%/15% corporate tax regimes forgo additional depreciation. The Income Tax Act 2025, effective from 1 April 2026, keeps these rates and blocks intact; what did change is summarised in [Income Tax Act 2025: what actually changes](/blog/income-tax-act-2025-what-changes-from-april-2026).

## Companies Act depreciation: useful lives

Schedule II prescribes useful lives — 3 years for laptops and desktops, 6 for servers, 8 for motor cars, 10 for furniture, 15 for general plant, 30 or 60 for buildings — and a residual value of up to 5%. Under **SLM** the annual charge is (cost − residual) ÷ life. Under **WDV** the rate is 1 − (residual ÷ cost)^(1 ÷ life), which front-loads the charge. Companies may justify different lives with technical evidence but must disclose it. LLPs and proprietorships are not bound by Schedule II but often follow it for consistency.

## How to use the calculator

1. Enter the asset cost (including installation, freight and non-creditable GST) and the date it was put to use.
2. Choose **Income-tax** and the block, or **Companies Act** and the asset class; for Companies Act pick SLM or WDV and set the residual percentage.
3. Tick "manufacturer, new plant" for additional depreciation where eligible.
4. Read the year-wise schedule — opening value, depreciation, closing WDV — and export it as CSV for your fixed-asset register.
5. For a block with several assets, run each and add, or enter the block's opening WDV as the cost.

## GST and the asset cost

If you claim input tax credit on the asset, the cost for depreciation is the price **excluding** GST — Section 16(3) bars depreciation on the tax component you have credited. If ITC is blocked (motor cars for most businesses, works-contract on buildings), include the GST in cost. Check the invoice with the [GST calculator](/tools/gst-calculator) before capitalising.

## Practical notes

- Buy before **1 October** to get the full-year rate; a 2 October purchase gets half.
- When you sell an asset from a block, reduce the block by the sale price — no gain arises unless the block goes negative or empty.
- Keep a fixed-asset register with invoice numbers; assessors ask for it when depreciation is large. The [purchase order](/tools/purchase-order) and [GST invoice](/tools/gst-invoice) tools keep the paper trail tidy.
- For EBITDA and profitability reviews, add depreciation back — see the [EBITDA calculator](/tools/ebitda-calculator).

## Related tools

- [Income tax calculator](/tools/income-tax) — where the depreciation deduction lands.
- [EBITDA calculator](/tools/ebitda-calculator) — operating profit before depreciation.
- [EMI calculator](/tools/emi-calculator) — if the asset is loan-financed, interest is a separate deduction.
- [Employee cost calculator](/tools/employee-cost) — the other big fixed cost.
- [Percentage calculator](/tools/percentage-calculator) — quick rate arithmetic.

## FAQ

### What is the depreciation rate on a laptop for income tax?

40%, under the computers block, on WDV. Bought and used for fewer than 180 days in the year, it gets 20% that year.

### Can I claim full depreciation on an asset bought in March?

No. An asset used for fewer than 180 days in the financial year gets half the normal rate; the full rate applies from the next year on the remaining WDV.

### Which method should a private limited company use?

Either SLM or WDV under Schedule II, applied consistently. Most small companies use SLM for simplicity; tax depreciation is computed separately on the WDV block method regardless.

### Is GST included in the asset cost?

Only when you cannot or do not claim input credit on it. If you claim ITC, depreciate the value excluding GST.

### What happens when I sell an asset?

For income tax, reduce the block's WDV by the sale price. If the block becomes empty or negative, the difference is a short-term capital gain or a terminal loss.
