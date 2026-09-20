"use client";
import { useCallback, useState } from "react";
import { RefreshCw, Copy, Check, KeyRound } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Checkbox, Range, Segmented, NumberInput } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { copyText } from "@/lib/export";
import { useToast } from "@/components/ui/Toast";
import { strength } from "./pwStrength";

const WORDS = "apple river mango tiger delhi lotus cloud spice cobra brass jaipur mirror silk pearl amber tamarind monsoon saffron copper kite peacock coral ember velvet ganges marble mango cedar lantern harbor meadow summit bamboo nectar orbit pixel quartz rhythm sable tulip umbra vivid willow zenith".split(" ");
const rand = (n: number) => { const a = new Uint32Array(n); crypto.getRandomValues(a); return a; };

export default function PasswordGenerator() {
  const [mode, setMode] = useState<"random" | "passphrase" | "pin">("random");
  const [len, setLen] = useState(16);
  const [opts, setOpts] = useState({ upper: true, lower: true, digits: true, symbols: true, noAmbig: true });
  const [words, setWords] = useState(4);
  const [sep, setSep] = useState("-");
  const [pinLen, setPinLen] = useState(6);
  const [count, setCount] = useState(5);
  const [list, setList] = useState<string[]>([]);
  const [copied, setCopied] = useState("");
  const toast = useToast();

  const gen = useCallback(() => {
    const out: string[] = [];
    for (let i = 0; i < count; i++) {
      if (mode === "pin") { const r = rand(pinLen); out.push(Array.from(r, (x) => x % 10).join("")); continue; }
      if (mode === "passphrase") { const r = rand(words); const w = Array.from(r, (x) => WORDS[x % WORDS.length]); const cap = rand(1)[0] % words; w[cap] = w[cap][0].toUpperCase() + w[cap].slice(1); out.push(w.join(sep) + String(rand(1)[0] % 100).padStart(2, "0")); continue; }
      let pool = ""; const sets: string[] = [];
      if (opts.upper) sets.push(opts.noAmbig ? "ABCDEFGHJKLMNPQRSTUVWXYZ" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
      if (opts.lower) sets.push(opts.noAmbig ? "abcdefghijkmnpqrstuvwxyz" : "abcdefghijklmnopqrstuvwxyz");
      if (opts.digits) sets.push(opts.noAmbig ? "23456789" : "0123456789");
      if (opts.symbols) sets.push("!@#$%^&*()-_=+[]{};:,.?/~");
      if (!sets.length) sets.push("abcdefghijklmnopqrstuvwxyz");
      pool = sets.join("");
      const r = rand(len); const chars = Array.from(r, (x) => pool[x % pool.length]);
      // guarantee one from each set
      sets.forEach((s, j) => { chars[(rand(1)[0] % len + j) % len] = s[rand(1)[0] % s.length]; });
      out.push(chars.join(""));
    }
    setList(out);
  }, [mode, len, opts, words, sep, pinLen, count]);

  if (list.length === 0) gen();
  const copy = async (p: string) => { await copyText(p); setCopied(p); toast("Copied — paste it into your password manager"); setTimeout(() => setCopied(""), 1500); };

  return (
    <div className="grid gap-5 lg:grid-cols-12 items-start">
      <Card className="lg:col-span-5 min-w-0">
        <CardHeader title="Options" icon={<KeyRound className="h-4 w-4" strokeWidth={2} />} description="Generated with crypto.getRandomValues — never stored or sent." />
        <CardBody className="grid gap-5">
          <Segmented value={mode} onChange={setMode} options={[{ value: "random", label: "Random" }, { value: "passphrase", label: "Passphrase" }, { value: "pin", label: "PIN" }]} size="sm" />
          {mode === "random" ? <><Range label="Length" value={len} onChange={setLen} min={8} max={64} step={1} format={(v) => `${v} chars`} /><div className="grid gap-2"><Checkbox checked={opts.upper} onChange={(v) => setOpts({ ...opts, upper: v })} label="Uppercase A–Z" /><Checkbox checked={opts.lower} onChange={(v) => setOpts({ ...opts, lower: v })} label="Lowercase a–z" /><Checkbox checked={opts.digits} onChange={(v) => setOpts({ ...opts, digits: v })} label="Digits 0–9" /><Checkbox checked={opts.symbols} onChange={(v) => setOpts({ ...opts, symbols: v })} label="Symbols !@#$%" /><Checkbox checked={opts.noAmbig} onChange={(v) => setOpts({ ...opts, noAmbig: v })} label="Avoid look-alikes (0/O, 1/l/I)" /></div></> : null}
          {mode === "passphrase" ? <><Range label="Words" value={words} onChange={setWords} min={3} max={8} step={1} /><Segmented value={sep} onChange={setSep} options={[{ value: "-", label: "dash" }, { value: ".", label: "dot" }, { value: "_", label: "underscore" }, { value: "", label: "none" }]} size="sm" /></> : null}
          {mode === "pin" ? <Range label="Digits" value={pinLen} onChange={setPinLen} min={4} max={12} step={1} /> : null}
          <NumberInput label="How many" value={count} onChange={(v) => setCount(Math.min(20, Math.max(1, v)))} />
          <Button onClick={gen}><RefreshCw className="h-4 w-4" /> Generate</Button>
        </CardBody>
      </Card>
      <Card className="lg:col-span-7 min-w-0">
        <CardHeader title="Passwords" description="Click to copy." />
        <CardBody className="grid gap-2">
          {list.map((p, i) => { const s = strength(p); return (
            <button key={i} type="button" onClick={() => copy(p)} className="group flex items-center gap-3 rounded-xl border border-border bg-surface-2/50 px-3 py-2.5 text-left transition-colors hover:border-border-strong cursor-pointer">
              <code className="min-w-0 flex-1 break-all font-mono text-[14px] text-ink">{p}</code>
              <span className="hidden sm:flex w-24 flex-col gap-1 text-[10px] uppercase tracking-wider text-muted"><span>{s.label}</span><span className="h-1 w-full overflow-hidden rounded-full bg-surface-3"><span className="block h-full rounded-full" style={{ width: `${s.score * 25}%`, background: s.color }} /></span></span>
              {copied === p ? <Check className="h-4 w-4 shrink-0 text-accent-text" /> : <Copy className="h-4 w-4 shrink-0 text-faint group-hover:text-ink" />}
            </button>
          ); })}
        </CardBody>
      </Card>
    </div>
  );
}
