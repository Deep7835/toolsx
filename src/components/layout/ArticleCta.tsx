import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ToolMeta } from "@/lib/registry";
import { TOOLS } from "@/lib/registry";

export function ArticleCta({ tool }: { tool: ToolMeta | null | undefined }) {
  const href = tool ? `/tools/${tool.slug}` : "/tools";
  return (
    <aside className="sky relative mt-12 overflow-hidden rounded-2xl border border-border/60 p-6 sm:p-8">
      <span className="cloud left-[-10%] top-[-30%] h-[160px] w-[400px]" />
      <div className="relative">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-2">Do it now — free, no login</p>
        <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-ink">{tool ? tool.name : `Browse ${TOOLS.length} free business tools`}</h2>
        <p className="mt-2 max-w-lg text-[15px] text-ink-2">{tool ? tool.description : "Invoices, QR codes, calculators, labels and more — everything runs in your browser."}</p>
        <Link href={href} className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-5 text-[14px] font-medium text-on-accent shadow-[0_1px_2px_rgb(0_0_0/0.2),0_8px_20px_-8px_rgb(0_0_0/0.45)] transition-colors hover:bg-accent-hover">
          {tool ? "Open the tool" : "Open the toolbox"} <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </aside>
  );
}
