import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your saved tools",
  description: "The Kaagazo tools you have saved on this device, ready to reopen. Favourites live in your browser and are never uploaded.",
  alternates: { canonical: "/favorites" },
  robots: { index: false, follow: true },
};

export default function FavoritesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
