import Link from "next/link";
import { Logo } from "./Logo";
import { CATEGORIES } from "@/lib/categories";
import { POPULAR_SLUGS, toolBySlug } from "@/lib/registry";
import { ShieldCheck, Zap, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">115 free, private business utilities for Indian shops, freelancers and MSMEs. Everything runs in your browser — nothing is uploaded.</p>
            <ul className="mt-6 grid gap-2.5 text-[13px] text-ink-2">
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent-text" strokeWidth={1.75} /> 100% client-side & private</li>
              <li className="flex items-center gap-2"><Zap className="h-4 w-4 text-accent-text" strokeWidth={1.75} /> No login, no sign-up, instant results</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent-text" strokeWidth={1.75} /> Built for Bharat MSMEs</li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Popular tools</h3>
            <ul className="mt-4 grid gap-2.5 text-sm">
              {POPULAR_SLUGS.map((s) => { const t = toolBySlug(s)!; return <li key={s}><Link href={`/tools/${s}`} className="text-ink-2 hover:text-ink transition-colors">{t.name}</Link></li>; })}
            </ul>
          </div>
          <div className="md:col-span-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Categories</h3>
            <ul className="mt-4 grid gap-2.5 text-sm">
              {CATEGORIES.map((c) => <li key={c.id}><Link href={`/categories/${c.id}`} className="text-ink-2 hover:text-ink transition-colors">{c.name}</Link></li>)}
            </ul>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Company</h3>
            <ul className="mt-4 grid gap-2.5 text-sm">
              <li><Link href="/about" className="text-ink-2 hover:text-ink transition-colors">About</Link></li>
              <li><Link href="/guides" className="text-ink-2 hover:text-ink transition-colors">Guides</Link></li>
              <li><Link href="/privacy-policy" className="text-ink-2 hover:text-ink transition-colors">Privacy policy</Link></li>
              <li><Link href="/terms" className="text-ink-2 hover:text-ink transition-colors">Terms</Link></li>
              <li><Link href="/contact" className="text-ink-2 hover:text-ink transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} India Biz Tools · Free & secure digital business utilities for India.</p>
          <p>Calculators are for guidance only — verify statutory rates with a professional.</p>
        </div>
      </div>
    </footer>
  );
}
