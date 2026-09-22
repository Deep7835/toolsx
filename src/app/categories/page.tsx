import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { TOOLS } from "@/lib/registry";
import { CategoryIcon } from "@/components/layout/icons";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = { title: "Tool categories", description: "Browse 115 free tools by job: billing, GST & tax, HR & payroll, finance, marketing & QR, logistics, shop, media, freelancer and legal.", alternates: { canonical: "/categories" }, robots: { index: false, follow: true } };

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
      <PageHeader eyebrow="Browse by category" title="Tool categories" description="Every tool, grouped by the job it does." />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c) => {
          const tools = TOOLS.filter((t) => t.category === c.id);
          return (
            <Link key={c.id} href={`/categories/${c.id}`} className="group rounded-2xl border border-border bg-surface p-6 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-border-strong">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-2 text-ink-2 group-hover:bg-accent-soft group-hover:text-accent-text transition-colors"><CategoryIcon name={c.icon} className="h-5 w-5" /></span>
              <h2 className="mt-4 text-lg font-semibold text-ink">{c.name}</h2>
              <p className="mt-1 text-sm text-muted leading-relaxed">{c.description}</p>
              <ul className="mt-4 space-y-1 text-[13px] text-ink-2">
                {tools.slice(0, 3).map((t) => <li key={t.slug} className="truncate">· {t.name}</li>)}
              </ul>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-text">{tools.length} tools <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
