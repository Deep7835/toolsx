"use client";
import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { CalculatorShell } from "@/components/shell/CalculatorShell";
import { Checkbox, Input, NumberInput, Segmented, Toggle } from "@/components/ui/Field";
import { HeroStat, KV, Stat } from "@/components/ui/Stat";
import { Button } from "@/components/ui/Button";
import { fmtDate, todayISO, addDaysISO, uid } from "@/lib/format";

const NATIONAL = (y: number) => [{ d: `${y}-01-26`, n: "Republic Day" }, { d: `${y}-08-15`, n: "Independence Day" }, { d: `${y}-10-02`, n: "Gandhi Jayanti" }];
const FESTIVALS: Record<number, Array<{ d: string; n: string }>> = {
  2025: [{ d: "2025-03-14", n: "Holi" }, { d: "2025-03-31", n: "Eid-ul-Fitr" }, { d: "2025-04-18", n: "Good Friday" }, { d: "2025-08-16", n: "Janmashtami" }, { d: "2025-10-02", n: "Dussehra" }, { d: "2025-10-20", n: "Diwali" }, { d: "2025-11-05", n: "Guru Nanak Jayanti" }, { d: "2025-12-25", n: "Christmas" }],
  2026: [{ d: "2026-03-04", n: "Holi" }, { d: "2026-03-21", n: "Eid-ul-Fitr" }, { d: "2026-04-03", n: "Good Friday" }, { d: "2026-05-01", n: "May Day (state)" }, { d: "2026-09-04", n: "Janmashtami" }, { d: "2026-10-20", n: "Dussehra" }, { d: "2026-11-08", n: "Diwali" }, { d: "2026-11-24", n: "Guru Nanak Jayanti" }, { d: "2026-12-25", n: "Christmas" }],
  2027: [{ d: "2027-03-22", n: "Holi" }, { d: "2027-03-10", n: "Eid-ul-Fitr" }, { d: "2027-03-26", n: "Good Friday" }, { d: "2027-10-09", n: "Dussehra" }, { d: "2027-10-29", n: "Diwali" }, { d: "2027-12-25", n: "Christmas" }],
};

export default function BusinessDays() {
  const [mode, setMode] = useState<"between" | "add">("between");
  const [start, setStart] = useState(todayISO());
  const [end, setEnd] = useState(addDaysISO(todayISO(), 30));
  const [addN, setAddN] = useState(10);
  const [sat, setSat] = useState<"off" | "half" | "on">("off");
  const [national, setNational] = useState(true);
  const [festivals, setFestivals] = useState(true);
  const [custom, setCustom] = useState<Array<{ id: string; d: string; n: string }>>([]);
  const [inclusive, setInclusive] = useState(true);

  const holidays = useMemo(() => { const m = new Map<string, string>(); const y0 = new Date(start).getFullYear(), y1 = new Date(end).getFullYear() + 1; for (let y = y0; y <= y1; y++) { if (national) NATIONAL(y).forEach((h) => m.set(h.d, h.n)); if (festivals) (FESTIVALS[y] ?? []).forEach((h) => m.set(h.d, h.n)); } custom.forEach((c) => c.d && m.set(c.d, c.n || "Custom holiday")); return m; }, [start, end, national, festivals, custom]);
  const isWorking = (d: Date) => { const dow = d.getDay(); if (dow === 0) return false; if (dow === 6) { if (sat === "off") return false; if (sat === "half") { const wk = Math.ceil(d.getDate() / 7); if (wk === 2 || wk === 4) return false; } } const iso = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10); return !holidays.has(iso); };

  const calc = useMemo(() => {
    const s = new Date(start + "T00:00:00"), e = new Date(end + "T00:00:00");
    if (mode === "between") { if (e < s) return { working: 0, total: 0, weekends: 0, hol: [] as string[], result: "" }; let working = 0, weekends = 0; const hol: string[] = []; const cur = new Date(s); if (!inclusive) cur.setDate(cur.getDate() + 1); const total = Math.round((e.getTime() - s.getTime()) / 86400000) + (inclusive ? 1 : 0); while (cur <= e) { const iso = new Date(cur.getTime() - cur.getTimezoneOffset() * 60000).toISOString().slice(0, 10); if (isWorking(cur)) working++; else if (cur.getDay() === 0 || cur.getDay() === 6) weekends++; if (holidays.has(iso) && cur.getDay() !== 0) hol.push(`${fmtDate(iso)} · ${holidays.get(iso)}`); cur.setDate(cur.getDate() + 1); } return { working, total, weekends, hol, result: "" }; }
    let left = addN; const cur = new Date(s); const hol: string[] = []; while (left > 0) { cur.setDate(cur.getDate() + 1); const iso = new Date(cur.getTime() - cur.getTimezoneOffset() * 60000).toISOString().slice(0, 10); if (isWorking(cur)) left--; else if (holidays.has(iso) && cur.getDay() !== 0) hol.push(`${fmtDate(iso)} · ${holidays.get(iso)}`); }
    const iso = new Date(cur.getTime() - cur.getTimezoneOffset() * 60000).toISOString().slice(0, 10); return { working: addN, total: Math.round((cur.getTime() - s.getTime()) / 86400000), weekends: 0, hol, result: iso };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, start, end, addN, sat, holidays, inclusive]);

  const inputs = (
    <>
      <Segmented value={mode} onChange={setMode} options={[{ value: "between", label: "Days between dates" }, { value: "add", label: "Add working days" }]} size="sm" />
      <div className="grid grid-cols-2 gap-4"><Input label="Start date" type="date" value={start} onChange={(e) => setStart(e.target.value)} />{mode === "between" ? <Input label="End date" type="date" value={end} onChange={(e) => setEnd(e.target.value)} /> : <NumberInput label="Working days to add" value={addN} onChange={setAddN} />}</div>
      {mode === "between" ? <Toggle checked={inclusive} onChange={setInclusive} label="Include both start and end dates" /> : null}
      <div><div className="mb-1.5 text-[13px] font-medium text-ink-2">Saturdays</div><Segmented value={sat} onChange={setSat} options={[{ value: "off", label: "Off" }, { value: "half", label: "2nd & 4th off" }, { value: "on", label: "Working" }]} size="sm" /></div>
      <div className="grid gap-2"><Checkbox checked={national} onChange={setNational} label="Exclude national holidays (26 Jan, 15 Aug, 2 Oct)" /><Checkbox checked={festivals} onChange={setFestivals} label="Exclude major festival holidays (Holi, Diwali, Eid, Christmas…)" /></div>
      <div>
        <div className="mb-2 flex items-center justify-between"><span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">Custom holidays</span><Button size="sm" variant="secondary" onClick={() => setCustom([...custom, { id: uid(), d: "", n: "" }])}><Plus className="h-3.5 w-3.5" /> Add</Button></div>
        <div className="grid gap-2">{custom.map((c) => <div key={c.id} className="grid grid-cols-[150px_1fr_auto] gap-2"><Input aria-label="Date" type="date" value={c.d} onChange={(e) => setCustom(custom.map((x) => (x.id === c.id ? { ...x, d: e.target.value } : x)))} /><Input aria-label="Name" placeholder="e.g. Store anniversary" value={c.n} onChange={(e) => setCustom(custom.map((x) => (x.id === c.id ? { ...x, n: e.target.value } : x)))} /><button type="button" aria-label="Remove" onClick={() => setCustom(custom.filter((x) => x.id !== c.id))} className="inline-flex h-11 w-10 items-center justify-center rounded-lg text-muted hover:bg-danger-soft hover:text-danger cursor-pointer"><Trash2 className="h-4 w-4" /></button></div>)}</div>
      </div>
    </>
  );
  const results = (
    <>
      {mode === "between" ? <HeroStat label="Working days" value={String(calc.working)} sub={`${fmtDate(start)} → ${fmtDate(end)} · ${calc.total} calendar days`} /> : <HeroStat label={`${addN} working days after ${fmtDate(start)}`} value={fmtDate(calc.result, "long")} sub={`${calc.total} calendar days later`} />}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3"><Stat label="Calendar days" value={String(calc.total)} />{mode === "between" ? <Stat label="Weekend days" value={String(calc.weekends)} /> : null}<Stat label="Holidays skipped" value={String(calc.hol.length)} /></div>
      {calc.hol.length ? <KV rows={calc.hol.map((h) => { const [d, n] = h.split(" · "); return [n, d]; })} /> : <p className="text-xs text-muted">No holidays fall in this range.</p>}
    </>
  );
  return <CalculatorShell inputs={inputs} results={results} inputTitle="Dates & rules" resultTitle="Result" note="Festival dates follow the lunar calendar and vary by state; the list covers widely observed gazetted holidays for 2025–27. Add your state or company holidays as custom entries." />;
}
