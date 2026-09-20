"use client";
import { useState } from "react";
import { DocumentShell } from "@/components/shell/DocumentShell";
import { PAPER } from "@/components/shell/PaperPreview";
import { FieldGroup, Input, Row, Select, Textarea } from "@/components/ui/Field";
import { useBusiness, BusinessFields } from "../shared/Business";
import { fmtDate, todayISO } from "@/lib/format";
import { Qr } from "@/components/shell/Qr";

const PALETTES = { Emerald: ["#065f46", "#d1fae5"], Navy: ["#1e3a8a", "#dbeafe"], Gold: ["#92400e", "#fef3c7"], Ink: ["#1c1917", "#e7e5e4"], Maroon: ["#7f1d1d", "#fee2e2"] };

export interface CertificateConfig {
  kind: "award" | "internship";
  defaultTitle: string;
  defaultSubtitle: string;
  defaultBody: string;
}

export default function Certificate({ config }: { config: CertificateConfig }) {
  const { business, logo } = useBusiness();
  const [title, setTitle] = useState(config.defaultTitle);
  const [subtitle, setSubtitle] = useState(config.defaultSubtitle);
  const [recipient, setRecipient] = useState("Arjun Nair");
  const [body, setBody] = useState(config.defaultBody);
  const [project, setProject] = useState(config.kind === "internship" ? "Inventory Analytics Dashboard" : "");
  const [from, setFrom] = useState("2026-01-06");
  const [to, setTo] = useState("2026-04-03");
  const [date, setDate] = useState(todayISO());
  const [certNo, setCertNo] = useState(`CERT-${new Date().getFullYear()}-0042`);
  const [palette, setPalette] = useState("Emerald");
  const [signers, setSigners] = useState([{ name: "Rajesh Mehta", title: "Director" }, { name: "", title: "" }]);
  const [dark, light] = PALETTES[palette as keyof typeof PALETTES];
  const bodyText = body.replace("{project}", project).replace("{from}", fmtDate(from, "long")).replace("{to}", fmtDate(to, "long")).replace("{company}", business.name);

  const form = (
    <>
      <BusinessFields showGstin={false} showTagline />
      <FieldGroup title="Certificate">
        <Row>
          <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input label="Subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
        </Row>
        <Input label="Recipient name" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
        {config.kind === "internship" ? (
          <Row cols={3}>
            <Input label="Project title" value={project} onChange={(e) => setProject(e.target.value)} wrapClassName="sm:col-span-3" />
            <Input label="From" type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
            <Input label="To" type="date" value={to} onChange={(e) => setTo(e.target.value)} />
            <Input label="Issued on" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </Row>
        ) : <Input label="Issued on" type="date" value={date} onChange={(e) => setDate(e.target.value)} />}
        <Textarea label="Citation" rows={3} value={body} onChange={(e) => setBody(e.target.value)} help={config.kind === "internship" ? "Placeholders: {project}, {from}, {to}, {company}" : "Placeholder: {company}"} />
        <Row>
          <Input label="Certificate no." value={certNo} onChange={(e) => setCertNo(e.target.value)} />
          <Select label="Colour" value={palette} onChange={(e) => setPalette(e.target.value)} options={Object.keys(PALETTES)} />
        </Row>
      </FieldGroup>
      <FieldGroup title="Signatories">
        {signers.map((s, i) => (
          <Row key={i}>
            <Input label={`Signatory ${i + 1} name`} hint={i === 1 ? "optional" : undefined} value={s.name} onChange={(e) => setSigners(signers.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} />
            <Input label="Title" value={s.title} onChange={(e) => setSigners(signers.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))} />
          </Row>
        ))}
      </FieldGroup>
    </>
  );

  const preview = (
    <div style={{ width: PAPER.a4Landscape, height: PAPER.a4, background: light }} className="relative p-8">
      <div className="absolute inset-4 border-[3px]" style={{ borderColor: dark }} />
      <div className="absolute inset-6 border" style={{ borderColor: dark }} />
      <div className="relative flex h-full flex-col items-center justify-between px-16 py-10 text-center">
        <div className="flex flex-col items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {logo ? <img src={logo} alt="" className="h-16 w-16 rounded-lg object-contain" /> : null}
          <div className="mt-2 text-[13px] font-semibold uppercase tracking-[0.3em]" style={{ color: dark }}>{business.name}</div>
          {business.tagline ? <div className="text-[10px] uppercase tracking-[0.2em] text-[#78716c]">{business.tagline}</div> : null}
        </div>
        <div>
          <div className="font-display text-[54px] leading-none tracking-tight" style={{ color: dark }}>{title}</div>
          <div className="mt-2 text-[12px] font-medium uppercase tracking-[0.3em] text-[#57534e]">{subtitle}</div>
          <div className="mt-8 text-[13px] italic text-[#57534e]">This certificate is proudly presented to</div>
          <div className="mt-2 font-display text-[40px] leading-tight" style={{ color: dark, borderBottom: `1px solid ${dark}`, display: "inline-block", padding: "0 32px 4px" }}>{recipient || "Recipient"}</div>
          <p className="mx-auto mt-6 max-w-[640px] text-[13.5px] leading-relaxed text-[#44403c]">{bodyText}</p>
        </div>
        <div className="flex w-full items-end justify-between">
          <div className="flex items-center gap-3 text-left text-[10px] text-[#57534e]">
            <Qr text={`${certNo} · ${recipient} · ${business.name} · ${fmtDate(date)}`} size={54} opts={{ margin: 0 }} />
            <div><div className="font-semibold text-[#1c1917]">{certNo}</div><div>Issued {fmtDate(date, "long")}</div></div>
          </div>
          <div className="flex gap-12">
            {signers.filter((s) => s.name).map((s, i) => (
              <div key={i} className="min-w-[180px] border-t pt-2 text-[11px]" style={{ borderColor: dark }}><div className="font-semibold text-[#1c1917]">{s.name}</div><div className="text-[#57534e]">{s.title}</div></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return <DocumentShell form={form} preview={preview} paperWidth={PAPER.a4Landscape} pdfFormat="a4" filename={`${config.kind}-certificate-${recipient.replace(/\s+/g, "-")}`} pngExport formTitle="Certificate details" previewDescription="A4 landscape" />;
}
