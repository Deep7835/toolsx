"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Heart, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { SearchButton } from "./SearchCommand";
import { CATEGORIES } from "@/lib/categories";
import { CategoryIcon } from "./icons";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/tools", label: "Tools" },
  { href: "/categories", label: "Categories" },
  { href: "/guides", label: "Guides" },
  { href: "/favorites", label: "Favourites" },
  { href: "/about", label: "Company" },
];

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto grid h-[68px] max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center justify-center gap-1 md:flex" aria-label="Primary">
          {nav.map((n) => {
            const active = path === n.href || (n.href !== "/tools" && path.startsWith(n.href + "/")) || (n.href === "/tools" && path.startsWith("/tools/"));
            return (
              <Link key={n.href} href={n.href} className={cn("rounded-lg px-3.5 py-2 text-[14px] font-medium transition-colors", active ? "text-ink" : "text-ink-2 hover:text-ink")}>
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center justify-end gap-1">
          <SearchButton variant="icon" className="inline-flex" />
          <ThemeToggle />
          <Link href="/tools" className="ml-1 hidden h-10 items-center gap-1.5 rounded-xl bg-accent px-4 text-[14px] font-medium text-on-accent shadow-[0_1px_2px_rgb(0_0_0/0.2),0_8px_20px_-8px_rgb(0_0_0/0.45)] transition-colors hover:bg-accent-hover sm:inline-flex">
            Open app <ArrowUpRight className="h-4 w-4" />
          </Link>
          <button type="button" className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl text-ink-2 hover:bg-surface-2 cursor-pointer" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="md:hidden border-t border-border bg-surface animate-fade-up">
          <nav className="mx-auto max-w-7xl px-4 py-3 grid gap-1" aria-label="Mobile">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-surface-2">{n.label}{n.href === "/favorites" ? <Heart className="h-4 w-4 text-muted" /> : null}</Link>
            ))}
            <div className="mt-2 mb-1 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">Categories</div>
            <div className="grid grid-cols-2 gap-1">
              {CATEGORIES.map((c) => (
                <Link key={c.id} href={`/categories/${c.id}`} onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink-2 hover:bg-surface-2">
                  <CategoryIcon name={c.icon} className="h-4 w-4 text-muted" /> {c.short}
                </Link>
              ))}
            </div>
            <Link href="/tools" onClick={() => setOpen(false)} className="mt-3 inline-flex h-11 items-center justify-center rounded-xl bg-accent text-sm font-medium text-on-accent">Open app</Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
