"use client";
import { useState } from "react";
import { CalculatorShell } from "@/components/shell/CalculatorShell";
import { NumberInput, Select } from "@/components/ui/Field";
import { HeroStat, KV, Stat } from "@/components/ui/Stat";
import { inr } from "@/lib/format";

type Slab = { upto: number; pt: number };
const STATES: Record<string, { name: string; slabs: (g: string) => Slab[]; note: string; feb?: number }> = {
  MH: { name: "Maharashtra", slabs: (g) => (g === "f" ? [{ upto: 25000, pt: 0 }, { upto: Infinity, pt: 200 }] : [{ upto: 7500, pt: 0 }, { upto: 10000, pt: 175 }, { upto: Infinity, pt: 200 }]), note: "₹300 in February to make the annual total ₹2,500. Women earning up to ₹25,000 are exempt.", feb: 300 },
  KA: { name: "Karnataka", slabs: () => [{ upto: 25000, pt: 0 }, { upto: Infinity, pt: 200 }], note: "Flat ₹200/month above ₹25,000 (revised from ₹15,000 w.e.f. April 2023). Annual ₹2,400." },
  WB: { name: "West Bengal", slabs: () => [{ upto: 10000, pt: 0 }, { upto: 15000, pt: 110 }, { upto: 25000, pt: 130 }, { upto: 40000, pt: 150 }, { upto: Infinity, pt: 200 }], note: "Slabs per the WB State Tax on Professions Act." },
  GJ: { name: "Gujarat", slabs: () => [{ upto: 12000, pt: 0 }, { upto: Infinity, pt: 200 }], note: "Nil up to ₹12,000; ₹200 above (w.e.f. April 2022)." },
  AP: { name: "Andhra Pradesh", slabs: () => [{ upto: 15000, pt: 0 }, { upto: 20000, pt: 150 }, { upto: Infinity, pt: 200 }], note: "Annual maximum ₹2,400." },
  TS: { name: "Telangana", slabs: () => [{ upto: 15000, pt: 0 }, { upto: 20000, pt: 150 }, { upto: Infinity, pt: 200 }], note: "Same slabs as Andhra Pradesh." },
  TN: { name: "Tamil Nadu (half-yearly)", slabs: () => [{ upto: 21000, pt: 0 }, { upto: 30000, pt: 135 }, { upto: 45000, pt: 315 }, { upto: 60000, pt: 690 }, { upto: 75000, pt: 1025 }, { upto: Infinity, pt: 1250 }], note: "Levied half-yearly on average monthly income (Chennai corporation slabs shown). Values here are per half-year, not monthly." },
  MP: { name: "Madhya Pradesh", slabs: () => [{ upto: 18750, pt: 0 }, { upto: 25000, pt: 125 }, { upto: 33333, pt: 167 }, { upto: Infinity, pt: 208 }], note: "₹212 in the last month to total ₹2,500 for the top slab.", feb: 212 },
};

export default function ProfessionalTax() {
  const [state, setState] = useState("MH");
  const [gender, setGender] = useState("m");
  const [salary, setSalary] = useState(35000);
  const s = STATES[state];
  const slabs = s.slabs(gender);
  const slab = slabs.find((x) => salary <= x.upto)!;
  const monthly = slab.pt;
  const half = state === "TN";
  const annual = half ? monthly * 2 : monthly * 11 + (monthly > 0 && s.feb && monthly === slabs[slabs.length - 1].pt ? s.feb : monthly);

  const inputs = (
    <>
      <Select label="State" value={state} onChange={(e) => setState(e.target.value)} options={Object.entries(STATES).map(([k, v]) => ({ value: k, label: v.name }))} />
      {state === "MH" ? <Select label="Employee gender (MH exemption)" value={gender} onChange={(e) => setGender(e.target.value)} options={[{ value: "m", label: "Male" }, { value: "f", label: "Female" }]} /> : null}
      <NumberInput label="Gross monthly salary" prefix="₹" value={salary} onChange={setSalary} step={500} />
    </>
  );
  const results = (
    <>
      <HeroStat label={half ? "Professional tax per half-year" : "Professional tax per month"} value={inr(monthly, { decimals: 0 })} sub={`${s.name} · gross ${inr(salary, { decimals: 0 })}`} />
      <div className="grid grid-cols-2 gap-3"><Stat label="Annual PT" value={inr(annual, { decimals: 0 })} sub={!half && s.feb && monthly === slabs[slabs.length - 1].pt ? `incl. ${inr(s.feb, { decimals: 0 })} in Feb` : undefined} /><Stat label="Max allowed (Art. 276)" value="₹2,500 / yr" /></div>
      <KV rows={slabs.map((x, i) => [`${i === 0 ? "Up to" : `${inr(slabs[i - 1].upto + 1, { decimals: 0 })} –`} ${x.upto === Infinity ? "above" : inr(x.upto, { decimals: 0 })}`, x.pt ? inr(x.pt, { decimals: 0 }) : "Nil"])} />
      <p className="text-xs leading-relaxed text-muted">{s.note} PT paid is deductible from salary income under Section 16(iii).</p>
    </>
  );
  return <CalculatorShell inputs={inputs} results={results} inputTitle="Salary & state" resultTitle="PT deduction" note="Delhi, Haryana, UP, Rajasthan, Punjab and Uttarakhand levy no professional tax. Slabs change with state budgets — verify with the latest notification." />;
}
