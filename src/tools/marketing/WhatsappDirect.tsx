"use client";
import { useState } from "react";
import { MessageCircle, Link2, Check } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { FieldGroup, Input, Select, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { QrOutput, QrStyleFields, useQrStyle } from "@/components/shell/QrOutput";
import { copyText } from "@/lib/export";
import { useToast } from "@/components/ui/Toast";

const TEMPLATES: Record<string, string> = {
  order: "Hi! I'd like to place an order.\nItem: \nQty: \nDelivery address: ",
  enquiry: "Hello, I saw your listing and would like to know more about ",
  quote: "Hi, please send me a quotation for ",
  support: "Hi, I need help with my order #",
  booking: "Hi, I'd like to book an appointment on ",
  custom: "",
};

export default function WhatsappDirect() {
  const [cc, setCc] = useState("91");
  const [phone, setPhone] = useState("9876543210");
  const [tpl, setTpl] = useState("order");
  const [msg, setMsg] = useState(TEMPLATES.order);
  const [copied, setCopied] = useState(false);
  const s = useQrStyle();
  const toast = useToast();
  const num = (cc + phone).replace(/\D/g, "");
  const link = num ? `https://wa.me/${num}${msg ? `?text=${encodeURIComponent(msg)}` : ""}` : "";
  const copy = async () => { await copyText(link); setCopied(true); toast("Link copied"); setTimeout(() => setCopied(false), 1500); };
  return (
    <div className="grid gap-5 lg:grid-cols-12 items-start">
      <Card className="lg:col-span-6 min-w-0">
        <CardHeader title="Chat link" description="Customers tap the link or scan the QR and land in a chat with you — no need to save your number." />
        <CardBody className="grid gap-6">
          <FieldGroup title="Your WhatsApp number">
            <div className="grid grid-cols-[110px_1fr] gap-3"><Input label="Country code" prefix="+" value={cc} onChange={(e) => setCc(e.target.value.replace(/\D/g, ""))} /><Input label="Phone number" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="98765 43210" /></div>
          </FieldGroup>
          <FieldGroup title="Pre-filled message">
            <Select label="Template" value={tpl} onChange={(e) => { setTpl(e.target.value); setMsg(TEMPLATES[e.target.value]); }} options={[{ value: "order", label: "Place an order" }, { value: "enquiry", label: "Product enquiry" }, { value: "quote", label: "Request a quote" }, { value: "support", label: "Order support" }, { value: "booking", label: "Book an appointment" }, { value: "custom", label: "Custom / none" }]} />
            <Textarea label="Message" rows={4} value={msg} onChange={(e) => setMsg(e.target.value)} help="Customers can edit this before sending." />
          </FieldGroup>
          <div className="rounded-xl border border-border bg-surface-2/60 p-3">
            <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">Your link</div>
            <div className="mt-1 break-all font-mono text-xs text-ink">{link || "Enter a phone number"}</div>
            <div className="mt-3 flex flex-wrap gap-2"><Button size="sm" onClick={copy} disabled={!link}>{copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />} Copy link</Button><Button size="sm" variant="whatsapp" onClick={() => window.open(link, "_blank", "noopener")} disabled={!link}><MessageCircle className="h-3.5 w-3.5" /> Test it</Button></div>
          </div>
          <FieldGroup title="QR style"><QrStyleFields s={s} /></FieldGroup>
        </CardBody>
      </Card>
      <div className="lg:col-span-6 min-w-0"><QrOutput text={link} style={s} filename={`whatsapp-${num}`} title="WhatsApp QR" caption="Scan to chat on WhatsApp" /></div>
    </div>
  );
}
