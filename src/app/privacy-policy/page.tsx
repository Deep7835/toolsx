import type { Metadata } from "next";
import { ProsePage } from "@/components/layout/Prose";
export const metadata: Metadata = { title: "Privacy policy" };
export default function Privacy() {
  return (
    <ProsePage eyebrow="Legal" title="Privacy policy" description="Short version: we can’t see your data, because it never leaves your device.">
      <h2>What we collect</h2>
      <p>Nothing you enter into a tool is transmitted to our servers. Business details, logos and UPI IDs that you choose to remember are stored in your browser’s local storage only, and can be cleared at any time from your browser settings.</p>
      <h2>Third-party requests</h2>
      <p>A few tools fetch public data on demand — for example the currency converter loads live exchange rates, and AI tools download open-source model files the first time you use them. Those requests contain no personal data.</p>
      <h2>Cookies</h2>
      <p>We set no tracking cookies. Your theme preference and favourites are kept in local storage.</p>
      <h2>Contact</h2>
      <p>Questions about privacy? Reach us through the <a href="/contact">contact page</a>.</p>
    </ProsePage>
  );
}
