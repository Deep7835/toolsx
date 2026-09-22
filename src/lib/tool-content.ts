import fs from "node:fs";
import path from "node:path";
import { extractFaqs, parseFrontmatter, renderMarkdown, splitFaqSection, type Faq, type Toc } from "./markdown";

export interface ToolArticle {
  html: string;   // everything except the FAQ section (rendered as an accordion instead)
  faqs: Faq[];
  toc: Toc;
  words: number;
  updated?: string;
}

const DIR = path.join(process.cwd(), "content", "tools");
const cache = new Map<string, ToolArticle | null>();

/** Long-form guide shown under a tool, from content/tools/<slug>.md (build time only). */
export function getToolArticle(slug: string): ToolArticle | null {
  if (process.env.NODE_ENV === "production" && cache.has(slug)) return cache.get(slug)!;
  const file = path.join(DIR, `${slug}.md`);
  let article: ToolArticle | null = null;
  if (fs.existsSync(file)) {
    const { data, body } = parseFrontmatter(fs.readFileSync(file, "utf8"));
    const { main } = splitFaqSection(body);
    const { html, toc } = renderMarkdown(main.trim());
    article = { html, toc, faqs: extractFaqs(body), words: body.split(/\s+/).filter(Boolean).length, updated: data.updated ? String(data.updated) : undefined };
  }
  cache.set(slug, article);
  return article;
}
