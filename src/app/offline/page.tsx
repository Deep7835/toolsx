import Link from "next/link";
import { WifiOff } from "lucide-react";
export const metadata = { title: "Offline" };
export default function Offline() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-2 text-muted"><WifiOff className="h-5 w-5" /></span>
      <h1 className="mt-4 font-display text-4xl text-ink">You’re offline</h1>
      <p className="mt-3 text-muted">This page isn’t cached yet. Tools you’ve opened before still work without a connection.</p>
      <Link href="/tools" className="mt-8 inline-flex h-11 items-center rounded-xl bg-ink px-5 text-sm font-medium text-bg dark:bg-accent dark:text-on-accent">Open cached tools</Link>
    </div>
  );
}
