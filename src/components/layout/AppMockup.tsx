import Link from "next/link";
import { Search, Home, LayoutGrid, Heart, Filter, Plus, Sparkles, CircleHelp, Receipt, Calculator, QrCode } from "lucide-react";
import { toolBySlug } from "@/lib/registry";
import { CATEGORIES } from "@/lib/categories";
import { CategoryIcon } from "./icons";

const COLUMNS: Array<{ title: string; icon: React.ReactNode; tone: string; slugs: string[] }> = [
  { title: "Documents", icon: <Receipt className="h-3.5 w-3.5" />, tone: "text-ink", slugs: ["gst-invoice", "payment-receipt", "shipping-label"] },
  { title: "Calculators", icon: <Calculator className="h-3.5 w-3.5" />, tone: "text-warn", slugs: ["in-hand-salary", "emi-calculator", "income-tax"] },
  { title: "Marketing & QR", icon: <QrCode className="h-3.5 w-3.5" />, tone: "text-accent-text", slugs: ["upi-standee", "whatsapp-direct", "google-review"] },
];

/** A static "product screenshot" rendered from real registry data. */
export function AppMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-lg" aria-label="App preview">
      {/* window chrome */}
      <div className="flex items-center gap-4 border-b border-border px-4 py-2.5">
        <div className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" /></div>
        <div className="mx-auto flex h-8 w-full max-w-sm items-center gap-2 rounded-lg border border-border bg-surface-2/70 px-3 text-[12px] text-muted"><Search className="h-3.5 w-3.5" /> Search for invoices, calculators, QR…<kbd className="ml-auto rounded border border-border bg-surface px-1 text-[10px]">/</kbd></div>
        <div className="hidden items-center gap-4 text-[12px] text-ink-2 lg:flex"><span>Calendar</span><span>Guides</span><span>Favourites</span><span className="inline-flex items-center gap-1 text-accent-text"><Sparkles className="h-3 w-3" /> 100% private</span></div>
        <CircleHelp className="hidden h-4 w-4 text-muted sm:block" />
      </div>
      <div className="grid md:grid-cols-[200px_1fr]">
        {/* sidebar */}
        <aside className="hidden border-r border-border px-3 py-4 text-[12.5px] md:block">
          <div className="px-2 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted">Workspace</div>
          <div className="mt-1.5 grid gap-0.5">
            <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-ink-2"><Home className="h-3.5 w-3.5" /> Home</div>
            <div className="flex items-center gap-2 rounded-lg bg-surface-2 px-2 py-1.5 font-medium text-ink"><LayoutGrid className="h-3.5 w-3.5" /> All tools</div>
            <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-ink-2"><Heart className="h-3.5 w-3.5" /> Favourites</div>
          </div>
          <div className="mt-4 px-2 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted">Categories</div>
          <div className="mt-1.5 grid gap-0.5">
            {CATEGORIES.slice(0, 6).map((c) => <div key={c.id} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-ink-2"><CategoryIcon name={c.icon} className="h-3.5 w-3.5" /> {c.short}</div>)}
          </div>
        </aside>
        {/* main */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-[17px] font-bold tracking-tight text-ink">Tools</h3>
            <span className="inline-flex h-8 items-center gap-1 rounded-lg bg-accent px-3 text-[12px] font-medium text-on-accent"><Plus className="h-3.5 w-3.5" /> New document</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border px-2.5 text-[12px] text-ink-2"><Filter className="h-3.5 w-3.5" /> Filters</span>
            <span className="inline-flex rounded-lg bg-surface-2 p-0.5 text-[12px]"><span className="rounded-md bg-surface px-3 py-1 font-medium text-ink shadow-sm">Board</span><span className="px-3 py-1 text-muted">List</span></span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title} className="rounded-xl bg-surface-2/60 p-2.5">
                <div className={`flex items-center gap-1.5 px-1 pb-2 text-[12.5px] font-semibold ${col.tone}`}>{col.icon} {col.title}</div>
                <div className="grid gap-2">
                  {col.slugs.map((s) => { const t = toolBySlug(s)!; return (
                    <Link key={s} href={`/tools/${s}`} className="block rounded-lg border border-border bg-surface p-3 shadow-sm transition-colors hover:border-border-strong">
                      <div className="text-[12.5px] font-semibold leading-tight text-ink">{t.name}</div>
                      <div className="mt-1 line-clamp-2 text-[11px] leading-snug text-muted">{t.description}</div>
                      <div className="mt-2 flex flex-wrap gap-1"><span className="rounded-md bg-surface-2 px-1.5 py-0.5 text-[10px] font-medium text-ink-2">{t.sub}</span><span className="rounded-md bg-surface-2 px-1.5 py-0.5 text-[10px] font-medium text-ink-2">Free</span></div>
                    </Link>
                  ); })}
                  <div className="rounded-lg border border-dashed border-border-strong px-3 py-2 text-center text-[11px] text-muted">+ Add new</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
