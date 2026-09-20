"use client";
import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const H = ({ children }: { children: React.ReactNode }) => <h2 className="mt-8 font-display text-2xl text-ink">{children}</h2>;
const P = ({ children }: { children: React.ReactNode }) => <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{children}</p>;

export default function UpiMdrGuide() {
  return (
    <div className="grid gap-6 lg:grid-cols-12 items-start">
      <article className="lg:col-span-8 min-w-0">
        <Card><CardBody className="px-6 py-8 sm:px-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Guide · updated 20 September 2026 · NPCI circular of 15 September</p>
          <h1 className="mt-2 font-display text-4xl text-ink">UPI MDR 2026: what merchants actually pay</h1>
          <P>For eight years UPI was free for everyone. From <b>15 October 2026</b>, under an NPCI circular issued on 15 September, a Merchant Discount Rate (MDR) applies to person-to-merchant (P2M) payments above ₹2,000, while small merchants and all person-to-person transfers stay free. This guide explains who pays, how much, and how to plan for it.</P>
          <H>The framework in one table</H>
          <div className="mt-3 overflow-hidden rounded-xl border border-border"><table className="w-full text-sm"><thead className="bg-surface-2 text-left text-[11px] uppercase tracking-[0.1em] text-muted"><tr><th className="px-4 py-2.5">Merchant / transaction</th><th className="px-4 py-2.5">MDR</th><th className="px-4 py-2.5">Cap</th></tr></thead><tbody className="divide-y divide-border">
            <tr><td className="px-4 py-2.5">P2P — sending money to friends, family, individuals</td><td className="px-4 py-2.5 font-semibold text-accent-text">0%</td><td className="px-4 py-2.5">—</td></tr>
            <tr><td className="px-4 py-2.5">P2PM — small merchants receiving up to ₹1 lakh per month via UPI QR</td><td className="px-4 py-2.5 font-semibold text-accent-text">0%</td><td className="px-4 py-2.5">—</td></tr>
            <tr><td className="px-4 py-2.5">P2M — large merchants, transactions up to ₹2,000</td><td className="px-4 py-2.5 font-semibold text-accent-text">0%</td><td className="px-4 py-2.5">—</td></tr>
            <tr><td className="px-4 py-2.5">P2M — merchants, transactions above ₹2,000</td><td className="px-4 py-2.5 font-semibold">0.4%</td><td className="px-4 py-2.5">₹300 per transaction (reached at ₹75,000)</td></tr>
            <tr><td className="px-4 py-2.5">Fuel, railways, telecom — transactions above ₹2,000</td><td className="px-4 py-2.5 font-semibold">Flat ₹5</td><td className="px-4 py-2.5">per transaction</td></tr>
            <tr><td className="px-4 py-2.5">UPI credit card / credit line on UPI</td><td className="px-4 py-2.5 font-semibold">Card MDR (≈ 1–2%)</td><td className="px-4 py-2.5">Per issuer</td></tr>
          </tbody></table></div>
          <P>MDR is a percentage of the transaction that the merchant’s payment service provider (PSP) deducts before settling money to the merchant’s bank account. It is shared between the acquiring bank, the issuing bank and NPCI. GST at 18% applies on the MDR amount.</P>
          <H>Who is a “small merchant”?</H>
          <P>NPCI classifies merchants as P2PM (peer-to-peer-merchant) when they receive up to <b>₹1 lakh per month</b> via UPI QR codes — typically kirana stores, street vendors, auto drivers and small service providers onboarded through QR apps. These pay no MDR on any transaction. Merchants above that inflow, or those with full-KYC merchant accounts on payment gateways, are P2M and fall under the 0.4% structure for tickets above ₹2,000.</P>
          <H>Worked examples</H>
          <ul className="mt-3 grid gap-2 text-[15px] leading-relaxed text-ink-2 [&_li]:flex [&_li]:gap-2"><li><span className="text-accent-text">•</span>₹1,500 payment at a large retailer → below ₹2,000 → <b>₹0 MDR</b>.</li><li><span className="text-accent-text">•</span>₹5,000 payment → 0.4% = ₹20 + ₹3.60 GST → merchant receives <b>₹4,976.40</b>.</li><li><span className="text-accent-text">•</span>₹1,00,000 payment → 0.4% = ₹400, capped at <b>₹300</b> + ₹54 GST → merchant receives ₹99,646.</li><li><span className="text-accent-text">•</span>Kirana store receiving ₹80,000 a month over UPI QR → P2PM → <b>₹0 MDR</b> regardless of ticket size.</li><li><span className="text-accent-text">•</span>₹3,500 diesel fill at a petrol pump → essential sector → <b>flat ₹5</b> MDR, not 0.4%.</li></ul>
          <H>What it means for your pricing</H>
          <P>At 0.4%, MDR is far below card fees (1.5–2.5%) and comparable to the cost of handling cash. For a business doing ₹10 lakh a month in UPI with an average ticket above ₹2,000, the cost is roughly ₹4,000 + GST per month. Merchants must absorb it: passing a surcharge to customers is prohibited under NPCI rules, and the government has said it will monitor daily for pass-through. The 18% GST on MDR is claimable as input tax credit by GST-registered merchants.</P>
          <H>Practical tips</H>
          <ul className="mt-3 grid gap-2 text-[15px] leading-relaxed text-ink-2 [&_li]:flex [&_li]:gap-2"><li><span className="text-accent-text">•</span>Check your PSP settlement report — MDR and GST should appear as separate line items.</li><li><span className="text-accent-text">•</span>If your monthly UPI QR receipts hover near ₹1 lakh, ask your PSP how and when reclassification from P2PM to P2M happens.</li><li><span className="text-accent-text">•</span>Claim input tax credit on the GST charged over MDR — it is a business expense.</li><li><span className="text-accent-text">•</span>Static QR standees (P2PM) and dynamic invoice QRs work identically for customers; the MDR difference is on your side only.</li></ul>
          <p className="mt-8 text-xs leading-relaxed text-muted">This guide reflects the NPCI circular of 15 September 2026 (effective 15 October 2026) as publicly reported; a Supreme Court plea against the levy is pending. Exact rates, thresholds and effective dates are set by RBI/NPCI notifications and may change — always confirm with your PSP’s fee schedule. Not financial or legal advice.</p>
        </CardBody></Card>
      </article>
      <aside className="grid gap-4 lg:col-span-4 lg:sticky lg:top-24">
        <Card><CardBody className="grid gap-3"><div className="flex items-center gap-2 text-sm font-semibold text-ink"><Calculator className="h-4 w-4 text-accent-text" /> Calculate your MDR</div><p className="text-sm text-muted">Enter your ticket size and monthly volume to see the exact deduction.</p><Link href="/tools/upi-mdr-calculator"><Button className="w-full">Open MDR calculator <ArrowRight className="h-4 w-4" /></Button></Link></CardBody></Card>
        <Card><CardBody className="grid gap-2 text-sm"><div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">Related tools</div>{[["/tools/upi-standee", "UPI QR payment standee"], ["/tools/gst-invoice", "GST invoice with UPI QR"], ["/tools/payment-receipt", "Payment receipt generator"], ["/tools/gst-calculator", "GST calculator"]].map(([h, l]) => <Link key={h} href={h} className="flex items-center justify-between rounded-lg px-2 py-1.5 text-ink-2 hover:bg-surface-2 hover:text-ink">{l}<ArrowRight className="h-3.5 w-3.5 text-faint" /></Link>)}</CardBody></Card>
      </aside>
    </div>
  );
}
