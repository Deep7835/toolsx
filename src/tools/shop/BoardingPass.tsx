"use client";
import { useState } from "react";
import { DocumentShell } from "@/components/shell/DocumentShell";
import { FieldGroup, Input, Row, Select } from "@/components/ui/Field";
import { Barcode } from "@/components/shell/Barcode";
import { fmtDate, fmtTime, todayISO, addDaysISO } from "@/lib/format";

const Field = ({ k, v, big }: { k: string; v: string; big?: boolean }) => <div><div className="text-[8.5px] font-semibold uppercase tracking-[0.14em] opacity-70">{k}</div><div className={`${big ? "text-[22px]" : "text-[13px]"} font-bold leading-tight`}>{v}</div></div>;

export default function BoardingPass() {
  const [p, setP] = useState({ airline: "IndiGo", flight: "6E 2134", pax: "SHARMA / AMIT MR", pnr: "X7K9QP", from: "DEL", fromCity: "New Delhi", to: "BLR", toCity: "Bengaluru", date: addDaysISO(todayISO(), 3), dep: "07:45", arr: "10:30", boarding: "07:05", gate: "22A", seat: "14C", zone: "2", cls: "Economy", terminal: "T3", seq: "042", bags: "15 kg" });
  const [theme, setTheme] = useState("#1e3a8a");
  const s = (k: keyof typeof p, v: string) => setP({ ...p, [k]: v });
  const code = `${p.pnr}${p.from}${p.to}${p.flight.replace(/\s/g, "")}${p.seq}`;

  const form = (
    <>
      <FieldGroup title="Flight">
        <Row>
          <Input label="Airline" value={p.airline} onChange={(e) => s("airline", e.target.value)} />
          <Input label="Flight no." value={p.flight} onChange={(e) => s("flight", e.target.value.toUpperCase())} />
          <Input label="From (IATA)" value={p.from} onChange={(e) => s("from", e.target.value.toUpperCase())} maxLength={3} />
          <Input label="From city" value={p.fromCity} onChange={(e) => s("fromCity", e.target.value)} />
          <Input label="To (IATA)" value={p.to} onChange={(e) => s("to", e.target.value.toUpperCase())} maxLength={3} />
          <Input label="To city" value={p.toCity} onChange={(e) => s("toCity", e.target.value)} />
          <Input label="Date" type="date" value={p.date} onChange={(e) => s("date", e.target.value)} />
          <Input label="Terminal" value={p.terminal} onChange={(e) => s("terminal", e.target.value)} />
          <Input label="Departure" type="time" value={p.dep} onChange={(e) => s("dep", e.target.value)} />
          <Input label="Arrival" type="time" value={p.arr} onChange={(e) => s("arr", e.target.value)} />
          <Input label="Boarding time" type="time" value={p.boarding} onChange={(e) => s("boarding", e.target.value)} />
          <Input label="Gate" value={p.gate} onChange={(e) => s("gate", e.target.value.toUpperCase())} />
        </Row>
      </FieldGroup>
      <FieldGroup title="Passenger">
        <Row>
          <Input label="Passenger name" value={p.pax} onChange={(e) => s("pax", e.target.value.toUpperCase())} help="Format: SURNAME / FIRSTNAME TITLE" />
          <Input label="PNR" value={p.pnr} onChange={(e) => s("pnr", e.target.value.toUpperCase())} maxLength={6} />
          <Input label="Seat" value={p.seat} onChange={(e) => s("seat", e.target.value.toUpperCase())} />
          <Input label="Zone" value={p.zone} onChange={(e) => s("zone", e.target.value)} />
          <Select label="Class" value={p.cls} onChange={(e) => s("cls", e.target.value)} options={["Economy", "Premium Economy", "Business", "First"]} />
          <Input label="Sequence no." value={p.seq} onChange={(e) => s("seq", e.target.value)} />
          <Input label="Baggage allowance" value={p.bags} onChange={(e) => s("bags", e.target.value)} />
          <Select label="Colour" value={theme} onChange={(e) => setTheme(e.target.value)} options={[{ value: "#1e3a8a", label: "Blue" }, { value: "#1c1917", label: "Ink" }, { value: "#7f1d1d", label: "Red" }, { value: "#065f46", label: "Green" }, { value: "#c2410c", label: "Orange" }]} />
        </Row>
      </FieldGroup>
    </>
  );

  const preview = (
    <div style={{ width: 760, height: 300 }} className="flex overflow-hidden rounded-2xl border border-[#d6d3d1] bg-white text-[#1c1917]">
      <div className="flex w-[520px] flex-col">
        <div className="flex items-center justify-between px-6 py-3 text-white" style={{ background: theme }}>
          <div className="text-[16px] font-bold tracking-tight">{p.airline}</div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em]">Boarding pass · {p.cls}</div>
        </div>
        <div className="flex flex-1 flex-col justify-between px-6 py-4">
          <div className="flex items-center justify-between">
            <div><div className="text-[40px] font-black leading-none tracking-tight">{p.from}</div><div className="text-[11px] text-[#57534e]">{p.fromCity} · {fmtTime(p.dep)}</div></div>
            <div className="flex flex-col items-center text-[#78716c]"><svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" /></svg><div className="text-[10px]">{p.flight}</div></div>
            <div className="text-right"><div className="text-[40px] font-black leading-none tracking-tight">{p.to}</div><div className="text-[11px] text-[#57534e]">{p.toCity} · {fmtTime(p.arr)}</div></div>
          </div>
          <div className="grid grid-cols-5 gap-3">
            <Field k="Passenger" v={p.pax} />
            <Field k="Date" v={fmtDate(p.date)} />
            <Field k="Boarding" v={fmtTime(p.boarding)} />
            <Field k="Gate" v={p.gate} big />
            <Field k="Seat" v={p.seat} big />
          </div>
          <div className="flex items-end justify-between">
            <div className="grid grid-cols-4 gap-4"><Field k="PNR" v={p.pnr} /><Field k="Terminal" v={p.terminal} /><Field k="Zone" v={p.zone} /><Field k="Baggage" v={p.bags} /></div>
            <Barcode value={code} height={34} width={1.3} displayValue={false} margin={0} />
          </div>
        </div>
      </div>
      <div className="w-[240px] border-l-2 border-dashed border-[#d6d3d1] flex flex-col">
        <div className="px-5 py-3 text-white" style={{ background: theme }}><div className="text-[13px] font-bold">{p.airline}</div><div className="text-[9px] uppercase tracking-[0.2em] opacity-80">Stub · seq {p.seq}</div></div>
        <div className="flex flex-1 flex-col justify-between px-5 py-4">
          <div className="grid grid-cols-2 gap-x-3 gap-y-3"><Field k="Flight" v={p.flight} /><Field k="Date" v={fmtDate(p.date)} /><Field k="From" v={p.from} /><Field k="To" v={p.to} /><Field k="Seat" v={p.seat} big /><Field k="Gate" v={p.gate} big /></div>
          <div><div className="text-[8.5px] font-semibold uppercase tracking-[0.14em] opacity-70">Passenger</div><div className="truncate text-[11.5px] font-bold">{p.pax}</div><div className="text-[10px] text-[#57534e]">PNR {p.pnr} · Boards {fmtTime(p.boarding)}</div></div>
        </div>
      </div>
    </div>
  );

  return <DocumentShell form={form} preview={preview} paperWidth={760} pdfFormat="auto" filename={`boarding-pass-${p.pnr}`} pngExport formTitle="Boarding pass details" previewDescription="Mock boarding pass · for layouts & demos only" />;
}
