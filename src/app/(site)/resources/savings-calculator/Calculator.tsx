"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Field, EMAIL_RE, validate } from "@/components/Field";
import { Badge, Icon } from "@/components/ui";

const INDUSTRY = ["Logistics", "Retail", "Manufacturing", "Hospitality", "Healthcare", "Oil & Gas", "Education", "Professional services", "Other"];
const TURNOVER = ["Under ₦250m", "₦250m – ₦1bn", "₦1bn – ₦5bn", "Over ₦5bn"];
const EMPLOYEES = ["1–10", "11–50", "51–200", "201–1,000", "1,000+"];
const INVOICES = ["Under 100", "100–500", "500–2,000", "2,000+"];

const naira = (n: number) => "₦" + Math.round(n).toLocaleString("en-NG");

function estimate(v: Record<string, string>) {
  const t = [60e6, 180e6, 900e6, 3.2e9][TURNOVER.indexOf(v.turnover)] ?? 180e6;
  const e = [6, 30, 120, 500, 1400][EMPLOYEES.indexOf(v.employees)] ?? 30;
  const inv = [60, 300, 1200, 3000][INVOICES.indexOf(v.invoices)] ?? 300;
  const leakage = t * 0.012; // avoidable spend ~1.2% of turnover
  const hours = e * 1.5 + inv * 0.05; // finance hours saved / month
  const labour = hours * 12 * 6500;
  const total = leakage + labour;
  return { total, leakage, labour, hours: Math.round(hours), gain: Math.min(62, Math.round(28 + Math.log10(inv) * 8)) };
}

function Modal({ onClose, label, children }: { onClose: () => void; label: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  // Keep the latest onClose without re-running the mount effect: the parent re-renders on every
  // keystroke, and re-running it would steal focus from the field being typed in.
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.focus({ preventScroll: true }); // the dialog itself, so phones don't open the keyboard over the results
    const k = (e: KeyboardEvent) => e.key === "Escape" && closeRef.current();
    document.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = ""; prev?.focus(); };
  }, []);
  // Mobile bottom sheet: drag the handle down to dismiss.
  const startY = useRef<number | null>(null);
  const [drag, setDrag] = useState(0);
  const onTouchStart = (e: React.TouchEvent) => { startY.current = e.touches[0].clientY; };
  const onTouchMove = (e: React.TouchEvent) => { if (startY.current !== null) setDrag(Math.max(0, e.touches[0].clientY - startY.current)); };
  const onTouchEnd = () => { if (drag > 90) onClose(); setDrag(0); startY.current = null; };
  return (
    <div className="fade-in fixed inset-0 z-[80] flex items-end justify-center bg-navy/40 md:items-center md:bg-navy/50 md:p-4" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        style={drag ? { transform: `translateY(${drag}px)`, transition: "none" } : undefined}
        className="sheet-up relative max-h-[90vh] outline-none w-full overflow-y-auto rounded-t-3xl bg-white px-5 pb-8 pt-3 shadow-lg transition-transform duration-200 md:max-w-[720px] md:rounded-3xl md:p-10"
      >
        <div className="-mx-5 mb-3 flex justify-center py-1 md:hidden" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} aria-hidden="true">
          <span className="h-1 w-10 rounded-full bg-line" />
        </div>
        <button type="button" aria-label="Close" onClick={onClose} className="press absolute right-3 top-5 flex size-11 items-center justify-center rounded-full hover:bg-subtle md:right-4 md:top-4"><Icon name="Close" size={20} /></button>
        {children}
      </div>
    </div>
  );
}

export function Calculator() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [vals, setVals] = useState<Record<string, string> | null>(null);
  const [stage, setStage] = useState<"estimate" | "email" | null>(null);
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const errs = validate(fd, ["industry", "turnover", "employees", "invoices"]);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setVals(Object.fromEntries(fd.entries()) as Record<string, string>);
    setStage("estimate");
  };
  const r = vals ? estimate(vals) : null;

  return (
    <>
      <form id="calculator" onSubmit={submit} noValidate className="flex scroll-mt-28 flex-col gap-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field as="select" name="industry" label="Industry" placeholder="Select your industry" options={INDUSTRY} defaultValue="" error={errors.industry} />
          <Field as="select" name="turnover" label="Annual turnover" placeholder="Select a range" options={TURNOVER} defaultValue="" error={errors.turnover} />
          <Field as="select" name="employees" label="Employees submitting expenses" placeholder="Select a range" options={EMPLOYEES} defaultValue="" error={errors.employees} />
          <Field as="select" name="invoices" label="Invoices processed monthly" placeholder="Select a range" options={INVOICES} defaultValue="" error={errors.invoices} />
        </div>
        <button type="submit" className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-teal px-6 py-3 font-semibold hover:bg-[#13a382]">Calculate my savings <Icon name="Arrow Right" size={20} /></button>
      </form>

      {stage === "estimate" && r && vals && (
        <Modal label="Your estimate" onClose={() => setStage(null)}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="t-eyebrow text-teal-text">Your estimate</p>
              <h2 className="t-h2">You could save about {naira(r.total)} a year</h2>
              <p className="text-sm text-ink-2">{vals.industry} · {vals.turnover} turnover · {vals.employees} employees · {vals.invoices} invoices a month</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[["Avoidable spend", naira(r.leakage)], ["Finance time saved", `${r.hours} hrs / month`], ["Efficiency gain", `${r.gain}%`]].map(([k, v], i) => (
                <div key={k} className="seq-up flex flex-col gap-1 rounded-2xl bg-page p-4" style={{ animationDelay: `${i * 120}ms` }}>
                  <span className="text-xs text-ink-3">{k}</span>
                  <span className="text-[22px] font-semibold leading-7">{v}</span>
                </div>
              ))}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); if (!EMAIL_RE.test(email)) return setEmailErr("Enter a valid work email."); setStage("email"); }} noValidate className="flex flex-col gap-3 rounded-2xl bg-teal-tint p-5">
              <p className="text-sm font-semibold">Get the full breakdown by email</p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <Field className="flex-1" name="calc-email" type="email" label="Work email" required value={email} onChange={(e) => { setEmail((e.target as HTMLInputElement).value); setEmailErr(""); }} placeholder="you@company.com" autoComplete="email" error={emailErr || undefined} />
                <button type="submit" className="press h-12 shrink-0 rounded-lg bg-teal px-6 font-semibold hover:bg-[#13a382] sm:mb-0">Email me the full breakdown</button>
              </div>
              <p className="text-xs text-ink-3">Illustrative estimate based on businesses like yours. We'll never share your email.</p>
            </form>
          </div>
        </Modal>
      )}
      {stage === "email" && (
        <Modal label="Check your email" onClose={() => setStage(null)}>
          <div role="status" className="flex flex-col items-center gap-4 py-4 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-teal-chip"><Icon name="Mail" /></span>
            <h2 className="t-h3">Check your email</h2>
            <p className="max-w-[400px] text-base text-ink-2">We’ve sent your full savings breakdown to {email}. Want to go through it together?</p>
            <a href="/request-demo" className="rounded-lg bg-navy px-6 py-3 font-semibold text-cream hover:bg-[#2f2e5c]">Talk to our team</a>
          </div>
        </Modal>
      )}
    </>
  );
}

export function HeroPreview() {
  return (
    <div aria-hidden="true" className="illus relative flex h-[440px] w-full items-center justify-center rounded-3xl md:rounded-[32px] bg-subtle px-2 py-6 md:h-[520px] md:p-6">
      <div className="seq-up flex w-full max-w-[400px] flex-col gap-4 rounded-2xl border border-line bg-white p-5 sm:p-6" style={{ ["--d" as string]: "400ms" }}>
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2"><span className="min-w-0 text-sm font-semibold">Your estimated savings</span><Badge tone="neutral">Sample data</Badge></div>
        <span className="text-xs text-ink-3">Logistics · ₦250m–₦1bn turnover</span>
        <span className="text-4xl font-semibold tracking-wider">₦ ••,•••,•••</span>
        <span className="flex items-center gap-2 text-xs text-teal-text"><Icon name="Check" size={14} /> Full breakdown unlocks with your work email</span>
        <div className="flex items-center justify-between border-t border-line pt-3"><span className="text-xs text-ink-2">Efficiency gain</span><Badge tone="teal">••%</Badge></div>
      </div>
      <div className="seq-up absolute bottom-6 right-6 hidden w-[260px] flex-col gap-2 rounded-2xl border border-line bg-white p-4 sm:flex" style={{ ["--d" as string]: "1200ms" }}>
        <span className="flex items-center gap-2 text-sm font-semibold"><Icon name="Building" size={18} className="text-teal-text" /> Tell us about your business</span>
        <div className="flex justify-between text-xs"><span className="text-ink-3">Industry</span><span>Logistics</span></div>
        <div className="flex justify-between text-xs"><span className="text-ink-3">Annual turnover</span><span>₦250m – ₦1bn</span></div>
        <div className="flex items-center justify-between text-xs"><span className="text-ink-3">Calculating</span><span className="font-medium">60 s</span></div>
        <div className="h-1.5 rounded-full bg-subtle"><div className="seq-grow h-1.5 w-full rounded-full bg-teal" style={{ ["--d" as string]: "1600ms" }} /></div>
      </div>
    </div>
  );
}
