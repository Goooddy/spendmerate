import { Badge, Icon, IconChip, cx } from "./ui";

/* Static illustrations. aria-hidden, no interaction (per design spec). */

export function ApprovalSnippet({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div aria-hidden="true" style={{ boxShadow: "var(--shadow-float)", ...style }} className={cx("illus flex w-[300px] max-w-full flex-col gap-3 rounded-2xl border border-line bg-white p-4", className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs leading-4 text-ink-3">Approval request</span>
        <Badge tone="amber">Pending</Badge>
      </div>
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-amber-chip text-sm font-semibold">TB</span>
        <span className="flex flex-col gap-1">
          <span className="text-sm font-semibold leading-5">Tunde Bello</span>
          <span className="text-xs leading-4 text-ink-3">Office supplies · Lagos HQ</span>
        </span>
      </div>
      <span className="text-[22px] font-semibold leading-7">₦450,000</span>
      <div className="flex gap-2">
        <span className="flex h-8 flex-1 items-center justify-center rounded-lg bg-teal-chip text-sm font-semibold text-teal-deep">Approve</span>
        <span className="flex h-8 flex-1 items-center justify-center rounded-lg bg-subtle text-sm font-semibold text-ink-2">Decline</span>
      </div>
    </div>
  );
}

export function CashFlowSnippet({ dark, className = "" }: { dark?: boolean; className?: string }) {
  const bars = [30, 40, 35, 48, 53, 66];
  const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep"];
  return (
    <div aria-hidden="true" style={{ boxShadow: "var(--shadow-float)" }} className={cx("illus flex w-[320px] max-w-full flex-col gap-3 rounded-2xl border p-4", dark ? "border-navy-raised bg-navy-raised" : "border-line bg-white", className)}>
      <div className="flex justify-between">
        <span className="flex flex-col gap-1">
          <span className={cx("text-xs leading-4", dark ? "text-muted-dark" : "text-ink-3")}>Cash position</span>
          <span className={cx("text-[22px] font-semibold leading-7", dark ? "text-cream" : "text-ink")}>₦84.6M</span>
        </span>
        <span className={cx("text-xs leading-4", dark ? "text-teal-bright" : "text-teal-text")}>+18% vs Q2</span>
      </div>
      <div className="flex h-24 items-end justify-between">
        {bars.map((h, i) => (
          <span key={i} className="flex flex-col items-center gap-1.5">
            <span className={cx("w-7 rounded-t", dark || i === 5 ? "bg-teal" : "bg-teal-chip")} style={{ height: h }} />
            <span className={cx("text-xs leading-4", dark ? "text-muted-dark" : "text-ink-3")}>{months[i]}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function CardSnippet({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" style={{ boxShadow: "var(--shadow-float)" }} className={cx("illus flex w-[300px] max-w-full flex-col gap-3 rounded-2xl border border-line bg-white p-4", className)}>
      <div className="flex h-40 flex-col justify-between rounded-xl bg-navy p-4">
        <div className="flex items-center justify-between">
          <span className="flex items-end gap-0.5">
            <span className="h-2 w-1 bg-cream" />
            <span className="h-3 w-1 bg-teal" />
            <span className="h-4 w-1 bg-amber" />
          </span>
          <span className="text-xs text-mist">Corporate</span>
        </div>
        <div className="flex items-end justify-between">
          <span className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-cream">Amaka Eze</span>
            <span className="text-sm font-medium text-mist">•••• 4821</span>
          </span>
          <span className="text-base font-semibold text-cream">Business</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-ink-2">Monthly limit</span>
        <span className="text-sm font-medium">₦500,000</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-ink-2">Online payments</span>
        <span className="flex h-[18px] w-8 items-center justify-end rounded-full bg-teal-deep p-0.5">
          <span className="size-3.5 rounded-full bg-white" />
        </span>
      </div>
    </div>
  );
}

export function ReceiptSnippet({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" style={{ boxShadow: "var(--shadow-float)" }} className={cx("illus flex w-[300px] max-w-full items-center gap-3 rounded-2xl border border-line bg-white p-4", className)}>
      <span className="flex h-[72px] w-14 items-center justify-center rounded-lg bg-subtle"><Icon name="Receipt" /></span>
      <span className="flex flex-col gap-1">
        <span className="text-sm font-semibold leading-5">Iya Bisi Kitchen, Lekki</span>
        <span className="text-sm font-medium leading-5 text-ink-2">₦18,450 · Meals</span>
        <span className="flex items-center gap-1 text-xs text-teal-text"><Icon name="Check" size={14} /> VAT ₦1,287 auto-captured</span>
      </span>
    </div>
  );
}

export function InvoiceStatusSnippet({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" style={{ boxShadow: "var(--shadow-float)" }} className={cx("illus flex w-[300px] max-w-full flex-col gap-3 rounded-2xl border border-line bg-white p-4", className)}>
      <span className="flex flex-col gap-1">
        <span className="text-sm font-semibold leading-5">E-invoice INV-2026-0142</span>
        <span className="text-xs leading-4 text-ink-3">Adeyemi Logistics Ltd · ₦2,450,000</span>
      </span>
      <div className="flex flex-col gap-2">
        {["Created", "Signed (IRN + QR)", "Submitted to NRS", "Accepted by NRS"].map((s) => (
          <span key={s} className="flex items-center gap-2 text-xs leading-[18px] text-ink-2">
            <span className="flex size-5 items-center justify-center rounded-full bg-teal-tint text-teal-text"><Icon name="Check" size={12} /></span>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export function AiRecSnippet({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cx("illus flex w-[360px] max-w-full gap-3 rounded-2xl border border-navy-raised bg-navy-raised p-4", className)} style={{ boxShadow: "var(--shadow-float)" }}>
      <IconChip icon="Sparkles" size={32} iconSize={18} tone="navy" />
      <span className="flex flex-col gap-1">
        <span className="text-sm font-semibold leading-5 text-cream">AI CFO recommendation</span>
        <span className="text-xs leading-[18px] text-mist">Consolidate 3 overlapping software subscriptions to save about ₦1.2M a quarter.</span>
        <span className="mt-1 inline-flex w-fit items-center gap-1 rounded-full bg-[#013d2f] px-3 py-1 text-xs text-teal-pale">Review <Icon name="Arrow Right" size={14} /></span>
      </span>
    </div>
  );
}

export function DashboardMock() {
  const bars = [75, 93, 72, 105, 87, 99, 78, 111, 90, 123, 102, 135];
  const nav = ["Overview", "Spend", "Approvals", "Invoices & NRS", "Cash flow", "Compliance", "AI agents"];
  return (
    <div aria-hidden="true" className="illus flex h-[580px] w-[960px] flex-col overflow-hidden rounded-2xl md:rounded-3xl border border-line bg-white" style={{ boxShadow: "var(--shadow-lg)" }}>
      <div className="flex items-center gap-2 bg-subtle px-4 py-3">
        {[0, 1, 2].map((i) => <span key={i} className="size-2.5 rounded-full bg-ink-3/60" />)}
        <span className="flex flex-1 justify-center rounded-full bg-white px-4 py-1 text-xs text-ink-3">app.xpensari.com/overview</span>
        <span className="w-[46px]" />
      </div>
      <div className="flex flex-1">
        <div className="flex w-[196px] flex-col gap-1 border-r border-line bg-page p-4">
          <span className="flex items-center gap-1.5 pb-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-mark.svg" alt="" width={19} height={25} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-word.svg" alt="" width={63} height={25} />
          </span>
          {nav.map((n, i) => (
            <span key={n} className={cx("flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs", i === 0 ? "bg-teal-chip text-ink" : "text-ink-2")}>
              <span className={cx("size-3.5 rounded", i === 0 ? "bg-teal-text" : "bg-line")} />
              {n}
            </span>
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-4 p-6">
          <div className="flex flex-col gap-0.5">
            <span className="text-lg font-semibold leading-6">Good morning, Amaka</span>
            <span className="text-xs text-ink-3">Your finance overview for Q3 2026</span>
          </div>
          <div className="flex gap-3">
            {[
              ["Total spend", "₦48.2M", "+4.1% vs Q2", "text-ink-3"],
              ["Potential savings", "₦6.1M", "12 actions found", "text-teal-text"],
              ["Compliance", "98%", "2 filings due", "text-amber-text"],
              ["Cash position", "₦84.6M", "+18% vs Q2", "text-teal-text"],
            ].map(([l, v, s, c]) => (
              <span key={l} className="flex flex-1 flex-col gap-0.5 rounded-xl bg-page p-3">
                <span className="text-xs text-ink-3">{l}</span>
                <span className="text-[22px] font-semibold leading-7">{v}</span>
                <span className={cx("text-xs", c)}>{s}</span>
              </span>
            ))}
          </div>
          <div className="flex flex-1 gap-3">
            <div className="flex flex-1 flex-col gap-3 rounded-xl bg-page p-4">
              <span className="text-sm font-semibold">Spend by month</span>
              <div className="flex flex-1 items-end justify-between">
                {bars.map((h, i) => <span key={i} className={cx("w-[22px] rounded-t", i === 11 ? "bg-teal" : "bg-teal-chip")} style={{ height: h }} />)}
              </div>
            </div>
            <div className="flex w-[260px] flex-col gap-3 rounded-xl bg-page p-4">
              <span className="text-sm font-semibold">Pending approvals</span>
              {[
                ["TB", "Tunde Bello", "Office supplies", "₦450,000"],
                ["NO", "Ngozi Okoro", "Flight · Abuja", "₦186,500"],
                ["KA", "Kemi Adeleke", "Software", "₦92,000"],
              ].map(([a, n, s, v]) => (
                <span key={n} className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-full bg-amber-chip text-xs">{a}</span>
                  <span className="flex flex-1 flex-col">
                    <span className="text-xs">{n}</span>
                    <span className="text-xs text-ink-3">{s}</span>
                  </span>
                  <span className="text-sm font-medium">{v}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
