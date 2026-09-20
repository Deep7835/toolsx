"use client";
import { Heart } from "lucide-react";
import { useFavorites } from "@/lib/hooks";
import { cn } from "@/lib/cn";

export function FavButton({ slug }: { slug: string }) {
  const { has, toggle } = useFavorites();
  const fav = has(slug);
  return (
    <button type="button" onClick={() => toggle(slug)} aria-pressed={fav} className={cn("inline-flex h-11 shrink-0 items-center gap-2 rounded-xl border px-4 text-sm font-medium transition-colors cursor-pointer", fav ? "border-danger/30 bg-danger-soft text-danger" : "border-border bg-surface text-ink-2 hover:border-border-strong hover:text-ink")}>
      <Heart className="h-4 w-4" strokeWidth={1.75} fill={fav ? "currentColor" : "none"} /> {fav ? "Saved" : "Save tool"}
    </button>
  );
}
