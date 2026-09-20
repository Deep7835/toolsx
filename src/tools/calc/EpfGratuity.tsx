"use client";
import { useMemo, useState } from "react";
import { CalculatorShell } from "@/components/shell/CalculatorShell";
import { NumberInput, Range, Segmented, Toggle } from "@/components/ui/Field";
import { HeroStat, KV, Stat } from "@/components/ui/Stat";
import { inr, num, pct } from "@/lib/format";
import { EPF_WAGE_CEILING, EPF_CEILING_EFFECTIVE } from "@/lib/payroll";

export default function EpfGratuity() {
  const [tab, setTab] = useState<"epf" | "gratuity">("epf");
  const [basic, setBasic] = useState(30000);
  const [age, setAge] = useState(30);
  const [retire, setRetire] = useState(58);
  const [empPct, setEmpPct] = useState(12);
  const [rate, setRate] = useState(8.25);
  const [hike, setHike] = useState(5);
  const [balance, setBalance] = useState(0);
  const [cap, setCap] = useState(false);
  const [years, setYears] = useState(7);
  const [months, setMonths] = useState(8);
  const [lastSalary, setLastSalary] = useState(45000);
  const [covered, setCovered] = useState(true);

  const epf = useMemo(() => {
    const yrs = Math.max(0, retire - age); let bal = balance, sal = basic, contrib = 0; const rows: Array<{ y: number; contrib: number; bal: number }> = [];
    for (let y = 1; y <= yrs; y++) {
      const wage = cap ? Math.min(sal, EPF_WAGE_CEILING) : sal;
      const eeMonthly = wage * (empPct / 100); const epsMonthly = Math.min(wage, EPF_WAGE_CEILING) * 0.0833; const erMonthly = wage * 0.12 - epsMonthly; const monthly = eeMonthly + erMonthly;
      let yc = 0; for (let m = 0; m < 12; m++) { bal += monthly; yc += monthly; bal += bal * (rate / 100 / 12); }
      contrib += yc; rows.push({ y, contrib: yc, bal }); sal *= 1 + hike / 100;
    }
    return { bal, contrib, rows, yrs };
  }, [basic, age, retire, empPct, rate, hike, balance, cap]);

  const totalYears = years + (months >= 6 ? 1 : 0);
  const gratuity = covered ? (15 * lastSalary * totalYears) / 26 : (15 * lastSalary * years) / 30;
  const eligible = years >= 5 || (years === 4 && months >= 8);
  const taxFree = Math.min(gratuity, 2000000);

  const inputs = (
    <>
      <Segmented value={tab} onChange={setTab} options={[{ value: "epf", label: "EPF corpus" }, { value: "gratuity", label: "Gratuity" }]} size="sm" />
      {tab === "epf" ? (
        <>
          <NumberInput label="Monthly basic + DA" prefix="₹" value={basic} onChange={setBasic} step={1000} />
          <div className="grid grid-cols-2 gap-4"><NumberInput label="Current age" value={age} onChange={setAge} /><NumberInput label="Retirement age" value={retire} onChange={setRetire} /></div>
          <Range label="Your contribution" value={empPct} onChange={setEmpPct} min={12} max={100} step={1} format={(v) => `${v}%`} />
          <Range label="EPF interest rate" value={rate} onChange={setRate} min={7} max={10} step={0.05} format={(v) => `${num(v, 2)}%`} />
          <Range label="Annual salary increase" value={hike} onChange={setHike} min={0} max={20} step={1} format={(v) => `${v}%`} />
          <NumberInput label="Existing EPF balance" prefix="₹" value={balance} onChange={setBalance} />
          <Toggle checked={cap} onChange={setCap} label={`Employer contributes on the ₹${EPF_WAGE_CEILING.toLocaleString("en-IN")} ceiling only`} help={`Statutory ceiling raised from ₹15,000 w.e.f. ${EPF_CEILING_EFFECTIVE}. Many employers cap PF wage here.`} />
        </>
      ) : (
        <>
          <NumberInput label="Last drawn basic + DA (monthly)" prefix="₹" value={lastSalary} onChange={setLastSalary} step={1000} />
          <div className="grid grid-cols-2 gap-4"><NumberInput label="Years of service" value={years} onChange={setYears} /><NumberInput label="+ months" value={months} onChange={setMonths} max={11} /></div>
          <Toggle checked={covered} onChange={setCovered} label="Employer covered under Gratuity Act" help="10+ employees → covered (26-day formula). Otherwise 30-day formula." />
        </>
      )}
    </>
  );

  const results = tab === "epf" ? (
    <>
      <HeroStat label={`EPF corpus at ${retire}`} value={inr(epf.bal, { decimals: 0 })} sub={`${epf.yrs} years · ${inr(epf.contrib, { decimals: 0 })} contributed`} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3"><Stat label="Interest earned" value={inr(epf.bal - epf.contrib - balance, { decimals: 0 })} tone="accent" /><Stat label="Monthly (you + employer)" value={inr(epf.rows[0] ? epf.rows[0].contrib / 12 : 0, { decimals: 0 })} /><Stat label="EPS pension wage" value={inr(Math.min(basic, EPF_WAGE_CEILING), { decimals: 0 })} sub="8.33% goes to EPS" /></div>
      <div className="max-h-[280px] overflow-auto rounded-xl border border-border"><table className="w-full text-xs"><thead className="sticky top-0 bg-surface-2 text-left text-[10.5px] uppercase tracking-[0.1em] text-muted"><tr><th className="px-3 py-2">Year</th><th className="px-3 py-2 text-right">Contribution</th><th className="px-3 py-2 text-right">Balance</th></tr></thead><tbody className="tabular">{epf.rows.map((r) => <tr key={r.y} className="border-t border-border"><td className="px-3 py-1.5 text-muted">{r.y}</td><td className="px-3 py-1.5 text-right">{inr(r.contrib, { decimals: 0 })}</td><td className="px-3 py-1.5 text-right">{inr(r.bal, { decimals: 0 })}</td></tr>)}</tbody></table></div>
    </>
  ) : (
    <>
      <HeroStat label={eligible ? "Gratuity payable" : "Not yet eligible"} value={inr(eligible ? gratuity : 0, { decimals: 0 })} sub={eligible ? `${totalYears} years counted × 15 days × ${inr(lastSalary, { decimals: 0 })} ÷ ${covered ? 26 : 30}` : "Minimum 5 years of continuous service (4 years 8 months accepted by courts)"} />
      <KV rows={[["Formula", covered ? "15 × last salary × years ÷ 26" : "15 × last salary × years ÷ 30"], ["Years counted", `${totalYears} (${years}y ${months}m${months >= 6 && covered ? ", rounded up" : ""})`], ["Tax-free limit", inr(2000000, { decimals: 0 })], ["Taxable portion", inr(Math.max(0, gratuity - taxFree), { decimals: 0 })]]} />
      <p className="text-xs leading-relaxed text-muted">Gratuity is capped at ₹20 lakh for private employees; amounts above that are taxable as salary. Payable within 30 days of leaving; delay attracts interest.</p>
    </>
  );

  return <CalculatorShell inputs={inputs} results={results} inputTitle={tab === "epf" ? "EPF inputs" : "Gratuity inputs"} resultTitle={tab === "epf" ? "Retirement corpus" : "Gratuity"} note={tab === "epf" ? `Employee 12% + employer 12% (of which 8.33% on wages up to ₹25,000 — the ceiling raised on 17 Sep 2026 — goes to EPS pension). Interest at ${pct(rate, 2)} credited annually; here compounded monthly for projection.` : "Payment of Gratuity Act, 1972."} />;
}
