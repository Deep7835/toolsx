"use client";
import { forwardRef, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes, type ReactNode, useId } from "react";
import { cn } from "@/lib/cn";
import { ChevronDown } from "lucide-react";

const base =
  "w-full bg-surface text-ink placeholder:text-muted border border-border rounded-xl h-11 px-3.5 text-[15px] sm:text-sm transition-[border-color,box-shadow] duration-200 hover:border-border-strong focus:border-accent focus:ring-4 focus:ring-accent/10 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed";

export function Label({ children, htmlFor, hint, className }: { children: ReactNode; htmlFor?: string; hint?: ReactNode; className?: string }) {
  return (
    <label htmlFor={htmlFor} className={cn("flex items-baseline justify-between text-[13px] font-medium text-ink-2 mb-1.5", className)}>
      <span>{children}</span>
      {hint ? <span className="text-xs font-normal text-muted">{hint}</span> : null}
    </label>
  );
}

export function Help({ children, error }: { children?: ReactNode; error?: string }) {
  if (error) return <p className="mt-1.5 text-xs text-danger" role="alert">{error}</p>;
  if (!children) return null;
  return <p className="mt-1.5 text-xs text-muted">{children}</p>;
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  label?: ReactNode;
  hint?: ReactNode;
  help?: ReactNode;
  error?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  wrapClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, help, error, prefix, suffix, className, wrapClassName, id, ...rest },
  ref,
) {
  const auto = useId();
  const iid = id ?? auto;
  return (
    <div className={cn("min-w-0", wrapClassName)}>
      {label ? <Label htmlFor={iid} hint={hint}>{label}</Label> : null}
      <div className="relative">
        {prefix ? <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-sm text-muted">{prefix}</span> : null}
        <input
          ref={ref}
          id={iid}
          className={cn(base, prefix ? "pl-9" : "", suffix ? "pr-12" : "", error ? "border-danger focus:border-danger focus:ring-danger/10" : "", className)}
          aria-invalid={!!error}
          {...rest}
        />
        {suffix ? <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs font-medium text-muted">{suffix}</span> : null}
      </div>
      <Help error={error}>{help}</Help>
    </div>
  );
});

export interface NumberInputProps extends Omit<InputProps, "onChange" | "value" | "type"> {
  value: number | string;
  onChange: (v: number) => void;
}
/** Number input that keeps a numeric value but tolerates empty typing. */
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput({ value, onChange, ...rest }, ref) {
  return (
    <Input
      ref={ref}
      type="number"
      inputMode="decimal"
      value={value === 0 && rest.placeholder ? "" : value}
      onChange={(e) => onChange(e.target.value === "" ? 0 : parseFloat(e.target.value))}
      onFocus={(e) => e.target.select()}
      {...rest}
    />
  );
});

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: ReactNode;
  hint?: ReactNode;
  help?: ReactNode;
  error?: string;
  options: Array<{ value: string; label: string } | string>;
  wrapClassName?: string;
}
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({ label, hint, help, error, options, className, wrapClassName, id, ...rest }, ref) {
  const auto = useId();
  const iid = id ?? auto;
  return (
    <div className={cn("min-w-0", wrapClassName)}>
      {label ? <Label htmlFor={iid} hint={hint}>{label}</Label> : null}
      <div className="relative">
        <select ref={ref} id={iid} className={cn(base, "appearance-none pr-10 cursor-pointer", className)} {...rest}>
          {options.map((o) => {
            const v = typeof o === "string" ? o : o.value;
            const l = typeof o === "string" ? o : o.label;
            return <option key={v} value={v}>{l}</option>;
          })}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" aria-hidden />
      </div>
      <Help error={error}>{help}</Help>
    </div>
  );
});

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  hint?: ReactNode;
  help?: ReactNode;
  error?: string;
  wrapClassName?: string;
}
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({ label, hint, help, error, className, wrapClassName, id, ...rest }, ref) {
  const auto = useId();
  const iid = id ?? auto;
  return (
    <div className={cn("min-w-0", wrapClassName)}>
      {label ? <Label htmlFor={iid} hint={hint}>{label}</Label> : null}
      <textarea ref={ref} id={iid} className={cn(base, "h-auto min-h-[88px] py-2.5 leading-relaxed resize-y", className)} {...rest} />
      <Help error={error}>{help}</Help>
    </div>
  );
});

export function Toggle({ checked, onChange, label, help, className }: { checked: boolean; onChange: (v: boolean) => void; label: ReactNode; help?: ReactNode; className?: string }) {
  const id = useId();
  return (
    <label htmlFor={id} className={cn("flex items-center justify-between gap-4 cursor-pointer select-none py-1", className)}>
      <span className="min-w-0">
        <span className="block text-sm font-medium text-ink">{label}</span>
        {help ? <span className="block text-xs text-muted mt-0.5">{help}</span> : null}
      </span>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn("relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200", checked ? "bg-accent" : "bg-border-strong")}
      >
        <span className={cn("absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-out", checked ? "translate-x-5" : "")} />
      </button>
    </label>
  );
}

export function Segmented<T extends string>({ value, onChange, options, className, size = "md" }: { value: T; onChange: (v: T) => void; options: Array<{ value: T; label: ReactNode }>; className?: string; size?: "sm" | "md" }) {
  return (
    <div role="tablist" className={cn("inline-flex w-full rounded-xl bg-surface-2 p-1 border border-border", className)}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            role="tab"
            aria-selected={active}
            type="button"
            onClick={() => onChange(o.value)}
            className={cn(
              "flex-1 rounded-lg font-medium transition-all duration-200 cursor-pointer",
              size === "sm" ? "h-8 text-xs px-2" : "h-9 text-sm px-3",
              active ? "bg-surface text-ink shadow-sm" : "text-muted hover:text-ink",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function Checkbox({ checked, onChange, label, className }: { checked: boolean; onChange: (v: boolean) => void; label: ReactNode; className?: string }) {
  return (
    <label className={cn("inline-flex items-center gap-2.5 cursor-pointer select-none text-sm text-ink", className)}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
      <span className="h-5 w-5 rounded-md border border-border-strong bg-surface flex items-center justify-center transition-colors peer-checked:bg-accent peer-checked:border-accent peer-focus-visible:ring-2 peer-focus-visible:ring-ring">
        <svg viewBox="0 0 16 16" className={cn("h-3.5 w-3.5 text-on-accent", checked ? "opacity-100" : "opacity-0")} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5l3 3 7-7" /></svg>
      </span>
      {label}
    </label>
  );
}

export function Range({ label, value, onChange, min, max, step = 1, format }: { label: ReactNode; value: number; onChange: (v: number) => void; min: number; max: number; step?: number; format?: (v: number) => string }) {
  const id = useId();
  return (
    <div>
      <Label htmlFor={id} hint={<span className="tabular text-ink font-medium">{format ? format(value) : value}</span>}>{label}</Label>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} className="w-full accent-[var(--accent)] h-2 cursor-pointer" />
    </div>
  );
}

export function FieldGroup({ title, children, className, aside }: { title?: ReactNode; children: ReactNode; className?: string; aside?: ReactNode }) {
  return (
    <fieldset className={cn("min-w-0", className)}>
      {title ? (
        <div className="flex items-center justify-between mb-3">
          <legend className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">{title}</legend>
          {aside}
        </div>
      ) : null}
      <div className="grid gap-4">{children}</div>
    </fieldset>
  );
}

export const Row = ({ children, className, cols = 2 }: { children: ReactNode; className?: string; cols?: 2 | 3 | 4 }) => (
  <div className={cn("grid gap-4", cols === 2 ? "grid-cols-1 sm:grid-cols-2" : cols === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-4", className)}>{children}</div>
);
