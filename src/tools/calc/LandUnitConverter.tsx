"use client";
import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { CalculatorShell } from "@/components/shell/CalculatorShell";
import { NumberInput, Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { HeroStat, KV } from "@/components/ui/Stat";
import { num } from "@/lib/format";

/* all in square metres */
const UNITS: Record<string, { label: string; sqm: number; note?: string }> = {
  sqft: { label: "Square feet", sqm: 0.09290304 },
  sqm: { label: "Square metre", sqm: 1 },
  sqyd: { label: "Square yard (Gaj / Vaar)", sqm: 0.83612736 },
  acre: { label: "Acre", sqm: 4046.8564224 },
  hectare: { label: "Hectare", sqm: 10000 },
  cent: { label: "Cent (South India)", sqm: 40.468564224 },
  ground: { label: "Ground (Tamil Nadu)", sqm: 222.967 },
  guntha: { label: "Guntha (MH / KA / GJ)", sqm: 101.17 },
  ankanam: { label: "Ankanam (AP / TS)", sqm: 6.689 },
  kanal: { label: "Kanal (Punjab / HR / HP / J&K)", sqm: 505.857 },
  marla: { label: "Marla (Punjab / HR)", sqm: 25.2929 },
  bigha_up: { label: "Bigha — UP / Uttarakhand (pucca)", sqm: 2529.29, note: "1 bigha = 20 biswa = 27,225 sq ft" },
  bigha_bihar: { label: "Bigha — Bihar", sqm: 2529.29, note: "1 bigha = 20 katha = 27,220 sq ft" },
  bigha_wb: { label: "Bigha — West Bengal / Assam", sqm: 1337.8, note: "1 bigha = 20 katha = 14,400 sq ft" },
  bigha_raj: { label: "Bigha — Rajasthan (pucca)", sqm: 2529.29, note: "kachha bigha ≈ 1,618 sq m" },
  bigha_guj: { label: "Bigha — Gujarat", sqm: 1618.7, note: "1 bigha = 17,424 sq ft" },
  bigha_mp: { label: "Bigha — Madhya Pradesh", sqm: 1113.7, note: "≈ 12,000 sq ft" },
  bigha_hp: { label: "Bigha — Himachal / Punjab", sqm: 809.4, note: "≈ 8,712 sq ft" },
  katha_bihar: { label: "Katha — Bihar", sqm: 126.46, note: "20 katha = 1 bigha" },
  katha_wb: { label: "Katha — West Bengal", sqm: 66.89, note: "= 720 sq ft" },
  katha_assam: { label: "Katha — Assam", sqm: 267.9, note: "= 2,880 sq ft" },
  biswa_up: { label: "Biswa — UP", sqm: 126.46, note: "20 biswa = 1 bigha" },
  dismil: { label: "Dismil / Decimal (Bihar, Odisha, WB)", sqm: 40.468564224 },
};

export default function LandUnitConverter() {
  const [value, setValue] = useState(1);
  const [from, setFrom] = useState("bigha_up");
  const [to, setTo] = useState("sqft");
  const opts = Object.entries(UNITS).map(([k, u]) => ({ value: k, label: u.label }));
  const sqm = value * UNITS[from].sqm;
  const out = sqm / UNITS[to].sqm;
  const common = ["sqft", "sqm", "sqyd", "acre", "hectare", "cent", "guntha"].filter((k) => k !== to);

  const inputs = (
    <>
      <NumberInput label="Area" value={value} onChange={setValue} step={0.01} />
      <Select label="From" value={from} onChange={(e) => setFrom(e.target.value)} options={opts} help={UNITS[from].note} />
      <Button variant="secondary" size="sm" className="justify-self-start" onClick={() => { setFrom(to); setTo(from); }}><ArrowLeftRight className="h-3.5 w-3.5" /> Swap</Button>
      <Select label="To" value={to} onChange={(e) => setTo(e.target.value)} options={opts} help={UNITS[to].note} />
    </>
  );
  const results = (
    <>
      <HeroStat label={`${num(value, 4)} ${UNITS[from].label} equals`} value={`${num(out, out < 10 ? 4 : 2)} ${UNITS[to].label.split(" (")[0]}`} sub={`= ${num(sqm, 2)} sq m`} />
      <KV rows={common.map((k) => [UNITS[k].label, num(sqm / UNITS[k].sqm, sqm / UNITS[k].sqm < 10 ? 4 : 2)])} />
    </>
  );
  return <CalculatorShell inputs={inputs} results={results} inputTitle="Convert" resultTitle="Equivalent area" note="Bigha, katha and biswa vary by state and even district — values here are the commonly used revenue standards. Confirm with the local tehsil/registrar for legal documents." />;
}
