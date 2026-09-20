"use client";
import { useState } from "react";
import { Download, Trash2, Package } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { FieldGroup, NumberInput, Range, Select, Toggle } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Dropzone, fmtBytes } from "@/components/shell/Dropzone";
import { downloadBlob } from "@/lib/export";
import { useToast } from "@/components/ui/Toast";
import { uid } from "@/lib/format";

interface Item { id: string; file: File; src: string; w: number; h: number; out?: { blob: Blob; url: string; w: number; h: number } }
const PRESETS: Record<string, { w: number; h?: number; l: string }> = { none: { w: 0, l: "Keep original size" }, wa: { w: 1600, l: "WhatsApp catalogue · 1600px" }, ig: { w: 1080, h: 1080, l: "Instagram square · 1080×1080" }, story: { w: 1080, h: 1920, l: "Story / Reel cover · 1080×1920" }, amz: { w: 2000, h: 2000, l: "Amazon / Flipkart · 2000×2000" }, web: { w: 1200, l: "Website · 1200px wide" }, thumb: { w: 400, l: "Thumbnail · 400px" } };

export default function PhotoResizer() {
  const [items, setItems] = useState<Item[]>([]);
  const [preset, setPreset] = useState("wa");
  const [customW, setCustomW] = useState(1200);
  const [quality, setQuality] = useState(80);
  const [format, setFormat] = useState<"image/jpeg" | "image/webp" | "image/png">("image/jpeg");
  const [maxKb, setMaxKb] = useState(0);
  const [square, setSquare] = useState(false);
  const [busy, setBusy] = useState(false);
  const toast = useToast();

  const add = (files: File[]) => files.filter((f) => f.type.startsWith("image/")).forEach((file) => { const src = URL.createObjectURL(file); const i = new Image(); i.onload = () => setItems((x) => [...x, { id: uid(), file, src, w: i.width, h: i.height }]); i.src = src; });

  const process = async () => {
    setBusy(true);
    try {
      const { default: compress } = await import("browser-image-compression");
      const p = PRESETS[preset]; const targetW = preset === "none" ? 0 : p.w || customW;
      const out: Item[] = [];
      for (const it of items) {
        let file: File = it.file;
        if (square || (p.h && p.w)) file = await squareCrop(it, p.h && p.w ? { w: p.w, h: p.h } : null);
        const opts: Parameters<typeof compress>[1] = { maxWidthOrHeight: targetW || undefined, initialQuality: quality / 100, fileType: format, useWebWorker: true, maxSizeMB: maxKb ? maxKb / 1024 : undefined };
        const blob = await compress(file, opts);
        const url = URL.createObjectURL(blob); const dims = await new Promise<{ w: number; h: number }>((r) => { const i = new Image(); i.onload = () => r({ w: i.width, h: i.height }); i.src = url; });
        out.push({ ...it, out: { blob, url, ...dims } });
      }
      setItems(out); toast(`${out.length} image${out.length > 1 ? "s" : ""} optimised`);
    } catch { toast("Could not process images", "error"); } finally { setBusy(false); }
  };
  const ext = format === "image/jpeg" ? "jpg" : format === "image/webp" ? "webp" : "png";
  const name = (it: Item) => it.file.name.replace(/\.[^.]+$/, "") + `-optimised.${ext}`;
  const zipAll = async () => { const { default: JSZip } = await import("jszip"); const z = new JSZip(); items.forEach((it) => it.out && z.file(name(it), it.out.blob)); downloadBlob(await z.generateAsync({ type: "blob" }), "optimised-images.zip"); };
  const totalIn = items.reduce((a, i) => a + i.file.size, 0), totalOut = items.reduce((a, i) => a + (i.out?.blob.size ?? 0), 0);

  return (
    <div className="grid gap-5 lg:grid-cols-12 items-start">
      <Card className="lg:col-span-4 min-w-0">
        <CardHeader title="Settings" />
        <CardBody className="grid gap-6">
          <FieldGroup title="Size">
            <Select label="Preset" value={preset} onChange={(e) => setPreset(e.target.value)} options={Object.entries(PRESETS).map(([k, v]) => ({ value: k, label: v.l }))} />
            {preset === "web" || preset === "thumb" || preset === "wa" ? <NumberInput label="Max width / height" suffix="px" value={PRESETS[preset].w} onChange={setCustomW} disabled /> : null}
            <Toggle checked={square} onChange={setSquare} label="Crop to square (centre)" help="Good for catalogue grids." />
          </FieldGroup>
          <FieldGroup title="Compression">
            <Select label="Output format" value={format} onChange={(e) => setFormat(e.target.value as typeof format)} options={[{ value: "image/jpeg", label: "JPEG — smallest for photos" }, { value: "image/webp", label: "WebP — modern, 30% smaller" }, { value: "image/png", label: "PNG — lossless / transparency" }]} />
            <Range label="Quality" value={quality} onChange={setQuality} min={30} max={100} step={5} format={(v) => `${v}%`} />
            <NumberInput label="Target max size" hint="optional" suffix="KB" value={maxKb} onChange={setMaxKb} placeholder="e.g. 200" />
          </FieldGroup>
          <Button onClick={process} loading={busy} disabled={!items.length}>Optimise {items.length ? `${items.length} image${items.length > 1 ? "s" : ""}` : ""}</Button>
        </CardBody>
      </Card>
      <Card className="lg:col-span-8 min-w-0">
        <CardHeader title="Images" description={items.length ? `${fmtBytes(totalIn)}${totalOut ? ` → ${fmtBytes(totalOut)} (−${Math.round((1 - totalOut / totalIn) * 100)}%)` : ""}` : "Add product photos — they never leave your device."} action={items.some((i) => i.out) ? <div className="flex gap-1.5"><Button size="sm" variant="secondary" onClick={zipAll}><Package className="h-3.5 w-3.5" /> ZIP all</Button><Button size="sm" variant="ghost" onClick={() => setItems([])}><Trash2 className="h-3.5 w-3.5" /> Clear</Button></div> : null} />
        <CardBody className="grid gap-4">
          <Dropzone accept="image/*" multiple onFiles={add} hint="JPG, PNG, WebP, HEIC · multiple files" />
          {items.length ? (
            <ul className="grid gap-3 sm:grid-cols-2">
              {items.map((it) => (
                <li key={it.id} className="flex gap-3 rounded-xl border border-border bg-surface-2/50 p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={it.out?.url ?? it.src} alt="" className="h-20 w-20 shrink-0 rounded-lg object-cover bg-surface-3" />
                  <div className="min-w-0 flex-1 text-xs">
                    <div className="truncate font-medium text-ink">{it.file.name}</div>
                    <div className="text-muted">{it.w}×{it.h} · {fmtBytes(it.file.size)}</div>
                    {it.out ? <div className="mt-1 text-accent-text">→ {it.out.w}×{it.out.h} · {fmtBytes(it.out.blob.size)} <span className="text-muted">(−{Math.max(0, Math.round((1 - it.out.blob.size / it.file.size) * 100))}%)</span></div> : null}
                    <div className="mt-2 flex gap-1">{it.out ? <Button size="sm" variant="secondary" onClick={() => downloadBlob(it.out!.blob, name(it))}><Download className="h-3.5 w-3.5" /> Save</Button> : null}<Button size="sm" variant="ghost" onClick={() => setItems(items.filter((x) => x.id !== it.id))}><Trash2 className="h-3.5 w-3.5" /></Button></div>
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </CardBody>
      </Card>
    </div>
  );
}

async function squareCrop(it: Item, target: { w: number; h: number } | null): Promise<File> {
  const img = await new Promise<HTMLImageElement>((r) => { const i = new Image(); i.onload = () => r(i); i.src = it.src; });
  const tw = target?.w ?? Math.min(img.width, img.height), th = target?.h ?? tw;
  const scale = Math.max(tw / img.width, th / img.height);
  const sw = tw / scale, sh = th / scale; const sx = (img.width - sw) / 2, sy = (img.height - sh) / 2;
  const c = document.createElement("canvas"); c.width = tw; c.height = th; const ctx = c.getContext("2d")!; ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, tw, th); ctx.drawImage(img, sx, sy, sw, sh, 0, 0, tw, th);
  const blob: Blob = await new Promise((r) => c.toBlob((b) => r(b!), "image/png"));
  return new File([blob], it.file.name, { type: "image/png" });
}
