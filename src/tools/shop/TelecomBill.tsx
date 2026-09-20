"use client";
import UtilityBill from "./UtilityBill";
export default function TelecomBill() {
  return <UtilityBill config={{ kind: "telecom", title: "Mobile postpaid bill", provider: { name: "BharatTel Mobile", address: "Circle office, Bengaluru", phone: "198" }, customerIdLabel: "Mobile number", customerIdDefault: "98765 43210", planLabel: "Plan", lines: [{ label: "Monthly plan rental", amount: 599 }, { label: "Additional data (5 GB)", amount: 99 }, { label: "International roaming", amount: 0 }, { label: "Value added services", amount: 0 }], gst: 18, accent: "#7c2d12", filename: "mobile-bill", notes: "Charges are exclusive of GST @ 18%. Usage beyond plan limits is billed at standard rates. Simulated bill for record-keeping and mock-up purposes." }} />;
}
