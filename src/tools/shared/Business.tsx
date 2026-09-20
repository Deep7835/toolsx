"use client";
import { useLocalStorage } from "@/lib/hooks";
import { FieldGroup, Input, Row, Textarea } from "@/components/ui/Field";
import { LogoUpload } from "@/components/shell/LogoUpload";

export interface Business { name: string; gstin: string; address: string; phone: string; email: string; website?: string; tagline?: string }
export const DEFAULT_BUSINESS: Business = { name: "Bharat General Store", gstin: "", address: "12, Main Market, New Delhi 110001", phone: "98765 43210", email: "", website: "", tagline: "" };

export function useBusiness() {
  const [business, setBusiness] = useLocalStorage<Business>("ibt:business", DEFAULT_BUSINESS);
  const [logo, setLogo] = useLocalStorage<string>("ibt:logo", "");
  const set = (k: keyof Business, v: string) => setBusiness({ ...business, [k]: v });
  return { business, set, logo, setLogo, setBusiness };
}

export function BusinessFields({ title = "Your business", showGstin = true, showLogo = true, showWeb = false, showTagline = false }: { title?: string; showGstin?: boolean; showLogo?: boolean; showWeb?: boolean; showTagline?: boolean }) {
  const { business, set, logo, setLogo } = useBusiness();
  return (
    <FieldGroup title={title}>
      <Row>
        <Input label="Business name" value={business.name} onChange={(e) => set("name", e.target.value)} />
        {showGstin ? <Input label="GSTIN" hint="optional" value={business.gstin} onChange={(e) => set("gstin", e.target.value.toUpperCase())} maxLength={15} /> : <Input label="Phone" type="tel" value={business.phone} onChange={(e) => set("phone", e.target.value)} />}
      </Row>
      {showTagline ? <Input label="Tagline" hint="optional" value={business.tagline ?? ""} onChange={(e) => set("tagline", e.target.value)} /> : null}
      <Textarea label="Address" rows={2} value={business.address} onChange={(e) => set("address", e.target.value)} />
      <Row>
        {showGstin ? <Input label="Phone" type="tel" value={business.phone} onChange={(e) => set("phone", e.target.value)} /> : null}
        <Input label="Email" type="email" value={business.email} onChange={(e) => set("email", e.target.value)} />
        {showWeb ? <Input label="Website" value={business.website ?? ""} onChange={(e) => set("website", e.target.value)} /> : null}
      </Row>
      {showLogo ? <LogoUpload value={logo} onChange={setLogo} /> : null}
    </FieldGroup>
  );
}

/** Letterhead header used across letters & certificates in previews. */
export function LetterHead({ business, logo, accent = "#1c1917", compact }: { business: Business; logo?: string; accent?: string; compact?: boolean }) {
  return (
    <div className={`flex items-center justify-between gap-6 border-b-2 ${compact ? "pb-3" : "pb-5"}`} style={{ borderColor: accent }}>
      <div className="flex items-center gap-4 min-w-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {logo ? <img src={logo} alt="" className={`${compact ? "h-11 w-11" : "h-14 w-14"} rounded-lg object-contain`} /> : null}
        <div className="min-w-0">
          <div className={`${compact ? "text-[18px]" : "text-[22px]"} font-semibold tracking-tight`} style={{ color: accent }}>{business.name || "Your business"}</div>
          {business.tagline ? <div className="text-[11px] uppercase tracking-[0.14em] text-[#78716c]">{business.tagline}</div> : null}
        </div>
      </div>
      <div className="text-right text-[11px] leading-relaxed text-[#57534e] shrink-0">
        <div className="whitespace-pre-line">{business.address}</div>
        <div>{[business.phone, business.email, business.website].filter(Boolean).join("  ·  ")}</div>
        {business.gstin ? <div className="font-medium text-[#1c1917]">GSTIN {business.gstin}</div> : null}
      </div>
    </div>
  );
}
