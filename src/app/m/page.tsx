import { Suspense } from "react";
import { MenuView } from "./MenuView";
export const metadata = {
  title: "Digital menu",
  description: "A menu published with the Kaagazo menu creator. Scan the QR at the table to view it.",
  robots: { index: false, follow: false },
};
export default function MenuPage() {
  return <Suspense><MenuView /></Suspense>;
}
