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

export interface OgInput { title: string; eyebrow?: string; footer?: string; tags?: string[]; seed?: string; kicker?: string; /** 1 = 1200×630, 0.5 = 600×315 */ scale?: number }

function Mark({ k }: { k: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 * k }}>
      <div style={{ display: "flex", width: 44 * k, height: 44 * k, borderRadius: 12 * k, background: "#0b0b0d", alignItems: "center", justifyContent: "center" }}>
        <svg viewBox="0 0 24 24" width={26 * k} height={26 * k} fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 4h7l4 4v12H7z" /><path d="M14 4v4h4M10 13h5M10 17h5" /></svg>
      </div>
      <div style={{ display: "flex", fontSize: 30 * k, fontWeight: 700, letterSpacing: -1.2 * k, color: "#0b0b0d" }}>{BRAND.wordmark}</div>
    </div>
  );
}

export async function renderOg(input: OgInput): Promise<ImageResponse> {
  const [bold, medium] = await Promise.all([font("Inter-Bold"), font("Inter-Medium")]);
  const [s1, s2, s3] = skyFor(input.seed ?? input.title);
  const node = iconFor(input.tags ?? []);
  const title = input.title.length > 96 ? input.title.slice(0, 94).replace(/\s+\S*$/, "") + "…" : input.title;
  const k = input.scale ?? 1;
  const W = Math.round(1200 * k), H = Math.round(630 * k);
  const size = (title.length > 70 ? 54 : title.length > 46 ? 62 : 72) * k;
  const element: ReactNode = (
    <div style={{ width: W, height: H, display: "flex", position: "relative", background: `linear-gradient(135deg, ${s1} 0%, ${s2} 55%, ${s3} 100%)`, fontFamily: "Inter" }}>
      {/* clouds */}
      <div style={{ position: "absolute", left: -120 * k, top: 40 * k, width: 620 * k, height: 260 * k, borderRadius: 999, background: "rgba(255,255,255,0.75)", filter: `blur(${60 * k}px)` }} />
      <div style={{ position: "absolute", right: -80 * k, bottom: -60 * k, width: 560 * k, height: 280 * k, borderRadius: 999, background: "rgba(255,255,255,0.7)", filter: `blur(${70 * k}px)` }} />
      {/* frame */}
      <div style={{ position: "absolute", inset: 24 * k, border: "1px solid rgba(11,11,13,0.08)", borderRadius: 28 * k }} />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: `${60 * k}px ${64 * k}px`, width: 820 * k }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 * k }}>
          <Mark k={k} />
          {input.eyebrow ? <div style={{ display: "flex", alignSelf: "flex-start", padding: `${8 * k}px ${16 * k}px`, borderRadius: 999, background: "rgba(11,11,13,0.06)", color: "#3a3d45", fontSize: 20 * k, fontWeight: 500, letterSpacing: 1.5 * k, textTransform: "uppercase" }}>{input.eyebrow}</div> : null}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 * k }}>
          <div style={{ display: "flex", fontSize: size, fontWeight: 700, lineHeight: 1.06, letterSpacing: -size * 0.035, color: "#0b0b0d" }}>{title}</div>
          {input.kicker ? <div style={{ display: "flex", fontSize: 24 * k, color: "#3a3d45", fontWeight: 500 }}>{input.kicker}</div> : null}
        </div>
        <div style={{ display: "flex", fontSize: 22 * k, color: "#6b7080", fontWeight: 500 }}>{input.footer ?? `${BRAND.domain} · free tools for Indian small businesses`}</div>
      </div>
      <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", paddingRight: 40 * k }}>
        <div style={{ display: "flex", width: 300 * k, height: 300 * k, borderRadius: 48 * k, background: "rgba(255,255,255,0.85)", alignItems: "center", justifyContent: "center", boxShadow: `0 ${30 * k}px ${80 * k}px rgba(11,11,13,0.12)` }}>
          <Icon node={node} size={150 * k} />
        </div>
      </div>
    </div>
  );
  return new ImageResponse(element, { width: W, height: H, fonts: [{ name: "Inter", data: bold, weight: 700, style: "normal" }, { name: "Inter", data: medium, weight: 500, style: "normal" }] });
}
