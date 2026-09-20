"use client";
import { useRef, useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Input, Textarea, Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { isEmail } from "@/lib/validate";
import { BRAND } from "@/lib/brand";

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT; // e.g. a Formspree / Web3Forms / your own POST endpoint

export function ContactForm() {
  const [v, setV] = useState({ name: "", email: "", topic: "Suggest a tool", message: "", website: "" }); // `website` is a honeypot
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const started = useRef<number>(0);
  const errors = {
    name: v.name.trim().length < 2 ? "Please enter your name" : undefined,
    email: !isEmail(v.email) ? "Enter a valid email so we can reply" : undefined,
    message: v.message.trim().length < 20 ? "Tell us a little more (at least 20 characters)" : undefined,
  };
  const invalid = Object.values(errors).some(Boolean);
  const touch = (k: string) => setTouched((t) => ({ ...t, [k]: true }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (invalid) { (document.querySelector("[aria-invalid=true]") as HTMLElement | null)?.focus(); return; }
    // Bot checks: honeypot filled, or form submitted in under 3 seconds
    if (v.website || (started.current && Date.now() - started.current < 3000)) { setStatus("sent"); return; }
    if (!ENDPOINT) {
      window.location.href = `mailto:${BRAND.email}?subject=${encodeURIComponent(`[${v.topic}] from ${v.name}`)}&body=${encodeURIComponent(`${v.message}\n\n— ${v.name} <${v.email}>`)}`;
      setStatus("sent");
      return;
    }
    setStatus("sending");
    try {
      const r = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ name: v.name, email: v.email, topic: v.topic, message: v.message, source: BRAND.domain }) });
      if (!r.ok) throw new Error(String(r.status));
      setStatus("sent");
    } catch { setStatus("error"); }
  };

  if (status === "sent") return <div role="status" className="flex items-start gap-3 rounded-2xl border border-border bg-accent-soft/50 p-5 text-sm text-ink"><CheckCircle2 className="mt-0.5 h-5 w-5 text-accent-text" /><div><p className="font-semibold">Thanks — message {ENDPOINT ? "sent" : "ready in your mail app"}.</p><p className="mt-1 text-muted">We read everything and typically reply within two working days.</p></div></div>;

  return (
    <form onSubmit={submit} noValidate onFocus={() => { if (!started.current) started.current = Date.now(); }} className="grid gap-4 rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Your name" required autoComplete="name" value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} onBlur={() => touch("name")} error={touched.name ? errors.name : undefined} aria-required />
        <Input label="Email" type="email" required autoComplete="email" inputMode="email" value={v.email} onChange={(e) => setV({ ...v, email: e.target.value })} onBlur={() => touch("email")} error={touched.email ? errors.email : undefined} aria-required />
      </div>
      <Select label="Topic" value={v.topic} onChange={(e) => setV({ ...v, topic: e.target.value })} options={["Suggest a tool", "Report a wrong rate or bug", "Partnership", "Press", "Something else"]} />
      <Textarea label="Message" required rows={5} value={v.message} onChange={(e) => setV({ ...v, message: e.target.value })} onBlur={() => touch("message")} error={touched.message ? errors.message : undefined} help={`${v.message.trim().length} characters`} aria-required />
      {/* Honeypot — hidden from humans, filled by bots */}
      <div className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" value={v.website} onChange={(e) => setV({ ...v, website: e.target.value })} /></div>
      {status === "error" ? <p role="alert" className="text-sm text-danger">Couldn’t send just now. Please try again, or email {BRAND.email}.</p> : null}
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-muted">We reply to your email only. No newsletters.</p>
        <Button type="submit" loading={status === "sending"}><Send className="h-4 w-4" /> Send message</Button>
      </div>
    </form>
  );
}
