import type { Metadata } from "next";
import { ProsePage } from "@/components/layout/Prose";
export const metadata: Metadata = { title: "Terms of service", description: "Terms for using Kaagazo’s free business tools and the optional Kaagazo Pro app subscription: lawful use, no professional advice, billing, liability.", alternates: { canonical: "/terms" } };
export default function Terms() {
  return (
    <ProsePage eyebrow="Legal" title="Terms of service">
      <p>By using Kaagazo you agree to these terms.</p>
      <h2>Use of the tools</h2>
      <p>The tools are provided free of charge for lawful business use. You are responsible for the accuracy of the details you enter and for any document you generate.</p>
      <h2>No professional advice</h2>
      <p>Calculators and generators reflect our understanding of Indian statutory rules at the time of publication. They do not constitute tax, legal or financial advice. Verify with a qualified professional before relying on the output.</p>
      <h2>Simulated documents</h2>
      <p>Some templates (tickets, vouchers, utility bills) are for record-keeping, mock-ups and internal use only. Do not use them to misrepresent a real transaction.</p>
      <h2>Kaagazo Pro (iPhone and Android app)</h2>
      <p>Kaagazo Pro is an optional paid upgrade inside the Kaagazo mobile app. Every tool stays free; Pro adds saved documents with payment status, a customer book, WhatsApp payment reminders and a GST sales export. It is offered as a monthly or yearly auto-renewable subscription, or as a one-time lifetime purchase. The price and billing period are shown in the app before you buy.</p>
      <ul>
        <li>Payment is charged to your Apple ID or Google Play account when you confirm the purchase.</li>
        <li>Subscriptions renew automatically at the same price for the same period unless cancelled at least 24 hours before the end of the current period. Your account is charged for the renewal within 24 hours before the period ends.</li>
        <li>If a free trial is offered, it converts to a paid subscription at the end of the trial unless you cancel before it ends. Any unused part of a free trial ends when you buy a subscription.</li>
        <li>You can manage or cancel a subscription in your App Store or Google Play account settings. Deleting the app does not cancel it.</li>
        <li>Purchases are processed by Apple or Google, and refunds are handled by them under their policies.</li>
        <li>To use Pro on a new phone, sign in with the same store account and tap “Restore purchases” in the app.</li>
      </ul>
      <p>App Store purchases are also subject to Apple’s <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">standard licensed application end user licence agreement</a>.</p>
      <h2>Liability</h2>
      <p>The service is provided “as is”, without warranty of any kind. We are not liable for losses arising from use of the tools.</p>
    </ProsePage>
  );
}
