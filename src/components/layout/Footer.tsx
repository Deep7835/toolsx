import Link from "next/link";
import { Logo } from "./Logo";
import { CATEGORIES } from "@/lib/categories";
import { POPULAR_SLUGS, toolBySlug, TOOLS } from "@/lib/registry";
import { BRAND } from "@/lib/brand";

/** Five links per column keeps the three lists the same height. */
const FOOTER_LINKS = 5;
const COMPANY = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{TOOLS.length} free, private business utilities for Indian shops, freelancers and MSMEs. Everything runs in your browser — nothing is uploaded.</p>
          </div>
          <div className="md:col-span-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Popular tools</h3>
            <ul className="mt-4 grid gap-2.5 text-sm">
              {POPULAR_SLUGS.slice(0, FOOTER_LINKS).map((s) => { const t = toolBySlug(s)!; return <li key={s}><Link href={`/tools/${s}`} className="text-ink-2 hover:text-ink transition-colors">{t.name}</Link></li>; })}
            </ul>
          </div>
          <div className="md:col-span-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Categories</h3>
            <ul className="mt-4 grid gap-2.5 text-sm">
              {CATEGORIES.slice(0, FOOTER_LINKS).map((c) => <li key={c.id}><Link href={`/categories/${c.id}`} className="text-ink-2 hover:text-ink transition-colors">{c.name}</Link></li>)}
            </ul>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Company</h3>
            <ul className="mt-4 grid gap-2.5 text-sm">
              {COMPANY.map((l) => <li key={l.href}><Link href={l.href} className="text-ink-2 hover:text-ink transition-colors">{l.label}</Link></li>)}
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {BRAND.name} · {BRAND.domain}</p>
          <p>Calculators are for guidance only — verify statutory rates with a professional.</p>
        </div>
      </div>
    </footer>
  );
}
