"use client";
import { useState } from "react";
import { Download, Trash2, Sparkles } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Field";
import { ColorField } from "@/components/shell/QrOutput";
import { Dropzone, fmtBytes } from "@/components/shell/Dropzone";
import { downloadBlob } from "@/lib/export";
import { useToast } from "@/components/ui/Toast";

export default function BackgroundRemover() {
  const [file, setFile] = useState<File | null>(null);
  const [src, setSrc] = useState("");
  const [out, setOut] = useState<{ blob: Blob; url: string } | null>(null);
  const [progress, setProgress] = useState("");
  const [busy, setBusy] = useState(false);
  const [bg, setBg] = useState<"transparent" | "white" | "color">("transparent");
  const [color, setColor] = useState("#f5f5f4");
  const toast = useToast();

  const load = (files: File[]) => { const f = files.find((x) => x.type.startsWith("image/")); if (!f) return; setFile(f); setSrc(URL.createObjectURL(f)); setOut(null); };
  const run = async () => {
    if (!file) return; setBusy(true); setProgress("Loading AI model (first time ~40 MB)…");
    try {
      const { removeBackground } = await import("@imgly/background-removal");
      const blob = await removeBackground(file, { progress: (key, cur, total) => setProgress(key.startsWith("fetch") ? `Downloading model… ${Math.round((cur / Math.max(total, 1)) * 100)}%` : "Removing background…"), output: { format: "image/png", quality: 1 } });
      setOut({ blob, url: URL.createObjectURL(blob) }); toast("Background removed");
    } catch (e) { console.error(e); toast("Could not process this image. Try a smaller JPG/PNG.", "error"); } finally { setBusy(false); setProgress(""); }
  };
  const save = async () => {
    if (!out) return;
    if (bg === "transparent") { downloadBlob(out.blob, "cutout.png"); return; }
    const img = await new Promise<HTMLImageElement>((r) => { const i = new Image(); i.onload = () => r(i); i.src = out.url; });
    const c = document.createElement("canvas"); c.width = img.width; c.height = img.height; const ctx = c.getContext("2d")!; ctx.fillStyle = bg === "white" ? "#ffffff" : color; ctx.fillRect(0, 0, c.width, c.height); ctx.drawImage(img, 0, 0);
    c.toBlob((b) => b && downloadBlob(b, "cutout.jpg"), "image/jpeg", 0.92);
  };
  const checker = "repeating-conic-gradient(#e7e5e4 0% 25%, #fafaf9 0% 50%) 50% / 20px 20px";

  return (
    <div className="grid gap-5 lg:grid-cols-12 items-start">
      <Card className="lg:col-span-4 min-w-0">
        <CardHeader title="Remove background" description="On-device AI (WASM). Product shots on white sell better on marketplaces." icon={<Sparkles className="h-4 w-4" strokeWidth={2} />} />
        <CardBody className="grid gap-5">
          <Dropzone accept="image/*" onFiles={load} hint="JPG or PNG · best under 4 MB" />
          {file ? <div className="text-xs text-muted truncate">{file.name} · {fmtBytes(file.size)}</div> : null}
          <Button onClick={run} loading={busy} disabled={!file}><Sparkles className="h-4 w-4" /> {out ? "Run again" : "Remove background"}</Button>
          {progress ? <p className="text-xs text-muted" aria-live="polite">{progress}</p> : null}
          {out ? (
            <div className="grid gap-3 border-t border-border pt-4">
              <Select label="Export background" value={bg} onChange={(e) => setBg(e.target.value as typeof bg)} options={[{ value: "transparent", label: "Transparent PNG" }, { value: "white", label: "White (marketplace) JPG" }, { value: "color", label: "Custom colour JPG" }]} />
              {bg === "color" ? <ColorField label="Colour" value={color} onChange={setColor} /> : null}
              <Button variant="secondary" onClick={save}><Download className="h-4 w-4" /> Download</Button>
            </div>
          ) : null}
        </CardBody>
      </Card>
      <Card className="lg:col-span-8 min-w-0">
        <CardHeader title="Before / after" action={src ? <Button size="sm" variant="ghost" onClick={() => { setFile(null); setSrc(""); setOut(null); }}><Trash2 className="h-3.5 w-3.5" /> Clear</Button> : null} />
        <CardBody>
          {!src ? <p className="py-12 text-center text-sm text-muted">Add an image to begin.</p> : (
            <div className="grid gap-4 sm:grid-cols-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <div><div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">Original</div><img src={src} alt="Original" className="w-full rounded-xl border border-border object-contain" /></div>
              <div><div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">Result</div><div className="flex min-h-[200px] items-center justify-center rounded-xl border border-border" style={{ background: bg === "white" ? "#fff" : bg === "color" ? color : checker }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {out ? <img src={out.url} alt="Background removed" className="w-full rounded-xl object-contain" /> : <span className="text-sm text-muted">{busy ? progress || "Working…" : "Run to see the result"}</span>}</div></div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
