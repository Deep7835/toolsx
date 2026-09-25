"use client";
import { useMemo, useState } from "react";
import { BadgeCheck, Copy, ShieldAlert, ShieldCheck } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { KV } from "@/components/ui/Stat";
import { GST_STATES, PAN_HOLDER } from "@/data/gst-states";
import { copyText } from "@/lib/export";
import { useToast } from "@/components/ui/Toast";

const ALPHANUM = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const SHAPE = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

/** GSTIN check digit: weight alternates 1,2 over the first 14 characters, digits summed modulo 36. */
function checkDigit(first14: string) {
  let sum = 0;
  for (let i = 0; i < 14; i++) {
    const v = ALPHANUM.indexOf(first14[i]);
    const p = v * (i % 2 === 0 ? 1 : 2);
    sum += Math.floor(p / 36) + (p % 36);
  }
  return ALPHANUM[(36 - (sum % 36)) % 36];
}

type Result =
  | { ok: true; state: string; stateCode: string; pan: string; holder: string; entity: string; check: string }
  | { ok: false; reason: string; hint?: string; expected?: string };

function analyse(raw: string): Result | null {
  const v = raw.replace(/\s|-/g, "").toUpperCase();
  if (!v) return null;
  if (v.length !== 15) return { ok: false, reason: `A GSTIN has 15 characters — this has ${v.length}.`, hint: "Format: 2-digit state code + 10-character PAN + entity number + Z + check digit." };
  if (!SHAPE.test(v)) {
    const why = !/^[0-9]{2}/.test(v) ? "The first two characters must be the numeric state code."
      : !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]/.test(v) ? "Characters 3–12 must be a valid PAN (5 letters, 4 digits, 1 letter)."
      : v[13] !== "Z" ? "The 14th character must be the letter Z."
      : "Character 13 must be the entity number (1–9 or A–Z).";
    return { ok: false, reason: "The pattern does not match a GSTIN.", hint: why };
  }
  const stateCode = v.slice(0, 2);
  const state = GST_STATES[stateCode];
  if (!state) return { ok: false, reason: `“${stateCode}” is not a valid GST state code.`, hint: "Valid codes run 01–38, plus 96, 97 and 99." };
  const expected = checkDigit(v.slice(0, 14));
  if (expected !== v[14]) return { ok: false, reason: "The check digit does not match.", hint: "One character is mistyped — the last character is computed from the other fourteen.", expected: `${v.slice(0, 14)}${expected}` };
  return { ok: true, state, stateCode, pan: v.slice(2, 12), holder: PAN_HOLDER[v[5]] ?? "Unknown PAN holder type", entity: v[12], check: v[14] };
}

/** Placeholder numbers with correct check digits — they follow the format but are not live registrations. */
const SAMPLES = ["27AAPFU0939F1ZV", "07AAACP1234A1Z7", "29AAAFB5678C2ZG", "33AABCT9012D1ZT"];

export default function GstinValidator() {
  const [raw, setRaw] = useState("");
  const toast = useToast();
  const value = raw.replace(/\s|-/g, "").toUpperCase();
  const result = useMemo(() => analyse(raw), [raw]);

  const copy = async (t: string) => { await copyText(t); toast(`${t} copied`); };

  return (
    <div className="grid gap-5">
      <Card>
        <CardBody className="grid gap-4">
          <div>
            <label htmlFor="gstin" className="text-[13px] font-medium text-ink">GST number (GSTIN)</label>
            <input
              id="gstin" value={raw} onChange={(e) => setRaw(e.target.value.slice(0, 20))} autoFocus spellCheck={false} autoComplete="off"
              placeholder="27AAPFU0939F1ZV"
              className="mt-2 h-14 w-full rounded-2xl border border-border bg-surface px-4 font-mono text-lg uppercase tracking-[0.12em] text-ink shadow-sm placeholder:normal-case placeholder:tracking-normal placeholder:font-sans placeholder:text-muted hover:border-border-strong focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10 transition"
            />
            <p className="mt-2 text-xs text-muted">Checked entirely in your browser — the number is not sent anywhere. This verifies the format and check digit, not whether the registration is currently active.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted">Try a sample:</span>
            {SAMPLES.map((s) => <button key={s} type="button" onClick={() => setRaw(s)} className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-ink-2 hover:border-border-strong hover:text-ink cursor-pointer">{s}</button>)}
          </div>
        </CardBody>
      </Card>

      {result ? (
        <Card>
          <CardBody className="grid gap-4">
            <div className={`flex items-start gap-3 rounded-2xl p-4 ${result.ok ? "bg-accent-soft" : "bg-danger-soft"}`}>
              {result.ok ? <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent-text" /> : <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-danger" />}
              <div className="min-w-0">
                <p className={`text-sm font-semibold ${result.ok ? "text-accent-text" : "text-danger"}`}>{result.ok ? "Valid GSTIN format and check digit" : result.reason}</p>
                {result.ok
                  ? <p className="mt-1 text-[13px] leading-relaxed text-ink-2">Registered in <strong className="font-semibold text-ink">{result.state}</strong> · PAN <strong className="font-mono font-semibold text-ink">{result.pan}</strong> · {result.holder}</p>
                  : <p className="mt-1 text-[13px] leading-relaxed text-ink-2">{result.hint}{result.expected ? <> Did you mean <button type="button" onClick={() => setRaw(result.expected!)} className="font-mono font-semibold text-ink underline cursor-pointer">{result.expected}</button>?</> : null}</p>}
              </div>
            </div>

            {result.ok ? (
              <>
                <KV rows={[
                  ["State code", `${result.stateCode} — ${result.state}`],
                  ["PAN of the holder", result.pan],
                  ["Type of taxpayer", result.holder],
                  ["Entity number in the state", `${result.entity} — registration #${ALPHANUM.indexOf(result.entity)} for this PAN in ${result.state}`],
                  ["14th character", "Z (fixed for every GSTIN)"],
                  ["Check digit", `${result.check} — matches`],
                ]} />
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => copy(value)} className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-surface px-4 text-[13px] font-medium text-ink hover:border-border-strong cursor-pointer"><Copy className="h-4 w-4" /> Copy GSTIN</button>
                  <button type="button" onClick={() => copy(result.pan)} className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-surface px-4 text-[13px] font-medium text-ink hover:border-border-strong cursor-pointer"><Copy className="h-4 w-4" /> Copy PAN</button>
                  <a href={`https://services.gst.gov.in/services/searchtp?tp=${value}`} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 rounded-xl bg-accent px-4 text-[13px] font-medium text-on-accent hover:bg-accent-hover"><BadgeCheck className="h-4 w-4" /> Check status on the GST portal</a>
                </div>
              </>
            ) : null}
          </CardBody>
        </Card>
      ) : null}

      <Card>
        <CardHeader title="How the 15 characters break down" description="Example: 27AAPFU0939F1ZV" />
        <CardBody className="p-0">
          <KV rows={[
            ["1–2", "State code — 27 is Maharashtra, 07 Delhi, 29 Karnataka, 33 Tamil Nadu"],
            ["3–12", "PAN of the business (the 4th character shows whether it is a firm, company, individual…)"],
            ["13", "Entity number — 1 for the first registration of that PAN in the state, 2 for the second, then A–Z"],
            ["14", "Always the letter Z"],
            ["15", "Check digit, computed from the first fourteen characters"],
          ]} />
        </CardBody>
      </Card>
    </div>
  );
}
