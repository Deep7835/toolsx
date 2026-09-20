import { Suspense } from "react";
import type { Metadata } from "next";
import { TOOLS } from "@/lib/registry";
import { ToolGrid } from "@/components/layout/ToolGrid";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = { title: "All tools", description: `Browse all ${TOOLS.length} free, private business tools for Indian MSMEs — invoices, QR codes, calculators, labels, legal and SEO helpers.`, alternates: { canonical: "/tools" } };

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
      <PageHeader eyebrow="Library" title="All tools" description={`${TOOLS.length} free utilities. Filter by category or search by what you need to do.`} />
      <div className="mt-8"><Suspense><ToolGrid /></Suspense></div>
    </div>
  );
}
