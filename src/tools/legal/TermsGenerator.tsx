"use client";
import { useState } from "react";
import { LegalDocShell } from "./LegalDoc";
import { FieldGroup, Input, Row, Checkbox, Select } from "@/components/ui/Field";
import { useBusiness } from "../shared/Business";
import { fmtDate, todayISO } from "@/lib/format";

export default function TermsGenerator() {
  const { business } = useBusiness();
  const [s, setS] = useState({ name: business.name, url: "https://www.example.in", email: business.email || "support@example.in", type: "store", city: "New Delhi", entity: "proprietorship" });
  const [f, setF] = useState({ accounts: true, payments: true, shipping: true, ugc: false, subscription: false, ip: true });
  const set = (k: keyof typeof s, v: string) => setS({ ...s, [k]: v });
  const svc = s.type === "app" ? "application" : s.type === "service" ? "services" : "online store";
  const md = `# Terms and Conditions

These Terms and Conditions ("Terms") govern your use of the ${svc} operated by **${s.name}** ("${s.name}", "we", "us") at ${s.url}. By accessing or using the Service you agree to these Terms. Last updated ${fmtDate(todayISO(), "long")}.

## 1. Eligibility
You must be at least 18 years old and capable of entering into a binding contract under the Indian Contract Act, 1872 to use the Service. If you use the Service on behalf of a business, you represent that you are authorised to bind it.

${f.accounts ? `## 2. Accounts
You are responsible for keeping your login credentials confidential and for all activity under your account. Notify us immediately at ${s.email} of any unauthorised use. We may suspend accounts that violate these Terms.

` : ""}## ${f.accounts ? 3 : 2}. Orders and pricing
- All prices are in Indian Rupees and inclusive of GST unless stated otherwise.
- An order is confirmed only when we send a confirmation; we may cancel orders due to stock errors, pricing mistakes or suspected fraud, in which case any amount paid will be refunded in full.
- Product images are illustrative; minor variations in colour or packaging may occur.

${f.payments ? `## ${f.accounts ? 4 : 3}. Payments
We accept UPI, cards, net banking, wallets and cash on delivery where offered. Payments are processed by third-party gateways subject to their terms. In case of a failed transaction where money is debited, the amount is typically reversed by your bank within 5–7 working days.

` : ""}${f.shipping ? `## ${(f.accounts ? 4 : 3) + (f.payments ? 1 : 0)}. Shipping and delivery
Estimated delivery times are indicative. Risk of loss passes to you on delivery. Please inspect packages on receipt and report damage within 48 hours with photographs. Our Refund & Return Policy forms part of these Terms.

` : ""}${f.subscription ? `## Subscriptions
Subscription plans renew automatically at the stated interval until cancelled. You may cancel anytime from your account; access continues until the end of the paid period. Fees are non-refundable except as required by law.

` : ""}${f.ugc ? `## User content
By posting reviews, photos or other content you grant us a non-exclusive, royalty-free licence to use it in connection with the Service. You must not post content that is unlawful, defamatory, infringing or misleading.

` : ""}${f.ip ? `## Intellectual property
All content on the Service — logos, text, images, designs and software — is owned by or licensed to ${s.name} and protected under the Copyright Act, 1957 and the Trade Marks Act, 1999. You may not copy, modify or distribute it without written permission.

` : ""}## Prohibited conduct
You agree not to misuse the Service, including by attempting unauthorised access, scraping data, placing fraudulent orders, or interfering with its operation.

## Limitation of liability
To the fullest extent permitted by law, ${s.name} shall not be liable for any indirect, incidental or consequential loss. Our total liability for any claim is limited to the amount you paid for the relevant order. Nothing in these Terms limits liability that cannot be excluded under the Consumer Protection Act, 2019.

## Indemnity
You agree to indemnify ${s.name} against claims arising from your breach of these Terms or misuse of the Service.

## Governing law and disputes
These Terms are governed by the laws of India. Courts at ${s.city} shall have exclusive jurisdiction, subject to your rights under the Consumer Protection Act, 2019 and applicable e-commerce rules.

## Changes
We may update these Terms; continued use after changes constitutes acceptance.

## Contact
${s.name}${s.entity !== "proprietorship" ? ` (${s.entity === "llp" ? "LLP" : s.entity === "pvt" ? "Private Limited" : "Partnership"})` : ""}
${business.address ? business.address.replace(/\n/g, ", ") + "\n" : ""}Email: ${s.email}${business.phone ? `\nPhone: ${business.phone}` : ""}
`;
  const form = (
    <>
      <FieldGroup title="Business">
        <Row><Input label="Business name" value={s.name} onChange={(e) => set("name", e.target.value)} /><Select label="Entity" value={s.entity} onChange={(e) => set("entity", e.target.value)} options={[{ value: "proprietorship", label: "Proprietorship" }, { value: "partnership", label: "Partnership" }, { value: "llp", label: "LLP" }, { value: "pvt", label: "Private Limited" }]} /><Select label="Service type" value={s.type} onChange={(e) => set("type", e.target.value)} options={[{ value: "store", label: "Online store" }, { value: "service", label: "Services / agency" }, { value: "app", label: "App / SaaS" }]} /><Input label="URL" value={s.url} onChange={(e) => set("url", e.target.value)} /><Input label="Support email" value={s.email} onChange={(e) => set("email", e.target.value)} /><Input label="Jurisdiction city" value={s.city} onChange={(e) => set("city", e.target.value)} /></Row>
      </FieldGroup>
      <FieldGroup title="Sections"><div className="grid gap-2"><Checkbox checked={f.accounts} onChange={(v) => setF({ ...f, accounts: v })} label="User accounts" /><Checkbox checked={f.payments} onChange={(v) => setF({ ...f, payments: v })} label="Payments" /><Checkbox checked={f.shipping} onChange={(v) => setF({ ...f, shipping: v })} label="Shipping & delivery" /><Checkbox checked={f.subscription} onChange={(v) => setF({ ...f, subscription: v })} label="Subscriptions" /><Checkbox checked={f.ugc} onChange={(v) => setF({ ...f, ugc: v })} label="User-generated content" /><Checkbox checked={f.ip} onChange={(v) => setF({ ...f, ip: v })} label="Intellectual property" /></div></FieldGroup>
    </>
  );
  return <LegalDocShell title="Terms and Conditions" form={form} markdown={md} filename="terms-and-conditions" />;
}
