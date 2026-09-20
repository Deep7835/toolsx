"use client";
import { useState } from "react";
import { MessageCircle, Copy, Check, Star } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { FieldGroup, Input, Select, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { QrOutput, QrStyleFields, useQrStyle } from "@/components/shell/QrOutput";
import { copyText, shareWhatsApp } from "@/lib/export";
import { useToast } from "@/components/ui/Toast";
import { useBusiness } from "../shared/Business";

const TONES: Record<string, (b: string, n: string, link: string) => string> = {
  warm: (b, n, l) => `Hi ${n || "there"}! 😊 Thank you for choosing ${b}. It was a pleasure serving you.\n\nIf you have a minute, we'd be grateful for a quick Google review — it really helps a small business like ours grow:\n${l}\n\nThank you so much!`,
  short: (b, n, l) => `Hi ${n || "there"}, thanks for visiting ${b}! Could you leave us a quick Google review? ${l}\nIt takes 30 seconds and means a lot 🙏`,
  formal: (b, n, l) => `Dear ${n || "Customer"},\n\nThank you for your recent purchase from ${b}. We hope you are satisfied with our service.\n\nWe would appreciate it if you could share your feedback on Google: ${l}\n\nWarm regards,\n${b}`,
  hindi: (b, n, l) => `Namaste ${n || "ji"}! 🙏 ${b} choose karne ke liye dhanyavaad.\n\nAgar aapko hamari service pasand aayi ho, toh kripya ek chhota sa Google review de dijiye — isse humein bahut madad milti hai:\n${l}\n\nShukriya!`,
};

export default function GoogleReview() {
  const { business } = useBusiness();
  const [placeId, setPlaceId] = useState("");
  const [link, setLink] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [tone, setTone] = useState("warm");
  const [custom, setCustom] = useState("");
  const [copied, setCopied] = useState(false);
  const s = useQrStyle();
  const toast = useToast();
  const reviewUrl = link.trim() || (placeId.trim() ? `https://search.google.com/local/writereview?placeid=${placeId.trim()}` : "");
  const message = custom || TONES[tone](business.name, name, reviewUrl || "[your review link]");
  const copy = async () => { await copyText(message); setCopied(true); toast("Message copied"); setTimeout(() => setCopied(false), 1500); };
  return (
    <div className="grid gap-5 lg:grid-cols-12 items-start">
      <Card className="lg:col-span-6 min-w-0">
        <CardHeader title="Review request" icon={<Star className="h-4 w-4" strokeWidth={2} />} />
        <CardBody className="grid gap-6">
          <FieldGroup title="Google Business Profile">
            <Input label="Review link" placeholder="https://g.page/r/…/review" value={link} onChange={(e) => setLink(e.target.value)} help="Google Business Profile → Ask for reviews → copy link." />
            <Input label="…or Place ID" placeholder="ChIJ…" value={placeId} onChange={(e) => setPlaceId(e.target.value)} help="Find it with Google's Place ID finder. Builds a direct ‘write a review’ link." />
          </FieldGroup>
          <FieldGroup title="Message">
            <div className="grid grid-cols-2 gap-4"><Input label="Customer name" hint="optional" value={name} onChange={(e) => setName(e.target.value)} /><Input label="Customer WhatsApp" hint="optional" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
            <Select label="Tone" value={tone} onChange={(e) => { setTone(e.target.value); setCustom(""); }} options={[{ value: "warm", label: "Warm & friendly" }, { value: "short", label: "Short & casual" }, { value: "formal", label: "Formal" }, { value: "hindi", label: "Hinglish" }]} />
            <Textarea label="Edit message" rows={7} value={message} onChange={(e) => setCustom(e.target.value)} />
            <div className="flex flex-wrap gap-2"><Button onClick={copy}>{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} Copy message</Button><Button variant="whatsapp" onClick={() => shareWhatsApp(message, phone)}><MessageCircle className="h-4 w-4" /> Send on WhatsApp</Button></div>
          </FieldGroup>
          <FieldGroup title="QR style"><QrStyleFields s={s} /></FieldGroup>
        </CardBody>
      </Card>
      <div className="lg:col-span-6 min-w-0"><QrOutput text={reviewUrl} style={s} filename="google-review-qr" title="Review QR for your counter" description="Print this next to the billing counter — customers scan and land on the review form." caption={reviewUrl ? `Rate ${business.name} on Google` : undefined} /></div>
    </div>
  );
}
