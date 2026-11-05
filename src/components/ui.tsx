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

export function Icon({ name, size = 24, className = "" }: { name: string; size?: number; className?: string }) {
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
    "press inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap transition-[color,background-color,border-color,transform] duration-150 rounded-lg",
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
    <div className={cx("flex items-center gap-2", className)}>
      <span className={cx("size-1.5 rounded-full shrink-0", dot === "amber" ? "bg-amber" : "bg-navy")} />
      <span className={cx("t-eyebrow", dark ? "text-cream" : "text-ink")}>{children}</span>
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
  return <span style={style} className={cx("inline-flex items-center rounded-full px-3 py-1 t-eyebrow whitespace-nowrap", t, className)}>{children}</span>;
}

export function IconChip({
  icon, size = 40, iconSize, round = true, tone = "teal", className = "",
}: { icon: string; size?: number; iconSize?: number; round?: boolean; tone?: "teal" | "dark" | "navy" | "success" | "warning" | "darkSuccess" | "darkWarning"; className?: string }) {
  const bg = {
    teal: "bg-teal-chip text-ink",
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
export function ProductTile({ icon, title, body, link, href }: { icon: string; title: string; body: string; link: string; href: string }) {
  return (
    <Link href={href} className="card-lift group flex flex-col gap-4 rounded-2xl border border-line bg-white p-5 shadow-sm md:p-6">
      <IconChip icon={icon} round={false} />
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
    <div aria-hidden="true" className={cx("illus flex w-full max-w-[420px] flex-col rounded-2xl border px-6 py-5", dark ? "bg-navy-raised border-navy-raised" : "bg-white border-line", className)}>
      <div className="flex items-center justify-between gap-3 pb-3">
        <span className={cx("text-sm font-semibold leading-5", dark ? "text-cream" : "text-ink")}>{data.title}</span>
        {data.badge && <Badge tone={data.badge[0]}>{data.badge[1]}</Badge>}
      </div>
      {data.rows.map((r, i) =>
        r.bar !== undefined ? (
          <div key={i} className={cx("flex flex-col gap-2 border-t py-3", line)}>
            <div className="flex items-center justify-between gap-3">
              <span className={cx("text-xs leading-[18px]", dark ? "text-mist" : "text-ink-2")}>{r.label}</span>
              <span className={cx("text-sm font-medium leading-5", r.warn ? "text-amber-text" : dark ? "text-cream" : "text-ink")}>{r.value}</span>
            </div>
            <div className={cx("h-2 w-full rounded-full", dark ? "bg-navy" : "bg-subtle")}>
              <div className={cx("h-2 rounded", r.warn ? "bg-amber-text" : "bg-teal")} style={{ width: `${r.bar * 100}%` }} />
            </div>
          </div>
        ) : (
          <div key={i} className={cx("flex items-center gap-3 border-t py-3", line)}>
            <span className={cx("flex-1 text-xs leading-[18px]", dark ? "text-mist" : "text-ink-2")}>{r.label}</span>
            {r.value && <span className={cx("text-sm font-medium leading-5 text-right", r.warn ? "text-amber-text" : dark ? "text-cream" : "text-ink")}>{r.value}</span>}
            {r.badge && <Badge tone={r.badge[0]}>{r.badge[1]}</Badge>}
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
    <div aria-hidden="true" className={cx("illus flex items-center gap-3 rounded-2xl border p-4", dark ? "bg-navy-raised border-navy-raised" : "bg-white border-line", className)} style={{ boxShadow: "var(--shadow-float)" }}>
      <IconChip icon={icon} size={36} iconSize={20} tone={chip as never} />
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
