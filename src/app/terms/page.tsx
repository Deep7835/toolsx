import type { Metadata } from "next";
import { ProsePage } from "@/components/layout/Prose";
export const metadata: Metadata = { title: "Terms of service", description: "Terms for using Kaagazo’s free business tools: lawful use, no professional advice, simulated documents, liability.", alternates: { canonical: "/terms" } };
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
      <h2>Liability</h2>
      <p>The service is provided “as is”, without warranty of any kind. We are not liable for losses arising from use of the tools.</p>
    </ProsePage>
  );
}
