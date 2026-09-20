"use client";
import { useState } from "react";
import { DocumentShell } from "@/components/shell/DocumentShell";
import { PAPER } from "@/components/shell/PaperPreview";
import { FieldGroup, Input, Row, Select, Textarea } from "@/components/ui/Field";
import { useBusiness, BusinessFields, LetterHead } from "../shared/Business";
import { fmtDate, todayISO } from "@/lib/format";

const ACCENTS = { Ink: "#1c1917", Emerald: "#047857", Navy: "#1e3a8a", Maroon: "#7f1d1d", Slate: "#334155" };

export default function Letterhead() {
  const { business, logo } = useBusiness();
  const [accent, setAccent] = useState("Ink");
  const [meta, setMeta] = useState({ cin: "", pan: "", udyam: "" });
  const [date, setDate] = useState(todayISO());
  const [ref, setRef] = useState("");
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [footer, setFooter] = useState("");
  const color = ACCENTS[accent as keyof typeof ACCENTS];

  const form = (
    <>
      <BusinessFields showWeb showTagline />
      <FieldGroup title="Registrations">
        <Row cols={3}>
          <Input label="CIN" hint="optional" value={meta.cin} onChange={(e) => setMeta({ ...meta, cin: e.target.value.toUpperCase() })} />
          <Input label="PAN" hint="optional" value={meta.pan} onChange={(e) => setMeta({ ...meta, pan: e.target.value.toUpperCase() })} />
          <Input label="Udyam no." hint="optional" value={meta.udyam} onChange={(e) => setMeta({ ...meta, udyam: e.target.value.toUpperCase() })} />
        </Row>
        <Select label="Accent colour" value={accent} onChange={(e) => setAccent(e.target.value)} options={Object.keys(ACCENTS)} />
        <Input label="Footer line" placeholder="e.g. Registered office · ISO 9001:2015 certified" value={footer} onChange={(e) => setFooter(e.target.value)} />
      </FieldGroup>
      <FieldGroup title="Letter content" aside={<span className="text-xs text-muted">leave blank for a blank letterhead</span>}>
        <Row>
          <Input label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <Input label="Reference no." value={ref} onChange={(e) => setRef(e.target.value)} />
        </Row>
        <Textarea label="To" rows={2} placeholder="Recipient name & address" value={to} onChange={(e) => setTo(e.target.value)} />
        <Input label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <Textarea label="Body" rows={6} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Dear Sir/Madam, …" />
      </FieldGroup>
    </>
  );

  const preview = (
    <div className="relative min-h-[1123px] flex flex-col p-12 text-[12.5px] leading-relaxed">
      <div className="absolute inset-x-0 top-0 h-2" style={{ background: color }} />
      <LetterHead business={business} logo={logo} accent={color} />
      {(meta.cin || meta.pan || meta.udyam) ? <div className="mt-2 flex gap-4 text-[10.5px] text-[#78716c]">{meta.cin ? <span>CIN {meta.cin}</span> : null}{meta.pan ? <span>PAN {meta.pan}</span> : null}{meta.udyam ? <span>Udyam {meta.udyam}</span> : null}</div> : null}
      <div className="mt-10 flex-1">
        {(date || ref) ? <div className="flex justify-between text-[#57534e]"><span>{ref ? `Ref: ${ref}` : ""}</span><span>{fmtDate(date, "long")}</span></div> : null}
        {to ? <div className="mt-6 whitespace-pre-line">{to}</div> : null}
        {subject ? <div className="mt-6 font-semibold">Subject: {subject}</div> : null}
        {body ? <div className="mt-4 whitespace-pre-line">{body}</div> : null}
        {body ? <div className="mt-10">Yours sincerely,<div className="mt-12 font-semibold">For {business.name}</div><div className="text-[#57534e]">Authorised signatory</div></div> : null}
      </div>
      <div className="mt-8 border-t pt-3 text-center text-[10.5px] text-[#78716c]" style={{ borderColor: color }}>{footer || [business.address?.replace(/\n/g, ", "), business.phone, business.email, business.website].filter(Boolean).join("  ·  ")}</div>
    </div>
  );

  return <DocumentShell form={form} preview={preview} paperWidth={PAPER.a4} filename={`letterhead-${business.name.replace(/\s+/g, "-")}`} formTitle="Letterhead details" previewDescription="A4 · print blank or with letter content" />;
}
