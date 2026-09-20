"use client";
import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Field";
import { Stat } from "@/components/ui/Stat";
import { num } from "@/lib/format";

const LIMITS = [
  { n: "Instagram caption", max: 2200, k: "chars" }, { n: "Instagram bio", max: 150, k: "chars" }, { n: "X / Twitter post", max: 280, k: "chars" }, { n: "Facebook post (ideal)", max: 80, k: "chars" }, { n: "LinkedIn post", max: 3000, k: "chars" }, { n: "WhatsApp status", max: 700, k: "chars" }, { n: "Google Ads headline", max: 30, k: "chars" }, { n: "Google Ads description", max: 90, k: "chars" }, { n: "Meta / SEO title", max: 60, k: "chars" }, { n: "Meta description", max: 160, k: "chars" }, { n: "Amazon product title", max: 200, k: "chars" }, { n: "Amazon bullet point", max: 500, k: "chars" }, { n: "Flipkart description", max: 2000, k: "chars" }, { n: "SMS (1 segment)", max: 160, k: "chars" }, { n: "Google Business post", max: 1500, k: "chars" },
];

export default function WordCounter() {
  const [text, setText] = useState("");
  const s = useMemo(() => {
    const chars = text.length, noSpace = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.trim() ? (text.match(/[^.!?…]+[.!?…]+|[^.!?…]+$/g) ?? []).length : 0;
    const paras = text.trim() ? text.split(/\n\s*\n/).filter((p) => p.trim()).length : 0;
    const lines = text ? text.split("\n").length : 0;
    const hashtags = (text.match(/#[\p{L}\p{N}_]+/gu) ?? []).length;
    const mentions = (text.match(/@[\w.]+/g) ?? []).length;
    const emojis = (text.match(/\p{Extended_Pictographic}/gu) ?? []).length;
    const freq = new Map<string, number>(); text.toLowerCase().match(/[\p{L}']+/gu)?.forEach((w) => w.length > 3 && freq.set(w, (freq.get(w) ?? 0) + 1));
    const top = Array.from(freq.entries()).sort((a, b) => b[1] - a[1]).slice(0, 8);
    const readMin = words / 200, speakMin = words / 130;
    const avgWord = words ? noSpace / words : 0;
    return { chars, noSpace, words, sentences, paras, lines, hashtags, mentions, emojis, top, readMin, speakMin, avgWord, bytes: new Blob([text]).size };
  }, [text]);
  const fmtT = (m: number) => (m < 1 ? `${Math.round(m * 60)} sec` : `${Math.floor(m)} min ${Math.round((m % 1) * 60)} sec`);

  return (
    <div className="grid gap-5 lg:grid-cols-12 items-start">
      <Card className="lg:col-span-7 min-w-0">
        <CardHeader title="Your text" description="Product descriptions, ad copy, captions, SMS — check limits before you post." />
        <CardBody>
          <Textarea aria-label="Text" rows={16} value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste or type your content…" className="text-[15px] leading-relaxed" />
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4"><Stat label="Words" value={num(s.words)} /><Stat label="Characters" value={num(s.chars)} sub={`${num(s.noSpace)} without spaces`} /><Stat label="Sentences" value={num(s.sentences)} /><Stat label="Paragraphs" value={num(s.paras)} /></div>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4"><Stat label="Reading time" value={fmtT(s.readMin)} /><Stat label="Speaking time" value={fmtT(s.speakMin)} /><Stat label="Hashtags / mentions" value={`${s.hashtags} / ${s.mentions}`} /><Stat label="Emojis" value={String(s.emojis)} /></div>
          {s.top.length ? <div className="mt-4 flex flex-wrap gap-1.5">{s.top.map(([w, c]) => <span key={w} className="rounded-full border border-border bg-surface-2 px-2.5 py-1 text-xs text-ink-2">{w} <span className="text-muted tabular">×{c}</span></span>)}</div> : null}
        </CardBody>
      </Card>
      <Card className="lg:col-span-5 min-w-0 lg:sticky lg:top-24">
        <CardHeader title="Platform limits" description="Green = fits, amber = close, red = over." />
        <CardBody className="grid gap-2">
          {LIMITS.map((l) => { const v = s.chars; const p = Math.min(100, (v / l.max) * 100); const tone = v > l.max ? "#b91c1c" : v > l.max * 0.9 ? "#b45309" : "#047857"; return (
            <div key={l.n} className="grid grid-cols-[1fr_auto] items-center gap-3 text-xs"><div className="min-w-0"><div className="flex justify-between"><span className="truncate text-ink-2">{l.n}</span><span className="tabular text-muted">{num(v)} / {num(l.max)}</span></div><div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-3"><div className="h-full rounded-full transition-[width] duration-200" style={{ width: `${p}%`, background: tone }} /></div></div><span className="w-12 text-right tabular font-medium" style={{ color: tone }}>{v > l.max ? `+${num(v - l.max)}` : num(l.max - v)}</span></div>
          ); })}
          <p className="pt-2 text-[11px] text-muted">SMS: {Math.ceil(s.chars / 160) || 0} segment{Math.ceil(s.chars / 160) === 1 ? "" : "s"} (GSM-7). Unicode/Hindi text uses 70-char segments.</p>
        </CardBody>
      </Card>
    </div>
  );
}
