import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, BookOpen, ChevronRight, Lock } from "lucide-react";
import { TOOLS, toolBySlug, toolsByCategory } from "@/lib/registry";
import { categoryById } from "@/lib/categories";
import { getToolArticle } from "@/lib/tool-content";
import { getAllPosts } from "@/lib/blog";
import { BRAND } from "@/lib/brand";
import { ToolRenderer } from "@/components/shell/ToolRenderer";
import { ToolBadge, Badge } from "@/components/ui/Badge";
import { FavButton } from "@/components/layout/FavButton";

export const dynamicParams = false;
export function generateStaticParams() { return TOOLS.map((t) => ({ slug: t.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = toolBySlug(slug);
  if (!t) return { title: "Tool" };
  const image = { url: `/og/tool/${t.slug}`, width: 1200, height: 630, alt: t.name };
  return { title: t.name, description: t.description, alternates: { canonical: `/tools/${t.slug}` }, openGraph: { title: t.name, description: t.description, url: `/tools/${t.slug}`, images: [image] }, twitter: { card: "summary_large_image", title: t.name, description: t.description, images: [image.url] } };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = toolBySlug(slug);
  if (!t) notFound();
  const cat = categoryById(t.category);
  const related = toolsByCategory(t.category).filter((x) => x.slug !== t.slug).slice(0, 5);
  const article = getToolArticle(t.slug);
  const faqs = article?.faqs.length ? article.faqs : (t.faqs ?? []);
  const guides = getAllPosts().filter((p) => p.tools.includes(t.slug)).slice(0, 5);
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${BRAND.domain}`;
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "WebApplication", name: t.name, url: `${base}/tools/${t.slug}`, description: t.description, applicationCategory: "BusinessApplication", operatingSystem: "Any (web browser)", browserRequirements: "Requires JavaScript", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "INR" }, image: `${base}/og/tool/${t.slug}`, publisher: { "@type": "Organization", name: BRAND.name, url: base } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: base }, { "@type": "ListItem", position: 2, name: "Tools", item: `${base}/tools` }, { "@type": "ListItem", position: 3, name: cat.name, item: `${base}/categories/${cat.id}` }, { "@type": "ListItem", position: 4, name: t.name, item: `${base}/tools/${t.slug}` }] },
    ...(faqs.length ? [{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }] : []),
  ];
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
        <div className="min-w-0 max-w-3xl">
          {t.steps?.length ? (
            <section aria-labelledby="how-to">
              <h2 id="how-to" className="font-display text-2xl text-ink">How to use</h2>
              <ol className="mt-4 grid gap-3">
                {t.steps.map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm text-ink-2"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-[11px] font-semibold text-accent-text tabular">{i + 1}</span><span className="leading-relaxed">{s}</span></li>
                ))}
              </ol>
            </section>
          ) : null}

          {article ? (
            <article className={`prose-kg ${t.steps?.length ? "mt-12" : ""}`} dangerouslySetInnerHTML={{ __html: article.html }} />
          ) : null}

          {faqs.length ? (
            <section className="mt-12" aria-labelledby="faq">
              <h2 id="faq" className="font-display text-2xl text-ink">Frequently asked questions</h2>
              <div className="mt-4 divide-y divide-border rounded-2xl border border-border bg-surface">
                {faqs.map((f, i) => (
                  <details key={i} className="group px-5 py-4">
                    <summary className="cursor-pointer list-none text-sm font-medium text-ink flex justify-between gap-4">{f.q}<ChevronRight className="h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-90" /></summary>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <aside className="space-y-10 self-start lg:sticky lg:top-24">
          {related.length ? (
            <section aria-labelledby="related">
              <h2 id="related" className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">More in {cat.name}</h2>
              <ul className="mt-3 divide-y divide-border rounded-2xl border border-border bg-surface">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/tools/${r.slug}`} className="block px-4 py-3 transition-colors hover:bg-surface-2">
                      <span className="block text-sm font-semibold text-ink">{r.name}</span>
                      <span className="mt-0.5 block line-clamp-2 text-xs text-muted">{r.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={`/categories/${cat.id}`} className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent-text hover:underline">All {cat.name} tools <ChevronRight className="h-3.5 w-3.5" /></Link>
            </section>
          ) : null}
          {guides.length ? (
            <section aria-labelledby="guides">
              <h2 id="guides" className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">Guides that use this tool</h2>
              <ul className="mt-3 grid gap-2">
                {guides.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className="flex gap-3 rounded-2xl border border-border bg-surface px-4 py-3 transition-colors hover:border-border-strong">
                      <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" strokeWidth={1.75} />
                      <span className="min-w-0"><span className="block text-sm font-medium leading-snug text-ink">{p.title}</span><span className="mt-1 block text-xs text-muted">{p.readMinutes} min read</span></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
