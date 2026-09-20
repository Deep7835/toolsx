import type { Metadata } from "next";
import { ProsePage } from "@/components/layout/Prose";
export const metadata: Metadata = { title: "Privacy policy", description: "What Kaagazo collects (almost nothing), how local storage and optional analytics cookies work, and your rights under the DPDP Act.", alternates: { canonical: "/privacy-policy" } };
export default function Privacy() {
  return (
    <ProsePage eyebrow="Legal" title="Privacy policy" description="Short version: we can’t see your data, because it never leaves your device.">
      <h2>What we collect</h2>
      <p>Nothing you enter into a tool is transmitted to our servers. Business details, logos and UPI IDs that you choose to remember are stored in your browser’s local storage only, and can be cleared at any time from your browser settings.</p>
      <h2>Third-party requests</h2>
      <p>A few tools fetch public data on demand — for example the currency converter loads live exchange rates, and AI tools download open-source model files the first time you use them. Those requests contain no personal data.</p>
      <h2>Cookies and analytics</h2>
      <p>By default we set no tracking cookies. Your theme, favourites, saved business details and cookie choice are kept in your browser’s local storage. We use Google Analytics 4 in consent mode: until you choose “Accept analytics” in the cookie banner it sets no cookies and only receives cookieless, anonymised page-view pings; after you accept, it may set first-party analytics cookies to count returning visitors (IP addresses are anonymised, no advertising cookies). You can change your choice at any time by clearing site data in your browser. Where cookie-free analytics (such as Plausible) is used, no personal data or cookies are involved.</p>
      <h2>Contact form</h2>
      <p>If you write to us through the contact page, the name, email and message you enter are sent to our mailbox (or to the form service configured for this site) solely to reply to you. We do not add you to any list.</p>
      <h2>Your rights</h2>
      <p>Under the Digital Personal Data Protection Act, 2023 you may ask us what personal data we hold about you (usually none), correct it, or have it erased, and you may nominate someone to exercise these rights. Write to us via the contact page; we respond within 30 days.</p>
      <h2>Contact</h2>
      <p>Questions about privacy? Reach us through the <a href="/contact">contact page</a>.</p>
    </ProsePage>
  );
}
