import type { Metadata } from "next";
import { ProsePage } from "@/components/layout/Prose";
import { BRAND } from "@/lib/brand";
export const metadata: Metadata = { title: "About" };
export default function About() {
  return (
    <ProsePage eyebrow="Company" title={`About ${BRAND.name}`} description="A free, private toolbox for the people who run India’s shops, clinics, agencies and side hustles.">
      <p>India has over 60 million micro, small and medium businesses. Most of them still run on paper bills, WhatsApp photos and a calculator app. Kaagazo exists so a kirana owner in Kanpur or a freelance designer in Kochi can produce a GST-compliant invoice, a UPI QR standee or a payroll slip in under a minute — without installing software, creating an account, or paying a subscription.</p>
      <h2>Principles</h2>
      <ul>
        <li><strong>Private by design.</strong> Every tool runs entirely in your browser. We do not have a database of your invoices because we never receive them.</li>
        <li><strong>Free, always.</strong> No trials, no per-document fees, no watermarks.</li>
        <li><strong>Made for Bharat.</strong> ₹ formatting, lakh/crore words, CGST/SGST/IGST, HSN codes, state Professional Tax slabs and Indian holidays are first-class.</li>
      </ul>
      <h2>Disclaimer</h2>
      <p>Tax, payroll and finance calculators follow published statutory rules but are provided for guidance only. Rates change; please verify with a chartered accountant before filing.</p>
    </ProsePage>
  );
}
