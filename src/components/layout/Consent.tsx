"use client";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useSyncExternalStore } from "react";
import { Cookie } from "lucide-react";
import { useLocalStorage } from "@/lib/hooks";
import { BRAND } from "@/lib/brand";

type Choice = "granted" | "denied" | null;
const GA = process.env.NEXT_PUBLIC_GA_ID ?? BRAND.ga4;
const PLAUSIBLE = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

const noopSub = () => () => {};
/**
 * Google tag bootstrap (Consent Mode v2, "advanced" setup). Runs before gtag.js so the consent default is the
 * first dataLayer entry: analytics cookies stay denied (cookieless pings only) until the visitor accepts.
 * Reads the stored choice synchronously so returning visitors who accepted are granted from the first hit.
 */
const gaBootstrap = (id: string) =>
  `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}` +
  `var c=null;try{c=JSON.parse(localStorage.getItem('ibt:consent'))}catch(e){}` +
  `gtag('consent','default',{analytics_storage:c==='granted'?'granted':'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});` +
  `gtag('js',new Date());gtag('config','${id}',{anonymize_ip:true});`;

/** Consent banner + analytics loader. The Google tag loads on every page in consent-denied mode; analytics cookies switch on only after "Accept". Plausible (cookieless) loads if configured. */
export function Consent() {
  const [choice, setChoice] = useLocalStorage<Choice>("ibt:consent", null);
  const mounted = useSyncExternalStore(noopSub, () => true, () => false);

  // Google Consent Mode v2: push an update whenever the stored choice changes (default is set in gaBootstrap)
  useEffect(() => {
    if (!GA || choice === null) return;
    type G = (...a: unknown[]) => void;
    const w = window as unknown as { dataLayer?: unknown[]; gtag?: G };
    w.dataLayer = w.dataLayer || [];
    w.gtag = w.gtag || function (...args: unknown[]) { w.dataLayer!.push(args); };
    w.gtag("consent", "update", { analytics_storage: choice === "granted" ? "granted" : "denied" });
  }, [choice]);

  return (
    <>
      {PLAUSIBLE ? <Script defer data-domain={PLAUSIBLE} src="https://plausible.io/js/script.js" strategy="afterInteractive" /> : null}
      {GA ? (
        <>
          <Script id="ga-init" strategy="afterInteractive">{gaBootstrap(GA)}</Script>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA}`} strategy="afterInteractive" />
        </>
      ) : null}
      {mounted && choice === null ? (
        <div role="dialog" aria-live="polite" aria-label="Cookie preferences" className="fixed inset-x-3 bottom-3 z-[950] mx-auto max-w-xl rounded-2xl border border-border bg-surface p-4 shadow-lg animate-fade-up sm:inset-x-auto sm:right-4 sm:bottom-4">
          <div className="flex gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-ink"><Cookie className="h-4 w-4" strokeWidth={1.75} /></span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink">Cookies & privacy</p>
              <p className="mt-1 text-[13px] leading-relaxed text-muted">{BRAND.name} stores your preferences and saved business details on this device only. {GA ? "With your permission we also use anonymised analytics cookies to see which tools are useful." : "We set no tracking cookies; anonymous, cookie-free usage stats may be collected."} Read the <Link href="/privacy-policy" className="text-accent-text underline">privacy policy</Link>.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button type="button" onClick={() => setChoice("granted")} className="h-9 rounded-lg bg-accent px-4 text-[13px] font-medium text-on-accent hover:bg-accent-hover cursor-pointer">{GA ? "Accept analytics" : "Got it"}</button>
                <button type="button" onClick={() => setChoice("denied")} className="h-9 rounded-lg border border-border px-4 text-[13px] font-medium text-ink hover:bg-surface-2 cursor-pointer">Essential only</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
