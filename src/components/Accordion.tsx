"use client";
import { useId, useState } from "react";
import { Icon, SectionHeader, cx } from "./ui";

export type QA = { q: string; a: string };

export function Accordion({ items, defaultOpen = 0 }: { items: QA[]; defaultOpen?: number }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();
  return (
    <div className="flex w-full flex-col gap-3">
      {items.map((it, i) => {
        const isOpen = open === i;
        const id = `${base}-${i}`;
        return (
          <div key={i} className="rounded-xl border border-line bg-white">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={id}
                onClick={() => setOpen(isOpen ? null : i)}
                className={cx("flex w-full items-center justify-between gap-4 px-6 pt-6 text-left text-base font-semibold leading-[22px] text-ink transition-[padding] duration-200 ease-in-out", isOpen ? "pb-3" : "pb-6")}
              >
                {it.q}
                <Icon name="Chevron Down" size={20} className={cx("shrink-0 transition-transform duration-200 ease-in-out", isOpen && "rotate-180")} />
              </button>
            </h3>
            <div id={id} role="region" className={cx("grid transition-[grid-template-rows] duration-200 ease-in-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
              {/* No negative margin here: this wrapper clips for the open/close animation, so anything pulled above it gets cut off. */}
              <div className="min-h-0 overflow-hidden">
                <p className="px-6 pb-6 text-sm leading-[22px] text-ink-2">{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function FaqSection({ eyebrow = "FAQ", title, body, items, bg = "bg-page" }: { eyebrow?: string; title: string; body?: string; items: QA[]; bg?: string }) {
  return (
    <section className={cx("section-y", bg)}>
      <div className="wrap flex flex-col items-center gap-8 md:gap-12">
        <SectionHeader align="center" eyebrow={eyebrow} title={title} body={body} />
        <div className="w-full max-w-[800px]">
          <Accordion items={items} />
        </div>
      </div>
    </section>
  );
}
