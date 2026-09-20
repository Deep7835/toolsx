"use client";
import { useMemo, useState } from "react";
import { CalculatorShell } from "@/components/shell/CalculatorShell";
import { Input, NumberInput, Segmented, Select, Toggle } from "@/components/ui/Field";
import { HeroStat, KV, Stat } from "@/components/ui/Stat";
import { inr, num, pct } from "@/lib/format";

const IT_BLOCKS = [
  { v: "5", l: "Residential building — 5%" }, { v: "10", l: "Non-residential building / furniture & fittings — 10%" }, { v: "15", l: "Plant & machinery (general) / motor cars — 15%" }, { v: "30", l: "Commercial vehicles (taxi, bus, lorry) — 30%" }, { v: "40", l: "Computers, software, books, pollution control — 40%" }, { v: "25", l: "Intangibles (patents, know-how, licences) — 25%" }, { v: "40b", l: "Temporary structures / purely temporary erections — 40%" },
];
const CA_LIFE = [
  { v: "60", l: "Buildings (RCC) — 60 yrs" }, { v: "30", l: "Buildings (other than RCC) — 30 yrs" }, { v: "15", l: "General plant & machinery — 15 yrs" }, { v: "10", l: "Furniture & fittings — 10 yrs" }, { v: "8", l: "Motor cars / delivery vehicles — 8 yrs" }, { v: "6", l: "Computers, servers & networks — 6 yrs" }, { v: "3", l: "End-user devices (laptops, desktops) — 3 yrs" }, { v: "5", l: "Office equipment / electrical installations (10) — 5 yrs" },
];

export default function Depreciation() {
  const [act, setAct] = useState<"it" | "ca">("it");
  const [cost, setCost] = useState(500000);
  const [block, setBlock] = useState("15");
  const [half, setHalf] = useState(false);
  const [addl, setAddl] = useState(false);
  const [life, setLife] = useState("15");
  const [method, setMethod] = useState<"slm" | "wdv">("wdv");
  const [residual, setResidual] = useState(5);
  const [years, setYears] = useState(5);
  const [custom, setCustom] = useState("");

  const itRate = parseFloat(custom || block) || 0;
  const it = useMemo(() => { const rows: Array<{ y: number; open: number; dep: number; close: number }> = []; let wdv = cost; for (let y = 1; y <= years; y++) { let dep = wdv * (itRate / 100); if (y === 1 && half) dep /= 2; if (y === 1 && addl && (itRate === 15)) dep += cost * (half ? 0.1 : 0.2); const close = wdv - dep; rows.push({ y, open: wdv, dep, close }); wdv = close; } return rows; }, [cost, itRate, years, half, addl]);

  const L = parseFloat(life) || 1; const res = cost * (residual / 100);
  const wdvRate = 1 - Math.pow(res / cost, 1 / L);
  const ca = useMemo(() => { const rows: Array<{ y: number; open: number; dep: number; close: number }> = []; let bv = cost; for (let y = 1; y <= Math.min(years, L); y++) { const dep = method === "slm" ? (cost - res) / L : bv * wdvRate; const close = Math.max(res, bv - dep); rows.push({ y, open: bv, dep: bv - close, close }); bv = close; } return rows; }, [cost, L, res, method, wdvRate, years]);

  const rows = act === "it" ? it : ca;
  const first = rows[0]?.dep ?? 0;
  const inputs = (
    <>
      <Segmented value={act} onChange={setAct} options={[{ value: "it", label: "Income Tax Act (WDV blocks)" }, { value: "ca", label: "Companies Act 2013" }]} size="sm" />
      <NumberInput label="Asset cost" prefix="₹" value={cost} onChange={setCost} step={10000} />
      {act === "it" ? (
        <>
          <Select label="Block of assets" value={block} onChange={(e) => { setBlock(e.target.value); setCustom(""); }} options={IT_BLOCKS.map((b) => ({ value: b.v, label: b.l }))} />
          <Input label="Custom rate" hint="optional" suffix="%" value={custom} onChange={(e) => setCustom(e.target.value)} placeholder={block.replace("b", "")} />
          <Toggle checked={half} onChange={setHalf} label="Used < 180 days in year of purchase" help="Only half the rate applies in the first year." />
          <Toggle checked={addl} onChange={setAddl} label="Additional depreciation (new P&M, manufacturing)" help="20% extra under Sec 32(1)(iia), 10% if < 180 days." />
        </>
      ) : (
        <>
          <Select label="Asset class (Schedule II useful life)" value={life} onChange={(e) => setLife(e.target.value)} options={CA_LIFE.map((b) => ({ value: b.v, label: b.l }))} />
          <Segmented value={method} onChange={setMethod} options={[{ value: "wdv", label: "WDV" }, { value: "slm", label: "Straight line" }]} size="sm" />
          <NumberInput label="Residual value" suffix="%" value={residual} onChange={setResidual} help="Schedule II: not more than 5% of original cost." />
        </>
      )}
      <NumberInput label="Years to project" value={years} onChange={setYears} max={40} />
    </>
  );
  const results = (
    <>
      <HeroStat label="Year 1 depreciation" value={inr(first, { decimals: 0 })} sub={act === "it" ? `${itRate}% WDV${half ? " (half rate)" : ""}${addl && itRate === 15 ? " + additional" : ""}` : `${method.toUpperCase()} · ${L}-year life · ${residual}% residual · rate ${pct(method === "wdv" ? wdvRate * 100 : 100 / L, 2)}`} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3"><Stat label="Total over period" value={inr(rows.reduce((a, r) => a + r.dep, 0), { decimals: 0 })} /><Stat label={`Book value after ${rows.length} yr`} value={inr(rows[rows.length - 1]?.close ?? cost, { decimals: 0 })} /><Stat label="Tax saved (30%)" value={inr(first * 0.3, { decimals: 0 })} sub="year 1, indicative" tone="accent" /></div>
      <div className="max-h-[320px] overflow-auto rounded-xl border border-border"><table className="w-full text-xs"><thead className="sticky top-0 bg-surface-2 text-left text-[10.5px] uppercase tracking-[0.1em] text-muted"><tr><th className="px-3 py-2">Year</th><th className="px-3 py-2 text-right">Opening</th><th className="px-3 py-2 text-right">Depreciation</th><th className="px-3 py-2 text-right">Closing</th></tr></thead><tbody className="tabular">{rows.map((r) => <tr key={r.y} className="border-t border-border"><td className="px-3 py-1.5 text-muted">{r.y}</td><td className="px-3 py-1.5 text-right">{inr(r.open, { decimals: 0 })}</td><td className="px-3 py-1.5 text-right">{inr(r.dep, { decimals: 0 })}</td><td className="px-3 py-1.5 text-right">{inr(r.close, { decimals: 0 })}</td></tr>)}</tbody></table></div>
      {act === "ca" ? <KV rows={[["WDV rate formula", "1 − (residual ÷ cost)^(1 ÷ life)"], ["Computed WDV rate", pct(wdvRate * 100, 2)], ["SLM rate", pct(100 / L, 2)]]} /> : null}
    </>
  );
  return <CalculatorShell inputs={inputs} results={results} inputTitle="Asset details" resultTitle="Depreciation schedule" note={act === "it" ? "Income Tax depreciation is computed on the block’s written-down value at prescribed rates (Rule 5, Appendix I). Half rate applies if the asset is used for less than 180 days in the year it is put to use." : `Companies Act 2013, Schedule II prescribes useful lives; companies may use SLM or WDV. Residual value normally ≤ 5%. ${num(L)}-year life shown.`} />;
}
