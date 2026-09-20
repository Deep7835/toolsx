import fs from "node:fs";
import path from "node:path";
import { marked, type Tokens } from "marked";

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

function parseFrontmatter(raw: string): { data: Record<string, unknown>; body: string } {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data: Record<string, unknown> = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i < 0) continue;
    const k = line.slice(0, i).trim();
    let v: string = line.slice(i + 1).trim();
    if (v.startsWith("[") && v.endsWith("]")) { data[k] = v.slice(1, -1).split(",").map((x) => x.trim().replace(/^"|"$/g, "")).filter(Boolean); continue; }
    if (v === "true" || v === "false") { data[k] = v === "true"; continue; }
    v = v.replace(/^"|"$/g, "");
    data[k] = v;
  }
  return { data, body: m[2] };
}

const slugify = (s: string) => s.toLowerCase().replace(/<[^>]+>/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 80);

function render(md: string) {
  const toc: Post["toc"] = [];
  const renderer = new marked.Renderer();
  renderer.heading = function ({ tokens, depth }) {
    const inner = this.parser.parseInline(tokens);
    const id = slugify(inner);
    if (depth === 2 || depth === 3) toc.push({ id, text: inner.replace(/<[^>]+>/g, ""), level: depth });
    return `<h${depth} id="${id}">${inner}</h${depth}>\n`;
  };
  renderer.table = function ({ header, rows }) {
    const parser = this.parser;
    const cell = (c: Tokens.TableCell, tag: "th" | "td") => `<${tag}${c.align ? ` align="${c.align}"` : ""}>${parser.parseInline(c.tokens)}</${tag}>`;
    const th = header.map((c) => cell(c, "th")).join("");
    const body = rows.map((r) => `<tr>${r.map((c) => cell(c, "td")).join("")}</tr>`).join("");
    return `<div class="table-wrap"><table><thead><tr>${th}</tr></thead><tbody>${body}</tbody></table></div>\n`;
  };
  renderer.link = function ({ href, tokens }) {
    const ext = /^https?:\/\//.test(href);
    return `<a href="${href}"${ext ? ' target="_blank" rel="noopener"' : ""}>${this.parser.parseInline(tokens)}</a>`;
  };
  const html = marked.parse(md, { gfm: true, breaks: false, renderer }) as string;
  return { html, toc };
}

/** Extract "## FAQ" section Q/As (### question → paragraph answer) for JSON-LD. */
function extractFaqs(md: string) {
  const i = md.search(/^## (FAQ|Frequently asked questions)/im);
  if (i < 0) return [];
  const section = md.slice(i).split(/\n## (?!#)/)[0];
  const out: Array<{ q: string; a: string }> = [];
  const parts = section.split(/\n### /).slice(1);
  for (const p of parts) { const [q, ...rest] = p.split("\n"); const a = rest.join("\n").trim().split(/\n\n/)[0].replace(/\*\*/g, "").trim(); if (q && a) out.push({ q: q.trim(), a }); }
  return out;
}

let cache: Post[] | null = null;
export function getAllPosts(): Post[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  if (!fs.existsSync(DIR)) return [];
  const posts = fs.readdirSync(DIR).filter((f) => f.endsWith(".md")).map((file) => {
    const raw = fs.readFileSync(path.join(DIR, file), "utf8");
    const { data, body } = parseFrontmatter(raw);
    const { html, toc } = render(body);
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
