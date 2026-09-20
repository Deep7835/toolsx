"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export const PAPER = {
  a4: 794, // px @96dpi
  a4Landscape: 1123,
  a5: 559,
  thermal80: 302,
  thermal58: 219,
  label4x6: 384,
  card: 340,
  idCard: 324, // CR80 @96dpi ~ 3.375in
};

/** Renders a fixed-width "paper" and scales it to fit its container. `paperRef` is the element to export. */
export function PaperPreview({ width, children, paperRef, className, paperClassName, minScale = 0.3, padded = true }: { width: number; children: ReactNode; paperRef: React.RefObject<HTMLDivElement | null>; className?: string; paperClassName?: string; minScale?: number; padded?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [h, setH] = useState(0);

  useEffect(() => {
    const w = wrap.current;
    const p = paperRef.current;
    if (!w || !p) return;
    const update = () => {
      const cw = w.clientWidth;
      const s = Math.max(minScale, Math.min(1, cw / width));
      setScale(s);
      setH(p.offsetHeight * s);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(w);
    ro.observe(p);
    return () => ro.disconnect();
  }, [width, minScale, paperRef]);

  return (
    <div ref={wrap} className={cn("w-full overflow-hidden", className)} style={{ height: h || undefined }}>
      <div
        id="print-root"
        ref={paperRef}
        className={cn("origin-top-left bg-white text-[#1c1917] shadow-lg", padded ? "" : "", paperClassName)}
        style={{ width, transform: `scale(${scale})`, transformOrigin: "top left", colorScheme: "light" }}
      >
        {children}
      </div>
    </div>
  );
}
