"use client";
import { useState } from "react";
import { Plus, Trash2, Download } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input, NumberInput, Select, Toggle } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { HeroStat, Stat } from "@/components/ui/Stat";
import { inr, uid } from "@/lib/format";
import { downloadText, shareWhatsApp } from "@/lib/export";
import { useLocalStorage } from "@/lib/hooks";
import { EPF_WAGE_CEILING } from "@/lib/payroll";

interface Emp { id: string; name: string; role: string; fixed: number; variablePct: number; achieved: number; days: number; totalDays: number; advance: number; pf: boolean; esi: boolean; pt: number }
const mk = (o: Partial<Emp> = {}): Emp => ({ id: uid(), name: "", role: "", fixed: 20000, variablePct: 0, achieved: 100, days: 26, totalDays: 26, advance: 0, pf: false, esi: false, pt: 0, ...o });
const DEFAULT: Emp[] = [mk({ name: "Ramesh", role: "Store manager", fixed: 28000, variablePct: 10, achieved: 90, pf: true, pt: 200 }), mk({ name: "Sunita", role: "Cashier", fixed: 16000, esi: true }), mk({ name: "Vikram", role: "Delivery", fixed: 14000, variablePct: 20, achieved: 110, days: 24 })];

const calc = (e: Emp) => {
  const prorated = e.fixed * (e.totalDays ? Math.min(1, e.days / e.totalDays) : 1);
  const variable = e.fixed * (e.variablePct / 100) * (e.achieved / 100);
  const gross = prorated + variable;
  const basic = gross * 0.5;
  const pf = e.pf ? Math.min(basic, EPF_WAGE_CEILING) * 0.12 : 0;
  const esi = e.esi && gross <= 21000 ? gross * 0.0075 : 0;
  const net = gross - pf - esi - e.pt - e.advance;
  const erPf = e.pf ? Math.min(basic, EPF_WAGE_CEILING) * 0.13 : 0;
  const erEsi = e.esi && gross <= 21000 ? gross * 0.0325 : 0;
  return { prorated, variable, gross, pf, esi, net, employerCost: gross + erPf + erEsi };
};

export default function TeamPayroll() {
  const [emps, setEmps] = useLocalStorage<Emp[]>("ibt:payroll", DEFAULT);
  const [month, setMonth] = useState(new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" }));
  const upd = (id: string, p: Partial<Emp>) => setEmps(emps.map((e) => (e.id === id ? { ...e, ...p } : e)));
  const rows = emps.map((e) => ({ e, c: calc(e) }));
  const totals = rows.reduce((a, { c }) => ({ gross: a.gross + c.gross, net: a.net + c.net, cost: a.cost + c.employerCost, ded: a.ded + (c.gross - c.net) }), { gross: 0, net: 0, cost: 0, ded: 0 });
  const csv = () => downloadText("Name,Role,Fixed,Days,Variable,Gross,PF,ESI,PT,Advance,Net\n" + rows.map(({ e, c }) => `${e.name},${e.role},${e.fixed},${e.days}/${e.totalDays},${c.variable.toFixed(0)},${c.gross.toFixed(0)},${c.pf.toFixed(0)},${c.esi.toFixed(0)},${e.pt},${e.advance},${c.net.toFixed(0)}`).join("\n"), `payroll-${month.replace(/\s/g, "-")}.csv`, "text/csv");

  return (
    <div className="grid gap-5">
      <div className="grid gap-3 sm:grid-cols-4">
        <HeroStat label={`Net payout · ${month}`} value={inr(totals.net, { decimals: 0 })} sub={`${emps.length} people`} className="sm:col-span-2" />
        <Stat label="Gross payroll" value={inr(totals.gross, { decimals: 0 })} /><Stat label="Employer cost (with PF/ESI)" value={inr(totals.cost, { decimals: 0 })} />
      </div>
      <Card>
        <CardHeader title="Team" description="Fixed + variable pay, attendance pro-rating, PF/ESI/PT and advances." action={<div className="flex gap-1.5"><Input aria-label="Month" value={month} onChange={(e) => setMonth(e.target.value)} className="h-9 w-40 text-[13px]" /><Button size="sm" variant="secondary" onClick={csv}><Download className="h-3.5 w-3.5" /> CSV</Button><Button size="sm" onClick={() => setEmps([...emps, mk()])}><Plus className="h-3.5 w-3.5" /> Add</Button></div>} />
        <CardBody className="grid gap-3 p-3 sm:p-5">
          {rows.map(({ e, c }) => (
            <div key={e.id} className="rounded-xl border border-border bg-surface-2/40 p-3">
              <div className="grid gap-2 sm:grid-cols-[1.2fr_1fr_110px_100px_auto]">
                <Input aria-label="Name" placeholder="Name" value={e.name} onChange={(x) => upd(e.id, { name: x.target.value })} />
                <Input aria-label="Role" placeholder="Role" value={e.role} onChange={(x) => upd(e.id, { role: x.target.value })} />
                <NumberInput aria-label="Fixed salary" prefix="₹" value={e.fixed} onChange={(v) => upd(e.id, { fixed: v })} />
                <NumberInput aria-label="Days worked" suffix={`/${e.totalDays}`} value={e.days} onChange={(v) => upd(e.id, { days: v })} />
                <button type="button" aria-label="Remove" onClick={() => setEmps(emps.filter((x) => x.id !== e.id))} className="inline-flex h-11 w-10 items-center justify-center rounded-lg text-muted hover:bg-danger-soft hover:text-danger cursor-pointer"><Trash2 className="h-4 w-4" /></button>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-6">
                <NumberInput aria-label="Variable %" suffix="% var" value={e.variablePct} onChange={(v) => upd(e.id, { variablePct: v })} />
                <NumberInput aria-label="Target achieved %" suffix="% achv" value={e.achieved} onChange={(v) => upd(e.id, { achieved: v })} />
                <Select aria-label="PT" value={String(e.pt)} onChange={(x) => upd(e.id, { pt: parseInt(x.target.value) })} options={[{ value: "0", label: "PT: none" }, { value: "150", label: "PT ₹150" }, { value: "175", label: "PT ₹175" }, { value: "200", label: "PT ₹200" }]} />
                <NumberInput aria-label="Advance" prefix="₹" placeholder="Advance" value={e.advance} onChange={(v) => upd(e.id, { advance: v })} />
                <div className="flex items-center"><Toggle checked={e.pf} onChange={(v) => upd(e.id, { pf: v })} label={<span className="text-xs">PF</span>} className="w-full" /></div>
                <div className="flex items-center"><Toggle checked={e.esi} onChange={(v) => upd(e.id, { esi: v })} label={<span className="text-xs">ESI</span>} className="w-full" /></div>
              </div>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted tabular">
                <span>Gross {inr(c.gross, { decimals: 0 })}{c.variable ? ` (incl. variable ${inr(c.variable, { decimals: 0 })})` : ""} · PF {inr(c.pf, { decimals: 0 })} · ESI {inr(c.esi, { decimals: 0 })} · PT {inr(e.pt, { decimals: 0 })}{e.advance ? ` · Adv ${inr(e.advance, { decimals: 0 })}` : ""}</span>
                <span className="text-sm font-semibold text-ink">Net {inr(c.net, { decimals: 0 })}</span>
              </div>
            </div>
          ))}
          <div className="flex flex-wrap justify-end gap-2 pt-1"><Button variant="whatsapp" size="sm" onClick={() => shareWhatsApp(`Payroll ${month}\n${rows.map(({ e, c }) => `${e.name}: ${inr(c.net, { decimals: 0 })}`).join("\n")}\nTotal: ${inr(totals.net, { decimals: 0 })}`)}>Share summary</Button></div>
        </CardBody>
      </Card>
      <p className="text-xs text-muted">Saved in this browser. PF at 12% employee / 13% employer on basic (50% of gross, capped at the ₹25,000 ceiling effective 17 Sep 2026). ESI 0.75% / 3.25% where gross ≤ ₹21,000. Use the wage slip tool to print individual slips.</p>
    </div>
  );
}
