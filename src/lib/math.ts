export { num, pct, inr, round } from "./format";
export const safeDivide = (a: number, b: number) => (b === 0 ? 0 : a / b);

/** EMI for principal P, annual rate r%, n months */
export const emi = (P: number, r: number, n: number) => {
  const i = r / 100 / 12;
  if (n <= 0) return 0;
  if (i === 0) return P / n;
  return (P * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
};

export const amortize = (P: number, r: number, n: number) => {
  const e = emi(P, r, n);
  const i = r / 100 / 12;
  let bal = P;
  const rows: Array<{ m: number; emi: number; principal: number; interest: number; balance: number }> = [];
  for (let m = 1; m <= n; m++) {
    const interest = bal * i;
    const principal = Math.min(bal, e - interest);
    bal = Math.max(0, bal - principal);
    rows.push({ m, emi: e, principal, interest, balance: bal });
  }
  return { emi: e, rows, totalInterest: rows.reduce((a, x) => a + x.interest, 0) };
};

/** Future value of a monthly SIP with optional annual step-up */
export const sipFV = (monthly: number, annualRate: number, years: number, stepUpPct = 0) => {
  const i = annualRate / 100 / 12;
  let fv = 0, invested = 0, amt = monthly;
  const yearly: Array<{ year: number; invested: number; value: number }> = [];
  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) { fv = (fv + amt) * (1 + i); invested += amt; }
    yearly.push({ year: y, invested, value: fv });
    amt *= 1 + stepUpPct / 100;
  }
  return { fv, invested, yearly };
};

export const lumpsumFV = (P: number, annualRate: number, years: number) => P * Math.pow(1 + annualRate / 100, years);
