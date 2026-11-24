"use client";
import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import { Icon, cx } from "./ui";
import { fieldClass, helperClass, pillClass, pillInputClass } from "./inputStyles";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm({ dark }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");
  const id = useId();
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) return setState("error");
    setState("done");
  };
  if (state === "done")
    return (
      <p role="status" className={cx("flex items-center gap-2 text-sm", dark ? "text-teal-bright" : "text-teal-text")}>
        <Icon name="Check" size={18} /> You’re subscribed. Look out for the next issue.
      </p>
    );
  return (
    <form onSubmit={submit} noValidate className="flex w-full flex-col gap-2">
      <label htmlFor={id} className={cx("text-sm font-medium leading-5", dark ? "text-cream" : "text-ink")}>Work email</label>
      <div className="flex gap-2">
        <input
          id={id}
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setState("idle"); }}
          placeholder="name@company.com"
          aria-invalid={state === "error"}
          aria-describedby={state === "error" ? id + "-e" : undefined}
          className={fieldClass({ error: state === "error", dark, className: "h-12 min-w-0 flex-1 py-0" })}
        />
        <button type="submit" className="h-12 rounded-lg bg-teal px-6 text-base font-semibold text-ink hover:bg-[#13a382]">Subscribe</button>
      </div>
      {state === "error" && <p id={id + "-e"} className={helperClass(true, dark)}>Enter a valid work email.</p>}
    </form>
  );
}

export function EmailCapture({ dark, className = "", label = "Request a Demo", href = "/request-demo" }: { dark?: boolean; className?: string; label?: string; href?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    router.push(href + (email ? `?email=${encodeURIComponent(email)}` : ""));
  };
  return (
    <form onSubmit={submit} className={pillClass({ dark, className: cx("w-full max-w-[480px]", className) })}>
      <label htmlFor="hero-email" className="sr-only">Work email</label>
      <input
        id="hero-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Work email"
        className={pillInputClass(dark)}
      />
      <button type="submit" className="press whitespace-nowrap rounded-lg bg-teal px-4 py-3 text-sm font-semibold text-ink hover:bg-[#13a382] sm:px-6 sm:text-base">{label}</button>
    </form>
  );
}

/** Email-capture slot of the CTA band: pill input + action, with an inline confirmation. */
export function PillSubscribe({ action = "Subscribe", done = "You’re subscribed. Look out for the next issue.", dark }: { action?: string; done?: string; dark?: boolean }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setState(EMAIL_RE.test(email) ? "done" : "error");
  };
  if (state === "done")
    return (
      <p role="status" className={cx("fade-in flex items-center gap-2 text-base font-medium", dark ? "text-teal-bright" : "text-teal-text")}>
        <Icon name="Check" size={20} /> {done}
      </p>
    );
  return (
    <form onSubmit={submit} noValidate className="flex w-full max-w-[480px] flex-col gap-2">
      <div className={pillClass({ dark, error: state === "error" })}>
        <label htmlFor={id} className="sr-only">Work email</label>
        <input id={id} type="email" value={email} onChange={(e) => { setEmail(e.target.value); setState("idle"); }} placeholder="you@company.com" aria-invalid={state === "error"} aria-describedby={state === "error" ? id + "-e" : undefined} className={pillInputClass(dark)} />
        <button type="submit" className="press whitespace-nowrap rounded-lg bg-teal px-5 py-3 text-sm font-semibold text-ink hover:bg-[#13a382] sm:px-6 sm:text-base">{action}</button>
      </div>
      {state === "error" && <p id={id + "-e"} className={helperClass(true, dark)}>Enter a valid work email.</p>}
    </form>
  );
}
