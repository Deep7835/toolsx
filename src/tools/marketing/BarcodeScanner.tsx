"use client";
import { useState } from "react";
import { Copy, ExternalLink, Trash2, Search, IndianRupee } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Scanner } from "@/components/shell/Scanner";
import { copyText } from "@/lib/export";
import { useToast } from "@/components/ui/Toast";
import { Empty } from "@/components/ui/Empty";

interface Hit { id: number; text: string; format?: string; at: string }

function parse(text: string) {
  if (text.startsWith("upi://pay")) { const q = new URLSearchParams(text.slice(text.indexOf("?") + 1)); return { kind: "UPI payment", rows: [["Payee VPA", q.get("pa")], ["Name", q.get("pn")], ["Amount", q.get("am") ? `₹${q.get("am")}` : "Open amount"], ["Note", q.get("tn")]].filter((r) => r[1]) as string[][] }; }
  if (/^https?:\/\//i.test(text)) return { kind: "Link", rows: [["URL", text]] };
  if (text.startsWith("WIFI:")) { const g = (k: string) => text.match(new RegExp(`${k}:([^;]*)`))?.[1]; return { kind: "WiFi", rows: [["Network", g("S")], ["Security", g("T")], ["Password", g("P")]].filter((r) => r[1]) as string[][] }; }
  if (text.startsWith("BEGIN:VCARD")) { const g = (k: string) => text.match(new RegExp(`^${k}[^:]*:(.*)$`, "m"))?.[1]; return { kind: "Contact (vCard)", rows: [["Name", g("FN")], ["Org", g("ORG")], ["Phone", g("TEL")], ["Email", g("EMAIL")]].filter((r) => r[1]) as string[][] }; }
  if (/^\d{8}$|^\d{12,14}$/.test(text)) return { kind: text.startsWith("890") ? "Indian retail product (GS1 890)" : "Product barcode", rows: [["GTIN / EAN", text]] };
  return { kind: "Text", rows: [["Content", text]] };
}

export default function BarcodeScanner() {
  const [hits, setHits] = useState<Hit[]>([]);
  const toast = useToast();
  const add = (text: string, format?: string) => setHits((h) => (h[0]?.text === text ? h : [{ id: Date.now(), text, format, at: new Date().toLocaleTimeString("en-IN") }, ...h].slice(0, 20)));
  return (
    <div className="grid gap-5 lg:grid-cols-12 items-start">
      <Card className="lg:col-span-6 min-w-0">
        <CardHeader title="Scanner" description="Reads QR codes, EAN/UPC product barcodes, Code 128/39 and more. Camera frames never leave your device." />
        <CardBody><Scanner onResult={add} /></CardBody>
      </Card>
      <Card className="lg:col-span-6 min-w-0">
        <CardHeader title="Results" description={hits.length ? `${hits.length} scanned` : undefined} action={hits.length ? <Button size="sm" variant="ghost" onClick={() => setHits([])}><Trash2 className="h-3.5 w-3.5" /> Clear</Button> : null} />
        <CardBody className="grid gap-3">
          {hits.length === 0 ? <Empty icon={<Search className="h-5 w-5" />} title="Nothing scanned yet" hint="Point the camera at a code or upload a photo of one." /> : null}
          {hits.map((h) => { const p = parse(h.text); const isUpi = p.kind === "UPI payment"; const isUrl = p.kind === "Link"; return (
            <div key={h.id} className="rounded-xl border border-border bg-surface-2/50 p-3">
              <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.12em] text-muted"><span className="inline-flex items-center gap-1.5">{isUpi ? <IndianRupee className="h-3.5 w-3.5 text-accent-text" /> : null}{p.kind}{h.format ? ` · ${h.format}` : ""}</span><span>{h.at}</span></div>
              <dl className="mt-2 grid gap-1 text-sm">{p.rows.map(([k, v]) => <div key={k} className="grid grid-cols-[90px_1fr] gap-2"><dt className="text-muted">{k}</dt><dd className="break-all font-medium text-ink">{v}</dd></div>)}</dl>
              <div className="mt-2 flex gap-1.5"><Button size="sm" variant="ghost" onClick={async () => { await copyText(h.text); toast("Copied"); }}><Copy className="h-3.5 w-3.5" /> Copy</Button>{isUrl || isUpi ? <Button size="sm" variant="ghost" onClick={() => window.open(h.text, "_blank", "noopener")}><ExternalLink className="h-3.5 w-3.5" /> {isUpi ? "Pay" : "Open"}</Button> : null}{/^\d{8,14}$/.test(h.text) ? <Button size="sm" variant="ghost" onClick={() => window.open(`https://www.google.com/search?q=${h.text}`, "_blank", "noopener")}><Search className="h-3.5 w-3.5" /> Look up</Button> : null}</div>
            </div>
          ); })}
        </CardBody>
      </Card>
    </div>
  );
}
