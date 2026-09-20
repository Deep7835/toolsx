import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, ShieldCheck, Zap, MapPin } from "lucide-react";
import { TOOLS, POPULAR_SLUGS, toolBySlug } from "@/lib/registry";
import { CATEGORIES } from "@/lib/categories";
import { ToolGrid } from "@/components/layout/ToolGrid";
import { CategoryIcon } from "@/components/layout/icons";
import { HomeSearch } from "@/components/layout/HomeSearch";

const quick = ["Create GST bill", "UPI QR standee", "Payroll slip", "Shipping label", "EMI calculator", "Income tax"];
const quickSlug: Record<string, string> = { "Create GST bill": "gst-invoice", "UPI QR standee": "upi-standee", "Payroll slip": "wage-slip", "Shipping label": "shipping-label", "EMI calculator": "emi-calculator", "Income tax": "income-tax" };

export default function Home() {
  const popular = POPULAR_SLUGS.map((s) => toolBySlug(s)!);
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(60%_50%_at_50%_0%,var(--accent-soft),transparent_70%)] opacity-70 dark:opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-12 sm:pt-24 sm:pb-16 text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> India’s free business suite · {TOOLS.length} tools
          </p>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-5xl leading-[1.02] tracking-tight text-ink sm:text-7xl">
            What do you need <br className="hidden sm:block" />
            <em className="text-accent-text">to do today?</em>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-muted sm:text-lg">
            Invoices, UPI QR codes, salary slips, tax calculators, labels and more — private, instant, and free for Bharat MSMEs. Nothing leaves your browser.
          </p>
          <div className="mx-auto mt-8 max-w-2xl">
            <Suspense><HomeSearch /></Suspense>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {quick.map((q) => (
                <Link key={q} href={`/tools/${quickSlug[q]}`} className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-ink-2 hover:border-border-strong hover:text-ink transition-colors">{q}</Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Browse by category</p>
            <h2 className="mt-2 font-display text-3xl text-ink">Ten collections, one workspace</h2>
          </div>
          <Link href="/categories" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-accent-text hover:underline">All categories <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((c) => {
            const n = TOOLS.filter((t) => t.category === c.id).length;
            return (
              <Link key={c.id} href={`/categories/${c.id}`} className="group flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-border-strong">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-ink-2 group-hover:bg-accent-soft group-hover:text-accent-text transition-colors"><CategoryIcon name={c.icon} className="h-5 w-5" /></span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-ink">{c.short}</span>
                  <span className="block text-xs text-muted tabular">{n} tools</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Popular */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Most used</p>
            <h2 className="mt-2 font-display text-3xl text-ink">Popular this week</h2>
          </div>
          <Link href="/tools" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-accent-text hover:underline">View all {TOOLS.length} tools <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-6">
          <Suspense><ToolGrid tools={popular} showFilters={false} /></Suspense>
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link href="/tools" className="inline-flex h-11 items-center gap-2 rounded-xl border border-border-strong px-5 text-sm font-medium text-ink">Explore all tools <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      {/* Trust */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <div className="grid gap-4 rounded-3xl border border-border bg-surface p-6 sm:grid-cols-3 sm:p-10">
          {[
            { i: ShieldCheck, t: "100% private & secure", d: "Your data never leaves your device. Every tool runs client-side with zero storage on our servers." },
            { i: Zap, t: "Instant processing", d: "No login, no sign-up, no waiting. Open a tool, enter details, and download your result." },
            { i: MapPin, t: "Built for Bharat MSMEs", d: "Designed for Indian retail shops, vendors, freelancers and small business operators." },
          ].map(({ i: I, t, d }) => (
            <div key={t} className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-text"><I className="h-5 w-5" strokeWidth={1.75} /></span>
              <div>
                <h3 className="text-[15px] font-semibold text-ink">{t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
