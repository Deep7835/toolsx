/** Indian income tax slabs — Finance Act 2025 rates (FY 2025-26 / AY 2026-27), carried into FY 2026-27 unless amended. */
export type Regime = "new" | "old";
export type AgeBand = "below60" | "60to80" | "above80";

const NEW_SLABS: Array<[number, number]> = [[400000, 0], [800000, 5], [1200000, 10], [1600000, 15], [2000000, 20], [2400000, 25], [Infinity, 30]];
const oldSlabs = (age: AgeBand): Array<[number, number]> => [[age === "above80" ? 500000 : age === "60to80" ? 300000 : 250000, 0], [500000, 5], [1000000, 20], [Infinity, 30]];

export const STD_DEDUCTION = { new: 75000, old: 50000 };

export function slabTax(income: number, slabs: Array<[number, number]>) {
  let tax = 0, lower = 0;
  const parts: Array<{ from: number; to: number; rate: number; tax: number }> = [];
  for (const [upto, rate] of slabs) {
    if (income <= lower) break;
    const amt = Math.min(income, upto) - lower;
    const t = (amt * rate) / 100;
    parts.push({ from: lower, to: Math.min(income, upto), rate, tax: t });
    tax += t; lower = upto;
  }
  return { tax, parts };
}

export function surchargeRate(income: number, regime: Regime) {
  if (income > 50000000) return regime === "new" ? 25 : 37;
  if (income > 20000000) return 25;
  if (income > 10000000) return 15;
  if (income > 5000000) return 10;
  return 0;
}

export interface TaxResult { taxable: number; slab: number; rebate: number; afterRebate: number; surcharge: number; cess: number; total: number; parts: ReturnType<typeof slabTax>["parts"]; effective: number }

/** taxable = income after deductions (standard deduction should already be applied by caller) */
export function computeTax(taxable: number, regime: Regime, age: AgeBand = "below60"): TaxResult {
  taxable = Math.max(0, Math.round(taxable));
  const { tax: slab, parts } = slabTax(taxable, regime === "new" ? NEW_SLABS : oldSlabs(age));
  let rebate = 0;
  if (regime === "new" && taxable <= 1200000) rebate = Math.min(slab, 60000);
  if (regime === "old" && taxable <= 500000) rebate = Math.min(slab, 12500);
  let afterRebate = slab - rebate;
  // marginal relief (new regime) just above ₹12 lakh: tax can't exceed income over 12L
  if (regime === "new" && taxable > 1200000) afterRebate = Math.min(afterRebate, taxable - 1200000);
  const sRate = surchargeRate(taxable, regime);
  let surcharge = (afterRebate * sRate) / 100;
  // marginal relief on surcharge thresholds
  const thresholds = [5000000, 10000000, 20000000, 50000000];
  for (const th of thresholds) {
    if (taxable > th) {
      const atTh = computeNoRelief(th, regime, age);
      const excess = taxable - th;
      if (afterRebate + surcharge - atTh > excess) surcharge = Math.max(0, atTh + excess - afterRebate);
    }
  }
  const cess = (afterRebate + surcharge) * 0.04;
  const total = Math.round(afterRebate + surcharge + cess);
  return { taxable, slab, rebate, afterRebate, surcharge, cess, total, parts, effective: taxable ? (total / taxable) * 100 : 0 };
}

function computeNoRelief(taxable: number, regime: Regime, age: AgeBand) {
  const { tax } = slabTax(taxable, regime === "new" ? NEW_SLABS : oldSlabs(age));
  return tax + (tax * surchargeRate(taxable, regime)) / 100;
}
