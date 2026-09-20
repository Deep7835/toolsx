"use client";
import { useRef, useState } from "react";
import { Download, Wand2 } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { FieldGroup, Input, NumberInput, Range, Select, Toggle } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Barcode, ean13Check, isValidBarcode, type BarcodeFormat } from "@/components/shell/Barcode";
import { DocumentShell } from "@/components/shell/DocumentShell";
import { PAPER } from "@/components/shell/PaperPreview";
import { downloadDataUrl, downloadText } from "@/lib/export";
import { useToast } from "@/components/ui/Toast";
import { useBusiness } from "../shared/Business";

const FORMATS: Array<{ v: BarcodeFormat; l: string; help: string }> = [
  { v: "CODE128", l: "Code 128 — any text / SKU", help: "Letters, numbers and symbols. Best general-purpose retail code." },
  { v: "EAN13", l: "EAN-13 — retail products (GS1 India 890…)", help: "13 digits; the last is a check digit (auto-calculated from 12)." },
  { v: "EAN8", l: "EAN-8 — small packs", help: "8 digits including check digit." },
  { v: "UPC", l: "UPC-A — US retail", help: "12 digits." },
  { v: "CODE39", l: "Code 39 — inventory / asset tags", help: "Uppercase letters, digits, - . $ / + % space." },
  { v: "ITF14", l: "ITF-14 — cartons / outer cases", help: "14 digits." },
];

export default function BarcodeGenerator() {
  const { business } = useBusiness();
  const [format, setFormat] = useState<BarcodeFormat>("CODE128");
  const [value, setValue] = useState("SKU-2026-0001");
  const [label, setLabel] = useState("Basmati Rice 5 kg");
  const [price, setPrice] = useState(0);
  const [height, setHeight] = useState(60);
  const [width, setWidth] = useState(2);
  const [showText, setShowText] = useState(true);
  const [copies, setCopies] = useState(12);
  const [mode, setMode] = useState<"single" | "sheet">("single");
  const svgWrap = useRef<HTMLDivElement>(null);
  const toast = useToast();
  const valid = value ? isValidBarcode(value, format) : false;

  const autoEan = () => { const body = value.replace(/\D/g, "").slice(0, 12).padEnd(12, "0"); setValue(ean13Check(body)); setFormat("EAN13"); toast("Check digit added"); };
  const dlSvg = () => { const svg = svgWrap.current?.querySelector("svg"); if (!svg) return; downloadText(new XMLSerializer().serializeToString(svg), `barcode-${value}.svg`, "image/svg+xml"); };
  const dlPng = () => { const svg = svgWrap.current?.querySelector("svg"); if (!svg) return; const xml = new XMLSerializer().serializeToString(svg); const img = new Image(); img.onload = () => { const c = document.createElement("canvas"); c.width = img.width * 3; c.height = img.height * 3; const ctx = c.getContext("2d")!; ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, c.width, c.height); ctx.scale(3, 3); ctx.drawImage(img, 0, 0); downloadDataUrl(c.toDataURL("image/png"), `barcode-${value}.png`); }; img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(xml))); };

  const form = (
    <>
      <FieldGroup title="Barcode">
        <Select label="Format" value={format} onChange={(e) => setFormat(e.target.value as BarcodeFormat)} options={FORMATS.map((f) => ({ value: f.v, label: f.l }))} help={FORMATS.find((f) => f.v === format)?.help} />
        <Input label="Value" value={value} onChange={(e) => setValue(e.target.value)} error={value && !valid ? `Not a valid ${format} value` : undefined} className="font-mono" />
        {format === "EAN13" || /^\d{12}$/.test(value) ? <Button size="sm" variant="secondary" className="justify-self-start" onClick={autoEan}><Wand2 className="h-3.5 w-3.5" /> Compute EAN-13 check digit</Button> : null}
        <Toggle checked={showText} onChange={setShowText} label="Print value under bars" />
        <Range label="Bar height" value={height} onChange={setHeight} min={30} max={120} step={5} format={(v) => `${v}px`} />
        <Range label="Bar width" value={width} onChange={setWidth} min={1} max={4} step={0.5} format={(v) => `${v}px`} />
      </FieldGroup>
      <FieldGroup title="Label">
        <Input label="Product name" value={label} onChange={(e) => setLabel(e.target.value)} />
        <NumberInput label="Price on label" hint="optional" prefix="₹" value={price} onChange={setPrice} />
        <NumberInput label="Labels per sheet" value={copies} onChange={setCopies} max={80} />
      </FieldGroup>
    </>
  );

  const single = (
    <Card className="lg:sticky lg:top-24 min-w-0">
      <CardHeader title="Barcode" description={valid ? "Scannable · vector" : "Enter a valid value"} action={<Button size="sm" variant="ghost" onClick={() => setMode("sheet")}>Label sheet →</Button>} />
      <CardBody className="flex flex-col items-center gap-4">
        <div ref={svgWrap} className="rounded-2xl border border-border bg-white p-6">{valid ? <Barcode value={value} format={format} height={height} width={width} displayValue={showText} fontSize={14} /> : <div className="text-sm text-muted">—</div>}</div>
        <div className="flex gap-2"><Button onClick={dlPng} disabled={!valid}><Download className="h-4 w-4" /> PNG</Button><Button variant="secondary" onClick={dlSvg} disabled={!valid}>SVG</Button></div>
      </CardBody>
    </Card>
  );

  const sheet = (
    <div className="p-10 flex flex-wrap gap-3 content-start" style={{ minHeight: 1123 }}>
      {Array.from({ length: Math.min(80, Math.max(1, copies)) }).map((_, i) => (
        <div key={i} style={{ width: 226 }} className="flex flex-col items-center rounded-md border border-dashed border-[#a8a29e] p-2 text-center">
          <div className="truncate w-full text-[8.5px] font-semibold uppercase tracking-[0.12em] text-[#78716c]">{business.name}</div>
          <div className="mt-0.5 line-clamp-1 text-[11px] font-semibold">{label}</div>
          {valid ? <Barcode value={value} format={format} height={Math.min(50, height)} width={Math.min(1.4, width)} displayValue={showText} fontSize={10} margin={2} /> : null}
          {price ? <div className="text-[13px] font-bold tabular">₹{price.toLocaleString("en-IN")}</div> : null}
        </div>
      ))}
    </div>
  );

  if (mode === "sheet") return <div className="grid gap-4"><Button size="sm" variant="ghost" className="justify-self-start" onClick={() => setMode("single")}>← Single barcode</Button><DocumentShell form={form} preview={sheet} paperWidth={PAPER.a4} filename={`barcode-labels-${value}`} formTitle="Barcode & label" previewDescription="A4 label sheet · cut along dashed lines" /></div>;
  return (
    <div className="grid gap-5 lg:grid-cols-12 items-start">
      <Card className="lg:col-span-6 min-w-0"><CardHeader title="Barcode & label" /><CardBody className="grid gap-6">{form}</CardBody></Card>
      <div className="lg:col-span-6 min-w-0">{single}</div>
    </div>
  );
}
