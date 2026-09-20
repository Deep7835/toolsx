import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ChevronRight, Flame, BookOpen, ArrowUpRight } from "lucide-react";
import { getAllPosts, getPost } from "@/lib/blog";
import { toolBySlug } from "@/lib/registry";
import { fmtDate } from "@/lib/format";
import { BRAND } from "@/lib/brand";
import { PostCard } from "@/components/layout/PostCard";
import Image from "next/image";
import { ArticleCta } from "@/components/layout/ArticleCta";

export function generateStaticParams() { return getAllPosts().map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const p = getPost(slug);
  if (!p) return { title: "Article" };
  const image = { url: `/og/blog/${p.slug}`, width: 1200, height: 630, alt: p.title };
  return { title: p.title, description: p.description, alternates: { canonical: `/blog/${p.slug}` }, openGraph: { title: p.title, description: p.description, type: "article", url: `/blog/${p.slug}`, publishedTime: p.date, modifiedTime: p.updated, images: [image] }, twitter: { card: "summary_large_image", title: p.title, description: p.description, images: [image.url] } };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const tools = post.tools.map((s) => toolBySlug(s)).filter(Boolean);
  const related = getAllPosts().filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t))).slice(0, 3).map(({ html, toc, faqs, ...m }) => { void html; void toc; void faqs; return m; });
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${BRAND.domain}`;
  const ld = [
    { "@context": "https://schema.org", "@type": "Article", headline: post.title, description: post.description, image: `${base}/og/blog/${post.slug}`, datePublished: post.date, dateModified: post.updated ?? post.date, author: { "@type": "Organization", name: BRAND.name, url: base }, publisher: { "@type": "Organization", name: BRAND.name, logo: { "@type": "ImageObject", url: `${base}/icon.svg` } }, mainEntityOfPage: `${base}/blog/${post.slug}`, wordCount: post.words },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: base }, { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` }, { "@type": "ListItem", position: 3, name: post.title, item: `${base}/blog/${post.slug}` }] },
    post.faqs.length ? { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: post.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) } : null,
  ].filter(Boolean);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <nav className="flex items-center gap-1.5 text-xs text-muted" aria-label="Breadcrumb">
        <Link href="/blog" className="inline-flex items-center gap-1 hover:text-ink"><ArrowLeft className="h-3.5 w-3.5" /> Blog</Link><ChevronRight className="h-3 w-3" /><span className="capitalize">{post.tags[0]}</span>
      </nav>
      <header className="mt-5 max-w-3xl">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em]">
          {post.kind === "trending" ? <span className="inline-flex items-center gap-1 rounded-full bg-warn-soft px-2 py-0.5 text-warn"><Flame className="h-3 w-3" /> Trending</span> : <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-accent-text"><BookOpen className="h-3 w-3" /> Guide</span>}
          {post.tags.map((t) => <span key={t} className="rounded-full border border-border px-2 py-0.5 text-muted capitalize">{t}</span>)}
        </div>
        <h1 className="mt-4 text-[34px] font-bold leading-[1.08] tracking-[-0.035em] text-ink sm:text-5xl">{post.title}</h1>
        <p className="mt-4 text-[17px] leading-relaxed text-ink-2">{post.description}</p>
        <p className="mt-4 text-xs text-muted">Published {fmtDate(post.date, "long")}{post.updated ? ` · Updated ${fmtDate(post.updated, "long")}` : ""} · {post.readMinutes} min read · {BRAND.name} editorial</p>
      </header>
      <figure className="mt-8 max-w-3xl overflow-hidden rounded-2xl border border-border shadow-sm">
        <Image src={`/og/blog/${post.slug}`} alt={`${post.title} — illustration`} width={1200} height={630} priority sizes="(max-width: 768px) 100vw, 768px" className="h-auto w-full" />
      </figure>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0 max-w-3xl">
          <article className="prose-kg" dangerouslySetInnerHTML={{ __html: post.html }} />
          <ArticleCta tool={tools[0] ?? null} />
        </div>
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          {post.toc.length ? (
            <div className="rounded-2xl border border-border bg-surface p-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">On this page</div>
              <ol className="mt-3 grid gap-1.5 text-[13px]">{post.toc.filter((t) => t.level === 2).map((t) => <li key={t.id}><a href={`#${t.id}`} className="text-ink-2 hover:text-ink">{t.text}</a></li>)}</ol>
            </div>
          ) : null}
          {tools.length ? (
            <div className="rounded-2xl border border-border bg-surface p-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">Do it now — free tools</div>
              <ul className="mt-3 grid gap-2">{tools.map((t) => <li key={t!.slug}><Link href={`/tools/${t!.slug}`} className="group flex items-start justify-between gap-2 rounded-xl border border-border px-3 py-2.5 transition-colors hover:border-border-strong hover:bg-surface-2"><span><span className="block text-sm font-medium text-ink">{t!.name}</span><span className="block text-xs text-muted line-clamp-1">{t!.sub}</span></span><ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-faint group-hover:text-ink" /></Link></li>)}</ul>
            </div>
          ) : null}
          <p className="text-xs leading-relaxed text-muted">Information as understood on the published/updated date. Laws change — verify with a CA or the official portal before acting. Not legal or financial advice.</p>
        </aside>
      </div>

      {related.length ? (
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-ink">Keep reading</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{related.map((p) => <PostCard key={p.slug} post={p} />)}</div>
        </section>
      ) : null}
    </div>
  );
}
