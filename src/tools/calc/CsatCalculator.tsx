"use client";
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { NumberInput, Segmented } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { HeroStat, KV, Stat } from "@/components/ui/Stat";
import { num, pct } from "@/lib/format";

type Scale = "3" | "5" | "7" | "10";
const SCALES: Record<Scale, { points: number[]; satisfiedFrom: number; label: string }> = {
  "3": { points: [1, 2, 3], satisfiedFrom: 3, label: "Top box (3)" },
  "5": { points: [1, 2, 3, 4, 5], satisfiedFrom: 4, label: "Top 2 boxes (4 & 5)" },
  "7": { points: [1, 2, 3, 4, 5, 6, 7], satisfiedFrom: 6, label: "Top 2 boxes (6 & 7)" },
  "10": { points: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], satisfiedFrom: 9, label: "Top 2 boxes (9 & 10)" },
};
const DEFAULTS: Record<Scale, number[]> = {
  "3": [8, 34, 128],
  "5": [2, 5, 12, 27, 39],
  "7": [1, 2, 4, 9, 18, 31, 25],
  "10": [1, 1, 2, 3, 5, 8, 14, 22, 30, 24],
};

const band = (c: number) => (c >= 85 ? "Excellent" : c >= 75 ? "Good" : c >= 60 ? "Average" : "Needs work");
const tone = (c: number): "accent" | "warn" | "danger" => (c >= 75 ? "accent" : c >= 60 ? "warn" : "danger");

export default function CsatCalculator() {
  const [scale, setScale] = useState<Scale>("5");
  const [counts, setCounts] = useState<number[]>(DEFAULTS["5"]);

  const changeScale = (s: Scale) => { setScale(s); setCounts(DEFAULTS[s]); };
  const setAt = (i: number, v: number) => setCounts(counts.map((c, j) => (j === i ? Math.max(0, v) : c)));

  const cfg = SCALES[scale];
  const total = counts.reduce((a, b) => a + b, 0);
  const satisfied = counts.reduce((a, c, i) => (cfg.points[i] >= cfg.satisfiedFrom ? a + c : a), 0);
  const dissatisfied = counts.reduce((a, c, i) => (cfg.points[i] <= (scale === "10" ? 6 : scale === "3" ? 1 : 2) ? a + c : a), 0);
  const csat = total ? (satisfied / total) * 100 : 0;
  const mean = total ? counts.reduce((a, c, i) => a + c * cfg.points[i], 0) / total : 0;
  const top = cfg.points[cfg.points.length - 1];
  // 95% confidence interval on a proportion — small samples move a lot.
  const moe = total ? 1.96 * Math.sqrt((csat / 100) * (1 - csat / 100) / total) * 100 : 0;

  return (
    <div className="grid gap-5">
      <div className="grid gap-3 sm:grid-cols-4">
        <HeroStat label="CSAT score" value={pct(csat, 1)} sub={`${num(satisfied)} satisfied of ${num(total)} responses`} className="sm:col-span-2" />
        <Stat label="Average rating" value={`${num(mean, 2)} / ${top}`} sub="the other CSAT method" />
        <Stat label="Verdict" value={band(csat)} tone={tone(csat)} sub={total < 30 ? "sample too small to trust" : `±${num(moe, 1)} points at 95%`} />
      </div>

      <Card>
        <CardHeader
          title="Survey responses"
          description="Enter how many people gave each rating. CSAT is the share who picked the top boxes; the average rating is shown alongside."
          action={<Button size="sm" variant="ghost" onClick={() => setCounts(DEFAULTS[scale])}><RotateCcw className="h-4 w-4" /> Reset</Button>}
        />
        <CardBody className="grid gap-4">
          <Segmented
            value={scale}
            onChange={(v) => changeScale(v as Scale)}
            options={[{ value: "3", label: "1–3" }, { value: "5", label: "1–5" }, { value: "7", label: "1–7" }, { value: "10", label: "0–10" }]}
          />
          <div className="grid gap-2 sm:grid-cols-5">
            {cfg.points.map((p, i) => {
              const share = total ? (counts[i] / total) * 100 : 0;
              const isSat = p >= cfg.satisfiedFrom;
              return (
                <div key={p} className={`rounded-xl border p-2.5 ${isSat ? "border-accent/40 bg-accent-soft/40" : "border-border bg-surface-2/40"}`}>
                  <NumberInput aria-label={`Responses rated ${p}`} label={<span className="text-xs">{p} {isSat ? "· satisfied" : ""}</span>} value={counts[i]} onChange={(v) => setAt(i, v)} />
                  <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-border"><div className="h-full rounded-full bg-accent" style={{ width: `${share}%` }} /></div>
                  <p className="mt-1 text-[11px] tabular text-muted">{num(share, 1)}%</p>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-muted">{cfg.label} count as satisfied on a {scale === "10" ? "0–10" : `1–${scale}`} scale.</p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="The numbers behind it" />
        <CardBody className="p-0">
          <KV rows={[
            ["CSAT (top-box method)", `${num(satisfied)} ÷ ${num(total)} × 100 = ${pct(csat, 1)}`],
            ["Average rating method", `${num(mean, 2)} out of ${top}${scale === "5" ? ` (${pct((mean / top) * 100, 1)} of the scale)` : ""}`],
            ["Dissatisfied responses", `${num(dissatisfied)} (${pct(total ? (dissatisfied / total) * 100 : 0, 1)})`],
            ["Neutral / passive", `${num(total - satisfied - dissatisfied)}`],
            ["Margin of error (95%)", total ? `±${num(moe, 1)} percentage points` : "—"],
            ["Responses needed for ±5 points", total ? num(Math.ceil((1.96 ** 2 * (csat / 100) * (1 - csat / 100)) / 0.05 ** 2)) : "—"],
          ]} />
        </CardBody>
      </Card>

      <p className="text-xs leading-relaxed text-muted">
        Two methods share the name CSAT. The <strong className="text-ink-2">top-box percentage</strong> — satisfied responses ÷ total × 100 — is the one quoted as &ldquo;our CSAT is 82%&rdquo;. The{" "}
        <strong className="text-ink-2">average rating</strong> is quoted as &ldquo;4.3 out of 5&rdquo;. Both are shown above so you can report whichever your team uses. Below about 30 responses neither is
        stable: the margin of error is wider than most month-to-month changes.
      </p>
    </div>
  );
}
