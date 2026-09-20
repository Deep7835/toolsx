import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ChevronRight, Lock } from "lucide-react";
import { TOOLS, toolBySlug, toolsByCategory } from "@/lib/registry";
import { categoryById } from "@/lib/categories";
import { ToolRenderer } from "@/components/shell/ToolRenderer";
import { ToolBadge, Badge } from "@/components/ui/Badge";
import { FavButton } from "@/components/layout/FavButton";

export function generateStaticParams() { return TOOLS.map((t) => ({ slug: t.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = toolBySlug(slug);
  return t ? { title: t.name, description: t.description } : { title: "Tool" };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = toolBySlug(slug);
  if (!t) notFound();
  const cat = categoryById(t.category);
  const related = toolsByCategory(t.category).filter((x) => x.slug !== t.slug).slice(0, 4);
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-10">
      <nav className="flex items-center gap-1.5 text-xs text-muted" aria-label="Breadcrumb">
        <Link href="/tools" className="inline-flex items-center gap-1 hover:text-ink"><ArrowLeft className="h-3.5 w-3.5" /> Tools</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/categories/${cat.id}`} className="hover:text-ink">{cat.name}</Link>
      </nav>

      <header className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="accent">Free</Badge>
            <Badge>{t.sub}</Badge>
            <ToolBadge badge={t.badge} />
          </div>
          <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">{t.name}</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-muted sm:text-base">{t.description}</p>
        </div>
        <FavButton slug={t.slug} />
      </header>

      <div className="mt-8">
        <ToolRenderer slug={t.slug} />
      </div>

      <p className="mt-6 inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-xs text-muted">
        <Lock className="h-3.5 w-3.5 text-accent-text" /> 100% client-side. Nothing you type is uploaded or stored on a server.
      </p>

      {t.steps?.length || t.faqs?.length ? (
        <section className="mt-14 grid gap-10 lg:grid-cols-2">
          {t.steps?.length ? (
            <div>
              <h2 className="font-display text-2xl text-ink">How to use</h2>
              <ol className="mt-4 grid gap-3">
                {t.steps.map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm text-ink-2"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-[11px] font-semibold text-accent-text tabular">{i + 1}</span><span className="leading-relaxed">{s}</span></li>
                ))}
              </ol>
            </div>
          ) : null}
          {t.faqs?.length ? (
            <div>
              <h2 className="font-display text-2xl text-ink">Questions</h2>
              <div className="mt-4 divide-y divide-border rounded-2xl border border-border bg-surface">
                {t.faqs.map((f, i) => (
                  <details key={i} className="group px-5 py-4">
                    <summary className="cursor-pointer list-none text-sm font-medium text-ink flex justify-between gap-4">{f.q}<ChevronRight className="h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-90" /></summary>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      {related.length ? (
        <section className="mt-14">
          <h2 className="font-display text-2xl text-ink">More in {cat.name}</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/tools/${r.slug}`} className="block rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-border-strong">
                  <span className="block text-sm font-semibold text-ink">{r.name}</span>
                  <span className="mt-1 block line-clamp-2 text-xs text-muted">{r.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
