"use client";

/** Rasterises a DOM node and downloads it as a PDF. Works with Tailwind v4 colours (html2canvas-pro). */
export async function downloadPdf(
  el: HTMLElement,
  filename: string,
  opts: { format?: "a4" | "a5" | "thermal" | "auto"; orientation?: "portrait" | "landscape"; scale?: number } = {},
) {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import("html2canvas-pro"), import("jspdf")]);
  const scale = opts.scale ?? 2;
  const canvas = await html2canvas(el, { scale, useCORS: true, backgroundColor: "#ffffff", logging: false });
  const img = canvas.toDataURL("image/jpeg", 0.95);
  const pxToMm = (px: number) => (px * 25.4) / 96;
  const wmm = pxToMm(canvas.width / scale);
  const hmm = pxToMm(canvas.height / scale);

  const format = opts.format ?? "a4";
  let pdf: InstanceType<typeof jsPDF>;
  if (format === "auto" || format === "thermal") {
    pdf = new jsPDF({ unit: "mm", format: [wmm, hmm], orientation: wmm > hmm ? "landscape" : "portrait" });
    pdf.addImage(img, "JPEG", 0, 0, wmm, hmm);
  } else {
    const orientation = opts.orientation ?? (wmm > hmm ? "landscape" : "portrait");
    pdf = new jsPDF({ unit: "mm", format, orientation });
    const pw = pdf.internal.pageSize.getWidth();
    const ph = pdf.internal.pageSize.getHeight();
    const ratio = Math.min(pw / wmm, 1);
    const w = wmm * ratio;
    const h = hmm * ratio;
    // paginate long documents
    let y = 0;
    let page = 0;
    while (y < h) {
      if (page > 0) pdf.addPage();
      pdf.addImage(img, "JPEG", (pw - w) / 2, -y, w, h);
      y += ph;
      page++;
    }
  }
  pdf.save(filename.endsWith(".pdf") ? filename : `${filename}.pdf`);
}

export async function downloadPng(el: HTMLElement, filename: string, scale = 3, transparent = false) {
  const { default: html2canvas } = await import("html2canvas-pro");
  const canvas = await html2canvas(el, { scale, useCORS: true, backgroundColor: transparent ? null : "#ffffff", logging: false });
  downloadDataUrl(canvas.toDataURL("image/png"), filename.endsWith(".png") ? filename : `${filename}.png`);
}

export function downloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  downloadDataUrl(url, filename);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export function downloadText(text: string, filename: string, mime = "text/plain") {
  downloadBlob(new Blob([text], { type: mime + ";charset=utf-8" }), filename);
}

export function printNow() {
  window.print();
}

export function shareWhatsApp(text: string, phone?: string) {
  const p = phone ? phone.replace(/[^0-9]/g, "") : "";
  const url = p ? `https://wa.me/${p}?text=${encodeURIComponent(text)}` : `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener");
}

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}
