"use client";
import { useState } from "react";
import { DocumentShell } from "@/components/shell/DocumentShell";
import { PAPER } from "@/components/shell/PaperPreview";
import { Checkbox, FieldGroup, Input, NumberInput, Row, Select, Textarea } from "@/components/ui/Field";
import { useBusiness, BusinessFields, LetterHead } from "../shared/Business";
import { EPF_WAGE_CEILING } from "@/lib/payroll";
import { fmtDate, inr, todayISO, addDaysISO } from "@/lib/format";

type TemplateId = "standard" | "startup" | "sales" | "intern" | "contract";

interface Template {
  label: string;
  hint: string;
  role: string;
  probation: number;
  notice: number;
  variablePct: number;
  basicPct: number;
  intro: string;
  terms: string[];
}

/** Starting points, not finished letters — every line stays editable below. */
const TEMPLATES: Record<TemplateId, Template> = {
  standard: {
    label: "Standard full-time",
    hint: "Permanent role, 6-month probation, fixed CTC",
    role: "Senior Accountant", probation: 6, notice: 60, variablePct: 0, basicPct: 50,
    intro: "We are pleased to offer you employment with {company} in the position of {designation}. This offer is made on the terms set out below and in the attached annexure.",
    terms: [
      "Your employment is subject to verification of the documents and references you provide, and to your being legally eligible to work in India.",
      "You will be on probation for {probation} months from your date of joining. On satisfactory completion, your employment will be confirmed in writing.",
      "Either party may terminate this employment by giving {notice} days' written notice, or salary in lieu of notice, after confirmation.",
      "You will be governed by the company's policies on conduct, leave, confidentiality and information security, as amended from time to time.",
      "You shall not, during or after your employment, disclose any confidential information of the company or its clients.",
    ],
  },
  startup: {
    label: "Startup / early-stage",
    hint: "Shorter probation, ESOP line, broad role",
    role: "Product Engineer", probation: 3, notice: 30, variablePct: 0, basicPct: 50,
    intro: "We would love for you to join {company} as {designation}. We are a small team, so the role will stretch beyond its title — and so will what you learn.",
    terms: [
      "You will be on probation for {probation} months from your date of joining, after which your employment will be confirmed in writing.",
      "Either party may terminate this employment by giving {notice} days' written notice after confirmation.",
      "You may be granted employee stock options under the company's ESOP plan, subject to board approval and the terms of the plan. Any grant will be communicated separately.",
      "In an early-stage company responsibilities change. You agree to take on work reasonably related to your skills as the company's needs evolve.",
      "You shall not, during or after your employment, disclose any confidential information of the company, its investors or its clients.",
    ],
  },
  sales: {
    label: "Sales with variable pay",
    hint: "Fixed plus incentive, targets referenced",
    role: "Territory Sales Manager", probation: 3, notice: 30, variablePct: 20, basicPct: 50,
    intro: "We are pleased to offer you the position of {designation} at {company}. Your compensation combines a fixed salary with a performance-linked incentive, detailed in the annexure.",
    terms: [
      "Your variable pay is linked to targets communicated at the start of each quarter and is payable on achievement, as per the incentive plan in force.",
      "You will be on probation for {probation} months from your date of joining.",
      "Either party may terminate this employment by giving {notice} days' written notice after confirmation.",
      "Travel within your assigned territory is part of the role. Reasonable expenses will be reimbursed against bills as per policy.",
      "Customer lists, pricing and pipeline information are confidential and must not be shared or retained after you leave.",
    ],
  },
  intern: {
    label: "Internship",
    hint: "Fixed term, stipend, no probation",
    role: "Marketing Intern", probation: 0, notice: 15, variablePct: 0, basicPct: 100,
    intro: "We are pleased to offer you an internship with {company} as {designation}. This is a fixed-term, full-time internship and does not constitute an offer of permanent employment.",
    terms: [
      "This internship is for a fixed term ending on the date stated above and will not automatically convert into employment.",
      "You will be paid a monthly stipend as stated in the annexure. Statutory deductions will apply where required.",
      "Either party may end the internship by giving {notice} days' written notice.",
      "You will be assigned a mentor and will receive a certificate on satisfactory completion.",
      "All work produced during the internship belongs to the company, and company information must be kept confidential.",
    ],
  },
  contract: {
    label: "Fixed-term / consultant",
    hint: "Contract engagement, monthly fee",
    role: "Design Consultant", probation: 0, notice: 30, variablePct: 0, basicPct: 100,
    intro: "We are pleased to engage you as {designation} with {company} on a fixed-term basis, on the terms set out below.",
    terms: [
      "This is a contract for services for the term stated above. It does not create an employer-employee relationship, and you will not be eligible for employee benefits.",
      "Your fee will be paid monthly against an invoice. Tax will be deducted at source under the applicable section of the Income-tax Act.",
      "Either party may terminate this engagement by giving {notice} days' written notice.",
      "You are responsible for your own taxes, insurance and statutory registrations.",
      "All deliverables and intellectual property created under this engagement vest in the company on payment.",
    ],
  },
};

export default function OfferLetter() {
  const { business, logo } = useBusiness();
  const [tpl, setTpl] = useState<TemplateId>("standard");
  const t = TEMPLATES[tpl];

  const [candidate, setCandidate] = useState({ name: "Neha Gupta", address: "B-204, Sunrise Apartments, Andheri East, Mumbai 400069", designation: t.role, department: "Finance", location: "Mumbai", reportsTo: "Finance Head" });
  const [dates, setDates] = useState({ issued: todayISO(), joining: addDaysISO(todayISO(), 30), validTill: addDaysISO(todayISO(), 7), termEnd: addDaysISO(todayISO(), 210) });
  const [ref, setRef] = useState("HR/OFF/2026/018");
  const [pay, setPay] = useState({ ctc: 900000, basicPct: t.basicPct, variablePct: t.variablePct, probation: t.probation, notice: t.notice, hours: "9:30 am to 6:30 pm, Monday to Friday", leave: 18 });
  const [intro, setIntro] = useState(t.intro);
  const [terms, setTerms] = useState(t.terms.join("\n"));
  const [signer, setSigner] = useState({ name: "Rajesh Mehta", title: "HR Manager" });
  const [showBreakup, setShowBreakup] = useState(true);
  const [showAcceptance, setShowAcceptance] = useState(true);

  /** Switching template replaces the wording and the defaults it implies, not the people or the money. */
  const applyTemplate = (id: TemplateId) => {
    const n = TEMPLATES[id];
    setTpl(id);
    setIntro(n.intro);
    setTerms(n.terms.join("\n"));
    setPay((p) => ({ ...p, basicPct: n.basicPct, variablePct: n.variablePct, probation: n.probation, notice: n.notice }));
    setCandidate((c) => ({ ...c, designation: c.designation === TEMPLATES[tpl].role ? n.role : c.designation }));
  };

  const isIntern = tpl === "intern";
  const isContract = tpl === "contract";
  const fill = (s: string) => s
    .replace(/\{company\}/g, business.name || "the company")
    .replace(/\{designation\}/g, candidate.designation)
    .replace(/\{probation\}/g, String(pay.probation))
    .replace(/\{notice\}/g, String(pay.notice))
    .replace(/\{name\}/g, candidate.name);

  // Annexure: a conventional Indian CTC split. Employer PF follows the ₹25,000 wage ceiling.
  const fixed = pay.ctc * (1 - pay.variablePct / 100);
  const basic = fixed * (pay.basicPct / 100);
  const hra = basic * 0.4;
  const employerPf = Math.min(basic / 12, EPF_WAGE_CEILING) * 12 * 0.12;
  const gratuity = basic * 0.0481;
  const special = Math.max(0, fixed - basic - hra - employerPf - gratuity);
  const variable = pay.ctc - fixed;
  const rows: Array<[string, number]> = [["Basic salary", basic], ["House rent allowance", hra], ["Special allowance", special], ["Employer PF contribution", employerPf], ["Gratuity provision", gratuity]];
  if (variable > 0) rows.push(["Performance-linked variable pay", variable]);

  const form = (
    <>
      <FieldGroup title="Template">
        <Select label="Start from" value={tpl} onChange={(e) => applyTemplate(e.target.value as TemplateId)} options={Object.entries(TEMPLATES).map(([k, v]) => ({ value: k, label: `${v.label} — ${v.hint}` }))} help="Changing this rewrites the body and terms below. Everything stays editable." />
      </FieldGroup>
      <BusinessFields title="Your company (letterhead)" showGstin={false} showTagline showWeb />
      <FieldGroup title="Letter">
        <Row>
          <Input label="Reference no." value={ref} onChange={(e) => setRef(e.target.value)} />
          <Input label="Date of issue" type="date" value={dates.issued} onChange={(e) => setDates({ ...dates, issued: e.target.value })} />
          <Input label="Date of joining" type="date" value={dates.joining} onChange={(e) => setDates({ ...dates, joining: e.target.value })} />
          <Input label="Offer valid till" type="date" value={dates.validTill} onChange={(e) => setDates({ ...dates, validTill: e.target.value })} />
        </Row>
        {isIntern || isContract ? <Input label={isIntern ? "Internship ends on" : "Contract ends on"} type="date" value={dates.termEnd} onChange={(e) => setDates({ ...dates, termEnd: e.target.value })} /> : null}
      </FieldGroup>
      <FieldGroup title="Candidate">
        <Row>
          <Input label="Full name" value={candidate.name} onChange={(e) => setCandidate({ ...candidate, name: e.target.value })} />
          <Input label="Designation" value={candidate.designation} onChange={(e) => setCandidate({ ...candidate, designation: e.target.value })} />
          <Input label="Department" value={candidate.department} onChange={(e) => setCandidate({ ...candidate, department: e.target.value })} />
          <Input label="Work location" value={candidate.location} onChange={(e) => setCandidate({ ...candidate, location: e.target.value })} />
          <Input label="Reports to" value={candidate.reportsTo} onChange={(e) => setCandidate({ ...candidate, reportsTo: e.target.value })} />
        </Row>
        <Textarea label="Candidate address" rows={2} value={candidate.address} onChange={(e) => setCandidate({ ...candidate, address: e.target.value })} />
      </FieldGroup>
      <FieldGroup title={isContract ? "Fee and terms" : isIntern ? "Stipend and terms" : "Compensation and terms"}>
        <Row>
          <NumberInput label={isContract ? "Annual fee" : isIntern ? "Annual stipend" : "Annual CTC"} prefix="₹" value={pay.ctc} onChange={(v) => setPay({ ...pay, ctc: v })} />
          <NumberInput label="Basic as % of fixed pay" suffix="%" value={pay.basicPct} onChange={(v) => setPay({ ...pay, basicPct: v })} help="40–50% is usual" />
          <NumberInput label="Variable pay" suffix="% of CTC" value={pay.variablePct} onChange={(v) => setPay({ ...pay, variablePct: v })} />
          <NumberInput label="Probation" suffix="months" value={pay.probation} onChange={(v) => setPay({ ...pay, probation: v })} />
          <NumberInput label="Notice period" suffix="days" value={pay.notice} onChange={(v) => setPay({ ...pay, notice: v })} />
          <NumberInput label="Annual paid leave" suffix="days" value={pay.leave} onChange={(v) => setPay({ ...pay, leave: v })} />
        </Row>
        <Input label="Working hours" value={pay.hours} onChange={(e) => setPay({ ...pay, hours: e.target.value })} />
        <Row cols={2}>
          <Checkbox checked={showBreakup} onChange={setShowBreakup} label="Include salary annexure" />
          <Checkbox checked={showAcceptance} onChange={setShowAcceptance} label="Include acceptance block" />
        </Row>
      </FieldGroup>
      <FieldGroup title="Wording">
        <Textarea label="Opening paragraph" rows={3} value={intro} onChange={(e) => setIntro(e.target.value)} help="Placeholders: {company} {designation} {name} {probation} {notice}" />
        <Textarea label="Terms — one per line" rows={8} value={terms} onChange={(e) => setTerms(e.target.value)} />
      </FieldGroup>
      <FieldGroup title="Signatory">
        <Row>
          <Input label="Name" value={signer.name} onChange={(e) => setSigner({ ...signer, name: e.target.value })} />
          <Input label="Designation" value={signer.title} onChange={(e) => setSigner({ ...signer, title: e.target.value })} />
        </Row>
      </FieldGroup>
    </>
  );

  const money = (n: number) => inr(n, { decimals: 0 });
  const preview = (
    <div className="min-h-[1123px] p-12 text-[12.5px] leading-[1.75]">
      <LetterHead business={business} logo={logo} />
      <div className="mt-7 flex justify-between text-[#57534e]"><span>Ref: {ref}</span><span>{fmtDate(dates.issued, "long")}</span></div>

      <div className="mt-7">
        <div className="font-semibold">{candidate.name}</div>
        <div className="whitespace-pre-line text-[#57534e]">{candidate.address}</div>
      </div>

      <h2 className="mt-7 text-center text-[15px] font-bold uppercase tracking-[0.18em] underline underline-offset-4">
        {isIntern ? "Internship offer letter" : isContract ? "Letter of engagement" : "Offer of employment"}
      </h2>

      <p className="mt-6">Dear {candidate.name.split(" ")[0] || candidate.name},</p>
      <p className="mt-3">{fill(intro)}</p>

      <table className="mt-5 w-full border-collapse text-[12px]">
        <tbody>
          {([
            ["Designation", candidate.designation],
            ["Department", candidate.department],
            ["Reporting to", candidate.reportsTo],
            ["Place of work", candidate.location],
            ["Date of joining", fmtDate(dates.joining, "long")],
            ...(isIntern || isContract ? [[isIntern ? "Internship ends" : "Contract ends", fmtDate(dates.termEnd, "long")] as [string, string]] : []),
            [isContract ? "Annual fee" : isIntern ? "Annual stipend" : "Annual CTC", `${money(pay.ctc)} (${money(pay.ctc / 12)} per month)`],
            ...(pay.probation > 0 ? [["Probation", `${pay.probation} months`] as [string, string]] : []),
            ["Notice period", `${pay.notice} days`],
            ["Working hours", pay.hours],
            ...(isContract ? [] : [["Paid leave", `${pay.leave} days a year`] as [string, string]]),
          ] as Array<[string, string]>).map(([k, v]) => (
            <tr key={k} className="border-b border-[#e7e5e4]">
              <td className="w-[38%] py-1.5 pr-3 align-top text-[#57534e]">{k}</td>
              <td className="py-1.5 font-medium">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ol className="mt-5 list-decimal space-y-2 pl-5">
        {terms.split("\n").map((x) => x.trim()).filter(Boolean).map((x, i) => <li key={i}>{fill(x)}</li>)}
      </ol>

      <p className="mt-4">
        This offer is valid until <strong>{fmtDate(dates.validTill, "long")}</strong>. Please confirm your acceptance by signing and returning a copy of this letter on or before that date.
      </p>

      <div className="mt-10">
        <div>For <strong>{business.name}</strong></div>
        <div className="mt-12 font-semibold">{signer.name}</div>
        <div className="text-[#57534e]">{signer.title}</div>
      </div>

      {showAcceptance ? (
        <div className="mt-10 border-t border-[#e7e5e4] pt-5">
          <div className="font-semibold">Acceptance</div>
          <p className="mt-2">I have read and understood the terms of this letter and accept the offer. I confirm that I will join on the date stated above.</p>
          <div className="mt-10 flex justify-between text-[#57534e]">
            <span>Signature: ______________________</span>
            <span>Date: ______________</span>
          </div>
          <div className="mt-3">Name: {candidate.name}</div>
        </div>
      ) : null}

      {showBreakup ? (
        <div className="mt-12 break-before-page">
          <LetterHead business={business} logo={logo} compact />
          <h3 className="mt-6 text-center text-[13px] font-bold uppercase tracking-[0.16em]">Annexure — compensation structure</h3>
          <p className="mt-3 text-[#57534e]">Name: <strong className="text-[#1c1917]">{candidate.name}</strong> · {candidate.designation} · effective {fmtDate(dates.joining, "long")}</p>
          <table className="mt-4 w-full border-collapse text-[12px]">
            <thead>
              <tr className="border-b-2 border-[#1c1917] text-left">
                <th className="py-2">Component</th><th className="py-2 text-right">Per month</th><th className="py-2 text-right">Per year</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([k, v]) => (
                <tr key={k} className="border-b border-[#e7e5e4]">
                  <td className="py-1.5">{k}</td>
                  <td className="py-1.5 text-right tabular">{money(v / 12)}</td>
                  <td className="py-1.5 text-right tabular">{money(v)}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-[#1c1917] font-semibold">
                <td className="py-2">Total cost to company</td>
                <td className="py-2 text-right tabular">{money(pay.ctc / 12)}</td>
                <td className="py-2 text-right tabular">{money(pay.ctc)}</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-4 text-[11px] leading-relaxed text-[#78716c]">
            Cost to company includes the employer&rsquo;s contributions and provisions and is not the amount credited to your bank account. Employee provident fund, professional tax and income tax
            are deducted from gross salary as applicable. Employer PF is computed on basic salary up to the statutory wage ceiling of {money(EPF_WAGE_CEILING)} a month. Gratuity is payable as per the
            Payment of Gratuity Act, 1972.
          </p>
        </div>
      ) : null}
    </div>
  );

  return <DocumentShell form={form} preview={preview} paperWidth={PAPER.a4} filename={`offer-letter-${candidate.name.replace(/\s+/g, "-").toLowerCase()}`} formTitle="Offer details" previewDescription="A4 · letter + salary annexure" />;
}
