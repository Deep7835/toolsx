import type { ReactNode } from "react";

export function Empty({ icon, title, hint, action }: { icon?: ReactNode; title: string; hint?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6">
      {icon ? <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-2 text-muted">{icon}</div> : null}
      <p className="text-sm font-medium text-ink">{title}</p>
      {hint ? <p className="text-xs text-muted mt-1 max-w-xs">{hint}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
