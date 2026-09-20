import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, ArrowUpRight, ShieldCheck, Zap, IndianRupee, FileText, Calculator, QrCode, Sparkles } from "lucide-react";
import { TOOLS, POPULAR_SLUGS, toolBySlug } from "@/lib/registry";
import { CATEGORIES } from "@/lib/categories";
import { ToolGrid } from "@/components/layout/ToolGrid";
import { CategoryIcon } from "@/components/layout/icons";
import { HomeSearch } from "@/components/layout/HomeSearch";
import { AppMockup } from "@/components/layout/AppMockup";
import { BRAND } from "@/lib/brand";
import { getAllPosts } from "@/lib/blog";
import { PostCard } from "@/components/layout/PostCard";

const quick = [["Create GST bill", "gst-invoice"], ["UPI QR standee", "upi-standee"], ["Payroll slip", "wage-slip"], ["Shipping label", "shipping-label"], ["EMI calculator", "emi-calculator"], ["Income tax", "income-tax"]];

export default function Home() {
  const popular = POPULAR_SLUGS.map((s) => toolBySlug(s)!);
  const posts = getAllPosts().slice(0, 3).map(({ html, toc, faqs, ...m }) => { void html; void toc; void faqs; return m; });
  return (
    <>
      {/* Hero */}
      <section className="px-3 pt-3 sm:px-4 sm:pt-4">
        <div className="sky relative mx-auto max-w-[1440px] overflow-hidden rounded-[28px] border border-border/60">
          <span className="cloud left-[-10%] top-[6%] h-[280px] w-[560px]" />
          <span className="cloud left-[18%] top-[-8%] h-[180px] w-[420px]" />
          <span className="cloud right-[-8%] top-[14%] h-[240px] w-[520px]" />
          <span className="cloud right-[24%] top-[36%] h-[160px] w-[380px]" />
          <span className="cloud left-[26%] top-[54%] h-[220px] w-[680px]" />
          <span className="cloud left-[-4%] bottom-[8%] h-[200px] w-[440px]" />
          <span className="cloud right-[6%] bottom-[-8%] h-[260px] w-[560px]" />
          <div className="frame-lines relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="pt-20 pb-10 text-center sm:pt-28 sm:pb-14">
              <p className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-2 backdrop-blur dark:bg-white/10">
                <Sparkles className="h-3 w-3" /> {TOOLS.length} free tools · no login<span className="hidden sm:inline"> · 100% private</span>
              </p>
              <h1 className="mx-auto mt-6 max-w-4xl text-[44px] font-bold leading-[1.02] tracking-[-0.04em] text-ink sm:text-[64px] md:text-[76px]">
                Business paperwork,<br className="hidden sm:block" /> done in a minute.
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-ink-2 sm:text-lg">
                {BRAND.name} gives Indian shops, freelancers and MSMEs every invoice, QR code, calculator and label they need — right in the browser, nothing uploaded.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/tools" className="inline-flex h-12 items-center gap-2 rounded-xl bg-accent px-6 text-[15px] font-medium text-on-accent shadow-[0_1px_2px_rgb(0_0_0/0.25),0_12px_28px_-10px_rgb(0_0_0/0.55)] transition-colors hover:bg-accent-hover">
                  Open the toolbox <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link href="/tools/gst-invoice" className="inline-flex h-12 items-center gap-2 rounded-xl border border-black/5 bg-white px-6 text-[15px] font-medium text-ink shadow-[0_1px_2px_rgb(0_0_0/0.06),0_12px_28px_-12px_rgb(0_0_0/0.25)] transition-colors hover:bg-surface-2 dark:border-white/10 dark:bg-surface">
                  Make a GST invoice
                </Link>
              </div>
              <div className="mx-auto mt-8 max-w-2xl">
                <Suspense><HomeSearch /></Suspense>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {quick.map(([q, s]) => <Link key={s} href={`/tools/${s}`} className="rounded-full border border-black/5 bg-white/70 px-3 py-1.5 text-xs font-medium text-ink-2 backdrop-blur transition-colors hover:bg-white hover:text-ink dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15">{q}</Link>)}
                </div>
              </div>
            </div>
            <div className="relative pb-0 sm:px-2">
              <div className="translate-y-6 sm:translate-y-8"><AppMockup /></div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos / trust strip */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:mt-24 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { i: ShieldCheck, t: "Private by design", d: "Every tool runs in your browser. Invoices, salaries and customer data never touch a server." },
            { i: Zap, t: "Instant, no sign-up", d: "Open a tool, type, download. Business details are remembered on your device for next time." },
            { i: IndianRupee, t: "Made for India", d: "₹ and lakh/crore formatting, CGST/SGST/IGST, HSN codes, state PT slabs and Indian holidays built in." },
          ].map(({ i: I, t, d }) => (
            <div key={t} className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 text-ink"><I className="h-5 w-5" strokeWidth={1.75} /></span>
              <h2 className="mt-4 text-[16px] font-semibold tracking-tight text-ink">{t}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Three pillars */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">What’s inside</p>
          <h2 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl">One toolbox, three jobs</h2>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {[
            { i: FileText, t: "Documents", d: "GST invoices, quotes, challans, receipts, payslips, letters, certificates, labels — live A4/thermal preview, PDF in one click.", href: "/categories/billing", n: TOOLS.filter((t) => ["billing", "shop", "hr", "freelancer"].includes(t.category)).length },
            { i: Calculator, t: "Calculators", d: "Income tax old vs new, in-hand salary, EMI, SIP, GST, TDS, depreciation and 40+ KPI calculators for sales, finance and ops.", href: "/categories/finance", n: TOOLS.filter((t) => ["finance", "tax"].includes(t.category)).length },
            { i: QrCode, t: "Marketing & media", d: "UPI standees, WhatsApp links, review QRs, barcodes, image compressor, background remover, OCR and SEO helpers.", href: "/categories/marketing", n: TOOLS.filter((t) => ["marketing", "media", "legal", "logistics"].includes(t.category)).length },
          ].map(({ i: I, t, d, href, n }) => (
            <Link key={t} href={href} className="group rounded-2xl border border-border bg-surface p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-border-strong">
              <div className="flex items-center justify-between"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent-text"><I className="h-5 w-5" strokeWidth={1.75} /></span><span className="tabular text-xs text-muted">{n} tools</span></div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink">{t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{d}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-ink">Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Most used</p>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl">Popular this week</h2>
          </div>
          <Link href="/tools" className="hidden items-center gap-1 text-sm font-medium text-ink hover:underline sm:inline-flex">All {TOOLS.length} tools <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-8"><Suspense><ToolGrid tools={popular} showFilters={false} /></Suspense></div>
      </section>

      {/* Categories */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Browse</p>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl">Every category</h2>
          </div>
          <Link href="/categories" className="hidden items-center gap-1 text-sm font-medium text-ink hover:underline sm:inline-flex">View all <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((c) => {
            const n = TOOLS.filter((t) => t.category === c.id).length;
            return (
              <Link key={c.id} href={`/categories/${c.id}`} className="group flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-sm transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-border-strong">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-ink"><CategoryIcon name={c.icon} className="h-5 w-5" /></span>
                <span className="min-w-0"><span className="block truncate text-sm font-semibold text-ink">{c.short}</span><span className="block text-xs text-muted tabular">{n} tools</span></span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Blog */}
      {posts.length ? (
        <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">From the blog</p>
              <h2 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl">What’s changing this month</h2>
            </div>
            <Link href="/blog" className="hidden items-center gap-1 text-sm font-medium text-ink hover:underline sm:inline-flex">All articles <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{posts.map((p) => <PostCard key={p.slug} post={p} />)}</div>
        </section>
      ) : null}

      {/* CTA */}
      <section className="px-3 mt-24 sm:px-4">
        <div className="sky relative mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-border/60 px-6 py-16 text-center sm:py-20">
          <span className="cloud left-[10%] top-[-20%] h-[200px] w-[500px]" />
          <span className="cloud right-[5%] bottom-[-30%] h-[220px] w-[520px]" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-[-0.035em] text-ink sm:text-5xl">Stop fighting with Excel and Word.</h2>
            <p className="mx-auto mt-4 max-w-lg text-[15px] text-ink-2 sm:text-lg">Pick a tool, fill the blanks, download. That’s the whole workflow.</p>
            <Link href="/tools" className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-accent px-6 text-[15px] font-medium text-on-accent shadow-[0_1px_2px_rgb(0_0_0/0.25),0_12px_28px_-10px_rgb(0_0_0/0.55)] hover:bg-accent-hover">Browse all {TOOLS.length} tools <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
