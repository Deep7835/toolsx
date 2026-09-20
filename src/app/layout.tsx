import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SearchProvider } from "@/components/layout/SearchCommand";
import { ToastProvider } from "@/components/ui/Toast";
import { PwaRegister } from "@/components/layout/PwaRegister";
import { Consent } from "@/components/layout/Consent";
import { BRAND } from "@/lib/brand";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap", axes: ["opsz"] });

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${BRAND.domain}`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: { default: `${BRAND.name} — ${BRAND.tagline}`, template: `%s · ${BRAND.name}` },
  description: BRAND.description,
  applicationName: BRAND.name,
  manifest: "/manifest.webmanifest",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: BRAND.name, locale: "en_IN", url: "/", title: `${BRAND.name} — ${BRAND.tagline}`, description: BRAND.description, images: [{ url: "/og/default", width: 1200, height: 630, alt: `${BRAND.name} — ${BRAND.tagline}` }] },
  twitter: { card: "summary_large_image", title: `${BRAND.name} — ${BRAND.tagline}`, description: BRAND.description, images: ["/og/default"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#ffffff" }, { media: "(prefers-color-scheme: dark)", color: "#0b0b0d" }],
};

const themeScript = `(function(){try{var t=localStorage.getItem('ibt:theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1001] focus:rounded-lg focus:bg-surface focus:px-3 focus:py-2 focus:text-sm">Skip to content</a>
        <ToastProvider>
          <SearchProvider>
            <Header />
            <main id="main" className="flex-1">{children}</main>
            <Footer />
            <PwaRegister />
            <Consent />
          </SearchProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
