"use client";
import { useState } from "react";
import { CalculatorShell } from "@/components/shell/CalculatorShell";
import { NumberInput, Select, Toggle } from "@/components/ui/Field";
import { HeroStat, KV, Stat } from "@/components/ui/Stat";
import { inr, pct } from "@/lib/format";

interface Sec { code: string; name: string; rate: (v: { ind: boolean; variant: string }) => number; threshold: number; thresholdNote: string; variants?: Array<{ v: string; l: string }>; note: string }
const SECTIONS: Sec[] = [
  { code: "194C", name: "Contractor / sub-contractor payments", rate: ({ ind }) => (ind ? 1 : 2), threshold: 30000, thresholdNote: "₹30,000 per contract or ₹1,00,000 aggregate in the year", note: "1% if payee is an individual/HUF, 2% otherwise. Transport contractors owning ≤10 vehicles with PAN: nil." },
  { code: "194J", name: "Professional / technical fees", rate: ({ variant }) => (variant === "tech" ? 2 : 10), threshold: 50000, thresholdNote: "₹50,000 per year per category", variants: [{ v: "prof", l: "Professional fees (CA, lawyer, doctor, consultant) — 10%" }, { v: "tech", l: "Technical services / call centre / royalty on films — 2%" }], note: "Directors’ sitting fees have no threshold." },
  { code: "194I", name: "Rent", rate: ({ variant }) => (variant === "pm" ? 2 : 10), threshold: 600000, thresholdNote: "₹6,00,000 per year (₹50,000 per month)", variants: [{ v: "lb", l: "Land, building, furniture — 10%" }, { v: "pm", l: "Plant, machinery, equipment — 2%" }], note: "Individuals/HUF not under audit paying > ₹50,000/month deduct 2% under 194-IB instead." },
  { code: "194A", name: "Interest (other than securities)", rate: () => 10, threshold: 10000, thresholdNote: "₹10,000 (₹50,000 from banks; ₹1,00,000 for senior citizens from banks)", note: "Interest paid by firms to partners is not covered." },
  { code: "194H", name: "Commission / brokerage", rate: () => 2, threshold: 20000, thresholdNote: "₹20,000 per year", note: "Insurance commission falls under 194D." },
  { code: "194Q", name: "Purchase of goods", rate: () => 0.1, threshold: 5000000, thresholdNote: "On purchases exceeding ₹50 lakh in the year (buyer turnover > ₹10 crore)", note: "Deducted only on the amount above ₹50 lakh." },
];

export default function TdsCalculator() {
  const [code, setCode] = useState("194C");
  const [amount, setAmount] = useState(150000);
  const [ind, setInd] = useState(true);
  const [variant, setVariant] = useState("prof");
  const [pan, setPan] = useState(true);
  const [ytd, setYtd] = useState(0);
  const s = SECTIONS.find((x) => x.code === code)!;
  const baseRate = s.rate({ ind, variant: s.variants ? variant : "" });
  const rate = pan ? baseRate : Math.max(20, baseRate);
  const total = amount + ytd;
  const applicable = code === "194Q" ? amount + ytd > s.threshold : code === "194C" ? amount >= s.threshold || total >= 100000 : total >= s.threshold;
  const base = code === "194Q" ? Math.max(0, Math.min(amount, total - s.threshold)) : amount;
  const tds = applicable ? base * (rate / 100) : 0;

  const inputs = (
    <>
      <Select label="Section / nature of payment" value={code} onChange={(e) => { setCode(e.target.value); const sec = SECTIONS.find((x) => x.code === e.target.value)!; if (sec.variants) setVariant(sec.variants[0].v); }} options={SECTIONS.map((x) => ({ value: x.code, label: `${x.code} · ${x.name}` }))} />
      {s.variants ? <Select label="Type" value={variant} onChange={(e) => setVariant(e.target.value)} options={s.variants.map((x) => ({ value: x.v, label: x.l }))} /> : null}
      <NumberInput label="Payment amount" prefix="₹" value={amount} onChange={setAmount} />
      <NumberInput label="Earlier payments to same payee this FY" prefix="₹" value={ytd} onChange={setYtd} help="Used to check the annual threshold." />
      {code === "194C" ? <Toggle checked={ind} onChange={setInd} label="Payee is an individual or HUF" help="1% instead of 2%." /> : null}
      <Toggle checked={pan} onChange={setPan} label="Payee has furnished PAN" help="Without PAN, TDS is deducted at 20% (Sec 206AA)." />
    </>
  );
  const results = (
    <>
      <HeroStat label={applicable ? `TDS to deduct u/s ${code}` : "No TDS — below threshold"} value={inr(tds)} sub={applicable ? `${pct(rate, 2)} on ${inr(base)}${!pan ? " (no PAN → 20%)" : ""}` : `Threshold: ${s.thresholdNote}`} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3"><Stat label="Net payable to payee" value={inr(amount - tds)} /><Stat label="Rate" value={pct(rate, 2)} /><Stat label="Deposit by" value="7th of next month" sub="30 April for March" /></div>
      <KV rows={[["Section", `${code} — ${s.name}`], ["Threshold", s.thresholdNote], ["Cumulative paid this FY", inr(total)], ["Applicable", applicable ? "Yes" : "No"]]} />
      <p className="text-xs leading-relaxed text-muted">{s.note} File quarterly return in Form 26Q; issue Form 16A within 15 days of filing. Late deduction interest: 1% per month; late deposit: 1.5% per month.</p>
    </>
  );
  return <CalculatorShell inputs={inputs} results={results} inputTitle="Payment details" resultTitle="TDS computation" note="Rates and thresholds per Finance Act 2025 (FY 2025-26 onwards). Lower/nil deduction certificates under Sec 197 override these rates." />;
}
