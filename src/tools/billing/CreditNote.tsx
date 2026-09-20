"use client";
import InvoiceLike from "./InvoiceLike";
export default function CreditNote() {
  return <InvoiceLike config={{ title: "CREDIT NOTE", numberLabel: "Credit note no.", numberPrefix: "CN-", fromLabel: "Issued by (supplier)", toLabel: "Issued to (customer)", showTax: true, showUpi: false, showDueDate: false, filenamePrefix: "credit-note", itemsLabel: "Returned / discounted items", extra: [{ key: "invoice", label: "Against invoice no.", half: true }, { key: "invdate", label: "Invoice date", type: "date", half: true }, { key: "reason", label: "Reason for credit note", type: "textarea", placeholder: "Sales return · post-sale discount · rate difference · deficiency in service" }], defaultNotes: "The above amount will be adjusted against future invoices or refunded as per agreement.", defaultTerms: "Issued under Section 34 of the CGST Act, 2017.", accent: "#0f766e", shareIntro: "Credit note" }} />;
}
