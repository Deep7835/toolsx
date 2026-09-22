import fs from "node:fs";
import path from "node:path";
import { extractFaqs, parseFrontmatter, renderMarkdown } from "./markdown";

export type PostKind = "trending" | "guide";
export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;      // ISO
  updated?: string;  // ISO
  kind: PostKind;
  tags: string[];
  tools: string[];   // related tool slugs
  hero?: boolean;    // pillar / evergreen hero
  readMinutes: number;
  words: number;
}
export interface Post extends PostMeta {
  html: string;
  toc: Array<{ id: string; text: string; level: 2 | 3 }>;
  faqs: Array<{ q: string; a: string }>;
}

const DIR = path.join(process.cwd(), "content", "blog");

let cache: Post[] | null = null;
export function getAllPosts(): Post[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  if (!fs.existsSync(DIR)) return [];
  const posts = fs.readdirSync(DIR).filter((f) => f.endsWith(".md")).map((file) => {
    const raw = fs.readFileSync(path.join(DIR, file), "utf8");
    const { data, body } = parseFrontmatter(raw);
    const { html, toc } = renderMarkdown(body);
    const words = body.split(/\s+/).filter(Boolean).length;
    const post: Post = {
      slug: file.replace(/\.md$/, ""),
      title: String(data.title ?? file),
      description: String(data.description ?? ""),
      date: String(data.date ?? "2026-01-01"),
      updated: data.updated ? String(data.updated) : undefined,
      kind: (data.kind as PostKind) ?? "guide",
      tags: (data.tags as string[]) ?? [],
      tools: (data.tools as string[]) ?? [],
      hero: Boolean(data.hero),
      readMinutes: Math.max(2, Math.round(words / 220)),
      words,
      html,
      toc,
      faqs: extractFaqs(body),
    };
    return post;
  });
  posts.sort((a, b) => (b.updated ?? b.date).localeCompare(a.updated ?? a.date));
  cache = posts;
  return posts;
}
export const getPost = (slug: string) => getAllPosts().find((p) => p.slug === slug);
export const allTags = () => Array.from(new Set(getAllPosts().flatMap((p) => p.tags))).sort();
