import Link from "next/link";
import { cn } from "@/lib/cn";
import { BRAND } from "@/lib/brand";

export function Mark({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-flex h-8 w-8 items-center justify-center rounded-[9px] bg-ink text-bg dark:bg-accent dark:text-on-accent", className)} aria-hidden>
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 4h7l4 4v12H7z" />
        <path d="M14 4v4h4M10 13h5M10 17h5" />
      </svg>
    </span>
  );
}

export function Logo({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2.5 group", className)} aria-label={`${BRAND.name} home`}>
      <Mark className="transition-transform duration-200 group-hover:scale-105" />
      {!compact ? <span className="text-[19px] font-bold tracking-[-0.03em] text-ink whitespace-nowrap">{BRAND.wordmark}</span> : null}
    </Link>
  );
}
