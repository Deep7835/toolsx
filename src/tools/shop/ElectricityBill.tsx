"use client";
import UtilityBill from "./UtilityBill";
export default function ElectricityBill() {
  return <UtilityBill config={{ kind: "electricity", title: "Electricity bill", provider: { name: "City Power Distribution Ltd.", address: "Sub-division 4, Sector 12, Noida", phone: "1912" }, customerIdLabel: "Consumer no.", customerIdDefault: "1234567890", planLabel: "Connection", lines: [], gst: 0, accent: "#1e3a8a", filename: "electricity-bill", notes: "Pay by the due date to avoid late payment surcharge. Readings are taken monthly; in case of a disputed reading, contact the helpline within 7 days. This bill is a simulation for record-keeping and mock-up purposes." }} />;
}
