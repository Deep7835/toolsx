"use client";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { FieldGroup, Input, Select, Checkbox, NumberInput } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { CodeBlock } from "@/components/shell/TextOutput";
import { uid } from "@/lib/format";

interface Rule { id: string; agent: string; disallow: string; allow: string }
const BOTS = ["*", "Googlebot", "Googlebot-Image", "Bingbot", "Slurp", "DuckDuckBot", "Baiduspider", "YandexBot", "facebookexternalhit", "GPTBot", "ChatGPT-User", "ClaudeBot", "anthropic-ai", "CCBot", "PerplexityBot", "Google-Extended", "AhrefsBot", "SemrushBot"];
const PRESETS: Record<string, string[]> = { store: ["/cart", "/checkout", "/account", "/search", "/*?sort=", "/*?filter=", "/admin"], wordpress: ["/wp-admin/", "/wp-includes/", "/?s=", "/feed/", "/trackback/"], blog: ["/admin", "/drafts", "/tag/*/page/"], none: [] };

export default function RobotsTxt() {
  const [site, setSite] = useState("https://www.example.in");
  const [preset, setPreset] = useState("store");
  const [rules, setRules] = useState<Rule[]>([{ id: uid(), agent: "*", disallow: PRESETS.store.join("\n"), allow: "/wp-admin/admin-ajax.php" }]);
  const [blockAi, setBlockAi] = useState(false);
  const [blockSeo, setBlockSeo] = useState(false);
  const [delay, setDelay] = useState(0);
  const [sitemaps, setSitemaps] = useState("/sitemap.xml");
  const upd = (id: string, p: Partial<Rule>) => setRules(rules.map((r) => (r.id === id ? { ...r, ...p } : r)));
  const base = site.replace(/\/$/, "");
  const block = (agents: string[]) => agents.map((a) => `User-agent: ${a}\nDisallow: /`).join("\n\n");
  const out = [
    `# robots.txt for ${base}\n# Generated with India Biz Tools`,
    ...rules.map((r) => [`User-agent: ${r.agent || "*"}`, ...r.disallow.split("\n").filter(Boolean).map((p) => `Disallow: ${p.trim()}`), ...r.allow.split("\n").filter(Boolean).map((p) => `Allow: ${p.trim()}`), delay ? `Crawl-delay: ${delay}` : ""].filter(Boolean).join("\n")),
    blockAi ? `# Block AI training crawlers\n${block(["GPTBot", "ChatGPT-User", "ClaudeBot", "anthropic-ai", "CCBot", "Google-Extended", "PerplexityBot", "Bytespider"])}` : "",
    blockSeo ? `# Block aggressive SEO crawlers\n${block(["AhrefsBot", "SemrushBot", "MJ12bot", "DotBot"])}` : "",
    ...sitemaps.split("\n").filter(Boolean).map((s) => `Sitemap: ${s.startsWith("http") ? s : base + (s.startsWith("/") ? "" : "/") + s}`),
  ].filter(Boolean).join("\n\n") + "\n";

  return (
    <div className="grid gap-5 lg:grid-cols-12 items-start">
      <Card className="lg:col-span-6 min-w-0">
        <CardHeader title="Crawl rules" description="Upload the file to your site root: example.in/robots.txt" />
        <CardBody className="grid gap-6">
          <FieldGroup title="Site">
            <Input label="Site URL" value={site} onChange={(e) => setSite(e.target.value)} />
            <Select label="Start from preset" value={preset} onChange={(e) => { setPreset(e.target.value); setRules([{ id: uid(), agent: "*", disallow: PRESETS[e.target.value].join("\n"), allow: e.target.value === "wordpress" ? "/wp-admin/admin-ajax.php" : "" }]); }} options={[{ value: "store", label: "E-commerce store" }, { value: "wordpress", label: "WordPress site" }, { value: "blog", label: "Blog / brochure site" }, { value: "none", label: "Allow everything" }]} />
          </FieldGroup>
          <FieldGroup title="Rules" aside={<Button size="sm" variant="secondary" onClick={() => setRules([...rules, { id: uid(), agent: "Googlebot", disallow: "", allow: "" }])}><Plus className="h-3.5 w-3.5" /> Add group</Button>}>
            {rules.map((r) => (
              <div key={r.id} className="rounded-xl border border-border bg-surface-2/50 p-3 grid gap-2">
                <div className="flex gap-2"><Select aria-label="User agent" value={BOTS.includes(r.agent) ? r.agent : "custom"} onChange={(e) => upd(r.id, { agent: e.target.value === "custom" ? "" : e.target.value })} options={[...BOTS.map((b) => ({ value: b, label: b === "*" ? "* (all crawlers)" : b })), { value: "custom", label: "Custom…" }]} wrapClassName="flex-1" />{!BOTS.includes(r.agent) ? <Input aria-label="Custom agent" placeholder="Bot name" value={r.agent} onChange={(e) => upd(r.id, { agent: e.target.value })} wrapClassName="flex-1" /> : null}<button type="button" aria-label="Remove" onClick={() => setRules(rules.filter((x) => x.id !== r.id))} className="inline-flex h-11 w-10 items-center justify-center rounded-lg text-muted hover:bg-danger-soft hover:text-danger cursor-pointer"><Trash2 className="h-4 w-4" /></button></div>
                <div className="grid grid-cols-2 gap-2"><textarea aria-label="Disallow paths" rows={4} value={r.disallow} onChange={(e) => upd(r.id, { disallow: e.target.value })} placeholder={"Disallow (one per line)\n/cart\n/admin"} className="rounded-xl border border-border bg-surface px-3 py-2 font-mono text-xs text-ink focus:border-accent focus:outline-none" /><textarea aria-label="Allow paths" rows={4} value={r.allow} onChange={(e) => upd(r.id, { allow: e.target.value })} placeholder={"Allow (one per line)\n/public"} className="rounded-xl border border-border bg-surface px-3 py-2 font-mono text-xs text-ink focus:border-accent focus:outline-none" /></div>
              </div>
            ))}
          </FieldGroup>
          <FieldGroup title="Options">
            <div className="grid gap-2"><Checkbox checked={blockAi} onChange={setBlockAi} label="Block AI training crawlers (GPTBot, ClaudeBot, CCBot…)" /><Checkbox checked={blockSeo} onChange={setBlockSeo} label="Block SEO scrapers (Ahrefs, Semrush, MJ12)" /></div>
            <NumberInput label="Crawl-delay" hint="Bing/Yandex only" suffix="sec" value={delay} onChange={setDelay} />
            <Input label="Sitemap URL(s)" value={sitemaps} onChange={(e) => setSitemaps(e.target.value)} help="One per line; relative paths are resolved against the site URL." />
          </FieldGroup>
        </CardBody>
      </Card>
      <div className="lg:col-span-6 min-w-0 lg:sticky lg:top-24"><CodeBlock value={out} label="robots.txt" filename="robots.txt" /><p className="mt-3 text-xs text-muted">robots.txt is a request, not access control — never rely on it to hide private pages. Use noindex meta tags or authentication instead.</p></div>
    </div>
  );
}
