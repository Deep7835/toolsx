"use client";
import { useMemo, useState } from "react";
import { CalculatorShell } from "@/components/shell/CalculatorShell";
import { NumberInput, Range, Segmented } from "@/components/ui/Field";
import { HeroStat, KV, Stat } from "@/components/ui/Stat";
import { sipFV, lumpsumFV } from "@/lib/math";
import { inr, num, pct } from "@/lib/format";

export default function SipCalculator() {
  const [mode, setMode] = useState<"sip" | "lumpsum" | "goal">("sip");
  const [monthly, setMonthly] = useState(10000);
  const [lump, setLump] = useState(500000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [stepUp, setStepUp] = useState(0);
  const [goal, setGoal] = useState(5000000);
  const [inflation, setInflation] = useState(6);

  const sip = useMemo(() => sipFV(monthly, rate, years, stepUp), [monthly, rate, years, stepUp]);
  const ls = lumpsumFV(lump, rate, years);
  const i = rate / 100 / 12, n = years * 12;
  const needed = i > 0 ? (goal * i) / ((Math.pow(1 + i, n) - 1) * (1 + i)) : goal / n;
  const real = (fv: number) => fv / Math.pow(1 + inflation / 100, years);

  const inputs = (
    <>
      <Segmented value={mode} onChange={setMode} options={[{ value: "sip", label: "SIP" }, { value: "lumpsum", label: "Lumpsum" }, { value: "goal", label: "Goal planner" }]} size="sm" />
      {mode === "sip" ? <NumberInput label="Monthly investment" prefix="₹" value={monthly} onChange={setMonthly} step={500} /> : null}
      {mode === "lumpsum" ? <NumberInput label="One-time investment" prefix="₹" value={lump} onChange={setLump} step={10000} /> : null}
      {mode === "goal" ? <NumberInput label="Target corpus" prefix="₹" value={goal} onChange={setGoal} step={100000} /> : null}
      <Range label="Expected annual return" value={rate} onChange={setRate} min={4} max={25} step={0.5} format={(v) => `${num(v, 1)}%`} />
      <Range label="Duration" value={years} onChange={setYears} min={1} max={40} step={1} format={(v) => `${v} yr`} />
      {mode === "sip" ? <Range label="Annual step-up" value={stepUp} onChange={setStepUp} min={0} max={25} step={1} format={(v) => `${v}%`} /> : null}
      <NumberInput label="Inflation (for real value)" suffix="%" value={inflation} onChange={setInflation} step={0.5} />
    </>
  );

  const fv = mode === "sip" ? sip.fv : mode === "lumpsum" ? ls : goal;
  const invested = mode === "sip" ? sip.invested : mode === "lumpsum" ? lump : needed * n;
  const gains = fv - invested;
  const results = (
    <>
      {mode === "goal" ? <HeroStat label="Monthly SIP needed" value={inr(Math.ceil(needed / 100) * 100, { decimals: 0 })} sub={`to reach ${inr(goal, { decimals: 0 })} in ${years} years at ${rate}%`} /> : <HeroStat label="Maturity value" value={inr(fv, { decimals: 0 })} sub={`${inr(invested, { decimals: 0 })} invested · ${inr(gains, { decimals: 0 })} gains`} />}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat label="Invested" value={inr(invested, { decimals: 0 })} />
        <Stat label="Wealth gained" value={inr(gains, { decimals: 0 })} tone="accent" sub={`${num(fv / Math.max(1, invested), 2)}× money`} />
        <Stat label="Real value (today’s ₹)" value={inr(real(fv), { decimals: 0 })} sub={`after ${inflation}% inflation`} />
      </div>
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-surface-3"><div className="bg-border-strong" style={{ width: `${(invested / fv) * 100}%` }} /><div className="bg-accent" style={{ width: `${(gains / fv) * 100}%` }} /></div>
      <div className="flex justify-between text-xs text-muted"><span>Invested {pct((invested / fv) * 100, 0)}</span><span>Returns {pct((gains / fv) * 100, 0)}</span></div>
      {mode === "sip" ? (
        <div className="max-h-[300px] overflow-auto rounded-xl border border-border">
          <table className="w-full text-xs"><thead className="sticky top-0 bg-surface-2 text-left text-[10.5px] uppercase tracking-[0.1em] text-muted"><tr><th className="px-3 py-2">Year</th><th className="px-3 py-2 text-right">Invested</th><th className="px-3 py-2 text-right">Value</th><th className="px-3 py-2 text-right">Gain</th></tr></thead>
            <tbody className="tabular">{sip.yearly.map((y) => <tr key={y.year} className="border-t border-border"><td className="px-3 py-1.5 text-muted">{y.year}</td><td className="px-3 py-1.5 text-right">{inr(y.invested, { decimals: 0 })}</td><td className="px-3 py-1.5 text-right">{inr(y.value, { decimals: 0 })}</td><td className="px-3 py-1.5 text-right text-accent-text">{inr(y.value - y.invested, { decimals: 0 })}</td></tr>)}</tbody></table>
        </div>
      ) : <KV rows={[["Absolute return", pct((gains / Math.max(1, invested)) * 100, 1)], ["CAGR", pct(rate, 1)]]} />}
    </>
  );
  return <CalculatorShell inputs={inputs} results={results} inputTitle="Investment plan" resultTitle="Projection" note="Assumes monthly compounding and SIP instalments at the start of each month. Mutual fund returns are not guaranteed; LTCG on equity funds above ₹1.25 lakh/year is taxed at 12.5%." />;
}
