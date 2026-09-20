import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SearchProvider } from "@/components/layout/SearchCommand";
import { ToastProvider } from "@/components/ui/Toast";
import { PwaRegister } from "@/components/layout/PwaRegister";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", display: "swap" });

export const metadata: Metadata = {
  title: { default: "India Biz Tools — 115 free business utilities for Indian MSMEs", template: "%s · India Biz Tools" },
  description: "Free, private, browser-based GST invoices, UPI QR standees, salary & tax calculators, barcodes, labels and 100+ tools for Indian shops, freelancers and MSMEs.",
  applicationName: "India Biz Tools",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#fafaf9" }, { media: "(prefers-color-scheme: dark)", color: "#0c0a09" }],
};

const themeScript = `(function(){try{var t=localStorage.getItem('ibt:theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${instrument.variable}`} suppressHydrationWarning>
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
          </SearchProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
