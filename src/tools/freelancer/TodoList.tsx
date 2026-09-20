"use client";
import { useState } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { DocumentShell } from "@/components/shell/DocumentShell";
import { PAPER } from "@/components/shell/PaperPreview";
import { FieldGroup, Input, Row, Select, Checkbox } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { useLocalStorage } from "@/lib/hooks";
import { fmtDate, todayISO, uid } from "@/lib/format";
import { Eyebrow } from "../shared/doc";

interface Task { id: string; text: string; priority: "high" | "medium" | "low"; done: boolean; due: string; owner: string }
const mk = (o: Partial<Task> = {}): Task => ({ id: uid(), text: "", priority: "medium", done: false, due: "", owner: "", ...o });
const DEFAULT_TASKS: Task[] = [mk({ text: "File GSTR-3B for last month", priority: "high", due: todayISO() }), mk({ text: "Reorder packaging boxes (500 pcs)", priority: "medium" }), mk({ text: "Update price tags for festive offer", priority: "low", done: true })];
const PRI = { high: { l: "High", c: "#b91c1c", bg: "#fee2e2" }, medium: { l: "Medium", c: "#b45309", bg: "#fef3c7" }, low: { l: "Low", c: "#047857", bg: "#d1fae5" } };

export default function TodoList() {
  const [title, setTitle] = useLocalStorage("ibt:todo:title", "This week");
  const [tasks, setTasks] = useLocalStorage<Task[]>("ibt:todo", DEFAULT_TASKS);
  const [owner, setOwner] = useState("");
  const upd = (id: string, p: Partial<Task>) => setTasks(tasks.map((t) => (t.id === id ? { ...t, ...p } : t)));
  const done = tasks.filter((t) => t.done).length;
  const pctDone = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
  const sorted = [...tasks].sort((a, b) => Number(a.done) - Number(b.done) || ["high", "medium", "low"].indexOf(a.priority) - ["high", "medium", "low"].indexOf(b.priority));

  const form = (
    <>
      <FieldGroup title="List">
        <Row><Input label="List title" value={title} onChange={(e) => setTitle(e.target.value)} /><Input label="Owner / team" value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="optional" /></Row>
        <div className="rounded-xl border border-border bg-surface-2/60 p-3 text-sm"><div className="flex justify-between"><span className="text-muted">Completion</span><span className="tabular font-semibold text-ink">{done}/{tasks.length} · {pctDone}%</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-border"><div className="h-full rounded-full bg-accent transition-[width] duration-300" style={{ width: `${pctDone}%` }} /></div></div>
      </FieldGroup>
      <FieldGroup title="Tasks" aside={<div className="flex gap-1.5"><Button size="sm" variant="ghost" onClick={() => setTasks(tasks.filter((t) => !t.done))} disabled={!done}>Clear done</Button><Button size="sm" variant="secondary" onClick={() => setTasks([...tasks, mk()])}><Plus className="h-3.5 w-3.5" /> Task</Button></div>}>
        {tasks.map((t) => (
          <div key={t.id} className={`grid gap-2 rounded-xl border border-border p-3 ${t.done ? "bg-surface-2/40 opacity-70" : "bg-surface-2/50"}`}>
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 shrink-0 text-faint" />
              <Checkbox checked={t.done} onChange={(v) => upd(t.id, { done: v })} label="" />
              <Input aria-label="Task" placeholder="What needs doing?" value={t.text} onChange={(e) => upd(t.id, { text: e.target.value })} wrapClassName="flex-1" className={t.done ? "line-through" : ""} />
              <button type="button" aria-label="Remove task" onClick={() => setTasks(tasks.filter((x) => x.id !== t.id))} className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-muted hover:bg-danger-soft hover:text-danger cursor-pointer"><Trash2 className="h-4 w-4" /></button>
            </div>
            <div className="ml-6 grid grid-cols-3 gap-2">
              <Select aria-label="Priority" value={t.priority} onChange={(e) => upd(t.id, { priority: e.target.value as Task["priority"] })} options={[{ value: "high", label: "High" }, { value: "medium", label: "Medium" }, { value: "low", label: "Low" }]} />
              <Input aria-label="Due" type="date" value={t.due} onChange={(e) => upd(t.id, { due: e.target.value })} />
              <Input aria-label="Assignee" placeholder="Assignee" value={t.owner} onChange={(e) => upd(t.id, { owner: e.target.value })} />
            </div>
          </div>
        ))}
      </FieldGroup>
    </>
  );

  const preview = (
    <div className="min-h-[1123px] p-12 text-[13px]">
      <div className="flex items-end justify-between border-b-2 border-[#1c1917] pb-4">
        <div><Eyebrow>Checklist{owner ? ` · ${owner}` : ""}</Eyebrow><div className="font-display text-[34px] leading-none mt-1">{title || "To-do"}</div></div>
        <div className="text-right"><div className="text-[28px] font-semibold tabular leading-none">{pctDone}%</div><div className="text-[11px] text-[#78716c]">{done} of {tasks.length} done · {fmtDate(todayISO())}</div></div>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#e7e5e4]"><div className="h-full bg-[#1c1917]" style={{ width: `${pctDone}%` }} /></div>
      <ul className="mt-6 grid gap-2.5">
        {sorted.map((t) => (
          <li key={t.id} className="flex items-start gap-3 border-b border-[#f5f5f4] pb-2.5">
            <span className={`mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border ${t.done ? "border-[#1c1917] bg-[#1c1917] text-white" : "border-[#a8a29e]"}`} style={{ width: 18, height: 18 }}>{t.done ? <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 8.5l3 3 7-7" /></svg> : null}</span>
            <span className={`flex-1 ${t.done ? "text-[#a8a29e] line-through" : ""}`}>{t.text || "—"}</span>
            {t.owner ? <span className="text-[11px] text-[#78716c]">{t.owner}</span> : null}
            {t.due ? <span className="text-[11px] tabular text-[#78716c]">{fmtDate(t.due)}</span> : null}
            <span className="rounded px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider" style={{ color: PRI[t.priority].c, background: PRI[t.priority].bg }}>{PRI[t.priority].l}</span>
          </li>
        ))}
      </ul>
      {Array.from({ length: Math.max(0, 6 - tasks.length) }).map((_, i) => <div key={i} className="mt-2.5 flex items-center gap-3 border-b border-[#f5f5f4] pb-2.5"><span className="h-[18px] w-[18px] rounded border border-[#d6d3d1]" /><span className="flex-1" /></div>)}
    </div>
  );

  return <DocumentShell form={form} preview={preview} paperWidth={PAPER.a4} filename={`todo-${(title || "list").replace(/\s+/g, "-")}`} formTitle="Task list" formDescription="Saved in this browser automatically." previewDescription="Printable A4 checklist" shareText={`${title}\n${sorted.map((t) => `${t.done ? "☑" : "☐"} ${t.text}${t.due ? ` (by ${fmtDate(t.due)})` : ""}`).join("\n")}\n${done}/${tasks.length} done`} />;
}
