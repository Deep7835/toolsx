"use client";
import InvoiceLike from "./InvoiceLike";

export default function GstInvoice() {
  return (
    <InvoiceLike
      config={{
        title: "TAX INVOICE",
        numberLabel: "Invoice no.",
        numberPrefix: "INV-",
        fromLabel: "Your business",
        toLabel: "Bill to",
        showTax: true,
        showUpi: true,
        showDueDate: true,
        filenamePrefix: "invoice",
        defaultNotes: "Thank you for your business.",
        defaultTerms: "Goods once sold will not be taken back. Payment due within 15 days.",
        shareIntro: "Invoice",
      }}
    />
  );
}
