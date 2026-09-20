"use client";
import { useEffect, useRef, useState } from "react";
import { Eraser, Download, Undo2 } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { FieldGroup, Input, Range, Segmented, Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { downloadDataUrl } from "@/lib/export";
import { useToast } from "@/components/ui/Toast";

const FONTS = [
  { name: "Dancing Script", css: "'Dancing Script', cursive" },
  { name: "Great Vibes", css: "'Great Vibes', cursive" },
  { name: "Sacramento", css: "'Sacramento', cursive" },
  { name: "Caveat", css: "'Caveat', cursive" },
  { name: "Homemade Apple", css: "'Homemade Apple', cursive" },
  { name: "Pacifico", css: "'Pacifico', cursive" },
];
const COLORS = [{ v: "#0b1220", l: "Ink" }, { v: "#1e3a8a", l: "Blue" }, { v: "#1d4ed8", l: "Royal blue" }, { v: "#047857", l: "Green" }, { v: "#7f1d1d", l: "Maroon" }];

export default function DigitalSignature() {
  const [mode, setMode] = useState<"draw" | "type">("draw");
  const [color, setColor] = useState(COLORS[0].v);
  const [width, setWidth] = useState(2.5);
  const [text, setText] = useState("Ananya Krishnan");
  const [font, setFont] = useState(FONTS[0].css);
  const [fontSize, setFontSize] = useState(64);
  const canvas = useRef<HTMLCanvasElement>(null);
  const strokes = useRef<Array<Array<[number, number, number]>>>([]);
  const current = useRef<Array<[number, number, number]> | null>(null);
  const toast = useToast();

  // load handwriting fonts once
  useEffect(() => {
    if (document.getElementById("ibt-sig-fonts")) return;
    const l = document.createElement("link");
    l.id = "ibt-sig-fonts"; l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&family=Great+Vibes&family=Sacramento&family=Caveat:wght@600&family=Homemade+Apple&family=Pacifico&display=swap";
    document.head.appendChild(l);
  }, []);

  const redraw = () => {
    const c = canvas.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.strokeStyle = color;
    for (const s of strokes.current) {
      for (let i = 1; i < s.length; i++) {
        const [x0, y0] = s[i - 1], [x1, y1, p] = s[i];
        ctx.lineWidth = width * (0.6 + p);
        ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
      }
    }
  };
  useEffect(redraw, [color, width]);

  const pos = (e: React.PointerEvent) => { const r = canvas.current!.getBoundingClientRect(); const sx = canvas.current!.width / r.width; return [(e.clientX - r.left) * sx, (e.clientY - r.top) * sx, e.pressure || 0.5] as [number, number, number]; };
  const down = (e: React.PointerEvent) => { canvas.current!.setPointerCapture(e.pointerId); current.current = [pos(e)]; strokes.current.push(current.current); };
  const move = (e: React.PointerEvent) => { if (!current.current) return; current.current.push(pos(e)); redraw(); };
  const up = () => { current.current = null; };
  const clear = () => { strokes.current = []; redraw(); };
  const undo = () => { strokes.current.pop(); redraw(); };

  const exportPng = () => {
    let src: HTMLCanvasElement;
    if (mode === "draw") {
      src = canvas.current!;
      if (strokes.current.length === 0) { toast("Draw your signature first", "info"); return; }
    } else {
      src = document.createElement("canvas"); src.width = 1200; src.height = 400;
      const ctx = src.getContext("2d")!;
      ctx.font = `${fontSize * 2.4}px ${font}`; ctx.fillStyle = color; ctx.textBaseline = "middle"; ctx.textAlign = "center";
      ctx.fillText(text, 600, 200);
    }
    // crop to content
    const ctx = src.getContext("2d")!; const { width: w, height: h } = src;
    const d = ctx.getImageData(0, 0, w, h).data;
    let minX = w, minY = h, maxX = 0, maxY = 0;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (d[(y * w + x) * 4 + 3] > 10) { if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; }
    if (maxX <= minX) { toast("Nothing to export", "info"); return; }
    const pad = 24; const out = document.createElement("canvas");
    out.width = maxX - minX + pad * 2; out.height = maxY - minY + pad * 2;
    out.getContext("2d")!.drawImage(src, minX - pad, minY - pad, out.width, out.height, 0, 0, out.width, out.height);
    downloadDataUrl(out.toDataURL("image/png"), "signature.png");
    toast("Transparent PNG downloaded");
  };

  return (
    <div className="grid gap-5 lg:grid-cols-12 items-start">
      <Card className="lg:col-span-4 min-w-0">
        <CardHeader title="Signature style" />
        <CardBody className="grid gap-5">
          <Segmented value={mode} onChange={setMode} options={[{ value: "draw", label: "Draw" }, { value: "type", label: "Type" }]} />
          <FieldGroup title="Ink">
            <div className="flex flex-wrap gap-2">
              {COLORS.map((c) => <button key={c.v} type="button" aria-label={c.l} aria-pressed={color === c.v} onClick={() => setColor(c.v)} className={`h-9 w-9 rounded-full border-2 transition-transform ${color === c.v ? "scale-110 border-ink" : "border-transparent"} cursor-pointer`} style={{ background: c.v }} />)}
            </div>
            {mode === "draw" ? <Range label="Pen thickness" value={width} onChange={setWidth} min={1} max={6} step={0.5} format={(v) => `${v}px`} /> : null}
          </FieldGroup>
          {mode === "type" ? (
            <FieldGroup title="Text">
              <Input label="Your name" value={text} onChange={(e) => setText(e.target.value)} />
              <Select label="Handwriting style" value={font} onChange={(e) => setFont(e.target.value)} options={FONTS.map((f) => ({ value: f.css, label: f.name }))} />
              <Range label="Size" value={fontSize} onChange={setFontSize} min={32} max={110} step={2} format={(v) => `${v}px`} />
            </FieldGroup>
          ) : null}
          <p className="text-xs leading-relaxed text-muted">Exports a transparent PNG you can place on invoices, letters and PDFs. Nothing is uploaded. A drawn or typed signature is not a legally certified DSC — use a licensed provider for e-filing.</p>
        </CardBody>
      </Card>
      <Card className="lg:col-span-8 min-w-0">
        <CardHeader title={mode === "draw" ? "Sign here" : "Preview"} description={mode === "draw" ? "Use a mouse, trackpad, stylus or finger." : "Pick a style that feels like your hand."} action={<div className="flex gap-1.5">{mode === "draw" ? <><Button size="sm" variant="ghost" onClick={undo}><Undo2 className="h-3.5 w-3.5" /> Undo</Button><Button size="sm" variant="ghost" onClick={clear}><Eraser className="h-3.5 w-3.5" /> Clear</Button></> : null}<Button size="sm" onClick={exportPng}><Download className="h-3.5 w-3.5" /> PNG</Button></div>} />
        <CardBody>
          <div className="relative overflow-hidden rounded-xl border border-dashed border-border-strong bg-white" style={{ backgroundImage: "linear-gradient(#e7e5e4 1px, transparent 1px)", backgroundSize: "100% 40px", backgroundPosition: "0 20px" }}>
            {mode === "draw" ? (
              <canvas ref={canvas} width={1200} height={400} className="block h-auto w-full touch-none cursor-crosshair" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up} aria-label="Signature pad" />
            ) : (
              <div className="flex h-[300px] items-center justify-center px-6 text-center" style={{ fontFamily: font, fontSize, color, lineHeight: 1 }}>{text || "Your name"}</div>
            )}
            <div className="pointer-events-none absolute inset-x-8 bottom-10 border-t border-[#a8a29e]" />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
