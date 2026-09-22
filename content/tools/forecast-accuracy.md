---
updated: 2026-09-22
---
A sales forecast is only useful if you know how wrong it usually is. Order 500 units on a forecast that is typically 30% high and you carry dead stock through the festive season; order on one that is typically 20% low and you stock out on Dhanteras. This calculator measures **forecast accuracy** for any period — absolute error, percentage error, MAPE across multiple periods, and bias (do you consistently over- or under-forecast?) — so you can set safety stock and staffing with numbers instead of nerves.

## The metrics

| Metric | Formula | Reading |
|---|---|---|
| Forecast error | Actual − Forecast | Positive: you under-forecast; negative: you over-forecast |
| Absolute % error (APE) | \|Actual − Forecast\| ÷ Actual × 100 | Error relative to what really happened |
| Forecast accuracy | 100% − APE | 85% means you were within 15% |
| MAPE | Mean of APE across periods | The typical miss over a season |
| Bias | Mean of (Actual − Forecast) ÷ Actual | Direction of systematic error |

Forecast ₹8,00,000, actual ₹9,20,000 → error +₹1,20,000, APE 13%, accuracy 87%. Across six months with APEs of 8, 13, 22, 5, 11 and 17%, MAPE is 12.7%.

## How to use the calculator

1. Enter forecast and actual for one period, or paste up to 24 periods (months, weeks, or festive windows) in the table.
2. Read accuracy, APE and error for each period, then MAPE and bias for the set.
3. Segment by product line or channel — accuracy for online orders often differs from the counter.
4. Use MAPE to size safety stock: at 13% MAPE on 500 units, keeping ~65 extra units covers a typical miss.
5. Recheck after each quarter; forecasting improves fastest when errors are reviewed monthly.

## Why bias matters more than accuracy

Two shops both have 15% MAPE. One misses randomly in both directions; the other always forecasts 15% high because the owner "plans for growth". The first needs safety stock; the second needs to cut forecasts by 15% — and is quietly tying up cash in inventory every month. The bias line separates the two. Use the [inventory turnover calculator](/tools/inventory-turnover) to see the cash cost of chronic over-forecasting.

## Better forecasts for small businesses

- **Start from last year, adjust for growth**: the [revenue growth rate](/tools/revenue-growth) gives the trend; the [CAGR calculator](/tools/cagr-calculator) the longer view.
- **Separate base and festive demand**: Diwali, Eid, wedding season and back-to-school need their own forecasts — the eight-week plan in [Festive season 2026 checklist](/blog/festive-season-2026-retail-checklist-diwali) walks through it.
- **Account for known shocks**: price changes after the GST rationalisation, a competitor's opening, a bank-strike week, quick-commerce entry in your area.
- **Forecast in units, then rupees**: price changes distort rupee comparisons.
- **Track the pipeline** for B2B: the [marketing funnel calculator](/tools/marketing-funnel) turns leads into an expected-orders forecast.

## Using accuracy in planning

- **Purchasing**: order quantity = forecast + safety stock based on MAPE and lead time.
- **Staffing**: schedule to the forecast, keep on-call staff for the upper error band.
- **Cash**: a forecast that is 20% high overstates cash inflow; plan working capital on the lower bound, especially around GST and payroll dates on the [GST calendar](/tools/gst-calendar).
- **Targets**: set sales targets from the forecast, then measure [budget variance](/tools/budget-variance) against actuals.

## Related tools

- [Budget variance calculator](/tools/budget-variance) — planned vs actual for costs and revenue.
- [Revenue growth rate](/tools/revenue-growth) — the trend feeding next period's forecast.
- [Inventory turnover](/tools/inventory-turnover) — the cost of forecasting high.
- [Marketing funnel](/tools/marketing-funnel) — pipeline-based forecasting for B2B.
- [Capacity utilization](/tools/capacity-utilization) — can you deliver the forecast?

## FAQ

### What is a good forecast accuracy?

For a small retailer, 80–90% (MAPE of 10–20%) at the monthly total level is realistic; individual SKUs will be worse. Aim to reduce bias first, then variance.

### Should I measure error against forecast or actual?

Against actual (APE = error ÷ actual) — that is the standard MAPE definition. Some teams divide by forecast; be consistent.

### What if actual sales were zero in a period?

APE is undefined when actual is zero; the calculator flags the period and excludes it from MAPE. Use absolute error in units for such periods.

### How many periods should I use?

At least 6 for a meaningful MAPE, 12 to capture seasonality. Weight recent periods more if your business is changing quickly.

### How do I turn MAPE into safety stock?

A simple rule: safety stock ≈ forecast × MAPE (or × 1.5 × MAPE for critical items), adjusted for supplier lead time. Refine it as you gather more data.
