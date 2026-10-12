/** Single source of truth for the product name — change here to rebrand. */
export const BRAND = {
  name: "Kaagazo",
  wordmark: "Kaagazo.",
  domain: "kaagazo.com",
  tagline: "Business paperwork, done in a minute.",
  description: "Free, private, browser-based GST invoices, UPI QR codes, salary & tax calculators, labels and 100+ tools for Indian shops, freelancers and MSMEs.",
  email: "hello@kaagazo.com",
  /** Google Analytics 4 measurement ID (public). Override with NEXT_PUBLIC_GA_ID at build time. */
  ga4: "G-6GNEHLKQC1",
  /** Google Search Console verification token (public). */
  googleSiteVerification: "bWjMJgGOzbwzGz3Ugl-ieDsCd0gmD-nJqh275rQ_EHs",
  /** Bing Webmaster Tools token (public). Empty unless verified by meta tag — importing from Search Console needs none. */
  bingSiteVerification: "",
  /**
   * Profiles that confirm Kaagazo is its own entity. Google reads these as `sameAs` and uses them to
   * separate the brand from the similarly spelled "Kaagaz" film and scanner app. Add each URL only
   * once the profile exists and links back here — an unreachable sameAs is worse than none.
   */
  profiles: [] as string[],
};
