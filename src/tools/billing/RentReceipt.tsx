"use client";
import { useMemo, useState } from "react";
import { DocumentShell } from "@/components/shell/DocumentShell";
import { PAPER } from "@/components/shell/PaperPreview";
import { FieldGroup, Input, NumberInput, Row, Select, Toggle } from "@/components/ui/Field";
import { inr, numberToWordsINR, fmtDate } from "@/lib/format";
import { Eyebrow } from "../shared/doc";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function RentReceipt() {
  const [tenant, setTenant] = useState("Amit Sharma");
  const [landlord, setLandlord] = useState("Sunita Devi");
  const [pan, setPan] = useState("");
  const [address, setAddress] = useState("Flat 302, Green Park Apartments, Sector 21, Noida 201301");
  const [rent, setRent] = useState(15000);
  const [mode, setMode] = useState("Bank transfer");
  const [startMonth, setStartMonth] = useState(3); // April
  const [startYear, setStartYear] = useState(new Date().getFullYear());
  const [count, setCount] = useState(3);
  const [payDay, setPayDay] = useState(5);
  const [stamp, setStamp] = useState(true);
  const [commercial, setCommercial] = useState(false);

  const receipts = useMemo(() => Array.from({ length: Math.min(12, Math.max(1, count)) }, (_, i) => {
    const m = (startMonth + i) % 12;
    const y = startYear + Math.floor((startMonth + i) / 12);
    const paid = new Date(y, m + 1, Math.min(payDay, 28));
    const off = paid.getTimezoneOffset();
    return { month: months[m], year: y, paidISO: new Date(paid.getTime() - off * 60000).toISOString().slice(0, 10), no: `RR-${y}${String(m + 1).padStart(2, "0")}` };
  }), [startMonth, startYear, count, payDay]);

  const form = (
    <>
      <FieldGroup title="Parties">
        <Row>
          <Input label="Tenant name" value={tenant} onChange={(e) => setTenant(e.target.value)} />
          <Input label="Landlord name" value={landlord} onChange={(e) => setLandlord(e.target.value)} />
        </Row>
        <Input label="Landlord PAN" hint="required if annual rent > ₹1,00,000" placeholder="ABCDE1234F" value={pan} onChange={(e) => setPan(e.target.value.toUpperCase())} maxLength={10} />
        <Input label="Rented property address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <Toggle checked={commercial} onChange={setCommercial} label="Commercial property" help="Changes wording from residential to commercial premises." />
      </FieldGroup>
      <FieldGroup title="Rent & period">
        <Row>
          <NumberInput label="Monthly rent" prefix="₹" value={rent} onChange={setRent} />
          <Select label="Payment mode" value={mode} onChange={(e) => setMode(e.target.value)} options={["Bank transfer", "UPI", "Cash", "Cheque"]} />
          <Select label="From month" value={String(startMonth)} onChange={(e) => setStartMonth(parseInt(e.target.value))} options={months.map((m, i) => ({ value: String(i), label: m }))} />
          <NumberInput label="Year" value={startYear} onChange={setStartYear} />
          <NumberInput label="Number of months" hint="max 12" value={count} onChange={(v) => setCount(Math.min(12, Math.max(1, v)))} />
          <NumberInput label="Paid on day" hint="of following month" value={payDay} onChange={(v) => setPayDay(Math.min(28, Math.max(1, v)))} />
        </Row>
        <Toggle checked={stamp} onChange={setStamp} label="Revenue stamp box" help="Required for cash payments above ₹5,000." />
      </FieldGroup>
    </>
  );

  const preview = (
    <div className="p-10 grid gap-6">
      {receipts.map((r) => (
        <div key={r.no} className="rounded-lg border-2 border-[#1c1917] p-6 text-[12.5px]" style={{ pageBreakInside: "avoid" }}>
          <div className="flex items-start justify-between">
            <div><Eyebrow>Rent receipt</Eyebrow><div className="text-[18px] font-semibold">{r.month} {r.year}</div></div>
            <div className="text-right text-[11.5px] text-[#57534e]"><div>Receipt no. <span className="font-medium text-[#1c1917]">{r.no}</span></div><div>Date <span className="font-medium text-[#1c1917]">{fmtDate(r.paidISO)}</span></div></div>
          </div>
          <p className="mt-4 leading-relaxed">
            Received with thanks from <span className="font-semibold">{tenant || "________"}</span> a sum of <span className="font-semibold tabular">{inr(rent, { decimals: 0 })}</span> ({numberToWordsINR(rent)}) by <span className="font-medium">{mode}</span> towards rent for the month of <span className="font-semibold">{r.month} {r.year}</span> for the {commercial ? "commercial premises" : "residential property"} situated at <span className="font-medium">{address || "________"}</span>.
          </p>
          <div className="mt-6 flex items-end justify-between">
            <div className="text-[11.5px] text-[#57534e]">
              <div>Landlord: <span className="font-medium text-[#1c1917]">{landlord || "________"}</span></div>
              {pan ? <div>PAN: <span className="font-medium text-[#1c1917]">{pan}</span></div> : null}
            </div>
            <div className="flex items-end gap-6">
              {stamp ? <div className="flex h-16 w-14 items-center justify-center border border-dashed border-[#a8a29e] text-center text-[9px] leading-tight text-[#78716c]">Revenue<br />stamp</div> : null}
              <div className="min-w-[150px] border-t border-[#a8a29e] pt-1 text-center text-[11px]">Landlord signature</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return <DocumentShell form={form} preview={preview} paperWidth={PAPER.a4} filename={`rent-receipts-${tenant.replace(/\s+/g, "-")}`} formTitle="Rent receipt details" previewDescription={`${receipts.length} receipt${receipts.length > 1 ? "s" : ""} · A4 · for HRA claims`} shareText={`Rent receipts for ${tenant}: ${receipts[0].month} ${receipts[0].year} – ${receipts[receipts.length - 1].month} ${receipts[receipts.length - 1].year}, ${inr(rent, { decimals: 0 })}/month, landlord ${landlord}${pan ? ` (PAN ${pan})` : ""}.`} />;
}
