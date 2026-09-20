"use client";
import { useState } from "react";
import { DocumentShell } from "@/components/shell/DocumentShell";
import { PAPER } from "@/components/shell/PaperPreview";
import { FieldGroup, Input, Row, Select, Textarea } from "@/components/ui/Field";
import { useBusiness, BusinessFields, LetterHead } from "../shared/Business";
import { fmtDate, todayISO } from "@/lib/format";

export default function ExperienceLetter() {
  const { business, logo } = useBusiness();
  const [kind, setKind] = useState<"experience" | "relieving">("experience");
  const [emp, setEmp] = useState({ name: "Neha Gupta", id: "EMP-042", designation: "Senior Accountant", department: "Finance", from: "2022-06-01", to: todayISO(), gender: "she" });
  const [date, setDate] = useState(todayISO());
  const [ref, setRef] = useState("HR/EXP/2026/014");
  const [conduct, setConduct] = useState("During this period, we found {pronoun} to be sincere, hardworking and dedicated. {Pronoun} handled responsibilities with professionalism and was a valued member of the team.");
  const [signer, setSigner] = useState({ name: "Rajesh Mehta", title: "HR Manager" });
  const fill = (s: string) => s.replace(/\{pronoun\}/g, emp.gender === "he" ? "him" : emp.gender === "she" ? "her" : "them").replace(/\{Pronoun\}/g, emp.gender === "he" ? "He" : emp.gender === "she" ? "She" : "They");
  const poss = emp.gender === "he" ? "his" : emp.gender === "she" ? "her" : "their";

  const months = Math.max(0, Math.round((new Date(emp.to).getTime() - new Date(emp.from).getTime()) / (30.44 * 86400000)));
  const tenure = months >= 12 ? `${Math.floor(months / 12)} year${Math.floor(months / 12) > 1 ? "s" : ""}${months % 12 ? ` and ${months % 12} month${months % 12 > 1 ? "s" : ""}` : ""}` : `${months} month${months !== 1 ? "s" : ""}`;

  const form = (
    <>
      <BusinessFields showGstin={false} showTagline />
      <FieldGroup title="Letter">
        <Select label="Letter type" value={kind} onChange={(e) => setKind(e.target.value as "experience" | "relieving")} options={[{ value: "experience", label: "Experience certificate" }, { value: "relieving", label: "Relieving letter" }]} />
        <Row>
          <Input label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <Input label="Reference no." value={ref} onChange={(e) => setRef(e.target.value)} />
        </Row>
      </FieldGroup>
      <FieldGroup title="Employee">
        <Row>
          <Input label="Full name" value={emp.name} onChange={(e) => setEmp({ ...emp, name: e.target.value })} />
          <Input label="Employee ID" value={emp.id} onChange={(e) => setEmp({ ...emp, id: e.target.value })} />
          <Input label="Designation" value={emp.designation} onChange={(e) => setEmp({ ...emp, designation: e.target.value })} />
          <Input label="Department" value={emp.department} onChange={(e) => setEmp({ ...emp, department: e.target.value })} />
          <Input label="Joined on" type="date" value={emp.from} onChange={(e) => setEmp({ ...emp, from: e.target.value })} />
          <Input label="Last working day" type="date" value={emp.to} onChange={(e) => setEmp({ ...emp, to: e.target.value })} />
        </Row>
        <Select label="Pronouns" value={emp.gender} onChange={(e) => setEmp({ ...emp, gender: e.target.value })} options={[{ value: "she", label: "She / her" }, { value: "he", label: "He / him" }, { value: "they", label: "They / them" }]} />
        <Textarea label="Conduct paragraph" rows={3} value={conduct} onChange={(e) => setConduct(e.target.value)} help="Use {pronoun} / {Pronoun} placeholders." />
      </FieldGroup>
      <FieldGroup title="Signatory">
        <Row>
          <Input label="Name" value={signer.name} onChange={(e) => setSigner({ ...signer, name: e.target.value })} />
          <Input label="Title" value={signer.title} onChange={(e) => setSigner({ ...signer, title: e.target.value })} />
        </Row>
      </FieldGroup>
    </>
  );

  const preview = (
    <div className="min-h-[1123px] p-12 text-[13px] leading-[1.8]">
      <LetterHead business={business} logo={logo} />
      <div className="mt-8 flex justify-between text-[#57534e]"><span>Ref: {ref}</span><span>{fmtDate(date, "long")}</span></div>
      <h2 className="mt-10 text-center text-[16px] font-bold uppercase tracking-[0.2em] underline underline-offset-4">{kind === "experience" ? "To whomsoever it may concern" : "Relieving letter"}</h2>
      {kind === "relieving" ? <div className="mt-6">Dear {emp.name},</div> : null}
      <p className="mt-6">
        This is to certify that <strong>{emp.name}</strong> (Employee ID: {emp.id}) {kind === "experience" ? "was employed with" : "has been relieved from the services of"} <strong>{business.name}</strong> {kind === "experience" ? `from ${fmtDate(emp.from, "long")} to ${fmtDate(emp.to, "long")}` : `with effect from the close of business hours on ${fmtDate(emp.to, "long")}`}. {kind === "experience" ? `At the time of leaving, ${poss} designation was` : `${emp.name} joined us on ${fmtDate(emp.from, "long")} and last held the position of`} <strong>{emp.designation}</strong> in the {emp.department} department{kind === "experience" ? `, a tenure of ${tenure}` : ""}.
      </p>
      <p className="mt-4">{fill(conduct)}</p>
      {kind === "relieving" ? <p className="mt-4">All dues have been settled and there are no pending liabilities from either side. {emp.name} has handed over all company property and responsibilities as required.</p> : null}
      <p className="mt-4">We wish {emp.gender === "he" ? "him" : emp.gender === "she" ? "her" : "them"} every success in {poss} future endeavours.</p>
      <div className="mt-14">
        <div>For <strong>{business.name}</strong></div>
        <div className="mt-14 font-semibold">{signer.name}</div>
        <div className="text-[#57534e]">{signer.title}</div>
      </div>
    </div>
  );

  return <DocumentShell form={form} preview={preview} paperWidth={PAPER.a4} filename={`${kind}-letter-${emp.name.replace(/\s+/g, "-")}`} formTitle="Letter details" previewDescription="A4 · on your letterhead" />;
}
