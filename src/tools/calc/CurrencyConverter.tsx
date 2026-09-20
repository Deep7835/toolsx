"use client";
import { useEffect, useState } from "react";
import { ArrowLeftRight, RefreshCw } from "lucide-react";
import { CalculatorShell } from "@/components/shell/CalculatorShell";
import { NumberInput, Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { HeroStat, KV, Stat } from "@/components/ui/Stat";
import { num } from "@/lib/format";

const CURRENCIES = [["INR", "Indian rupee"], ["USD", "US dollar"], ["EUR", "Euro"], ["GBP", "British pound"], ["AED", "UAE dirham"], ["SAR", "Saudi riyal"], ["QAR", "Qatari riyal"], ["KWD", "Kuwaiti dinar"], ["OMR", "Omani rial"], ["BHD", "Bahraini dinar"], ["SGD", "Singapore dollar"], ["JPY", "Japanese yen"], ["CNY", "Chinese yuan"], ["AUD", "Australian dollar"], ["CAD", "Canadian dollar"], ["CHF", "Swiss franc"], ["HKD", "Hong Kong dollar"], ["MYR", "Malaysian ringgit"], ["THB", "Thai baht"], ["BDT", "Bangladeshi taka"], ["LKR", "Sri Lankan rupee"], ["NPR", "Nepalese rupee"], ["ZAR", "South African rand"], ["RUB", "Russian rouble"]];
const FALLBACK: Record<string, number> = { INR: 1, USD: 0.01138, EUR: 0.0102, GBP: 0.0087, AED: 0.0418, SAR: 0.0427, QAR: 0.0414, KWD: 0.0035, OMR: 0.00438, BHD: 0.00429, SGD: 0.0149, JPY: 1.68, CNY: 0.0807, AUD: 0.0172, CAD: 0.0156, CHF: 0.0094, HKD: 0.0886, MYR: 0.049, THB: 0.37, BDT: 1.36, LKR: 3.4, NPR: 1.6, ZAR: 0.2, RUB: 0.98 };

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(1000);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [status, setStatus] = useState<"loading" | "live" | "offline">("loading");
  const [updated, setUpdated] = useState("");
  const [tick, setTick] = useState(0);
  const [markup, setMarkup] = useState(0);

  useEffect(() => {
    let alive = true;
    fetch("https://open.er-api.com/v6/latest/INR").then((r) => r.json()).then((j) => { if (!alive) return; if (j?.rates) { setRates(j.rates); setStatus("live"); setUpdated(j.time_last_update_utc ?? ""); try { localStorage.setItem("ibt:fx", JSON.stringify({ rates: j.rates, updated: j.time_last_update_utc })); } catch {} } else throw new Error(); }).catch(() => { if (!alive) return; try { const c = JSON.parse(localStorage.getItem("ibt:fx") ?? "null"); if (c?.rates) { setRates(c.rates); setUpdated(c.updated + " (cached)"); setStatus("offline"); return; } } catch {} setRates(FALLBACK); setStatus("offline"); });
    return () => { alive = false; };
  }, [tick]);

  const R = rates ?? FALLBACK; // rates are per 1 INR
  const rate = (R[to] ?? 1) / (R[from] ?? 1);
  const eff = rate * (1 - markup / 100);
  const out = amount * eff;
  const opts = CURRENCIES.map(([c, n]) => ({ value: c, label: `${c} — ${n}` }));
  const majors = ["USD", "EUR", "GBP", "AED", "SAR", "SGD", "JPY", "CNY"].filter((c) => c !== from);

  const inputs = (
    <>
      <NumberInput label="Amount" value={amount} onChange={setAmount} prefix={from === "INR" ? "₹" : undefined} />
      <Select label="From" value={from} onChange={(e) => setFrom(e.target.value)} options={opts} />
      <Button variant="secondary" size="sm" className="justify-self-start" onClick={() => { setFrom(to); setTo(from); }}><ArrowLeftRight className="h-3.5 w-3.5" /> Swap</Button>
      <Select label="To" value={to} onChange={(e) => setTo(e.target.value)} options={opts} />
      <NumberInput label="Bank / forex markup" suffix="%" value={markup} onChange={setMarkup} step={0.25} help="Banks typically charge 1–3% over the mid-market rate." />
    </>
  );
  const results = (
    <>
      <HeroStat label={`${num(amount)} ${from} =`} value={`${num(out, out < 10 ? 4 : 2)} ${to}`} sub={`1 ${from} = ${num(eff, eff < 1 ? 6 : 4)} ${to}${markup ? ` after ${markup}% markup` : ""}`} />
      <div className="grid grid-cols-2 gap-3"><Stat label="Mid-market rate" value={`${num(rate, rate < 1 ? 6 : 4)}`} sub={`1 ${from} in ${to}`} /><Stat label="Inverse" value={`${num(1 / rate, 1 / rate < 1 ? 6 : 4)}`} sub={`1 ${to} in ${from}`} /></div>
      <KV rows={majors.map((c) => [`1 ${from} in ${c}`, num((R[c] ?? 1) / (R[from] ?? 1), 4)])} />
      <div className="flex items-center justify-between text-xs text-muted"><span className="inline-flex items-center gap-1.5"><span className={`h-1.5 w-1.5 rounded-full ${status === "live" ? "bg-accent" : status === "loading" ? "bg-warn" : "bg-faint"}`} />{status === "live" ? `Live rates · ${updated}` : status === "loading" ? "Fetching live rates…" : `Offline — using ${updated ? "cached" : "approximate"} rates`}</span><Button size="sm" variant="ghost" onClick={() => { setStatus("loading"); setTick((t) => t + 1); }}><RefreshCw className="h-3.5 w-3.5" /> Refresh</Button></div>
    </>
  );
  return <CalculatorShell inputs={inputs} results={results} inputTitle="Convert" resultTitle="Conversion" note="Mid-market rates from open.er-api.com (updated daily). For export invoices, RBI reference rates or your bank's card rate will apply." />;
}
