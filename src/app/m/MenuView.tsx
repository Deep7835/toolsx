"use client";
import { useSyncExternalStore } from "react";
import Link from "next/link";
import { decodePayload } from "@/lib/share";
import type { MenuPayload } from "@/tools/shop/MenuCreator";
import { inr } from "@/lib/format";

const sub = (cb: () => void) => { window.addEventListener("hashchange", cb); return () => window.removeEventListener("hashchange", cb); };

export function MenuView() {
  const hash = useSyncExternalStore(sub, () => window.location.hash.slice(1), () => "");
  const menu = hash ? decodePayload<MenuPayload>(hash) : null;
  if (!hash) return null;
  if (!menu) return <div className="mx-auto max-w-md px-4 py-20 text-center text-sm text-muted">This menu link is invalid or incomplete.</div>;
  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="text-center">
        <h1 className="font-display text-4xl text-ink">{menu.n}</h1>
        {menu.t ? <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-muted">{menu.t}</p> : null}
      </div>
      <div className="mt-8 grid gap-8">
        {menu.s.map((s, i) => (
          <section key={i}>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-ink">{s.n}</h2>
            <ul className="grid gap-3">
              {s.i.map(([name, price, desc, veg], j) => (
                <li key={j} className="flex items-start gap-3">
                  {veg ? <span className={`mt-1.5 inline-flex h-3 w-3 shrink-0 items-center justify-center border ${veg === "veg" ? "border-green-700" : veg === "egg" ? "border-amber-700" : "border-red-700"}`}><span className={`h-1.5 w-1.5 rounded-full ${veg === "veg" ? "bg-green-700" : veg === "egg" ? "bg-amber-700" : "bg-red-700"}`} /></span> : null}
                  <div className="min-w-0 flex-1"><div className="text-[15px] font-medium text-ink">{name}</div>{desc ? <div className="text-xs text-muted">{desc}</div> : null}</div>
                  <div className="tabular text-[15px] font-semibold text-ink">{inr(price, { decimals: 0 })}</div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <div className="mt-10 border-t border-border pt-4 text-center text-xs text-muted"><p>{menu.c}</p><p className="mt-1">{menu.a}{menu.p ? ` · ${menu.p}` : ""}</p><p className="mt-4"><Link href="/tools/menu-creator" className="text-accent-text hover:underline">Make your own menu →</Link></p></div>
    </div>
  );
}
