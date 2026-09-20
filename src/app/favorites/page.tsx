"use client";
import { Suspense } from "react";
import { Heart } from "lucide-react";
import Link from "next/link";
import { TOOLS } from "@/lib/registry";
import { useFavorites, useRecent } from "@/lib/hooks";
import { ToolGrid } from "@/components/layout/ToolGrid";
import { PageHeader } from "@/components/layout/PageHeader";
import { Empty } from "@/components/ui/Empty";

export default function FavoritesPage() {
  const { favs } = useFavorites();
  const { recent } = useRecent();
  const favTools = TOOLS.filter((t) => favs.includes(t.slug));
  const recentTools = recent.map((s) => TOOLS.find((t) => t.slug === s)!).filter(Boolean);
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
      <PageHeader eyebrow="Your workspace" title="Favourites" description="Tools you’ve pinned, saved in this browser only." />
      <div className="mt-8">
        {favTools.length ? <Suspense><ToolGrid tools={favTools} showFilters={false} /></Suspense> : <Empty icon={<Heart className="h-5 w-5" />} title="No favourites yet" hint="Tap the heart on any tool card to keep it here." action={<Link href="/tools" className="text-sm font-medium text-accent-text hover:underline">Browse all tools</Link>} />}
      </div>
      {recentTools.length ? (
        <div className="mt-14">
          <h2 className="font-display text-2xl text-ink">Recently used</h2>
          <div className="mt-4"><Suspense><ToolGrid tools={recentTools} showFilters={false} /></Suspense></div>
        </div>
      ) : null}
    </div>
  );
}
