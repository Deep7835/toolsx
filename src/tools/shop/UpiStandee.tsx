"use client";
import { useState } from "react";
import { DocumentShell } from "@/components/shell/DocumentShell";
import { PAPER } from "@/components/shell/PaperPreview";
import { FieldGroup, Input, Row, Segmented, Select, Toggle } from "@/components/ui/Field";
import { Qr, upiLink } from "@/components/shell/Qr";
import { useLocalStorage } from "@/lib/hooks";
import { useBusiness } from "../shared/Business";
import { ValidatedInput } from "@/components/ui/ValidatedInput";
import { vVPA } from "@/lib/validate";

const DEFAULT_UPI = { vpa: "", payee: "" };
const THEMES: Record<string, { bg: string; fg: string; accent: string; label: string }> = {
  ink: { bg: "#1c1917", fg: "#ffffff", accent: "#34d399", label: "Ink" },
  emerald: { bg: "#065f46", fg: "#ffffff", accent: "#a7f3d0", label: "Emerald" },
  indigo: { bg: "#312e81", fg: "#ffffff", accent: "#c7d2fe", label: "Indigo" },
  saffron: { bg: "#c2410c", fg: "#ffffff", accent: "#fed7aa", label: "Saffron" },
  paper: { bg: "#ffffff", fg: "#1c1917", accent: "#047857", label: "Paper" },
};

export default function UpiStandee() {
  const { business } = useBusiness();
  const [upi, setUpi] = useLocalStorage("ibt:upi", DEFAULT_UPI);
  const [size, setSize] = useState<"a4" | "a5">("a5");
  const [theme, setTheme] = useState("ink");
  const [headline, setHeadline] = useState("Scan & Pay");
  const [subline, setSubline] = useState("All UPI apps accepted");
  const [amount, setAmount] = useState(0);
  const [showApps, setShowApps] = useState(true);
  const [showPhone, setShowPhone] = useState(true);
  const t = THEMES[theme];
  const link = upi.vpa ? upiLink({ vpa: upi.vpa, name: upi.payee || business.name, amount: amount || undefined }) : "";
  const width = size === "a4" ? PAPER.a4 : PAPER.a5;
  const s = size === "a4" ? 1.42 : 1; // scale typographic sizes for A4

  const form = (
    <>
      <FieldGroup title="UPI details">
        <Row>
          <ValidatedInput label="UPI ID (VPA)" placeholder="shop@okicici" value={upi.vpa} onChange={(e) => setUpi({ ...upi, vpa: e.target.value.trim() })} help="Static QR — customers enter the amount themselves." validate={vVPA} autoCapitalize="none" />
          <Input label="Display name" placeholder={business.name} value={upi.payee} onChange={(e) => setUpi({ ...upi, payee: e.target.value })} />
        </Row>
        <Input label="Fixed amount" hint="optional" prefix="₹" type="number" inputMode="decimal" value={amount || ""} onChange={(e) => setAmount(parseFloat(e.target.value) || 0)} help="Leave blank for a normal open-amount standee." />
      </FieldGroup>
      <FieldGroup title="Design">
        <Segmented value={size} onChange={setSize} options={[{ value: "a5", label: "A5 counter standee" }, { value: "a4", label: "A4 poster" }]} size="sm" />
        <Select label="Colour theme" value={theme} onChange={(e) => setTheme(e.target.value)} options={Object.entries(THEMES).map(([k, v]) => ({ value: k, label: v.label }))} />
        <Row>
          <Input label="Headline" value={headline} onChange={(e) => setHeadline(e.target.value)} />
          <Input label="Sub-line" value={subline} onChange={(e) => setSubline(e.target.value)} />
        </Row>
        <Toggle checked={showApps} onChange={setShowApps} label="Show UPI app names" />
        <Toggle checked={showPhone} onChange={setShowPhone} label="Show phone number" />
      </FieldGroup>
    </>
  );

  const preview = (
    <div style={{ background: t.bg, color: t.fg, width, height: width * 1.414, padding: 40 * s, fontFamily: "Inter, ui-sans-serif" }} className="flex flex-col items-center text-center">
      <div style={{ fontSize: 26 * s }} className="font-semibold tracking-tight leading-tight">{upi.payee || business.name}</div>
      {showPhone && business.phone ? <div style={{ fontSize: 12 * s, opacity: 0.75 }} className="mt-1">{business.phone}</div> : null}
      <div style={{ fontSize: 44 * s, color: t.accent, marginTop: 28 * s }} className="font-display leading-none">{headline}</div>
      <div style={{ fontSize: 13 * s, opacity: 0.8, marginTop: 8 * s }}>{subline}</div>
      <div style={{ marginTop: 28 * s, padding: 18 * s, borderRadius: 24 * s, background: "#fff" }}>
        {link ? <Qr text={link} size={Math.round(260 * s)} opts={{ level: "H", margin: 0 }} /> : <div style={{ width: 260 * s, height: 260 * s }} className="flex items-center justify-center text-[#a8a29e] text-sm">Enter UPI ID</div>}
      </div>
      <div style={{ fontSize: 15 * s, marginTop: 22 * s }} className="font-medium tracking-wide">{upi.vpa || "yourname@upi"}</div>
      {amount ? <div style={{ fontSize: 22 * s, marginTop: 6 * s, color: t.accent }} className="font-semibold tabular">₹{amount.toLocaleString("en-IN")}</div> : null}
      {showApps ? (
        <div style={{ marginTop: "auto", fontSize: 11 * s, opacity: 0.7 }} className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 uppercase tracking-[0.18em]">
          {["GPay", "PhonePe", "Paytm", "BHIM", "Amazon Pay", "CRED"].map((a) => <span key={a}>{a}</span>)}
        </div>
      ) : null}
    </div>
  );

  return <DocumentShell form={form} preview={preview} paperWidth={width} filename={`upi-standee-${(upi.vpa || "qr").replace(/[^a-z0-9]/gi, "-")}`} pdfFormat={size} pngExport formTitle="Standee details" previewDescription={size === "a4" ? "A4 portrait" : "A5 portrait · fits counter stands"} />;
}
