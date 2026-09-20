import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: ReactNode; description?: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{eyebrow}</p> : null}
        <h1 className="mt-2 font-display text-4xl tracking-tight text-ink sm:text-5xl">{title}</h1>
        {description ? <p className="mt-3 text-[15px] leading-relaxed text-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
