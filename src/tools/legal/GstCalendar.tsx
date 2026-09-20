"use client";
import { useMemo, useState } from "react";
import { CalendarPlus, Download } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Segmented, Select, Toggle } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { downloadText, printNow } from "@/lib/export";
import { fmtDate, todayISO } from "@/lib/format";

type Scheme = "monthly" | "qrmp" | "composition";
interface Due { date: string; form: string; desc: string; scheme: Scheme[]; annual?: boolean }
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const iso = (y: number, m: number, d: number) => `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
const CAT_X = ["Chhattisgarh", "Madhya Pradesh", "Gujarat", "Maharashtra", "Karnataka", "Goa", "Kerala", "Tamil Nadu", "Telangana", "Andhra Pradesh", "Daman & Diu", "Dadra & Nagar Haveli", "Puducherry", "Andaman & Nicobar", "Lakshadweep"];

function build(fyStart: number, catX: boolean): Due[] {
  const out: Due[] = [];
  for (let i = 0; i < 12; i++) {
    const m = (3 + i) % 12; const y = fyStart + (m < 3 ? 1 : 0); // tax period month
    const nm = (m + 1) % 12; const ny = y + (nm === 0 ? 1 : 0); // following month
    const label = `${MONTHS[m]} ${y}`;
    out.push({ date: iso(ny, nm, 11), form: "GSTR-1", desc: `Outward supplies for ${label} (monthly filers)`, scheme: ["monthly"] });
    out.push({ date: iso(ny, nm, 20), form: "GSTR-3B", desc: `Summary return & tax payment for ${label}`, scheme: ["monthly"] });
    out.push({ date: iso(ny, nm, 10), form: "GSTR-7 / GSTR-8", desc: `TDS / TCS return for ${label} (if applicable)`, scheme: ["monthly", "qrmp"] });
    out.push({ date: iso(ny, nm, 13), form: "GSTR-6", desc: `Input Service Distributor return for ${label} (if ISD)`, scheme: ["monthly"] });
    const qEnd = m === 5 || m === 8 || m === 11 || m === 2;
    if (!qEnd) { out.push({ date: iso(ny, nm, 13), form: "IFF (optional)", desc: `Invoice Furnishing Facility for B2B invoices of ${label}`, scheme: ["qrmp"] }); out.push({ date: iso(ny, nm, 25), form: "PMT-06", desc: `Monthly tax payment for ${label} (QRMP)`, scheme: ["qrmp"] }); }
    else {
      const q = m === 5 ? "Apr–Jun" : m === 8 ? "Jul–Sep" : m === 11 ? "Oct–Dec" : "Jan–Mar";
      out.push({ date: iso(ny, nm, 13), form: "GSTR-1 (quarterly)", desc: `Outward supplies for ${q} ${y}`, scheme: ["qrmp"] });
      out.push({ date: iso(ny, nm, catX ? 22 : 24), form: "GSTR-3B (quarterly)", desc: `Summary return for ${q} ${y}`, scheme: ["qrmp"] });
      out.push({ date: iso(ny, nm, 18), form: "CMP-08", desc: `Composition quarterly statement & payment for ${q} ${y}`, scheme: ["composition"] });
    }
  }
  out.push({ date: iso(fyStart, 5, 30), form: "GSTR-4", desc: `Composition annual return for FY ${fyStart - 1}-${String(fyStart).slice(2)}`, scheme: ["composition"], annual: true });
  out.push({ date: iso(fyStart, 11, 31), form: "GSTR-9 / 9C", desc: `Annual return & reconciliation for FY ${fyStart - 1}-${String(fyStart).slice(2)} (turnover > ₹2 cr / > ₹5 cr for 9C)`, scheme: ["monthly", "qrmp"], annual: true });
  out.push({ date: iso(fyStart, 9, 25), form: "ITC-04", desc: `Job work details Apr–Sep ${fyStart} (turnover > ₹5 cr)`, scheme: ["monthly"], annual: true });
  out.push({ date: iso(fyStart + 1, 3, 25), form: "ITC-04", desc: `Job work details Oct ${fyStart}–Mar ${fyStart + 1} (or full year for ≤ ₹5 cr)`, scheme: ["monthly", "qrmp"], annual: true });
  out.push({ date: iso(fyStart + 1, 2, 31), form: "CMP-02", desc: `Opt into composition scheme for FY ${fyStart + 1}-${String(fyStart + 2).slice(2)}`, scheme: ["composition"], annual: true });
  out.push({ date: iso(fyStart + 1, 3, 30), form: "GSTR-4", desc: `Composition annual return for FY ${fyStart}-${String(fyStart + 1).slice(2)} (due 30 June ${fyStart + 1})`, scheme: ["composition"], annual: true });
  return out.sort((a, b) => a.date.localeCompare(b.date));
}

export default function GstCalendar() {
  const [scheme, setScheme] = useState<Scheme>("monthly");
  const [state, setState] = useState("Delhi");
  const [fy, setFy] = useState(2026);
  const [upcoming, setUpcoming] = useState(false);
  const catX = CAT_X.includes(state);
  const all = useMemo(() => build(fy, catX), [fy, catX]);
  const today = todayISO();
  const list = all.filter((d) => d.scheme.includes(scheme) && (!upcoming || d.date >= today));
  const next = all.filter((d) => d.scheme.includes(scheme) && d.date >= today)[0];
  const byMonth = list.reduce<Record<string, Due[]>>((a, d) => { const k = d.date.slice(0, 7); (a[k] ??= []).push(d); return a; }, {});
  const ics = () => {
    const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//India Biz Tools//GST Calendar//EN"];
    list.forEach((d, i) => { const dt = d.date.replace(/-/g, ""); lines.push("BEGIN:VEVENT", `UID:gst-${fy}-${i}@indiabiztools`, `DTSTART;VALUE=DATE:${dt}`, `DTEND;VALUE=DATE:${dt}`, `SUMMARY:GST due: ${d.form}`, `DESCRIPTION:${d.desc}`, "BEGIN:VALARM", "TRIGGER:-P3D", "ACTION:DISPLAY", `DESCRIPTION:${d.form} due in 3 days`, "END:VALARM", "END:VEVENT"); });
    lines.push("END:VCALENDAR"); downloadText(lines.join("\r\n"), `gst-calendar-fy${fy}-${String(fy + 1).slice(2)}.ics`, "text/calendar");
  };

  return (
    <div className="grid gap-5">
      <Card>
        <CardBody className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
          <div className="grid gap-4">
            <Segmented value={scheme} onChange={setScheme} options={[{ value: "monthly", label: "Regular (monthly)" }, { value: "qrmp", label: "QRMP (quarterly, ≤ ₹5 cr)" }, { value: "composition", label: "Composition" }]} size="sm" />
            <div className="grid gap-4 sm:grid-cols-3">
              <Select label="Financial year" value={String(fy)} onChange={(e) => setFy(parseInt(e.target.value))} options={[{ value: "2025", label: "FY 2025-26" }, { value: "2026", label: "FY 2026-27" }, { value: "2027", label: "FY 2027-28" }]} />
              <Select label="State (for QRMP 3B date)" value={state} onChange={(e) => setState(e.target.value)} options={["Delhi", "Uttar Pradesh", "Haryana", "Rajasthan", "Punjab", "West Bengal", "Bihar", "Odisha", "Assam", "Jharkhand", "Uttarakhand", "Himachal Pradesh", "Jammu & Kashmir", ...CAT_X].sort()} help={catX ? "Category X state — quarterly GSTR-3B due on the 22nd" : "Category Y state — quarterly GSTR-3B due on the 24th"} />
              <div className="flex items-end"><Toggle checked={upcoming} onChange={setUpcoming} label="Only upcoming" className="w-full" /></div>
            </div>
          </div>
          <div className="flex gap-2"><Button variant="secondary" onClick={printNow}><Download className="h-4 w-4" /> Print</Button><Button onClick={ics}><CalendarPlus className="h-4 w-4" /> Add to calendar (.ics)</Button></div>
        </CardBody>
      </Card>
      {next ? <div className="rounded-2xl bg-ink px-6 py-5 text-bg dark:bg-accent-soft dark:text-ink"><div className="text-[11px] font-semibold uppercase tracking-[0.14em] opacity-70">Next deadline</div><div className="mt-1 font-display text-3xl">{next.form} · {fmtDate(next.date, "long")}</div><div className="mt-1 text-sm opacity-80">{next.desc} · {Math.round((new Date(next.date).getTime() - new Date(today).getTime()) / 86400000)} days away</div></div> : null}
      <div id="print-root" className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Object.entries(byMonth).map(([k, items]) => { const [y, m] = k.split("-").map(Number); return (
          <Card key={k}>
            <CardHeader title={`${MONTHS[m - 1]} ${y}`} description={`${items.length} due date${items.length > 1 ? "s" : ""}`} />
            <CardBody className="grid gap-2.5 p-4">
              {items.map((d, i) => { const past = d.date < today; return (
                <div key={i} className={`flex gap-3 rounded-xl border px-3 py-2.5 ${d.annual ? "border-warn/40 bg-warn-soft/40" : "border-border bg-surface-2/50"} ${past ? "opacity-55" : ""}`}>
                  <div className="w-9 shrink-0 text-center"><div className="text-lg font-semibold leading-none tabular text-ink">{d.date.slice(8)}</div><div className="text-[9px] uppercase text-muted">{MONTHS[m - 1]}</div></div>
                  <div className="min-w-0"><div className="text-sm font-semibold text-ink">{d.form}</div><div className="text-xs leading-snug text-muted">{d.desc}</div></div>
                </div>
              ); })}
            </CardBody>
          </Card>
        ); })}
      </div>
      <p className="text-xs leading-relaxed text-muted">Due dates per CGST Rules as of FY 2026-27. Dates falling on holidays are not automatically extended; the government may notify extensions. Late fee: ₹50/day (₹20 for nil returns) plus 18% interest on tax due. Set the 3-day reminder alarms by importing the .ics file into Google Calendar or Outlook.</p>
    </div>
  );
}
