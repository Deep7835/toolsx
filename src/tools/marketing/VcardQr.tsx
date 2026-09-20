"use client";
import { useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { FieldGroup, Input, Row, Textarea } from "@/components/ui/Field";
import { QrOutput, QrStyleFields, useQrStyle } from "@/components/shell/QrOutput";
import { downloadText } from "@/lib/export";
import { Button } from "@/components/ui/Button";
import { Contact } from "lucide-react";

export default function VcardQr() {
  const [c, setC] = useState({ first: "Ananya", last: "Krishnan", org: "Studio Nine", title: "Founder", phone: "+91 98765 43210", work: "", email: "ananya@studionine.in", website: "https://studionine.in", address: "Indiranagar, Bengaluru 560038", note: "" });
  const s = useQrStyle();
  const set = (k: keyof typeof c, v: string) => setC({ ...c, [k]: v });
  const esc = (v: string) => v.replace(/[,;]/g, (m) => `\\${m}`);
  const vcard = [
    "BEGIN:VCARD", "VERSION:3.0", `N:${esc(c.last)};${esc(c.first)};;;`, `FN:${esc(`${c.first} ${c.last}`.trim())}`,
    c.org && `ORG:${esc(c.org)}`, c.title && `TITLE:${esc(c.title)}`, c.phone && `TEL;TYPE=CELL:${c.phone.replace(/\s/g, "")}`, c.work && `TEL;TYPE=WORK:${c.work.replace(/\s/g, "")}`,
    c.email && `EMAIL:${c.email}`, c.website && `URL:${c.website}`, c.address && `ADR;TYPE=WORK:;;${esc(c.address)};;;;`, c.note && `NOTE:${esc(c.note)}`, "END:VCARD",
  ].filter(Boolean).join("\n");
  return (
    <div className="grid gap-5 lg:grid-cols-12 items-start">
      <Card className="lg:col-span-6 min-w-0">
        <CardHeader title="Contact details" description="Scanning opens ‘Add contact’ on any iPhone or Android." />
        <CardBody className="grid gap-6">
          <FieldGroup title="Person">
            <Row><Input label="First name" value={c.first} onChange={(e) => set("first", e.target.value)} /><Input label="Last name" value={c.last} onChange={(e) => set("last", e.target.value)} /><Input label="Company" value={c.org} onChange={(e) => set("org", e.target.value)} /><Input label="Job title" value={c.title} onChange={(e) => set("title", e.target.value)} /></Row>
          </FieldGroup>
          <FieldGroup title="Contact">
            <Row><Input label="Mobile" type="tel" value={c.phone} onChange={(e) => set("phone", e.target.value)} /><Input label="Work phone" type="tel" value={c.work} onChange={(e) => set("work", e.target.value)} /><Input label="Email" type="email" value={c.email} onChange={(e) => set("email", e.target.value)} /><Input label="Website" value={c.website} onChange={(e) => set("website", e.target.value)} /></Row>
            <Input label="Address" value={c.address} onChange={(e) => set("address", e.target.value)} />
            <Textarea label="Note" rows={2} value={c.note} onChange={(e) => set("note", e.target.value)} />
          </FieldGroup>
          <FieldGroup title="Style"><QrStyleFields s={s} /></FieldGroup>
        </CardBody>
      </Card>
      <div className="lg:col-span-6 min-w-0"><QrOutput text={vcard} style={s} filename={`vcard-${c.first}-${c.last}`.toLowerCase()} title="Contact QR" caption={`${c.first} ${c.last} · ${c.org}`} extra={<Button variant="ghost" onClick={() => downloadText(vcard, `${c.first}-${c.last}.vcf`, "text/vcard")}><Contact className="h-4 w-4" /> .vcf file</Button>} /></div>
    </div>
  );
}
