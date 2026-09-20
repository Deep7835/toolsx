"use client";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/cn";

type Kind = "success" | "error" | "info";
interface Toast { id: number; kind: Kind; text: string }
const Ctx = createContext<(text: string, kind?: Kind) => void>(() => {});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Toast[]>([]);
  const push = useCallback((text: string, kind: Kind = "success") => {
    const id = Date.now() + Math.random();
    setItems((x) => [...x, { id, kind, text }]);
    setTimeout(() => setItems((x) => x.filter((t) => t.id !== id)), 3200);
  }, []);
  return (
    <Ctx.Provider value={push}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed bottom-4 left-1/2 z-[1000] flex -translate-x-1/2 flex-col items-center gap-2 px-4 w-full max-w-sm">
        {items.map((t) => (
          <div key={t.id} className={cn("animate-fade-up flex items-center gap-2.5 rounded-xl border bg-surface px-4 py-3 text-sm shadow-lg", "border-border text-ink")}>
            {t.kind === "success" ? <CheckCircle2 className="h-4 w-4 text-accent-text" /> : t.kind === "error" ? <AlertCircle className="h-4 w-4 text-danger" /> : <Info className="h-4 w-4 text-info" />}
            {t.text}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}

export const useToast = () => useContext(Ctx);
