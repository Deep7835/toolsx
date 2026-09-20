"use client";
import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { CalculatorShell } from "@/components/shell/CalculatorShell";
import { NumberInput, Range, Segmented, Select } from "@/components/ui/Field";
import { HeroStat, KV, Stat } from "@/components/ui/Stat";
import { Button } from "@/components/ui/Button";
import { amortize } from "@/lib/math";
import { inr, num, pct } from "@/lib/format";
import { downloadText } from "@/lib/export";

export default function EmiCalculator() {
  const [P, setP] = useState(1000000);
  const [r, setR] = useState(11.5);
  const [years, setYears] = useState(5);
  const [unit, setUnit] = useState<"years" | "months">("years");
  const [months, setMonths] = useState(60);
  const [fee, setFee] = useState(1);
  const [view, setView] = useState<"yearly" | "monthly">("yearly");
  const n = unit === "years" ? years * 12 : months;
  const a = useMemo(() => amortize(P, r, n), [P, r, n]);
  const feeAmt = P * (fee / 100);
  const total = a.emi * n;
  const yearly = useMemo(() => { const out: Array<{ y: number; principal: number; interest: number; balance: number }> = []; for (let y = 0; y < Math.ceil(n / 12); y++) { const rows = a.rows.slice(y * 12, y * 12 + 12); out.push({ y: y + 1, principal: rows.reduce((s, x) => s + x.principal, 0), interest: rows.reduce((s, x) => s + x.interest, 0), balance: rows[rows.length - 1]?.balance ?? 0 }); } return out; }, [a, n]);

  const csv = () => downloadText("Month,EMI,Principal,Interest,Balance\n" + a.rows.map((x) => `${x.m},${x.emi.toFixed(2)},${x.principal.toFixed(2)},${x.interest.toFixed(2)},${x.balance.toFixed(2)}`).join("\n"), "amortization.csv", "text/csv");

  const inputs = (
    <>
      <NumberInput label="Loan amount" prefix="₹" value={P} onChange={setP} step={10000} />
      <Range label="Interest rate (p.a.)" value={r} onChange={setR} min={5} max={30} step={0.05} format={(v) => `${num(v, 2)}%`} />
      <Segmented value={unit} onChange={setUnit} options={[{ value: "years", label: "Tenure in years" }, { value: "months", label: "In months" }]} size="sm" />
      {unit === "years" ? <Range label="Tenure" value={years} onChange={setYears} min={1} max={30} step={1} format={(v) => `${v} yr`} /> : <NumberInput label="Tenure" suffix="months" value={months} onChange={setMonths} />}
      <NumberInput label="Processing fee" suffix="%" value={fee} onChange={setFee} step={0.25} />
      <Select label="Loan type (preset)" value="" onChange={(e) => { const p: Record<string, [number, number]> = { msme: [11.5, 5], mudra: [10.5, 3], term: [12, 7], vehicle: [9.5, 5], home: [8.5, 20], personal: [14, 3] }; const x = p[e.target.value]; if (x) { setR(x[0]); setUnit("years"); setYears(x[1]); } }} options={[{ value: "", label: "Choose a preset…" }, { value: "msme", label: "MSME working capital · 11.5% · 5 yr" }, { value: "mudra", label: "Mudra loan · 10.5% · 3 yr" }, { value: "term", label: "Business term loan · 12% · 7 yr" }, { value: "vehicle", label: "Commercial vehicle · 9.5% · 5 yr" }, { value: "home", label: "Home loan · 8.5% · 20 yr" }, { value: "personal", label: "Personal loan · 14% · 3 yr" }]} />
    </>
  );

  const results = (
    <>
      <HeroStat label="Monthly EMI" value={inr(a.emi, { decimals: 0 })} sub={`${n} instalments · ${inr(total, { decimals: 0 })} total repayment`} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat label="Principal" value={inr(P, { decimals: 0 })} />
        <Stat label="Total interest" value={inr(a.totalInterest, { decimals: 0 })} tone="warn" sub={`${pct((a.totalInterest / P) * 100, 1)} of principal`} />
        <Stat label="Processing fee" value={inr(feeAmt, { decimals: 0 })} />
      </div>
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-surface-3" role="img" aria-label={`Principal ${pct((P / total) * 100, 0)}, interest ${pct((a.totalInterest / total) * 100, 0)}`}><div className="bg-accent" style={{ width: `${(P / total) * 100}%` }} /><div className="bg-warn" style={{ width: `${(a.totalInterest / total) * 100}%` }} /></div>
      <div className="flex justify-between text-xs text-muted"><span><span className="inline-block h-2 w-2 rounded-full bg-accent mr-1.5" />Principal {pct((P / total) * 100, 0)}</span><span><span className="inline-block h-2 w-2 rounded-full bg-warn mr-1.5" />Interest {pct((a.totalInterest / total) * 100, 0)}</span></div>
      <div className="flex items-center justify-between"><Segmented value={view} onChange={setView} options={[{ value: "yearly", label: "Yearly" }, { value: "monthly", label: "Monthly" }]} size="sm" className="w-auto" /><Button size="sm" variant="ghost" onClick={csv}><Download className="h-3.5 w-3.5" /> CSV</Button></div>
      <div className="max-h-[360px] overflow-auto rounded-xl border border-border">
        <table className="w-full text-xs">
          <thead className="sticky top-0 bg-surface-2 text-left text-[10.5px] uppercase tracking-[0.1em] text-muted"><tr><th className="px-3 py-2">{view === "yearly" ? "Year" : "Month"}</th><th className="px-3 py-2 text-right">Principal</th><th className="px-3 py-2 text-right">Interest</th><th className="px-3 py-2 text-right">Balance</th></tr></thead>
          <tbody className="tabular">
            {(view === "yearly" ? yearly.map((y) => ({ k: y.y, p: y.principal, i: y.interest, b: y.balance })) : a.rows.map((x) => ({ k: x.m, p: x.principal, i: x.interest, b: x.balance }))).map((row) => <tr key={row.k} className="border-t border-border"><td className="px-3 py-1.5 text-muted">{row.k}</td><td className="px-3 py-1.5 text-right">{inr(row.p, { decimals: 0 })}</td><td className="px-3 py-1.5 text-right">{inr(row.i, { decimals: 0 })}</td><td className="px-3 py-1.5 text-right">{inr(row.b, { decimals: 0 })}</td></tr>)}
          </tbody>
        </table>
      </div>
      <KV rows={[["Interest per ₹1 lakh / year", inr((a.totalInterest / P) * 100000 / (n / 12), { decimals: 0 })], ["Effective cost incl. fee", pct(((a.totalInterest + feeAmt) / P) * 100, 2)]]} />
    </>
  );

  return <CalculatorShell inputs={inputs} results={results} inputTitle="Loan details" resultTitle="Repayment" note="EMI = P × i × (1+i)ⁿ ÷ ((1+i)ⁿ − 1), where i is the monthly rate. Reducing-balance method as used by Indian banks and NBFCs." />;
}
