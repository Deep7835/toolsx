import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = { title: "Guides", description: "Plain-language explainers and reference tables — UPI MDR, GST calendar, HSN codes, tax regimes — that pair with the tools.", alternates: { canonical: "/guides" } };

const guides = [
  { href: "/tools/upi-mdr-guide", title: "UPI MDR 2026 complete guide", blurb: "How the 0.4% merchant rate, ₹300 cap and P2PM exemptions work, with examples." },
  { href: "/tools/gst-calendar", title: "GST filing calendar FY 2026-27", blurb: "Every GSTR-1, GSTR-3B, CMP-08, IFF and annual return deadline in one place." },
  { href: "/tools/hsn-finder", title: "HSN/SAC codes & GST rates", blurb: "Search codes for common goods and services, with applicable rates." },
  { href: "/tools/income-tax", title: "Old vs new tax regime", blurb: "Compare both regimes side by side before you declare investments." },
];

export default function Guides() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
      <PageHeader eyebrow="Learn" title="Guides & references" description="Plain-language explainers and reference tables that pair with the tools." />
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {guides.map((g) => (
          <Link key={g.href} href={g.href} className="group rounded-2xl border border-border bg-surface p-6 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-border-strong">
            <h2 className="font-display text-2xl text-ink">{g.title}</h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">{g.blurb}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-text">Read <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
          </Link>
        ))}
      </div>
    </div>
  );
}
