"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MEGA, DEMO_HREF, type Mega } from "@/data/site";
import { Logo } from "./Logo";
import { Icon, cx } from "./ui";
import { FeaturedCard, MegaItem } from "./menu-parts";

function Band({ children }: { children: string }) {
  return <p className="border-y border-line bg-subtle px-5 py-2.5 text-xs font-semibold uppercase tracking-[1px] text-ink-2">{children}</p>;
}

function Level({ m, onNav }: { m: Mega; onNav: () => void }) {
  const groups = [...m.columns.flat(), ...(m.side ? [m.side] : [])];
  return (
    <div>
      <h2 className="font-display px-5 pb-3 pt-5 text-[28px] leading-8 text-ink">{m.label}</h2>
      {groups.map((g) => (
        <div key={g.label}>
          <Band>{g.label}</Band>
          <div className="flex flex-col p-2">
            {g.items.map((it) => <MegaItem key={it.href + it.title} it={it} onNav={onNav} v2 />)}
          </div>
        </div>
      ))}
      {m.textLinks && (
        <div>
          <Band>{m.textLinks.label}</Band>
          <div className="flex flex-col p-2">
            {m.textLinks.links.map((l) => (
              <Link key={l.href} href={l.href} onClick={onNav} className="press flex min-h-11 items-center rounded-xl px-3 text-sm text-ink active:bg-white">{l.title}</Link>
            ))}
          </div>
        </div>
      )}
      <Band>Featured</Band>
      <div className="px-5 pb-6 pt-4"><FeaturedCard f={m.featured} onNav={onNav} /></div>
    </div>
  );
}

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);
  const [level, setLevel] = useState<string | null>(null);
  const [lastLevel, setLastLevel] = useState<string | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);

  // mount → animate in; animate out → unmount
  useEffect(() => {
    if (open) {
      setMounted(true);
      const r = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
      return () => cancelAnimationFrame(r);
    }
    setShown(false);
    const t = setTimeout(() => { setMounted(false); setLevel(null); }, 260);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>("a[href],button:not([disabled])");
        const vis = [...f].filter((el) => el.offsetParent !== null);
        if (!vis.length) return;
        const first = vis[0], last = vis[vis.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", onKey); };
  }, [mounted, onClose]);

  useEffect(() => {
    if (shown) panel.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
  }, [shown, level]);

  if (!mounted) return null;
  const go = (k: string | null) => {
    if (k) setLastLevel(k);
    setLevel(k);
    body.current?.scrollTo({ top: 0 });
  };
  const sub = MEGA.find((m) => m.key === (level ?? lastLevel));

  return (
    <div className="fixed inset-0 z-[70] lg:hidden" id="mobile-menu">
      <div aria-hidden="true" onClick={onClose} className={cx("absolute inset-0 bg-navy/40 transition-opacity duration-[250ms] ease-out", shown ? "opacity-100" : "opacity-0")} />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cx("absolute inset-0 flex flex-col bg-page transition-transform duration-[250ms] ease-out motion-reduce:transition-none", shown ? "translate-x-0" : "translate-x-full")}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line pl-5 pr-4">
          {level ? (
            <button type="button" data-autofocus onClick={() => go(null)} className="press flex min-h-11 items-center gap-1 text-sm font-medium text-teal-text">
              <Icon name="Chevron Down" size={20} className="rotate-90" /> Main menu
            </button>
          ) : (
            <span className="origin-left scale-[0.78]"><Logo /></span>
          )}
          <button type="button" aria-label="Close menu" data-autofocus={level ? undefined : true} onClick={onClose} className="press flex size-11 items-center justify-center rounded-lg">
            <Icon name="Close" size={24} />
          </button>
        </div>

        <div ref={body} className="relative flex-1 overflow-x-hidden overflow-y-auto">
          <div className="flex w-[200%] transition-transform duration-300 ease-in-out motion-reduce:transition-none" style={{ transform: level ? "translateX(-50%)" : "translateX(0)" }}>
            <nav aria-label="Main" className="w-1/2" aria-hidden={!!level} inert={!!level}>
              {MEGA.map((m) => (
                <button key={m.key} type="button" onClick={() => go(m.key)} className="press flex w-full items-center justify-between border-b border-line px-5 py-[18px] text-[15px] font-semibold text-ink active:bg-white">
                  {m.label}
                  <Icon name="Chevron Down" size={20} className="-rotate-90" />
                </button>
              ))}
              <Link href="/pricing" onClick={onClose} className="press flex w-full items-center border-b border-line px-5 py-[18px] text-[15px] font-semibold text-ink active:bg-white">Pricing</Link>
            </nav>
            <div className="w-1/2" aria-hidden={!level} inert={!level}>
              {sub && <Level m={sub} onNav={onClose} />}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-3 border-t border-line bg-page px-5 pb-6 pt-4">
          <div className="grid grid-cols-2 gap-3">
            <Link href="/login" onClick={onClose} className="press flex h-11 items-center justify-center rounded-lg border border-navy text-sm font-semibold text-ink active:bg-navy active:text-cream">Log In</Link>
            <Link href="/contact" onClick={onClose} className="press flex h-11 items-center justify-center rounded-lg border border-navy text-sm font-semibold text-ink active:bg-navy active:text-cream">Contact</Link>
          </div>
          <Link href={DEMO_HREF} onClick={onClose} className="press flex h-11 items-center justify-center rounded-lg bg-teal text-sm font-semibold text-ink active:bg-[#13a382]">Request a Demo</Link>
        </div>
      </div>
    </div>
  );
}
