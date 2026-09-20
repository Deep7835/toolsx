import { notFound } from "next/navigation";
import { TOOLS, toolBySlug } from "@/lib/registry";
import { categoryById } from "@/lib/categories";
import { renderOg } from "@/lib/og";
import { BRAND } from "@/lib/brand";

export const dynamic = "force-static";
export function generateStaticParams() { return TOOLS.map((t) => ({ slug: t.slug })); }

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = toolBySlug(slug);
  if (!t) notFound();
  return renderOg({ title: t.name, eyebrow: categoryById(t.category).name, tags: [t.category], seed: t.slug, kicker: t.description.length > 110 ? t.description.slice(0, 108).replace(/\s+\S*$/, "") + "…" : t.description, footer: `${BRAND.domain} · free · no login · 100% private` });
}
