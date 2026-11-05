"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MEGA, DEMO_HREF, type Mega } from "@/data/site";
import { FeaturedCard, GroupLabel, MegaItem } from "./menu-parts";
import { Logo } from "./Logo";
import { Button, Icon, cx } from "./ui";
import { MobileMenu } from "./MobileMenu";

function MegaPanel({ m, onNav }: { m: Mega; onNav: () => void }) {
  return (
    <div className={cx("fade-in flex overflow-hidden border border-line bg-white shadow-lg", m.width === "full" ? "w-full" : "w-[760px]")}>
      <div className="flex flex-1 gap-6 p-8">
        {m.columns.map((col, ci) => (
          <div key={ci} className="flex flex-1 flex-col gap-6">
            {col.map((g) => (
              <div key={g.label} className="flex flex-col gap-2">
                <GroupLabel>{g.label}</GroupLabel>
                {g.items.map((it) => <MegaItem key={it.href + it.title} it={it} onNav={onNav} />)}
              </div>
            ))}
          </div>
        ))}
        {m.textLinks && (
          <div className="flex w-[200px] flex-col gap-2">
            <GroupLabel>{m.textLinks.label}</GroupLabel>
            <div className="flex flex-col gap-1">
              {m.textLinks.links.map((l) => (
                <Link key={l.href} href={l.href} onClick={onNav} className="rounded-xl px-3 py-2 text-sm leading-[22px] text-ink transition-colors duration-150 hover:bg-page">{l.title}</Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex w-[312px] shrink-0 flex-col gap-6 bg-page p-8">
        {m.side && (
          <div className="flex flex-col gap-2">
            <GroupLabel>{m.side.label}</GroupLabel>
            {m.side.items.map((it) => <MegaItem key={it.href} it={it} onNav={onNav} v2 />)}
          </div>
        )}
        <div className="flex flex-col gap-2">
          <GroupLabel>Featured</GroupLabel>
          <FeaturedCard f={m.featured} onNav={onNav} />
        </div>
      </div>
    </div>
  );
}

function activeKey(path: string) {
  if (path.startsWith("/products")) return "products";
  if (path.startsWith("/solutions")) return "solutions";
  if (path.startsWith("/resources")) return "resources";
  if (["/about", "/partners", "/investors", "/careers"].some((p) => path.startsWith(p))) return "about";
  return "";
}

const OPEN_DELAY = 300; // design: 0.3–0.5s hover open delay
const CLOSE_GRACE = 500; // design: 0.5s close grace

export function Nav() {
  const path = usePathname() || "/";
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  useEffect(() => {
    clearTimers();
    setOpen(null);
    setMobile(false);
  }, [path]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        triggers.current[open]?.focus();
        setOpen(null);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const act = activeKey(path);
  /** Hover: open after a short delay (or instantly if a menu is already open, so moving between triggers feels direct). */
  const hoverOpen = (k: string) => {
    clearTimers();
    if (open) return setOpen(k);
    openTimer.current = setTimeout(() => setOpen(k), OPEN_DELAY);
  };
  const keep = () => clearTimers();
  const hoverClose = () => {
    clearTimers();
    closeTimer.current = setTimeout(() => setOpen(null), CLOSE_GRACE);
  };
  const navLink = (href: string, label: string) => (
    <Link
      href={href}
      onMouseEnter={hoverClose}
      className={cx("rounded-lg px-3 py-2 text-[15px] font-medium leading-5 transition-colors duration-150 hover:bg-page", path === href ? "text-teal-text" : "text-ink")}
    >
      {label}
    </Link>
  );
  const current = MEGA.find((m) => m.key === open);

  return (
    <header ref={ref} className="sticky top-0 z-50 border-b border-line bg-white" onMouseLeave={hoverClose}>
      <div className="flex h-[69px] items-center justify-between gap-6 px-5 lg:h-[77px] lg:px-[var(--page-x)]">
        <span className="origin-left scale-[0.78] lg:scale-100"><Logo /></span>
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {MEGA.map((m) => (
            <button
              key={m.key}
              ref={(el) => { triggers.current[m.key] = el; }}
              type="button"
              aria-expanded={open === m.key}
              aria-haspopup="true"
              onMouseEnter={() => hoverOpen(m.key)}
              onFocus={() => { clearTimers(); }}
              onClick={() => { clearTimers(); setOpen(open === m.key ? null : m.key); }}
              onKeyDown={(e) => { if (e.key === "ArrowDown") { e.preventDefault(); setOpen(m.key); } }}
              className={cx(
                "flex items-center gap-1 rounded-lg px-3 py-2 text-[15px] font-medium leading-5 transition-colors duration-150 hover:bg-page",
                act === m.key || open === m.key ? "text-teal-text" : "text-ink",
              )}
            >
              {m.label}
              <Icon name="Chevron Down" size={16} className={cx("transition-transform duration-150", open === m.key && "rotate-180")} />
            </button>
          ))}
          {navLink("/pricing", "Pricing")}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          {navLink("/contact", "Contact")}
          {navLink("/login", "Log In")}
          <span onMouseEnter={hoverClose}><Button href={DEMO_HREF}>Request a Demo</Button></span>
        </div>
        <button ref={menuBtn} type="button" className="press -mr-2 flex size-11 items-center justify-center rounded-lg lg:hidden" aria-label="Open menu" aria-expanded={mobile} aria-controls="mobile-menu" onClick={() => setMobile(true)}>
          <Icon name="Menu" size={24} />
        </button>
      </div>

      {current && (
        <div className="absolute inset-x-0 top-full hidden lg:block" onMouseEnter={keep}>
          <div className={cx("wrap", current.width === "narrow" && "flex justify-center")}>
            <MegaPanel m={current} onNav={() => setOpen(null)} />
          </div>
        </div>
      )}
      {current && <div aria-hidden="true" className="fade-in fixed inset-x-0 bottom-0 top-[77px] -z-10 hidden bg-navy/20 lg:block" onMouseEnter={hoverClose} />}

      <MobileMenu open={mobile} onClose={() => { setMobile(false); menuBtn.current?.focus(); }} />
    </header>
  );
}
