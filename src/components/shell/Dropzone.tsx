"use client";
import { useRef, useState, type ReactNode } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/cn";

export function Dropzone({ accept, multiple, onFiles, children, className, hint }: { accept: string; multiple?: boolean; onFiles: (f: File[]) => void; children?: ReactNode; className?: string; hint?: string }) {
  const ref = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  return (
    <div
      role="button" tabIndex={0}
      onClick={() => ref.current?.click()}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") ref.current?.click(); }}
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => { e.preventDefault(); setOver(false); onFiles(Array.from(e.dataTransfer.files)); }}
      className={cn("flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors", over ? "border-accent bg-accent-soft/50" : "border-border-strong bg-surface-2/40 hover:border-accent hover:bg-accent-soft/30", className)}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface text-accent-text shadow-sm"><Upload className="h-5 w-5" /></span>
      <p className="mt-3 text-sm font-medium text-ink">{children ?? "Drop files here or click to browse"}</p>
      {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
      <input ref={ref} type="file" accept={accept} multiple={multiple} className="hidden" onChange={(e) => { onFiles(Array.from(e.target.files ?? [])); e.target.value = ""; }} />
    </div>
  );
}

export const fmtBytes = (b: number) => (b < 1024 ? `${b} B` : b < 1048576 ? `${(b / 1024).toFixed(0)} KB` : `${(b / 1048576).toFixed(2)} MB`);
