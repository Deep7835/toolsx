export type CategoryId =
  | "billing"
  | "tax"
  | "hr"
  | "finance"
  | "marketing"
  | "logistics"
  | "shop"
  | "media"
  | "freelancer"
  | "legal";

export interface Category {
  id: CategoryId;
  name: string;
  short: string;
  description: string;
  icon: string; // lucide icon name (resolved in components)
}

export const CATEGORIES: Category[] = [
  { id: "billing", name: "Billing & Invoicing", short: "Billing", description: "GST invoices, notes, receipts, challans and purchase orders.", icon: "receipt" },
  { id: "tax", name: "GST & Tax", short: "Tax", description: "GST, TDS, income tax, HSN codes and filing calendars.", icon: "landmark" },
  { id: "hr", name: "HR & Payroll", short: "HR", description: "Salary, payroll, PF, leave, letters and certificates.", icon: "users" },
  { id: "finance", name: "Business Finance", short: "Finance", description: "EMI, SIP, margins, growth and unit economics.", icon: "trending-up" },
  { id: "marketing", name: "Marketing & Barcodes", short: "Marketing", description: "QR codes, WhatsApp links, reviews and marketing KPIs.", icon: "qr-code" },
  { id: "logistics", name: "Print & Logistics", short: "Logistics", description: "Labels, price tags, shipping and delivery metrics.", icon: "package" },
  { id: "shop", name: "Shop Owner Tools", short: "Shop", description: "Menus, standees, bills, vouchers and everyday store utilities.", icon: "store" },
  { id: "media", name: "Media & Images", short: "Media", description: "Image compression, background removal, OCR, PDF and dev tools.", icon: "image" },
  { id: "freelancer", name: "Freelancer & Service Tools", short: "Freelancer", description: "Quotes, rates, signatures and client-ready documents.", icon: "briefcase" },
  { id: "legal", name: "Legal & SEO", short: "Legal & SEO", description: "Policies, terms, schema markup and search previews.", icon: "scale" },
];

export const categoryById = (id: CategoryId) => CATEGORIES.find((c) => c.id === id)!;
