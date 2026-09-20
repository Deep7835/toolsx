"use client";
import { useMemo, useState } from "react";
import { DocumentShell } from "@/components/shell/DocumentShell";
import { PAPER } from "@/components/shell/PaperPreview";
import { LineItemsEditor, computeTotals, newItem, type LineItem } from "@/components/shell/LineItems";
import { FieldGroup, Input, NumberInput, Row, Textarea, Toggle, Segmented } from "@/components/ui/Field";
import { LogoUpload } from "@/components/shell/LogoUpload";
import { Qr, upiLink } from "@/components/shell/Qr";
import { inr, numberToWordsINR, todayISO, addDaysISO, fmtDate } from "@/lib/format";
import { useLocalStorage } from "@/lib/hooks";
import { Button } from "@/components/ui/Button";
import { Link2 } from "lucide-react";
import { copyText } from "@/lib/export";
import { useToast } from "@/components/ui/Toast";

export interface ExtraField { key: string; label: string; type?: "text" | "date" | "textarea"; placeholder?: string; half?: boolean }

export interface InvoiceConfig {
  title: string;
  numberLabel: string;
  numberPrefix: string;
  fromLabel: string;
  toLabel: string;
  toPlaceholder?: string;
  showTax?: boolean;
  showUpi?: boolean;
  showDueDate?: boolean;
  dueLabel?: string;
  showTransport?: boolean;
  extra?: ExtraField[];
  filenamePrefix: string;
  defaultNotes?: string;
  defaultTerms?: string;
  itemsLabel?: string;
  accent?: string;
  shareIntro?: string;
  signatureLabel?: string;
}

export interface Party { name: string; gstin: string; address: string; phone: string; email: string }
const emptyParty: Party = { name: "", gstin: "", address: "", phone: "", email: "" };

const DEFAULT_BUSINESS: Party = { ...emptyParty, name: "Bharat General Store", address: "12, Main Market, New Delhi 110001", phone: "98765 43210" };
const DEFAULT_UPI = { vpa: "", payee: "" };
const DEFAULT_BANK = { name: "", acc: "", ifsc: "", branch: "" };

/** Sequential document number per prefix, persisted locally: INV-2609-0001 */
export function nextDocNumber(prefix: string) {
  const d = new Date();
  const ym = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}`;
  let seq = 1;
  try {
    const k = `ibt:seq:${prefix}${ym}`;
    seq = parseInt(localStorage.getItem(k) ?? "0", 10) + 1;
    localStorage.setItem(k, String(seq));
  } catch {}
  return `${prefix}${ym}-${String(seq).padStart(4, "0")}`;
}

export default function InvoiceLike({ config }: { config: InvoiceConfig }) {
  const c = { showTax: true, showUpi: false, showDueDate: true, dueLabel: "Due date", accent: "#1c1917", signatureLabel: "Authorised signatory", ...config };
  const [business, setBusiness] = useLocalStorage<Party>("ibt:business", DEFAULT_BUSINESS);
  const [logo, setLogo] = useLocalStorage<string>("ibt:logo", "");
  const [upi, setUpi] = useLocalStorage<{ vpa: string; payee: string }>("ibt:upi", DEFAULT_UPI);
  const [client, setClient] = useState<Party>({ ...emptyParty, name: "Amit Sharma" });
  const [number, setNumber] = useState(() => nextDocNumber(c.numberPrefix));
  const [date, setDate] = useState(todayISO());
  const [due, setDue] = useState(addDaysISO(todayISO(), 15));
  const [items, setItems] = useState<LineItem[]>([newItem({ name: "Product / service", qty: 1, rate: 1000, gst: 18 })]);
  const [interstate, setInterstate] = useState(false);
  const [inclusive, setInclusive] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState(c.defaultNotes ?? "");
  const [terms, setTerms] = useState(c.defaultTerms ?? "");
  const [extra, setExtra] = useState<Record<string, string>>({});
  const [bank, setBank] = useLocalStorage<{ name: string; acc: string; ifsc: string; branch: string }>("ibt:bank", DEFAULT_BANK);
  const [showBank, setShowBank] = useState(false);
  const [signName, setSignName] = useState("");
  const toast = useToast();

  const totals = useMemo(() => computeTotals(items, { interstate, discount, inclusive }), [items, interstate, discount, inclusive]);
  const grand = c.showTax ? totals.rounded : Math.round(totals.taxable);
  const upiText = c.showUpi && upi.vpa ? upiLink({ vpa: upi.vpa, name: upi.payee || business.name, amount: grand, note: `${number}` }) : "";

  const shareText = `${c.shareIntro ?? c.title} ${number}\nFrom: ${business.name}\nTo: ${client.name}\nDate: ${fmtDate(date)}\nAmount: ${inr(grand)}${upiText ? `\nPay via UPI: ${upiText}` : ""}\n\n— Sent via India Biz Tools`;

  const setB = (k: keyof Party, v: string) => setBusiness({ ...business, [k]: v });
  const setC = (k: keyof Party, v: string) => setClient({ ...client, [k]: v });

  const form = (
    <>
      <FieldGroup title={c.fromLabel}>
        <Row>
          <Input label="Business name" value={business.name} onChange={(e) => setB("name", e.target.value)} />
          <Input label="GSTIN" hint="optional" placeholder="22AAAAA0000A1Z5" value={business.gstin} onChange={(e) => setB("gstin", e.target.value.toUpperCase())} maxLength={15} />
        </Row>
        <Textarea label="Address" value={business.address} onChange={(e) => setB("address", e.target.value)} rows={2} />
        <Row>
          <Input label="Phone" type="tel" value={business.phone} onChange={(e) => setB("phone", e.target.value)} />
          <Input label="Email" type="email" value={business.email} onChange={(e) => setB("email", e.target.value)} />
        </Row>
        <LogoUpload value={logo} onChange={setLogo} />
      </FieldGroup>

      <FieldGroup title={c.toLabel}>
        <Row>
          <Input label="Name" placeholder={c.toPlaceholder ?? "Customer / company"} value={client.name} onChange={(e) => setC("name", e.target.value)} />
          <Input label="GSTIN" hint="optional" value={client.gstin} onChange={(e) => setC("gstin", e.target.value.toUpperCase())} maxLength={15} />
        </Row>
        <Textarea label="Address" value={client.address} onChange={(e) => setC("address", e.target.value)} rows={2} />
        <Row>
          <Input label="Phone" type="tel" value={client.phone} onChange={(e) => setC("phone", e.target.value)} />
          <Input label="Email" type="email" value={client.email} onChange={(e) => setC("email", e.target.value)} />
        </Row>
      </FieldGroup>

      <FieldGroup title="Document">
        <Row cols={c.showDueDate ? 3 : 2}>
          <Input label={c.numberLabel} value={number} onChange={(e) => setNumber(e.target.value)} />
          <Input label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          {c.showDueDate ? <Input label={c.dueLabel} type="date" value={due} onChange={(e) => setDue(e.target.value)} /> : null}
        </Row>
        {c.extra?.length ? (
          <Row>
            {c.extra.map((f) =>
              f.type === "textarea" ? (
                <Textarea key={f.key} label={f.label} placeholder={f.placeholder} value={extra[f.key] ?? ""} onChange={(e) => setExtra({ ...extra, [f.key]: e.target.value })} wrapClassName="sm:col-span-2" rows={2} />
              ) : (
                <Input key={f.key} label={f.label} type={f.type ?? "text"} placeholder={f.placeholder} value={extra[f.key] ?? ""} onChange={(e) => setExtra({ ...extra, [f.key]: e.target.value })} wrapClassName={f.half ? "" : "sm:col-span-2"} />
              ),
            )}
          </Row>
        ) : null}
      </FieldGroup>

      <FieldGroup title={c.itemsLabel ?? "Items"}>
        <LineItemsEditor items={items} onChange={setItems} showGst={c.showTax} label={c.itemsLabel ?? "Line items"} />
        {c.showTax ? (
          <div className="grid gap-3">
            <Segmented value={interstate ? "igst" : "cgst"} onChange={(v) => setInterstate(v === "igst")} options={[{ value: "cgst", label: "Intra-state (CGST + SGST)" }, { value: "igst", label: "Inter-state (IGST)" }]} size="sm" />
            <Toggle checked={inclusive} onChange={setInclusive} label="Rates are inclusive of GST" help="Tax will be back-calculated from the rate." />
          </div>
        ) : null}
        <NumberInput label="Discount" hint="on subtotal" prefix="₹" value={discount} onChange={setDiscount} min={0} />
      </FieldGroup>

      {c.showUpi ? (
        <FieldGroup title="UPI payment QR">
          <Row>
            <Input label="UPI ID (VPA)" placeholder="shop@okicici" value={upi.vpa} onChange={(e) => setUpi({ ...upi, vpa: e.target.value.trim() })} />
            <Input label="Payee name" placeholder={business.name} value={upi.payee} onChange={(e) => setUpi({ ...upi, payee: e.target.value })} />
          </Row>
          <p className="text-xs text-muted -mt-1">A dynamic QR with the exact bill amount is embedded. Works with GPay, PhonePe, Paytm and BHIM.</p>
        </FieldGroup>
      ) : null}

      <FieldGroup title="Bank details" aside={<Toggle checked={showBank} onChange={setShowBank} label={<span className="text-xs font-normal text-muted">Show on document</span>} />}>
        {showBank ? (
          <Row>
            <Input label="Account holder" value={bank.name} onChange={(e) => setBank({ ...bank, name: e.target.value })} />
            <Input label="Account number" value={bank.acc} onChange={(e) => setBank({ ...bank, acc: e.target.value })} />
            <Input label="IFSC" value={bank.ifsc} onChange={(e) => setBank({ ...bank, ifsc: e.target.value.toUpperCase() })} />
            <Input label="Bank & branch" value={bank.branch} onChange={(e) => setBank({ ...bank, branch: e.target.value })} />
          </Row>
        ) : null}
      </FieldGroup>

      <FieldGroup title="Notes & signature">
        <Textarea label="Notes" placeholder="Thank you for your business." value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} />
        <Textarea label="Terms & conditions" value={terms} onChange={(e) => setTerms(e.target.value)} rows={2} />
        <Input label="Signatory name" placeholder="e.g. Proprietor" value={signName} onChange={(e) => setSignName(e.target.value)} />
      </FieldGroup>
    </>
  );

  const preview = (
    <div className="min-h-[1123px] p-12 text-[12.5px] leading-snug" style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}>
      {/* Header */}
      <div className="flex items-start justify-between gap-8 border-b-2 pb-6" style={{ borderColor: c.accent }}>
        <div className="flex items-start gap-4 min-w-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {logo ? <img src={logo} alt="" className="h-16 w-16 rounded-lg object-contain" /> : null}
          <div className="min-w-0">
            <div className="text-[22px] font-semibold tracking-tight" style={{ color: c.accent }}>{business.name || "Your business"}</div>
            {business.address ? <div className="mt-1 whitespace-pre-line text-[#57534e]">{business.address}</div> : null}
            <div className="mt-1 text-[#57534e]">{[business.phone && `Ph: ${business.phone}`, business.email].filter(Boolean).join("  ·  ")}</div>
            {business.gstin ? <div className="mt-1 font-medium">GSTIN: {business.gstin}</div> : null}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#78716c]">{c.title}</div>
          <div className="mt-1 text-[18px] font-semibold">{number}</div>
          <table className="mt-3 ml-auto text-[12px]"><tbody>
            <tr><td className="pr-4 text-[#78716c]">Date</td><td className="text-right font-medium">{fmtDate(date)}</td></tr>
            {c.showDueDate ? <tr><td className="pr-4 text-[#78716c]">{c.dueLabel}</td><td className="text-right font-medium">{fmtDate(due)}</td></tr> : null}
            {c.extra?.filter((f) => f.type !== "textarea" && extra[f.key]).map((f) => <tr key={f.key}><td className="pr-4 text-[#78716c]">{f.label}</td><td className="text-right font-medium">{f.type === "date" ? fmtDate(extra[f.key]) : extra[f.key]}</td></tr>)}
          </tbody></table>
        </div>
      </div>

      {/* Parties */}
      <div className="mt-6 grid grid-cols-2 gap-8">
        <div>
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#78716c]">{c.toLabel}</div>
          <div className="mt-1.5 text-[14px] font-semibold">{client.name || "—"}</div>
          {client.address ? <div className="mt-0.5 whitespace-pre-line text-[#57534e]">{client.address}</div> : null}
          <div className="text-[#57534e]">{[client.phone, client.email].filter(Boolean).join("  ·  ")}</div>
          {client.gstin ? <div className="mt-0.5 font-medium">GSTIN: {client.gstin}</div> : null}
        </div>
        <div>
          {c.extra?.filter((f) => f.type === "textarea" && extra[f.key]).map((f) => (
            <div key={f.key}>
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#78716c]">{f.label}</div>
              <div className="mt-1.5 whitespace-pre-line text-[#44403c]">{extra[f.key]}</div>
            </div>
          ))}
          {c.showTax ? <div className="mt-2 text-[#57534e]">Place of supply: <span className="font-medium">{interstate ? "Inter-state (IGST)" : "Intra-state (CGST + SGST)"}</span></div> : null}
        </div>
      </div>

      {/* Items */}
      <table className="mt-7 w-full border-collapse text-[12px]">
        <thead>
          <tr className="text-left text-[10.5px] uppercase tracking-[0.12em] text-white" style={{ background: c.accent }}>
            <th className="py-2.5 pl-3 pr-2 font-semibold w-8">#</th>
            <th className="py-2.5 px-2 font-semibold">Description</th>
            {c.showTax ? <th className="py-2.5 px-2 font-semibold w-20">HSN/SAC</th> : null}
            <th className="py-2.5 px-2 font-semibold text-right w-16">Qty</th>
            <th className="py-2.5 px-2 font-semibold text-right w-24">Rate</th>
            {c.showTax ? <th className="py-2.5 px-2 font-semibold text-right w-16">GST</th> : null}
            <th className="py-2.5 pl-2 pr-3 font-semibold text-right w-28">Amount</th>
          </tr>
        </thead>
        <tbody>
          {totals.rows.map((r, i) => (
            <tr key={r.id} className="border-b border-[#e7e5e4] align-top">
              <td className="py-2.5 pl-3 pr-2 text-[#78716c] tabular">{i + 1}</td>
              <td className="py-2.5 px-2 font-medium">{r.name || "—"}</td>
              {c.showTax ? <td className="py-2.5 px-2 text-[#57534e]">{r.hsn}</td> : null}
              <td className="py-2.5 px-2 text-right tabular">{r.qty}{r.unit ? ` ${r.unit}` : ""}</td>
              <td className="py-2.5 px-2 text-right tabular">{inr(inclusive ? r.base / (r.qty || 1) : r.rate)}</td>
              {c.showTax ? <td className="py-2.5 px-2 text-right tabular">{r.gst}%</td> : null}
              <td className="py-2.5 pl-2 pr-3 text-right tabular font-medium">{inr(r.base)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="mt-5 flex items-start justify-between gap-8">
        <div className="max-w-[46%] text-[#57534e]">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#78716c]">Amount in words</div>
          <div className="mt-1 font-medium text-[#1c1917]">{numberToWordsINR(grand)}</div>
          {notes ? <div className="mt-4 whitespace-pre-line">{notes}</div> : null}
        </div>
        <table className="w-[280px] text-[12.5px]"><tbody>
          <tr><td className="py-1 text-[#78716c]">Subtotal</td><td className="py-1 text-right tabular">{inr(totals.subtotal)}</td></tr>
          {discount > 0 ? <tr><td className="py-1 text-[#78716c]">Discount</td><td className="py-1 text-right tabular">− {inr(discount)}</td></tr> : null}
          {c.showTax && !interstate ? <><tr><td className="py-1 text-[#78716c]">CGST</td><td className="py-1 text-right tabular">{inr(totals.cgst)}</td></tr><tr><td className="py-1 text-[#78716c]">SGST</td><td className="py-1 text-right tabular">{inr(totals.sgst)}</td></tr></> : null}
          {c.showTax && interstate ? <tr><td className="py-1 text-[#78716c]">IGST</td><td className="py-1 text-right tabular">{inr(totals.igst)}</td></tr> : null}
          {c.showTax && Math.abs(totals.roundOff) >= 0.005 ? <tr><td className="py-1 text-[#78716c]">Round off</td><td className="py-1 text-right tabular">{totals.roundOff >= 0 ? "+" : "−"} {inr(Math.abs(totals.roundOff))}</td></tr> : null}
          <tr className="border-t-2" style={{ borderColor: c.accent }}><td className="pt-2 text-[14px] font-semibold">Total</td><td className="pt-2 text-right text-[16px] font-semibold tabular">{inr(grand)}</td></tr>
        </tbody></table>
      </div>

      {/* Payment & signature */}
      <div className="mt-8 flex items-end justify-between gap-8 border-t border-[#e7e5e4] pt-6">
        <div className="flex items-start gap-5">
          {upiText ? (
            <div className="flex items-center gap-3">
              <Qr text={upiText} size={96} />
              <div className="text-[11.5px] text-[#57534e]">
                <div className="font-semibold text-[#1c1917]">Scan & pay {inr(grand)}</div>
                <div className="mt-0.5">{upi.vpa}</div>
                <div className="mt-0.5">GPay · PhonePe · Paytm · BHIM</div>
              </div>
            </div>
          ) : null}
          {showBank && (bank.acc || bank.ifsc) ? (
            <div className="text-[11.5px] text-[#57534e]">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#78716c]">Bank transfer</div>
              {bank.name ? <div className="mt-1">{bank.name}</div> : null}
              {bank.acc ? <div>A/c {bank.acc}</div> : null}
              {bank.ifsc ? <div>IFSC {bank.ifsc}</div> : null}
              {bank.branch ? <div>{bank.branch}</div> : null}
            </div>
          ) : null}
        </div>
        <div className="text-right">
          <div className="text-[11px] text-[#78716c]">For {business.name}</div>
          <div className="mt-10 border-t border-[#a8a29e] pt-1.5 text-[11.5px] font-medium min-w-[160px]">{signName || c.signatureLabel}</div>
        </div>
      </div>
      {terms ? <div className="mt-6 whitespace-pre-line text-[11px] text-[#78716c]"><span className="font-semibold uppercase tracking-[0.14em]">Terms · </span>{terms}</div> : null}
    </div>
  );

  return (
    <DocumentShell
      form={form}
      preview={preview}
      paperWidth={PAPER.a4}
      filename={`${c.filenamePrefix}-${number}`}
      shareText={shareText}
      sharePhone={client.phone}
      formTitle={`${c.title.charAt(0)}${c.title.slice(1).toLowerCase()} details`}
      previewDescription="A4 · updates as you type"
      extraActions={upiText ? <Button variant="ghost" onClick={async () => { await copyText(upiText); toast("UPI link copied"); }}><Link2 className="h-4 w-4" /> UPI link</Button> : null}
    />
  );
}
