"use client";
import { useMemo, useState } from "react";
import { Plus, Trash2, ChevronUp, ChevronDown, ScanLine, Link2 } from "lucide-react";
import { DocumentShell } from "@/components/shell/DocumentShell";
import { PAPER } from "@/components/shell/PaperPreview";
import { FieldGroup, Input, NumberInput, Row, Select, Toggle } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Qr } from "@/components/shell/Qr";
import { Scanner } from "@/components/shell/Scanner";
import { useBusiness, BusinessFields } from "../shared/Business";
import { encodePayload } from "@/lib/share";
import { inr, uid } from "@/lib/format";
import { copyText } from "@/lib/export";
import { useToast } from "@/components/ui/Toast";

export interface MenuItem { id: string; name: string; price: number; desc: string; veg: "veg" | "nonveg" | "egg" | ""; }
export interface MenuSection { id: string; name: string; items: MenuItem[] }
export interface MenuPayload { n: string; t: string; a: string; p: string; c: string; s: Array<{ n: string; i: Array<[string, number, string, string]> }> }

const mkItem = (o: Partial<MenuItem> = {}): MenuItem => ({ id: uid(), name: "", price: 0, desc: "", veg: "veg", ...o });
const DEFAULT: MenuSection[] = [
  { id: uid(), name: "Starters", items: [mkItem({ name: "Paneer Tikka", price: 220, desc: "Char-grilled cottage cheese, mint chutney" }), mkItem({ name: "Chicken 65", price: 260, veg: "nonveg" })] },
  { id: uid(), name: "Mains", items: [mkItem({ name: "Dal Makhani", price: 240, desc: "Slow-cooked overnight" }), mkItem({ name: "Butter Chicken", price: 340, veg: "nonveg" }), mkItem({ name: "Veg Biryani", price: 260 })] },
  { id: uid(), name: "Drinks", items: [mkItem({ name: "Masala Chai", price: 40 }), mkItem({ name: "Fresh Lime Soda", price: 80 })] },
];
const CURRENCY_NOTE = "All prices in ₹ · GST extra as applicable";

export default function MenuCreator() {
  const { business, logo } = useBusiness();
  const [sections, setSections] = useState<MenuSection[]>(DEFAULT);
  const [note, setNote] = useState(CURRENCY_NOTE);
  const [showVeg, setShowVeg] = useState(true);
  const [cols, setCols] = useState<"1" | "2">("2");
  const [scanned, setScanned] = useState("");
  const toast = useToast();

  const updSection = (id: string, p: Partial<MenuSection>) => setSections(sections.map((s) => (s.id === id ? { ...s, ...p } : s)));
  const move = (i: number, d: -1 | 1) => { const n = [...sections]; const j = i + d; if (j < 0 || j >= n.length) return; [n[i], n[j]] = [n[j], n[i]]; setSections(n); };

  const payload: MenuPayload = useMemo(() => ({ n: business.name, t: business.tagline ?? "", a: business.address, p: business.phone, c: note, s: sections.map((s) => ({ n: s.name, i: s.items.filter((x) => x.name).map((x) => [x.name, x.price, x.desc, x.veg] as [string, number, string, string]) })) }), [business, note, sections]);
  const shareUrl = useMemo(() => (typeof window === "undefined" ? "" : `${window.location.origin}/m#${encodePayload(payload)}`), [payload]);

  const form = (
    <>
      <BusinessFields showGstin={false} showTagline />
      <FieldGroup title="Menu sections" aside={<Button size="sm" variant="secondary" onClick={() => setSections([...sections, { id: uid(), name: "New section", items: [mkItem()] }])}><Plus className="h-3.5 w-3.5" /> Section</Button>}>
        {sections.map((s, si) => (
          <div key={s.id} className="rounded-xl border border-border bg-surface-2/50 p-3 grid gap-3">
            <div className="flex items-center gap-2">
              <Input aria-label="Section name" value={s.name} onChange={(e) => updSection(s.id, { name: e.target.value })} wrapClassName="flex-1" className="font-semibold" />
              <button type="button" aria-label="Move up" onClick={() => move(si, -1)} className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-surface-3 cursor-pointer"><ChevronUp className="h-4 w-4" /></button>
              <button type="button" aria-label="Move down" onClick={() => move(si, 1)} className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-surface-3 cursor-pointer"><ChevronDown className="h-4 w-4" /></button>
              <button type="button" aria-label="Remove section" onClick={() => setSections(sections.filter((x) => x.id !== s.id))} className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-danger-soft hover:text-danger cursor-pointer"><Trash2 className="h-4 w-4" /></button>
            </div>
            {s.items.map((it) => (
              <div key={it.id} className="grid grid-cols-[1fr_96px_auto] gap-2 sm:grid-cols-[1.2fr_1fr_90px_96px_auto]">
                <Input aria-label="Item" placeholder="Item name" value={it.name} onChange={(e) => updSection(s.id, { items: s.items.map((x) => (x.id === it.id ? { ...x, name: e.target.value } : x)) })} />
                <Input aria-label="Description" placeholder="Description" value={it.desc} onChange={(e) => updSection(s.id, { items: s.items.map((x) => (x.id === it.id ? { ...x, desc: e.target.value } : x)) })} wrapClassName="col-span-3 sm:col-span-1" />
                <Select aria-label="Type" value={it.veg} onChange={(e) => updSection(s.id, { items: s.items.map((x) => (x.id === it.id ? { ...x, veg: e.target.value as MenuItem["veg"] } : x)) })} options={[{ value: "veg", label: "Veg" }, { value: "nonveg", label: "Non-veg" }, { value: "egg", label: "Egg" }, { value: "", label: "—" }]} wrapClassName="hidden sm:block" />
                <NumberInput aria-label="Price" prefix="₹" value={it.price} onChange={(v) => updSection(s.id, { items: s.items.map((x) => (x.id === it.id ? { ...x, price: v } : x)) })} />
                <button type="button" aria-label="Remove item" onClick={() => updSection(s.id, { items: s.items.filter((x) => x.id !== it.id) })} className="inline-flex h-11 w-9 items-center justify-center rounded-lg text-muted hover:bg-danger-soft hover:text-danger cursor-pointer"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
            <Button size="sm" variant="ghost" className="justify-self-start" onClick={() => updSection(s.id, { items: [...s.items, mkItem()] })}><Plus className="h-3.5 w-3.5" /> Add item</Button>
          </div>
        ))}
      </FieldGroup>
      <FieldGroup title="Layout">
        <Row>
          <Select label="Columns" value={cols} onChange={(e) => setCols(e.target.value as "1" | "2")} options={[{ value: "1", label: "Single column" }, { value: "2", label: "Two columns" }]} />
          <Input label="Footer note" value={note} onChange={(e) => setNote(e.target.value)} />
        </Row>
        <Toggle checked={showVeg} onChange={setShowVeg} label="Show veg / non-veg markers" />
      </FieldGroup>
    </>
  );

  const Dot = ({ v }: { v: MenuItem["veg"] }) => (v && showVeg ? <span className={`inline-flex h-3 w-3 shrink-0 items-center justify-center border ${v === "veg" ? "border-[#15803d]" : v === "egg" ? "border-[#b45309]" : "border-[#b91c1c]"}`}><span className={`h-1.5 w-1.5 rounded-full ${v === "veg" ? "bg-[#15803d]" : v === "egg" ? "bg-[#b45309]" : "bg-[#b91c1c]"}`} /></span> : null);

  const preview = (
    <div className="min-h-[1123px] p-12 text-[12.5px]">
      <div className="text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {logo ? <img src={logo} alt="" className="mx-auto h-16 w-16 rounded-full object-cover" /> : null}
        <div className="mt-3 font-display text-[40px] leading-none">{business.name}</div>
        {business.tagline ? <div className="mt-1 text-[11px] uppercase tracking-[0.3em] text-[#78716c]">{business.tagline}</div> : null}
        <div className="mx-auto mt-4 h-px w-24 bg-[#1c1917]" />
      </div>
      <div className={`mt-8 grid gap-x-10 gap-y-8 ${cols === "2" ? "grid-cols-2" : "grid-cols-1"}`}>
        {sections.map((s) => (
          <div key={s.id} style={{ breakInside: "avoid" }}>
            <div className="mb-3 text-[13px] font-bold uppercase tracking-[0.2em] text-[#1c1917]">{s.name}</div>
            <div className="grid gap-2.5">
              {s.items.filter((i) => i.name).map((i) => (
                <div key={i.id}>
                  <div className="flex items-baseline gap-2">
                    <Dot v={i.veg} />
                    <span className="font-semibold">{i.name}</span>
                    <span className="flex-1 border-b border-dotted border-[#a8a29e]" />
                    <span className="tabular font-semibold">{inr(i.price, { decimals: 0 })}</span>
                  </div>
                  {i.desc ? <div className="ml-5 text-[11px] text-[#78716c]">{i.desc}</div> : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 flex items-end justify-between border-t border-[#e7e5e4] pt-5">
        <div className="text-[10.5px] text-[#78716c]"><div>{note}</div><div className="mt-1">{business.address} · {business.phone}</div></div>
        {shareUrl ? <div className="flex items-center gap-3 text-right"><div className="text-[10px] text-[#78716c]">Scan for<br />digital menu</div><Qr text={shareUrl} size={72} opts={{ margin: 0, level: "L" }} /></div> : null}
      </div>
    </div>
  );

  const aside = (
    <Card>
      <CardHeader title="Digital menu link & scanner" description="The QR on the menu opens a phone-friendly digital menu. Test it with the scanner." icon={<ScanLine className="h-4 w-4" strokeWidth={2} />} />
      <CardBody className="grid gap-4">
        <div className="flex items-center gap-3 rounded-xl border border-border bg-surface-2/60 p-3">
          <Qr text={shareUrl} size={72} opts={{ margin: 0, level: "L" }} />
          <div className="min-w-0 flex-1">
            <div className="truncate text-xs text-muted">{shareUrl}</div>
            <div className="mt-2 flex gap-2">
              <Button size="sm" variant="secondary" onClick={async () => { await copyText(shareUrl); toast("Menu link copied"); }}><Link2 className="h-3.5 w-3.5" /> Copy link</Button>
              <a href={shareUrl} target="_blank" rel="noopener" className="inline-flex h-9 items-center rounded-lg px-3 text-[13px] font-medium text-accent-text hover:underline">Open preview</a>
            </div>
          </div>
        </div>
        <Scanner formats="qr" onResult={(t) => { setScanned(t); if (t.startsWith("http")) window.open(t, "_blank", "noopener"); }} />
        {scanned ? <div className="rounded-xl border border-border bg-surface-2/60 p-3 text-xs break-all"><span className="font-semibold text-ink">Scanned:</span> {scanned}</div> : null}
      </CardBody>
    </Card>
  );

  return <DocumentShell form={form} preview={preview} paperWidth={PAPER.a4} filename={`menu-${business.name.replace(/\s+/g, "-")}`} formTitle="Menu builder" previewDescription="A4 printable menu with QR" previewAside={aside} shareText={`${business.name} — menu: ${shareUrl}`} />;
}
