import type { Metadata } from "next";
import { ProsePage } from "@/components/layout/Prose";
export const metadata: Metadata = { title: "Contact" };
export default function Contact() {
  return (
    <ProsePage eyebrow="Company" title="Contact" description="Suggestions, corrections to a statutory rate, or a tool you wish existed — we’d love to hear it.">
      <p>Email: <a href="mailto:hello@indiabiztools.example">hello@indiabiztools.example</a></p>
      <p>We read everything, and typically reply within two working days.</p>
    </ProsePage>
  );
}
