"use client";
import { useState } from "react";
import { LegalDocShell } from "./LegalDoc";
import { FieldGroup, Input, Row, Checkbox, Select } from "@/components/ui/Field";
import { useBusiness } from "../shared/Business";
import { fmtDate, todayISO } from "@/lib/format";

export default function PrivacyPolicy() {
  const { business } = useBusiness();
  const [site, setSite] = useState({ name: business.name, url: "https://www.example.in", email: business.email || "privacy@example.in", type: "website" });
  const [collect, setCollect] = useState({ contact: true, payment: true, usage: true, location: false, cookies: true, marketing: true });
  const [third, setThird] = useState({ analytics: true, payments: true, ads: false, email: true, whatsapp: true });
  const [region, setRegion] = useState("india");
  const c = (k: keyof typeof collect, v: boolean) => setCollect({ ...collect, [k]: v });
  const t = (k: keyof typeof third, v: boolean) => setThird({ ...third, [k]: v });
  const svc = site.type === "app" ? "mobile application" : site.type === "store" ? "online store" : "website";

  const md = `# Privacy Policy

**${site.name}** ("we", "us", "our") operates the ${svc} ${site.url} (the "Service"). This policy explains what personal data we collect, why, and how you can exercise your rights. Last updated ${fmtDate(todayISO(), "long")}.

## 1. Information we collect
${collect.contact ? "- **Contact details** — name, phone number, email and postal address you provide when you place an order, create an account or contact us.\n" : ""}${collect.payment ? "- **Payment information** — transaction references and billing details. Card and UPI credentials are processed by our payment partners and are never stored on our servers.\n" : ""}${collect.usage ? "- **Usage data** — pages visited, device type, browser, IP address and approximate location derived from it, collected automatically to keep the Service secure and improve it.\n" : ""}${collect.location ? "- **Location** — precise location only when you grant permission, used to show nearby stores or delivery options.\n" : ""}${collect.cookies ? "- **Cookies and similar technologies** — small files that remember your preferences, keep you signed in and measure traffic. You can disable cookies in your browser; some features may stop working.\n" : ""}
## 2. How we use your information
- To process orders, deliver products or services and provide customer support.
- To send transactional messages such as order confirmations, invoices and delivery updates${third.whatsapp ? " (including on WhatsApp)" : ""}.
${collect.marketing ? "- To send offers and updates where you have opted in. You can unsubscribe at any time.\n" : ""}- To detect fraud, enforce our terms and comply with legal obligations such as GST record-keeping.
- To analyse how the Service is used so we can improve it.

## 3. Legal basis and consent
We process personal data on the basis of your consent, the performance of a contract with you, our legitimate business interests, and compliance with law. ${region === "india" ? "In accordance with the Digital Personal Data Protection Act, 2023 (DPDP Act), we collect data only for the specified purpose you were informed of, and you may withdraw consent at any time." : "Where the GDPR applies, you have the rights described in section 6 and may lodge a complaint with your supervisory authority."}

## 4. Sharing your information
We do not sell your personal data. We share it only with:
${third.payments ? "- **Payment processors** (e.g. Razorpay, PayU, UPI apps) to complete transactions.\n" : ""}${third.analytics ? "- **Analytics providers** (e.g. Google Analytics) that help us understand usage in aggregated form.\n" : ""}${third.ads ? "- **Advertising partners** that show you relevant ads and measure campaigns.\n" : ""}${third.email ? "- **Communication tools** used to send emails and SMS on our behalf.\n" : ""}- **Logistics partners** to deliver physical goods.
- **Authorities** where required by law, court order or to protect our rights.

## 5. Data retention
We keep personal data only as long as needed for the purposes above. Invoices and tax records are retained for the period required under the GST and Income Tax laws (typically 6–8 years). You may ask us to delete other data sooner.

## 6. Your rights
You may access, correct or request deletion of your personal data, withdraw consent, and opt out of marketing. ${region === "india" ? "Under the DPDP Act you may also nominate a person to exercise these rights on your behalf and raise a grievance with our Grievance Officer; if unresolved, with the Data Protection Board of India." : "You may also object to processing, request portability and lodge a complaint with a supervisory authority."} To exercise any right, email **${site.email}**. We respond within 30 days.

## 7. Security
We use HTTPS encryption, access controls and reputable hosting providers to protect your data. No method of transmission is completely secure; please keep your account password confidential.

## 8. Children
The Service is not directed at children under 18. We do not knowingly collect data from children without verifiable parental consent.

## 9. Changes to this policy
We may update this policy from time to time. The revised version will be posted here with a new "last updated" date.

## 10. Contact / Grievance Officer
${site.name}
${business.address ? business.address.replace(/\n/g, ", ") + "\n" : ""}Email: ${site.email}${business.phone ? `\nPhone: ${business.phone}` : ""}
`;

  const form = (
    <>
      <FieldGroup title="Business">
        <Row><Input label="Business / brand name" value={site.name} onChange={(e) => setSite({ ...site, name: e.target.value })} /><Select label="Type" value={site.type} onChange={(e) => setSite({ ...site, type: e.target.value })} options={[{ value: "website", label: "Website" }, { value: "store", label: "Online store" }, { value: "app", label: "Mobile app" }]} /><Input label="URL" value={site.url} onChange={(e) => setSite({ ...site, url: e.target.value })} /><Input label="Privacy contact email" value={site.email} onChange={(e) => setSite({ ...site, email: e.target.value })} /></Row>
        <Select label="Primary law" value={region} onChange={(e) => setRegion(e.target.value)} options={[{ value: "india", label: "India — DPDP Act 2023" }, { value: "eu", label: "EU / UK — GDPR" }]} />
      </FieldGroup>
      <FieldGroup title="What you collect"><div className="grid gap-2"><Checkbox checked={collect.contact} onChange={(v) => c("contact", v)} label="Contact details (name, phone, email, address)" /><Checkbox checked={collect.payment} onChange={(v) => c("payment", v)} label="Payment / billing info" /><Checkbox checked={collect.usage} onChange={(v) => c("usage", v)} label="Usage & device data" /><Checkbox checked={collect.location} onChange={(v) => c("location", v)} label="Precise location" /><Checkbox checked={collect.cookies} onChange={(v) => c("cookies", v)} label="Cookies" /><Checkbox checked={collect.marketing} onChange={(v) => c("marketing", v)} label="Marketing communications" /></div></FieldGroup>
      <FieldGroup title="Third parties"><div className="grid gap-2"><Checkbox checked={third.payments} onChange={(v) => t("payments", v)} label="Payment gateways" /><Checkbox checked={third.analytics} onChange={(v) => t("analytics", v)} label="Analytics" /><Checkbox checked={third.ads} onChange={(v) => t("ads", v)} label="Advertising networks" /><Checkbox checked={third.email} onChange={(v) => t("email", v)} label="Email / SMS providers" /><Checkbox checked={third.whatsapp} onChange={(v) => t("whatsapp", v)} label="WhatsApp Business" /></div></FieldGroup>
    </>
  );
  return <LegalDocShell title="Privacy Policy" form={form} markdown={md} filename="privacy-policy" intro="Generates a DPDP-aware policy you can paste on your site." />;
}
