"use client";
import { useState } from "react";
import { DocumentShell } from "@/components/shell/DocumentShell";
import { PAPER } from "@/components/shell/PaperPreview";
import { FieldGroup, Input, NumberInput, Row, Select, Textarea } from "@/components/ui/Field";
import { Qr } from "@/components/shell/Qr";
import { inr, fmtDate, todayISO, addDaysISO } from "@/lib/format";
import { Eyebrow, MetaTable, SimpleTable } from "../shared/doc";

export default function HotelVoucher() {
  const [hotel, setHotel] = useState({ name: "The Lakeview Residency", address: "MG Road, Udaipur, Rajasthan 313001", phone: "0294 250 1234", email: "stay@lakeview.example", gstin: "" });
  const [guest, setGuest] = useState({ name: "Amit & Priya Sharma", phone: "98765 43210", email: "", adults: 2, children: 0, idType: "Aadhaar" });
  const [booking, setBooking] = useState({ id: "LV-20260921-118", date: todayISO(), checkIn: addDaysISO(todayISO(), 7), checkOut: addDaysISO(todayISO(), 9), room: "Deluxe Lake View", rooms: 1, plan: "Breakfast included", rate: 4500, gst: 5, extras: 0, advance: 2000, status: "Confirmed" });
  const [policy, setPolicy] = useState("Check-in 2:00 PM · Check-out 11:00 AM. Government ID required at check-in. Free cancellation up to 48 hours before arrival.");
  const nights = Math.max(1, Math.round((new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / 86400000));
  const roomTotal = booking.rate * nights * booking.rooms;
  const gstAmt = ((roomTotal + booking.extras) * booking.gst) / 100;
  const total = roomTotal + booking.extras + gstAmt;
  const due = Math.max(0, total - booking.advance);

  const form = (
    <>
      <FieldGroup title="Hotel">
        <Input label="Hotel name" value={hotel.name} onChange={(e) => setHotel({ ...hotel, name: e.target.value })} />
        <Input label="Address" value={hotel.address} onChange={(e) => setHotel({ ...hotel, address: e.target.value })} />
        <Row cols={3}><Input label="Phone" value={hotel.phone} onChange={(e) => setHotel({ ...hotel, phone: e.target.value })} /><Input label="Email" value={hotel.email} onChange={(e) => setHotel({ ...hotel, email: e.target.value })} /><Input label="GSTIN" hint="optional" value={hotel.gstin} onChange={(e) => setHotel({ ...hotel, gstin: e.target.value.toUpperCase() })} /></Row>
      </FieldGroup>
      <FieldGroup title="Guest">
        <Row><Input label="Guest name(s)" value={guest.name} onChange={(e) => setGuest({ ...guest, name: e.target.value })} /><Input label="Phone" value={guest.phone} onChange={(e) => setGuest({ ...guest, phone: e.target.value })} /><NumberInput label="Adults" value={guest.adults} onChange={(v) => setGuest({ ...guest, adults: v })} /><NumberInput label="Children" value={guest.children} onChange={(v) => setGuest({ ...guest, children: v })} /></Row>
      </FieldGroup>
      <FieldGroup title="Booking">
        <Row>
          <Input label="Booking ID" value={booking.id} onChange={(e) => setBooking({ ...booking, id: e.target.value })} />
          <Select label="Status" value={booking.status} onChange={(e) => setBooking({ ...booking, status: e.target.value })} options={["Confirmed", "Pending payment", "Checked in", "Checked out", "Cancelled"]} />
          <Input label="Check-in" type="date" value={booking.checkIn} onChange={(e) => setBooking({ ...booking, checkIn: e.target.value })} />
          <Input label="Check-out" type="date" value={booking.checkOut} onChange={(e) => setBooking({ ...booking, checkOut: e.target.value })} />
          <Input label="Room type" value={booking.room} onChange={(e) => setBooking({ ...booking, room: e.target.value })} />
          <NumberInput label="No. of rooms" value={booking.rooms} onChange={(v) => setBooking({ ...booking, rooms: v })} />
          <Input label="Meal plan" value={booking.plan} onChange={(e) => setBooking({ ...booking, plan: e.target.value })} />
          <NumberInput label="Rate per night" prefix="₹" value={booking.rate} onChange={(v) => setBooking({ ...booking, rate: v })} />
          <NumberInput label="Extras" hint="airport pickup, etc." prefix="₹" value={booking.extras} onChange={(v) => setBooking({ ...booking, extras: v })} />
          <Select label="GST" value={String(booking.gst)} onChange={(e) => setBooking({ ...booking, gst: parseFloat(e.target.value) })} options={[{ value: "5", label: "5% (room ≤ ₹7,500/night)" }, { value: "18", label: "18% (room > ₹7,500/night)" }, { value: "0", label: "0% (exempt)" }]} />
          <NumberInput label="Advance paid" prefix="₹" value={booking.advance} onChange={(v) => setBooking({ ...booking, advance: v })} />
        </Row>
        <Textarea label="Policy" rows={2} value={policy} onChange={(e) => setPolicy(e.target.value)} />
      </FieldGroup>
    </>
  );

  const preview = (
    <div className="min-h-[1123px] p-12 text-[12.5px]">
      <div className="flex items-start justify-between border-b-2 border-[#1c1917] pb-5">
        <div><div className="font-display text-[26px]">{hotel.name}</div><div className="text-[#57534e]">{hotel.address}</div><div className="text-[#57534e]">{[hotel.phone, hotel.email].filter(Boolean).join(" · ")}</div>{hotel.gstin ? <div>GSTIN {hotel.gstin}</div> : null}</div>
        <div className="text-right"><Eyebrow>Booking voucher</Eyebrow><div className="mt-1 text-[18px] font-semibold">{booking.id}</div><div className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider ${booking.status === "Cancelled" ? "bg-[#fee2e2] text-[#b91c1c]" : "bg-[#d1fae5] text-[#065f46]"}`}>{booking.status}</div></div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        {[["Check-in", fmtDate(booking.checkIn, "long"), "from 2:00 PM"], ["Nights", `${nights}`, `${booking.rooms} room${booking.rooms > 1 ? "s" : ""}`], ["Check-out", fmtDate(booking.checkOut, "long"), "by 11:00 AM"]].map(([k, v, s]) => <div key={k} className="rounded-xl border border-[#e7e5e4] p-4"><div className="text-[10px] uppercase tracking-[0.14em] text-[#78716c]">{k}</div><div className="mt-1 text-[16px] font-semibold">{v}</div><div className="text-[11px] text-[#78716c]">{s}</div></div>)}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-8">
        <div><Eyebrow>Guest</Eyebrow><div className="mt-1 text-[14px] font-semibold">{guest.name}</div><div className="text-[#57534e]">{guest.phone}</div><div className="text-[#57534e]">{guest.adults} adult{guest.adults !== 1 ? "s" : ""}{guest.children ? `, ${guest.children} child${guest.children !== 1 ? "ren" : ""}` : ""}</div></div>
        <div><Eyebrow>Stay</Eyebrow><MetaTable rows={[["Room", booking.room], ["Meal plan", booking.plan], ["Booked on", fmtDate(booking.date)]]} /></div>
      </div>
      <div className="mt-6"><SimpleTable head={["Description", "Amount"]} rows={[[`${booking.room} × ${nights} night${nights > 1 ? "s" : ""} × ${booking.rooms} room${booking.rooms > 1 ? "s" : ""} @ ${inr(booking.rate, { decimals: 0 })}`, inr(roomTotal)], ...(booking.extras ? [["Extras & services", inr(booking.extras)]] : [])]} foot={[[`GST @ ${booking.gst}%`, inr(gstAmt)], ["Total", inr(total)], ["Advance paid", `− ${inr(booking.advance)}`], ["Balance at check-out", inr(due)]]} /></div>
      <div className="mt-8 flex items-start justify-between gap-8 border-t border-[#e7e5e4] pt-6">
        <div className="max-w-[60%] text-[11.5px] leading-relaxed text-[#57534e] whitespace-pre-line">{policy}</div>
        <div className="flex items-center gap-3"><Qr text={`Booking ${booking.id} · ${guest.name} · ${hotel.name} · ${booking.checkIn} to ${booking.checkOut}`} size={84} opts={{ margin: 0 }} /><div className="text-[10.5px] text-[#78716c]">Show this QR<br />at reception</div></div>
      </div>
    </div>
  );

  return <DocumentShell form={form} preview={preview} paperWidth={PAPER.a4} filename={`hotel-voucher-${booking.id}`} formTitle="Voucher details" previewDescription="A4 booking voucher" shareText={`${hotel.name} — booking ${booking.id} (${booking.status})\nGuest: ${guest.name}\n${fmtDate(booking.checkIn)} → ${fmtDate(booking.checkOut)} · ${nights} night(s) · ${booking.room}\nTotal ${inr(total)} · Advance ${inr(booking.advance)} · Balance ${inr(due)}`} sharePhone={guest.phone} />;
}
