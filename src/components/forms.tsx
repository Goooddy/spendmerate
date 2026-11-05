"use client";
import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import { Icon, cx } from "./ui";

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
          className={cx(
            "h-12 min-w-0 flex-1 rounded-lg border px-4 text-base outline-none",
            dark ? "border-line-dark bg-navy-raised text-cream placeholder:text-muted-dark" : "border-line-strong bg-white text-ink placeholder:text-ink-3",
            state === "error" && "border-[#c2410c]",
          )}
        />
        <button type="submit" className="h-12 rounded-lg bg-teal px-6 text-base font-semibold text-ink hover:bg-[#13a382]">Subscribe</button>
      </div>
      {state === "error" && <p className={cx("text-xs", dark ? "text-amber" : "text-[#b42318]")}>Enter a valid work email.</p>}
    </form>
  );
}

export function EmailCapture({ dark, className = "" }: { dark?: boolean; className?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    router.push("/request-demo" + (email ? `?email=${encodeURIComponent(email)}` : ""));
  };
  return (
    <form onSubmit={submit} className={cx("flex w-full max-w-[480px] items-center gap-2 rounded-2xl border py-1.5 pl-5 pr-1.5", dark ? "border-line-dark bg-navy-raised" : "border-line-strong bg-white", className)}>
      <label htmlFor="hero-email" className="sr-only">Work email</label>
      <input
        id="hero-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Work email"
        className={cx("min-w-0 flex-1 bg-transparent text-sm outline-none", dark ? "text-cream placeholder:text-muted-dark" : "text-ink placeholder:text-ink-3")}
      />
      <button type="submit" className="whitespace-nowrap rounded-lg bg-teal px-4 py-3 text-sm font-semibold text-ink hover:bg-[#13a382] sm:px-6 sm:text-base">Request a Demo</button>
    </form>
  );
}
