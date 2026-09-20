"use client";
import InvoiceLike from "./InvoiceLike";
export default function ProformaInvoice() {
  return <InvoiceLike config={{ title: "PROFORMA INVOICE", numberLabel: "Proforma no.", numberPrefix: "PI-", fromLabel: "Your business", toLabel: "Bill to", showTax: true, showUpi: true, showDueDate: true, dueLabel: "Valid until", filenamePrefix: "proforma", defaultNotes: "This is a proforma invoice for advance payment / order confirmation. A tax invoice will be issued on dispatch.", defaultTerms: "Prices valid till the date mentioned. Advance payment required to confirm the order.", extra: [{ key: "ref", label: "Quotation / order ref.", half: true }, { key: "delivery", label: "Expected delivery", type: "date", half: true }], shareIntro: "Proforma invoice" }} />;
}
