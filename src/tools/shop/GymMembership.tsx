"use client";
import { useState } from "react";
import { DocumentShell } from "@/components/shell/DocumentShell";
import { PAPER } from "@/components/shell/PaperPreview";
import { FieldGroup, Input, NumberInput, Row, Select } from "@/components/ui/Field";
import { LogoUpload } from "@/components/shell/LogoUpload";
import { Qr } from "@/components/shell/Qr";
import { useBusiness, BusinessFields } from "../shared/Business";
import { inr, fmtDate, todayISO, addDaysISO } from "@/lib/format";
import { Eyebrow, MetaTable, SimpleTable } from "../shared/doc";

export default function GymMembership() {
  const { business, logo } = useBusiness();
  const [photo, setPhoto] = useState("");
  const [m, setM] = useState({ name: "Rohit Malhotra", id: "GX-1042", phone: "98765 43210", plan: "Annual · Unlimited", start: todayISO(), months: 12, fee: 12000, joining: 500, discount: 0, trainer: "Personal training × 12", emergency: "", blood: "O+" });
  const s = (k: keyof typeof m, v: string | number) => setM({ ...m, [k]: v });
  const end = addDaysISO(m.start, Math.round(m.months * 30.44) - 1);
  const total = m.fee + m.joining - m.discount;

  const form = (
    <>
      <BusinessFields showGstin={false} title="Gym / studio" showTagline />
      <FieldGroup title="Member">
        <LogoUpload value={photo} onChange={setPhoto} label="Member photo" hint="optional" round />
        <Row>
          <Input label="Name" value={m.name} onChange={(e) => s("name", e.target.value)} />
          <Input label="Member ID" value={m.id} onChange={(e) => s("id", e.target.value)} />
          <Input label="Phone" value={m.phone} onChange={(e) => s("phone", e.target.value)} />
          <Select label="Blood group" value={m.blood} onChange={(e) => s("blood", e.target.value)} options={["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"]} />
        </Row>
        <Input label="Emergency contact" value={m.emergency} onChange={(e) => s("emergency", e.target.value)} />
      </FieldGroup>
      <FieldGroup title="Plan">
        <Row>
          <Input label="Plan name" value={m.plan} onChange={(e) => s("plan", e.target.value)} />
          <NumberInput label="Duration" suffix="months" value={m.months} onChange={(v) => s("months", v)} />
          <Input label="Start date" type="date" value={m.start} onChange={(e) => s("start", e.target.value)} />
          <Input label="Add-ons" value={m.trainer} onChange={(e) => s("trainer", e.target.value)} />
          <NumberInput label="Plan fee" prefix="₹" value={m.fee} onChange={(v) => s("fee", v)} />
          <NumberInput label="Joining fee" prefix="₹" value={m.joining} onChange={(v) => s("joining", v)} />
          <NumberInput label="Discount" prefix="₹" value={m.discount} onChange={(v) => s("discount", v)} />
        </Row>
      </FieldGroup>
    </>
  );

  const preview = (
    <div className="min-h-[1123px] p-12 text-[12.5px]">
      <div className="flex items-start justify-between border-b-2 border-[#1c1917] pb-5">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {logo ? <img src={logo} alt="" className="h-14 w-14 rounded-lg object-contain" /> : null}
          <div><div className="text-[24px] font-black uppercase tracking-tight">{business.name}</div>{business.tagline ? <div className="text-[11px] uppercase tracking-[0.2em] text-[#78716c]">{business.tagline}</div> : null}<div className="text-[#57534e]">{business.address} · {business.phone}</div></div>
        </div>
        <div className="text-right"><Eyebrow>Membership voucher</Eyebrow><div className="mt-1 text-[18px] font-semibold">{m.id}</div><div className="text-[#57534e]">{fmtDate(todayISO())}</div></div>
      </div>
      {/* card */}
      <div className="mt-8 flex justify-center">
        <div style={{ width: 420, height: 265 }} className="relative overflow-hidden rounded-2xl bg-[#1c1917] p-6 text-white">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/5" />
          <div className="flex items-start justify-between"><div className="text-[13px] font-black uppercase tracking-[0.2em]">{business.name}</div><div className="rounded-full bg-[#34d399] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#052e22]">Member</div></div>
          <div className="mt-6 flex items-center gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-white/30 bg-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {photo ? <img src={photo} alt="" className="h-full w-full object-cover" /> : null}
            </div>
            <div><div className="text-[20px] font-bold leading-tight">{m.name}</div><div className="text-[11px] opacity-70">{m.plan}</div></div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 text-[10px]">
            <div><div className="uppercase tracking-[0.14em] opacity-60">Member ID</div><div className="text-[13px] font-semibold">{m.id}</div></div>
            <div><div className="uppercase tracking-[0.14em] opacity-60">Valid from</div><div className="text-[13px] font-semibold">{fmtDate(m.start)}</div></div>
            <div><div className="uppercase tracking-[0.14em] opacity-60">Valid till</div><div className="text-[13px] font-semibold">{fmtDate(end)}</div></div>
          </div>
          <div className="absolute bottom-5 right-6 rounded-lg bg-white p-1"><Qr text={`MEMBER ${m.id} ${m.name} ${business.name} valid ${m.start} to ${end}`} size={48} opts={{ margin: 0 }} /></div>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-8">
        <div><Eyebrow>Member</Eyebrow><MetaTable rows={[["Phone", m.phone], ["Blood group", m.blood], m.emergency ? ["Emergency", m.emergency] : null]} /></div>
        <div><Eyebrow>Plan</Eyebrow><MetaTable rows={[["Plan", m.plan], ["Duration", `${m.months} months`], ["Validity", `${fmtDate(m.start)} – ${fmtDate(end)}`], m.trainer ? ["Add-ons", m.trainer] : null]} /></div>
      </div>
      <div className="mt-6"><SimpleTable head={["Description", "Amount"]} rows={[[`${m.plan} (${m.months} months)`, inr(m.fee)], ...(m.joining ? [["Joining / registration fee", inr(m.joining)]] : []), ...(m.discount ? [["Discount", `− ${inr(m.discount)}`]] : [])]} foot={[["Total paid", inr(total)]]} /></div>
      <div className="mt-8 border-t border-[#e7e5e4] pt-4 text-[11px] leading-relaxed text-[#57534e]">Membership is non-transferable and non-refundable. Please carry your member card or show the QR at the front desk. Freeze requests must be made in writing. Consult a physician before starting any exercise programme.</div>
      <div className="mt-10 flex justify-between text-[11px]"><div className="min-w-[160px] border-t border-[#a8a29e] pt-1.5">Member signature</div><div className="min-w-[160px] border-t border-[#a8a29e] pt-1.5 text-right">For {business.name}</div></div>
    </div>
  );

  return <DocumentShell form={form} preview={preview} paperWidth={PAPER.a4} filename={`gym-membership-${m.id}`} formTitle="Membership details" previewDescription="A4 voucher with member card" shareText={`Welcome to ${business.name}, ${m.name}!\nMember ID ${m.id} · ${m.plan}\nValid ${fmtDate(m.start)} – ${fmtDate(end)}\nTotal paid ${inr(total)}`} sharePhone={m.phone} />;
}
