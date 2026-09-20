import Link from "next/link";
import { Suspense } from "react";
import { ArrowUpRight } from "lucide-react";
import { HomeSearch } from "@/components/layout/HomeSearch";
import { POPULAR_SLUGS, toolBySlug } from "@/lib/registry";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:py-28">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">404 · page not found</p>
      <h1 className="mt-3 text-4xl font-bold tracking-[-0.035em] text-ink sm:text-5xl">That page isn’t here.</h1>
      <p className="mt-4 text-muted">The link may be old, or the tool may have moved. Try a search — or pick one of the popular tools below.</p>
      <div className="mt-8 text-left"><Suspense><HomeSearch /></Suspense></div>
      <ul className="mt-8 grid gap-2 text-left sm:grid-cols-2">
        {POPULAR_SLUGS.slice(0, 6).map((s) => { const t = toolBySlug(s)!; return (
          <li key={s}><Link href={`/tools/${s}`} className="group flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-ink transition-colors hover:border-border-strong">{t.name}<ArrowUpRight className="h-4 w-4 text-faint group-hover:text-ink" /></Link></li>
        ); })}
      </ul>
      <Link href="/tools" className="mt-8 inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-5 text-sm font-medium text-on-accent hover:bg-accent-hover">Browse all tools <ArrowUpRight className="h-4 w-4" /></Link>
    </div>
  );
}
