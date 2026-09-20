"use client";
import { useMemo, useState } from "react";
import { CalculatorShell } from "@/components/shell/CalculatorShell";
import { FieldGroup, NumberInput, Row, Select, Segmented, Toggle } from "@/components/ui/Field";
import { HeroStat, KV, Stat } from "@/components/ui/Stat";
import { computeTax, STD_DEDUCTION } from "@/lib/tax";
import { inr, pct } from "@/lib/format";

const PT: Record<string, (g: number) => number> = { none: () => 0, MH: (g) => (g <= 7500 ? 0 : g <= 10000 ? 175 : 200), KA: (g) => (g <= 25000 ? 0 : 200), WB: (g) => (g <= 10000 ? 0 : g <= 15000 ? 110 : g <= 25000 ? 130 : g <= 40000 ? 150 : 200), GJ: (g) => (g <= 12000 ? 0 : 200), AP: (g) => (g <= 15000 ? 0 : g <= 20000 ? 150 : 200), TS: (g) => (g <= 15000 ? 0 : g <= 20000 ? 150 : 200) };

export default function InHandSalary() {
  const [ctc, setCtc] = useState(900000);
  const [period, setPeriod] = useState<"annual" | "monthly">("annual");
  const [basicPct, setBasicPct] = useState(40);
  const [hraPct, setHraPct] = useState(50);
  const [bonus, setBonus] = useState(0);
  const [pfIn, setPfIn] = useState(true);
  const [gratIn, setGratIn] = useState(false);
  const [pfCap, setPfCap] = useState(false);
  const [vpf, setVpf] = useState(0);
  const [state, setState] = useState("MH");
  const [regime, setRegime] = useState<"new" | "old">("new");
  const [ded80, setDed80] = useState(0);
  const [rent, setRent] = useState(0);
  const [metro, setMetro] = useState(true);

  const r = useMemo(() => {
    const annualCtc = period === "annual" ? ctc : ctc * 12;
    const fixed = annualCtc - bonus;
    // solve gross such that gross + employer PF (+ gratuity) = fixed
    const basicOf = (g: number) => g * (basicPct / 100);
    const erPfOf = (g: number) => (pfIn ? (pfCap ? Math.min(basicOf(g), 180000) : basicOf(g)) * 0.12 : 0);
    const gratOf = (g: number) => (gratIn ? basicOf(g) * 0.0481 : 0);
    let gross = fixed; for (let i = 0; i < 30; i++) gross = fixed - erPfOf(gross) - gratOf(gross);
    const basic = basicOf(gross); const hra = basic * (hraPct / 100); const special = Math.max(0, gross - basic - hra);
    const eePf = (pfCap ? Math.min(basic, 180000) : basic) * 0.12; const erPf = erPfOf(gross); const grat = gratOf(gross);
    const pt = PT[state](gross / 12) * 12 + (state === "MH" && PT.MH(gross / 12) === 200 ? 100 : 0);
    const hraEx = regime === "old" && rent > 0 ? Math.max(0, Math.min(hra, rent - basic * 0.1, basic * (metro ? 0.5 : 0.4))) : 0;
    const taxable = gross + bonus - STD_DEDUCTION[regime] - (regime === "old" ? Math.min(150000, eePf + vpf * 12 + ded80) + hraEx + pt : 0);
    const tax = computeTax(taxable, regime);
    const annualDed = eePf + vpf * 12 + pt + tax.total;
    const net = gross + bonus - annualDed;
    return { annualCtc, gross, basic, hra, special, eePf, erPf, grat, pt, tax, net, hraEx, taxable, annualDed };
  }, [ctc, period, basicPct, hraPct, bonus, pfIn, gratIn, pfCap, vpf, state, regime, ded80, rent, metro]);

  const inputs = (
    <>
      <FieldGroup title="CTC">
        <Segmented value={period} onChange={setPeriod} options={[{ value: "annual", label: "Annual CTC" }, { value: "monthly", label: "Monthly CTC" }]} size="sm" />
        <NumberInput label={period === "annual" ? "Cost to company (annual)" : "Cost to company (monthly)"} prefix="₹" value={ctc} onChange={setCtc} step={10000} />
        <Row><NumberInput label="Basic as % of gross" suffix="%" value={basicPct} onChange={setBasicPct} /><NumberInput label="HRA as % of basic" suffix="%" value={hraPct} onChange={setHraPct} /></Row>
        <NumberInput label="Variable / bonus included in CTC (annual)" prefix="₹" value={bonus} onChange={setBonus} />
        <Toggle checked={pfIn} onChange={setPfIn} label="Employer PF is part of CTC" />
        <Toggle checked={gratIn} onChange={setGratIn} label="Gratuity provision is part of CTC" />
        <Toggle checked={pfCap} onChange={setPfCap} label="PF limited to ₹15,000 basic" />
        <NumberInput label="Voluntary PF (monthly)" prefix="₹" value={vpf} onChange={setVpf} />
      </FieldGroup>
      <FieldGroup title="Tax">
        <Row>
          <Select label="Professional tax state" value={state} onChange={(e) => setState(e.target.value)} options={[{ value: "MH", label: "Maharashtra" }, { value: "KA", label: "Karnataka" }, { value: "WB", label: "West Bengal" }, { value: "GJ", label: "Gujarat" }, { value: "AP", label: "Andhra Pradesh" }, { value: "TS", label: "Telangana" }, { value: "none", label: "No PT (Delhi, UP, HR…)" }]} />
          <Select label="Tax regime" value={regime} onChange={(e) => setRegime(e.target.value as "new" | "old")} options={[{ value: "new", label: "New (default)" }, { value: "old", label: "Old (with deductions)" }]} />
        </Row>
        {regime === "old" ? <Row><NumberInput label="Other 80C investments (annual)" prefix="₹" value={ded80} onChange={setDed80} help="PF is auto-included" /><NumberInput label="Rent paid (annual)" prefix="₹" value={rent} onChange={setRent} /><div className="sm:col-span-2"><Toggle checked={metro} onChange={setMetro} label="Metro city (50% HRA)" /></div></Row> : null}
      </FieldGroup>
    </>
  );
  const results = (
    <>
      <HeroStat label="Monthly in-hand salary" value={inr(r.net / 12, { decimals: 0 })} sub={`${inr(r.net, { decimals: 0 })} per year · ${pct((r.net / r.annualCtc) * 100, 1)} of CTC`} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3"><Stat label="Monthly gross" value={inr(r.gross / 12, { decimals: 0 })} /><Stat label="Monthly deductions" value={inr(r.annualDed / 12, { decimals: 0 })} tone="warn" /><Stat label="Income tax / month" value={inr(r.tax.total / 12, { decimals: 0 })} sub={`${regime} regime`} /></div>
      <KV rows={[["Basic", inr(r.basic / 12, { decimals: 0 }) + " /mo"], ["HRA", inr(r.hra / 12, { decimals: 0 }) + " /mo"], ["Special allowance", inr(r.special / 12, { decimals: 0 }) + " /mo"], ["Employee PF (12%)", `− ${inr(r.eePf / 12, { decimals: 0 })} /mo`], vpf ? ["Voluntary PF", `− ${inr(vpf, { decimals: 0 })} /mo`] : null, ["Professional tax", `− ${inr(r.pt / 12, { decimals: 0 })} /mo`], ["TDS (income tax)", `− ${inr(r.tax.total / 12, { decimals: 0 })} /mo`]]} total={["Net take-home", inr(r.net / 12, { decimals: 0 }) + " /mo"]} />
      <KV className="text-xs" rows={[["Employer PF (in CTC)", inr(r.erPf, { decimals: 0 })], gratIn ? ["Gratuity provision (in CTC)", inr(r.grat, { decimals: 0 })] : null, ["Taxable income", inr(r.taxable, { decimals: 0 })], regime === "old" && r.hraEx ? ["HRA exemption", inr(r.hraEx, { decimals: 0 })] : null]} />
    </>
  );
  return <CalculatorShell inputs={inputs} results={results} inputTitle="Salary structure" resultTitle="Take-home" note="Estimates only — actual TDS depends on declarations, joining month and employer policy. Bonus is taxed but paid out separately; the monthly figure excludes it." />;
}
