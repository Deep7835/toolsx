import Link from "next/link";
import { cn } from "@/lib/cn";
import { BRAND } from "@/lib/brand";

export function Mark({ className }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/logo.png" alt="" width={32} height={32} className={cn("h-8 w-8 shrink-0", className)} aria-hidden />;
}

export function Logo({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2.5 group", className)} aria-label={`${BRAND.name} home`}>
      <Mark className="transition-transform duration-200 group-hover:scale-105" />
      {!compact ? <span className="text-[19px] font-bold tracking-[-0.03em] text-ink whitespace-nowrap">{BRAND.wordmark}</span> : null}
    </Link>
  );
}
