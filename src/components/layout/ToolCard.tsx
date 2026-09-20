"use client";
import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";
import type { ToolMeta } from "@/lib/registry";
import { categoryById } from "@/lib/categories";
import { ToolBadge } from "@/components/ui/Badge";
import { CategoryIcon } from "./icons";
import { useFavorites } from "@/lib/hooks";
import { cn } from "@/lib/cn";

export function ToolCard({ tool, index = 0 }: { tool: ToolMeta; index?: number }) {
  const cat = categoryById(tool.category);
  const { has, toggle } = useFavorites();
  const fav = has(tool.slug);
  return (
    <article className="group relative flex flex-col rounded-2xl border border-border bg-surface p-5 shadow-sm transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md hover:border-border-strong animate-fade-up" style={{ animationDelay: `${Math.min(index, 12) * 30}ms` }}>
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 text-ink-2 group-hover:bg-accent-soft group-hover:text-accent-text transition-colors">
          <CategoryIcon name={cat.icon} className="h-5 w-5" />
        </span>
        <div className="flex items-center gap-2">
          <ToolBadge badge={tool.badge} />
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); toggle(tool.slug); }}
            aria-label={fav ? "Remove from favourites" : "Add to favourites"}
            aria-pressed={fav}
            className={cn("relative z-10 inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors cursor-pointer", fav ? "text-danger" : "text-faint hover:text-ink hover:bg-surface-2")}
          >
            <Heart className="h-4 w-4" strokeWidth={1.75} fill={fav ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
      <h3 className="mt-4 text-[15px] font-semibold leading-snug text-ink">
        <Link href={`/tools/${tool.slug}`} className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none">{tool.name}</Link>
      </h3>
      <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted">{tool.description}</p>
      <div className="mt-auto flex items-center justify-between pt-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
        <span className="truncate">{tool.sub}</span>
        <span className="inline-flex items-center gap-1 text-accent-text opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">Open <ArrowUpRight className="h-3.5 w-3.5" /></span>
      </div>
    </article>
  );
}
