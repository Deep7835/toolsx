"use client";
import { useState } from "react";
import { Download, Copy, Check, FileCode2 } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Range, Select } from "@/components/ui/Field";
import { useQr, qrSvg } from "./Qr";
import { downloadDataUrl, downloadText, copyText } from "@/lib/export";
import { useToast } from "@/components/ui/Toast";

export function useQrStyle() {
  const [dark, setDark] = useState("#1c1917");
  const [light, setLight] = useState("#ffffff");
  const [size, setSize] = useState(1024);
  const [level, setLevel] = useState<"L" | "M" | "Q" | "H">("M");
  const [margin, setMargin] = useState(2);
  return { dark, setDark, light, setLight, size, setSize, level, setLevel, margin, setMargin };
}
export type QrStyle = ReturnType<typeof useQrStyle>;

export function QrStyleFields({ s }: { s: QrStyle }) {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-4">
        <ColorField label="Foreground" value={s.dark} onChange={s.setDark} />
        <ColorField label="Background" value={s.light} onChange={s.setLight} />
      </div>
      <Range label="Export size" value={s.size} onChange={s.setSize} min={256} max={2048} step={128} format={(v) => `${v}px`} />
      <div className="grid grid-cols-2 gap-4">
        <Select label="Error correction" value={s.level} onChange={(e) => s.setLevel(e.target.value as QrStyle["level"])} options={[{ value: "L", label: "L — 7% (smallest)" }, { value: "M", label: "M — 15% (default)" }, { value: "Q", label: "Q — 25%" }, { value: "H", label: "H — 30% (print / logo overlay)" }]} />
        <Select label="Quiet zone" value={String(s.margin)} onChange={(e) => s.setMargin(parseInt(e.target.value))} options={[{ value: "0", label: "None" }, { value: "1", label: "Thin" }, { value: "2", label: "Standard" }, { value: "4", label: "Wide" }]} />
      </div>
    </div>
  );
}

export function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <div className="mb-1.5 text-[13px] font-medium text-ink-2">{label}</div>
      <div className="flex items-center gap-2">
        <label className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-border cursor-pointer" style={{ background: value }}><input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" aria-label={label} /></label>
        <Input aria-label={`${label} hex`} value={value} onChange={(e) => onChange(e.target.value)} className="font-mono uppercase" />
      </div>
    </div>
  );
}

export function QrOutput({ text, style, filename, title = "Your QR code", description, caption, extra }: { text: string; style: QrStyle; filename: string; title?: string; description?: string; caption?: string; extra?: React.ReactNode }) {
  const url = useQr(text, { size: style.size, dark: style.dark, light: style.light, level: style.level, margin: style.margin });
  const [copied, setCopied] = useState(false);
  const toast = useToast();
  const svg = async () => { downloadText(await qrSvg(text, { dark: style.dark, light: style.light, level: style.level, margin: style.margin }), `${filename}.svg`, "image/svg+xml"); toast("SVG downloaded"); };
  const png = () => { if (!url) return; downloadDataUrl(url, `${filename}.png`); toast("PNG downloaded"); };
  const copy = async () => { await copyText(text); setCopied(true); toast("Copied"); setTimeout(() => setCopied(false), 1500); };
  return (
    <Card className="lg:sticky lg:top-24 min-w-0">
      <CardHeader title={title} description={description ?? "Updates live · scan with any phone camera"} />
      <CardBody className="flex flex-col items-center gap-4">
        <div className="rounded-2xl border border-border p-3" style={{ background: style.light }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {url ? <img src={url} alt="QR code" width={260} height={260} className="h-[260px] w-[260px]" style={{ imageRendering: "pixelated" }} /> : <div className="flex h-[260px] w-[260px] items-center justify-center text-sm text-muted">Fill in the details to generate</div>}
        </div>
        {caption ? <p className="text-center text-sm font-medium text-ink">{caption}</p> : null}
        <div className="flex flex-wrap justify-center gap-2">
          <Button onClick={png} disabled={!url}><Download className="h-4 w-4" /> PNG</Button>
          <Button variant="secondary" onClick={svg} disabled={!text}><FileCode2 className="h-4 w-4" /> SVG</Button>
          <Button variant="ghost" onClick={copy} disabled={!text}>{copied ? <Check className="h-4 w-4 text-accent-text" /> : <Copy className="h-4 w-4" />} Copy data</Button>
          {extra}
        </div>
        {text ? <div className="w-full break-all rounded-xl bg-surface-2/60 px-3 py-2 font-mono text-[11px] leading-relaxed text-muted max-h-24 overflow-auto">{text}</div> : null}
      </CardBody>
    </Card>
  );
}
