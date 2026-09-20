import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2.5 group", className)} aria-label="India Biz Tools home">
      <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-bg dark:bg-accent dark:text-on-accent transition-transform duration-200 group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M6 5h12M6 9h12M9 9c4 0 6 2 6 4.5S13 18 9 18l6 3" />
        </svg>
      </span>
      {!compact ? (
        <span className="leading-none whitespace-nowrap">
          <span className="block font-display text-[19px] tracking-tight text-ink">India Biz Tools</span>
          <span className="hidden sm:block text-[10px] uppercase tracking-[0.18em] text-muted mt-0.5">Free MSME utilities</span>
        </span>
      ) : null}
    </Link>
  );
}
