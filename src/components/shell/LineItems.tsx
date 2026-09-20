"use client";
import { Plus, Trash2 } from "lucide-react";
import { Input, NumberInput } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { uid } from "@/lib/format";

export interface LineItem { id: string; name: string; hsn?: string; qty: number; rate: number; gst: number; unit?: string }

export const newItem = (over: Partial<LineItem> = {}): LineItem => ({ id: uid(), name: "", hsn: "", qty: 1, rate: 0, gst: 18, unit: "", ...over });

export function LineItemsEditor({ items, onChange, showGst = true, showHsn = true, showUnit = false, gstOptions = [0, 3, 5, 12, 18, 28, 40], label = "Items" }: { items: LineItem[]; onChange: (i: LineItem[]) => void; showGst?: boolean; showHsn?: boolean; showUnit?: boolean; gstOptions?: number[]; label?: string }) {
  const update = (id: string, patch: Partial<LineItem>) => onChange(items.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  const remove = (id: string) => onChange(items.filter((i) => i.id !== id));
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">{label}</span>
        <Button size="sm" variant="secondary" onClick={() => onChange([...items, newItem({ gst: items[items.length - 1]?.gst ?? 18 })])}><Plus className="h-3.5 w-3.5" /> Add item</Button>
      </div>
      <div className="grid gap-3">
        {items.map((it, idx) => (
          <div key={it.id} className="rounded-xl border border-border bg-surface-2/50 p-3 grid gap-3">
            <div className="flex items-start gap-2">
              <span className="mt-3 w-5 shrink-0 text-center text-xs font-medium text-muted tabular">{idx + 1}</span>
              <Input aria-label="Item name" placeholder="Item / service description" value={it.name} onChange={(e) => update(it.id, { name: e.target.value })} wrapClassName="flex-1" />
              <button type="button" onClick={() => remove(it.id)} aria-label="Remove item" className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-muted hover:bg-danger-soft hover:text-danger transition-colors cursor-pointer"><Trash2 className="h-4 w-4" /></button>
            </div>
            <div className="ml-7 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {showHsn ? <Input aria-label="HSN/SAC" placeholder="HSN/SAC" value={it.hsn ?? ""} onChange={(e) => update(it.id, { hsn: e.target.value })} /> : null}
              <NumberInput aria-label="Quantity" value={it.qty} onChange={(v) => update(it.id, { qty: v })} suffix={showUnit ? undefined : "Qty"} min={0} placeholder="Qty" />
              {showUnit ? <Input aria-label="Unit" placeholder="Unit (pcs, kg)" value={it.unit ?? ""} onChange={(e) => update(it.id, { unit: e.target.value })} /> : null}
              <NumberInput aria-label="Rate" value={it.rate} onChange={(v) => update(it.id, { rate: v })} prefix="₹" min={0} placeholder="Rate" />
              {showGst ? (
                <div className="relative">
                  <select aria-label="GST rate" value={it.gst} onChange={(e) => update(it.id, { gst: parseFloat(e.target.value) })} className="h-11 w-full appearance-none rounded-xl border border-border bg-surface px-3.5 text-sm text-ink hover:border-border-strong focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10 cursor-pointer">
                    {gstOptions.map((g) => <option key={g} value={g}>GST {g}%</option>)}
                  </select>
                </div>
              ) : null}
            </div>
          </div>
        ))}
        {items.length === 0 ? <p className="rounded-xl border border-dashed border-border-strong px-4 py-6 text-center text-sm text-muted">No items yet. Add your first line item.</p> : null}
      </div>
    </div>
  );
}

export function computeTotals(items: LineItem[], opts: { interstate?: boolean; discount?: number; inclusive?: boolean } = {}) {
  let subtotal = 0, tax = 0;
  const rows = items.map((i) => {
    const gross = (i.qty || 0) * (i.rate || 0);
    let base = gross, t = 0;
    if (opts.inclusive) { base = gross / (1 + (i.gst || 0) / 100); t = gross - base; }
    else t = (base * (i.gst || 0)) / 100;
    subtotal += base; tax += t;
    return { ...i, base, tax: t, total: base + t };
  });
  const discount = opts.discount ?? 0;
  const taxable = subtotal - discount;
  const ratio = subtotal > 0 ? taxable / subtotal : 1;
  const taxAdj = tax * ratio;
  const cgst = opts.interstate ? 0 : taxAdj / 2;
  const sgst = opts.interstate ? 0 : taxAdj / 2;
  const igst = opts.interstate ? taxAdj : 0;
  const grand = taxable + taxAdj;
  const rounded = Math.round(grand);
  return { rows, subtotal, discount, taxable, tax: taxAdj, cgst, sgst, igst, grand, rounded, roundOff: rounded - grand };
}
