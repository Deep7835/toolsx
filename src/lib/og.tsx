import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";
import { createElement, type ReactNode } from "react";
import { Receipt, Landmark, Users, TrendingUp, QrCode, Package, Store, Image as ImageIcon, Briefcase, Scale, ShieldCheck, Megaphone, Sparkles, Calculator, FileText, Wallet, type IconNode } from "lucide";
import { BRAND } from "./brand";

const fontCache: Record<string, Buffer> = {};
async function font(name: "Inter-Bold" | "Inter-Medium") {
  if (!fontCache[name]) fontCache[name] = await fs.readFile(path.join(process.cwd(), "src", "assets", "fonts", `${name}.woff`));
  return fontCache[name];
}

const ICONS: Record<string, IconNode> = {
  gst: Receipt, billing: Receipt, tax: Landmark, "income tax": Landmark, payroll: Users, hr: Users, finance: TrendingUp, loans: Wallet, "personal finance": TrendingUp,
  upi: QrCode, payments: QrCode, marketing: Megaphone, whatsapp: Megaphone, seo: Sparkles, logistics: Package, ecommerce: Package, retail: Store, freelancing: Briefcase,
  legal: Scale, compliance: Scale, privacy: ShieldCheck, security: ShieldCheck, ai: Sparkles, msme: Briefcase, calculators: Calculator, media: ImageIcon, documents: FileText,
};
const iconFor = (tags: string[]) => { for (const t of tags) { if (ICONS[t]) return ICONS[t]; } return FileText; };

/** Render a lucide IconNode as plain SVG (Satori-safe). */
function Icon({ node, size = 150, stroke = "#0b0b0d" }: { node: IconNode; size?: number; stroke?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      {node.map(([tag, attrs], i) => createElement(tag, { key: i, ...attrs }))}
    </svg>
  );
}

const SKY: Record<string, [string, string, string]> = {
  a: ["#dbe9ff", "#ece2ff", "#ffe1ef"],
  b: ["#d9f0ff", "#dbe9ff", "#ece2ff"],
  c: ["#ffe9d6", "#ffe1ef", "#ece2ff"],
  d: ["#dff5ea", "#d9f0ff", "#dbe9ff"],
};
const skyFor = (seed: string) => { const k = ["a", "b", "c", "d"][seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 4]; return SKY[k]; };

export interface OgInput { title: string; eyebrow?: string; footer?: string; tags?: string[]; seed?: string; kicker?: string }

function Mark() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ display: "flex", width: 44, height: 44, borderRadius: 12, background: "#0b0b0d", alignItems: "center", justifyContent: "center" }}>
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 4h7l4 4v12H7z" /><path d="M14 4v4h4M10 13h5M10 17h5" /></svg>
      </div>
      <div style={{ display: "flex", fontSize: 30, fontWeight: 700, letterSpacing: -1.2, color: "#0b0b0d" }}>{BRAND.wordmark}</div>
    </div>
  );
}

export async function renderOg(input: OgInput): Promise<ImageResponse> {
  const [bold, medium] = await Promise.all([font("Inter-Bold"), font("Inter-Medium")]);
  const [s1, s2, s3] = skyFor(input.seed ?? input.title);
  const node = iconFor(input.tags ?? []);
  const title = input.title.length > 96 ? input.title.slice(0, 94).replace(/\s+\S*$/, "") + "…" : input.title;
  const size = title.length > 70 ? 54 : title.length > 46 ? 62 : 72;
  const element: ReactNode = (
    <div style={{ width: 1200, height: 630, display: "flex", position: "relative", background: `linear-gradient(135deg, ${s1} 0%, ${s2} 55%, ${s3} 100%)`, fontFamily: "Inter" }}>
      {/* clouds */}
      <div style={{ position: "absolute", left: -120, top: 40, width: 620, height: 260, borderRadius: 999, background: "rgba(255,255,255,0.75)", filter: "blur(60px)" }} />
      <div style={{ position: "absolute", right: -80, bottom: -60, width: 560, height: 280, borderRadius: 999, background: "rgba(255,255,255,0.7)", filter: "blur(70px)" }} />
      {/* frame */}
      <div style={{ position: "absolute", inset: 24, border: "1px solid rgba(11,11,13,0.08)", borderRadius: 28 }} />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 64px", width: 820 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <Mark />
          {input.eyebrow ? <div style={{ display: "flex", alignSelf: "flex-start", padding: "8px 16px", borderRadius: 999, background: "rgba(11,11,13,0.06)", color: "#3a3d45", fontSize: 20, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase" }}>{input.eyebrow}</div> : null}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", fontSize: size, fontWeight: 700, lineHeight: 1.06, letterSpacing: -size * 0.035, color: "#0b0b0d" }}>{title}</div>
          {input.kicker ? <div style={{ display: "flex", fontSize: 24, color: "#3a3d45", fontWeight: 500 }}>{input.kicker}</div> : null}
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#6b7080", fontWeight: 500 }}>{input.footer ?? `${BRAND.domain} · free tools for Indian small businesses`}</div>
      </div>
      <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", paddingRight: 40 }}>
        <div style={{ display: "flex", width: 300, height: 300, borderRadius: 48, background: "rgba(255,255,255,0.85)", alignItems: "center", justifyContent: "center", boxShadow: "0 30px 80px rgba(11,11,13,0.12)" }}>
          <Icon node={node} />
        </div>
      </div>
    </div>
  );
  return new ImageResponse(element, { width: 1200, height: 630, fonts: [{ name: "Inter", data: bold, weight: 700, style: "normal" }, { name: "Inter", data: medium, weight: 500, style: "normal" }] });
}
