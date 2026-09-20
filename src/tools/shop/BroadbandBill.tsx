"use client";
import UtilityBill from "./UtilityBill";
export default function BroadbandBill() {
  return <UtilityBill config={{ kind: "broadband", title: "Broadband invoice", provider: { name: "FiberNet Broadband", address: "Plot 9, IT Park, Pune 411057", phone: "1800 123 4567" }, customerIdLabel: "Customer ID", customerIdDefault: "FN-204518", planLabel: "Plan", lines: [{ label: "Fiber plan rental (300 Mbps)", amount: 999 }, { label: "Static IP add-on", amount: 0 }, { label: "Router rental", amount: 0 }, { label: "Installation / one-time", amount: 0 }], gst: 18, accent: "#0f766e", filename: "broadband-bill", notes: "Plan renews automatically on the due date. Speeds are up to the plan limit and depend on wiring and device. Simulated invoice for record-keeping and mock-up purposes." }} />;
}
