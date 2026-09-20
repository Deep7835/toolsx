"use client";
import { useMemo, useState, type ReactNode } from "react";
import { FileText, Download } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CodeBlock } from "@/components/shell/TextOutput";
import { downloadText, shareWhatsApp } from "@/lib/export";
import { fmtDate, todayISO } from "@/lib/format";

/** Tiny markdown → HTML for headings, paragraphs and bullet lists. */
export function mdToHtml(md: string) {
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const lines = md.split("\n"); const out: string[] = []; let inList = false;
  for (const raw of lines) {
    const l = raw.trimEnd();
    if (/^- /.test(l)) { if (!inList) { out.push("<ul>"); inList = true; } out.push(`<li>${esc(l.slice(2))}</li>`); continue; }
    if (inList) { out.push("</ul>"); inList = false; }
    if (/^# /.test(l)) out.push(`<h1>${esc(l.slice(2))}</h1>`);
    else if (/^## /.test(l)) out.push(`<h2>${esc(l.slice(3))}</h2>`);
    else if (/^### /.test(l)) out.push(`<h3>${esc(l.slice(4))}</h3>`);
    else if (l.trim()) out.push(`<p>${esc(l).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")}</p>`);
  }
  if (inList) out.push("</ul>");
  return out.join("\n");
}

export function LegalDocShell({ title, form, markdown, filename, intro }: { title: string; form: ReactNode; markdown: string; filename: string; intro?: ReactNode }) {
  const [view, setView] = useState<"preview" | "markdown" | "html">("preview");
  const html = useMemo(() => mdToHtml(markdown), [markdown]);
  const fullHtml = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${title}</title><style>body{font-family:system-ui,sans-serif;max-width:760px;margin:40px auto;padding:0 20px;line-height:1.7;color:#1c1917}h1{font-size:28px}h2{font-size:20px;margin-top:32px}ul{padding-left:20px}</style></head><body>${html}</body></html>`;
  return (
    <div className="grid gap-5 lg:grid-cols-12 items-start">
      <Card className="lg:col-span-5 min-w-0">
        <CardHeader title="Details" description={intro} icon={<FileText className="h-4 w-4" strokeWidth={2} />} />
        <CardBody className="grid gap-6">{form}</CardBody>
      </Card>
      <div className="grid gap-4 lg:col-span-7 min-w-0 lg:sticky lg:top-24">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex rounded-xl border border-border bg-surface-2 p-1">{(["preview", "markdown", "html"] as const).map((v) => <button key={v} type="button" onClick={() => setView(v)} className={`h-8 rounded-lg px-3 text-xs font-medium capitalize transition-colors cursor-pointer ${view === v ? "bg-surface text-ink shadow-sm" : "text-muted hover:text-ink"}`}>{v}</button>)}</div>
          <div className="flex gap-1.5"><Button size="sm" variant="secondary" onClick={() => downloadText(fullHtml, `${filename}.html`, "text/html")}><Download className="h-3.5 w-3.5" /> HTML</Button><Button size="sm" variant="secondary" onClick={() => downloadText(markdown, `${filename}.md`, "text/markdown")}><Download className="h-3.5 w-3.5" /> Markdown</Button><Button size="sm" variant="whatsapp" onClick={() => shareWhatsApp(markdown.slice(0, 3000))}>Share</Button></div>
        </div>
        {view === "preview" ? <Card><CardBody><div className="max-h-[70vh] overflow-auto text-[14px] leading-relaxed text-ink-2 [&_h1]:font-display [&_h1]:text-3xl [&_h1]:text-ink [&_h2]:mt-6 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-ink [&_h3]:mt-4 [&_h3]:font-semibold [&_h3]:text-ink [&_p]:mt-2 [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1" dangerouslySetInnerHTML={{ __html: html }} /></CardBody></Card> : null}
        {view === "markdown" ? <CodeBlock value={markdown} label="Markdown" filename={`${filename}.md`} wrap /> : null}
        {view === "html" ? <CodeBlock value={fullHtml} label="HTML" filename={`${filename}.html`} mime="text/html" wrap /> : null}
        <p className="text-xs text-muted">Template for general use — not legal advice. Have a lawyer review before relying on it for regulated activities. Effective date: {fmtDate(todayISO(), "long")}.</p>
      </div>
    </div>
  );
}
