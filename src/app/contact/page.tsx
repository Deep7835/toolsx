import type { Metadata } from "next";
import { ProsePage } from "@/components/layout/Prose";
import { BRAND } from "@/lib/brand";
export const metadata: Metadata = { title: "Contact" };
export default function Contact() {
  return (
    <ProsePage eyebrow="Company" title="Contact" description="Suggestions, corrections to a statutory rate, or a tool you wish existed — we’d love to hear it.">
      <p>Email: <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></p>
      <p>We read everything, and typically reply within two working days.</p>
    </ProsePage>
  );
}
