"use client";
import { useEffect, useId, useRef, useState } from "react";
import { Camera, CameraOff, Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";

/** Camera + image QR/barcode scanner built on html5-qrcode (loaded lazily). */
export function Scanner({ onResult, formats = "all" }: { onResult: (text: string, format?: string) => void; formats?: "all" | "qr" }) {
  const [active, setActive] = useState(false);
  const [error, setError] = useState("");
  const rid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = `scanner-${rid}`;
  const instRef = useRef<import("html5-qrcode").Html5Qrcode | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    (async () => {
      try {
        const { Html5Qrcode, Html5QrcodeSupportedFormats } = await import("html5-qrcode");
        const inst = new Html5Qrcode(id, { verbose: false, formatsToSupport: formats === "qr" ? [Html5QrcodeSupportedFormats.QR_CODE] : undefined });
        instRef.current = inst;
        await inst.start({ facingMode: "environment" }, { fps: 10, qrbox: { width: 240, height: 240 } }, (text, res) => { onResult(text, res.result.format?.formatName); }, () => {});
        if (cancelled) await inst.stop();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Camera unavailable. Allow camera access or upload an image instead.");
        setActive(false);
      }
    })();
    return () => {
      cancelled = true;
      const i = instRef.current;
      if (i) { i.stop().catch(() => {}).finally(() => { try { i.clear(); } catch {} }); instRef.current = null; }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const scanFile = async (f: File) => {
    setError("");
    try {
      const { Html5Qrcode } = await import("html5-qrcode");
      const tmp = new Html5Qrcode(id + "-file", { verbose: false });
      const r = await tmp.scanFileV2(f, false);
      onResult(r.decodedText, r.result.format?.formatName);
      try { tmp.clear(); } catch {}
    } catch {
      setError("No code found in that image. Try a sharper, well-lit photo.");
    }
  };

  return (
    <div className="grid gap-3">
      <div id={id} className={`overflow-hidden rounded-xl bg-black ${active ? "min-h-[280px]" : "hidden"}`} />
      <div id={id + "-file"} className="hidden" />
      <div className="flex flex-wrap gap-2">
        <Button variant={active ? "secondary" : "primary"} onClick={() => { setError(""); setActive((a) => !a); }}>{active ? <CameraOff className="h-4 w-4" /> : <Camera className="h-4 w-4" />} {active ? "Stop camera" : "Scan with camera"}</Button>
        <Button variant="secondary" onClick={() => fileRef.current?.click()}><Upload className="h-4 w-4" /> Upload image</Button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) scanFile(f); e.target.value = ""; }} />
      </div>
      {error ? <p className="text-xs text-danger" role="alert">{error}</p> : null}
    </div>
  );
}
