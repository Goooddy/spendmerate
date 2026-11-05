"use client";
import { useState } from "react";
import { Icon } from "./ui";

const QUOTES = [
  {
    quote: "Month-end used to mean a week of chasing receipts and matching bank statements by hand. With XPensari our books are ready before the board pack is due, and VAT is never a scramble.",
    name: "Ifeoma Nwosu",
    role: "Financial Controller, Kuramo Agro-Processing Ltd · Lagos",
    image: "/images/e57ac192.jpg",
  },
  {
    quote: "We finally see every naira our branches spend the day it happens. Approvals that took a week now take an afternoon.",
    name: "Babatunde Okafor",
    role: "CFO, Eko Retail Group · Lagos",
    image: "/images/b9fe467a.jpg",
  },
  {
    quote: "E-invoicing through the NRS gateway just works. Our tax team spends its time reviewing, not re-keying.",
    name: "Hauwa Musa",
    role: "Head of Tax, Sahel Logistics · Abuja",
    image: "/images/89bd24db.jpg",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const q = QUOTES[i];
  const go = (d: number) => setI((i + d + QUOTES.length) % QUOTES.length);
  return (
    <figure className="flex w-full flex-col overflow-hidden rounded-2xl md:rounded-3xl border border-line bg-white md:flex-row" aria-roledescription="carousel">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={q.image} alt={`Portrait of ${q.name}`} className="h-[300px] w-full object-cover md:h-auto md:w-[420px] md:shrink-0" />
      <div className="flex flex-1 flex-col justify-between gap-6 p-6 md:gap-8 md:p-12">
        <div className="flex flex-col gap-2">
          <span aria-hidden="true" className="font-display text-[56px] leading-[56px] text-teal-display md:text-[88px] md:leading-[92px]">“</span>
          <blockquote className="t-lead text-ink" aria-live="polite">{q.quote}</blockquote>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <figcaption className="flex flex-col gap-1">
            <span className="text-base font-semibold leading-[22px]">{q.name}</span>
            <span className="text-xs leading-[18px] text-ink-3">{q.role}</span>
          </figcaption>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-ink-2">{i + 1} / {QUOTES.length}</span>
            <button type="button" aria-label="Previous testimonial" onClick={() => go(-1)} className="flex size-10 items-center justify-center rounded-full border border-navy hover:bg-navy hover:text-cream">
              <Icon name="Arrow Right" className="rotate-180" />
            </button>
            <button type="button" aria-label="Next testimonial" onClick={() => go(1)} className="flex size-10 items-center justify-center rounded-full border border-navy hover:bg-navy hover:text-cream">
              <Icon name="Arrow Right" />
            </button>
          </div>
        </div>
      </div>
    </figure>
  );
}
