"use client";
import { useState } from "react";
import { DocumentShell } from "@/components/shell/DocumentShell";
import { PAPER } from "@/components/shell/PaperPreview";
import { FieldGroup, Input, Row, Select, Textarea } from "@/components/ui/Field";
import { LogoUpload } from "@/components/shell/LogoUpload";
import { useBusiness, BusinessFields } from "../shared/Business";
import { Qr } from "@/components/shell/Qr";
import { fmtDate } from "@/lib/format";

const THEMES = { Ink: "#1c1917", Emerald: "#047857", Navy: "#1e3a8a", Maroon: "#7f1d1d", Orange: "#c2410c" };

export default function StaffIdCard() {
  const { business, logo } = useBusiness();
  const [photo, setPhoto] = useState("");
  const [e, setE] = useState({ name: "Neha Gupta", id: "EMP-042", designation: "Senior Accountant", dept: "Finance", phone: "98765 43210", blood: "B+", doj: "2022-06-01", valid: "2027-03-31", emergency: "Rahul Gupta · 98765 00000", address: "" });
  const [theme, setTheme] = useState("Ink");
  const color = THEMES[theme as keyof typeof THEMES];
  const W = PAPER.idCard, H = Math.round(W * 1.586);
  const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:${e.name}\nORG:${business.name}\nTITLE:${e.designation}\nTEL:${e.phone}\nNOTE:Employee ID ${e.id}\nEND:VCARD`;

  const form = (
    <>
      <BusinessFields showGstin={false} />
      <FieldGroup title="Employee">
        <LogoUpload value={photo} onChange={setPhoto} label="Photo" hint="passport style" />
        <Row>
          <Input label="Full name" value={e.name} onChange={(x) => setE({ ...e, name: x.target.value })} />
          <Input label="Employee ID" value={e.id} onChange={(x) => setE({ ...e, id: x.target.value })} />
          <Input label="Designation" value={e.designation} onChange={(x) => setE({ ...e, designation: x.target.value })} />
          <Input label="Department" value={e.dept} onChange={(x) => setE({ ...e, dept: x.target.value })} />
          <Input label="Phone" type="tel" value={e.phone} onChange={(x) => setE({ ...e, phone: x.target.value })} />
          <Select label="Blood group" value={e.blood} onChange={(x) => setE({ ...e, blood: x.target.value })} options={["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"]} />
          <Input label="Date of joining" type="date" value={e.doj} onChange={(x) => setE({ ...e, doj: x.target.value })} />
          <Input label="Valid till" type="date" value={e.valid} onChange={(x) => setE({ ...e, valid: x.target.value })} />
        </Row>
        <Input label="Emergency contact" value={e.emergency} onChange={(x) => setE({ ...e, emergency: x.target.value })} />
        <Textarea label="Address (back side)" rows={2} value={e.address} onChange={(x) => setE({ ...e, address: x.target.value })} />
        <Select label="Card colour" value={theme} onChange={(x) => setTheme(x.target.value)} options={Object.keys(THEMES)} />
      </FieldGroup>
    </>
  );

  const preview = (
    <div className="flex gap-6 p-6" style={{ width: W * 2 + 72 }}>
      {/* Front */}
      <div style={{ width: W, height: H, background: "#fff" }} className="relative overflow-hidden rounded-2xl border border-[#d6d3d1] text-center">
        <div className="absolute inset-x-0 top-0 h-[38%]" style={{ background: color }} />
        <div className="relative flex h-full flex-col items-center px-5 pt-5">
          <div className="flex items-center gap-2 text-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {logo ? <img src={logo} alt="" className="h-7 w-7 rounded bg-white object-contain p-0.5" /> : null}
            <span className="text-[13px] font-semibold tracking-tight">{business.name}</span>
          </div>
          <div className="mt-5 h-[124px] w-[104px] overflow-hidden rounded-xl border-4 border-white bg-[#f5f5f4] shadow">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {photo ? <img src={photo} alt="" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-[10px] text-[#a8a29e]">Photo</div>}
          </div>
          <div className="mt-3 text-[17px] font-bold leading-tight">{e.name}</div>
          <div className="text-[11px] font-medium" style={{ color }}>{e.designation}</div>
          <div className="text-[10px] text-[#78716c]">{e.dept}</div>
          <div className="mt-3 grid w-full grid-cols-2 gap-x-3 gap-y-1 text-left text-[10px]">
            <div><div className="text-[8px] uppercase tracking-[0.12em] text-[#78716c]">Emp ID</div><div className="font-semibold">{e.id}</div></div>
            <div><div className="text-[8px] uppercase tracking-[0.12em] text-[#78716c]">Blood group</div><div className="font-semibold text-[#b91c1c]">{e.blood}</div></div>
            <div><div className="text-[8px] uppercase tracking-[0.12em] text-[#78716c]">Joined</div><div className="font-semibold">{fmtDate(e.doj)}</div></div>
            <div><div className="text-[8px] uppercase tracking-[0.12em] text-[#78716c]">Valid till</div><div className="font-semibold">{fmtDate(e.valid)}</div></div>
          </div>
          <div className="mt-auto mb-3 h-1.5 w-16 rounded-full" style={{ background: color }} />
        </div>
      </div>
      {/* Back */}
      <div style={{ width: W, height: H, background: "#fff" }} className="relative overflow-hidden rounded-2xl border border-[#d6d3d1]">
        <div className="absolute inset-x-0 top-0 h-3" style={{ background: color }} />
        <div className="flex h-full flex-col px-5 pt-8 text-[10px]">
          <div className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#78716c]">Emergency contact</div>
          <div className="font-semibold">{e.emergency || "—"}</div>
          <div className="mt-3 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#78716c]">Employee phone</div>
          <div className="font-semibold">{e.phone}</div>
          {e.address ? <><div className="mt-3 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#78716c]">Address</div><div className="whitespace-pre-line">{e.address}</div></> : null}
          <div className="mt-4 flex items-center justify-center"><Qr text={vcard} size={92} opts={{ margin: 0 }} /></div>
          <div className="mt-1 text-center text-[8px] text-[#78716c]">Scan to save contact</div>
          <div className="mt-auto mb-4 border-t border-[#e7e5e4] pt-2 text-[8.5px] leading-snug text-[#57534e]">
            This card is the property of {business.name}. If found, please return to: {business.address?.replace(/\n/g, ", ")}{business.phone ? ` · ${business.phone}` : ""}.
          </div>
        </div>
      </div>
    </div>
  );

  return <DocumentShell form={form} preview={preview} paperWidth={W * 2 + 72} pdfFormat="auto" filename={`id-card-${e.id}`} pngExport formTitle="ID card details" previewDescription="CR80 card · front & back · 85.6 × 54 mm" />;
}
