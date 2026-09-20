"use client";
import { useState } from "react";
import { CalculatorShell } from "@/components/shell/CalculatorShell";
import { NumberInput, Segmented } from "@/components/ui/Field";
import { HeroStat, KV } from "@/components/ui/Stat";
import { num, pct, safeDivide } from "@/lib/math";

type Mode = "of" | "is" | "change" | "ratio";

export default function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>("of");
  const [a, setA] = useState(15);
  const [b, setB] = useState(2400);
  const [c, setC] = useState(1800);
  const [d, setD] = useState(2250);
  const [r1, setR1] = useState(3);
  const [r2, setR2] = useState(8);

  const inputs = (
    <>
      <Segmented value={mode} onChange={setMode} options={[{ value: "of", label: "X% of Y" }, { value: "is", label: "X is ?% of Y" }, { value: "change", label: "% change" }, { value: "ratio", label: "Ratio → %" }]} size="sm" />
      {mode === "of" ? <><NumberInput label="Percentage" suffix="%" value={a} onChange={setA} /><NumberInput label="Of value" value={b} onChange={setB} /></> : null}
      {mode === "is" ? <><NumberInput label="Part" value={c} onChange={setC} /><NumberInput label="Whole" value={b} onChange={setB} /></> : null}
      {mode === "change" ? <><NumberInput label="From (old value)" value={c} onChange={setC} /><NumberInput label="To (new value)" value={d} onChange={setD} /></> : null}
      {mode === "ratio" ? <><NumberInput label="Ratio part A" value={r1} onChange={setR1} /><NumberInput label="Ratio part B" value={r2} onChange={setR2} /></> : null}
    </>
  );

  let primary = { label: "", value: "", sub: "" };
  let rows: Array<[string, string]> = [];
  if (mode === "of") { const v = (a / 100) * b; primary = { label: `${num(a)}% of ${num(b)}`, value: num(v, 4), sub: `${num(b)} + ${num(a)}% = ${num(b + v, 2)} · ${num(b)} − ${num(a)}% = ${num(b - v, 2)}` }; rows = [["Add", num(b + v, 2)], ["Subtract", num(b - v, 2)], ["Double", num(2 * v, 2)]]; }
  if (mode === "is") { const p = safeDivide(c, b) * 100; primary = { label: `${num(c)} is what % of ${num(b)}`, value: pct(p, 2), sub: `Remaining ${pct(100 - p, 2)}` }; rows = [["Fraction", `${num(c)} / ${num(b)}`], ["Decimal", num(safeDivide(c, b), 4)]]; }
  if (mode === "change") { const ch = safeDivide(d - c, Math.abs(c)) * 100; primary = { label: `Change from ${num(c)} to ${num(d)}`, value: `${ch >= 0 ? "+" : ""}${pct(ch, 2)}`, sub: `${ch >= 0 ? "Increase" : "Decrease"} of ${num(Math.abs(d - c), 2)}` }; rows = [["Absolute change", num(d - c, 2)], ["Multiplier", `${num(safeDivide(d, c), 3)}×`], ["Reverse (new → old)", pct(safeDivide(c - d, Math.abs(d)) * 100, 2)]]; }
  if (mode === "ratio") { const t = r1 + r2; primary = { label: `Ratio ${num(r1)} : ${num(r2)}`, value: `${pct(safeDivide(r1, t) * 100, 2)} : ${pct(safeDivide(r2, t) * 100, 2)}`, sub: `Total parts ${num(t)}` }; rows = [["A share", pct(safeDivide(r1, t) * 100, 2)], ["B share", pct(safeDivide(r2, t) * 100, 2)], ["A per B", num(safeDivide(r1, r2), 3)]]; }

  return <CalculatorShell inputs={inputs} results={<><HeroStat label={primary.label} value={primary.value} sub={primary.sub} /><KV rows={rows} /></>} inputTitle="Percentage inputs" />;
}
