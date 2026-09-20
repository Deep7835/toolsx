"use client";
import { useState } from "react";
import { CalculatorShell } from "@/components/shell/CalculatorShell";
import { NumberInput, Segmented, Select, Toggle } from "@/components/ui/Field";
import { HeroStat, KV, Stat } from "@/components/ui/Stat";
import { inr, pct } from "@/lib/format";

const RATES = [0, 3, 5, 18, 40];
const COMP = [{ value: "1", label: "Traders & manufacturers — 1%" }, { value: "5", label: "Restaurants (no alcohol) — 5%" }, { value: "6", label: "Services (up to ₹50 lakh) — 6%" }];

export default function GstCalculator() {
  const [mode, setMode] = useState<"exclusive" | "inclusive">("exclusive");
  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(18);
  const [inter, setInter] = useState(false);
  const [cess, setCess] = useState(0);
  const [comp, setComp] = useState(false);
  const [compRate, setCompRate] = useState("1");

  let base = amount, tax = 0;
  if (mode === "inclusive") { base = amount / (1 + rate / 100); tax = amount - base; } else tax = amount * (rate / 100);
  const cessAmt = base * (cess / 100);
  const total = base + tax + cessAmt;
  const cgst = inter ? 0 : tax / 2, sgst = inter ? 0 : tax / 2, igst = inter ? tax : 0;
  const compTax = amount * (parseFloat(compRate) / 100);

  const inputs = (
    <>
      <Segmented value={mode} onChange={setMode} options={[{ value: "exclusive", label: "Add GST (exclusive)" }, { value: "inclusive", label: "Remove GST (inclusive)" }]} size="sm" />
      <NumberInput label={mode === "exclusive" ? "Amount before GST" : "Amount including GST"} prefix="₹" value={amount} onChange={setAmount} />
      <div>
        <div className="mb-1.5 text-[13px] font-medium text-ink-2">GST rate</div>
        <div className="flex flex-wrap gap-2">
          {RATES.map((r) => <button key={r} type="button" onClick={() => setRate(r)} aria-pressed={rate === r} className={`h-10 min-w-[56px] rounded-xl border px-3 text-sm font-medium transition-colors cursor-pointer ${rate === r ? "border-ink bg-ink text-bg dark:border-accent dark:bg-accent dark:text-on-accent" : "border-border bg-surface text-ink-2 hover:border-border-strong"}`}>{r}%</button>)}
          <NumberInput aria-label="Custom rate" value={rate} onChange={setRate} suffix="%" wrapClassName="w-28" step={0.25} />
        </div>
      </div>
      <Segmented value={inter ? "igst" : "cgst"} onChange={(v) => setInter(v === "igst")} options={[{ value: "cgst", label: "Intra-state · CGST + SGST" }, { value: "igst", label: "Inter-state · IGST" }]} size="sm" />
      <NumberInput label="Compensation cess" hint="optional" suffix="%" value={cess} onChange={setCess} help="Applies to tobacco, aerated drinks, luxury cars, coal." />
      <Toggle checked={comp} onChange={setComp} label="Compare with Composition scheme" help="Flat tax on turnover; no input tax credit; cannot charge GST on invoice." />
      {comp ? <Select label="Composition category" value={compRate} onChange={(e) => setCompRate(e.target.value)} options={COMP} /> : null}
    </>
  );

  const results = (
    <>
      <HeroStat label={mode === "exclusive" ? "Total incl. GST" : "Base amount (excl. GST)"} value={inr(mode === "exclusive" ? total : base)} sub={`GST @ ${rate}% = ${inr(tax)}${cess ? ` · cess ${inr(cessAmt)}` : ""}`} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {inter ? <Stat label="IGST" value={inr(igst)} sub={`${rate}%`} /> : <><Stat label="CGST" value={inr(cgst)} sub={`${rate / 2}%`} /><Stat label="SGST / UTGST" value={inr(sgst)} sub={`${rate / 2}%`} /></>}
        <Stat label="Taxable value" value={inr(base)} />
      </div>
      <KV rows={[["Taxable value", inr(base)], [`GST ${rate}%`, inr(tax)], cess ? [`Cess ${cess}%`, inr(cessAmt)] : null]} total={["Invoice total", inr(total)]} />
      {comp ? (
        <div className="rounded-xl border border-border bg-surface-2/60 p-4 text-sm">
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">Composition scheme comparison</div>
          <div className="mt-2 grid grid-cols-2 gap-3"><Stat label="Regular: tax collected" value={inr(tax)} sub="charged to customer, ITC available" /><Stat label={`Composition ${compRate}% of turnover`} value={inr(compTax)} sub="paid from own pocket, no ITC" tone="warn" /></div>
          <p className="mt-3 text-xs leading-relaxed text-muted">Composition suits small B2C businesses with turnover up to ₹1.5 crore (₹50 lakh for services) who buy little taxable input. Effective burden: {pct((compTax / amount) * 100, 2)} of sales vs GST passed through at {rate}%.</p>
        </div>
      ) : null}
    </>
  );

  return <CalculatorShell inputs={inputs} results={results} inputTitle="GST inputs" resultTitle="Tax breakdown" note="Intra-state supplies split GST equally into CGST and SGST/UTGST; inter-state supplies attract IGST at the full rate. From 22 Sep 2025 the 12% and 28% slabs were merged into 5% / 18%, with 40% for sin & luxury goods — type a custom rate for older invoices." />;
}
