"use client";
/** Shared Google-style SERP preview used by Meta Tags and SERP Snippet tools. */
export function SerpPreview({ title, desc, url, mobile, favicon, site }: { title: string; desc: string; url: string; mobile?: boolean; favicon?: string; site?: string }) {
  const clean = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const host = clean.split("/")[0];
  const path = clean.slice(host.length).split("/").filter(Boolean).join(" › ");
  const t = title.length > (mobile ? 55 : 60) ? title.slice(0, mobile ? 55 : 60).replace(/\s+\S*$/, "") + " …" : title;
  const d = desc.length > (mobile ? 120 : 160) ? desc.slice(0, mobile ? 120 : 160).replace(/\s+\S*$/, "") + " …" : desc;
  return (
    <div className={`rounded-2xl border border-border bg-white p-4 text-[#1f1f1f] ${mobile ? "max-w-[380px]" : "max-w-[640px]"}`} style={{ fontFamily: "Arial, sans-serif" }}>
      <div className="flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-[#dadce0] bg-[#f1f3f4] text-[11px] font-bold text-[#5f6368]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {favicon ? <img src={favicon} alt="" className="h-4 w-4" /> : (site || host).slice(0, 1).toUpperCase()}
        </div>
        <div className="min-w-0 leading-tight"><div className="truncate text-[14px] text-[#1f1f1f]">{site || host}</div><div className="truncate text-[12px] text-[#4d5156]">{host}{path ? ` › ${path}` : ""}</div></div>
      </div>
      <div className={`mt-2 ${mobile ? "text-[18px]" : "text-[20px]"} leading-snug text-[#1a0dab] hover:underline cursor-pointer`}>{t || "Page title"}</div>
      <div className="mt-1 text-[14px] leading-[1.58] text-[#4d5156]">{d || "Meta description appears here. Keep it under 160 characters and lead with the benefit."}</div>
    </div>
  );
}
