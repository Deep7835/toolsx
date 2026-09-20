import { notFound } from "next/navigation";
import { getAllPosts, getPost } from "@/lib/blog";
import { renderOg } from "@/lib/og";
import { BRAND } from "@/lib/brand";

export const dynamic = "force-static";
export function generateStaticParams() { return getAllPosts().map((p) => ({ slug: p.slug })); }

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return renderOg({ title: post.title, eyebrow: post.kind === "trending" ? "Trending" : "Guide", tags: post.tags, seed: post.slug, footer: `${BRAND.domain} · ${post.readMinutes} min read` });
}
