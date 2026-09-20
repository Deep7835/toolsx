import type { Metadata } from "next";
import { getAllPosts, allTags } from "@/lib/blog";
import { PageHeader } from "@/components/layout/PageHeader";
import { PostCard } from "@/components/layout/PostCard";
import { BlogList } from "./BlogList";

export const metadata: Metadata = { title: "Blog", description: "Plain-language guides on GST, tax, payroll, UPI, marketplaces and running a small business in India — updated for 2026.", alternates: { canonical: "/blog" } };

export default function BlogPage() {
  const posts = getAllPosts();
  const metas = posts.map(({ html, toc, faqs, ...m }) => { void html; void toc; void faqs; return m; });
  const trending = metas.filter((p) => p.kind === "trending").slice(0, 3);
  const heroes = metas.filter((p) => p.hero).slice(0, 6);
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
      <PageHeader eyebrow="Blog" title="What’s changing, and what always matters" description={`${posts.length} articles on GST, tax, payroll, UPI and growing a small business in India. Trending pieces track new rules; guides are the ones people search for every day.`} />
      {trending.length ? (
        <section className="mt-10">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Trending now</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">{trending.map((p, i) => <PostCard key={p.slug} post={p} big={i === 0} />)}</div>
        </section>
      ) : null}
      {heroes.length ? (
        <section className="mt-12">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Evergreen guides</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{heroes.map((p) => <PostCard key={p.slug} post={p} />)}</div>
        </section>
      ) : null}
      <section className="mt-14">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">All articles</h2>
        <div className="mt-4"><BlogList posts={metas} tags={allTags()} /></div>
      </section>
    </div>
  );
}
