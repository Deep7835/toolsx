"use client";
import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";

/* ---------- localStorage as an external store (hydration-safe) ---------- */
const listeners = new Map<string, Set<() => void>>();
const notify = (key: string) => listeners.get(key)?.forEach((cb) => cb());
const subscribe = (key: string) => (cb: () => void) => {
  if (!listeners.has(key)) listeners.set(key, new Set());
  listeners.get(key)!.add(cb);
  const onStorage = (e: StorageEvent) => { if (e.key === key) cb(); };
  window.addEventListener("storage", onStorage);
  return () => { listeners.get(key)?.delete(cb); window.removeEventListener("storage", onStorage); };
};
const read = (key: string) => { try { return localStorage.getItem(key); } catch { return null; } };
const parse = <T,>(raw: string | null, fallback: T): T => { if (raw == null) return fallback; try { return JSON.parse(raw) as T; } catch { return fallback; } };

export function useLocalStorage<T>(key: string, initial: T) {
  const sub = useMemo(() => subscribe(key), [key]);
  const raw = useSyncExternalStore(sub, () => read(key), () => null);
  const value = useMemo<T>(() => parse(raw, initial), [raw, initial]);
  const setValue = useCallback((v: T | ((prev: T) => T)) => {
    // read the latest committed value from storage so functional updates never go stale
    const prev = parse(read(key), initial);
    const next = typeof v === "function" ? (v as (p: T) => T)(prev) : v;
    try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
    notify(key);
  }, [key, initial]);
  return [value, setValue] as const;
}

const EMPTY: string[] = [];
export function useFavorites() {
  const [favs, setFavs] = useLocalStorage<string[]>("ibt:favorites", EMPTY);
  const toggle = useCallback((slug: string) => setFavs((f) => (f.includes(slug) ? f.filter((x) => x !== slug) : [...f, slug])), [setFavs]);
  const has = useCallback((slug: string) => favs.includes(slug), [favs]);
  return { favs, toggle, has };
}

export function useRecent() {
  const [recent, setRecent] = useLocalStorage<string[]>("ibt:recent", EMPTY);
  const push = useCallback((slug: string) => setRecent((r) => [slug, ...r.filter((x) => x !== slug)].slice(0, 8)), [setRecent]);
  return { recent, push };
}

export function useDebounced<T>(value: T, ms = 250) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return v;
}

/* ---------- theme ---------- */
const themeSub = (cb: () => void) => {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => mo.disconnect();
};
export function useIsDark() {
  return useSyncExternalStore(themeSub, () => document.documentElement.classList.contains("dark"), () => false);
}

/** Async-computed value with a stable fallback (no sync setState in effects). */
export function useAsyncValue<T>(compute: () => Promise<T> | T, deps: unknown[], fallback: T) {
  const [state, setState] = useState<{ key: string; value: T }>({ key: "", value: fallback });
  const key = JSON.stringify(deps);
  useEffect(() => {
    let alive = true;
    Promise.resolve().then(compute).then((v) => { if (alive) setState({ key, value: v }); }).catch(() => { if (alive) setState({ key, value: fallback }); });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return state.key === key ? state.value : fallback;
}
