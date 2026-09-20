"use client";
import { useState } from "react";
import { DocumentShell } from "@/components/shell/DocumentShell";
import { FieldGroup, Input, NumberInput, Row, Select } from "@/components/ui/Field";
import { Qr } from "@/components/shell/Qr";
import { inr, fmtDate, fmtTime, todayISO } from "@/lib/format";

export default function MovieTicket() {
  const [t, setT] = useState({ cinema: "Galaxy Cinemas", location: "Phoenix Mall, Lower Parel, Mumbai", movie: "Sholay (Re-release)", lang: "Hindi", format: "2D", cert: "U/A", date: todayISO(), time: "19:30", screen: "Audi 3", seats: "F12, F13", tickets: 2, price: 250, fee: 30, booking: "GX-8823417", rating: "★★★★☆" });
  const [theme, setTheme] = useState("#7f1d1d");
  const s = (k: keyof typeof t, v: string | number) => setT({ ...t, [k]: v });
  const total = t.tickets * t.price + t.fee;

  const form = (
    <>
      <FieldGroup title="Show">
        <Row>
          <Input label="Cinema" value={t.cinema} onChange={(e) => s("cinema", e.target.value)} />
          <Input label="Location" value={t.location} onChange={(e) => s("location", e.target.value)} />
          <Input label="Movie" value={t.movie} onChange={(e) => s("movie", e.target.value)} />
          <Input label="Language" value={t.lang} onChange={(e) => s("lang", e.target.value)} />
          <Select label="Format" value={t.format} onChange={(e) => s("format", e.target.value)} options={["2D", "3D", "IMAX", "4DX", "Dolby Atmos"]} />
          <Select label="Certificate" value={t.cert} onChange={(e) => s("cert", e.target.value)} options={["U", "U/A", "A", "S"]} />
          <Input label="Date" type="date" value={t.date} onChange={(e) => s("date", e.target.value)} />
          <Input label="Show time" type="time" value={t.time} onChange={(e) => s("time", e.target.value)} />
          <Input label="Screen" value={t.screen} onChange={(e) => s("screen", e.target.value)} />
          <Input label="Seats" value={t.seats} onChange={(e) => s("seats", e.target.value)} />
        </Row>
      </FieldGroup>
      <FieldGroup title="Booking">
        <Row>
          <Input label="Booking ID" value={t.booking} onChange={(e) => s("booking", e.target.value)} />
          <NumberInput label="Tickets" value={t.tickets} onChange={(v) => s("tickets", v)} />
          <NumberInput label="Price per ticket" prefix="₹" value={t.price} onChange={(v) => s("price", v)} />
          <NumberInput label="Convenience fee" prefix="₹" value={t.fee} onChange={(v) => s("fee", v)} />
          <Select label="Colour" value={theme} onChange={(e) => setTheme(e.target.value)} options={[{ value: "#7f1d1d", label: "Maroon" }, { value: "#1c1917", label: "Ink" }, { value: "#312e81", label: "Indigo" }, { value: "#065f46", label: "Green" }]} />
        </Row>
      </FieldGroup>
    </>
  );

  const preview = (
    <div style={{ width: 720, height: 280 }} className="flex overflow-hidden rounded-2xl bg-white text-[#1c1917] border border-[#d6d3d1]">
      <div className="relative flex w-[500px] flex-col justify-between p-6 text-white" style={{ background: theme }}>
        <div className="flex items-start justify-between">
          <div><div className="text-[10px] font-semibold uppercase tracking-[0.24em] opacity-80">{t.cinema}</div><div className="text-[9.5px] opacity-70">{t.location}</div></div>
          <div className="rounded-full border border-white/40 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider">{t.cert} · {t.format}</div>
        </div>
        <div>
          <div className="font-display text-[34px] leading-none">{t.movie}</div>
          <div className="mt-1 text-[11px] opacity-80">{t.lang} · {t.format} · {t.rating}</div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[["Date", fmtDate(t.date)], ["Time", fmtTime(t.time)], ["Screen", t.screen], ["Seats", t.seats]].map(([k, v]) => <div key={k}><div className="text-[8.5px] font-semibold uppercase tracking-[0.14em] opacity-70">{k}</div><div className="text-[14px] font-bold leading-tight">{v}</div></div>)}
        </div>
        <div className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-white" />
      </div>
      <div className="relative flex flex-1 flex-col items-center justify-between border-l-2 border-dashed border-[#d6d3d1] p-5 text-center">
        <div className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-white" />
        <div><div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#78716c]">Booking ID</div><div className="font-mono text-[13px] font-bold">{t.booking}</div></div>
        <Qr text={`${t.booking} ${t.movie} ${t.date} ${t.time} ${t.screen} ${t.seats}`} size={96} opts={{ margin: 0 }} />
        <div className="text-[10.5px] text-[#57534e]"><div>{t.tickets} × {inr(t.price, { decimals: 0 })} + fee {inr(t.fee, { decimals: 0 })}</div><div className="text-[14px] font-bold text-[#1c1917] tabular">{inr(total, { decimals: 0 })}</div></div>
      </div>
    </div>
  );

  return <DocumentShell form={form} preview={preview} paperWidth={720} pdfFormat="auto" filename={`movie-ticket-${t.booking}`} pngExport formTitle="Ticket details" previewDescription="Mock cinema ticket · for layouts & demos only" />;
}
