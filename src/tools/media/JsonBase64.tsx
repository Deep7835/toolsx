"use client";
import { useMemo, useState } from "react";
import { Braces, Binary, ArrowRightLeft } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Segmented, Select, Textarea, Toggle } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { CodeBlock } from "@/components/shell/TextOutput";

const SAMPLE = '{"invoice":"INV-2609-0001","customer":{"name":"Amit Sharma","gstin":"07AAAAA0000A1Z5"},"items":[{"name":"Rice 5kg","qty":2,"rate":499}],"total":1177.64}';

export default function JsonBase64() {
  const [tab, setTab] = useState<"json" | "b64">("json");
  const [input, setInput] = useState(SAMPLE);
  const [indent, setIndent] = useState("2");
  const [sortKeys, setSortKeys] = useState(false);
  const [b64in, setB64in] = useState("Kaagazo · ₹1,180.00");
  const [dir, setDir] = useState<"encode" | "decode">("encode");
  const [urlSafe, setUrlSafe] = useState(false);

  const json = useMemo(() => {
    if (!input.trim()) return { ok: true, pretty: "", min: "", error: "", stats: null as null | { keys: number; depth: number; bytes: number } };
    try {
      const parsed = JSON.parse(input);
      const sorter = (v: unknown): unknown => Array.isArray(v) ? v.map(sorter) : v && typeof v === "object" ? Object.fromEntries(Object.keys(v as object).sort().map((k) => [k, sorter((v as Record<string, unknown>)[k])])) : v;
      const obj = sortKeys ? sorter(parsed) : parsed;
      const sp = indent === "tab" ? "\t" : parseInt(indent);
      const count = (v: unknown, d = 1): [number, number] => { if (Array.isArray(v)) return v.reduce<[number, number]>((a, x) => { const [k, dd] = count(x, d + 1); return [a[0] + k, Math.max(a[1], dd)]; }, [0, d]); if (v && typeof v === "object") { const ks = Object.keys(v as object); return ks.reduce<[number, number]>((a, k) => { const [kk, dd] = count((v as Record<string, unknown>)[k], d + 1); return [a[0] + kk, Math.max(a[1], dd)]; }, [ks.length, d]); } return [0, d]; };
      const [keys, depth] = count(obj);
      return { ok: true, pretty: JSON.stringify(obj, null, sp), min: JSON.stringify(obj), error: "", stats: { keys, depth, bytes: new Blob([input]).size } };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      const pos = msg.match(/position (\d+)/)?.[1];
      let where = "";
      if (pos) { const p = parseInt(pos); const line = input.slice(0, p).split("\n").length; const col = p - input.lastIndexOf("\n", p - 1); where = ` (line ${line}, column ${col})`; }
      return { ok: false, pretty: "", min: "", error: msg + where, stats: null };
    }
  }, [input, indent, sortKeys]);

  const b64 = useMemo(() => {
    try {
      if (dir === "encode") { const bytes = new TextEncoder().encode(b64in); let bin = ""; bytes.forEach((b) => (bin += String.fromCharCode(b))); let s = btoa(bin); if (urlSafe) s = s.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); return { ok: true, out: s }; }
      let s = b64in.trim().replace(/-/g, "+").replace(/_/g, "/"); s += "===".slice((s.length + 3) % 4); const bin = atob(s); const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0)); return { ok: true, out: new TextDecoder().decode(bytes) };
    } catch { return { ok: false, out: "Invalid Base64 input" }; }
  }, [b64in, dir, urlSafe]);

  return (
    <div className="grid gap-5">
      <Segmented value={tab} onChange={setTab} options={[{ value: "json", label: "JSON formatter & linter" }, { value: "b64", label: "Base64 encode / decode" }]} className="max-w-md" />
      {tab === "json" ? (
        <div className="grid gap-5 lg:grid-cols-2 items-start">
          <Card className="min-w-0">
            <CardHeader title="Input" icon={<Braces className="h-4 w-4" strokeWidth={2} />} description={json.stats ? `${json.stats.keys} keys · depth ${json.stats.depth} · ${json.stats.bytes} bytes` : undefined} action={<div className="flex gap-1.5"><Button size="sm" variant="ghost" onClick={() => setInput(SAMPLE)}>Sample</Button><Button size="sm" variant="ghost" onClick={() => setInput("")}>Clear</Button></div>} />
            <CardBody className="grid gap-4">
              <Textarea aria-label="JSON input" rows={16} value={input} onChange={(e) => setInput(e.target.value)} className="font-mono text-[13px]" spellCheck={false} error={json.error || undefined} placeholder="Paste JSON here…" />
              <div className="grid grid-cols-2 gap-4"><Select label="Indent" value={indent} onChange={(e) => setIndent(e.target.value)} options={[{ value: "2", label: "2 spaces" }, { value: "4", label: "4 spaces" }, { value: "tab", label: "Tab" }]} /><div className="flex items-end"><Toggle checked={sortKeys} onChange={setSortKeys} label="Sort keys A→Z" className="w-full" /></div></div>
              {json.ok && input.trim() ? <p className="text-xs text-accent-text">✓ Valid JSON</p> : null}
            </CardBody>
          </Card>
          <div className="grid gap-5 min-w-0">
            <CodeBlock value={json.pretty} label="Pretty-printed" filename="formatted.json" mime="application/json" className="min-w-0" />
            <CodeBlock value={json.min} label={`Minified${json.min ? ` · ${json.min.length} chars` : ""}`} filename="minified.json" mime="application/json" wrap />
          </div>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2 items-start">
          <Card className="min-w-0">
            <CardHeader title={dir === "encode" ? "Text to encode" : "Base64 to decode"} icon={<Binary className="h-4 w-4" strokeWidth={2} />} action={<Button size="sm" variant="secondary" onClick={() => { setDir(dir === "encode" ? "decode" : "encode"); if (b64.ok) setB64in(b64.out); }}><ArrowRightLeft className="h-3.5 w-3.5" /> Swap</Button>} />
            <CardBody className="grid gap-4">
              <Textarea aria-label="Input" rows={10} value={b64in} onChange={(e) => setB64in(e.target.value)} className="font-mono text-[13px]" spellCheck={false} />
              <Toggle checked={urlSafe} onChange={setUrlSafe} label="URL-safe alphabet (- _ and no padding)" />
              <p className="text-xs text-muted">UTF-8 aware — Hindi, ₹ and emoji round-trip correctly.</p>
            </CardBody>
          </Card>
          <CodeBlock value={b64.out} label={dir === "encode" ? "Base64" : "Decoded text"} filename={dir === "encode" ? "encoded.txt" : "decoded.txt"} wrap className={b64.ok ? "" : "border-danger"} />
        </div>
      )}
    </div>
  );
}
