"use client";
import { useId } from "react";
import { Icon, cx } from "./ui";

type Base = { label: string; required?: boolean; error?: string; hint?: string; className?: string };

export function Field({
  label, required, error, hint, className = "", as = "input", options, ...rest
}: Base & { as?: "input" | "select" | "textarea"; options?: string[] } & React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement> & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  const cls = cx(
    "w-full rounded-lg border bg-white px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-navy",
    error ? "border-[#b42318]" : "border-line-strong",
  );
  return (
    <div className={cx("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label} {required && <span className="text-[#b42318]" aria-hidden="true">*</span>}
      </label>
      {as === "textarea" ? (
        <textarea id={id} rows={5} aria-invalid={!!error} aria-describedby={error || hint ? id + "-d" : undefined} className={cls} {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : as === "select" ? (
        <div className="relative">
          <select id={id} aria-invalid={!!error} aria-describedby={error || hint ? id + "-d" : undefined} className={cx(cls, "appearance-none pr-10")} {...(rest as React.SelectHTMLAttributes<HTMLSelectElement>)}>
            <option value="">{rest.placeholder ?? "Select"}</option>
            {options?.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
          <Icon name="Chevron Down" size={20} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" />
        </div>
      ) : (
        <input id={id} aria-invalid={!!error} aria-describedby={error || hint ? id + "-d" : undefined} className={cls} {...(rest as React.InputHTMLAttributes<HTMLInputElement>)} />
      )}
      {(error || hint) && <p id={id + "-d"} className={cx("text-xs", error ? "text-[#b42318]" : "text-ink-3")}>{error || hint}</p>}
    </div>
  );
}

export function FormSuccess({ title, body, action = "Back to homepage", href = "/" }: { title: string; body: string; action?: string; href?: string }) {
  return (
    <div role="status" className="fade-in flex flex-col items-center gap-4 py-10 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-teal-chip"><Icon name="Check" /></span>
      <h3 className="text-[22px] font-semibold leading-7">{title}</h3>
      <p className="max-w-[420px] text-base text-ink-2">{body}</p>
      <a href={href} className="rounded-lg bg-navy px-6 py-3 font-semibold text-cream hover:bg-[#2f2e5c]">{action}</a>
    </div>
  );
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validates required fields by name; returns error map. */
export function validate(data: FormData, required: string[], emails: string[] = []) {
  const e: Record<string, string> = {};
  for (const k of required) if (!String(data.get(k) ?? "").trim()) e[k] = "This field is required.";
  for (const k of emails) { const v = String(data.get(k) ?? ""); if (v && !EMAIL_RE.test(v)) e[k] = "Enter a valid email address."; }
  return e;
}
