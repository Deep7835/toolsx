"use client";
import { useMemo, useState } from "react";
import { Sparkles, Copy, Check, RefreshCw } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { FieldGroup, Input, Row, Select, Textarea, Toggle } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { copyText } from "@/lib/export";
import { useToast } from "@/components/ui/Toast";
import { useBusiness } from "../shared/Business";

type Goal = "offer" | "launch" | "festival" | "testimonial" | "tip" | "behind";
type Platform = "instagram" | "facebook" | "linkedin" | "whatsapp" | "x";
const HOOKS: Record<Goal, string[]> = {
  offer: ["Limited time only 👀", "This week only —", "Your sign to treat yourself:", "Psst… big savings inside", "Don't miss this:"],
  launch: ["It's finally here.", "New arrival alert 🚨", "Say hello to", "Something new just landed at", "The wait is over —"],
  festival: ["Wishing you light, joy and prosperity ✨", "This festive season, celebrate with", "Festivities start here 🪔", "Make this festival special with"],
  testimonial: ["Don't take our word for it 💬", "This made our day ❤️", "Customer love:", "Straight from our happy customers:"],
  tip: ["Quick tip 💡", "Did you know?", "Here's something most people get wrong:", "Save this for later 📌"],
  behind: ["Behind the scenes 🎬", "A day at", "Here's how it's made:", "Meet the people behind"],
};
const CTAS: Record<string, string[]> = { instagram: ["DM us to order 📩", "Tap the link in bio", "Save & share with a friend", "Comment 'YES' and we'll message you"], facebook: ["Message us to order", "Visit us today", "Tag someone who needs this", "Call now to book"], linkedin: ["Let's connect — DM to know more.", "Learn more at the link below.", "Follow for more insights.", "Reach out if this resonates."], whatsapp: ["Reply to this message to order 🙌", "Forward to friends & family", "Tap to call us now", "Visit our store today"], x: ["Link below 👇", "RT if you agree", "Reply to know more", "Drop by today"] };
const BASE_TAGS: Record<Goal, string[]> = { offer: ["sale", "offer", "discount", "deal", "shopnow"], launch: ["newlaunch", "newarrival", "justin", "launch"], festival: ["festival", "celebrate", "diwali", "festiveseason"], testimonial: ["customerlove", "review", "happycustomer", "testimonial"], tip: ["tips", "didyouknow", "protip", "howto"], behind: ["behindthescenes", "bts", "madewithlove", "smallbusiness"] };
const LOCAL = ["smallbusinessindia", "supportlocal", "madeinindia", "vocalforlocal", "msme", "shoplocal"];
const seeded = (seed: number) => { let s = seed; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; };

export default function SocialPost() {
  const { business } = useBusiness();
  const [goal, setGoal] = useState<Goal>("offer");
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [product, setProduct] = useState("handloom cotton sarees");
  const [detail, setDetail] = useState("flat 30% off, free delivery in Jaipur");
  const [audience, setAudience] = useState("women 25–45 who love ethnic wear");
  const [city, setCity] = useState("Jaipur");
  const [tone, setTone] = useState("friendly");
  const [emoji, setEmoji] = useState(true);
  const [seed, setSeed] = useState(1);
  const [copied, setCopied] = useState(false);
  const toast = useToast();

  const post = useMemo(() => {
    const rnd = seeded(seed * 7919 + goal.length + platform.length);
    const pick = <T,>(a: T[]) => a[Math.floor(rnd() * a.length)];
    const hook = pick(HOOKS[goal]);
    const name = business.name || "our store";
    const strip = (s: string) => (emoji ? s : s.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, "").trim());
    const bodies: Record<Goal, string[]> = {
      offer: [`${name} is giving ${audience ? audience.split(" ")[0] === "women" ? "you" : "you" : "you"} ${detail} on ${product}.`, `Get ${product} with ${detail} — only at ${name}${city ? ", " + city : ""}.`, `${product.charAt(0).toUpperCase() + product.slice(1)} you'll love, now with ${detail}.`],
      launch: [`Introducing ${product} at ${name}${city ? ", " + city : ""} — ${detail}.`, `${name} just added ${product} to the shelves. ${detail.charAt(0).toUpperCase() + detail.slice(1)}.`],
      festival: [`${name} wishes you and your family a joyful festival. Celebrate with ${product} — ${detail}.`, `Light up the season with ${product} from ${name}. ${detail.charAt(0).toUpperCase() + detail.slice(1)}.`],
      testimonial: [`"${detail}" — a happy customer on our ${product}. Thank you for trusting ${name}!`, `Our ${product} keeps winning hearts: "${detail}". Grateful for customers like you.`],
      tip: [`When buying ${product}, remember: ${detail}. Questions? The team at ${name} is happy to help.`, `${detail.charAt(0).toUpperCase() + detail.slice(1)} — a small thing that makes a big difference with ${product}.`],
      behind: [`Every ${product} at ${name} starts with ${detail}. Here's a peek at how we do it.`, `${detail.charAt(0).toUpperCase() + detail.slice(1)} — that's the ${name} way of making ${product}.`],
    };
    const body = pick(bodies[goal]);
    const cta = pick(CTAS[platform]);
    const toneWrap = (s: string) => (tone === "formal" ? s.replace(/!/g, ".") : tone === "playful" ? s + (emoji ? " 🎉" : "") : s);
    const tagPool = [...BASE_TAGS[goal], ...product.toLowerCase().split(/[\s,]+/).filter((w) => w.length > 3).slice(0, 3), ...(city ? [city.toLowerCase().replace(/\s/g, ""), city.toLowerCase().replace(/\s/g, "") + "shopping"] : []), ...LOCAL];
    const tags = Array.from(new Set(tagPool)).slice(0, platform === "linkedin" ? 5 : platform === "x" ? 3 : 12).map((t) => `#${t.replace(/[^a-z0-9]/g, "")}`).join(" ");
    const lines = [strip(hook), "", strip(toneWrap(body)), "", strip(cta)];
    if (platform !== "whatsapp") lines.push("", tags);
    if (platform === "whatsapp" && business.phone) lines.push("", `📞 ${business.phone}`);
    let text = lines.join("\n");
    if (platform === "x") text = text.slice(0, 280);
    return text;
  }, [goal, platform, product, detail, audience, city, tone, emoji, seed, business]);

  const copy = async () => { await copyText(post); setCopied(true); toast("Post copied"); setTimeout(() => setCopied(false), 1500); };
  const limit = { instagram: 2200, facebook: 63206, linkedin: 3000, whatsapp: 65536, x: 280 }[platform];

  return (
    <div className="grid gap-5 lg:grid-cols-12 items-start">
      <Card className="lg:col-span-6 min-w-0">
        <CardHeader title="Brief" description="Runs entirely in your browser — no API, no data sent." icon={<Sparkles className="h-4 w-4" strokeWidth={2} />} />
        <CardBody className="grid gap-6">
          <FieldGroup title="What are you posting?">
            <Row>
              <Select label="Goal" value={goal} onChange={(e) => setGoal(e.target.value as Goal)} options={[{ value: "offer", label: "Sale / offer" }, { value: "launch", label: "New product launch" }, { value: "festival", label: "Festival greeting" }, { value: "testimonial", label: "Customer testimonial" }, { value: "tip", label: "Tip / how-to" }, { value: "behind", label: "Behind the scenes" }]} />
              <Select label="Platform" value={platform} onChange={(e) => setPlatform(e.target.value as Platform)} options={[{ value: "instagram", label: "Instagram" }, { value: "facebook", label: "Facebook" }, { value: "linkedin", label: "LinkedIn" }, { value: "whatsapp", label: "WhatsApp status / broadcast" }, { value: "x", label: "X (Twitter)" }]} />
            </Row>
            <Input label="Product / service" value={product} onChange={(e) => setProduct(e.target.value)} />
            <Textarea label={goal === "testimonial" ? "Customer's words" : goal === "tip" ? "The tip" : "Key detail (offer, price, feature)"} rows={2} value={detail} onChange={(e) => setDetail(e.target.value)} />
            <Row><Input label="Audience" value={audience} onChange={(e) => setAudience(e.target.value)} /><Input label="City" value={city} onChange={(e) => setCity(e.target.value)} /></Row>
            <Select label="Tone" value={tone} onChange={(e) => setTone(e.target.value)} options={[{ value: "friendly", label: "Friendly" }, { value: "playful", label: "Playful" }, { value: "formal", label: "Professional" }]} />
            <Toggle checked={emoji} onChange={setEmoji} label="Use emojis" />
          </FieldGroup>
        </CardBody>
      </Card>
      <Card className="lg:col-span-6 min-w-0 lg:sticky lg:top-24">
        <CardHeader title="Generated post" description={`${post.length} / ${limit.toLocaleString()} characters`} action={<div className="flex gap-1.5"><Button size="sm" variant="ghost" onClick={() => setSeed((s) => s + 1)}><RefreshCw className="h-3.5 w-3.5" /> Regenerate</Button><Button size="sm" onClick={copy}>{copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} Copy</Button></div>} />
        <CardBody>
          <div className="rounded-2xl border border-border bg-surface-2/50 p-4">
            <div className="flex items-center gap-2"><span className="h-8 w-8 rounded-full bg-accent-soft text-accent-text flex items-center justify-center text-xs font-bold">{(business.name || "B").slice(0, 1)}</span><div><div className="text-sm font-semibold text-ink">{business.name}</div><div className="text-[11px] text-muted">{platform} · just now</div></div></div>
            <p className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed text-ink">{post}</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
