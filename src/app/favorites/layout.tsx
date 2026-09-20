import type { Metadata } from "next";
export const metadata: Metadata = { title: "Favourites", description: "Tools you have pinned and recently used — saved in this browser only.", robots: { index: false } };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
