"use client";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Field, FormSuccess, validate } from "@/components/Field";
import { Icon, cx } from "@/components/ui";

const DAYS = ["Mon 12", "Tue 13", "Wed 14", "Thu 15", "Fri 16"];
const DAY_LONG: Record<string, string> = { "Mon 12": "Monday 12 October", "Tue 13": "Tuesday 13 October", "Wed 14": "Wednesday 14 October", "Thu 15": "Thursday 15 October", "Fri 16": "Friday 16 October" };
const TIMES = ["09:00", "10:00", "11:30", "13:00", "14:30", "16:00"];

function Steps({ n }: { n: number }) {
  return (
    <div className="flex flex-col gap-2" aria-label={`Step ${n} of 3`}>
      <span className="t-eyebrow text-ink-3">Step {n} of 3</span>
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => <span key={i} className={cx("h-1 flex-1 rounded-full transition-colors duration-300", i <= n ? "bg-teal" : "bg-line")} />)}
      </div>
    </div>
  );
}

function Chips({ label, items, value, onChange }: { label: string; items: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-3 text-sm font-medium">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {items.map((it) => (
          <button key={it} type="button" aria-pressed={value === it} onClick={() => onChange(it)} className={cx("rounded-lg border px-4 py-3 text-sm font-medium transition-colors duration-150", value === it ? "border-teal bg-teal" : "border-line-strong bg-white hover:border-navy")}>{it}</button>
        ))}
      </div>
    </fieldset>
  );
}

export function DemoFlow() {
  const params = useSearchParams();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [day, setDay] = useState("Tue 13");
  const [time, setTime] = useState("10:00");
  const [email, setEmail] = useState(params.get("email") ?? "");

  const next = (req: string[], emails: string[] = []) => (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate(new FormData(e.currentTarget), req, emails);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStep((s) => s + 1);
  };

  if (step === 4)
    return <FormSuccess title="Your demo is booked" body={`${DAY_LONG[day]}, ${time} WAT. We’ve sent a calendar invite to your work email, with a link to join.`} />;

  return (
    <div className="flex flex-col gap-6">
      <Steps n={step} />
      {step === 1 && (
        <form key="s1" onSubmit={next(["email", "name"], ["email"])} noValidate className="panel-in flex flex-col gap-5">
          <Field name="email" type="email" label="Work email" required placeholder="you@company.com" value={email} onChange={(e) => setEmail((e.target as HTMLInputElement).value)} error={errors.email} autoComplete="email" />
          <Field name="name" label="Full name" required placeholder="Your full name" error={errors.name} autoComplete="name" />
          <p className="text-xs text-ink-3">By continuing you agree to our <a className="underline" href="/legal/privacy">Privacy Policy</a>.</p>
          <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal px-6 py-3 font-semibold hover:bg-[#13a382]">Continue <Icon name="Arrow Right" size={20} /></button>
        </form>
      )}
      {step === 2 && (
        <form key="s2" onSubmit={next(["company", "size", "role", "turnover"])} noValidate className="panel-in flex flex-col gap-5">
          <Field name="company" label="Company" required placeholder="Company name" error={errors.company} />
          <Field as="select" name="size" label="Company size" required placeholder="Select a range" options={["1–10 employees", "11–50 employees", "51–200 employees", "201–1,000 employees", "1,000+ employees"]} defaultValue="" error={errors.size} />
          <Field as="select" name="role" label="Your role" required placeholder="Select your role" options={["CFO / Finance Director", "Finance manager", "Accountant", "Procurement", "Sales & revenue", "Founder / CEO", "Developer", "Other"]} defaultValue="" error={errors.role} />
          <Field as="select" name="turnover" label="Annual turnover" required placeholder="Select a band" options={["Under ₦1bn", "₦1bn–₦5bn", "Over ₦5bn"]} defaultValue="" hint="Under ₦1bn, ₦1bn–₦5bn or over ₦5bn. This sets your e-invoicing phase." error={errors.turnover} />
          <Field name="phone" type="tel" label="Phone (optional)" placeholder="+234 800 000 0000" />
          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(1)} className="flex-1 rounded-lg border border-navy px-6 py-3 font-semibold hover:bg-navy hover:text-cream">Back</button>
            <button type="submit" className="flex-1 rounded-lg bg-teal px-6 py-3 font-semibold hover:bg-[#13a382]">Continue</button>
          </div>
        </form>
      )}
      {step === 3 && (
        <form key="s3" onSubmit={(e) => { e.preventDefault(); setStep(4); }} className="panel-in flex flex-col gap-6">
          <Chips label="Pick a day" items={DAYS} value={day} onChange={setDay} />
          <Chips label="Pick a time (WAT, Lagos)" items={TIMES} value={time} onChange={setTime} />
          <p className="rounded-xl bg-teal-tint px-4 py-3 text-sm" aria-live="polite">{DAY_LONG[day]}, {time} WAT · 30-minute video call</p>
          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(2)} className="flex-1 rounded-lg border border-navy px-6 py-3 font-semibold hover:bg-navy hover:text-cream">Back</button>
            <button type="submit" className="flex-1 rounded-lg bg-teal px-6 py-3 font-semibold hover:bg-[#13a382]">Book demo</button>
          </div>
        </form>
      )}
    </div>
  );
}
