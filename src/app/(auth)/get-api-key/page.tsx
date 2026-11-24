"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Field, validate } from "@/components/Field";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/ui";

export default function GetApiKeyPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [email, setEmail] = useState("");
  const [issued, setIssued] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const errs = validate(fd, ["email", "company"], ["email"]);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setEmail(String(fd.get("email")));
    setIssued(true);
  };
  return (
    <div className="flex min-h-screen flex-col bg-page">
      <header className="flex h-[77px] items-center justify-between px-[var(--page-x)]">
        <Logo />
        <Link href="/resources/developers" className="text-sm font-semibold text-teal-text hover:underline">Back to developer docs</Link>
      </header>
      <main id="main" className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="rise flex w-full max-w-[520px] flex-col gap-6 rounded-2xl md:rounded-3xl border border-line bg-white p-8 shadow-md md:p-10">
          {issued ? (
            <div role="status" className="fade-in flex flex-col gap-5">
              <span className="flex size-14 items-center justify-center rounded-full bg-teal-chip"><Icon name="Check" /></span>
              <h1 className="t-h2">You're on the list</h1>
              <p className="text-sm text-ink-2">We'll email {email} as soon as sandbox access opens.</p>
              <Link href="/resources/developers" className="rounded-lg bg-navy px-6 py-3 text-center font-semibold text-cream hover:bg-[#2f2e5c]">Read the developer docs</Link>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-2">
                <h1 className="t-h2">Join the developer waitlist</h1>
                <p className="text-sm text-ink-2">The SpendMerate developer API is coming soon. Leave your details and we'll email you when sandbox access opens.</p>
              </div>
              <form onSubmit={submit} noValidate className="flex flex-col gap-5">
                <Field name="email" type="email" label="Work email" required placeholder="you@company.com" error={errors.email} />
                <Field name="company" label="Company" required placeholder="Company name" error={errors.company} />
                <Field as="textarea" name="building" label="What are you building?" placeholder="A short description helps us tune your sandbox data." />
                <p className="text-xs text-ink-3">By continuing you agree to our <Link href="/legal/privacy" className="underline">Privacy Policy</Link>.</p>
                <button type="submit" className="rounded-lg bg-teal px-6 py-3 font-semibold hover:bg-[#13a382]">Join the waitlist</button>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
