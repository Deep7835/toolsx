"use client";
import UtilityBill from "./UtilityBill";
export default function SocietyMaintenance() {
  return <UtilityBill config={{ kind: "society", title: "Maintenance invoice", provider: { name: "Green Park Residents Welfare Association", address: "Green Park Apartments, Sector 21, Noida 201301", phone: "0120 400 1234" }, customerIdLabel: "Flat no.", customerIdDefault: "B-302", planLabel: "Unit", lines: [{ label: "Monthly maintenance (₹2.50 × 1,250 sq ft)", amount: 3125 }, { label: "Sinking fund", amount: 250 }, { label: "Covered parking", amount: 500 }, { label: "Water charges", amount: 300 }, { label: "Club / gym facility", amount: 0 }], gst: 0, accent: "#374151", filename: "maintenance-invoice", notes: "Maintenance is payable by the 10th of every month. Late payment attracts a penalty of ₹100 per month. GST is not applicable where monthly charges per member are within the ₹7,500 exemption limit." }} />;
}
