"use client";
import { useMemo, useState } from "react";
import { DocumentShell } from "@/components/shell/DocumentShell";
import { PAPER } from "@/components/shell/PaperPreview";
import { FieldGroup, Input, NumberInput, Row, Segmented, Select, Textarea } from "@/components/ui/Field";
import { LineItemsEditor, computeTotals, newItem, type LineItem } from "@/components/shell/LineItems";
import { inr, numberToWordsINR, todayISO, fmtDate } from "@/lib/format";
import { useBusiness, BusinessFields } from "../shared/Business";
import { Eyebrow, Divider, MetaTable } from "../shared/doc";
import { nextDocNumber } from "./InvoiceLike";

export default function PaymentReceipt() {
  const { business, logo } = useBusiness();
  const [layout, setLayout] = useState<"a4" | "thermal">("a4");
  const [number, setNumber] = useState(() => nextDocNumber("RCPT-"));
  const [date, setDate] = useState(todayISO());
  const [from, setFrom] = useState("Amit Sharma");
  const [phone, setPhone] = useState("");
  const [mode, setMode] = useState("UPI");
  const [ref, setRef] = useState("");
  const [items, setItems] = useState<LineItem[]>([newItem({ name: "Payment received", qty: 1, rate: 500, gst: 0 })]);
  const [received, setReceived] = useState(0);
  const [note, setNote] = useState("");
  const totals = useMemo(() => computeTotals(items), [items]);
  const total = totals.rounded;
  const paid = received || total;
  const balance = Math.max(0, total - paid);

  const form = (
    <>
      <Segmented value={layout} onChange={setLayout} options={[{ value: "a4", label: "A4 receipt" }, { value: "thermal", label: "80mm thermal" }]} size="sm" />
      <BusinessFields />
      <FieldGroup title="Receipt">
        <Row>
          <Input label="Receipt no." value={number} onChange={(e) => setNumber(e.target.value)} />
          <Input label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <Input label="Received from" value={from} onChange={(e) => setFrom(e.target.value)} />
          <Input label="Payer phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <Select label="Payment mode" value={mode} onChange={(e) => setMode(e.target.value)} options={["UPI", "Cash", "Bank transfer (NEFT/IMPS)", "Card", "Cheque"]} />
          <Input label="Transaction / ref. no." hint="optional" value={ref} onChange={(e) => setRef(e.target.value)} />
        </Row>
      </FieldGroup>
      <FieldGroup title="Items">
        <LineItemsEditor items={items} onChange={setItems} showGst showHsn={false} />
        <NumberInput label="Amount received" hint="blank = full amount" prefix="₹" value={received} onChange={setReceived} placeholder={String(total)} />
        <Textarea label="Note" rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Advance for order #123" />
      </FieldGroup>
    </>
  );

  const a4 = (
    <div className="min-h-[1123px] p-12 text-[12.5px]">
      <div className="flex items-start justify-between gap-8 border-b-2 border-[#1c1917] pb-5">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {logo ? <img src={logo} alt="" className="h-14 w-14 rounded-lg object-contain" /> : null}
          <div>
            <div className="text-[22px] font-semibold tracking-tight">{business.name}</div>
            <div className="text-[#57534e] whitespace-pre-line">{business.address}</div>
            <div className="text-[#57534e]">{[business.phone, business.email].filter(Boolean).join(" · ")}</div>
            {business.gstin ? <div className="font-medium">GSTIN {business.gstin}</div> : null}
          </div>
        </div>
        <div className="text-right">
          <Eyebrow>Payment receipt</Eyebrow>
          <div className="mt-1 text-[18px] font-semibold">{number}</div>
          <div className="mt-1 text-[#57534e]">{fmtDate(date)}</div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-8">
        <div><Eyebrow>Received from</Eyebrow><div className="mt-1 text-[14px] font-semibold">{from || "—"}</div>{phone ? <div className="text-[#57534e]">{phone}</div> : null}</div>
        <div><Eyebrow>Payment</Eyebrow><MetaTable rows={[["Mode", mode], ref ? ["Reference", ref] : null]} /></div>
      </div>
      <table className="mt-7 w-full border-collapse text-[12px]">
        <thead><tr className="bg-[#1c1917] text-left text-[10.5px] uppercase tracking-[0.12em] text-white"><th className="py-2.5 px-3">#</th><th className="py-2.5 px-3">Description</th><th className="py-2.5 px-3 text-right">Qty</th><th className="py-2.5 px-3 text-right">Rate</th><th className="py-2.5 px-3 text-right">GST</th><th className="py-2.5 px-3 text-right">Amount</th></tr></thead>
        <tbody>{totals.rows.map((r, i) => <tr key={r.id} className="border-b border-[#e7e5e4]"><td className="py-2.5 px-3 text-[#78716c]">{i + 1}</td><td className="py-2.5 px-3 font-medium">{r.name}</td><td className="py-2.5 px-3 text-right tabular">{r.qty}</td><td className="py-2.5 px-3 text-right tabular">{inr(r.rate)}</td><td className="py-2.5 px-3 text-right tabular">{r.gst}%</td><td className="py-2.5 px-3 text-right tabular">{inr(r.total)}</td></tr>)}</tbody>
      </table>
      <div className="mt-5 flex justify-between gap-8">
        <div className="max-w-[46%]"><Eyebrow>Amount in words</Eyebrow><div className="mt-1 font-medium">{numberToWordsINR(paid)}</div>{note ? <div className="mt-4 text-[#57534e] whitespace-pre-line">{note}</div> : null}</div>
        <table className="w-[280px]"><tbody>
          <tr><td className="py-1 text-[#78716c]">Subtotal</td><td className="py-1 text-right tabular">{inr(totals.subtotal)}</td></tr>
          {totals.tax > 0 ? <tr><td className="py-1 text-[#78716c]">GST</td><td className="py-1 text-right tabular">{inr(totals.tax)}</td></tr> : null}
          <tr><td className="py-1 text-[#78716c]">Total</td><td className="py-1 text-right tabular">{inr(total)}</td></tr>
          <tr className="border-t-2 border-[#1c1917]"><td className="pt-2 text-[14px] font-semibold">Received</td><td className="pt-2 text-right text-[16px] font-semibold tabular">{inr(paid)}</td></tr>
          {balance > 0 ? <tr><td className="py-1 text-[#b91c1c]">Balance due</td><td className="py-1 text-right tabular text-[#b91c1c]">{inr(balance)}</td></tr> : null}
        </tbody></table>
      </div>
      <div className="mt-12 flex items-end justify-between"><div className="inline-block rotate-[-6deg] rounded-md border-[3px] border-[#047857] px-3 py-1 text-[13px] font-bold uppercase tracking-[0.2em] text-[#047857]">{balance > 0 ? "Part paid" : "Paid"}</div><div className="text-right"><div className="text-[11px] text-[#78716c]">For {business.name}</div><div className="mt-10 border-t border-[#a8a29e] pt-1.5 text-[11.5px] font-medium min-w-[160px]">Authorised signatory</div></div></div>
    </div>
  );

  const thermal = (
    <div className="px-3 py-4 text-[11.5px] leading-tight" style={{ fontFamily: "ui-monospace, Menlo, monospace" }}>
      <div className="text-center">
        <div className="text-[15px] font-bold uppercase tracking-wide">{business.name}</div>
        <div className="mt-0.5 text-[10px] whitespace-pre-line">{business.address}</div>
        {business.phone ? <div className="text-[10px]">Ph: {business.phone}</div> : null}
        {business.gstin ? <div className="text-[10px]">GSTIN: {business.gstin}</div> : null}
      </div>
      <Divider dashed />
      <div className="flex justify-between"><span>Receipt</span><span>{number}</span></div>
      <div className="flex justify-between"><span>Date</span><span>{fmtDate(date)}</span></div>
      <div className="flex justify-between"><span>From</span><span>{from}</span></div>
      <div className="flex justify-between"><span>Mode</span><span>{mode}</span></div>
      {ref ? <div className="flex justify-between"><span>Ref</span><span>{ref}</span></div> : null}
      <Divider dashed />
      {totals.rows.map((r) => (
        <div key={r.id} className="mb-1"><div>{r.name}</div><div className="flex justify-between text-[10.5px]"><span>{r.qty} x {inr(r.rate)}{r.gst ? ` +${r.gst}%` : ""}</span><span>{inr(r.total)}</span></div></div>
      ))}
      <Divider dashed />
      <div className="flex justify-between"><span>Subtotal</span><span>{inr(totals.subtotal)}</span></div>
      {totals.tax > 0 ? <div className="flex justify-between"><span>GST</span><span>{inr(totals.tax)}</span></div> : null}
      <div className="flex justify-between text-[14px] font-bold"><span>RECEIVED</span><span>{inr(paid)}</span></div>
      {balance > 0 ? <div className="flex justify-between"><span>Balance due</span><span>{inr(balance)}</span></div> : null}
      <Divider dashed />
      <div className="text-center text-[10px]">{note || "Thank you! Visit again."}</div>
    </div>
  );

  return <DocumentShell form={form} preview={layout === "a4" ? a4 : thermal} paperWidth={layout === "a4" ? PAPER.a4 : PAPER.thermal80} pdfFormat={layout === "a4" ? "a4" : "thermal"} filename={`receipt-${number}`} shareText={`Payment receipt ${number}\n${business.name}\nReceived ${inr(paid)} from ${from} via ${mode} on ${fmtDate(date)}.${balance > 0 ? `\nBalance due: ${inr(balance)}` : ""}\nThank you!`} sharePhone={phone} formTitle="Receipt details" previewDescription={layout === "a4" ? "A4" : "80 mm thermal roll"} />;
}
