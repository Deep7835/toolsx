"use client";
import { useState } from "react";
import { LegalDocShell } from "./LegalDoc";
import { FieldGroup, Input, Row, NumberInput, Select, Checkbox } from "@/components/ui/Field";
import { useBusiness } from "../shared/Business";
import { fmtDate, todayISO } from "@/lib/format";

export default function RefundPolicy() {
  const { business } = useBusiness();
  const [s, setS] = useState({ name: business.name, email: business.email || "support@example.in", type: "physical", days: 7, refundDays: 7, method: "original", shipping: "customer", restock: 0 });
  const [x, setX] = useState({ perishable: true, custom: true, digital: true, hygiene: true, sale: false });
  const set = (k: keyof typeof s, v: string | number) => setS({ ...s, [k]: v });
  const md = `# Refund & Return Policy

Thank you for shopping with **${s.name}**. We want you to be happy with your purchase. This policy explains when and how you can return items and receive a refund. Last updated ${fmtDate(todayISO(), "long")}.

## 1. Return window
${s.type === "digital" ? "Digital products are delivered instantly and cannot be returned once accessed, except where the file is corrupt or materially different from its description — contact us within " + s.days + " days for a replacement or refund." : s.type === "service" ? "You may cancel a service booking up to " + s.days + " days before the scheduled date for a full refund. Cancellations after that may attract charges for work already performed." : "You may request a return within **" + s.days + " days** of delivery. Items must be unused, in original packaging with all tags, accessories and the invoice."}

## 2. Non-returnable items
${x.perishable ? "- Perishable goods such as food, flowers and fresh produce.\n" : ""}${x.custom ? "- Customised or made-to-order products (e.g. printed, engraved or tailored items).\n" : ""}${x.hygiene ? "- Innerwear, cosmetics and personal-care items once opened, for hygiene reasons.\n" : ""}${x.digital ? "- Downloadable software, e-books and gift cards.\n" : ""}${x.sale ? "- Items purchased during clearance sales, unless defective.\n" : ""}- Any item that is damaged due to misuse or not in its original condition.

## 3. Damaged, defective or wrong items
If you receive a damaged, defective or incorrect item, contact us within 48 hours of delivery with photographs and your order number. We will arrange a free replacement or a full refund, including any shipping paid.

## 4. How to start a return
- Email **${s.email}**${business.phone ? ` or WhatsApp **${business.phone}**` : ""} with your order number and reason.
- We will confirm eligibility within 2 working days and share pickup or drop-off instructions.
- Pack the item securely with the invoice.

## 5. Return shipping
${s.shipping === "customer" ? "Return shipping costs are borne by the customer, except for damaged, defective or wrong items." : s.shipping === "free" ? "We offer free reverse pickup for eligible returns in serviceable pincodes." : "Return shipping is shared: we deduct a flat handling charge from the refund unless the item is defective."}${s.restock ? ` A restocking fee of ${s.restock}% applies to opened, non-defective items.` : ""}

## 6. Refunds
Once we receive and inspect the item, we will notify you of approval. Approved refunds are processed within **${s.refundDays} working days** ${s.method === "original" ? "to the original payment method (UPI, card, net banking or wallet)." : s.method === "credit" ? "as store credit valid for 12 months." : "to the original payment method, or as store credit at your choice."} Cash-on-delivery orders are refunded by bank transfer or UPI to details you provide. Banks may take an additional 5–7 days to reflect the amount.

## 7. Exchanges
We replace items for a different size or variant subject to availability. If the replacement is unavailable, a refund will be issued.

## 8. Cancellations
Orders can be cancelled before dispatch for a full refund. Once shipped, please follow the return process above.

## 9. Contact
${s.name}
${business.address ? business.address.replace(/\n/g, ", ") + "\n" : ""}Email: ${s.email}${business.phone ? `\nPhone: ${business.phone}` : ""}

This policy is in addition to your rights under the Consumer Protection Act, 2019 and the Consumer Protection (E-Commerce) Rules, 2020.
`;
  const form = (
    <>
      <FieldGroup title="Business">
        <Row><Input label="Business name" value={s.name} onChange={(e) => set("name", e.target.value)} /><Input label="Support email" value={s.email} onChange={(e) => set("email", e.target.value)} /><Select label="What you sell" value={s.type} onChange={(e) => set("type", e.target.value)} options={[{ value: "physical", label: "Physical products" }, { value: "digital", label: "Digital products" }, { value: "service", label: "Services / bookings" }]} /><NumberInput label="Return window" suffix="days" value={s.days} onChange={(v) => set("days", v)} /></Row>
      </FieldGroup>
      <FieldGroup title="Refund terms">
        <Row><NumberInput label="Refund processing" suffix="working days" value={s.refundDays} onChange={(v) => set("refundDays", v)} /><Select label="Refund method" value={s.method} onChange={(e) => set("method", e.target.value)} options={[{ value: "original", label: "Original payment method" }, { value: "credit", label: "Store credit" }, { value: "choice", label: "Customer's choice" }]} /><Select label="Return shipping" value={s.shipping} onChange={(e) => set("shipping", e.target.value)} options={[{ value: "customer", label: "Paid by customer" }, { value: "free", label: "Free reverse pickup" }, { value: "shared", label: "Shared / handling charge" }]} /><NumberInput label="Restocking fee" suffix="%" value={s.restock} onChange={(v) => set("restock", v)} /></Row>
      </FieldGroup>
      <FieldGroup title="Exclusions"><div className="grid gap-2"><Checkbox checked={x.perishable} onChange={(v) => setX({ ...x, perishable: v })} label="Perishables" /><Checkbox checked={x.custom} onChange={(v) => setX({ ...x, custom: v })} label="Customised items" /><Checkbox checked={x.hygiene} onChange={(v) => setX({ ...x, hygiene: v })} label="Hygiene / personal care" /><Checkbox checked={x.digital} onChange={(v) => setX({ ...x, digital: v })} label="Digital goods & gift cards" /><Checkbox checked={x.sale} onChange={(v) => setX({ ...x, sale: v })} label="Clearance sale items" /></div></FieldGroup>
    </>
  );
  return <LegalDocShell title="Refund & Return Policy" form={form} markdown={md} filename="refund-return-policy" />;
}
