import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("bg-surface border border-border rounded-2xl shadow-sm", className)} {...rest}>
      {children}
    </div>
  );
}

export function CardHeader({ title, description, icon, action, className }: { title: ReactNode; description?: ReactNode; icon?: ReactNode; action?: ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-start justify-between gap-4 px-5 pt-5 pb-4 border-b border-border", className)}>
      <div className="flex items-start gap-3 min-w-0">
        {icon ? <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent-text">{icon}</span> : null}
        <div className="min-w-0">
          <h2 className="text-[15px] font-semibold text-ink leading-tight">{title}</h2>
          {description ? <p className="text-[13px] text-muted mt-1 leading-snug">{description}</p> : null}
        </div>
      </div>
      {action}
    </div>
  );
}

export const CardBody = ({ className, children }: { className?: string; children: ReactNode }) => <div className={cn("p-5", className)}>{children}</div>;
