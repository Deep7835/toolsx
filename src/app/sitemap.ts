import type { MetadataRoute } from "next";
import { TOOLS } from "@/lib/registry";
import { getAllPosts } from "@/lib/blog";
const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kaagazo.com";
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE, lastModified: now, priority: 1 },
    { url: `${BASE}/tools`, lastModified: now, priority: 0.9 },
    ...TOOLS.map((t) => ({ url: `${BASE}/tools/${t.slug}`, lastModified: now, priority: 0.8 })),
    { url: `${BASE}/blog`, lastModified: now, priority: 0.8 },
    ...getAllPosts().map((p) => ({ url: `${BASE}/blog/${p.slug}`, lastModified: new Date(p.updated ?? p.date), priority: 0.7 })),
    ...["/about", "/guides", "/privacy-policy", "/terms", "/contact"].map((p) => ({ url: `${BASE}${p}`, lastModified: now, priority: 0.4 })),
  ];
}
