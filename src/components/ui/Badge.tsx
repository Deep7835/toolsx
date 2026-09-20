import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { Badge as BadgeKind } from "@/lib/registry";

const tones: Record<string, string> = {
  neutral: "bg-surface-2 text-ink-2 border-border",
  accent: "bg-accent-soft text-accent-text border-transparent",
  info: "bg-info-soft text-info border-transparent",
  warn: "bg-warn-soft text-warn border-transparent",
  danger: "bg-danger-soft text-danger border-transparent",
};

export function Badge({ children, tone = "neutral", className }: { children: ReactNode; tone?: keyof typeof tones; className?: string }) {
  return <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.08em] leading-4", tones[tone], className)}>{children}</span>;
}

export function ToolBadge({ badge }: { badge?: BadgeKind }) {
  if (!badge) return null;
  const map: Record<BadgeKind, { label: string; tone: keyof typeof tones }> = {
    popular: { label: "Popular", tone: "accent" },
    new: { label: "New", tone: "info" },
    updated: { label: "Updated", tone: "warn" },
    ai: { label: "AI", tone: "accent" },
    live: { label: "Live", tone: "warn" },
  };
  const m = map[badge];
  return <Badge tone={m.tone}>{m.label}</Badge>;
}
