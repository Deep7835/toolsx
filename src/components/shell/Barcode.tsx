"use client";
import { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

export type BarcodeFormat = "CODE128" | "EAN13" | "EAN8" | "UPC" | "CODE39" | "ITF14";

export function Barcode({ value, format = "CODE128", width = 2, height = 60, displayValue = true, fontSize = 12, className, margin = 4 }: { value: string; format?: BarcodeFormat; width?: number; height?: number; displayValue?: boolean; fontSize?: number; className?: string; margin?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    try {
      JsBarcode(ref.current, value || "0", { format, width, height, displayValue, fontSize, margin, lineColor: "#000", background: "#fff", font: "Inter, monospace", textMargin: 2 });
      ref.current.removeAttribute("data-error");
    } catch {
      ref.current.setAttribute("data-error", "1");
      ref.current.innerHTML = "";
    }
  }, [value, format, width, height, displayValue, fontSize, margin]);
  return <svg ref={ref} className={className} role="img" aria-label={`Barcode ${value}`} />;
}

export function isValidBarcode(value: string, format: BarcodeFormat) {
  try {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    JsBarcode(svg, value, { format });
    return true;
  } catch {
    return false;
  }
}

/** EAN-13 check digit for a 12-digit body */
export function ean13Check(body12: string) {
  const d = body12.replace(/\D/g, "").slice(0, 12).padStart(12, "0");
  let sum = 0;
  for (let i = 0; i < 12; i++) sum += parseInt(d[i]) * (i % 2 === 0 ? 1 : 3);
  return d + String((10 - (sum % 10)) % 10);
}
