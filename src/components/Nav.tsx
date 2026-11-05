"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MEGA, DEMO_HREF, type Mega, type MenuItem } from "@/data/site";
import { Logo } from "./Logo";
import { Button, Icon, IconChip, cx } from "./ui";

function MegaItem({ it, onNav }: { it: MenuItem; onNav: () => void }) {
  return (
    <Link href={it.href} onClick={onNav} className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-page focus-visible:bg-page">
      <IconChip icon={it.icon} round={false} size={40} iconSize={24} />
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="text-sm font-semibold leading-5 text-ink">{it.title}</span>
        <span className="text-sm leading-[22px] text-ink-2">{it.body}</span>
      </span>
    </Link>
  );
}

function GroupLabel({ children }: { children: string }) {
  return <p className="pl-3 t-eyebrow text-ink-3">{children}</p>;
}

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
                <Link key={l.href} href={l.href} onClick={onNav} className="rounded-xl px-3 py-2 text-sm leading-[22px] text-ink hover:bg-page">{l.title}</Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex w-[312px] shrink-0 flex-col gap-6 bg-page p-8">
        {m.side && (
          <div className="flex flex-col gap-2">
            <GroupLabel>{m.side.label}</GroupLabel>
            {m.side.items.map((it) => <MegaItem key={it.href} it={it} onNav={onNav} />)}
          </div>
        )}
        <div className="flex flex-col gap-2">
          <GroupLabel>Featured</GroupLabel>
          <Link href={m.featured.href} onClick={onNav} className="group flex flex-col gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={m.featured.image} alt="" className="h-32 w-full rounded-xl object-cover" />
            <span className="flex flex-col gap-1">
              <span className="text-sm font-semibold leading-5 text-ink">{m.featured.title}</span>
              <span className="text-xs leading-[18px] text-ink-2">{m.featured.body}</span>
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-teal-text group-hover:underline underline-offset-4">
              {m.featured.link} <Icon name="Arrow Right" size={16} />
            </span>
          </Link>
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

export function Nav() {
  const path = usePathname() || "/";
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
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

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  const act = activeKey(path);
  const enter = (k: string) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setOpen(k);
  };
  const leave = () => {
    hoverTimer.current = setTimeout(() => setOpen(null), 120);
  };
  const navLink = (href: string, label: string) => (
    <Link
      href={href}
      className={cx("rounded-lg px-3 py-2 text-[15px] font-medium leading-5 transition-colors hover:bg-page", path === href ? "text-teal-text" : "text-ink")}
    >
      {label}
    </Link>
  );
  const current = MEGA.find((m) => m.key === open);

  return (
    <header ref={ref} className="sticky top-0 z-50 border-b border-line bg-white" onMouseLeave={leave}>
      <div className="wrap flex h-[77px] items-center justify-between gap-6 !max-w-none lg:!px-[var(--page-x)]">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {MEGA.map((m) => (
            <button
              key={m.key}
              ref={(el) => { triggers.current[m.key] = el; }}
              type="button"
              aria-expanded={open === m.key}
              aria-haspopup="true"
              onMouseEnter={() => enter(m.key)}
              onClick={() => setOpen(open === m.key ? null : m.key)}
              className={cx(
                "flex items-center gap-1 rounded-lg px-3 py-2 text-[15px] font-medium leading-5 transition-colors hover:bg-page",
                act === m.key || open === m.key ? "text-teal-text" : "text-ink",
              )}
            >
              {m.label}
              <Icon name="Chevron Down" size={16} className={cx("transition-transform duration-150", open === m.key && "rotate-180")} />
            </button>
          ))}
          <span onMouseEnter={() => setOpen(null)}>{navLink("/pricing", "Pricing")}</span>
        </nav>
        <div className="hidden items-center gap-2 lg:flex" onMouseEnter={() => setOpen(null)}>
          {navLink("/contact", "Contact")}
          {navLink("/login", "Log In")}
          <Button href={DEMO_HREF}>Request a Demo</Button>
        </div>
        <button type="button" className="rounded-lg p-2 lg:hidden" aria-label={mobile ? "Close menu" : "Open menu"} aria-expanded={mobile} onClick={() => setMobile(!mobile)}>
          <Icon name={mobile ? "Close" : "Menu"} size={24} />
        </button>
      </div>

      {current && (
        <div className={cx("absolute inset-x-0 top-full hidden lg:block")} onMouseEnter={() => enter(current.key)}>
          <div className={cx("wrap", current.width === "narrow" && "flex justify-center")}>
            <MegaPanel m={current} onNav={() => setOpen(null)} />
          </div>
        </div>
      )}
      {current && <div aria-hidden="true" className="fixed inset-x-0 bottom-0 top-[77px] -z-10 hidden bg-navy/20 lg:block" onMouseEnter={() => setOpen(null)} />}

      {mobile && (
        <div className="fixed inset-x-0 bottom-0 top-[77px] overflow-y-auto bg-white lg:hidden">
          <div className="flex flex-col gap-1 p-4">
            {MEGA.map((m) => (
              <div key={m.key} className="border-b border-line">
                <button type="button" aria-expanded={mobileSection === m.key} onClick={() => setMobileSection(mobileSection === m.key ? null : m.key)} className="flex w-full items-center justify-between py-4 text-base font-semibold text-ink">
                  {m.label}
                  <Icon name="Chevron Down" size={20} className={cx("transition-transform", mobileSection === m.key && "rotate-180")} />
                </button>
                {mobileSection === m.key && (
                  <div className="flex flex-col gap-4 pb-4">
                    {[...m.columns.flat(), ...(m.side ? [m.side] : [])].map((g) => (
                      <div key={g.label} className="flex flex-col gap-1">
                        <GroupLabel>{g.label}</GroupLabel>
                        {g.items.map((it) => <MegaItem key={it.href + it.title} it={it} onNav={() => setMobile(false)} />)}
                      </div>
                    ))}
                    {m.textLinks && (
                      <div className="flex flex-col gap-1">
                        <GroupLabel>{m.textLinks.label}</GroupLabel>
                        {m.textLinks.links.map((l) => <Link key={l.href} href={l.href} className="rounded-xl px-3 py-2 text-sm text-ink">{l.title}</Link>)}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            <Link href="/pricing" className="border-b border-line py-4 text-base font-semibold text-ink">Pricing</Link>
            <Link href="/contact" className="border-b border-line py-4 text-base font-semibold text-ink">Contact</Link>
            <div className="flex flex-col gap-3 pt-6">
              <Button href={DEMO_HREF}>Request a Demo</Button>
              <Button href="/login" variant="ghost">Log In</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
