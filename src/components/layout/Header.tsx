"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Heart } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { SearchButton } from "./SearchCommand";
import { CATEGORIES } from "@/lib/categories";
import { CategoryIcon } from "./icons";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/tools", label: "All tools" },
  { href: "/categories", label: "Categories" },
  { href: "/guides", label: "Guides" },
];

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Logo />
        <nav className="ml-6 hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map((n) => {
            const active = path === n.href || (n.href !== "/tools" && path.startsWith(n.href + "/"));
            return (
              <Link key={n.href} href={n.href} className={cn("rounded-lg px-3 py-2 text-sm font-medium transition-colors", active ? "text-ink bg-surface-2" : "text-muted hover:text-ink hover:bg-surface-2")}>
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <SearchButton className="hidden md:inline-flex w-64" />
          <SearchButton variant="icon" className="inline-flex md:hidden" />
          <Link href="/favorites" aria-label="Favourite tools" className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-ink-2 hover:bg-surface-2 hover:text-ink transition-colors">
            <Heart className="h-[18px] w-[18px]" strokeWidth={1.75} />
          </Link>
          <ThemeToggle />
          <button type="button" className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl text-ink-2 hover:bg-surface-2 cursor-pointer" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="md:hidden border-t border-border bg-surface animate-fade-up">
          <nav className="mx-auto max-w-7xl px-4 py-3 grid gap-1" aria-label="Mobile">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-surface-2">{n.label}</Link>
            ))}
            <div className="mt-2 mb-1 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">Categories</div>
            <div className="grid grid-cols-2 gap-1">
              {CATEGORIES.map((c) => (
                <Link key={c.id} href={`/categories/${c.id}`} onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink-2 hover:bg-surface-2">
                  <CategoryIcon name={c.icon} className="h-4 w-4 text-muted" /> {c.short}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
