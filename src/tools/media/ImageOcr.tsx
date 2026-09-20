"use client";
import { useState } from "react";
import { ScanText, Trash2 } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Field";
import { Dropzone, fmtBytes } from "@/components/shell/Dropzone";
import { CodeBlock } from "@/components/shell/TextOutput";
import { useToast } from "@/components/ui/Toast";

export default function ImageOcr() {
  const [file, setFile] = useState<File | null>(null);
  const [src, setSrc] = useState("");
  const [text, setText] = useState("");
  const [lang, setLang] = useState("eng");
  const [progress, setProgress] = useState("");
  const [busy, setBusy] = useState(false);
  const [conf, setConf] = useState(0);
  const toast = useToast();

  const load = (files: File[]) => { const f = files.find((x) => x.type.startsWith("image/")); if (!f) return; setFile(f); setSrc(URL.createObjectURL(f)); setText(""); };
  const run = async () => {
    if (!file) return; setBusy(true); setProgress("Loading OCR engine…");
    try {
      const { createWorker } = await import("tesseract.js");
      const worker = await createWorker(lang, 1, { logger: (m) => { if (m.status === "recognizing text") setProgress(`Reading… ${Math.round(m.progress * 100)}%`); else if (m.status?.includes("load")) setProgress("Loading language data…"); } });
      const { data } = await worker.recognize(file); await worker.terminate();
      setText(data.text.trim()); setConf(Math.round(data.confidence)); toast("Text extracted");
    } catch (e) { console.error(e); toast("OCR failed — try a clearer image", "error"); } finally { setBusy(false); setProgress(""); }
  };
  const detected = { phones: text.match(/(?:\+91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}/g) ?? [], emails: text.match(/[\w.+-]+@[\w-]+\.[\w.]+/g) ?? [], gstin: text.match(/\b\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]\b/g) ?? [], amounts: text.match(/(?:₹|Rs\.?|INR)\s?[\d,]+(?:\.\d{1,2})?/g) ?? [] };

  return (
    <div className="grid gap-5 lg:grid-cols-12 items-start">
      <Card className="lg:col-span-5 min-w-0">
        <CardHeader title="Image" description="Receipts, bills, business cards, printed forms. Runs on-device with Tesseract." icon={<ScanText className="h-4 w-4" strokeWidth={2} />} />
        <CardBody className="grid gap-4">
          <Dropzone accept="image/*" onFiles={load} hint="Clear, well-lit, straight photos work best" />
          <Select label="Language" value={lang} onChange={(e) => setLang(e.target.value)} options={[{ value: "eng", label: "English" }, { value: "hin", label: "Hindi (Devanagari)" }, { value: "eng+hin", label: "English + Hindi" }, { value: "mar", label: "Marathi" }, { value: "guj", label: "Gujarati" }, { value: "tam", label: "Tamil" }, { value: "tel", label: "Telugu" }, { value: "kan", label: "Kannada" }, { value: "ben", label: "Bengali" }]} help="Language packs download once (~10 MB each) and are cached." />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {src ? <div className="relative"><img src={src} alt="" className="w-full rounded-xl border border-border object-contain max-h-72" /><button type="button" onClick={() => { setFile(null); setSrc(""); setText(""); }} className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-surface/90 text-muted hover:text-danger cursor-pointer" aria-label="Remove"><Trash2 className="h-4 w-4" /></button></div> : null}
          {file ? <div className="text-xs text-muted">{file.name} · {fmtBytes(file.size)}</div> : null}
          <Button onClick={run} loading={busy} disabled={!file}><ScanText className="h-4 w-4" /> Extract text</Button>
          {progress ? <p className="text-xs text-muted" aria-live="polite">{progress}</p> : null}
        </CardBody>
      </Card>
      <div className="grid gap-5 lg:col-span-7 min-w-0">
        <CodeBlock value={text} label={text ? `Extracted text · ${conf}% confidence` : "Extracted text"} filename="extracted.txt" wrap mono={false} />
        {text ? (
          <Card><CardHeader title="Detected details" description="Handy for saving contacts or entering bills." /><CardBody className="grid gap-2 text-sm sm:grid-cols-2">
            {[["Phone numbers", detected.phones], ["Emails", detected.emails], ["GSTIN", detected.gstin], ["Amounts", detected.amounts]].map(([k, v]) => <div key={String(k)} className="rounded-xl border border-border bg-surface-2/50 p-3"><div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">{k}</div><div className="mt-1 break-all text-ink">{(v as string[]).length ? Array.from(new Set(v as string[])).join(", ") : <span className="text-faint">none</span>}</div></div>)}
          </CardBody></Card>
        ) : null}
      </div>
    </div>
  );
}
