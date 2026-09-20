"use client";
import { useMemo, useState } from "react";
import { CalculatorShell } from "@/components/shell/CalculatorShell";
import { FieldGroup, NumberInput, Row, Select, Toggle } from "@/components/ui/Field";
import { HeroStat, KV, Stat } from "@/components/ui/Stat";
import { computeTax, STD_DEDUCTION, type AgeBand, type TaxResult } from "@/lib/tax";
import { inr, pct } from "@/lib/format";

const Col = ({ title, r, ded, win }: { title: string; r: TaxResult; ded: number; win: boolean }) => (
  <div className={`rounded-2xl border p-4 ${win ? "border-accent bg-accent-soft/50" : "border-border bg-surface-2/40"}`}>
    <div className="flex items-center justify-between"><span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">{title}</span>{win ? <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-on-accent">Better</span> : null}</div>
    <div className="mt-2 font-display text-3xl tabular text-ink">{inr(r.total, { decimals: 0 })}</div>
    <div className="text-xs text-muted">{pct(r.effective, 1)} effective · {inr(r.total / 12, { decimals: 0 })}/month</div>
    <KV className="mt-3 text-xs" rows={[["Deductions", inr(ded, { decimals: 0 })], ["Taxable income", inr(r.taxable, { decimals: 0 })], ["Slab tax", inr(r.slab, { decimals: 0 })], r.rebate ? ["Rebate 87A", `− ${inr(r.rebate, { decimals: 0 })}`] : null, r.surcharge ? ["Surcharge", inr(r.surcharge, { decimals: 0 })] : null, ["Cess 4%", inr(r.cess, { decimals: 0 })]]} />
    <details className="mt-2 text-xs"><summary className="cursor-pointer text-muted hover:text-ink">Slab breakdown</summary><ul className="mt-1 grid gap-0.5 tabular text-muted">{r.parts.map((p, i) => <li key={i} className="flex justify-between"><span>{inr(p.from, { decimals: 0 })} – {p.to === Infinity ? "∞" : inr(p.to, { decimals: 0 })} @ {p.rate}%</span><span>{inr(p.tax, { decimals: 0 })}</span></li>)}</ul></details>
  </div>
);

export default function IncomeTax() {
  const [salary, setSalary] = useState(1500000);
  const [other, setOther] = useState(0);
  const [age, setAge] = useState<AgeBand>("below60");
  const [salaried, setSalaried] = useState(true);
  const [d, setD] = useState({ c80: 150000, d80: 25000, nps: 50000, hra: 0, home: 0, other: 0 });
  const gross = salary + other;
  const newTaxable = gross - (salaried ? STD_DEDUCTION.new : 0);
  const oldDed = Math.min(150000, d.c80) + Math.min(age === "below60" ? 25000 : 50000, d.d80) + Math.min(50000, d.nps) + d.hra + Math.min(200000, d.home) + d.other;
  const oldTaxable = gross - (salaried ? STD_DEDUCTION.old : 0) - oldDed;
  const nw = useMemo(() => computeTax(newTaxable, "new", age), [newTaxable, age]);
  const od = useMemo(() => computeTax(oldTaxable, "old", age), [oldTaxable, age]);
  const better = nw.total <= od.total ? "new" : "old";
  const diff = Math.abs(nw.total - od.total);

  const inputs = (
    <>
      <FieldGroup title="Income">
        <NumberInput label="Gross annual salary / business income" prefix="₹" value={salary} onChange={setSalary} step={10000} />
        <NumberInput label="Other income (interest, rent, etc.)" prefix="₹" value={other} onChange={setOther} />
        <Row>
          <Select label="Age" value={age} onChange={(e) => setAge(e.target.value as AgeBand)} options={[{ value: "below60", label: "Below 60" }, { value: "60to80", label: "60 – 80 (senior)" }, { value: "above80", label: "80+ (super senior)" }]} />
          <div className="flex items-end"><Toggle checked={salaried} onChange={setSalaried} label="Salaried / pensioner" help="Enables standard deduction" className="w-full" /></div>
        </Row>
      </FieldGroup>
      <FieldGroup title="Deductions (old regime only)">
        <Row>
          <NumberInput label="80C (PF, ELSS, LIC, PPF)" hint="max 1.5L" prefix="₹" value={d.c80} onChange={(v) => setD({ ...d, c80: v })} />
          <NumberInput label="80D health insurance" hint={age === "below60" ? "max 25k" : "max 50k"} prefix="₹" value={d.d80} onChange={(v) => setD({ ...d, d80: v })} />
          <NumberInput label="80CCD(1B) NPS" hint="max 50k" prefix="₹" value={d.nps} onChange={(v) => setD({ ...d, nps: v })} />
          <NumberInput label="HRA exemption" prefix="₹" value={d.hra} onChange={(v) => setD({ ...d, hra: v })} />
          <NumberInput label="Home loan interest 24(b)" hint="max 2L" prefix="₹" value={d.home} onChange={(v) => setD({ ...d, home: v })} />
          <NumberInput label="Other (80E, 80G, 80TTA…)" prefix="₹" value={d.other} onChange={(v) => setD({ ...d, other: v })} />
        </Row>
      </FieldGroup>
    </>
  );

  const results = (
    <>
      <HeroStat label={`${better === "new" ? "New" : "Old"} regime saves you`} value={inr(diff, { decimals: 0 })} sub={diff === 0 ? "Both regimes give the same tax" : `per year vs the ${better === "new" ? "old" : "new"} regime`} />
      <div className="grid gap-3 sm:grid-cols-2"><Col title="New regime (default)" r={nw} ded={salaried ? STD_DEDUCTION.new : 0} win={better === "new"} /><Col title="Old regime" r={od} ded={(salaried ? STD_DEDUCTION.old : 0) + oldDed} win={better === "old"} /></div>
      <div className="grid grid-cols-2 gap-3"><Stat label="Break-even deductions" value={inr(Math.max(0, breakEven(gross, salaried, age)), { decimals: 0 })} sub="old regime wins above this" /><Stat label="Gross income" value={inr(gross, { decimals: 0 })} /></div>
    </>
  );
  return <CalculatorShell inputs={inputs} results={results} inputTitle="Income & deductions" resultTitle="Old vs new regime" note="New regime: 0–4L nil, 4–8L 5%, 8–12L 10%, 12–16L 15%, 16–20L 20%, 20–24L 25%, above 24L 30%; rebate up to ₹60,000 for taxable income ≤ ₹12 lakh; standard deduction ₹75,000. Old regime: 2.5L/3L/5L basic exemption by age, 5%/20%/30% slabs, rebate ₹12,500 up to ₹5 lakh. 4% cess on all. Surcharge above ₹50 lakh with marginal relief." />;
}

function breakEven(gross: number, salaried: boolean, age: AgeBand) {
  const target = computeTax(gross - (salaried ? STD_DEDUCTION.new : 0), "new", age).total;
  let lo = 0, hi = gross;
  for (let i = 0; i < 40; i++) { const mid = (lo + hi) / 2; const t = computeTax(gross - (salaried ? STD_DEDUCTION.old : 0) - mid, "old", age).total; if (t > target) lo = mid; else hi = mid; }
  return hi;
}
