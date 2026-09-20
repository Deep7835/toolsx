"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Cycles through words with a soft slide/blur transition.
 * - Container width animates to the measured width of the active word (no layout jump).
 * - Only the active (and briefly the outgoing) word is in the DOM, so the h1 reads cleanly.
 * - Respects prefers-reduced-motion (instant swap).
 */
export function RotatingWord({ words, interval = 2600, className }: { words: string[]; interval?: number; className?: string }) {
  const [state, setState] = useState<{ cur: number; prev: number | null }>({ cur: 0, prev: null });
  const [widths, setWidths] = useState<number[] | null>(null);
  const ref = useRef<HTMLSpanElement>(null);
  const key = words.join("|");

  // Measure every word once fonts are ready (and on resize) using an offscreen probe that copies our font.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    const measure = () => {
      if (cancelled || !ref.current) return;
      const cs = getComputedStyle(ref.current);
      const probe = document.createElement("span");
      probe.style.cssText = "position:absolute;left:-9999px;top:0;visibility:hidden;white-space:nowrap;";
      for (const prop of ["fontFamily", "fontSize", "fontWeight", "fontStyle", "fontStretch", "letterSpacing", "fontFeatureSettings", "fontVariationSettings", "textTransform"] as const) probe.style[prop] = cs[prop];
      document.body.appendChild(probe);
      const w = key.split("|").map((x) => { probe.textContent = x; return Math.ceil(probe.getBoundingClientRect().width); });
      probe.remove();
      setWidths(w);
    };
    // Fonts can swap in after fonts.ready resolves; re-measure on every relevant signal.
    const fonts = typeof document !== "undefined" ? document.fonts : undefined;
    const t1 = setTimeout(measure, 0);
    const t2 = setTimeout(measure, 800);
    fonts?.ready.then(measure);
    fonts?.addEventListener("loadingdone", measure);
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    if (el.parentElement) ro.observe(el.parentElement);
    return () => { cancelled = true; clearTimeout(t1); clearTimeout(t2); fonts?.removeEventListener("loadingdone", measure); window.removeEventListener("resize", measure); ro.disconnect(); };
  }, [key]);

  // Rotate
  useEffect(() => {
    const n = key.split("|").length;
    const t = setInterval(() => setState((s) => ({ cur: (s.cur + 1) % n, prev: s.cur })), interval);
    return () => clearInterval(t);
  }, [key, interval]);

  // Drop the outgoing word after its exit animation
  useEffect(() => {
    if (state.prev === null) return;
    const t = setTimeout(() => setState((s) => ({ ...s, prev: null })), 650);
    return () => clearTimeout(t);
  }, [state.prev, state.cur]);

  const { cur, prev } = state;
  return (
    <span
      ref={ref}
      className={cn("relative inline-block whitespace-nowrap align-baseline", className)}
      style={{ width: widths ? widths[cur] : undefined, transition: "width 520ms cubic-bezier(0.16, 1, 0.3, 1)" }}
      aria-live="off"
    >
      <span key={`c${cur}`} className={cn("inline-block", prev !== null ? "animate-word-in" : "")}>{words[cur]}</span>
      {prev !== null && prev !== cur ? (
        <span key={`p${prev}`} aria-hidden className="pointer-events-none absolute left-0 top-0 inline-block animate-word-out">{words[prev]}</span>
      ) : null}
    </span>
  );
}
