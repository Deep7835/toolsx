"use client";
import { useEffect, useState } from "react";
import QRCode from "qrcode";

export interface QrOpts { size?: number; dark?: string; light?: string; margin?: number; level?: "L" | "M" | "Q" | "H" }

export function useQr(text: string, opts: QrOpts = {}) {
  const [url, setUrl] = useState<string>("");
  const { size = 512, dark = "#000000", light = "#ffffff", margin = 1, level = "M" } = opts;
  useEffect(() => {
    let alive = true;
    if (!text) return;
    QRCode.toDataURL(text, { width: size, margin, errorCorrectionLevel: level, color: { dark, light } })
      .then((u) => { if (alive) setUrl(u); })
      .catch(() => { if (alive) setUrl(""); });
    return () => { alive = false; };
  }, [text, size, dark, light, margin, level]);
  return text ? url : "";
}

export async function qrSvg(text: string, opts: QrOpts = {}) {
  const { dark = "#000000", light = "#ffffff", margin = 1, level = "M" } = opts;
  return QRCode.toString(text, { type: "svg", margin, errorCorrectionLevel: level, color: { dark, light } });
}

export function Qr({ text, size = 160, className, opts, alt = "QR code" }: { text: string; size?: number; className?: string; opts?: QrOpts; alt?: string }) {
  const url = useQr(text, { size: Math.max(256, size * 3), ...opts });
  if (!url) return <div className={className} style={{ width: size, height: size, background: "#f5f5f4" }} aria-hidden />;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={url} width={size} height={size} alt={alt} className={className} style={{ imageRendering: "pixelated" }} />;
}

export const upiLink = (p: { vpa: string; name: string; amount?: number; note?: string }) => {
  const q = new URLSearchParams();
  q.set("pa", p.vpa.trim());
  if (p.name) q.set("pn", p.name.trim());
  if (p.amount && p.amount > 0) q.set("am", p.amount.toFixed(2));
  q.set("cu", "INR");
  if (p.note) q.set("tn", p.note.slice(0, 60));
  return `upi://pay?${q.toString().replace(/\+/g, "%20")}`;
};
