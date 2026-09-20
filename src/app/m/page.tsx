import { Suspense } from "react";
import { MenuView } from "./MenuView";
export const metadata = { title: "Digital menu" };
export default function MenuPage() {
  return <Suspense><MenuView /></Suspense>;
}
