"use client";
import InvoiceLike from "./InvoiceLike";
export default function DebitNote() {
  return <InvoiceLike config={{ title: "DEBIT NOTE", numberLabel: "Debit note no.", numberPrefix: "DN-", fromLabel: "Issued by", toLabel: "Issued to (supplier)", showTax: true, showUpi: false, showDueDate: false, filenamePrefix: "debit-note", itemsLabel: "Returned / corrected items", extra: [{ key: "invoice", label: "Against invoice no.", half: true }, { key: "invdate", label: "Invoice date", type: "date", half: true }, { key: "reason", label: "Reason for debit note", type: "textarea", placeholder: "Purchase return · short supply · price correction · damaged goods" }], defaultNotes: "Kindly issue a corresponding credit note and adjust the amount in your books.", defaultTerms: "Issued under Section 34 of the CGST Act, 2017.", accent: "#9f1239", shareIntro: "Debit note" }} />;
}
