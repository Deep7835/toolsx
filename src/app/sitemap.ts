import type { MetadataRoute } from "next";
import { TOOLS } from "@/lib/registry";
import { getAllPosts } from "@/lib/blog";
import { getToolArticle } from "@/lib/tool-content";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kaagazo.com";

/**
 * lastModified must be honest: Bing treats an accurate `lastmod` as a freshness signal and
 * discounts it when every URL claims to have changed on every deploy. Tool and blog pages use
 * the `updated` date from their own content file; hub pages use the newest date beneath them.
 */
const date = (iso?: string) => (iso ? new Date(`${iso}T00:00:00Z`) : undefined);
const newest = (dates: Array<Date | undefined>) => dates.filter(Boolean).sort((a, b) => b!.getTime() - a!.getTime())[0];

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = TOOLS.map((t) => ({ url: `${BASE}/tools/${t.slug}`, lastModified: date(getToolArticle(t.slug)?.updated), priority: 0.8 }));
  const posts = getAllPosts().map((p) => ({ url: `${BASE}/blog/${p.slug}`, lastModified: date(p.updated ?? p.date), priority: 0.7 }));
  const sitewide = newest([...tools, ...posts].map((e) => e.lastModified));

  return [
    { url: BASE, lastModified: sitewide, priority: 1 },
    { url: `${BASE}/tools`, lastModified: newest(tools.map((t) => t.lastModified)), priority: 0.9 },
    ...tools,
    { url: `${BASE}/blog`, lastModified: newest(posts.map((p) => p.lastModified)), priority: 0.8 },
    ...posts,
    ...["/about", "/guides", "/privacy-policy", "/terms", "/contact"].map((p) => ({ url: `${BASE}${p}`, lastModified: sitewide, priority: 0.4 })),
  ];
}
