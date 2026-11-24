"use client";
import { useState } from "react";

export function ShareLinks({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const enc = encodeURIComponent;
  return (
    <div className="flex flex-col gap-3">
      <p className="t-eyebrow text-ink-3">Share this article</p>
      <div className="flex flex-wrap gap-2 text-sm font-semibold">
        <a className="rounded-full border border-line bg-white px-4 py-2 hover:border-navy" target="_blank" rel="noreferrer" href={`https://x.com/intent/post?text=${enc(title)}&url=${enc(url)}`}>X</a>
        <a className="rounded-full border border-line bg-white px-4 py-2 hover:border-navy" target="_blank" rel="noreferrer" href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`}>LinkedIn</a>
        <button type="button" className="rounded-full border border-line bg-white px-4 py-2 hover:border-navy" onClick={() => { navigator.clipboard?.writeText(window.location.href).catch(() => {}); setCopied(true); }}>{copied ? "Link copied" : "Copy link"}</button>
      </div>
    </div>
  );
}
