import type { MetadataRoute } from "next";
import { TOOLS } from "@/lib/registry";
import { CATEGORIES } from "@/lib/categories";
const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://indiabiztools.example";
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE, lastModified: now, priority: 1 },
    { url: `${BASE}/tools`, lastModified: now, priority: 0.9 },
    { url: `${BASE}/categories`, lastModified: now, priority: 0.7 },
    ...CATEGORIES.map((c) => ({ url: `${BASE}/categories/${c.id}`, lastModified: now, priority: 0.7 })),
    ...TOOLS.map((t) => ({ url: `${BASE}/tools/${t.slug}`, lastModified: now, priority: 0.8 })),
    ...["/about", "/guides", "/privacy-policy", "/terms", "/contact"].map((p) => ({ url: `${BASE}${p}`, lastModified: now, priority: 0.4 })),
  ];
}
