import { renderOg } from "@/lib/og";
import { BRAND } from "@/lib/brand";
import { TOOLS } from "@/lib/registry";
export const dynamic = "force-static";
export async function GET() {
  return renderOg({ title: BRAND.tagline, eyebrow: `${TOOLS.length} free tools`, tags: ["documents"], seed: "default", kicker: "GST invoices, UPI QR codes, salary & tax calculators, labels and more — private, in your browser." });
}
