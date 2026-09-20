"use client";
import { useMemo, useState, type ReactNode } from "react";
import { Share2, RotateCcw } from "lucide-react";
import { CalculatorShell } from "./CalculatorShell";
import { Input, NumberInput, Select, Segmented, Row } from "@/components/ui/Field";
import { HeroStat, KV, Stat } from "@/components/ui/Stat";
import { Button } from "@/components/ui/Button";
import { shareWhatsApp } from "@/lib/export";
import { inr, num, pct } from "@/lib/format";

export type Val = Record<string, number | string>;

export interface CalcInput {
  key: string;
  label: string;
  type?: "number" | "currency" | "percent" | "select" | "date" | "text" | "months" | "days" | "years" | "hours" | "kg" | "cm" | "km";
  default: number | string;
  options?: Array<{ value: string; label: string }>;
  hint?: string;
  help?: string;
  min?: number;
  max?: number;
  step?: number;
  half?: boolean;
  group?: string;
  showIf?: (v: Val) => boolean;
}

export interface CalcResult {
  primary: { label: string; value: string; sub?: string };
  rows?: Array<[ReactNode, ReactNode] | null | false>;
  tiles?: Array<{ label: string; value: string; sub?: string; tone?: "default" | "accent" | "danger" | "warn" | "info" }>;
  insight?: ReactNode;
  bars?: Array<{ label: string; value: number; display?: string; tone?: "accent" | "muted" | "danger" | "warn" }>;
  share?: string;
}

export interface CalcSpec {
  inputs: CalcInput[];
  compute: (v: Val) => CalcResult;
  inputTitle?: string;
  inputDescription?: string;
  resultTitle?: string;
  note?: ReactNode;
  formula?: string;
  modes?: { key: string; label: string; options: Array<{ value: string; label: string }> };
}

const suffix: Record<string, string> = { percent: "%", months: "months", days: "days", years: "years", hours: "hrs", kg: "kg", cm: "cm", km: "km" };

export function Bars({ bars }: { bars: NonNullable<CalcResult["bars"]> }) {
  const max = Math.max(...bars.map((b) => Math.abs(b.value)), 1);
  const cls = { accent: "bg-accent", muted: "bg-border-strong", danger: "bg-danger", warn: "bg-warn" };
  return (
    <div className="grid gap-2.5">
      {bars.map((b, i) => (
        <div key={i} className="grid grid-cols-[110px_1fr_auto] items-center gap-3 text-xs">
          <span className="truncate text-muted">{b.label}</span>
          <div className="h-2.5 overflow-hidden rounded-full bg-surface-3"><div className={`h-full rounded-full ${cls[b.tone ?? "accent"]} transition-[width] duration-300`} style={{ width: `${Math.max(2, (Math.abs(b.value) / max) * 100)}%` }} /></div>
          <span className="tabular font-medium text-ink">{b.display ?? num(b.value)}</span>
        </div>
      ))}
    </div>
  );
}

export function SimpleCalc({ spec }: { spec: CalcSpec }) {
  const defaults = useMemo(() => Object.fromEntries(spec.inputs.map((i) => [i.key, i.default])) as Val, [spec]);
  const [v, setV] = useState<Val>(defaults);
  const set = (k: string, x: number | string) => setV((p) => ({ ...p, [k]: x }));
  const r = useMemo(() => { try { return spec.compute(v); } catch { return { primary: { label: "Result", value: "—" } } as CalcResult; } }, [spec, v]);
  const visible = spec.inputs.filter((i) => !i.showIf || i.showIf(v));
  const groups = Array.from(new Set(visible.map((i) => i.group ?? "")));

  const inputs = (
    <>
      {spec.modes ? <Segmented value={String(v[spec.modes.key])} onChange={(x) => set(spec.modes!.key, x)} options={spec.modes.options} size="sm" /> : null}
      {groups.map((g) => (
        <div key={g} className="grid gap-4">
          {g ? <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">{g}</div> : null}
          <Row>
            {visible.filter((i) => (i.group ?? "") === g).map((i) => {
              const wrap = i.half ? "" : "sm:col-span-2";
              if (i.type === "select") return <Select key={i.key} label={i.label} hint={i.hint} help={i.help} value={String(v[i.key])} onChange={(e) => set(i.key, e.target.value)} options={i.options ?? []} wrapClassName={wrap} />;
              if (i.type === "date") return <Input key={i.key} label={i.label} hint={i.hint} help={i.help} type="date" value={String(v[i.key])} onChange={(e) => set(i.key, e.target.value)} wrapClassName={wrap} />;
              if (i.type === "text") return <Input key={i.key} label={i.label} hint={i.hint} help={i.help} value={String(v[i.key])} onChange={(e) => set(i.key, e.target.value)} wrapClassName={wrap} />;
              return <NumberInput key={i.key} label={i.label} hint={i.hint} help={i.help} value={Number(v[i.key])} onChange={(x) => set(i.key, x)} prefix={i.type === "currency" ? "₹" : undefined} suffix={i.type ? suffix[i.type] : undefined} min={i.min} max={i.max} step={i.step} wrapClassName={wrap} />;
            })}
          </Row>
        </div>
      ))}
      <Button variant="ghost" size="sm" className="justify-self-start" onClick={() => setV(defaults)}><RotateCcw className="h-3.5 w-3.5" /> Reset</Button>
    </>
  );

  const shareText = r.share ?? `${r.primary.label}: ${r.primary.value}${r.rows ? "\n" + r.rows.filter(Boolean).map((row) => { const [k, val] = row as [ReactNode, ReactNode]; return `${String(k)}: ${String(val)}`; }).join("\n") : ""}\n— via Kaagazo`;

  const results = (
    <>
      <HeroStat label={r.primary.label} value={r.primary.value} sub={r.primary.sub} />
      {r.tiles?.length ? <div className={`grid gap-3 ${r.tiles.length >= 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2"}`}>{r.tiles.map((t, i) => <Stat key={i} label={t.label} value={t.value} sub={t.sub} tone={t.tone} />)}</div> : null}
      {r.bars?.length ? <Bars bars={r.bars} /> : null}
      {r.rows?.length ? <KV rows={r.rows} /> : null}
      {r.insight ? <div className="rounded-xl border border-border bg-accent-soft/60 px-4 py-3 text-sm leading-relaxed text-ink-2">{r.insight}</div> : null}
      {spec.formula ? <div className="rounded-xl bg-surface-2/60 px-4 py-3 font-mono text-xs leading-relaxed text-muted">{spec.formula}</div> : null}
    </>
  );

  return (
    <CalculatorShell
      inputs={inputs}
      results={results}
      inputTitle={spec.inputTitle}
      inputDescription={spec.inputDescription}
      resultTitle={spec.resultTitle ?? "Results"}
      resultAction={<Button size="sm" variant="ghost" onClick={() => shareWhatsApp(shareText)}><Share2 className="h-3.5 w-3.5" /> Share</Button>}
      note={spec.note}
    />
  );
}

/* helpers exported for specs */
export const n = (x: number | string) => (typeof x === "number" ? x : parseFloat(x) || 0);
export const safeDiv = (a: number, b: number) => (b === 0 ? 0 : a / b);
export { inr, num, pct };
