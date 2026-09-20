import type { ReactNode } from "react";

/** Tiny presentational primitives for paper previews (always light, hex colours for html2canvas). */
export const Eyebrow = ({ children }: { children: ReactNode }) => <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#78716c]">{children}</div>;

export const MetaTable = ({ rows }: { rows: Array<[string, ReactNode] | null | false | undefined> }) => (
  <table className="text-[12px]"><tbody>
    {rows.filter(Boolean).map((r) => { const [k, v] = r as [string, ReactNode]; return <tr key={k}><td className="pr-4 py-0.5 text-[#78716c] align-top">{k}</td><td className="py-0.5 font-medium align-top">{v}</td></tr>; })}
  </tbody></table>
);

export const Divider = ({ dashed }: { dashed?: boolean }) => <div className={`my-3 border-t ${dashed ? "border-dashed" : ""} border-[#d6d3d1]`} />;

export function SimpleTable({ head, rows, foot, accent = "#1c1917", compact }: { head: ReactNode[]; rows: ReactNode[][]; foot?: ReactNode[][]; accent?: string; compact?: boolean }) {
  const py = compact ? "py-1.5" : "py-2.5";
  return (
    <table className="w-full border-collapse text-[12px]">
      <thead>
        <tr className="text-left text-[10.5px] uppercase tracking-[0.12em] text-white" style={{ background: accent }}>
          {head.map((h, i) => <th key={i} className={`${py} px-3 font-semibold ${i > 0 && i === head.length - 1 ? "text-right" : ""}`}>{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="border-b border-[#e7e5e4] align-top">
            {r.map((c, j) => <td key={j} className={`${py} px-3 ${j > 0 && j === r.length - 1 ? "text-right tabular" : ""}`}>{c}</td>)}
          </tr>
        ))}
      </tbody>
      {foot ? (
        <tfoot>
          {foot.map((r, i) => (
            <tr key={i} className={i === foot.length - 1 ? "font-semibold text-[13px]" : "text-[#57534e]"}>
              {r.map((c, j) => <td key={j} colSpan={j === 0 ? head.length - 1 : 1} className={`${py} px-3 ${j === 0 ? "text-right" : "text-right tabular"}`}>{c}</td>)}
            </tr>
          ))}
        </tfoot>
      ) : null}
    </table>
  );
}

export const Stamp = ({ children, color = "#047857" }: { children: ReactNode; color?: string }) => (
  <div className="inline-block rotate-[-8deg] rounded-md border-[3px] px-3 py-1 text-[13px] font-bold uppercase tracking-[0.2em]" style={{ borderColor: color, color }}>{children}</div>
);

export const SignatureBlock = ({ label = "Authorised signatory", forName }: { label?: string; forName?: string }) => (
  <div className="text-right">
    {forName ? <div className="text-[11px] text-[#78716c]">For {forName}</div> : null}
    <div className="mt-10 inline-block min-w-[160px] border-t border-[#a8a29e] pt-1.5 text-[11.5px] font-medium">{label}</div>
  </div>
);
