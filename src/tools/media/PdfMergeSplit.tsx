"use client";
import { useState } from "react";
import { ArrowUp, ArrowDown, Trash2, FileText, Scissors, Combine } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input, Segmented, Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Dropzone, fmtBytes } from "@/components/shell/Dropzone";
import { downloadBlob } from "@/lib/export";
import { useToast } from "@/components/ui/Toast";
import { uid } from "@/lib/format";

interface Doc { id: string; file: File; pages: number }

function parseRanges(s: string, max: number) {
  const out: number[][] = [];
  for (const part of s.split(",").map((x) => x.trim()).filter(Boolean)) {
    const m = part.match(/^(\d+)(?:\s*-\s*(\d+))?$/); if (!m) continue;
    const a = Math.max(1, parseInt(m[1])), b = Math.min(max, m[2] ? parseInt(m[2]) : a);
    if (a <= b) out.push(Array.from({ length: b - a + 1 }, (_, i) => a + i - 1));
  }
  return out;
}

export default function PdfMergeSplit() {
  const [mode, setMode] = useState<"merge" | "split">("merge");
  const [docs, setDocs] = useState<Doc[]>([]);
  const [ranges, setRanges] = useState("1-2, 3");
  const [splitMode, setSplitMode] = useState<"ranges" | "each" | "extract">("ranges");
  const [busy, setBusy] = useState(false);
  const toast = useToast();

  const add = async (files: File[]) => {
    const { PDFDocument } = await import("pdf-lib");
    for (const f of files.filter((x) => x.type === "application/pdf" || x.name.endsWith(".pdf"))) {
      try { const pdf = await PDFDocument.load(await f.arrayBuffer(), { ignoreEncryption: true }); setDocs((d) => [...d, { id: uid(), file: f, pages: pdf.getPageCount() }]); } catch { toast(`Could not read ${f.name}`, "error"); }
    }
  };
  const move = (i: number, d: -1 | 1) => { const n = [...docs]; const j = i + d; if (j < 0 || j >= n.length) return; [n[i], n[j]] = [n[j], n[i]]; setDocs(n); };

  const merge = async () => {
    setBusy(true);
    try {
      const { PDFDocument } = await import("pdf-lib"); const out = await PDFDocument.create();
      for (const d of docs) { const src = await PDFDocument.load(await d.file.arrayBuffer(), { ignoreEncryption: true }); const pages = await out.copyPages(src, src.getPageIndices()); pages.forEach((p) => out.addPage(p)); }
      const bytes = await out.save(); downloadBlob(new Blob([bytes as BlobPart], { type: "application/pdf" }), "merged.pdf"); toast("Merged PDF downloaded");
    } catch { toast("Merge failed", "error"); } finally { setBusy(false); }
  };
  const split = async () => {
    const d = docs[0]; if (!d) return; setBusy(true);
    try {
      const { PDFDocument } = await import("pdf-lib"); const src = await PDFDocument.load(await d.file.arrayBuffer(), { ignoreEncryption: true });
      const groups = splitMode === "each" ? src.getPageIndices().map((i) => [i]) : splitMode === "extract" ? [parseRanges(ranges, d.pages).flat()] : parseRanges(ranges, d.pages);
      if (!groups.length || !groups[0].length) { toast("Enter valid page ranges", "error"); return; }
      const base = d.file.name.replace(/\.pdf$/i, "");
      if (groups.length === 1) { const out = await PDFDocument.create(); const pages = await out.copyPages(src, groups[0]); pages.forEach((p) => out.addPage(p)); downloadBlob(new Blob([(await out.save()) as BlobPart], { type: "application/pdf" }), `${base}-pages.pdf`); }
      else { const { default: JSZip } = await import("jszip"); const zip = new JSZip(); for (let g = 0; g < groups.length; g++) { const out = await PDFDocument.create(); const pages = await out.copyPages(src, groups[g]); pages.forEach((p) => out.addPage(p)); zip.file(`${base}-part${g + 1}.pdf`, await out.save()); } downloadBlob(await zip.generateAsync({ type: "blob" }), `${base}-split.zip`); }
      toast("Split complete");
    } catch { toast("Split failed", "error"); } finally { setBusy(false); }
  };

  return (
    <div className="grid gap-5 lg:grid-cols-12 items-start">
      <Card className="lg:col-span-5 min-w-0">
        <CardHeader title={mode === "merge" ? "Merge PDFs" : "Split a PDF"} description="Processed with pdf-lib in your browser. Files are never uploaded." icon={mode === "merge" ? <Combine className="h-4 w-4" strokeWidth={2} /> : <Scissors className="h-4 w-4" strokeWidth={2} />} />
        <CardBody className="grid gap-5">
          <Segmented value={mode} onChange={(m) => { setMode(m); setDocs([]); }} options={[{ value: "merge", label: "Merge" }, { value: "split", label: "Split / extract" }]} size="sm" />
          <Dropzone accept="application/pdf,.pdf" multiple={mode === "merge"} onFiles={(f) => (mode === "split" ? setDocs([]) : null) ?? add(mode === "split" ? f.slice(0, 1) : f)} hint={mode === "merge" ? "Add 2 or more PDFs, then reorder" : "Add one PDF"} />
          {mode === "split" && docs[0] ? (
            <>
              <Select label="How to split" value={splitMode} onChange={(e) => setSplitMode(e.target.value as typeof splitMode)} options={[{ value: "ranges", label: "Custom ranges → separate files" }, { value: "extract", label: "Extract pages → one file" }, { value: "each", label: "Every page → separate files" }]} />
              {splitMode !== "each" ? <Input label="Pages" value={ranges} onChange={(e) => setRanges(e.target.value)} help={`e.g. 1-3, 5, 8-10 · document has ${docs[0].pages} pages`} className="font-mono" /> : null}
            </>
          ) : null}
          {mode === "merge" ? <Button onClick={merge} loading={busy} disabled={docs.length < 2}><Combine className="h-4 w-4" /> Merge {docs.length} files</Button> : <Button onClick={split} loading={busy} disabled={!docs.length}><Scissors className="h-4 w-4" /> Split</Button>}
        </CardBody>
      </Card>
      <Card className="lg:col-span-7 min-w-0">
        <CardHeader title="Files" description={docs.length ? `${docs.length} file${docs.length > 1 ? "s" : ""} · ${docs.reduce((a, d) => a + d.pages, 0)} pages` : undefined} />
        <CardBody>
          {docs.length === 0 ? <p className="py-8 text-center text-sm text-muted">No files yet.</p> : (
            <ul className="grid gap-2">
              {docs.map((d, i) => (
                <li key={d.id} className="flex items-center gap-3 rounded-xl border border-border bg-surface-2/50 px-3 py-2.5">
                  <FileText className="h-5 w-5 shrink-0 text-danger" />
                  <div className="min-w-0 flex-1"><div className="truncate text-sm font-medium text-ink">{d.file.name}</div><div className="text-xs text-muted">{d.pages} page{d.pages !== 1 ? "s" : ""} · {fmtBytes(d.file.size)}</div></div>
                  {mode === "merge" ? <><button type="button" aria-label="Move up" onClick={() => move(i, -1)} className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-surface-3 cursor-pointer"><ArrowUp className="h-4 w-4" /></button><button type="button" aria-label="Move down" onClick={() => move(i, 1)} className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-surface-3 cursor-pointer"><ArrowDown className="h-4 w-4" /></button></> : null}
                  <button type="button" aria-label="Remove" onClick={() => setDocs(docs.filter((x) => x.id !== d.id))} className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-danger-soft hover:text-danger cursor-pointer"><Trash2 className="h-4 w-4" /></button>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
