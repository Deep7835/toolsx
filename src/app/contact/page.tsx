import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { BRAND } from "@/lib/brand";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = { title: "Contact", description: `Suggest a tool, report a wrong rate, or ask a question — the ${BRAND.name} team reads everything.`, alternates: { canonical: "/contact" } };

export default function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14">
      <PageHeader eyebrow="Company" title="Contact" description="Suggestions, corrections to a statutory rate, or a tool you wish existed — we’d love to hear it." />
      <div className="mt-8 grid gap-6">
        <ContactForm />
        <p className="text-sm text-muted">Prefer email? Write to <a href={`mailto:${BRAND.email}`} className="text-accent-text underline">{BRAND.email}</a>.</p>
      </div>
    </div>
  );
}
