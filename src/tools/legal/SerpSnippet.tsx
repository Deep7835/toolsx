"use client";
import { useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input, Textarea, Segmented } from "@/components/ui/Field";
import { Stat } from "@/components/ui/Stat";
import { SerpPreview } from "./serp";

const px = (s: string, size: number) => { const c = document.createElement("canvas").getContext("2d"); if (!c) return s.length * size * 0.5; c.font = `${size}px Arial`; return c.measureText(s).width; };

export default function SerpSnippet() {
  const [title, setTitle] = useState("GST Invoice Generator with UPI QR — Free for Indian Shops");
  const [desc, setDesc] = useState("Create GST-compliant invoices with a dynamic UPI QR code in under a minute. No login, 100% private, free PDF download. Built for Indian small businesses.");
  const [url, setUrl] = useState("https://www.example.in/tools/gst-invoice");
  const [site, setSite] = useState("Kaagazo");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const tPx = typeof window !== "undefined" ? px(title, 20) : 0;
  const dPx = typeof window !== "undefined" ? px(desc, 14) : 0;
  const tLimit = 580, dLimit = 920;
  const kw = title.toLowerCase().split(/[\s—–-]+/).filter((w) => w.length > 3);
  const kwInDesc = kw.filter((w) => desc.toLowerCase().includes(w)).length;
  const tips = [
    title.length < 30 ? "Title is short — add your main keyword and a benefit." : null,
    title.length > 60 || tPx > tLimit ? "Title will be truncated on desktop. Keep it under ~60 characters / 580 px." : null,
    desc.length < 70 ? "Description is short — use the space to answer the searcher's question." : null,
    desc.length > 160 || dPx > dLimit ? "Description is likely to be cut off. Aim for 120–158 characters." : null,
    !/[₹0-9]/.test(title + desc) ? "Numbers, prices and years (e.g. ‘2026’) lift click-through." : null,
    kwInDesc === 0 ? "Repeat the title's key phrase in the description — Google bolds matching words." : null,
    !/\b(free|instant|today|now|easy|fast|no login)\b/i.test(desc) ? "Add a call to action or benefit word (free, instant, no login)." : null,
  ].filter(Boolean) as string[];

  return (
    <div className="grid gap-5 lg:grid-cols-12 items-start">
      <Card className="lg:col-span-5 min-w-0">
        <CardHeader title="Snippet" />
        <CardBody className="grid gap-4">
          <Input label="Title tag" hint={`${title.length} chars · ${Math.round(tPx)} px`} value={title} onChange={(e) => setTitle(e.target.value)} />
          <Textarea label="Meta description" hint={`${desc.length} chars · ${Math.round(dPx)} px`} rows={4} value={desc} onChange={(e) => setDesc(e.target.value)} />
          <Input label="URL" value={url} onChange={(e) => setUrl(e.target.value)} />
          <Input label="Site name" value={site} onChange={(e) => setSite(e.target.value)} />
          <div className="grid grid-cols-2 gap-3"><Stat label="Title width" value={`${Math.round((tPx / tLimit) * 100)}%`} sub={`of ${tLimit}px`} tone={tPx > tLimit ? "danger" : "accent"} /><Stat label="Description width" value={`${Math.round((dPx / dLimit) * 100)}%`} sub={`of ${dLimit}px`} tone={dPx > dLimit ? "danger" : "accent"} /></div>
        </CardBody>
      </Card>
      <div className="grid gap-4 lg:col-span-7 min-w-0 lg:sticky lg:top-24">
        <Segmented value={device} onChange={setDevice} options={[{ value: "desktop", label: "Desktop" }, { value: "mobile", label: "Mobile" }]} className="max-w-xs" size="sm" />
        <div className="rounded-3xl bg-surface-2/60 p-5 sm:p-8"><SerpPreview title={title} desc={desc} url={url} site={site} mobile={device === "mobile"} /></div>
        {tips.length ? <Card><CardHeader title="Suggestions" /><CardBody><ul className="grid gap-2 text-sm text-ink-2">{tips.map((t) => <li key={t} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-warn" />{t}</li>)}</ul></CardBody></Card> : <p className="text-sm text-accent-text">Looks good — title and description fit and include your key terms.</p>}
      </div>
    </div>
  );
}
