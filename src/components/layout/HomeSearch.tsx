"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { searchTools } from "./SearchCommand";
import { categoryById } from "@/lib/categories";

export function HomeSearch() {
  const [q, setQ] = useState("");
  const router = useRouter();
  const results = useMemo(() => searchTools(q).slice(0, 6), [q]);
  return (
    <form
      role="search"
      onSubmit={(e) => { e.preventDefault(); if (results[0]) router.push(`/tools/${results[0].slug}`); else router.push(`/tools?q=${encodeURIComponent(q)}`); }}
      className="relative"
    >
      <div className="flex items-center gap-2 rounded-2xl border border-black/5 bg-white p-1.5 shadow-[0_1px_2px_rgb(0_0_0/0.06),0_16px_40px_-16px_rgb(0_0_0/0.3)] focus-within:ring-4 focus-within:ring-ring/15 transition dark:border-white/10 dark:bg-surface">
        <Search className="ml-3 h-5 w-5 shrink-0 text-muted" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search tools (e.g. ‘UPI QR’, ‘GST calc’, ‘barcode’, ‘wage’)…" className="h-11 w-full bg-transparent text-[15px] text-ink placeholder:text-faint outline-none" aria-label="Search tools" />
        <button type="submit" className="h-11 shrink-0 rounded-xl bg-accent px-5 text-sm font-medium text-on-accent transition-colors hover:bg-accent-hover cursor-pointer">Search</button>
      </div>
      {q && results.length ? (
        <ul className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-border bg-surface py-2 text-left shadow-lg animate-fade-up">
          {results.map((t) => (
            <li key={t.slug}>
              <Link href={`/tools/${t.slug}`} className="block px-4 py-2.5 hover:bg-surface-2">
                <span className="block text-sm font-medium text-ink">{t.name}</span>
                <span className="block text-xs text-muted">{categoryById(t.category).name} · {t.sub}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </form>
  );
}
