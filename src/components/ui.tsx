import Link from "next/link";
import {
  ArrowLeftRight, ArrowRight, ArrowUpRight, BookOpen, Briefcase, Building, Calculator, Calendar, ChartLine, ChartPie, Check,
  ChevronDown, Clock, Code, CreditCard, Info, Landmark, Layers, LayoutGrid, Lightbulb, Mail, Menu, Package, Plug, Receipt,
  ScanEye, Shield, ShoppingCart, Sparkles, Target, Terminal, TrendingUp, Users, Wallet, X, type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { CtaArt } from "./CtaArt";

const ICONS: Record<string, LucideIcon> = {
  "Arrow Left Right": ArrowLeftRight, "Arrow Right": ArrowRight, "Arrow Up Right": ArrowUpRight, "Book Open": BookOpen,
  Briefcase, Building, Calculator, Calendar, "Chart Line": ChartLine, "Chart Pie": ChartPie, Check, "Chevron Down": ChevronDown,
  Clock, Code, "Credit Card": CreditCard, Info, Landmark, Layers, "Layout Grid": LayoutGrid, Lightbulb, Mail, Menu, Package,
  Plug, Receipt, "Scan Eye": ScanEye, Shield, "Shopping Cart": ShoppingCart, Sparkles, Target, Terminal, "Trending Up": TrendingUp,
  Users, Wallet, Close: X,
};

/** Icons drawn in the design that are not in the lucide set (24px, 1.5 stroke, exported from Figma). */
const CUSTOM_ICONS: Record<string, string> = {
  "Bank Check": "M8.5 14.5L11 17L15.5 12.5M18 18V11M3 22H21M6 18V11M11.12 2.198C11.3944 2.06471 11.6957 1.99595 12.0007 1.99699C12.3058 1.99803 12.6065 2.06884 12.88 2.204L20.746 6.051C21.222 6.284 21.056 7 20.526 7H3.47401C2.94401 7 2.77901 6.284 3.25401 6.051L11.12 2.198Z",
  Shop: "M4 12C3.46957 12 2.96086 11.7893 2.58579 11.4142C2.21071 11.0391 2 10.5304 2 10V7L6.41 2.59C6.59606 2.40283 6.81732 2.25434 7.06103 2.15308C7.30474 2.05182 7.56609 1.99979 7.83 2H16.17C16.4339 1.99979 16.6953 2.05182 16.939 2.15308C17.1827 2.25434 17.4039 2.40283 17.59 2.59L22 7V10C22 10.5304 21.7893 11.0391 21.4142 11.4142C21.0391 11.7893 20.5304 12 20 12M2 7H22M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H9M4 12C4.58426 11.9678 5.14227 11.7467 5.59 11.37C5.70932 11.2838 5.85279 11.2374 6 11.2374C6.14721 11.2374 6.29068 11.2838 6.41 11.37C6.85773 11.7467 7.41574 11.9678 8 12C8.58426 11.9678 9.14227 11.7467 9.59 11.37C9.70932 11.2838 9.85279 11.2374 10 11.2374C10.1472 11.2374 10.2907 11.2838 10.41 11.37C10.8577 11.7467 11.4157 11.9678 12 12C12.5843 11.9678 13.1423 11.7467 13.59 11.37C13.7093 11.2838 13.8528 11.2374 14 11.2374C14.1472 11.2374 14.2907 11.2838 14.41 11.37C14.8577 11.7467 15.4157 11.9678 16 12C16.5843 11.9678 17.1423 11.7467 17.59 11.37C17.7093 11.2838 17.8528 11.2374 18 11.2374C18.1472 11.2374 18.2907 11.2838 18.41 11.37C18.8577 11.7467 19.4157 11.9678 20 12M9 22H15M9 22V18C9 17.4696 9.21071 16.9609 9.58579 16.5858C9.96086 16.2107 10.4696 16 11 16H13C13.5304 16 14.0391 16.2107 14.4142 16.5858C14.7893 16.9609 15 17.4696 15 18V22M15 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12",
  Fuel: "M3 22H15M4 9H14M14 22V4C14 3.46957 13.7893 2.96086 13.4142 2.58579C13.0391 2.21071 12.5304 2 12 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V22M14 13H16C16.5304 13 17.0391 13.2107 17.4142 13.5858C17.7893 13.9609 18 14.4696 18 15V17C18 17.5304 18.2107 18.0391 18.5858 18.4142C18.9609 18.7893 19.4696 19 20 19C20.5304 19 21.0391 18.7893 21.4142 18.4142C21.7893 18.0391 22 17.5304 22 17V9.83C22.0002 9.56609 21.9482 9.30474 21.8469 9.06103C21.7457 8.81732 21.5972 8.59606 21.41 8.41L18 5",
};

export function Icon({ name, size = 24, className = "" }: { name: string; size?: number; className?: string }) {
  const d = CUSTOM_ICONS[name];
  if (d)
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d={d} />
      </svg>
    );
  const C = ICONS[name] ?? Sparkles;
  return <C size={size} strokeWidth={1.5} className={className} aria-hidden="true" />;
}

export function cx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

/* ---------- Buttons ---------- */
type BtnVariant = "primary" | "secondary" | "ghost" | "link" | "ghost-light" | "link-light" | "on-teal";
const BTN: Record<BtnVariant, string> = {
  primary: "bg-teal text-ink hover:bg-[#13a382]",
  secondary: "bg-navy text-cream hover:bg-[#2f2e5c]",
  ghost: "border border-navy text-ink hover:bg-navy hover:text-cream",
  "ghost-light": "border border-cream text-cream hover:bg-cream hover:text-ink",
  "on-teal": "bg-navy text-cream hover:bg-[#2f2e5c]",
  link: "text-teal-text hover:underline underline-offset-4 !px-1 !py-0.5 rounded",
  "link-light": "text-teal-bright hover:underline underline-offset-4 !px-1 !py-0.5 rounded",
};

export function Button({
  href = "#", children, variant = "primary", size = "md", icon, className = "", type, onClick,
}: {
  href?: string; children: ReactNode; variant?: BtnVariant; size?: "md" | "sm"; icon?: string; className?: string;
  type?: "submit" | "button"; onClick?: () => void;
}) {
  const cls = cx(
    "press inline-flex items-center justify-center gap-2 font-semibold transition-[color,background-color,border-color,transform] duration-150 rounded-lg",
    variant.startsWith("link") ? "max-w-full text-left" : "whitespace-nowrap",
    size === "md" ? "px-6 py-3 text-base leading-5" : "px-4 py-2 text-sm leading-5",
    BTN[variant],
    className,
  );
  const inner = (
    <>
      {children}
      {icon && <Icon name={icon} size={variant.startsWith("link") && size === "sm" ? 16 : 20} />}
    </>
  );
  if (type) return <button type={type} onClick={onClick} className={cls}>{inner}</button>;
  return <Link href={href} className={cls}>{inner}</Link>;
}

/* ---------- Text ---------- */
export function Eyebrow({ children, dark, dot = "amber", className = "" }: { children: ReactNode; dark?: boolean; dot?: "amber" | "navy"; className?: string }) {
  return (
    <div className={cx("t-eyebrow", dark ? "text-cream" : "text-ink", className)}>
      <span aria-hidden="true" className={cx("mr-2 inline-block size-1.5 rounded-full align-[2px]", dot === "amber" ? "bg-amber" : "bg-navy")} />
      {children}
    </div>
  );
}

export function SectionHeader({
  eyebrow, title, body, align = "left", level = "section", dark, className = "", as = "h2", bodyClass = "",
}: {
  eyebrow?: ReactNode; title: ReactNode; body?: ReactNode; align?: "left" | "center"; level?: "section" | "page";
  dark?: boolean; className?: string; as?: "h1" | "h2"; bodyClass?: string;
}) {
  const H = as;
  return (
    <div className={cx("flex flex-col gap-4 max-w-[720px]", align === "center" && "items-center text-center mx-auto", className)}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <H className={cx(level === "page" ? "t-h1" : "t-h2", dark ? "text-cream" : "text-ink")}>{title}</H>
      {body && <p className={cx("t-lead", dark ? "text-mist" : "text-ink-2", bodyClass)}>{body}</p>}
    </div>
  );
}

/* ---------- Chips & badges ---------- */
export type Tone = "teal" | "amber" | "neutral";
export function Badge({ tone = "teal", children, className = "", style }: { tone?: Tone; children: ReactNode; className?: string; style?: React.CSSProperties }) {
  const t = tone === "teal" ? "bg-teal-chip text-ink" : tone === "amber" ? "bg-amber-chip text-ink" : "bg-subtle text-ink-2";
  return <span style={style} className={cx("inline-flex shrink-0 items-center rounded-full px-3 py-1 t-eyebrow whitespace-nowrap", t, className)}>{children}</span>;
}

export function IconChip({
  icon, size = 40, iconSize, round = true, tone = "teal", className = "",
}: { icon: string; size?: number; iconSize?: number; round?: boolean; tone?: "teal" | "dark" | "navy" | "success" | "warning" | "darkSuccess" | "darkWarning"; className?: string }) {
  const bg = {
    teal: "bg-teal-chip text-teal-text",
    dark: "bg-navy-raised text-teal-bright",
    navy: "bg-navy text-teal-bright",
    success: "bg-teal-tint text-teal-text",
    warning: "bg-amber-tint text-amber-text",
    darkSuccess: "bg-[#00261c] text-teal-bright",
    darkWarning: "bg-[#2e1b00] text-amber",
  }[tone];
  return (
    <span className={cx("inline-flex items-center justify-center shrink-0", round ? "rounded-full" : "rounded-xl", bg, className)} style={{ width: size, height: size }}>
      <Icon name={icon} size={iconSize ?? Math.round(size / 2)} />
    </span>
  );
}

/* ---------- Cards ---------- */
export function ProductTile({ icon, title, body, link, href, badge }: { icon: string; title: string; body: string; link: string; href: string; badge?: string }) {
  return (
    <Link href={href} className="card-lift group flex flex-col gap-4 rounded-2xl border border-line bg-white p-5 shadow-sm md:p-6">
      <div className="flex items-start justify-between gap-3">
        <IconChip icon={icon} round={false} />
        {badge && <Badge tone="amber">{badge}</Badge>}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg leading-6 font-semibold text-ink">{title}</h3>
        <p className="text-sm leading-[22px] text-ink-2">{body}</p>
      </div>
      <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold leading-5 text-teal-text group-hover:underline underline-offset-4">
        {link}
        <Icon name="Arrow Right" size={16} className="shrink-0" />
      </span>
    </Link>
  );
}

export function FeatureCard({ icon, title, body, highlight }: { icon: string; title: string; body: string; highlight?: boolean }) {
  return (
    <div className={cx("card-lift flex flex-col gap-5 rounded-2xl p-6 md:gap-6 md:p-8", highlight ? "bg-navy" : "bg-white")}>
      <IconChip icon={icon} size={48} tone={highlight ? "dark" : "teal"} />
      <div className="flex flex-col gap-3">
        <h3 className={cx("t-h3", highlight ? "text-cream" : "text-ink")}>{title}</h3>
        <p className={cx("text-sm leading-[22px]", highlight ? "text-mist" : "text-ink-2")}>{body}</p>
      </div>
    </div>
  );
}

export function Stat({ value, label, dark }: { value: string; label: string; dark?: boolean }) {
  return (
    <div className="flex flex-col gap-2 border-l-2 border-amber pl-5 md:pl-6">
      <span className={cx("t-stat", dark ? "text-cream" : "text-ink")}>{value}</span>
      <span className={cx("text-sm leading-[22px]", dark ? "text-mist" : "text-ink-2")}>{label}</span>
    </div>
  );
}

export function ImageCard({ image, alt, title, body, link, href }: { image: string; alt: string; title: string; body: string; link: string; href: string }) {
  return (
    <Link href={href} className="card-lift group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt={alt} className="h-60 w-full object-cover" loading="lazy" />
      <div className="flex flex-col gap-3 p-6">
        <h3 className="t-h3 text-ink">{title}</h3>
        <p className="text-sm leading-[22px] text-ink-2">{body}</p>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-teal-text group-hover:underline underline-offset-4">
          {link} <Icon name="Arrow Right" size={16} />
        </span>
      </div>
    </Link>
  );
}

/* ---------- Illustration mini card (sample-data card) ---------- */
export type MiniRow = { label: string; value?: string; badge?: [Tone, string]; bar?: number; warn?: boolean };
export type MiniCardData = { title: string; badge?: [Tone, string]; rows: MiniRow[] };

export function MiniCard({ data, dark, className = "" }: { data: MiniCardData; dark?: boolean; className?: string }) {
  const line = dark ? "border-navy-raised" : "border-line";
  return (
    <div aria-hidden="true" className={cx("illus flex w-full min-w-0 max-w-[420px] flex-col rounded-2xl border px-4 py-5 min-[360px]:px-5 sm:px-6", dark ? "bg-navy-raised border-navy-raised" : "bg-white border-line", className)}>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 pb-3">
        <span className={cx("min-w-0 text-[13px] font-semibold leading-5 sm:text-sm", dark ? "text-cream" : "text-ink")}>{data.title}</span>
        {data.badge && <Badge tone={data.badge[0]} className="shrink-0">{data.badge[1]}</Badge>}
      </div>
      {data.rows.map((r, i) =>
        r.bar !== undefined ? (
          <div key={i} className={cx("flex flex-col gap-2 border-t py-3", line)}>
            <div className="flex items-center justify-between gap-3">
              <span className={cx("min-w-0 text-xs leading-[18px]", dark ? "text-mist" : "text-ink-2")}>{r.label}</span>
              <span className={cx("shrink-0 whitespace-nowrap text-sm font-medium leading-5", r.warn ? "text-amber-text" : dark ? "text-cream" : "text-ink")}>{r.value}</span>
            </div>
            <div className={cx("h-2 w-full rounded-full", dark ? "bg-navy" : "bg-subtle")}>
              <div className={cx("h-2 rounded", r.warn ? "bg-amber-text" : "bg-teal")} style={{ width: `${r.bar * 100}%` }} />
            </div>
          </div>
        ) : (
          // On narrow cards the value + badge wrap to their own right-aligned line instead of crushing the label.
          <div key={i} className={cx("flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t py-3", line)}>
            <span className={cx("min-w-20 flex-1 text-xs leading-[18px]", dark ? "text-mist" : "text-ink-2")}>{r.label}</span>
            {(r.value || r.badge) && (
              <span className="ml-auto flex shrink-0 items-center gap-2 min-[360px]:gap-3">
                {r.value && <span className={cx("whitespace-nowrap text-[13px] font-medium leading-5 text-right min-[360px]:text-sm", r.warn ? "text-amber-text" : dark ? "text-cream" : "text-ink")}>{r.value}</span>}
                {r.badge && <Badge tone={r.badge[0]}>{r.badge[1]}</Badge>}
              </span>
            )}
          </div>
        ),
      )}
    </div>
  );
}

/* ---------- Toast snippet ---------- */
export function Toast({ icon, tone, title, body, dark, className = "" }: { icon: string; tone: "ai" | "success" | "warning"; title: string; body: string; dark?: boolean; className?: string }) {
  const chip = dark
    ? tone === "success" ? "darkSuccess" : tone === "warning" ? "darkWarning" : "dark"
    : tone === "success" ? "success" : tone === "warning" ? "warning" : "teal";
  return (
    <div aria-hidden="true" className={cx("illus flex max-w-full items-center gap-2.5 rounded-2xl border p-3 min-[360px]:gap-3 min-[360px]:p-4", dark ? "bg-navy-raised border-navy-raised" : "bg-white border-line", className)} style={{ boxShadow: "var(--shadow-float)" }}>
      <IconChip icon={icon} size={36} iconSize={20} tone={chip as never} className="shrink-0" />
      <div className="flex min-w-0 flex-col gap-1">
        <span className={cx("text-sm font-semibold leading-5", dark ? "text-cream" : "text-ink")}>{title}</span>
        <span className={cx("text-xs leading-4", dark ? "text-muted-dark" : "text-ink-3")}>{body}</span>
      </div>
    </div>
  );
}

/* ---------- CTA band ---------- */
export type CtaTone = "navy" | "teal" | "amber" | "mint";
/**
 * CTA band (Figma component 442:16839): Navy / Teal / Amber / Mint.
 * Art is the component's own exported artwork (glow, orbit, textured inner orbit, accent bar),
 * placed at the component's coordinates on desktop and scaled to 280px bottom-right on mobile.
 * Pass `children` instead of buttons to use the band's email-capture slot.
 */
export function CtaBand({
  tone = "navy", eyebrow, title, body, primary = { label: "Request a Demo", href: "/request-demo" }, secondary, children, image = "73fee244",
}: {
  tone?: CtaTone; eyebrow?: string; title: string; body?: string; primary?: { label: string; href: string }; secondary?: { label: string; href: string }; children?: ReactNode; image?: string;
}) {
  const dark = tone === "navy";
  const bg = { navy: "bg-navy", teal: "bg-teal", amber: "bg-amber", mint: "bg-teal-tint" }[tone];
  const bodyC = dark ? "text-mist" : tone === "mint" ? "text-ink-2" : "text-ink";
  return (
    <section className="md:py-20">
      <div className="mx-auto w-full max-w-[calc(1248px+2*var(--page-x))] md:px-[var(--page-x)]">
        <div className={cx("relative overflow-hidden px-5 py-16 md:rounded-3xl md:p-16", bg)}>
          <CtaArt tone={tone} image={image} className="pointer-events-none absolute -bottom-[174px] -right-[174px] size-[348px] max-w-none select-none lg:-right-[165px] lg:-top-[110px] lg:bottom-auto lg:size-[560px]" />
          <div className="relative flex max-w-[720px] flex-col gap-6">
            {eyebrow && <Eyebrow dark={dark} dot={tone === "teal" || tone === "amber" ? "navy" : "amber"}>{eyebrow}</Eyebrow>}
            <h2 className={cx("t-h1", dark ? "text-cream" : "text-ink")}>{title}</h2>
            {body && <p className={cx("t-lead", bodyC)}>{body}</p>}
            {children ?? (
              <div className="flex flex-wrap gap-4">
                <Button href={primary.href} variant={dark || tone === "mint" ? "primary" : "on-teal"} icon="Arrow Up Right">{primary.label}</Button>
                {secondary && <Button href={secondary.href} variant={dark ? "ghost-light" : "ghost"}>{secondary.label}</Button>}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
