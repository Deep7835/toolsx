"use client";
import { useMemo, useRef, useState } from "react";
import { Copy, Code2, Check } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { FieldGroup, Input, Row, Select, Toggle } from "@/components/ui/Field";
import { LogoUpload } from "@/components/shell/LogoUpload";
import { Button } from "@/components/ui/Button";
import { CodeBlock } from "@/components/shell/TextOutput";
import { useToast } from "@/components/ui/Toast";

export default function EmailSignature() {
  const [p, setP] = useState({ name: "Ananya Krishnan", title: "Founder & Creative Director", company: "Studio Nine", phone: "+91 98765 43210", email: "ananya@studionine.in", website: "www.studionine.in", address: "Indiranagar, Bengaluru", linkedin: "", instagram: "", twitter: "", cta: "Book a free 20-min consult", ctaUrl: "", tagline: "Design that sells." });
  const [photo, setPhoto] = useState("");
  const [banner, setBanner] = useState("");
  const [accent, setAccent] = useState("#047857");
  const [layout, setLayout] = useState<"horizontal" | "stacked">("horizontal");
  const [showTagline, setShowTagline] = useState(true);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const toast = useToast();
  const s = (k: keyof typeof p, v: string) => setP({ ...p, [k]: v });

  const html = useMemo(() => {
    const links = [p.linkedin && `<a href="${p.linkedin}" style="color:${accent};text-decoration:none;font-size:12px">LinkedIn</a>`, p.instagram && `<a href="${p.instagram}" style="color:${accent};text-decoration:none;font-size:12px">Instagram</a>`, p.twitter && `<a href="${p.twitter}" style="color:${accent};text-decoration:none;font-size:12px">X</a>`].filter(Boolean).join('<span style="color:#a8a29e;margin:0 6px">·</span>');
    const photoCell = photo ? `<td style="padding-right:16px;vertical-align:top"><img src="${photo}" width="72" height="72" alt="" style="border-radius:${layout === "horizontal" ? "50%" : "12px"};display:block;object-fit:cover"></td>` : "";
    const body = `<td style="vertical-align:top;${layout === "horizontal" && photo ? `border-left:2px solid ${accent};padding-left:16px` : ""}">
  <div style="font-size:16px;font-weight:700;color:#1c1917">${p.name}</div>
  <div style="font-size:13px;color:#57534e">${p.title}${p.company ? ` · <span style="color:${accent};font-weight:600">${p.company}</span>` : ""}</div>
  ${showTagline && p.tagline ? `<div style="font-size:12px;color:#78716c;font-style:italic;margin-top:2px">${p.tagline}</div>` : ""}
  <div style="font-size:12px;color:#44403c;margin-top:8px;line-height:1.7">${[p.phone && `<a href="tel:${p.phone.replace(/\s/g, "")}" style="color:#44403c;text-decoration:none">${p.phone}</a>`, p.email && `<a href="mailto:${p.email}" style="color:#44403c;text-decoration:none">${p.email}</a>`, p.website && `<a href="https://${p.website.replace(/^https?:\/\//, "")}" style="color:${accent};text-decoration:none">${p.website}</a>`].filter(Boolean).join('<span style="color:#a8a29e;margin:0 6px">|</span>')}${p.address ? `<br>${p.address}` : ""}</div>
  ${links ? `<div style="margin-top:6px">${links}</div>` : ""}
  ${p.cta ? `<div style="margin-top:10px"><a href="${p.ctaUrl || "#"}" style="display:inline-block;background:${accent};color:#fff;font-size:12px;font-weight:600;padding:7px 12px;border-radius:6px;text-decoration:none">${p.cta}</a></div>` : ""}
</td>`;
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;color:#1c1917;max-width:560px"><tr>${layout === "horizontal" ? photoCell + body : ""}${layout === "stacked" ? `<td>${photo ? `<img src="${photo}" width="64" height="64" alt="" style="border-radius:12px;display:block;margin-bottom:10px;object-fit:cover">` : ""}<table cellpadding="0" cellspacing="0" border="0"><tr>${body}</tr></table></td>` : ""}</tr>${banner ? `<tr><td colspan="2" style="padding-top:12px"><img src="${banner}" width="560" alt="" style="display:block;max-width:100%;border-radius:8px"></td></tr>` : ""}</table>`;
  }, [p, photo, banner, accent, layout, showTagline]);

  const copyRich = async () => {
    try {
      const blob = new Blob([html], { type: "text/html" });
      await navigator.clipboard.write([new ClipboardItem({ "text/html": blob, "text/plain": new Blob([ref.current?.innerText ?? ""], { type: "text/plain" }) })]);
      setCopied(true); toast("Signature copied — paste into Gmail / Outlook settings"); setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback: select the rendered node
      const sel = window.getSelection(); const range = document.createRange();
      if (ref.current && sel) { range.selectNodeContents(ref.current); sel.removeAllRanges(); sel.addRange(range); document.execCommand("copy"); sel.removeAllRanges(); toast("Signature copied"); }
    }
  };

  return (
    <div className="grid gap-5 lg:grid-cols-12 items-start">
      <Card className="lg:col-span-5 min-w-0">
        <CardHeader title="Signature details" />
        <CardBody className="grid gap-6">
          <FieldGroup title="You">
            <Row><Input label="Full name" value={p.name} onChange={(e) => s("name", e.target.value)} /><Input label="Job title" value={p.title} onChange={(e) => s("title", e.target.value)} /><Input label="Company" value={p.company} onChange={(e) => s("company", e.target.value)} /><Input label="Tagline" value={p.tagline} onChange={(e) => s("tagline", e.target.value)} /></Row>
            <LogoUpload value={photo} onChange={setPhoto} label="Photo or logo" round />
          </FieldGroup>
          <FieldGroup title="Contact">
            <Row><Input label="Phone" value={p.phone} onChange={(e) => s("phone", e.target.value)} /><Input label="Email" value={p.email} onChange={(e) => s("email", e.target.value)} /><Input label="Website" value={p.website} onChange={(e) => s("website", e.target.value)} /><Input label="Address" value={p.address} onChange={(e) => s("address", e.target.value)} /></Row>
          </FieldGroup>
          <FieldGroup title="Social & CTA">
            <Row><Input label="LinkedIn URL" value={p.linkedin} onChange={(e) => s("linkedin", e.target.value)} /><Input label="Instagram URL" value={p.instagram} onChange={(e) => s("instagram", e.target.value)} /><Input label="X / Twitter URL" value={p.twitter} onChange={(e) => s("twitter", e.target.value)} /><Input label="CTA button text" value={p.cta} onChange={(e) => s("cta", e.target.value)} /><Input label="CTA link" value={p.ctaUrl} onChange={(e) => s("ctaUrl", e.target.value)} wrapClassName="sm:col-span-2" /></Row>
            <LogoUpload value={banner} onChange={setBanner} label="Banner image" hint="optional · 560px wide" />
          </FieldGroup>
          <FieldGroup title="Style">
            <Row><Select label="Layout" value={layout} onChange={(e) => setLayout(e.target.value as typeof layout)} options={[{ value: "horizontal", label: "Photo left" }, { value: "stacked", label: "Stacked" }]} /><Select label="Accent" value={accent} onChange={(e) => setAccent(e.target.value)} options={[{ value: "#047857", label: "Emerald" }, { value: "#1e3a8a", label: "Navy" }, { value: "#7c2d12", label: "Rust" }, { value: "#1c1917", label: "Ink" }, { value: "#6d28d9", label: "Violet" }]} /></Row>
            <Toggle checked={showTagline} onChange={setShowTagline} label="Show tagline" />
          </FieldGroup>
        </CardBody>
      </Card>
      <div className="grid gap-5 lg:col-span-7 min-w-0 lg:sticky lg:top-24">
        <Card>
          <CardHeader title="Preview" description="Exactly how it renders in Gmail, Outlook and Apple Mail." action={<Button size="sm" onClick={copyRich}>{copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} Copy signature</Button>} />
          <CardBody className="bg-white rounded-b-2xl"><div ref={ref} dangerouslySetInnerHTML={{ __html: html }} /></CardBody>
        </Card>
        <CodeBlock value={html} filename="signature.html" mime="text/html" label={<span className="inline-flex items-center gap-1.5"><Code2 className="h-3.5 w-3.5" /> HTML source</span>} wrap />
        <p className="text-xs text-muted leading-relaxed">Gmail: Settings → See all settings → Signature → paste. Outlook: Settings → Compose → Signatures → paste. Images are embedded as data URLs; for best deliverability host them on your website and replace the src.</p>
      </div>
    </div>
  );
}
