"use client";
import { useRef } from "react";
import { ImagePlus, X } from "lucide-react";
import { fileToDataUrl } from "@/lib/export";
import { Label } from "@/components/ui/Field";

export function LogoUpload({ value, onChange, label = "Logo (optional)", hint = "PNG/JPG, square works best", round }: { value?: string; onChange: (v: string) => void; label?: string; hint?: string; round?: boolean }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div>
      <Label hint={hint}>{label}</Label>
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => ref.current?.click()} className={`flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden border border-dashed border-border-strong bg-surface-2 text-muted hover:border-accent hover:text-accent-text transition-colors cursor-pointer ${round ? "rounded-full" : "rounded-xl"}`} aria-label="Upload image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {value ? <img src={value} alt="" className="h-full w-full object-cover" /> : <ImagePlus className="h-5 w-5" />}
        </button>
        <div className="text-xs text-muted">
          <button type="button" onClick={() => ref.current?.click()} className="font-medium text-accent-text hover:underline cursor-pointer">Choose image</button>
          {value ? <button type="button" onClick={() => onChange("")} className="ml-3 inline-flex items-center gap-1 text-muted hover:text-danger cursor-pointer"><X className="h-3 w-3" /> Remove</button> : null}
        </div>
        <input ref={ref} type="file" accept="image/*" className="hidden" onChange={async (e) => { const f = e.target.files?.[0]; if (f) onChange(await fileToDataUrl(f)); e.target.value = ""; }} />
      </div>
    </div>
  );
}
