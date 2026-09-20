"use client";
import { useMemo, useState } from "react";
import { Eye, EyeOff, ShieldCheck, ShieldAlert } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Field";
import { HeroStat, KV, Stat } from "@/components/ui/Stat";
import { strength, humanTime } from "./pwStrength";

export default function PasswordStrength() {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const s = useMemo(() => strength(pw), [pw]);
  return (
    <div className="grid gap-5 lg:grid-cols-12 items-start">
      <Card className="lg:col-span-5 min-w-0">
        <CardHeader title="Test a password" description="Analysed locally. Nothing is transmitted — but never paste a password you actually use into any website you don't fully trust." icon={<ShieldCheck className="h-4 w-4" strokeWidth={2} />} />
        <CardBody className="grid gap-4">
          <div className="relative"><Input label="Password" type={show ? "text" : "password"} value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="new-password" className="font-mono pr-12" placeholder="Type or paste…" /><button type="button" onClick={() => setShow((x) => !x)} aria-label={show ? "Hide" : "Show"} className="absolute right-2 top-[30px] inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:text-ink cursor-pointer">{show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-surface-3"><div className="h-full rounded-full transition-[width,background-color] duration-300" style={{ width: pw ? `${Math.max(6, (s.score + 1) * 20)}%` : 0, background: s.color }} /></div>
          <div className="flex items-center justify-between text-sm"><span className="font-semibold" style={{ color: pw ? s.color : undefined }}>{pw ? s.label : "—"}</span><span className="text-xs text-muted tabular">{s.len} chars · {s.entropy} bits</span></div>
          {s.issues.length ? <ul className="grid gap-1.5 rounded-xl border border-border bg-danger-soft/40 p-3 text-xs text-ink-2">{s.issues.map((i) => <li key={i} className="flex items-center gap-2"><ShieldAlert className="h-3.5 w-3.5 text-danger" /> {i}</li>)}</ul> : pw ? <p className="text-xs text-accent-text">No obvious weaknesses found.</p> : null}
        </CardBody>
      </Card>
      <Card className="lg:col-span-7 min-w-0">
        <CardHeader title="Crack-time estimates" />
        <CardBody className="grid gap-4">
          <HeroStat label="Offline attack (10 billion guesses/sec)" value={pw ? humanTime(s.secs) : "—"} sub="Leaked hash cracked on a GPU rig" />
          <div className="grid grid-cols-2 gap-3"><Stat label="Online throttled (100/sec)" value={pw ? humanTime(s.online) : "—"} /><Stat label="Character pool" value={String(s.pool)} sub="distinct symbols possible" /></div>
          <KV rows={[["Entropy", `${s.entropy} bits`], ["Possible combinations", pw ? `2^${s.entropy} ≈ ${s.guesses.toExponential(2)}` : "—"], ["Score", pw ? `${s.score} / 4 — ${s.label}` : "—"]]} />
          <p className="text-xs leading-relaxed text-muted">Aim for 14+ characters or a 4-word passphrase (≥ 60 bits). Use a unique password per site and enable two-factor authentication on email, banking and GST portals.</p>
        </CardBody>
      </Card>
    </div>
  );
}
