import Link from "next/link";
export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">404</p>
      <h1 className="mt-3 font-display text-5xl text-ink">Nothing here</h1>
      <p className="mt-4 text-muted">The page or tool you’re looking for doesn’t exist.</p>
      <Link href="/tools" className="mt-8 inline-flex h-11 items-center rounded-xl bg-ink px-5 text-sm font-medium text-bg dark:bg-accent dark:text-on-accent">Browse all tools</Link>
    </div>
  );
}
