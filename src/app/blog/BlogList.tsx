"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { PostMeta } from "@/lib/blog";
import { PostCard } from "@/components/layout/PostCard";
import { cn } from "@/lib/cn";
import { Empty } from "@/components/ui/Empty";

export function BlogList({ posts, tags }: { posts: PostMeta[]; tags: string[] }) {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("all");
  const [kind, setKind] = useState<"all" | "trending" | "guide">("all");
  const list = useMemo(() => { const s = q.trim().toLowerCase(); return posts.filter((p) => (kind === "all" || p.kind === kind) && (tag === "all" || p.tags.includes(tag)) && (!s || p.title.toLowerCase().includes(s) || p.description.toLowerCase().includes(s) || p.tags.some((t) => t.includes(s)))); }, [posts, q, tag, kind]);
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <div className="relative"><Search className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles — GST, salary, UPI, labour codes…" className="h-12 w-full rounded-2xl border border-border bg-surface pl-12 pr-4 text-[15px] text-ink shadow-sm placeholder:text-faint hover:border-border-strong focus:border-ring focus:outline-none focus:ring-4 focus:ring-ring/10 transition" aria-label="Search articles" /></div>
        <div className="inline-flex rounded-2xl border border-border bg-surface-2 p-1">{(["all", "trending", "guide"] as const).map((k) => <button key={k} type="button" onClick={() => setKind(k)} className={cn("h-10 rounded-xl px-4 text-sm font-medium capitalize transition-colors cursor-pointer", kind === k ? "bg-surface text-ink shadow-sm" : "text-muted hover:text-ink")}>{k === "guide" ? "Guides" : k}</button>)}</div>
      </div>
      <div className="mt-4 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto no-scrollbar"><div className="flex gap-2 min-w-max pb-1">{["all", ...tags].map((t) => <button key={t} type="button" onClick={() => setTag(t)} aria-pressed={tag === t} className={cn("h-9 rounded-full border px-3.5 text-[13px] font-medium transition-colors cursor-pointer capitalize", tag === t ? "border-ink bg-ink text-bg dark:border-accent dark:bg-accent dark:text-on-accent" : "border-border bg-surface text-ink-2 hover:border-border-strong hover:text-ink")}>{t === "all" ? "All topics" : t}</button>)}</div></div>
      <div className="mt-6 text-xs text-muted"><span className="tabular font-medium text-ink">{list.length}</span> article{list.length === 1 ? "" : "s"}</div>
      {list.length === 0 ? <Empty icon={<Search className="h-5 w-5" />} title="No articles match" hint="Try another keyword or clear the filters." /> : <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <PostCard key={p.slug} post={p} />)}</div>}
    </div>
  );
}
