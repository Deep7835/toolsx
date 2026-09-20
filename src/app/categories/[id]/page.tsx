import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CATEGORIES, type CategoryId } from "@/lib/categories";
import { toolsByCategory } from "@/lib/registry";
import { ToolGrid } from "@/components/layout/ToolGrid";
import { PageHeader } from "@/components/layout/PageHeader";

export function generateStaticParams() { return CATEGORIES.map((c) => ({ id: c.id })); }
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const c = CATEGORIES.find((x) => x.id === id);
  return { title: c ? c.name : "Category" };
}

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = CATEGORIES.find((x) => x.id === id);
  if (!c) notFound();
  const tools = toolsByCategory(c.id as CategoryId);
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
      <PageHeader eyebrow="Category" title={c.name} description={c.description} />
      <div className="mt-8"><Suspense><ToolGrid tools={tools} lockedCategory={c.id} /></Suspense></div>
    </div>
  );
}
