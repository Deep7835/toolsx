"use client";
import { useState, type ReactNode } from "react";
import { Copy, Check, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { copyText, downloadText } from "@/lib/export";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";

export function CodeBlock({ value, filename, mime = "text/plain", className, wrap, label, actions, mono = true }: { value: string; filename?: string; mime?: string; className?: string; wrap?: boolean; label?: ReactNode; actions?: ReactNode; mono?: boolean }) {
  const [copied, setCopied] = useState(false);
  const toast = useToast();
  const copy = async () => {
    await copyText(value);
    setCopied(true);
    toast("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className={cn("overflow-hidden rounded-xl border border-border bg-surface-2/60", className)}>
      <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">{label ?? "Output"}</span>
        <div className="flex items-center gap-1.5">
          {actions}
          {filename ? <Button size="sm" variant="ghost" onClick={() => downloadText(value, filename, mime)}><Download className="h-3.5 w-3.5" /> Download</Button> : null}
          <Button size="sm" variant="ghost" onClick={copy}>{copied ? <Check className="h-3.5 w-3.5 text-accent-text" /> : <Copy className="h-3.5 w-3.5" />} {copied ? "Copied" : "Copy"}</Button>
        </div>
      </div>
      <pre className={cn("max-h-[560px] overflow-auto p-4 text-[13px] leading-relaxed text-ink", mono ? "font-mono" : "font-sans", wrap ? "whitespace-pre-wrap break-words" : "")}>{value || <span className="text-faint">Nothing to show yet.</span>}</pre>
    </div>
  );
}
