"use client";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { DocumentShell } from "@/components/shell/DocumentShell";
import { PAPER } from "@/components/shell/PaperPreview";
import { FieldGroup, Input, NumberInput, Row, Select, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { fmtDate, todayISO, uid } from "@/lib/format";
import { Eyebrow, SimpleTable } from "../shared/doc";

interface Med { id: string; name: string; dose: string; freq: string; duration: string; note: string }
const mk = (o: Partial<Med> = {}): Med => ({ id: uid(), name: "", dose: "1 tab", freq: "1-0-1", duration: "5 days", note: "After food", ...o });

export default function MedicalPrescription() {
  const [doc, setDoc] = useState({ name: "Dr. Kavita Rao", quals: "MBBS, MD (General Medicine)", reg: "KMC 45678", clinic: "Rao Clinic & Diagnostics", address: "3rd Cross, Jayanagar, Bengaluru 560041", phone: "080 2665 1234", timings: "Mon–Sat · 10am–1pm, 5–8pm" });
  const [pt, setPt] = useState({ name: "Suresh Iyer", age: 42, sex: "Male", weight: 0, phone: "", id: "" });
  const [date, setDate] = useState(todayISO());
  const [vitals, setVitals] = useState({ bp: "", pulse: "", temp: "", spo2: "" });
  const [complaints, setComplaints] = useState("Fever and sore throat since 3 days");
  const [diagnosis, setDiagnosis] = useState("Acute pharyngitis");
  const [meds, setMeds] = useState<Med[]>([mk({ name: "Tab. Paracetamol 650 mg", freq: "1-1-1", duration: "3 days" }), mk({ name: "Tab. Azithromycin 500 mg", freq: "1-0-0", duration: "3 days" })]);
  const [advice, setAdvice] = useState("Plenty of fluids and rest. Warm saline gargles twice daily.");
  const [followUp, setFollowUp] = useState("After 5 days, or earlier if symptoms worsen.");
  const upd = (id: string, p: Partial<Med>) => setMeds(meds.map((m) => (m.id === id ? { ...m, ...p } : m)));

  const form = (
    <>
      <FieldGroup title="Doctor & clinic">
        <Row>
          <Input label="Doctor name" value={doc.name} onChange={(e) => setDoc({ ...doc, name: e.target.value })} />
          <Input label="Qualifications" value={doc.quals} onChange={(e) => setDoc({ ...doc, quals: e.target.value })} />
          <Input label="Registration no." value={doc.reg} onChange={(e) => setDoc({ ...doc, reg: e.target.value })} />
          <Input label="Clinic name" value={doc.clinic} onChange={(e) => setDoc({ ...doc, clinic: e.target.value })} />
        </Row>
        <Input label="Clinic address" value={doc.address} onChange={(e) => setDoc({ ...doc, address: e.target.value })} />
        <Row>
          <Input label="Phone" value={doc.phone} onChange={(e) => setDoc({ ...doc, phone: e.target.value })} />
          <Input label="Timings" value={doc.timings} onChange={(e) => setDoc({ ...doc, timings: e.target.value })} />
        </Row>
      </FieldGroup>
      <FieldGroup title="Patient">
        <Row cols={4}>
          <Input label="Name" value={pt.name} onChange={(e) => setPt({ ...pt, name: e.target.value })} wrapClassName="col-span-2" />
          <NumberInput label="Age" value={pt.age} onChange={(v) => setPt({ ...pt, age: v })} />
          <Select label="Sex" value={pt.sex} onChange={(e) => setPt({ ...pt, sex: e.target.value })} options={["Male", "Female", "Other"]} />
          <NumberInput label="Weight" suffix="kg" value={pt.weight} onChange={(v) => setPt({ ...pt, weight: v })} placeholder="—" />
          <Input label="Phone" value={pt.phone} onChange={(e) => setPt({ ...pt, phone: e.target.value })} />
          <Input label="Patient ID" value={pt.id} onChange={(e) => setPt({ ...pt, id: e.target.value })} />
          <Input label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </Row>
        <Row cols={4}>
          <Input label="BP" placeholder="120/80" value={vitals.bp} onChange={(e) => setVitals({ ...vitals, bp: e.target.value })} />
          <Input label="Pulse" placeholder="78" value={vitals.pulse} onChange={(e) => setVitals({ ...vitals, pulse: e.target.value })} />
          <Input label="Temp" placeholder="99.2 °F" value={vitals.temp} onChange={(e) => setVitals({ ...vitals, temp: e.target.value })} />
          <Input label="SpO₂" placeholder="98%" value={vitals.spo2} onChange={(e) => setVitals({ ...vitals, spo2: e.target.value })} />
        </Row>
        <Input label="Chief complaints" value={complaints} onChange={(e) => setComplaints(e.target.value)} />
        <Input label="Diagnosis" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} />
      </FieldGroup>
      <FieldGroup title="Rx" aside={<Button size="sm" variant="secondary" onClick={() => setMeds([...meds, mk()])}><Plus className="h-3.5 w-3.5" /> Add medicine</Button>}>
        {meds.map((m) => (
          <div key={m.id} className="rounded-xl border border-border bg-surface-2/50 p-3 grid gap-2">
            <div className="flex gap-2"><Input aria-label="Medicine" placeholder="Medicine & strength" value={m.name} onChange={(e) => upd(m.id, { name: e.target.value })} wrapClassName="flex-1" /><button type="button" aria-label="Remove" onClick={() => setMeds(meds.filter((x) => x.id !== m.id))} className="inline-flex h-11 w-10 items-center justify-center rounded-lg text-muted hover:bg-danger-soft hover:text-danger cursor-pointer"><Trash2 className="h-4 w-4" /></button></div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <Input aria-label="Dose" placeholder="Dose" value={m.dose} onChange={(e) => upd(m.id, { dose: e.target.value })} />
              <Input aria-label="Frequency" placeholder="1-0-1" value={m.freq} onChange={(e) => upd(m.id, { freq: e.target.value })} />
              <Input aria-label="Duration" placeholder="Duration" value={m.duration} onChange={(e) => upd(m.id, { duration: e.target.value })} />
              <Input aria-label="Instruction" placeholder="After food" value={m.note} onChange={(e) => upd(m.id, { note: e.target.value })} />
            </div>
          </div>
        ))}
      </FieldGroup>
      <FieldGroup title="Advice">
        <Textarea label="Advice" rows={2} value={advice} onChange={(e) => setAdvice(e.target.value)} />
        <Input label="Follow-up" value={followUp} onChange={(e) => setFollowUp(e.target.value)} />
      </FieldGroup>
    </>
  );

  const preview = (
    <div className="min-h-[1123px] p-12 text-[12.5px] flex flex-col">
      <div className="flex items-start justify-between border-b-2 border-[#0f766e] pb-4">
        <div><div className="text-[20px] font-semibold text-[#0f766e]">{doc.name}</div><div className="text-[#57534e]">{doc.quals}</div><div className="text-[#57534e]">Reg. no. {doc.reg}</div></div>
        <div className="text-right"><div className="text-[15px] font-semibold">{doc.clinic}</div><div className="text-[#57534e]">{doc.address}</div><div className="text-[#57534e]">{doc.phone} · {doc.timings}</div></div>
      </div>
      <div className="mt-5 grid grid-cols-[1fr_auto] gap-6 rounded-lg bg-[#f5f5f4] p-4">
        <div><Eyebrow>Patient</Eyebrow><div className="text-[14px] font-semibold">{pt.name} <span className="font-normal text-[#57534e]">· {pt.age} y / {pt.sex}{pt.weight ? ` · ${pt.weight} kg` : ""}</span></div><div className="text-[#57534e]">{[pt.id && `ID ${pt.id}`, pt.phone].filter(Boolean).join(" · ")}</div></div>
        <div className="text-right"><Eyebrow>Date</Eyebrow><div className="font-medium">{fmtDate(date, "long")}</div></div>
        {(vitals.bp || vitals.pulse || vitals.temp || vitals.spo2) ? <div className="col-span-2 flex gap-5 text-[11.5px]">{vitals.bp ? <span>BP <b>{vitals.bp}</b></span> : null}{vitals.pulse ? <span>Pulse <b>{vitals.pulse}</b></span> : null}{vitals.temp ? <span>Temp <b>{vitals.temp}</b></span> : null}{vitals.spo2 ? <span>SpO₂ <b>{vitals.spo2}</b></span> : null}</div> : null}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-6">
        <div><Eyebrow>Complaints</Eyebrow><div className="mt-1">{complaints}</div></div>
        <div><Eyebrow>Diagnosis</Eyebrow><div className="mt-1 font-medium">{diagnosis}</div></div>
      </div>
      <div className="mt-6 flex items-baseline gap-3"><span className="font-display text-[34px] italic text-[#0f766e]">℞</span></div>
      <div className="mt-1"><SimpleTable accent="#0f766e" compact head={["Medicine", "Dose", "Frequency", "Duration", "Instructions"]} rows={meds.map((m) => [<b key="n">{m.name || "—"}</b>, m.dose, m.freq, m.duration, m.note])} /></div>
      {advice ? <div className="mt-6"><Eyebrow>Advice</Eyebrow><div className="mt-1 whitespace-pre-line">{advice}</div></div> : null}
      {followUp ? <div className="mt-4"><Eyebrow>Follow-up</Eyebrow><div className="mt-1">{followUp}</div></div> : null}
      <div className="mt-auto flex items-end justify-between pt-10">
        <div className="text-[10.5px] text-[#78716c]">Not valid for medico-legal purposes. Take medicines only as prescribed.</div>
        <div className="text-right"><div className="mt-8 inline-block min-w-[180px] border-t border-[#a8a29e] pt-1.5 text-[11.5px] font-medium">{doc.name}</div><div className="text-[10.5px] text-[#57534e]">Signature & stamp</div></div>
      </div>
    </div>
  );

  return <DocumentShell form={form} preview={preview} paperWidth={PAPER.a4} filename={`prescription-${pt.name.replace(/\s+/g, "-")}`} formTitle="Prescription details" previewDescription="A4 prescription pad" shareText={`Prescription for ${pt.name} — ${fmtDate(date)}\nDiagnosis: ${diagnosis}\n${meds.map((m) => `• ${m.name} — ${m.freq} × ${m.duration} (${m.note})`).join("\n")}\nAdvice: ${advice}\n— ${doc.name}, ${doc.clinic}`} sharePhone={pt.phone} />;
}
