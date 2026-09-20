"use client";
import { useMemo, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { TOOLS, type ToolMeta } from "@/lib/registry";
import { CATEGORIES, type CategoryId } from "@/lib/categories";
import { ToolCard } from "./ToolCard";
import { searchTools } from "./SearchCommand";
import { cn } from "@/lib/cn";
import { Empty } from "@/components/ui/Empty";

export function ToolGrid({ tools = TOOLS, showFilters = true, lockedCategory }: { tools?: ToolMeta[]; showFilters?: boolean; lockedCategory?: CategoryId }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [cat, setCat] = useState<CategoryId | "all">(lockedCategory ?? ((params.get("category") as CategoryId) || "all"));

  const list = useMemo(() => {
    let l = q ? searchTools(q).filter((t) => tools.includes(t)) : tools;
    if (cat !== "all") l = l.filter((t) => t.category === cat);
    return l;
  }, [q, cat, tools]);

  const counts = useMemo(() => {
    const m: Record<string, number> = { all: tools.length };
    for (const t of tools) m[t.category] = (m[t.category] ?? 0) + 1;
    return m;
  }, [tools]);

  return (
    <div>
      {showFilters ? (
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted" />
            <input
              value={q}
              onChange={(e) => { setQ(e.target.value); const sp = new URLSearchParams(params.toString()); if (e.target.value) sp.set("q", e.target.value); else sp.delete("q"); router.replace(`${pathname}?${sp.toString()}`, { scroll: false }); }}
              placeholder="Search by name, keyword or task — e.g. “invoice”, “salary”, “QR”"
              className="h-13 w-full rounded-2xl border border-border bg-surface pl-12 pr-4 text-[15px] text-ink shadow-sm placeholder:text-muted hover:border-border-strong focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10 transition"
              aria-label="Search tools"
            />
          </div>
          {!lockedCategory ? (
            <div className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto no-scrollbar">
              <div className="flex gap-2 pb-1 min-w-max">
                <Chip active={cat === "all"} onClick={() => setCat("all")} label="All" count={counts.all} />
                {CATEGORIES.map((c) => <Chip key={c.id} active={cat === c.id} onClick={() => setCat(c.id)} label={c.short} count={counts[c.id] ?? 0} />)}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
      <div className="mt-6 flex items-center justify-between text-xs text-muted">
        <span><span className="tabular font-medium text-ink">{list.length}</span> {list.length === 1 ? "tool" : "tools"}{q ? <> for “{q}”</> : null}</span>
        <span className="inline-flex items-center gap-1.5"><SlidersHorizontal className="h-3.5 w-3.5" /> Sorted by relevance</span>
      </div>
      {list.length === 0 ? (
        <Empty icon={<Search className="h-5 w-5" />} title="No tools found" hint="Try a different keyword such as ‘GST’, ‘receipt’ or ‘salary’." />
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((t, i) => <ToolCard key={t.slug} tool={t} index={i} />)}
        </div>
      )}
    </div>
  );
}

function Chip({ active, onClick, label, count }: { active: boolean; onClick: () => void; label: string; count: number }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active} className={cn("inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-[13px] font-medium transition-colors cursor-pointer", active ? "border-ink bg-ink text-bg dark:border-accent dark:bg-accent dark:text-on-accent" : "border-border bg-surface text-ink-2 hover:border-border-strong hover:text-ink")}>
      {label}
      <span className={cn("tabular text-[11px]", active ? "opacity-70" : "text-muted")}>{count}</span>
    </button>
  );
}
