"use client";
import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { DocumentShell } from "@/components/shell/DocumentShell";
import { PAPER } from "@/components/shell/PaperPreview";
import { FieldGroup, Input, NumberInput, Row, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Eyebrow, MetaTable, SimpleTable } from "../shared/doc";
import { Qr, upiLink } from "@/components/shell/Qr";
import { inr, numberToWordsINR, todayISO, addDaysISO, fmtDate, uid } from "@/lib/format";
import { nextDocNumber } from "../billing/InvoiceLike";

export interface BillConfig {
  kind: "electricity" | "telecom" | "broadband" | "society";
  title: string;
  provider: { name: string; address: string; phone: string };
  customerIdLabel: string;
  customerIdDefault: string;
  planLabel?: string;
  lines: Array<{ label: string; amount: number }>;
  gst: number;
  accent: string;
  filename: string;
  notes: string;
}

interface Line { id: string; label: string; amount: number }
const DEFAULT_SLABS = [{ upto: 100, rate: 3.5 }, { upto: 200, rate: 5 }, { upto: 400, rate: 6.5 }, { upto: Infinity, rate: 8 }];

export default function UtilityBill({ config: c }: { config: BillConfig }) {
  const [provider, setProvider] = useState(c.provider);
  const [customer, setCustomer] = useState({ name: "Amit Sharma", id: c.customerIdDefault, address: "H-24, Sector 15, Noida 201301", phone: "98765 43210" });
  const [billNo, setBillNo] = useState(() => nextDocNumber("BILL-"));
  const [date, setDate] = useState(todayISO());
  const [due, setDue] = useState(addDaysISO(todayISO(), 15));
  const [from, setFrom] = useState(addDaysISO(todayISO(), -30));
  const [to, setTo] = useState(todayISO());
  const [plan, setPlan] = useState(c.kind === "telecom" ? "Postpaid 599 · 75 GB · Unlimited calls" : c.kind === "broadband" ? "Fiber 300 Mbps · Unlimited · 6 months" : c.kind === "society" ? "Flat 302 · Tower B · 1,250 sq ft" : "Domestic · Single phase · 5 kW");
  const [prev, setPrev] = useState(12450);
  const [curr, setCurr] = useState(12718);
  const [slabs, setSlabs] = useState(DEFAULT_SLABS.map((s) => ({ ...s, upto: s.upto === Infinity ? 0 : s.upto })));
  const [fixed, setFixed] = useState(120);
  const [duty, setDuty] = useState(5);
  const [lines, setLines] = useState<Line[]>(c.lines.map((l) => ({ id: uid(), ...l })));
  const [arrears, setArrears] = useState(0);
  const [lateFee, setLateFee] = useState(0);
  const [upi, setUpi] = useState("");
  const [notes, setNotes] = useState(c.notes);

  const units = Math.max(0, curr - prev);
  const energy = useMemo(() => {
    if (c.kind !== "electricity") return { rows: [] as Array<{ label: string; units: number; rate: number; amt: number }>, total: 0 };
    let remaining = units, lower = 0, total = 0;
    const rows: Array<{ label: string; units: number; rate: number; amt: number }> = [];
    for (const s of slabs) {
      if (remaining <= 0) break;
      const cap = s.upto > 0 ? s.upto - lower : remaining;
      const u = Math.min(remaining, cap);
      const amt = u * s.rate;
      rows.push({ label: s.upto > 0 ? `${lower + 1}–${s.upto} units` : `Above ${lower} units`, units: u, rate: s.rate, amt });
      total += amt; remaining -= u; lower = s.upto > 0 ? s.upto : lower;
    }
    return { rows, total };
  }, [c.kind, units, slabs]);

  const linesTotal = lines.reduce((a, l) => a + (l.amount || 0), 0);
  const sub = c.kind === "electricity" ? energy.total + fixed : linesTotal;
  const dutyAmt = c.kind === "electricity" ? (energy.total * duty) / 100 : 0;
  const gstAmt = (sub * c.gst) / 100;
  const total = Math.round(sub + dutyAmt + gstAmt + arrears + lateFee);
  const upiText = upi ? upiLink({ vpa: upi, name: provider.name, amount: total, note: `${billNo}` }) : "";

  const form = (
    <>
      <FieldGroup title="Provider">
        <Input label="Provider / company" value={provider.name} onChange={(e) => setProvider({ ...provider, name: e.target.value })} />
        <Row>
          <Input label="Address" value={provider.address} onChange={(e) => setProvider({ ...provider, address: e.target.value })} />
          <Input label="Helpline" value={provider.phone} onChange={(e) => setProvider({ ...provider, phone: e.target.value })} />
        </Row>
      </FieldGroup>
      <FieldGroup title="Customer">
        <Row>
          <Input label="Name" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
          <Input label={c.customerIdLabel} value={customer.id} onChange={(e) => setCustomer({ ...customer, id: e.target.value })} />
        </Row>
        <Input label="Address" value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} />
        <Row>
          <Input label="Phone" type="tel" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />
          <Input label={c.planLabel ?? "Plan / connection"} value={plan} onChange={(e) => setPlan(e.target.value)} />
        </Row>
      </FieldGroup>
      <FieldGroup title="Bill period">
        <Row cols={4}>
          <Input label="Bill no." value={billNo} onChange={(e) => setBillNo(e.target.value)} wrapClassName="col-span-2" />
          <Input label="Bill date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <Input label="Due date" type="date" value={due} onChange={(e) => setDue(e.target.value)} />
          <Input label="From" type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          <Input label="To" type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        </Row>
      </FieldGroup>
      {c.kind === "electricity" ? (
        <FieldGroup title="Meter & tariff">
          <Row cols={3}>
            <NumberInput label="Previous reading" value={prev} onChange={setPrev} />
            <NumberInput label="Current reading" value={curr} onChange={setCurr} />
            <Input label="Units consumed" value={units} readOnly suffix="kWh" />
          </Row>
          <div className="grid gap-2">
            {slabs.map((s, i) => (
              <div key={i} className="grid grid-cols-[1fr_1fr_auto] items-end gap-2">
                <NumberInput label={i === 0 ? "Slab up to (units)" : undefined} aria-label="Slab upper limit" value={s.upto} onChange={(v) => setSlabs(slabs.map((x, j) => (j === i ? { ...x, upto: v } : x)))} placeholder="0 = above" />
                <NumberInput label={i === 0 ? "Rate per unit" : undefined} aria-label="Rate" prefix="₹" value={s.rate} onChange={(v) => setSlabs(slabs.map((x, j) => (j === i ? { ...x, rate: v } : x)))} step={0.1} />
                <button type="button" aria-label="Remove slab" onClick={() => setSlabs(slabs.filter((_, j) => j !== i))} className="mb-0.5 inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted hover:bg-danger-soft hover:text-danger cursor-pointer"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
            <Button size="sm" variant="secondary" className="justify-self-start" onClick={() => setSlabs([...slabs, { upto: 0, rate: 8 }])}><Plus className="h-3.5 w-3.5" /> Add slab</Button>
          </div>
          <Row>
            <NumberInput label="Fixed / meter charge" prefix="₹" value={fixed} onChange={setFixed} />
            <NumberInput label="Electricity duty" suffix="%" value={duty} onChange={setDuty} />
          </Row>
        </FieldGroup>
      ) : (
        <FieldGroup title="Charges" aside={<Button size="sm" variant="secondary" onClick={() => setLines([...lines, { id: uid(), label: "", amount: 0 }])}><Plus className="h-3.5 w-3.5" /> Add</Button>}>
          {lines.map((l) => (
            <div key={l.id} className="grid grid-cols-[1fr_140px_auto] items-center gap-2">
              <Input aria-label="Charge" placeholder="Charge description" value={l.label} onChange={(e) => setLines(lines.map((x) => (x.id === l.id ? { ...x, label: e.target.value } : x)))} />
              <NumberInput aria-label="Amount" prefix="₹" value={l.amount} onChange={(v) => setLines(lines.map((x) => (x.id === l.id ? { ...x, amount: v } : x)))} />
              <button type="button" aria-label="Remove" onClick={() => setLines(lines.filter((x) => x.id !== l.id))} className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted hover:bg-danger-soft hover:text-danger cursor-pointer"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </FieldGroup>
      )}
      <FieldGroup title="Adjustments & payment">
        <Row>
          <NumberInput label="Previous arrears" prefix="₹" value={arrears} onChange={setArrears} />
          <NumberInput label="Late payment fee" prefix="₹" value={lateFee} onChange={setLateFee} />
        </Row>
        <Input label="UPI ID for payment QR" hint="optional" placeholder="provider@upi" value={upi} onChange={(e) => setUpi(e.target.value.trim())} />
        <Textarea label="Notes" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
      </FieldGroup>
    </>
  );

  const preview = (
    <div className="min-h-[1123px] p-12 text-[12.5px]">
      <div className="flex items-start justify-between border-b-2 pb-5" style={{ borderColor: c.accent }}>
        <div><div className="text-[22px] font-semibold tracking-tight" style={{ color: c.accent }}>{provider.name}</div><div className="text-[#57534e]">{provider.address}</div><div className="text-[#57534e]">Helpline {provider.phone}</div></div>
        <div className="text-right"><Eyebrow>{c.title}</Eyebrow><div className="mt-1 text-[18px] font-semibold">{billNo}</div><div className="text-[#57534e]">Bill date {fmtDate(date)}</div></div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-6">
        <div className="col-span-1"><Eyebrow>Customer</Eyebrow><div className="mt-1 text-[14px] font-semibold">{customer.name}</div><div className="text-[#57534e]">{customer.address}</div><div className="text-[#57534e]">{customer.phone}</div></div>
        <div><Eyebrow>Account</Eyebrow><MetaTable rows={[[c.customerIdLabel, customer.id], [c.planLabel ?? "Plan", plan], ["Period", `${fmtDate(from)} – ${fmtDate(to)}`]]} /></div>
        <div className="rounded-xl p-4 text-white" style={{ background: c.accent }}><div className="text-[10px] uppercase tracking-[0.16em] opacity-80">Amount payable</div><div className="mt-1 text-[28px] font-semibold tabular leading-none">{inr(total, { decimals: 0 })}</div><div className="mt-2 text-[11px] opacity-90">Due by {fmtDate(due)}</div></div>
      </div>
      {c.kind === "electricity" ? (
        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          {[["Previous reading", prev], ["Current reading", curr], ["Units consumed", `${units} kWh`]].map(([k, v]) => <div key={String(k)} className="rounded-lg border border-[#e7e5e4] p-3"><div className="text-[10px] uppercase tracking-[0.12em] text-[#78716c]">{k}</div><div className="mt-1 text-[16px] font-semibold tabular">{v}</div></div>)}
        </div>
      ) : null}
      <div className="mt-6">
        {c.kind === "electricity" ? (
          <SimpleTable accent={c.accent} head={["Description", "Units", "Rate", "Amount"]} rows={[...energy.rows.map((r) => [r.label, String(r.units), inr(r.rate), inr(r.amt)]), ["Fixed / meter charge", "", "", inr(fixed)]]} foot={[["Energy & fixed charges", inr(sub)], [`Electricity duty @ ${duty}%`, inr(dutyAmt)], ...(arrears ? [["Previous arrears", inr(arrears)]] : []), ...(lateFee ? [["Late payment fee", inr(lateFee)]] : []), ["Total payable", inr(total, { decimals: 0 })]]} />
        ) : (
          <SimpleTable accent={c.accent} head={["Description", "Amount"]} rows={lines.map((l) => [l.label || "—", inr(l.amount)])} foot={[["Subtotal", inr(sub)], ...(c.gst ? [[`GST @ ${c.gst}%`, inr(gstAmt)]] : []), ...(arrears ? [["Previous arrears", inr(arrears)]] : []), ...(lateFee ? [["Late payment fee", inr(lateFee)]] : []), ["Total payable", inr(total, { decimals: 0 })]]} />
        )}
      </div>
      <div className="mt-3 text-[#57534e]">Amount in words: <span className="font-medium text-[#1c1917]">{numberToWordsINR(total)}</span></div>
      <div className="mt-8 flex items-start justify-between gap-8 border-t border-[#e7e5e4] pt-6">
        <div className="max-w-[60%] text-[11.5px] leading-relaxed text-[#57534e] whitespace-pre-line">{notes}</div>
        {upiText ? <div className="flex items-center gap-3"><Qr text={upiText} size={88} /><div className="text-[11px] text-[#57534e]"><div className="font-semibold text-[#1c1917]">Scan to pay {inr(total, { decimals: 0 })}</div><div>{upi}</div></div></div> : null}
      </div>
      <div className="mt-10 border-t border-dashed border-[#a8a29e] pt-4">
        <Eyebrow>Payment stub · retain for records</Eyebrow>
        <div className="mt-2 grid grid-cols-4 gap-4 text-[11.5px]"><div><div className="text-[#78716c]">Bill no.</div><div className="font-semibold">{billNo}</div></div><div><div className="text-[#78716c]">{c.customerIdLabel}</div><div className="font-semibold">{customer.id}</div></div><div><div className="text-[#78716c]">Due date</div><div className="font-semibold">{fmtDate(due)}</div></div><div><div className="text-[#78716c]">Amount</div><div className="font-semibold tabular">{inr(total, { decimals: 0 })}</div></div></div>
      </div>
    </div>
  );

  return <DocumentShell form={form} preview={preview} paperWidth={PAPER.a4} filename={`${c.filename}-${billNo}`} formTitle="Bill details" previewDescription="A4" shareText={`${c.title} ${billNo} from ${provider.name}\nCustomer: ${customer.name} (${customer.id})\nPeriod: ${fmtDate(from)} – ${fmtDate(to)}\nAmount payable: ${inr(total, { decimals: 0 })} by ${fmtDate(due)}`} sharePhone={customer.phone} />;
}
