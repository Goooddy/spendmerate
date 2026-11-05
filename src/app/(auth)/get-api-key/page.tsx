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
  const [copied, setCopied] = useState(false);
  const key = "xp_sb_7d41••••••••••3f9a";
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
              <h1 className="t-h2">Your sandbox key is ready</h1>
              <p className="text-sm text-ink-2">We have emailed a copy to {email}. Sandbox keys are rate-limited and reset every 30 days.</p>
              <div className="flex items-center gap-3 rounded-xl bg-subtle px-4 py-3">
                <code className="flex-1 truncate font-mono text-sm">{key}</code>
                <button type="button" onClick={() => { navigator.clipboard?.writeText(key).catch(() => {}); setCopied(true); }} className="rounded-lg border border-navy px-4 py-2 text-sm font-semibold hover:bg-navy hover:text-cream">{copied ? "Copied" : "Copy"}</button>
              </div>
              <Link href="/resources/developers#reference" className="rounded-lg bg-navy px-6 py-3 text-center font-semibold text-cream hover:bg-[#2f2e5c]">Read the API reference</Link>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-2">
                <h1 className="t-h2">Get a sandbox API key</h1>
                <p className="text-sm text-ink-2">Build against sandbox data with realistic NTA 2025 tax and NRS e-invoicing responses. No card required.</p>
              </div>
              <form onSubmit={submit} noValidate className="flex flex-col gap-5">
                <Field name="email" type="email" label="Work email" required placeholder="you@company.com" error={errors.email} />
                <Field name="company" label="Company" required placeholder="Company name" error={errors.company} />
                <Field as="textarea" name="building" label="What are you building?" placeholder="A short description helps us tune your sandbox data." />
                <p className="text-xs text-ink-3">By continuing you agree to our API Terms and <Link href="/legal/privacy" className="underline">Privacy Policy</Link>.</p>
                <button type="submit" className="rounded-lg bg-teal px-6 py-3 font-semibold hover:bg-[#13a382]">Create sandbox key</button>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
