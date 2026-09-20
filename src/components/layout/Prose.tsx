import type { ReactNode } from "react";
import { PageHeader } from "./PageHeader";

export function ProsePage({ eyebrow, title, description, children }: { eyebrow?: string; title: string; description?: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14">
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      <div className="prose-ibt mt-10 grid gap-5 text-[15px] leading-relaxed text-ink-2 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-ink [&_h2]:mt-6 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:grid [&_ul]:gap-1.5 [&_a]:text-accent-text [&_a]:underline">{children}</div>
    </div>
  );
}
