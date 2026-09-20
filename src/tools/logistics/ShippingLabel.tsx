"use client";
import { useState } from "react";
import { DocumentShell } from "@/components/shell/DocumentShell";
import { PAPER } from "@/components/shell/PaperPreview";
import { FieldGroup, Input, NumberInput, Row, Segmented, Select, Textarea, Toggle } from "@/components/ui/Field";
import { Barcode } from "@/components/shell/Barcode";
import { Qr } from "@/components/shell/Qr";
import { useBusiness } from "../shared/Business";
import { inr, fmtDate, todayISO } from "@/lib/format";

const PLATFORMS = ["Amazon", "Flipkart", "Meesho", "Myntra", "Speed Post", "Delhivery", "Blue Dart", "DTDC", "Ekart", "Own store"];

export default function ShippingLabel() {
  const { business } = useBusiness();
  const [platform, setPlatform] = useState("Amazon");
  const [courier, setCourier] = useState("Delhivery");
  const [awb, setAwb] = useState("DL123456789IN");
  const [order, setOrder] = useState("403-1234567-8901234");
  const [date, setDate] = useState(todayISO());
  const [to, setTo] = useState({ name: "Priya Verma", phone: "98765 12345", address: "Flat 12B, Lake View Residency, Whitefield\nBengaluru, Karnataka 560066" });
  const [from, setFrom] = useState({ name: business.name, phone: business.phone, address: business.address });
  const [payment, setPayment] = useState<"prepaid" | "cod">("prepaid");
  const [cod, setCod] = useState(0);
  const [weight, setWeight] = useState(0.5);
  const [dims, setDims] = useState({ l: 20, w: 15, h: 10 });
  const [contents, setContents] = useState("Cotton kurta × 1");
  const [fragile, setFragile] = useState(false);
  const [showQr, setShowQr] = useState(true);
  const [returnAddr, setReturnAddr] = useState(true);

  const form = (
    <>
      <FieldGroup title="Shipment">
        <Row>
          <Select label="Platform" value={platform} onChange={(e) => setPlatform(e.target.value)} options={PLATFORMS} />
          <Input label="Courier partner" value={courier} onChange={(e) => setCourier(e.target.value)} />
          <Input label="AWB / tracking no." value={awb} onChange={(e) => setAwb(e.target.value.toUpperCase())} help="Rendered as a scannable Code 128 barcode." />
          <Input label="Order ID" value={order} onChange={(e) => setOrder(e.target.value)} />
          <Input label="Ship date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <NumberInput label="Weight" suffix="kg" value={weight} onChange={setWeight} step={0.1} />
        </Row>
        <Row cols={3}>
          <NumberInput label="Length" suffix="cm" value={dims.l} onChange={(v) => setDims({ ...dims, l: v })} />
          <NumberInput label="Width" suffix="cm" value={dims.w} onChange={(v) => setDims({ ...dims, w: v })} />
          <NumberInput label="Height" suffix="cm" value={dims.h} onChange={(v) => setDims({ ...dims, h: v })} />
        </Row>
        <Segmented value={payment} onChange={setPayment} options={[{ value: "prepaid", label: "Prepaid" }, { value: "cod", label: "Cash on delivery" }]} size="sm" />
        {payment === "cod" ? <NumberInput label="COD amount to collect" prefix="₹" value={cod} onChange={setCod} /> : null}
        <Input label="Contents" value={contents} onChange={(e) => setContents(e.target.value)} />
        <Toggle checked={fragile} onChange={setFragile} label="Mark as fragile" />
        <Toggle checked={showQr} onChange={setShowQr} label="Add QR code (order ID)" />
        <Toggle checked={returnAddr} onChange={setReturnAddr} label="Print return address" />
      </FieldGroup>
      <FieldGroup title="Deliver to">
        <Row>
          <Input label="Customer name" value={to.name} onChange={(e) => setTo({ ...to, name: e.target.value })} />
          <Input label="Phone" type="tel" value={to.phone} onChange={(e) => setTo({ ...to, phone: e.target.value })} />
        </Row>
        <Textarea label="Address" rows={3} value={to.address} onChange={(e) => setTo({ ...to, address: e.target.value })} />
      </FieldGroup>
      <FieldGroup title="Ship from">
        <Row>
          <Input label="Seller name" value={from.name} onChange={(e) => setFrom({ ...from, name: e.target.value })} />
          <Input label="Phone" type="tel" value={from.phone} onChange={(e) => setFrom({ ...from, phone: e.target.value })} />
        </Row>
        <Textarea label="Address" rows={2} value={from.address} onChange={(e) => setFrom({ ...from, address: e.target.value })} />
      </FieldGroup>
    </>
  );

  const preview = (
    <div style={{ width: PAPER.label4x6, height: PAPER.label4x6 * 1.5 }} className="flex flex-col border border-black p-3 text-[11px] leading-tight" >
      <div className="flex items-center justify-between border-b-2 border-black pb-2">
        <div className="text-[16px] font-black uppercase tracking-tight">{platform}</div>
        <div className="text-right"><div className="font-semibold">{courier}</div><div className="text-[10px]">{fmtDate(date)}</div></div>
      </div>
      <div className="mt-2 flex items-center justify-center border-b border-black pb-2"><Barcode value={awb || "000"} height={54} width={1.6} fontSize={11} /></div>
      <div className="mt-2 flex items-start justify-between gap-2 border-b border-black pb-2">
        <div className="min-w-0 flex-1">
          <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#57534e]">Deliver to</div>
          <div className="text-[14px] font-bold leading-tight">{to.name}</div>
          <div className="whitespace-pre-line text-[11.5px]">{to.address}</div>
          <div className="mt-0.5 font-semibold">Ph: {to.phone}</div>
        </div>
        {showQr ? <Qr text={`${platform} ${order} ${awb}`} size={64} opts={{ margin: 0 }} /> : null}
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2 border-b border-black pb-2 text-center">
        <div><div className="text-[9px] uppercase text-[#57534e]">Payment</div><div className={`text-[13px] font-black ${payment === "cod" ? "" : ""}`}>{payment === "cod" ? `COD ${inr(cod, { decimals: 0 })}` : "PREPAID"}</div></div>
        <div><div className="text-[9px] uppercase text-[#57534e]">Weight</div><div className="text-[13px] font-bold">{weight} kg</div></div>
        <div><div className="text-[9px] uppercase text-[#57534e]">Dims (cm)</div><div className="text-[13px] font-bold">{dims.l}×{dims.w}×{dims.h}</div></div>
      </div>
      <div className="mt-2 border-b border-black pb-2"><span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#57534e]">Order </span><span className="font-mono text-[12px] font-semibold">{order}</span><div className="text-[10.5px]">{contents}</div></div>
      <div className="mt-auto flex items-end justify-between gap-2 pt-2">
        {returnAddr ? <div className="min-w-0 text-[9.5px] leading-tight text-[#44403c]"><div className="font-bold uppercase tracking-[0.12em]">If undelivered, return to</div><div className="font-semibold">{from.name}</div><div className="whitespace-pre-line">{from.address}</div><div>Ph: {from.phone}</div></div> : <span />}
        {fragile ? <div className="shrink-0 rotate-[-4deg] border-[3px] border-black px-2 py-0.5 text-[12px] font-black uppercase tracking-[0.2em]">Fragile</div> : null}
      </div>
    </div>
  );

  return <DocumentShell form={form} preview={preview} paperWidth={PAPER.label4x6} pdfFormat="auto" filename={`label-${awb}`} pngExport formTitle="Label details" previewDescription="4 × 6 in thermal label · 100 × 150 mm" shareText={`Your ${platform} order ${order} has shipped via ${courier}. Track with AWB ${awb}.`} sharePhone={to.phone} />;
}
