"use client";
import { useEffect, useMemo, useRef, useState, createContext, useContext, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, CornerDownLeft } from "lucide-react";
import { TOOLS } from "@/lib/registry";
import { categoryById } from "@/lib/categories";
import { cn } from "@/lib/cn";

const Ctx = createContext<{ open: () => void }>({ open: () => {} });
export const useSearch = () => useContext(Ctx);

export function searchTools(q: string) {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  const terms = s.split(/\s+/);
  return TOOLS.map((t) => {
    const hay = `${t.name} ${t.description} ${t.tag} ${t.sub} ${(t.keywords ?? []).join(" ")} ${categoryById(t.category).name}`.toLowerCase();
    let score = 0;
    for (const term of terms) {
      if (t.name.toLowerCase().startsWith(term)) score += 6;
      else if (t.name.toLowerCase().includes(term)) score += 4;
      else if ((t.keywords ?? []).some((k) => k.includes(term))) score += 3;
      else if (hay.includes(term)) score += 1;
      else return { t, score: -1 };
    }
    return { t, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.t);
}

export function SearchProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => (q ? searchTools(q).slice(0, 10) : TOOLS.filter((t) => t.badge === "popular" || ["upi-standee", "gst-calculator", "emi-calculator", "in-hand-salary", "whatsapp-direct", "income-tax"].includes(t.slug)).slice(0, 7)), [q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setQ(""); setIdx(0); setOpen((o) => !o); }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    document.body.style.overflow = "hidden";
    return () => { clearTimeout(t); document.body.style.overflow = ""; };
  }, [open]);

  const openPalette = () => { setQ(""); setIdx(0); setOpen(true); };
  const go = (slug: string) => { setOpen(false); router.push(`/tools/${slug}`); };

  return (
    <Ctx.Provider value={{ open: openPalette }}>
      {children}
      {open ? (
        <div className="fixed inset-0 z-[900] flex items-start justify-center px-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label="Search tools">
          <div className="absolute inset-0 bg-ink/40 dark:bg-black/60 backdrop-blur-[2px]" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-surface shadow-lg animate-fade-up">
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="h-[18px] w-[18px] text-muted shrink-0" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => { setQ(e.target.value); setIdx(0); }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(results.length - 1, i + 1)); }
                  if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(0, i - 1)); }
                  if (e.key === "Enter" && results[idx]) go(results[idx].slug);
                }}
                placeholder="Search 115 tools — GST, invoice, EMI, QR, salary…"
                className="h-14 w-full bg-transparent text-[15px] text-ink placeholder:text-muted outline-none"
                aria-label="Search tools"
              />
              <kbd className="hidden sm:inline-flex h-6 items-center rounded-md border border-border bg-surface-2 px-1.5 text-[11px] text-muted">esc</kbd>
            </div>
            <ul className="max-h-[52vh] overflow-y-auto py-2" role="listbox">
              {!q ? <li className="px-4 pb-1 pt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">Popular</li> : null}
              {results.length === 0 ? <li className="px-4 py-8 text-center text-sm text-muted">No tools match “{q}”.</li> : null}
              {results.map((t, i) => (
                <li key={t.slug} role="option" aria-selected={i === idx}>
                  <button type="button" onMouseEnter={() => setIdx(i)} onClick={() => go(t.slug)} className={cn("flex w-full items-center gap-3 px-4 py-2.5 text-left cursor-pointer", i === idx ? "bg-surface-2" : "")}>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-ink">{t.name}</span>
                      <span className="block truncate text-xs text-muted">{categoryById(t.category).name} · {t.sub}</span>
                    </span>
                    {i === idx ? <CornerDownLeft className="h-4 w-4 text-muted" /> : <ArrowRight className="h-4 w-4 text-faint" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </Ctx.Provider>
  );
}

export function SearchButton({ className, variant = "full" }: { className?: string; variant?: "full" | "icon" }) {
  const { open } = useSearch();
  if (variant === "icon")
    return (
      <button type="button" onClick={open} aria-label="Search tools" className={cn("h-10 w-10 items-center justify-center rounded-xl text-ink-2 hover:bg-surface-2 hover:text-ink transition-colors cursor-pointer", className ?? "inline-flex")}>
        <Search className="h-[18px] w-[18px]" strokeWidth={1.75} />
      </button>
    );
  return (
    <button type="button" onClick={open} className={cn("group h-10 items-center gap-2 rounded-xl border border-border bg-surface px-3 text-sm text-muted hover:border-border-strong hover:text-ink transition-colors cursor-pointer", className ?? "inline-flex")}>
      <Search className="h-4 w-4" strokeWidth={1.75} />
      <span className="pr-6">Search tools</span>
      <kbd className="ml-auto inline-flex h-5 items-center rounded-md border border-border bg-surface-2 px-1.5 font-sans text-[11px] text-muted">⌘K</kbd>
    </button>
  );
}
