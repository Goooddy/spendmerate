"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Field, validate } from "@/components/Field";
import { Logo } from "@/components/Logo";

export default function LoginPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState("");
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate(new FormData(e.currentTarget), ["email", "password"], ["email"]);
    setErrors(errs);
    if (!Object.keys(errs).length) setMsg("Sign-in opens once your organisation is set up. Request a demo to get started.");
  };
  return (
    <div className="flex min-h-screen flex-col bg-page">
      <header className="flex h-[77px] items-center justify-between px-[var(--page-x)]">
        <Logo />
        <Link href="/" className="text-sm font-semibold text-teal-text hover:underline">Back to xpensari.com</Link>
      </header>
      <main id="main" className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="rise flex w-full max-w-[480px] flex-col gap-6 rounded-3xl border border-line bg-white p-8 shadow-md md:p-10">
          <div className="flex flex-col gap-2">
            <h1 className="t-h2">Log in to XPensari</h1>
            <p className="text-sm text-ink-2">Use the work email your organisation was set up with.</p>
          </div>
          <form onSubmit={submit} noValidate className="flex flex-col gap-5">
            <Field name="email" type="email" label="Work email" placeholder="you@company.com" autoComplete="email" error={errors.email} />
            <Field name="password" type="password" label="Password" placeholder="••••••••••" autoComplete="current-password" error={errors.password} />
            <Link href="/contact" className="-mt-2 self-end text-sm font-semibold text-teal-text hover:underline">Forgot your password?</Link>
            {msg && <p role="status" className="rounded-xl bg-amber-tint px-4 py-3 text-sm">{msg}</p>}
            <button type="submit" className="rounded-lg bg-teal px-6 py-3 font-semibold hover:bg-[#13a382]">Log in</button>
          </form>
          <p className="text-center text-sm text-ink-2">No account yet? <Link href="/request-demo" className="font-semibold text-teal-text hover:underline">Request a demo</Link></p>
        </div>
      </main>
    </div>
  );
}
