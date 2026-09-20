"use client";
import { useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { FieldGroup, Input, Select, Textarea } from "@/components/ui/Field";
import { QrOutput, QrStyleFields, useQrStyle } from "@/components/shell/QrOutput";

export default function UrlQr() {
  const [kind, setKind] = useState("url");
  const [url, setUrl] = useState("https://");
  const [text, setText] = useState("");
  const [sub, setSub] = useState({ phone: "", sms: "", email: "", subject: "", body: "" });
  const s = useQrStyle();
  const data = kind === "url" ? (url.trim() && url.trim() !== "https://" ? url.trim() : "") : kind === "text" ? text : kind === "tel" ? (sub.phone ? `tel:${sub.phone.replace(/\s/g, "")}` : "") : kind === "sms" ? (sub.phone ? `SMSTO:${sub.phone.replace(/\s/g, "")}:${sub.sms}` : "") : sub.email ? `mailto:${sub.email}?subject=${encodeURIComponent(sub.subject)}&body=${encodeURIComponent(sub.body)}` : "";
  return (
    <div className="grid gap-5 lg:grid-cols-12 items-start">
      <Card className="lg:col-span-6 min-w-0">
        <CardHeader title="QR content" />
        <CardBody className="grid gap-6">
          <FieldGroup title="Content">
            <Select label="Type" value={kind} onChange={(e) => setKind(e.target.value)} options={[{ value: "url", label: "Website / link" }, { value: "text", label: "Plain text" }, { value: "tel", label: "Phone number (tap to call)" }, { value: "sms", label: "SMS with message" }, { value: "email", label: "Email" }]} />
            {kind === "url" ? <Input label="URL" type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://yourstore.in/offers" help="Short URLs make smaller, easier-to-scan codes." /> : null}
            {kind === "text" ? <Textarea label="Text" rows={4} value={text} onChange={(e) => setText(e.target.value)} /> : null}
            {kind === "tel" || kind === "sms" ? <Input label="Phone number" type="tel" placeholder="+91 98765 43210" value={sub.phone} onChange={(e) => setSub({ ...sub, phone: e.target.value })} /> : null}
            {kind === "sms" ? <Textarea label="Message" rows={2} value={sub.sms} onChange={(e) => setSub({ ...sub, sms: e.target.value })} /> : null}
            {kind === "email" ? <><Input label="Email address" type="email" value={sub.email} onChange={(e) => setSub({ ...sub, email: e.target.value })} /><Input label="Subject" value={sub.subject} onChange={(e) => setSub({ ...sub, subject: e.target.value })} /><Textarea label="Body" rows={2} value={sub.body} onChange={(e) => setSub({ ...sub, body: e.target.value })} /></> : null}
          </FieldGroup>
          <FieldGroup title="Style"><QrStyleFields s={s} /></FieldGroup>
        </CardBody>
      </Card>
      <div className="lg:col-span-6 min-w-0"><QrOutput text={data} style={s} filename="qr-code" /></div>
    </div>
  );
}
