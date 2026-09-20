"use client";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { CalculatorShell } from "@/components/shell/CalculatorShell";
import { Input, NumberInput } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { HeroStat, Stat } from "@/components/ui/Stat";
import { inr, num, pct, uid } from "@/lib/format";

interface Stage { id: string; name: string; count: number }
const DEFAULT: Stage[] = [{ id: uid(), name: "Ad impressions", count: 50000 }, { id: uid(), name: "Website visits", count: 2500 }, { id: uid(), name: "Enquiries / leads", count: 300 }, { id: uid(), name: "Quotes sent", count: 120 }, { id: uid(), name: "Customers", count: 36 }];

export default function MarketingFunnel() {
  const [stages, setStages] = useState<Stage[]>(DEFAULT);
  const [spend, setSpend] = useState(40000);
  const [aov, setAov] = useState(2500);
  const upd = (id: string, p: Partial<Stage>) => setStages(stages.map((s) => (s.id === id ? { ...s, ...p } : s)));
  const first = stages[0]?.count ?? 0, last = stages[stages.length - 1]?.count ?? 0;
  const overall = first ? (last / first) * 100 : 0;
  const steps = stages.map((s, i) => ({ ...s, rate: i === 0 ? 100 : stages[i - 1].count ? (s.count / stages[i - 1].count) * 100 : 0, drop: i === 0 ? 0 : stages[i - 1].count - s.count }));
  const worst = steps.slice(1).reduce((w, s) => (s.rate < w.rate ? s : w), steps[1] ?? steps[0]);
  const max = Math.max(first, 1);

  const inputs = (
    <>
      <div className="grid gap-2">
        {stages.map((s, i) => (
          <div key={s.id} className="grid grid-cols-[28px_1fr_120px_auto] items-center gap-2">
            <span className="text-center text-xs font-medium text-muted tabular">{i + 1}</span>
            <Input aria-label="Stage name" value={s.name} onChange={(e) => upd(s.id, { name: e.target.value })} />
            <NumberInput aria-label="Count" value={s.count} onChange={(v) => upd(s.id, { count: v })} />
            <button type="button" aria-label="Remove stage" onClick={() => setStages(stages.filter((x) => x.id !== s.id))} className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted hover:bg-danger-soft hover:text-danger cursor-pointer"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
        <Button size="sm" variant="secondary" className="justify-self-start" onClick={() => setStages([...stages, { id: uid(), name: "New stage", count: 0 }])}><Plus className="h-3.5 w-3.5" /> Add stage</Button>
      </div>
      <div className="grid grid-cols-2 gap-4"><NumberInput label="Total spend (optional)" prefix="₹" value={spend} onChange={setSpend} /><NumberInput label="Avg order value" prefix="₹" value={aov} onChange={setAov} /></div>
    </>
  );
  const results = (
    <>
      <HeroStat label="Overall conversion" value={pct(overall, 2)} sub={`${num(last)} customers from ${num(first)} at the top`} />
      <div className="grid gap-2">
        {steps.map((s, i) => (
          <div key={s.id} className="grid grid-cols-[1fr_auto] items-center gap-3">
            <div className="min-w-0"><div className="flex items-baseline justify-between text-xs"><span className="truncate font-medium text-ink">{s.name}</span><span className="tabular text-muted">{num(s.count)}</span></div><div className="mt-1 h-6 overflow-hidden rounded-md bg-surface-3"><div className={`h-full rounded-md ${worst && s.id === worst.id && i > 0 ? "bg-danger" : "bg-accent"} transition-[width] duration-300`} style={{ width: `${Math.max(1, (s.count / max) * 100)}%` }} /></div></div>
            <div className="w-20 text-right text-xs tabular">{i === 0 ? <span className="text-muted">top</span> : <><span className={`font-semibold ${s.id === worst?.id ? "text-danger" : "text-ink"}`}>{pct(s.rate, 1)}</span><div className="text-[10px] text-muted">−{num(s.drop)}</div></>}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3"><Stat label="Biggest drop-off" value={worst ? worst.name : "—"} sub={worst ? `only ${pct(worst.rate, 1)} move on` : undefined} tone="danger" /><Stat label="Cost per customer" value={spend && last ? inr(spend / last) : "—"} /><Stat label="Revenue / ROAS" value={aov && last ? `${inr(aov * last, { decimals: 0 })} · ${num(spend ? (aov * last) / spend : 0, 1)}×` : "—"} /></div>
      {worst ? <div className="rounded-xl border border-border bg-accent-soft/60 px-4 py-3 text-sm text-ink-2">Fixing “{worst.name}” to match your next-best step would add roughly <b>{num(Math.round(last * ((steps.filter((s) => s.id !== worst.id && s.rate < 100).reduce((m, s) => Math.max(m, s.rate), 0) || worst.rate) / worst.rate) - last))}</b> more customers at the same spend.</div> : null}
    </>
  );
  return <CalculatorShell inputs={inputs} results={results} inputTitle="Funnel stages" inputDescription="Top of funnel first, customers last." resultTitle="Funnel analysis" />;
}
