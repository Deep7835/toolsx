import Link from "next/link";
import { ArrowUpRight, Flame, BookOpen } from "lucide-react";
import type { PostMeta } from "@/lib/blog";
import { fmtDate } from "@/lib/format";
import { cn } from "@/lib/cn";

export function PostCard({ post, big }: { post: PostMeta; big?: boolean }) {
  return (
    <article className={cn("group relative flex flex-col rounded-2xl border border-border bg-surface p-5 shadow-sm transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-border-strong", big ? "sm:p-7" : "")}>
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em]">
        {post.kind === "trending" ? <span className="inline-flex items-center gap-1 rounded-full bg-warn-soft px-2 py-0.5 text-warn"><Flame className="h-3 w-3" /> Trending</span> : <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-accent-text"><BookOpen className="h-3 w-3" /> Guide</span>}
        <span className="text-muted">{post.readMinutes} min read</span>
      </div>
      <h3 className={cn("mt-3 font-semibold leading-snug tracking-tight text-ink", big ? "text-2xl" : "text-[16px]")}>
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none">{post.title}</Link>
      </h3>
      <p className={cn("mt-2 text-muted leading-relaxed", big ? "text-[15px]" : "line-clamp-3 text-[13.5px]")}>{post.description}</p>
      <div className="mt-auto flex items-center justify-between pt-4 text-xs text-muted">
        <span>{post.updated ? `Updated ${fmtDate(post.updated)}` : fmtDate(post.date)}</span>
        <span className="inline-flex items-center gap-1 text-ink opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">Read <ArrowUpRight className="h-3.5 w-3.5" /></span>
      </div>
    </article>
  );
}
