import Link from "next/link";
import { TOOLS } from "@/lib/registry";
import { CATEGORIES, type CategoryId } from "@/lib/categories";

/**
 * Server-rendered index of every tool.
 *
 * The interactive grid above it is a client component, so its links never reach a crawler —
 * which left the "all tools" hub exposing only the five in the footer. This gives both readers
 * and search engines a plain, complete set of links to each tool.
 */
export function ToolDirectory({ only, heading = "Every tool, A to Z" }: { only?: CategoryId; heading?: string }) {
  const cats = only ? CATEGORIES.filter((c) => c.id === only) : CATEGORIES;
  const byCat = cats
    .map((c) => ({ cat: c, tools: TOOLS.filter((t) => t.category === c.id).sort((a, b) => a.name.localeCompare(b.name)) }))
    .filter((g) => g.tools.length);

  return (
    <nav aria-label={heading} className="mt-16 border-t border-border pt-10">
      <h2 className="font-display text-xl text-ink">{heading}</h2>
      <p className="mt-1.5 text-sm text-muted">Every tool is free, works in your browser and needs no account.</p>
      <div className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {byCat.map(({ cat, tools }) => (
          <div key={cat.id}>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{cat.name}</h3>
            <ul className="mt-3 grid gap-1.5">
              {tools.map((t) => (
                <li key={t.slug}>
                  <Link href={`/tools/${t.slug}`} className="text-[13px] leading-snug text-ink-2 hover:text-ink hover:underline underline-offset-2">{t.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
