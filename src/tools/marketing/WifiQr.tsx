"use client";
import { useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { FieldGroup, Input, Select, Toggle } from "@/components/ui/Field";
import { QrOutput, QrStyleFields, useQrStyle } from "@/components/shell/QrOutput";
import { Eye, EyeOff } from "lucide-react";

export default function WifiQr() {
  const [ssid, setSsid] = useState("Cafe_Guest");
  const [pass, setPass] = useState("");
  const [enc, setEnc] = useState("WPA");
  const [hidden, setHidden] = useState(false);
  const [show, setShow] = useState(false);
  const s = useQrStyle();
  const esc = (v: string) => v.replace(/([\;,:"])/g, "\\$1");
  const data = ssid ? `WIFI:T:${enc};S:${esc(ssid)};${enc !== "nopass" ? `P:${esc(pass)};` : ""}${hidden ? "H:true;" : ""};` : "";
  return (
    <div className="grid gap-5 lg:grid-cols-12 items-start">
      <Card className="lg:col-span-6 min-w-0">
        <CardHeader title="Network details" description="Nothing is sent anywhere — the password is only encoded into the image." />
        <CardBody className="grid gap-6">
          <FieldGroup title="WiFi">
            <Input label="Network name (SSID)" value={ssid} onChange={(e) => setSsid(e.target.value)} />
            <Select label="Security" value={enc} onChange={(e) => setEnc(e.target.value)} options={[{ value: "WPA", label: "WPA / WPA2 / WPA3" }, { value: "WEP", label: "WEP (legacy)" }, { value: "nopass", label: "Open network (no password)" }]} />
            {enc !== "nopass" ? <div className="relative"><Input label="Password" type={show ? "text" : "password"} value={pass} onChange={(e) => setPass(e.target.value)} autoComplete="off" /><button type="button" onClick={() => setShow((x) => !x)} aria-label={show ? "Hide password" : "Show password"} className="absolute right-2 top-[30px] inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:text-ink cursor-pointer">{show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div> : null}
            <Toggle checked={hidden} onChange={setHidden} label="Hidden network" />
          </FieldGroup>
          <FieldGroup title="Style"><QrStyleFields s={s} /></FieldGroup>
        </CardBody>
      </Card>
      <div className="lg:col-span-6 min-w-0"><QrOutput text={data} style={s} filename={`wifi-${ssid}`} title="WiFi QR" caption={ssid ? `Scan to join “${ssid}”` : undefined} /></div>
    </div>
  );
}
