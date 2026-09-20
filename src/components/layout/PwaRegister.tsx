"use client";
import { useEffect } from "react";
import { useToast } from "@/components/ui/Toast";
import { BRAND } from "@/lib/brand";

export function PwaRegister() {
  const toast = useToast();
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").then((reg) => {
      if (reg.active) return;
      const sw = reg.installing || reg.waiting;
      sw?.addEventListener("statechange", () => { if (sw.state === "activated") toast(`${BRAND.name} is ready to work offline`, "info"); });
    }).catch(() => {});
    const onOffline = () => toast("You’re offline — tools keep working, live rates won’t refresh", "info");
    window.addEventListener("offline", onOffline);
    return () => window.removeEventListener("offline", onOffline);
  }, [toast]);
  return null;
}
