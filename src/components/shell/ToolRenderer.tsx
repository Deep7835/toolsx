"use client";
import dynamic from "next/dynamic";
import { useEffect, type ComponentType } from "react";
import { loaders } from "@/tools";
import { useRecent } from "@/lib/hooks";
import { Card, CardBody } from "@/components/ui/Card";
import { Construction } from "lucide-react";

function Skeleton() {
  return (
    <div className="grid gap-5 lg:grid-cols-12 animate-pulse" aria-busy>
      <div className="lg:col-span-5 h-[480px] rounded-2xl border border-border bg-surface" />
      <div className="lg:col-span-7 h-[480px] rounded-2xl border border-border bg-surface" />
    </div>
  );
}

const components: Record<string, ComponentType> = Object.fromEntries(
  Object.entries(loaders).map(([slug, l]) => [slug, dynamic(l, { ssr: false, loading: () => <Skeleton /> })]),
);

export function ToolRenderer({ slug }: { slug: string }) {
  const { push } = useRecent();
  useEffect(() => { push(slug); }, [slug, push]);
  const Comp = components[slug];
  if (!Comp)
    return (
      <Card>
        <CardBody className="flex flex-col items-center py-16 text-center">
          <Construction className="h-6 w-6 text-muted" />
          <p className="mt-3 text-sm font-medium text-ink">This tool is being built in a later phase.</p>
          <p className="mt-1 text-xs text-muted">Check back shortly.</p>
        </CardBody>
      </Card>
    );
  return <Comp />;
}
