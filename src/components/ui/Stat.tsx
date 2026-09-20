import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Stat({ label, value, sub, tone = "default", className, big }: { label: ReactNode; value: ReactNode; sub?: ReactNode; tone?: "default" | "accent" | "danger" | "warn" | "info"; className?: string; big?: boolean }) {
  const toneCls = { default: "text-ink", accent: "text-accent-text", danger: "text-danger", warn: "text-warn", info: "text-info" }[tone];
  return (
    <div className={cn("rounded-xl border border-border bg-surface-2/60 px-4 py-3.5 min-w-0", className)}>
      <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">{label}</div>
      <div className={cn("tabular font-semibold mt-1 truncate", big ? "text-3xl sm:text-4xl font-display tracking-tight" : "text-xl", toneCls)}>{value}</div>
      {sub ? <div className="text-xs text-muted mt-1">{sub}</div> : null}
    </div>
  );
}

export function HeroStat({ label, value, sub, className }: { label: ReactNode; value: ReactNode; sub?: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl bg-ink text-bg px-6 py-6 dark:bg-accent-soft dark:text-ink", className)}>
      <div className="text-[11px] font-semibold uppercase tracking-[0.12em] opacity-70">{label}</div>
      <div className="tabular font-display text-4xl sm:text-5xl mt-2 tracking-tight leading-none">{value}</div>
      {sub ? <div className="text-sm opacity-75 mt-3">{sub}</div> : null}
    </div>
  );
}

export function KV({ rows, className, total }: { rows: Array<[ReactNode, ReactNode] | null | false>; className?: string; total?: [ReactNode, ReactNode] }) {
  return (
    <dl className={cn("divide-y divide-border text-sm", className)}>
      {rows.filter(Boolean).map((r, i) => {
        const [k, v] = r as [ReactNode, ReactNode];
        return (
          <div key={i} className="flex items-baseline justify-between gap-4 py-2.5">
            <dt className="text-muted">{k}</dt>
            <dd className="tabular font-medium text-ink text-right">{v}</dd>
          </div>
        );
      })}
      {total ? (
        <div className="flex items-baseline justify-between gap-4 py-3">
          <dt className="font-semibold text-ink">{total[0]}</dt>
          <dd className="tabular font-semibold text-accent-text text-lg text-right">{total[1]}</dd>
        </div>
      ) : null}
    </dl>
  );
}
