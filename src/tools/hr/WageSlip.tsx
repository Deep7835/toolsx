"use client";
import { useState } from "react";
import { DocumentShell } from "@/components/shell/DocumentShell";
import { PAPER } from "@/components/shell/PaperPreview";
import { FieldGroup, Input, NumberInput, Row, Segmented, Select } from "@/components/ui/Field";
import { inr, numberToWordsINR, todayISO, fmtDate } from "@/lib/format";
import { useBusiness, BusinessFields } from "../shared/Business";
import { Divider, Eyebrow } from "../shared/doc";
import { nextDocNumber } from "../billing/InvoiceLike";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function WageSlip() {
  const { business } = useBusiness();
  const [layout, setLayout] = useState<"thermal" | "a5">("thermal");
  const [slipNo, setSlipNo] = useState(() => nextDocNumber("WS-"));
  const [date, setDate] = useState(todayISO());
  const [name, setName] = useState("Ramesh Kumar");
  const [role, setRole] = useState("Packer");
  const [empId, setEmpId] = useState("");
  const [period, setPeriod] = useState(months[new Date().getMonth()]);
  const [basis, setBasis] = useState<"daily" | "monthly">("daily");
  const [rate, setRate] = useState(600);
  const [days, setDays] = useState(26);
  const [otHours, setOtHours] = useState(0);
  const [otRate, setOtRate] = useState(90);
  const [bonus, setBonus] = useState(0);
  const [advance, setAdvance] = useState(0);
  const [pf, setPf] = useState(0);
  const [esi, setEsi] = useState(0);
  const [other, setOther] = useState(0);
  const [mode, setMode] = useState("Cash");

  const gross = (basis === "daily" ? rate * days : rate) + otHours * otRate + bonus;
  const deductions = advance + pf + esi + other;
  const net = Math.max(0, Math.round(gross - deductions));

  const form = (
    <>
      <Segmented value={layout} onChange={setLayout} options={[{ value: "thermal", label: "80mm thermal" }, { value: "a5", label: "A5 slip" }]} size="sm" />
      <BusinessFields showGstin={false} showLogo={false} />
      <FieldGroup title="Worker">
        <Row>
          <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Role" value={role} onChange={(e) => setRole(e.target.value)} />
          <Input label="Worker ID" hint="optional" value={empId} onChange={(e) => setEmpId(e.target.value)} />
          <Select label="Pay period" value={period} onChange={(e) => setPeriod(e.target.value)} options={months} />
          <Input label="Slip no." value={slipNo} onChange={(e) => setSlipNo(e.target.value)} />
          <Input label="Payment date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </Row>
      </FieldGroup>
      <FieldGroup title="Earnings">
        <Segmented value={basis} onChange={setBasis} options={[{ value: "daily", label: "Daily wage" }, { value: "monthly", label: "Monthly salary" }]} size="sm" />
        <Row>
          <NumberInput label={basis === "daily" ? "Rate per day" : "Monthly salary"} prefix="₹" value={rate} onChange={setRate} />
          {basis === "daily" ? <NumberInput label="Days worked" value={days} onChange={setDays} /> : null}
          <NumberInput label="Overtime hours" value={otHours} onChange={setOtHours} />
          <NumberInput label="OT rate / hour" prefix="₹" value={otRate} onChange={setOtRate} />
          <NumberInput label="Bonus / incentive" prefix="₹" value={bonus} onChange={setBonus} />
          <Select label="Paid by" value={mode} onChange={(e) => setMode(e.target.value)} options={["Cash", "UPI", "Bank transfer"]} />
        </Row>
      </FieldGroup>
      <FieldGroup title="Deductions">
        <Row cols={4}>
          <NumberInput label="Advance" prefix="₹" value={advance} onChange={setAdvance} />
          <NumberInput label="PF" prefix="₹" value={pf} onChange={setPf} />
          <NumberInput label="ESI" prefix="₹" value={esi} onChange={setEsi} />
          <NumberInput label="Other" prefix="₹" value={other} onChange={setOther} />
        </Row>
      </FieldGroup>
    </>
  );

  const renderBody = (mono?: boolean) => (
    <div className={mono ? "text-[11.5px]" : "text-[12.5px]"} style={{ fontFamily: mono ? "ui-monospace, Menlo, monospace" : "Inter, ui-sans-serif" }}>
      <div className="text-center">
        <div className={`${mono ? "text-[15px]" : "text-[20px]"} font-bold uppercase tracking-wide`}>{business.name}</div>
        <div className="text-[10px] whitespace-pre-line text-[#57534e]">{business.address}</div>
      </div>
      <Divider dashed={mono} />
      <div className="text-center"><Eyebrow>Wage slip · {period}</Eyebrow></div>
      <div className="mt-2 flex justify-between"><span>Slip</span><span>{slipNo}</span></div>
      <div className="flex justify-between"><span>Name</span><span className="font-semibold">{name}</span></div>
      <div className="flex justify-between"><span>Role</span><span>{role}{empId ? ` · ${empId}` : ""}</span></div>
      <div className="flex justify-between"><span>Paid on</span><span>{fmtDate(date)} · {mode}</span></div>
      <Divider dashed={mono} />
      <div className="font-semibold">Earnings</div>
      {basis === "daily" ? <div className="flex justify-between"><span>{days} days × {inr(rate, { decimals: 0 })}</span><span>{inr(rate * days, { decimals: 0 })}</span></div> : <div className="flex justify-between"><span>Monthly salary</span><span>{inr(rate, { decimals: 0 })}</span></div>}
      {otHours > 0 ? <div className="flex justify-between"><span>OT {otHours} h × {inr(otRate, { decimals: 0 })}</span><span>{inr(otHours * otRate, { decimals: 0 })}</span></div> : null}
      {bonus > 0 ? <div className="flex justify-between"><span>Bonus / incentive</span><span>{inr(bonus, { decimals: 0 })}</span></div> : null}
      <div className="flex justify-between font-semibold"><span>Gross</span><span>{inr(gross, { decimals: 0 })}</span></div>
      {deductions > 0 ? (
        <>
          <Divider dashed={mono} />
          <div className="font-semibold">Deductions</div>
          {advance > 0 ? <div className="flex justify-between"><span>Advance</span><span>−{inr(advance, { decimals: 0 })}</span></div> : null}
          {pf > 0 ? <div className="flex justify-between"><span>PF</span><span>−{inr(pf, { decimals: 0 })}</span></div> : null}
          {esi > 0 ? <div className="flex justify-between"><span>ESI</span><span>−{inr(esi, { decimals: 0 })}</span></div> : null}
          {other > 0 ? <div className="flex justify-between"><span>Other</span><span>−{inr(other, { decimals: 0 })}</span></div> : null}
        </>
      ) : null}
      <Divider dashed={mono} />
      <div className={`flex justify-between ${mono ? "text-[14px]" : "text-[18px]"} font-bold`}><span>NET PAY</span><span>{inr(net, { decimals: 0 })}</span></div>
      <div className="mt-1 text-[10px] text-[#57534e]">{numberToWordsINR(net)}</div>
      <Divider dashed={mono} />
      <div className="mt-6 flex justify-between text-[10px] text-[#57534e]"><span>Employer signature</span><span>Worker signature</span></div>
    </div>
  );

  return (
    <DocumentShell
      form={form}
      preview={layout === "thermal" ? <div className="px-3 py-4">{renderBody(true)}</div> : <div className="p-10 min-h-[790px]">{renderBody(false)}</div>}
      paperWidth={layout === "thermal" ? PAPER.thermal80 : PAPER.a5}
      pdfFormat={layout === "thermal" ? "thermal" : "a5"}
      filename={`wage-slip-${name.replace(/\s+/g, "-")}-${period}`}
      shareText={`Wage slip ${slipNo} · ${period}\n${name} (${role})\nGross ${inr(gross, { decimals: 0 })} − Deductions ${inr(deductions, { decimals: 0 })} = Net ${inr(net, { decimals: 0 })}\nPaid ${fmtDate(date)} by ${mode}\n— ${business.name}`}
      formTitle="Wage slip details"
      previewDescription={layout === "thermal" ? "80 mm thermal" : "A5"}
    />
  );
}
