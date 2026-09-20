"use client";
import { useState } from "react";
import { Plus, Trash2, Copy } from "lucide-react";
import { DocumentShell } from "@/components/shell/DocumentShell";
import { PAPER } from "@/components/shell/PaperPreview";
import { FieldGroup, Input, NumberInput, Row, Select, Toggle } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Barcode } from "@/components/shell/Barcode";
import { useBusiness } from "../shared/Business";
import { inr, uid } from "@/lib/format";

interface Tag { id: string; name: string; mrp: number; price: number; batch: string; sku: string; count: number; unit: string }
const mk = (o: Partial<Tag> = {}): Tag => ({ id: uid(), name: "Basmati Rice 5 kg", mrp: 599, price: 499, batch: "B2409", sku: "8901234567890", count: 4, unit: "", ...o });

export default function PriceTag() {
  const { business } = useBusiness();
  const [tags, setTags] = useState<Tag[]>([mk()]);
  const [cols, setCols] = useState(3);
  const [showBarcode, setShowBarcode] = useState(true);
  const [showStore, setShowStore] = useState(true);
  const [showBatch, setShowBatch] = useState(true);
  const [style, setStyle] = useState<"clean" | "bold">("clean");
  const upd = (id: string, p: Partial<Tag>) => setTags(tags.map((t) => (t.id === id ? { ...t, ...p } : t)));
  const all = tags.flatMap((t) => Array.from({ length: Math.min(60, Math.max(1, t.count)) }, () => t));
  const tagW = Math.floor((PAPER.a4 - 80 - (cols - 1) * 12) / cols);

  const form = (
    <>
      <FieldGroup title="Sheet">
        <Row>
          <Select label="Stickers per row" value={String(cols)} onChange={(e) => setCols(parseInt(e.target.value))} options={["2", "3", "4", "5"]} />
          <Select label="Style" value={style} onChange={(e) => setStyle(e.target.value as "clean" | "bold")} options={[{ value: "clean", label: "Clean" }, { value: "bold", label: "Bold offer" }]} />
        </Row>
        <Toggle checked={showBarcode} onChange={setShowBarcode} label="Show barcode (SKU / EAN)" />
        <Toggle checked={showStore} onChange={setShowStore} label="Show store name" />
        <Toggle checked={showBatch} onChange={setShowBatch} label="Show batch no." />
      </FieldGroup>
      <FieldGroup title="Products" aside={<Button size="sm" variant="secondary" onClick={() => setTags([...tags, mk({ name: "", mrp: 0, price: 0, batch: "", sku: "" })])}><Plus className="h-3.5 w-3.5" /> Add</Button>}>
        {tags.map((t) => (
          <div key={t.id} className="rounded-xl border border-border bg-surface-2/50 p-3 grid gap-3">
            <div className="flex gap-2">
              <Input aria-label="Product name" placeholder="Product name" value={t.name} onChange={(e) => upd(t.id, { name: e.target.value })} wrapClassName="flex-1" />
              <button type="button" aria-label="Duplicate" onClick={() => setTags([...tags, { ...t, id: uid() }])} className="inline-flex h-11 w-10 items-center justify-center rounded-lg text-muted hover:bg-surface-3 cursor-pointer"><Copy className="h-4 w-4" /></button>
              <button type="button" aria-label="Remove" onClick={() => setTags(tags.filter((x) => x.id !== t.id))} className="inline-flex h-11 w-10 items-center justify-center rounded-lg text-muted hover:bg-danger-soft hover:text-danger cursor-pointer"><Trash2 className="h-4 w-4" /></button>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              <NumberInput aria-label="MRP" prefix="₹" placeholder="MRP" value={t.mrp} onChange={(v) => upd(t.id, { mrp: v })} />
              <NumberInput aria-label="Offer price" prefix="₹" placeholder="Offer" value={t.price} onChange={(v) => upd(t.id, { price: v })} />
              <NumberInput aria-label="Copies" placeholder="Copies" suffix="pcs" value={t.count} onChange={(v) => upd(t.id, { count: v })} />
              <Input aria-label="Batch" placeholder="Batch" value={t.batch} onChange={(e) => upd(t.id, { batch: e.target.value })} />
              <Input aria-label="SKU / EAN" placeholder="SKU / EAN-13" value={t.sku} onChange={(e) => upd(t.id, { sku: e.target.value })} wrapClassName="col-span-2 sm:col-span-2" />
            </div>
          </div>
        ))}
      </FieldGroup>
    </>
  );

  const preview = (
    <div className="p-10 flex flex-wrap gap-3 content-start" style={{ minHeight: 1123 }}>
      {all.map((t, i) => {
        const off = t.mrp > 0 && t.price < t.mrp ? Math.round(((t.mrp - t.price) / t.mrp) * 100) : 0;
        return (
          <div key={i} style={{ width: tagW, pageBreakInside: "avoid" }} className={`flex flex-col rounded-md border border-dashed border-[#a8a29e] p-2.5 text-center ${style === "bold" ? "bg-[#fffbeb]" : ""}`}>
            {showStore ? <div className="truncate text-[8.5px] font-semibold uppercase tracking-[0.14em] text-[#78716c]">{business.name}</div> : null}
            <div className="mt-0.5 line-clamp-2 text-[12px] font-semibold leading-tight">{t.name || "Product"}</div>
            <div className="mt-1.5 flex items-baseline justify-center gap-2">
              {off > 0 ? <span className="text-[11px] text-[#78716c] line-through tabular">{inr(t.mrp, { decimals: 0 })}</span> : null}
              <span className={`${style === "bold" ? "text-[26px]" : "text-[22px]"} font-black tabular leading-none`}>{inr(t.price || t.mrp, { decimals: 0 })}</span>
            </div>
            {off > 0 ? <div className={`mt-1 mx-auto rounded px-1.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wider ${style === "bold" ? "bg-[#dc2626] text-white" : "bg-[#1c1917] text-white"}`}>{off}% off</div> : <div className="text-[9px] text-[#78716c]">MRP incl. of all taxes</div>}
            {showBarcode && t.sku ? <div className="mt-1.5 flex justify-center"><Barcode value={t.sku} format={/^\d{13}$/.test(t.sku) ? "EAN13" : "CODE128"} height={26} width={1.1} fontSize={8} margin={0} /></div> : null}
            {showBatch && t.batch ? <div className="mt-1 text-[8.5px] text-[#78716c]">Batch {t.batch}</div> : null}
          </div>
        );
      })}
    </div>
  );

  return <DocumentShell form={form} preview={preview} paperWidth={PAPER.a4} filename="price-tags" formTitle="Price tags" previewDescription={`${all.length} stickers · A4 sheet · cut along dashed lines`} />;
}
