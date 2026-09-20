"use client";
import { useMemo, useState } from "react";
import { Search, Copy, Check } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Segmented, Select } from "@/components/ui/Field";
import { HSN } from "@/data/hsn";
import { copyText } from "@/lib/export";
import { useToast } from "@/components/ui/Toast";
import { Empty } from "@/components/ui/Empty";

export default function HsnFinder() {
  const [q, setQ] = useState("");
  const [kind, setKind] = useState<"all" | "HSN" | "SAC">("all");
  const [rate, setRate] = useState("all");
  const [copied, setCopied] = useState("");
  const toast = useToast();
  const cats = useMemo(() => Array.from(new Set(HSN.map((h) => h.cat))), []);
  const [cat, setCat] = useState("all");
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return HSN.filter((h) => (kind === "all" || h.kind === kind) && (cat === "all" || h.cat === cat) && (rate === "all" || String(h.rate) === rate) && (!s || h.code.includes(s) || h.desc.toLowerCase().includes(s) || h.cat.toLowerCase().includes(s))).slice(0, 120);
  }, [q, kind, cat, rate]);
  const copy = async (c: string) => { await copyText(c); setCopied(c); toast(`${c} copied`); setTimeout(() => setCopied(""), 1200); };
  const rateTone = (r: number | string) => (r === 0 ? "bg-accent-soft text-accent-text" : r === 40 ? "bg-danger-soft text-danger" : r === 18 ? "bg-warn-soft text-warn" : "bg-info-soft text-info");

  return (
    <div className="grid gap-5">
      <Card>
        <CardBody className="grid gap-4">
          <div className="relative"><Search className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by product, service or code — e.g. ‘rice’, ‘salon’, ‘8471’, ‘cement’" className="h-13 w-full rounded-2xl border border-border bg-surface pl-12 pr-4 text-[15px] text-ink shadow-sm placeholder:text-muted hover:border-border-strong focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10 transition" aria-label="Search HSN/SAC" autoFocus /></div>
          <div className="grid gap-3 sm:grid-cols-3">
            <Segmented value={kind} onChange={setKind} options={[{ value: "all", label: "All" }, { value: "HSN", label: "Goods" }, { value: "SAC", label: "Services" }]} size="sm" />
            <Select aria-label="Category" value={cat} onChange={(e) => setCat(e.target.value)} options={[{ value: "all", label: "All categories" }, ...cats.map((c) => ({ value: c, label: c }))]} />
            <Select aria-label="Rate" value={rate} onChange={(e) => setRate(e.target.value)} options={[{ value: "all", label: "Any GST rate" }, { value: "0", label: "0% / exempt" }, { value: "1.5", label: "1.5%" }, { value: "3", label: "3%" }, { value: "5", label: "5%" }, { value: "18", label: "18%" }, { value: "40", label: "40%" }]} />
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title={`${list.length} result${list.length === 1 ? "" : "s"}`} description="Rates as per the GST 2.0 structure effective 22 September 2025 (5% · 18% · 40%). Tap a code to copy." />
        <CardBody className="p-0">
          {list.length === 0 ? <Empty icon={<Search className="h-5 w-5" />} title="No match" hint="Try a broader word like ‘oil’, ‘fabric’ or ‘transport’." /> : (
            <ul className="divide-y divide-border">
              {list.map((h, i) => (
                <li key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-surface-2/60">
                  <button type="button" onClick={() => copy(h.code)} className="inline-flex h-9 min-w-[76px] items-center justify-center gap-1.5 rounded-lg border border-border bg-surface font-mono text-[13px] font-semibold text-ink hover:border-border-strong cursor-pointer">{h.code}{copied === h.code ? <Check className="h-3 w-3 text-accent-text" /> : <Copy className="h-3 w-3 text-faint" />}</button>
                  <div className="min-w-0 flex-1"><div className="text-sm font-medium text-ink">{h.desc}</div><div className="text-xs text-muted">{h.kind} · {h.cat}{h.note ? ` · ${h.note}` : ""}</div></div>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold tabular ${rateTone(h.rate)}`}>{typeof h.rate === "number" ? `${h.rate}%` : h.rate}</span>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>
      <p className="text-xs leading-relaxed text-muted">Businesses with turnover up to ₹5 crore may use 4-digit HSN on B2B invoices (optional on B2C); above ₹5 crore, 6 digits are mandatory. This list covers common items; consult the CBIC rate schedule or a CA for classification disputes.</p>
    </div>
  );
}
