"use client";
import { useEffect, useRef, useState } from "react";
import { Download, Package } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { FieldGroup, Input, Range, Segmented, Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { LogoUpload } from "@/components/shell/LogoUpload";
import { ColorField } from "@/components/shell/QrOutput";
import { CodeBlock } from "@/components/shell/TextOutput";
import { downloadBlob, downloadDataUrl } from "@/lib/export";
import { useToast } from "@/components/ui/Toast";

const SIZES = [16, 32, 48, 64, 180, 192, 512];

export default function FaviconGenerator() {
  const [mode, setMode] = useState<"text" | "image">("text");
  const [text, setText] = useState("IB");
  const [bg, setBg] = useState("#047857");
  const [fg, setFg] = useState("#ffffff");
  const [radius, setRadius] = useState(22);
  const [font, setFont] = useState("var(--font-sans)");
  const [weight, setWeight] = useState("700");
  const [img, setImg] = useState("");
  const [pad, setPad] = useState(10);
  const canvas = useRef<HTMLCanvasElement>(null);
  const toast = useToast();

  const draw = (size: number, target?: HTMLCanvasElement) => {
    const c = target ?? document.createElement("canvas"); c.width = size; c.height = size;
    const ctx = c.getContext("2d")!; ctx.clearRect(0, 0, size, size);
    const r = (radius / 100) * size / 2;
    ctx.beginPath(); ctx.roundRect(0, 0, size, size, r); ctx.fillStyle = bg; ctx.fill();
    return new Promise<HTMLCanvasElement>((res) => {
      if (mode === "image" && img) { const i = new Image(); i.onload = () => { ctx.save(); ctx.beginPath(); ctx.roundRect(0, 0, size, size, r); ctx.clip(); const p = (pad / 100) * size; const s = size - p * 2; const ratio = Math.min(s / i.width, s / i.height); const w = i.width * ratio, h = i.height * ratio; ctx.drawImage(i, (size - w) / 2, (size - h) / 2, w, h); ctx.restore(); res(c); }; i.src = img; }
      else { ctx.fillStyle = fg; ctx.textAlign = "center"; ctx.textBaseline = "middle"; const t = text.slice(0, 3) || "A"; const fam = font.startsWith("var(") ? getComputedStyle(document.body).fontFamily : font; ctx.font = `${weight} ${size * (t.length === 1 ? 0.62 : t.length === 2 ? 0.5 : 0.38)}px ${fam}`; ctx.fillText(t, size / 2, size / 2 + size * 0.03); res(c); }
    });
  };
  useEffect(() => { if (canvas.current) draw(256, canvas.current); });

  const dl = async (size: number) => { const c = await draw(size); downloadDataUrl(c.toDataURL("image/png"), `icon-${size}x${size}.png`); };
  const bundle = async () => {
    const { default: JSZip } = await import("jszip"); const zip = new JSZip();
    for (const s of SIZES) { const c = await draw(s); const blob: Blob = await new Promise((r) => c.toBlob((b) => r(b!), "image/png")); zip.file(s === 180 ? "apple-touch-icon.png" : s === 192 ? "android-chrome-192x192.png" : s === 512 ? "android-chrome-512x512.png" : `favicon-${s}x${s}.png`, blob); }
    // ICO with 16/32/48
    const icoParts: Uint8Array[] = []; const ents: Array<{ w: number; data: Uint8Array }> = [];
    for (const s of [16, 32, 48]) { const c = await draw(s); const blob: Blob = await new Promise((r) => c.toBlob((b) => r(b!), "image/png")); ents.push({ w: s, data: new Uint8Array(await blob.arrayBuffer()) }); }
    const header = new Uint8Array(6 + 16 * ents.length); const dv = new DataView(header.buffer); dv.setUint16(0, 0, true); dv.setUint16(2, 1, true); dv.setUint16(4, ents.length, true);
    let off = header.length; ents.forEach((e, i) => { const o = 6 + i * 16; header[o] = e.w === 256 ? 0 : e.w; header[o + 1] = e.w === 256 ? 0 : e.w; header[o + 2] = 0; header[o + 3] = 0; dv.setUint16(o + 4, 1, true); dv.setUint16(o + 6, 32, true); dv.setUint32(o + 8, e.data.length, true); dv.setUint32(o + 12, off, true); off += e.data.length; });
    icoParts.push(header, ...ents.map((e) => e.data)); zip.file("favicon.ico", new Blob(icoParts as BlobPart[]));
    zip.file("site.webmanifest", JSON.stringify({ name: text, short_name: text, icons: [{ src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" }, { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }], theme_color: bg, background_color: "#ffffff", display: "standalone" }, null, 2));
    zip.file("README.txt", "Copy all files to your site root and add the tags from the snippet to <head>.");
    downloadBlob(await zip.generateAsync({ type: "blob" }), "favicon-bundle.zip"); toast("Bundle downloaded");
  };
  const snippet = `<link rel="icon" href="/favicon.ico" sizes="48x48">\n<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">\n<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">\n<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">\n<link rel="manifest" href="/site.webmanifest">\n<meta name="theme-color" content="${bg}">`;

  return (
    <div className="grid gap-5 lg:grid-cols-12 items-start">
      <Card className="lg:col-span-5 min-w-0">
        <CardHeader title="Design" />
        <CardBody className="grid gap-6">
          <Segmented value={mode} onChange={setMode} options={[{ value: "text", label: "Initials" }, { value: "image", label: "From logo" }]} size="sm" />
          <FieldGroup title="Icon">
            {mode === "text" ? <><Input label="Letters (1–3)" value={text} onChange={(e) => setText(e.target.value.slice(0, 3))} maxLength={3} /><div className="grid grid-cols-2 gap-4"><Select label="Font" value={font} onChange={(e) => setFont(e.target.value)} options={[{ value: "var(--font-sans)", label: "Sans (Uncut Sans)" }, { value: "'Instrument Serif', Georgia, serif", label: "Serif" }, { value: "ui-monospace, Menlo, monospace", label: "Mono" }]} /><Select label="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} options={[{ value: "400", label: "Regular" }, { value: "600", label: "Semibold" }, { value: "700", label: "Bold" }, { value: "900", label: "Black" }]} /></div></> : <><LogoUpload value={img} onChange={setImg} label="Logo image" hint="PNG with transparency works best" /><Range label="Padding" value={pad} onChange={setPad} min={0} max={30} step={1} format={(v) => `${v}%`} /></>}
            <div className="grid grid-cols-2 gap-4"><ColorField label="Background" value={bg} onChange={setBg} />{mode === "text" ? <ColorField label="Text" value={fg} onChange={setFg} /> : null}</div>
            <Range label="Corner radius" value={radius} onChange={setRadius} min={0} max={100} step={2} format={(v) => `${v}%`} />
          </FieldGroup>
        </CardBody>
      </Card>
      <div className="grid gap-5 lg:col-span-7 min-w-0 lg:sticky lg:top-24">
        <Card>
          <CardHeader title="Preview & export" action={<Button size="sm" onClick={bundle}><Package className="h-3.5 w-3.5" /> Download bundle (.zip)</Button>} />
          <CardBody className="grid gap-5">
            <div className="flex flex-wrap items-end gap-6">
              <canvas ref={canvas} width={256} height={256} className="h-32 w-32 rounded-2xl shadow-md" aria-label="Icon preview" />
              <div className="flex items-end gap-4">{[64, 32, 16].map((s) => <div key={s} className="text-center"><canvas ref={(el) => { if (el) draw(s, el); }} width={s} height={s} style={{ width: s, height: s }} className="rounded" /><div className="mt-1 text-[10px] text-muted">{s}px</div></div>)}</div>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs text-muted"><canvas ref={(el) => { if (el) draw(16, el); }} width={16} height={16} style={{ width: 16, height: 16 }} /> {text || "Your site"} — browser tab</div>
            </div>
            <div className="flex flex-wrap gap-2">{SIZES.map((s) => <Button key={s} size="sm" variant="secondary" onClick={() => dl(s)}><Download className="h-3.5 w-3.5" /> {s}px</Button>)}</div>
          </CardBody>
        </Card>
        <CodeBlock value={snippet} label="Add to <head>" filename="favicon-tags.html" mime="text/html" wrap />
      </div>
    </div>
  );
}
