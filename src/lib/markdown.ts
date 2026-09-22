import { marked, type Tokens } from "marked";

export type Toc = Array<{ id: string; text: string; level: 2 | 3 }>;
export type Faq = { q: string; a: string };

export function parseFrontmatter(raw: string): { data: Record<string, unknown>; body: string } {
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

/** GFM → HTML with id'd headings (for the TOC), wrapped tables and external links opening in a new tab. */
export function renderMarkdown(md: string): { html: string; toc: Toc } {
  const toc: Toc = [];
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

const FAQ_HEADING = /^## (FAQ|Frequently asked questions)/im;

/** Split a document into everything before the "## FAQ" heading and the FAQ section itself. */
export function splitFaqSection(md: string): { main: string; faq: string } {
  const i = md.search(FAQ_HEADING);
  if (i < 0) return { main: md, faq: "" };
  const faq = md.slice(i).split(/\n## (?!#)/)[0];
  const rest = md.slice(i + faq.length);
  return { main: md.slice(0, i) + rest, faq };
}

/** Extract "## FAQ" section Q/As (### question → first paragraph answer) for JSON-LD and accordions. */
export function extractFaqs(md: string): Faq[] {
  const { faq } = splitFaqSection(md);
  if (!faq) return [];
  const out: Faq[] = [];
  for (const p of faq.split(/\n### /).slice(1)) {
    const [q, ...rest] = p.split("\n");
    const a = rest.join("\n").trim().split(/\n\n/)[0].replace(/\*\*/g, "").trim();
    if (q && a) out.push({ q: q.trim(), a });
  }
  return out;
}
