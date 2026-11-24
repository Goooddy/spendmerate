import { PRODUCTS } from "./site";
import type { MiniCardData, MiniRow, Tone } from "@/components/ui";

/* ---------- Raw JSON shapes (extracted from Figma) ---------- */
export type RawBadge = [string, string];
export type RawRow = [string, (string | 0)?, (RawBadge | 0)?, number?, number?];
export type RawCard = string | { t: string; r: RawRow[] } | { title: string; rows: { label: string; value?: string; badge?: RawBadge; bar?: number; warn?: boolean }[] };
export type Header = { e?: string; t?: string; b?: string; std?: number };

export type HeroData = {
  L: "A" | "B" | "C" | "D"; h: Header;
  txn?: { title: string; sub: string; amount: string; receipt: string; status: string; badges: RawBadge[] };
  ai?: { title: string; rows: string[][] };
  progress?: { label: string; value: string; pct: number };
  points?: string[];
  alerts?: { icon?: string; title: string; body: string; badge?: RawBadge }[];
  img?: string;
  /** Hero button labels when they differ from "Request a Demo" / "Talk to sales". */
  cta?: [string, string?];
};
export type TrustData = { L: "A" | "B" | "C" | "D"; label?: string; std?: number; items?: [string, string][] };
export type Step = { t: string; b: string; snip?: [string, string]; card?: RawCard };
export type HiwData = { L: "A" | "B" | "C" | "D"; h: Header; steps: Step[] };
export type OutData = { L: "A" | "B" | "C" | "D"; h: Header; ah?: Header; items: { l?: string; v: string; b?: string }[]; agents: [string, string, string][] };
export type ProdItem = { i?: string; t: string; b: string; link: string; card?: RawCard };
export type ProdData = { L: "A" | "B" | "C" | "D"; h: Header; items: ProdItem[] };
export type IntData = { L: "A" | "B" | "C" | "D"; h: Header; link?: string; sources: [string, string][]; ledger?: [string, string]; log?: { title: string; rows: [string, string, string, RawBadge][] } };
export type CalcData = { L: "A" | "B" | "C" | "D"; h: Header; items?: [string, string, number][] };
export type FaqData = { h: Header; items: ([string, string] | [string] | { q: string; a: string })[] };
export type CtaData = { tone?: string; e: string; t: string; b?: string; btns: string[]; img?: string };

export type LibraryPage = {
  name: string; hero: HeroData; trust?: TrustData; hiw?: HiwData; out?: OutData; prod?: ProdData; int?: IntData; calc?: CalcData; faq?: FaqData; cta?: CtaData;
  what?: { h: Header; p: string }; feat?: { h: Header; items: [string, string, string][] };
};

/* ---------- Normalisers ---------- */
export function tone(t?: string): Tone {
  if (!t) return "teal";
  const c = t[0].toLowerCase();
  return c === "a" ? "amber" : c === "n" ? "neutral" : "teal";
}
export const badge = (b?: RawBadge | 0): [Tone, string] | undefined => (b ? [tone(b[0]), b[1]] : undefined);

const STD_CARDS: Record<string, MiniCardData> = {
  "Captured today": { title: "Captured today", badge: ["neutral", "Sample data"], rows: [
    { label: "Generator diesel", value: "₦486,000", badge: ["teal", "Receipt"] },
    { label: "Office supplies", value: "₦38,500", badge: ["teal", "Receipt"] },
    { label: "Client lunch · Ikeja", value: "₦62,000", badge: ["teal", "Receipt"] },
  ] },
  "Coding · Generator diesel": { title: "Coding · Generator diesel", badge: ["neutral", "Sample data"], rows: [
    { label: "GL account", value: "6120 · Fuel & power" },
    { label: "Cost centre", value: "Operations" },
    { label: "Tax code", value: "7.5% input VAT" },
    { label: "Policy check", value: "Within limit", badge: ["teal", "Passed"] },
  ] },
  "Needs your decision": { title: "Needs your decision", badge: ["neutral", "Sample data"], rows: [
    { label: "PO-2208 · Lagos", value: "₦1.4M", badge: ["amber", "Over budget"] },
    { label: "Travel · Abuja", value: "₦220,000", badge: ["amber", "No receipt"] },
    { label: "New vendor · Kano Mills", badge: ["amber", "Check details"] },
  ] },
  "October close": { title: "October close", badge: ["neutral", "Sample data"], rows: [
    { label: "Card spend reconciled", badge: ["teal", "Done"] },
    { label: "Supplier payments matched", badge: ["teal", "Done"] },
    { label: "Accruals posted", badge: ["amber", "In progress"] },
    { label: "Ledger locked", badge: ["neutral", "Next"] },
  ] },
  "Spend insights": { title: "Spend insights", badge: ["neutral", "Sample data"], rows: [
    { label: "Fuel spend vs last month", value: "+18%", badge: ["amber", "Review"] },
    { label: "Duplicate subscription", value: "₦45,000", badge: ["amber", "Flagged"] },
    { label: "Vendor price change", value: "Okoro Packaging", badge: ["neutral", "+3%"] },
  ] },
  "Budget vs actual · Q4": { title: "Budget vs actual · Q4", badge: ["neutral", "Sample data"], rows: [
    { label: "Operations", value: "72% used", bar: 0.72 },
    { label: "Sales & marketing", value: "54% used", bar: 0.54 },
    { label: "Admin", value: "91% used", bar: 0.91, warn: true },
  ] },
  "Payables this week": { title: "Payables this week", badge: ["neutral", "Sample data"], rows: [
    { label: "INV-0412 · Okoro Packaging", value: "₦1.2M", badge: ["teal", "Matched"] },
    { label: "INV-0413 · Delta Logistics", value: "₦640,000", badge: ["teal", "Matched"] },
    { label: "INV-0414 · Kano Mills", value: "₦880,000", badge: ["amber", "Price mismatch"] },
  ] },
  "Tax this month": { title: "Tax this month", badge: ["neutral", "Sample data"], rows: [
    { label: "VAT on sales", value: "₦3.4M" },
    { label: "VAT on purchases", value: "₦1.1M" },
    { label: "WHT deducted", value: "₦420,000" },
    { label: "E-invoices accepted", value: "312", badge: ["teal", "On track"] },
  ] },
};

export function card(c?: RawCard): MiniCardData | undefined {
  if (!c) return undefined;
  if (typeof c === "string") return STD_CARDS[c];
  if ("r" in c) {
    const rows: MiniRow[] = c.r.map((r) => ({ label: r[0], value: r[1] || undefined, badge: badge(r[2] || undefined), bar: r[3] || undefined, warn: !!r[4] }));
    return STD_CARDS[c.t] ?? { title: c.t, badge: ["neutral", "Sample data"], rows };
  }
  return { title: c.title, badge: ["neutral", "Sample data"], rows: c.rows.map((r) => ({ ...r, badge: badge(r.badge) })) };
}

/** Product card shown for a product title when a layout needs a visual and the data omitted one. */
export const PRODUCT_CARD: Record<string, string> = {
  spend: "Spend insights", expense: "Spend insights", procurement: "Payables this week", invoice: "Payables this week",
  budget: "Budget vs actual · Q4", revenue: "Payables this week", bank: "Payables this week", payments: "Payables this week", tax: "Tax this month",
  risk: "Needs your decision", ai: "Spend insights", api: "October close",
};

const PRODUCT_ICON: Record<keyof typeof PRODUCTS, string> = {
  spend: "Scan Eye", expense: "Credit Card", procurement: "Shopping Cart", invoice: "Receipt", budget: "Chart Line",
  revenue: "Trending Up", bank: "Bank Check", payments: "Wallet", tax: "Landmark", risk: "Shield", ai: "Sparkles", api: "Plug",
};

export function productKey(title: string): keyof typeof PRODUCTS {
  const t = title.toLowerCase();
  if (t.includes("spend intel")) return "spend";
  if (t.includes("expense")) return "expense";
  if (t.includes("procurement")) return "procurement";
  if (t.includes("invoice")) return "invoice";
  if (t.includes("budget")) return "budget";
  if (t.includes("revenue")) return "revenue";
  if (t.includes("bank recon")) return "bank";
  if (t.includes("payment")) return "payments";
  if (t.includes("tax")) return "tax";
  if (t.includes("risk")) return "risk";
  if (t.includes("ai intelligence") || t.includes("ai layer")) return "ai";
  return "api";
}
export const productHref = (title: string) => PRODUCTS[productKey(title)].href;
export const productIcon = (title: string) => PRODUCT_ICON[productKey(title)];

export const STD_TRUST: [string, string][] = [
  ["Building", "Built on WorkMerate ERP"],
  ["Landmark", "Nigeria Tax Act 2025 rules built in"],
  ["Receipt", "E-invoices sent through the NRS gateway"],
  ["Sparkles", "AI agents for spend, payables and tax"],
];

export const STD_INT_HEADER: Header = {
  e: "Built on WorkMerate",
  t: "One ledger, no re-keying",
  b: "SpendMerate is the finance layer on top of WorkMerate, a customised Odoo ERP. Approvals, payments and filings post to the same books, so there is nothing to export or reconcile between tools.",
};

export const CALC_ITEMS: [string, string, number][] = [
  ["250 transactions a month", "12.5 hrs", 0.125],
  ["500 transactions a month", "25 hrs", 0.25],
  ["1,000 transactions a month", "50 hrs", 0.5],
  ["2,000 transactions a month", "100 hrs", 1],
];
export const CALC_NOTE = "Illustrative estimate: monthly transactions × 3 minutes of manual work. Your own time per transaction will differ.";

export function faqItems(f?: FaqData) {
  if (!f) return [];
  return f.items.map((it) => (Array.isArray(it) ? { q: it[0], a: it[1] ?? "" } : it));
}
