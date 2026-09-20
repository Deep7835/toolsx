"use client";
import { useState } from "react";
import { DocumentShell } from "@/components/shell/DocumentShell";
import { PAPER } from "@/components/shell/PaperPreview";
import { FieldGroup, Input, Row, Select, Textarea } from "@/components/ui/Field";
import { LogoUpload } from "@/components/shell/LogoUpload";
import { Qr } from "@/components/shell/Qr";

export default function WebsiteMockup() {
  const [shot, setShot] = useState("");
  const [site, setSite] = useState({ url: "https://www.example.in", title: "Example Stores — Fresh groceries delivered in 30 minutes", desc: "Order fruits, vegetables, dairy and daily essentials from your neighbourhood store. Free delivery above ₹299 across Delhi NCR.", brand: "Example Stores", by: "Prepared by Studio Nine", date: new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" }) });
  const [frame, setFrame] = useState<"mac" | "win" | "mobile">("mac");
  const [bg, setBg] = useState("#f5f5f4");
  const s = (k: keyof typeof site, v: string) => setSite({ ...site, [k]: v });

  const form = (
    <>
      <FieldGroup title="Website">
        <Input label="URL" value={site.url} onChange={(e) => s("url", e.target.value)} />
        <Input label="Page title" value={site.title} onChange={(e) => s("title", e.target.value)} help={`${site.title.length}/60 characters`} />
        <Textarea label="Meta description" rows={3} value={site.desc} onChange={(e) => s("desc", e.target.value)} help={`${site.desc.length}/160 characters`} />
        <LogoUpload value={shot} onChange={setShot} label="Screenshot" hint="upload a screenshot of the page" />
      </FieldGroup>
      <FieldGroup title="Presentation">
        <Row>
          <Select label="Device frame" value={frame} onChange={(e) => setFrame(e.target.value as typeof frame)} options={[{ value: "mac", label: "Desktop browser" }, { value: "win", label: "Windows browser" }, { value: "mobile", label: "Mobile" }]} />
          <Select label="Background" value={bg} onChange={(e) => setBg(e.target.value)} options={[{ value: "#f5f5f4", label: "Stone" }, { value: "#ffffff", label: "White" }, { value: "#e0f2fe", label: "Sky" }, { value: "#ecfdf5", label: "Mint" }, { value: "#1c1917", label: "Ink" }]} />
          <Input label="Brand / client" value={site.brand} onChange={(e) => s("brand", e.target.value)} />
          <Input label="Prepared by" value={site.by} onChange={(e) => s("by", e.target.value)} />
        </Row>
      </FieldGroup>
    </>
  );
  const darkBg = bg === "#1c1917";
  const preview = (
    <div style={{ width: PAPER.a4Landscape, height: PAPER.a4, background: bg, color: darkBg ? "#fafaf9" : "#1c1917" }} className="flex flex-col p-14">
      <div className="flex items-start justify-between">
        <div><div className="text-[11px] font-semibold uppercase tracking-[0.2em] opacity-60">Website mockup · {site.date}</div><div className="mt-1 text-[26px] font-semibold tracking-tight">{site.brand}</div></div>
        <div className="text-right text-[11px] opacity-70">{site.by}</div>
      </div>
      <div className="mt-8 flex flex-1 items-stretch gap-10">
        <div className={`${frame === "mobile" ? "w-[300px] self-center" : "flex-1"} overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.18)]`}>
          {frame === "mobile" ? (
            <div className="flex h-9 items-center justify-center bg-[#f5f5f4] text-[10px] text-[#57534e]">{site.url.replace(/^https?:\/\//, "")}</div>
          ) : (
            <div className="flex h-9 items-center gap-2 border-b border-[#e7e5e4] bg-[#f5f5f4] px-3">
              {frame === "mac" ? <div className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" /></div> : <div className="flex gap-2 text-[#a8a29e] text-[10px]">‹ › ↻</div>}
              <div className="ml-2 flex h-6 flex-1 items-center rounded-md bg-white px-2 text-[10.5px] text-[#57534e]">🔒 {site.url}</div>
            </div>
          )}
          <div className={`${frame === "mobile" ? "h-[520px]" : "h-[420px]"} overflow-hidden bg-[#fafaf9]`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {shot ? <img src={shot} alt="" className="h-full w-full object-cover object-top" /> : <div className="flex h-full flex-col items-center justify-center gap-2 text-[#a8a29e]"><div className="h-2 w-40 rounded bg-[#e7e5e4]" /><div className="h-2 w-64 rounded bg-[#e7e5e4]" /><div className="h-2 w-52 rounded bg-[#e7e5e4]" /><div className="mt-4 text-[11px]">Upload a screenshot</div></div>}
          </div>
        </div>
        <div className="w-[300px] shrink-0 flex flex-col">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] opacity-60">Search snippet</div>
          <div className="mt-3 rounded-xl bg-white p-4 text-[#1c1917] shadow-sm border border-black/5">
            <div className="text-[11px] text-[#202124] truncate">{site.url}</div>
            <div className="mt-1 text-[16px] leading-snug text-[#1a0dab]">{site.title}</div>
            <div className="mt-1 text-[12px] leading-relaxed text-[#4d5156]">{site.desc}</div>
          </div>
          <div className="mt-6 text-[10.5px] font-semibold uppercase tracking-[0.18em] opacity-60">Details</div>
          <ul className="mt-2 grid gap-1.5 text-[12px] opacity-90"><li>Title length: {site.title.length} chars {site.title.length > 60 ? "(long)" : ""}</li><li>Description: {site.desc.length} chars {site.desc.length > 160 ? "(long)" : ""}</li><li>Frame: {frame === "mobile" ? "Mobile" : "Desktop"}</li></ul>
          <div className="mt-auto flex items-center gap-3"><Qr text={site.url} size={64} opts={{ margin: 0, dark: darkBg ? "#fafaf9" : "#1c1917", light: bg }} /><div className="text-[10.5px] opacity-70">Scan to open<br />{site.url.replace(/^https?:\/\//, "")}</div></div>
        </div>
      </div>
    </div>
  );

  return <DocumentShell form={form} preview={preview} paperWidth={PAPER.a4Landscape} pdfFormat="a4" filename={`mockup-${site.brand.replace(/\s+/g, "-")}`} pngExport formTitle="Mockup details" previewDescription="A4 landscape presentation slide" />;
}
