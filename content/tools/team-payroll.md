---
updated: 2026-09-22
---
Payroll for a team of six should not need payroll software, a CA and an afternoon. This calculator does a month's payroll for **up to ten people at once**: gross salary or daily wage, days present and leave without pay, overtime, variable pay and incentives, employee PF and ESI, state professional tax, advances recovered and TDS — and gives you each person's net pay, your employer contributions, and the bank-transfer list. Everything runs in your browser; the team roster is saved locally so next month takes two minutes.

## What it computes for each employee

| Input | Output |
|---|---|
| Monthly gross (or daily rate × days) | Earned gross after LWP pro-rating (gross ÷ days in month × paid days) |
| Basic % | Basic + DA for PF and gratuity |
| Overtime hours and rate | OT at 2× under the Factories Act / most state acts |
| Variable pay, incentives, bonus | Taxable additions |
| PF (12% of basic, ₹25,000 ceiling optional) | Employee deduction and employer contribution |
| ESI (gross ≤ ₹21,000) | 0.75% employee, 3.25% employer |
| State | Professional tax slab |
| Advance recovery, other deductions | Net adjustments |
| TDS (monthly estimate) | Based on annual projection and regime |

The month's summary shows total gross, total deductions, total net payable, and the **employer's outgo** — net pay plus employer PF, ESI and statutory provisions — which is the number that hits your bank.

## How to use the calculator

1. Add employees once: name, gross, basic %, state, PF/ESI applicability. The roster is remembered in your browser.
2. Each month, enter days in the month, days paid (or LWP days), overtime, variable pay and any advances.
3. Review the per-employee card and the totals; fix anything that looks off.
4. Export the CSV for your bank's bulk NEFT upload and print [wage slips](/tools/wage-slip) for each person.
5. Deposit PF by the 15th, ESI by the 15th, PT and TDS by the state and income-tax deadlines.

## Statutory checklist for small employers

- **EPF**: mandatory at 20 employees, but voluntary registration below that is common; contributions on wages up to the ₹25,000 ceiling (effective 17 September 2026) or higher by choice. Employer cost is 13% including EDLI and admin. Read [EPF wage ceiling is now ₹25,000](/blog/epf-wage-ceiling-25000-what-changes-for-payroll).
- **ESI**: mandatory at 10 employees (in notified areas) for wages up to ₹21,000.
- **Professional tax**: register for PTRC in states that levy it; deduct and deposit monthly. State slabs are in the [professional tax calculator](/tools/professional-tax).
- **TDS on salary**: deduct if projected annual tax exceeds nil; issue Form 16 by 15 June.
- **Wage slips and registers** under the Code on Wages; pay by the 7th of the next month.
- **Bonus** under the Payment of Bonus Act for wages up to ₹21,000 — see the [statutory bonus calculator](/tools/statutory-bonus).

## Handling common situations

- **Mid-month joiners and leavers**: enter days paid; the tool pro-rates gross and deductions.
- **Daily-wage staff**: switch the row to daily rate × days; OT and PF still apply where covered.
- **Reimbursements** (fuel, phone) are not salary — pay them separately against bills.
- **Advances**: enter the recovery instalment; the running balance is remembered.
- **Regime**: the TDS estimate uses the employee's declared regime; the [in-hand salary calculator](/tools/in-hand-salary) shows an individual's detailed projection.

## Related tools

- [Wage slip generator](/tools/wage-slip) — print or share each slip.
- [In-hand salary calculator](/tools/in-hand-salary) — one employee in detail.
- [Employee cost calculator](/tools/employee-cost) — annual loaded cost per hire.
- [Professional tax calculator](/tools/professional-tax) — state-wise PT.
- [Business days calculator](/tools/business-days) — paid days in a month with holidays.

## FAQ

### Can I use this for more than ten employees?

The calculator is built for small teams up to ten. Beyond that, run it in batches or move to payroll software with statutory filings built in.

### Does it file PF and ESI returns?

No. It computes the amounts; you deposit and file ECR on the EPFO portal and the ESIC return yourself, or through your consultant.

### How is LWP deducted?

Gross ÷ calendar days in the month × LWP days, which is the method most Indian payrolls use. Some use 26 or 30 fixed days; set the divisor in options.

### Is the roster stored on your server?

No. It is saved in your browser's local storage only. Clearing site data removes it, so export a CSV backup.

### How is overtime paid?

At twice the ordinary hourly rate (gross ÷ 26 ÷ 8 by default) as required under the Factories Act and most Shops and Establishments Acts; you can change the multiplier.
