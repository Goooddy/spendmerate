"use client";
import { useState, type FormEvent } from "react";
import { Field, FormSuccess, validate } from "@/components/Field";
import { Icon } from "@/components/ui";

const REASONS = ["Sales & demo", "Support", "Partnerships", "Investor relations", "Press & media", "Something else"];

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate(new FormData(e.currentTarget), ["name", "email", "company", "reason"], ["email"]);
    setErrors(errs);
    if (Object.keys(errs).length) {
      (e.currentTarget.querySelector("[aria-invalid=true]") as HTMLElement | null)?.focus();
      return;
    }
    setSent(true);
  };
  if (sent) return <FormSuccess title="Message sent" body="Thanks for getting in touch. We'll route your message to the right team and reply by email within one business day." />;
  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-5">
      {Object.keys(errors).length > 0 && (
        <p role="alert" className="flex items-center gap-2 rounded-xl bg-amber-tint px-4 py-3 text-sm text-ink">
          <Icon name="Info" size={20} /> Please fix the highlighted fields and try again.
        </p>
      )}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field name="name" label="Full name" required placeholder="Your full name" autoComplete="name" error={errors.name} />
        <Field name="email" type="email" label="Work email" required placeholder="you@company.com" autoComplete="email" error={errors.email} />
        <Field name="company" label="Company" required placeholder="Company name" autoComplete="organization" error={errors.company} />
        <Field name="phone" type="tel" label="Phone (optional)" placeholder="+234 800 000 0000" autoComplete="tel" />
      </div>
      <Field as="select" name="reason" label="Reason for contact" required placeholder="Select a reason" options={REASONS} error={errors.reason} defaultValue="" />
      <Field as="textarea" name="message" label="Message (optional)" placeholder="Tell us a little about what you need." />
      <p className="text-xs text-ink-3">By sending this form you agree to our <a href="/legal/privacy" className="underline">Privacy Policy</a>.</p>
      <button type="submit" className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-teal px-6 py-3 font-semibold text-ink hover:bg-[#13a382]">
        Send message <Icon name="Arrow Right" size={20} />
      </button>
    </form>
  );
}
