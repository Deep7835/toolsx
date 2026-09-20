"use client";
import { useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { FieldGroup, Input, Row, Select, Textarea, Toggle } from "@/components/ui/Field";
import { CodeBlock } from "@/components/shell/TextOutput";
import { SerpPreview } from "./serp";
import { useBusiness } from "../shared/Business";

export default function MetaTags() {
  const { business } = useBusiness();
  const [m, setM] = useState({ title: `${business.name} — Fresh groceries delivered in 30 minutes`, desc: "Order fruits, vegetables, dairy and daily essentials from your neighbourhood store. Free delivery above ₹299 across Delhi NCR.", url: "https://www.example.in/", canonical: "", site: business.name, image: "https://www.example.in/og-image.jpg", type: "website", locale: "en_IN", twitter: "summary_large_image", handle: "", robots: "index, follow", keywords: "", author: "", theme: "#047857" });
  const [inc, setInc] = useState({ og: true, tw: true, extra: true });
  const s = (k: keyof typeof m, v: string) => setM({ ...m, [k]: v });
  const esc = (v: string) => v.replace(/"/g, "&quot;");
  const lines = [
    `<title>${m.title}</title>`, `<meta name="description" content="${esc(m.desc)}">`, `<link rel="canonical" href="${m.canonical || m.url}">`, `<meta name="robots" content="${m.robots}">`,
    m.keywords && `<meta name="keywords" content="${esc(m.keywords)}">`, m.author && `<meta name="author" content="${esc(m.author)}">`,
    inc.extra && `<meta name="viewport" content="width=device-width, initial-scale=1">`, inc.extra && `<meta charset="utf-8">`, inc.extra && m.theme && `<meta name="theme-color" content="${m.theme}">`,
    inc.og && `\n<!-- Open Graph (Facebook, WhatsApp, LinkedIn) -->`, inc.og && `<meta property="og:type" content="${m.type}">`, inc.og && `<meta property="og:title" content="${esc(m.title)}">`, inc.og && `<meta property="og:description" content="${esc(m.desc)}">`, inc.og && `<meta property="og:url" content="${m.url}">`, inc.og && `<meta property="og:site_name" content="${esc(m.site)}">`, inc.og && m.image && `<meta property="og:image" content="${m.image}">`, inc.og && m.image && `<meta property="og:image:width" content="1200">`, inc.og && m.image && `<meta property="og:image:height" content="630">`, inc.og && `<meta property="og:locale" content="${m.locale}">`,
    inc.tw && `\n<!-- Twitter / X -->`, inc.tw && `<meta name="twitter:card" content="${m.twitter}">`, inc.tw && `<meta name="twitter:title" content="${esc(m.title)}">`, inc.tw && `<meta name="twitter:description" content="${esc(m.desc)}">`, inc.tw && m.image && `<meta name="twitter:image" content="${m.image}">`, inc.tw && m.handle && `<meta name="twitter:site" content="@${m.handle.replace(/^@/, "")}">`,
  ].filter(Boolean).join("\n");
  const tl = m.title.length, dl = m.desc.length;

  return (
    <div className="grid gap-5 lg:grid-cols-12 items-start">
      <Card className="lg:col-span-6 min-w-0">
        <CardHeader title="Page details" />
        <CardBody className="grid gap-6">
          <FieldGroup title="Basics">
            <Input label="Title" hint={<span className={tl > 60 ? "text-danger" : tl > 50 ? "text-warn" : "text-accent-text"}>{tl}/60</span>} value={m.title} onChange={(e) => s("title", e.target.value)} />
            <Textarea label="Description" hint={<span className={dl > 160 ? "text-danger" : dl > 140 ? "text-warn" : "text-accent-text"}>{dl}/160</span>} rows={3} value={m.desc} onChange={(e) => s("desc", e.target.value)} />
            <Row><Input label="Page URL" value={m.url} onChange={(e) => s("url", e.target.value)} /><Input label="Canonical" hint="if different" value={m.canonical} onChange={(e) => s("canonical", e.target.value)} /><Select label="Robots" value={m.robots} onChange={(e) => s("robots", e.target.value)} options={["index, follow", "noindex, follow", "index, nofollow", "noindex, nofollow"]} /><Input label="Keywords" hint="optional" value={m.keywords} onChange={(e) => s("keywords", e.target.value)} /></Row>
          </FieldGroup>
          <FieldGroup title="Social sharing">
            <Row><Input label="Site name" value={m.site} onChange={(e) => s("site", e.target.value)} /><Select label="OG type" value={m.type} onChange={(e) => s("type", e.target.value)} options={["website", "article", "product", "profile"]} /><Input label="Share image URL" value={m.image} onChange={(e) => s("image", e.target.value)} help="1200×630 px recommended" wrapClassName="sm:col-span-2" /><Select label="Twitter card" value={m.twitter} onChange={(e) => s("twitter", e.target.value)} options={["summary_large_image", "summary"]} /><Input label="Twitter handle" value={m.handle} onChange={(e) => s("handle", e.target.value)} placeholder="@yourbrand" /></Row>
            <div className="grid gap-2"><Toggle checked={inc.og} onChange={(v) => setInc({ ...inc, og: v })} label="Include Open Graph tags" /><Toggle checked={inc.tw} onChange={(v) => setInc({ ...inc, tw: v })} label="Include Twitter tags" /><Toggle checked={inc.extra} onChange={(v) => setInc({ ...inc, extra: v })} label="Include charset, viewport, theme-color" /></div>
          </FieldGroup>
        </CardBody>
      </Card>
      <div className="grid gap-4 lg:col-span-6 min-w-0 lg:sticky lg:top-24">
        <div><div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">Google preview</div><SerpPreview title={m.title} desc={m.desc} url={m.url} site={m.site} /></div>
        {m.image ? <div><div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">Social card preview</div><div className="max-w-[480px] overflow-hidden rounded-2xl border border-border bg-surface"><div className="aspect-[1.91/1] bg-surface-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={m.image} alt="" className="h-full w-full object-cover" onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} /></div><div className="p-3"><div className="text-[11px] uppercase text-muted">{m.url.replace(/^https?:\/\//, "").split("/")[0]}</div><div className="truncate text-sm font-semibold text-ink">{m.title}</div><div className="line-clamp-2 text-xs text-muted">{m.desc}</div></div></div></div> : null}
        <CodeBlock value={lines} label="Paste into <head>" filename="meta-tags.html" mime="text/html" />
      </div>
    </div>
  );
}
