"use client";
import { AlertTriangle, CheckCircle2, Download, Plus, Printer, Trash2 } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input, NumberInput, Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { HeroStat, Stat } from "@/components/ui/Stat";
import { fmtDate, inr, todayISO, uid } from "@/lib/format";
import { downloadText, printNow } from "@/lib/export";
import { useLocalStorage } from "@/lib/hooks";

/** FEMA 23(R)/2026-RB, in force 1 October 2026. */
const RULE_START = "2026-10-01";
const SELF_DECL_LIMIT = 1000000; // ₹10 lakh — EDPMS closure on the exporter's declaration
const CURRENCIES = ["USD", "EUR", "GBP", "AED", "SGD", "AUD", "CAD", "JPY", "INR"] as const;

interface Inv { id: string; no: string; date: string; client: string; country: string; ccy: string; amount: number; rate: number; sac: string }
const mk = (o: Partial<Inv> = {}): Inv => ({ id: uid(), no: "", date: todayISO(), client: "", country: "", ccy: "USD", amount: 0, rate: 88, sac: "998313", ...o });

/** Local date → ISO day, without the UTC shift `toISOString` would apply. */
const toISO = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Last day of the invoice month, plus 30 days — Regulation 3(2). */
function edfDue(iso: string) {
  const d = new Date(iso + "T00:00:00");
  const monthEnd = new Date(d.getFullYear(), d.getMonth() + 1, 0);
  monthEnd.setDate(monthEnd.getDate() + 30);
  return toISO(monthEnd);
}
/** Regulation 5(1): nine months from the invoice date, twelve if invoiced in INR. */
function realisationDue(iso: string, inrInvoiced: boolean) {
  const d = new Date(iso + "T00:00:00");
  const day = d.getDate();
  const out = new Date(d.getFullYear(), d.getMonth() + (inrInvoiced ? 12 : 9), day);
  // A 31st rolls into the next month; pull it back to that month's last day.
  if (out.getDate() !== day) out.setDate(0);
  return toISO(out);
}
const daysBetween = (a: string, b: string) => Math.round((new Date(b + "T00:00:00").getTime() - new Date(a + "T00:00:00").getTime()) / 86400000);
const monthKey = (iso: string) => iso.slice(0, 7);
const monthLabel = (key: string) => new Date(key + "-01T00:00:00").toLocaleDateString("en-IN", { month: "long", year: "numeric" });

export default function EdfFiling() {
  const [kind, setKind] = useLocalStorage<"services" | "software">("ibt:edf:kind", "services");
  const [location, setLocation] = useLocalStorage<"dta" | "sez">("ibt:edf:loc", "dta");
  const [exporter, setExporter] = useLocalStorage("ibt:edf:exporter", { name: "", pan: "", iec: "", bank: "", adCode: "" });
  const [rows, setRows] = useLocalStorage<Inv[]>("ibt:edf:rows", [mk({ no: "EXP-2610-001", client: "", country: "United States", amount: 2500 })]);
  const today = todayISO();

  const authority = location === "sez"
    ? "Development Commissioner of the SEZ"
    : kind === "software" ? "Your AD bank, or STPI" : "Your AD bank";

  const upd = (id: string, p: Partial<Inv>) => setRows(rows.map((r) => (r.id === id ? { ...r, ...p } : r)));

  const calc = rows.map((r) => {
    const inrValue = r.ccy === "INR" ? r.amount : r.amount * r.rate;
    const due = edfDue(r.date);
    const realise = realisationDue(r.date, r.ccy === "INR");
    return {
      r, inrValue, due, realise,
      daysToFile: daysBetween(today, due),
      daysToRealise: daysBetween(today, realise),
      preRule: r.date < RULE_START,
      selfDecl: inrValue <= SELF_DECL_LIMIT,
    };
  });

  const live = calc.filter((c) => !c.preRule);
  const overdue = live.filter((c) => c.daysToFile < 0);
  const dueSoon = live.filter((c) => c.daysToFile >= 0 && c.daysToFile <= 7);
  const totalInr = live.reduce((a, c) => a + c.inrValue, 0);

  const months = [...new Set(live.map((c) => monthKey(c.r.date)))].sort((a, b) => b.localeCompare(a));
  const groups = months.map((key) => [key, live.filter((c) => monthKey(c.r.date) === key)] as const);

  const csv = () => downloadText(
    "Invoice no,Invoice date,Client,Country,Currency,Amount,INR value,SAC,EDF due,Realisation due,Self-declaration closure\n" +
    calc.map((c) => [c.r.no, c.r.date, `"${c.r.client}"`, `"${c.r.country}"`, c.r.ccy, c.r.amount, Math.round(c.inrValue), c.r.sac, c.due, c.realise, c.selfDecl ? "Yes (<= Rs 10 lakh)" : "No"].join(",")).join("\n"),
    `edf-${monthKey(today)}.csv`, "text/csv");

  return (
    <div className="grid gap-5">
      <div className="grid gap-3 sm:grid-cols-4">
        <HeroStat label="Invoices to declare" value={String(live.length)} sub={`${inr(totalInr, { decimals: 0 })} total`} className="sm:col-span-2" />
        <Stat label="Filing overdue" value={String(overdue.length)} tone={overdue.length ? "danger" : "default"} />
        <Stat label="Due within 7 days" value={String(dueSoon.length)} tone={dueSoon.length ? "warn" : "default"} />
      </div>

      <Card>
        <CardHeader title="Exporter and filing route" description="Saved on this device only — nothing is uploaded." />
        <CardBody className="grid gap-3">
          <div className="grid gap-3 sm:grid-cols-3">
            <Input label="Exporter name" value={exporter.name} onChange={(e) => setExporter({ ...exporter, name: e.target.value })} placeholder="Your business or your name" />
            <Input label="PAN" value={exporter.pan} onChange={(e) => setExporter({ ...exporter, pan: e.target.value.toUpperCase() })} placeholder="ABCDE1234F" />
            <Input label="IEC (if you have one)" value={exporter.iec} onChange={(e) => setExporter({ ...exporter, iec: e.target.value })} placeholder="Optional for services" />
          </div>
          <div className="grid gap-3 sm:grid-cols-4">
            <Input label="AD bank" value={exporter.bank} onChange={(e) => setExporter({ ...exporter, bank: e.target.value })} placeholder="Bank and branch" />
            <Input label="AD code" value={exporter.adCode} onChange={(e) => setExporter({ ...exporter, adCode: e.target.value })} placeholder="From your bank" />
            <Select label="What you export" value={kind} onChange={(e) => setKind(e.target.value as typeof kind)} options={[{ value: "services", label: "Services (non-software)" }, { value: "software", label: "Software / IT services" }]} />
            <Select label="Where you are located" value={location} onChange={(e) => setLocation(e.target.value as typeof location)} options={[{ value: "dta", label: "Domestic tariff area" }, { value: "sez", label: "SEZ unit" }]} />
          </div>
          <p className="rounded-xl bg-surface-2 px-4 py-3 text-[13px] leading-relaxed text-ink-2">
            File with: <strong className="font-semibold text-ink">{authority}</strong>. Declaration due within 30 days from the end of the invoice month (Regulation 3(2)); proceeds to be realised within {" "}
            <strong className="font-semibold text-ink">nine months</strong> of the invoice date, or twelve months where the invoice is in rupees (Regulation 5(1)).
          </p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title="Export invoices"
          description="Add every invoice raised on a foreign client. Dates before 1 October 2026 are flagged — they fall under the earlier rules."
          action={<Button size="sm" variant="secondary" onClick={() => setRows([...rows, mk()])}><Plus className="h-4 w-4" /> Add invoice</Button>}
        />
        <CardBody className="grid gap-3 p-3 sm:p-5">
          {calc.map((c) => (
            <div key={c.r.id} className={`rounded-xl border p-3 ${c.preRule ? "border-border bg-surface-2/30" : c.daysToFile < 0 ? "border-danger/40 bg-danger-soft/30" : "border-border bg-surface-2/40"}`}>
              <div className="grid gap-2 sm:grid-cols-[1fr_130px_1.2fr_1fr_auto]">
                <Input aria-label="Invoice number" placeholder="Invoice no." value={c.r.no} onChange={(e) => upd(c.r.id, { no: e.target.value })} />
                <Input aria-label="Invoice date" type="date" value={c.r.date} onChange={(e) => upd(c.r.id, { date: e.target.value })} />
                <Input aria-label="Client" placeholder="Client name" value={c.r.client} onChange={(e) => upd(c.r.id, { client: e.target.value })} />
                <Input aria-label="Country" placeholder="Country" value={c.r.country} onChange={(e) => upd(c.r.id, { country: e.target.value })} />
                <button type="button" aria-label="Remove invoice" onClick={() => setRows(rows.filter((x) => x.id !== c.r.id))} className="inline-flex h-11 w-10 items-center justify-center rounded-lg text-muted hover:bg-surface-2 hover:text-danger cursor-pointer"><Trash2 className="h-4 w-4" /></button>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                <Select aria-label="Currency" value={c.r.ccy} onChange={(e) => upd(c.r.id, { ccy: e.target.value })} options={CURRENCIES.map((x) => ({ value: x, label: x }))} />
                <NumberInput aria-label="Invoice amount" value={c.r.amount} onChange={(v) => upd(c.r.id, { amount: v })} />
                {c.r.ccy === "INR"
                  ? <div className="flex items-center text-xs text-muted">Invoiced in rupees</div>
                  : <NumberInput aria-label="Exchange rate to INR" prefix="₹" value={c.r.rate} onChange={(v) => upd(c.r.id, { rate: v })} help="RBI rate on invoice date" />}
                <Input aria-label="SAC code" placeholder="SAC" value={c.r.sac} onChange={(e) => upd(c.r.id, { sac: e.target.value })} />
              </div>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs tabular">
                {c.preRule ? (
                  <span className="text-muted">Invoiced before 1 October 2026 — the earlier framework applies, no EDF needed.</span>
                ) : (
                  <>
                    <span className={c.daysToFile < 0 ? "font-semibold text-danger" : c.daysToFile <= 7 ? "font-semibold text-warn" : "text-muted"}>
                      {c.daysToFile < 0 ? `EDF overdue by ${Math.abs(c.daysToFile)} days` : `EDF due ${fmtDate(c.due, "long")} · ${c.daysToFile} days left`}
                    </span>
                    <span className="text-muted">Realise by {fmtDate(c.realise, "long")}</span>
                    <span className="text-muted">{inr(c.inrValue, { decimals: 0 })} · {c.selfDecl ? "closure on self-declaration" : "FIRA needed to close"}</span>
                  </>
                )}
              </div>
            </div>
          ))}
          <div className="flex flex-wrap justify-end gap-2 pt-1">
            <Button size="sm" variant="secondary" onClick={csv}><Download className="h-4 w-4" /> CSV for your bank</Button>
            <Button size="sm" variant="secondary" onClick={printNow}><Printer className="h-4 w-4" /> Print summary</Button>
          </div>
        </CardBody>
      </Card>

      {groups.length ? (
        <Card>
          <CardHeader title="Month-wise filing schedule" description="One EDF per month covering that month's invoices is what most banks ask for." />
          <CardBody className="grid gap-3">
            {groups.map(([key, items]) => {
              const due = edfDue(key + "-01");
              const left = daysBetween(today, due);
              const total = items.reduce((a, c) => a + c.inrValue, 0);
              return (
                <div key={key} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink">{monthLabel(key)}</p>
                    <p className="text-xs text-muted">{items.length} invoice{items.length > 1 ? "s" : ""} · {inr(total, { decimals: 0 })}</p>
                  </div>
                  <div className={`flex items-center gap-2 text-[13px] font-medium ${left < 0 ? "text-danger" : left <= 7 ? "text-warn" : "text-accent-text"}`}>
                    {left < 0 ? <AlertTriangle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                    {left < 0 ? `Overdue by ${Math.abs(left)} days` : `File by ${fmtDate(due, "long")}`}
                  </div>
                </div>
              );
            })}
          </CardBody>
        </Card>
      ) : null}
    </div>
  );
}
