"use client";
import Link from "next/link";
import { useState } from "react";
import { Badge, Button, FeatureCard, Icon, IconChip, MiniCard, SectionHeader, cx, type CtaTone, CtaBand } from "./ui";
import { EmailCapture } from "./forms";
import { InView, StepBar, d, useStepper } from "./motion";
import { ScaleToFit } from "./ScaleToFit";
import { FaqSection } from "./Accordion";
import {
  CALC_ITEMS, CALC_NOTE, PRODUCT_CARD, STD_INT_HEADER, STD_TRUST, badge, card, faqItems, productHref, productIcon, productKey,
  type CalcData, type Header, type HeroData, type HiwData, type IntData, type LibraryPage, type OutData, type ProdData, type TrustData,
} from "@/data/library";
import { DEMO_HREF } from "@/data/site";

const H = (h?: Header) => h ?? {};

/* ================= HERO ================= */
function HeroCopy({ h, dark, points }: { h: Header; dark?: boolean; points?: string[] }) {
  return (
    <div className="flex w-full max-w-[560px] flex-col gap-6">
      <SectionHeader as="h1" level="page" dark={dark} eyebrow={h.e} title={h.t} body={h.b} />
      {points && (
        <ul className="flex flex-col gap-3">
          {points.map((p) => (
            <li key={p} className="flex items-center gap-3 text-base text-ink">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-teal-chip"><Icon name="Check" size={14} /></span>
              {p}
            </li>
          ))}
        </ul>
      )}
      <EmailCapture dark={dark} />
      <div className="flex flex-wrap items-center gap-2">
        <span className={cx("text-xs", dark ? "text-mist" : "text-ink-2")}>Prefer a conversation?</span>
        <Button href="/contact" variant={dark ? "link-light" : "link"} size="sm" icon="Arrow Right">Talk to sales</Button>
      </div>
    </div>
  );
}

function TxnCard({ t, style, className }: { t: NonNullable<HeroData["txn"]>; style?: React.CSSProperties; className?: string }) {
  const [b1, b2] = t.badges.map((b) => badge(b)!);
  return (
    <div aria-hidden="true" className={cx("illus seq-up flex min-w-0 flex-col gap-4 rounded-2xl border border-line bg-white px-4 py-5 min-[360px]:px-5 sm:px-6", className ?? "absolute w-[400px]")} style={{ ...d(400), ...style }}>
      <div className="flex gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="text-[13px] font-semibold sm:text-sm">{t.title}</span>
          <span className="text-xs text-ink-3">{t.sub}</span>
        </div>
        <span className="shrink-0 whitespace-nowrap text-[15px] font-semibold sm:text-base">{t.amount}</span>
      </div>
      <div className="seq-fade flex items-center gap-2" style={d(1100)}>
        <span className="flex size-5 items-center justify-center rounded-full bg-teal-chip"><Icon name="Check" size={12} /></span>
        <span className="text-xs text-ink-2">{t.receipt}</span>
      </div>
      <div className="flex items-center gap-2 border-t border-line pt-3">
        <span className="text-xs text-ink-3">{t.status}</span>
        <span className="relative ml-auto flex h-6 min-w-[150px] shrink-0 justify-end">
          {b2 ? (
            <>
              <Badge tone={b1[0]} className="seq-out absolute right-0" style={d(3000)}>{b1[1]}</Badge>
              <Badge tone={b2[0]} className="seq-fade absolute right-0" style={d(3000)}>{b2[1]}</Badge>
            </>
          ) : (
            b1 && <Badge tone={b1[0]}>{b1[1]}</Badge>
          )}
        </span>
      </div>
    </div>
  );
}

function AiCard({ ai, dark, style, className = "" }: { ai: NonNullable<HeroData["ai"]>; dark?: boolean; style?: React.CSSProperties; className?: string }) {
  return (
    <div aria-hidden="true" className={cx("illus seq-up flex min-w-0 max-w-full flex-col rounded-2xl border px-4 py-5 min-[360px]:px-5 sm:px-6", dark ? "border-navy-raised bg-navy-raised" : "border-line bg-white", className)} style={{ ...d(1500), ...style }}>
      <div className="flex items-center gap-2 pb-3">
        <span className={cx("flex size-6 items-center justify-center rounded-full", dark ? "bg-navy text-teal-bright" : "bg-teal-chip")}><Icon name="Sparkles" size={14} /></span>
        <span className={cx("text-[13px] font-semibold sm:text-sm", dark ? "text-cream" : "text-ink")}>{ai.title}</span>
      </div>
      {ai.rows.map(([l, v], i) => (
        <div key={l} className={cx("seq-x flex items-center gap-3 border-t py-2.5", dark ? "border-navy" : "border-line")} style={d(2000 + i * 250)}>
          <span className={cx("shrink-0 text-xs", dark ? "text-mist" : "text-ink-2")}>{l}</span>
          <span className={cx("min-w-0 flex-1 text-right text-[13px] font-medium sm:text-sm", dark ? "text-cream" : "text-ink")}>{v}</span>
        </div>
      ))}
    </div>
  );
}

function ProgressCard({ p, style, className }: { p: NonNullable<HeroData["progress"]>; style?: React.CSSProperties; className?: string }) {
  return (
    <div aria-hidden="true" className={cx("illus seq-up flex flex-col gap-2 rounded-2xl border border-line bg-white px-4 py-4 sm:px-5", className ?? "absolute w-[232px]")} style={{ ...d(3200, { ["--dy" as string]: "16px" }), ...style }}>
      <div className="flex justify-between gap-2">
        <span className="text-xs text-ink-2">{p.label}</span>
        <span className="text-sm font-medium">{p.value}</span>
      </div>
      <div className="h-1.5 rounded-full bg-subtle">
        <div className="seq-grow h-1.5 rounded-full bg-teal" style={{ width: `${p.pct * 100}%`, ...d(3600, { ["--from" as string]: "0.6" }) }} />
      </div>
    </div>
  );
}

function HeroCanvas({ data, w, h, pos }: { data: HeroData; w: number; h: number; pos: { txn: [number, number]; ai: [number, number]; pr: [number, number] } }) {
  return (
    <>
      <div className="hidden lg:block">
        <ScaleToFit width={w} height={h}>
          <div className="relative overflow-hidden rounded-[32px] bg-subtle" style={{ width: w, height: h }}>
            {data.txn && <TxnCard t={data.txn} style={{ left: pos.txn[0], top: pos.txn[1] }} />}
            {data.ai && <AiCard ai={data.ai} className="absolute w-[400px]" style={{ left: pos.ai[0], top: pos.ai[1] }} />}
            {data.progress && <ProgressCard p={data.progress} style={{ left: pos.pr[0], top: pos.pr[1] }} />}
          </div>
        </ScaleToFit>
      </div>
      <div className="flex flex-col rounded-3xl bg-subtle pb-8 pt-8 md:px-10 md:py-12 lg:hidden">
        {data.txn && <TxnCard t={data.txn} className="relative z-[1] mr-auto w-[91%] max-w-[400px] shadow-sm" />}
        {data.ai && <AiCard ai={data.ai} className={cx("ml-auto w-[91%] max-w-[400px] shadow-sm", data.txn && "mt-0.5")} />}
        {data.progress && <ProgressCard p={data.progress} className="relative z-[2] -mt-6 w-[65%] min-w-[200px] max-w-[232px] shadow-sm" />}
      </div>
    </>
  );
}

export function LibHero({ data }: { data: HeroData }) {
  const h = H(data.h);
  if (data.L === "B")
    return (
      <InView as="section" className="bg-page pb-24 pt-16">
        <div className="wrap flex flex-col items-center gap-8">
          <SectionHeader as="h1" level="page" align="center" eyebrow={h.e} title={h.t} body={h.b} />
          <EmailCapture />
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-ink-2">Prefer a conversation?</span>
            <Button href="/contact" variant="link" size="sm" icon="Arrow Right">Talk to sales</Button>
          </div>
          <div className="w-full">
            <HeroCanvas data={data} w={1248} h={480} pos={{ txn: [96, 80], ai: [544, 176], pr: [984, 104] }} />
          </div>
        </div>
      </InView>
    );
  if (data.L === "C")
    return (
      <InView as="section" className="relative overflow-hidden bg-navy">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div className="relative h-[300px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[60%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/images/${data.img}.jpg`} alt="" className="h-full w-full object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-navy/10 via-navy/30 to-navy lg:bg-gradient-to-r lg:from-navy lg:via-navy/40 lg:to-transparent" />
        </div>
        <div className="wrap relative -mt-16 flex flex-col gap-8 pb-14 lg:mt-0 lg:min-h-[680px] lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-16">
          <div className="max-w-[540px]"><HeroCopy h={h} dark /></div>
          {data.ai && <AiCard ai={data.ai} dark className="w-full lg:mt-64 lg:w-[400px] lg:self-end" />}
        </div>
      </InView>
    );
  if (data.L === "D")
    return (
      <InView as="section" className="bg-page pb-24 pt-16">
        <div className="wrap flex flex-col items-center gap-8 md:gap-16 lg:flex-row">
          <HeroCopy h={h} points={data.points} />
          <div className="flex w-full flex-1 flex-col justify-center gap-4 rounded-3xl bg-teal-tint px-2 py-6 md:gap-6 md:rounded-[32px] md:p-[72px] lg:min-h-[520px]">
            {data.alerts?.map((a, i) => {
              const b = badge(a.badge);
              return (
                <div key={a.title} aria-hidden="true" className="illus seq-up flex items-center gap-4 rounded-2xl border border-line bg-white px-5 py-4" style={d(400 + i * 500)}>
                  <IconChip icon={a.icon ?? "Sparkles"} size={36} iconSize={18} />
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="text-sm font-semibold">{a.title}</span>
                    <span className="text-xs text-ink-2">{a.body}</span>
                  </div>
                  {b && <Badge tone={b[0]} className="seq-fade" >{b[1]}</Badge>}
                </div>
              );
            })}
          </div>
        </div>
      </InView>
    );
  return (
    <InView as="section" className="bg-page pb-24 pt-16">
      <div className="wrap flex flex-col items-center gap-8 md:gap-16 lg:flex-row">
        <HeroCopy h={h} />
        <div className="w-full flex-1">
          <HeroCanvas data={data} w={624} h={520} pos={{ txn: [32, 96], ai: [192, 296], pr: [368, 40] }} />
        </div>
      </div>
    </InView>
  );
}

/* ================= TRUST STRIP ================= */
export function LibTrust({ data }: { data: TrustData }) {
  const items = data.items ?? STD_TRUST;
  if (data.L === "B")
    return (
      <section className="border-y border-line bg-page py-8">
        <div className="wrap flex flex-col gap-6 lg:flex-row lg:items-center">
          <p className="t-eyebrow shrink-0 text-teal-text lg:w-[200px]">{data.label ?? "Why finance teams choose XPensari"}</p>
          <ul className="flex flex-1 flex-col gap-3 lg:grid lg:grid-cols-4 lg:gap-4">
            {items.map(([i, t]) => (
              <li key={t} className="flex items-center gap-2 border-l border-line pl-6 pr-4 text-sm text-ink"><Icon name={i} size={20} className="shrink-0 text-teal-text" />{t}</li>
            ))}
          </ul>
        </div>
      </section>
    );
  if (data.L === "C")
    return (
      <section className="bg-page py-8">
        <ul className="wrap flex flex-col items-start gap-3 md:flex-row md:flex-wrap md:justify-center">
          {items.map(([i, t]) => (
            <li key={t} className="flex items-center gap-2 rounded-full border border-line bg-white py-2.5 pl-3.5 pr-[18px] text-sm font-medium text-ink"><Icon name={i} size={16} className="text-teal-text" />{t}</li>
          ))}
        </ul>
      </section>
    );
  if (data.L === "D")
    return (
      <section className="bg-navy py-7">
        <ul className="wrap flex flex-col gap-3 md:flex-row md:flex-wrap md:justify-between md:gap-x-8">
          {items.map(([i, t]) => (
            <li key={t} className="flex items-center gap-3 text-sm font-medium text-cream"><Icon name={i} size={20} className="text-teal-bright" />{t}</li>
          ))}
        </ul>
      </section>
    );
  return (
    <section className="border-b border-line bg-page py-6">
      <ul className="wrap flex flex-col items-start gap-3 md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-x-12">
        {items.map(([i, t]) => (
          <li key={t} className="flex items-center gap-2 text-sm font-medium text-ink-2"><Icon name={i} size={20} className="text-teal-text" />{t}</li>
        ))}
      </ul>
    </section>
  );
}

/* ================= WHAT IT DOES / KEY FEATURES (product pages) ================= */
export function WhatItDoes({ h, p }: { h: Header; p: string }) {
  return (
    <section className="bg-navy py-16">
      <div className="wrap flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
        <SectionHeader dark eyebrow={h.e} title={h.t} className="lg:max-w-[460px]" />
        <p className="t-lead max-w-[610px] text-cream">{p}</p>
      </div>
    </section>
  );
}

export function KeyFeatures({ h, items }: { h: Header; items: [string, string, string][] }) {
  return (
    <section className="bg-subtle py-16">
      <div className="wrap flex flex-col gap-8">
        <SectionHeader eyebrow={h.e} title={h.t} />
        <div className={cx("grid grid-cols-1 gap-6 sm:grid-cols-2", items.length >= 5 ? "lg:grid-cols-5" : items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
          {items.map(([i, t, b]) => <FeatureCard key={t} icon={i} title={t} body={b} />)}
        </div>
      </div>
    </section>
  );
}

/* ================= HOW IT WORKS ================= */
function StepCardVisual({ c, i, active }: { c?: ReturnType<typeof card>; i: number; active: number }) {
  if (!c || i !== active) return null;
  return <MiniCard key={i} data={c} className="panel-in shadow-sm" />;
}

export function LibHiw({ data, bg = "bg-page" }: { data: HiwData; bg?: string }) {
  const h = H(data.h);
  const steps = data.steps;
  const st = useStepper(steps.length);
  const cards = steps.map((s) => card(s.card));

  let body: React.ReactNode;
  if (data.L === "B") {
    body = (
      <InView className="relative grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <span aria-hidden="true" className="absolute left-0 right-0 top-[19px] hidden h-0.5 bg-line lg:block" />
        <span aria-hidden="true" className="seq-grow absolute left-0 right-0 top-[19px] hidden h-0.5 bg-teal lg:block" style={d(300, { ["--from" as string]: "0" })} />
        {steps.map((s, i) => (
          <div key={s.t} className="seq-up relative flex flex-col gap-4" style={d(200 + i * 250, { ["--dy" as string]: "16px" })}>
            <span className="flex size-10 items-center justify-center rounded-full bg-teal text-sm font-medium">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="text-lg font-semibold leading-6">{s.t}</h3>
            <p className="text-sm leading-[22px] text-ink-2">{s.b}</p>
            {s.snip && (
              <span aria-hidden="true" className="illus seq-fade inline-flex w-fit items-center gap-2 rounded-2xl border border-line bg-white px-3.5 py-3 text-sm font-medium" style={d(700 + i * 250)}>
                <Icon name={s.snip[0]} size={20} className="text-teal-text" /> {s.snip[1]}
              </span>
            )}
          </div>
        ))}
      </InView>
    );
  } else if (data.L === "C") {
    body = (
      <InView className="flex w-full flex-col gap-8 md:gap-16">
        {steps.map((s, i) => (
          <div key={s.t} className={cx("seq-up flex flex-col items-center gap-8 lg:gap-16", i % 2 ? "lg:flex-row-reverse" : "lg:flex-row")} style={d(100)}>
            <div className="flex flex-1 flex-col gap-3">
              <span className="text-sm font-medium text-teal-text">Step {String(i + 1).padStart(2, "0")}</span>
              <h3 className="t-h3">{s.t}</h3>
              <p className="text-base text-ink-2">{s.b}</p>
            </div>
            <div className="flex w-full items-center justify-center py-6 md:h-[380px] md:py-0 rounded-2xl md:rounded-3xl bg-subtle px-2 md:p-6 lg:w-[600px]">
              {cards[i] && <MiniCard data={cards[i]!} className="shadow-sm" />}
            </div>
          </div>
        ))}
      </InView>
    );
  } else if (data.L === "D") {
    body = (
      <div {...st.bind} className="flex w-full flex-col gap-8 md:gap-12">
        <div role="tablist" aria-label="Steps" className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {steps.map((s, i) => (
            <button key={s.t} role="tab" aria-selected={st.i === i} onClick={() => st.select(i)} className={cx("flex flex-col gap-3 text-left text-sm font-semibold transition-opacity", st.i === i ? "opacity-100" : "opacity-50 hover:opacity-80")}>
              {s.t}
              <StepBar active={st.i === i} done={i < st.i} running={st.running} paused={st.paused} />
            </button>
          ))}
        </div>
        <div role="tabpanel" className="flex flex-col items-center gap-6 rounded-3xl bg-teal-tint px-2 py-6 md:min-h-[460px] md:gap-10 md:rounded-[32px] md:p-8 lg:flex-row lg:gap-16 lg:px-16">
          <div key={st.i} className="panel-in flex flex-1 flex-col gap-3 px-4 md:px-0">
            <span className="text-sm font-medium text-teal-text">Step {String(st.i + 1).padStart(2, "0")}</span>
            <h3 className="t-h3">{steps[st.i].t}</h3>
            <p className="text-base text-ink-2">{steps[st.i].b}</p>
          </div>
          {cards[st.i] && <MiniCard key={`c${st.i}`} data={cards[st.i]!} className="panel-in shadow-sm" />}
        </div>
      </div>
    );
  } else {
    body = (
      <div {...st.bind} className="flex w-full flex-col items-center gap-8 md:gap-16 lg:flex-row">
        <div role="tablist" aria-label="Steps" className="flex w-full flex-col lg:w-[480px]">
          {steps.map((s, i) => (
            <button key={s.t} role="tab" aria-selected={st.i === i} onClick={() => st.select(i)} className={cx("relative flex flex-col gap-2 py-6 text-left transition-opacity duration-300", st.i === i ? "opacity-100" : "opacity-40 hover:opacity-70")}>
              <StepBar active={st.i === i} done={false} running={st.running} paused={st.paused} className="absolute inset-x-0 top-0" />
              <span className="flex items-center gap-3">
                <span className="text-sm font-medium text-teal-text">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-lg font-semibold leading-6 text-ink">{s.t}</span>
              </span>
              <span className="text-sm leading-[22px] text-ink-2">{s.b}</span>
            </button>
          ))}
        </div>
        <div role="tabpanel" className="hidden h-[420px] w-full flex-1 items-center lg:flex justify-center rounded-3xl md:rounded-[32px] bg-teal-tint p-6 lg:h-[520px]">
          {cards.map((c, i) => <StepCardVisual key={i} c={c} i={i} active={st.i} />)}
        </div>
      </div>
    );
  }

  return (
    <section className={cx("section-y", bg)}>
      <div className="wrap flex flex-col items-center gap-8 md:gap-12 lg:gap-16">
        <SectionHeader align="center" eyebrow={h.e} title={h.t} body={h.b} />
        {body}
      </div>
    </section>
  );
}

/* ================= OUTCOMES & AGENTS ================= */
function Agents({ ah, agents, dark, cards }: { ah?: Header; agents: OutData["agents"]; dark?: boolean; cards?: boolean }) {
  if (!agents.length) return null;
  return (
    <div className="flex flex-col gap-8">
      <SectionHeader dark={dark} eyebrow={ah?.e ?? "AI agents"} title={ah?.t ?? "The agents behind it"} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-12">
        {agents.map(([i, n, b]) =>
          cards ? (
            <div key={n} className="card-lift flex flex-col gap-3 rounded-2xl md:rounded-3xl border border-line bg-white p-6">
              <IconChip icon={i} iconSize={20} />
              <h3 className="text-base font-semibold">{n}</h3>
              <p className="text-sm leading-[22px] text-ink-2">{b}</p>
            </div>
          ) : (
            <div key={n} className={cx("flex flex-col gap-3 border-t pt-6", dark ? "border-navy-raised" : "border-line")}>
              <IconChip icon={i} iconSize={20} tone={dark ? "dark" : "teal"} />
              <h3 className={cx("text-base font-semibold", dark ? "text-cream" : "text-ink")}>{n}</h3>
              <p className={cx("text-sm leading-[22px]", dark ? "text-mist" : "text-ink-2")}>{b}</p>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export function LibOutcomes({ data }: { data: OutData }) {
  const h = H(data.h);
  if (data.L === "B")
    return (
      <section className="section-y bg-page">
        <div className="wrap flex flex-col gap-8 md:gap-16">
          <div className="flex flex-col gap-8 md:gap-12 lg:flex-row lg:gap-16">
            <SectionHeader eyebrow={h.e} title={h.t} body={h.b} className="lg:w-[440px] lg:shrink-0" />
            <InView className="flex flex-1 flex-col">
              {data.items.map((o, i) => (
                <div key={o.v} className="seq-up flex flex-col gap-4 border-t border-line py-7 sm:flex-row sm:items-center sm:gap-8" style={d(i * 200, { ["--dy" as string]: "16px" })}>
                  <span className="t-h1 shrink-0 text-teal-text sm:w-[240px]">{o.v}</span>
                  <span className="flex flex-col gap-2">
                    <span className="t-eyebrow text-ink-3">{o.l}</span>
                    <span className="text-base text-ink-2">{o.b}</span>
                  </span>
                </div>
              ))}
            </InView>
          </div>
          <Agents ah={data.ah} agents={data.agents} cards />
        </div>
      </section>
    );
  if (data.L === "C") {
    const bars = [28, 40, 34, 52, 46, 64, 58, 80];
    return (
      <section className="section-y bg-navy">
        <div className="wrap flex flex-col gap-8 md:gap-12">
          <SectionHeader dark align="center" eyebrow={h.e} title={h.t} body={h.b} />
          <InView className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {data.items.map((o, i) => (
              <div key={o.v} className={cx("seq-up flex flex-col gap-3 rounded-2xl md:rounded-3xl border border-navy-raised bg-navy-raised p-9", i === 0 && "lg:col-span-2", i === 2 && "lg:col-span-1")} style={d(i * 200)}>
                <span className="t-eyebrow text-teal-bright">{o.l}</span>
                <span className="t-h1 text-cream">{o.v}</span>
                <span className="text-sm text-mist">{o.b}</span>
                {i === 0 && (
                  <div aria-hidden="true" className="mt-2 flex h-24 items-end gap-4">
                    {bars.map((b, j) => <span key={j} className="seq-up w-10 rounded-lg bg-teal" style={{ height: b, ...d(400 + j * 80, { ["--dy" as string]: "12px" }) }} />)}
                  </div>
                )}
              </div>
            ))}
            {data.agents.length > 0 && (
              <div className="flex flex-col gap-6 rounded-2xl md:rounded-3xl border border-navy-raised p-9 lg:col-span-2">
                <SectionHeader dark eyebrow={data.ah?.e} title={data.ah?.t} />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {data.agents.map(([ic, n, b]) => (
                    <div key={n} className="flex flex-col gap-3">
                      <IconChip icon={ic} iconSize={20} tone="dark" />
                      <h3 className="text-base font-semibold text-cream">{n}</h3>
                      <p className="text-sm text-mist">{b}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </InView>
        </div>
      </section>
    );
  }
  if (data.L === "D")
    return (
      <section className="section-y bg-page">
        <div className="wrap flex flex-col gap-8 md:gap-16">
          <InView className="flex flex-col gap-8 md:gap-12 rounded-3xl md:rounded-[32px] bg-teal-tint px-6 py-8 md:p-16">
            <SectionHeader eyebrow={h.e} title={h.t} body={h.b} />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {data.items.map((o, i) => (
                <div key={o.v} className="seq-up flex flex-col gap-2 pr-8" style={d(i * 200, { ["--dy" as string]: "16px" })}>
                  <span className="t-eyebrow text-teal-text">{o.l}</span>
                  <span className="t-h1 text-teal-text">{o.v}</span>
                  <span className="text-sm text-ink-2">{o.b}</span>
                </div>
              ))}
            </div>
          </InView>
          <Agents ah={data.ah} agents={data.agents} />
        </div>
      </section>
    );
  return (
    <section className="section-y bg-navy">
      <div className="wrap flex flex-col gap-8 md:gap-16">
        <SectionHeader dark align="center" eyebrow={h.e} title={h.t} body={h.b} />
        <InView className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {data.items.map((o, i) => (
            <div key={o.v} className="seq-up flex flex-col gap-3 rounded-2xl md:rounded-3xl border border-navy-raised bg-navy-raised p-8" style={d(i * 200)}>
              <span className="t-eyebrow text-teal-bright">{o.l}</span>
              <span className="t-h1 text-cream">{o.v}</span>
              <span className="text-sm text-mist">{o.b}</span>
            </div>
          ))}
        </InView>
        <div className="pt-4"><Agents ah={data.ah} agents={data.agents} dark /></div>
      </div>
    </section>
  );
}

/* ================= PRODUCTS ================= */
function ProdLink({ t, link }: { t: string; link: string }) {
  return <Button href={productHref(t)} variant="link" icon="Arrow Right" className="self-start">{link}</Button>;
}
const prodCard = (it: ProdData["items"][number]) => card(it.card) ?? card(PRODUCT_CARD[productKey(it.t)]);

export function LibProducts({ data }: { data: ProdData }) {
  const h = H(data.h);
  const items = data.items;
  if (data.L === "A")
    return (
      <section className="section-y bg-page">
        <div className="wrap flex flex-col gap-8 md:gap-12">
          <SectionHeader eyebrow={h.e} title={h.t} body={h.b} />
          <div className="grid grid-cols-1 gap-8 md:gap-12 md:grid-cols-2">
            {items.map((it) => (
              <div key={it.t} className="flex flex-col gap-6">
                <div className="flex items-center justify-center py-6 md:py-0 rounded-2xl md:rounded-3xl bg-subtle px-2 md:p-6 md:h-[400px]">{prodCard(it) && <MiniCard data={prodCard(it)!} className="shadow-sm" />}</div>
                <div className="flex flex-col gap-2">
                  <h3 className="t-h3">{it.t}</h3>
                  <p className="text-base text-ink-2">{it.b}</p>
                  <ProdLink t={it.t} link={it.link} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  if (data.L === "C")
    return (
      <section className="section-y bg-page">
        <div className="wrap flex flex-col items-center gap-8 md:gap-16">
          <SectionHeader align="center" eyebrow={h.e} title={h.t} body={h.b} />
          <div className="flex w-full flex-col gap-8 md:gap-16">
            {items.map((it, i) => (
              <div key={it.t} className={cx("flex flex-col items-center gap-8 lg:gap-16", i % 2 ? "lg:flex-row-reverse" : "lg:flex-row")}>
                <div className="flex flex-1 flex-col gap-4">
                  <IconChip icon={productIcon(it.t)} size={48} iconSize={24} />
                  <h3 className="t-h3">{it.t}</h3>
                  <p className="text-base text-ink-2">{it.b}</p>
                  <ProdLink t={it.t} link={it.link} />
                </div>
                <div className="flex w-full items-center justify-center py-6 md:h-[400px] md:py-0 rounded-2xl md:rounded-3xl bg-subtle px-2 md:p-6 lg:w-[600px]">{prodCard(it) && <MiniCard data={prodCard(it)!} className="shadow-sm" />}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  if (data.L === "D") {
    const [first, ...rest] = items;
    return (
      <section className="section-y bg-page">
        <div className="wrap flex flex-col gap-8 md:gap-12">
          <SectionHeader eyebrow={h.e} title={h.t} body={h.b} />
          <div className="flex flex-col items-center gap-8 rounded-3xl md:rounded-[32px] bg-subtle px-2 py-8 md:gap-10 md:p-8 lg:flex-row lg:gap-16 lg:p-14">
            <div className="flex flex-1 flex-col gap-4 px-4 md:px-0">
              <IconChip icon={productIcon(first.t)} size={48} iconSize={24} />
              <h3 className="t-h2">{first.t}</h3>
              <p className="text-base text-ink-2">{first.b}</p>
              <ProdLink t={first.t} link={first.link} />
            </div>
            {prodCard(first) && <MiniCard data={prodCard(first)!} className="shadow-sm" />}
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
            {rest.map((it) => (
              <div key={it.t} className="flex flex-col gap-3 border-t border-line pt-6">
                <IconChip icon={productIcon(it.t)} iconSize={20} />
                <h3 className="text-lg font-semibold leading-6">{it.t}</h3>
                <p className="text-sm leading-[22px] text-ink-2">{it.b}</p>
                <ProdLink t={it.t} link={it.link} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="section-y bg-page">
      <div className="wrap flex flex-col items-center gap-8 md:gap-12">
        <SectionHeader align="center" eyebrow={h.e} title={h.t} body={h.b} />
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((it) => (
            <Link key={it.t} href={productHref(it.t)} className="card-lift group flex flex-col gap-4 rounded-2xl border border-line bg-white p-7 md:flex-row md:gap-5 md:rounded-3xl">
              <IconChip icon={productIcon(it.t)} size={48} iconSize={24} />
              <div className="flex flex-col gap-2.5">
                <h3 className="text-lg font-semibold leading-6">{it.t}</h3>
                <p className="text-sm leading-[22px] text-ink-2">{it.b}</p>
                <span className="inline-flex items-center gap-2 text-base font-semibold text-teal-text group-hover:underline underline-offset-4">{it.link} <Icon name="Arrow Right" size={20} /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= INTEGRATION ================= */
function Pill({ icon, text, dark }: { icon: string; text: string; dark?: boolean }) {
  return (
    <span className={cx("flex items-center gap-3 rounded-full border py-2 pl-2 pr-5 text-sm font-medium", dark ? "border-navy-raised bg-navy-raised text-cream" : "border-line bg-white text-ink")}>
      <IconChip icon={icon} size={32} iconSize={16} tone={dark ? "dark" : "teal"} />
      {text}
    </span>
  );
}
function Ledger({ l, dark }: { l: [string, string]; dark?: boolean }) {
  return (
    <div className={cx("flex w-[220px] flex-col gap-2 rounded-2xl border px-6 py-5", dark ? "border-navy-raised bg-navy-raised" : "border-line bg-white")}>
      <IconChip icon="Building" size={36} iconSize={18} tone={dark ? "navy" : "teal"} />
      <span className={cx("text-sm font-semibold", dark ? "text-cream" : "text-ink")}>{l[0]}</span>
      <span className={cx("text-xs", dark ? "text-mist" : "text-ink-2")}>{l[1]}</span>
    </div>
  );
}
function MobileFlow({ sources, ledger, dark, hub }: { sources: [string, string][]; ledger: [string, string]; dark?: boolean; hub?: boolean }) {
  const line = <span className="seq-fade mx-auto block h-8 w-0.5 bg-teal" style={d(700)} />;
  return (
    <InView className="flex w-full flex-col lg:hidden">
      <div className="flex flex-col gap-3">
        {sources.map(([i, t], k) => (
          <div key={t} className="seq-up [&>span]:w-full" style={d(k * 150, { ["--dy" as string]: "12px" })}><Pill icon={i} text={t} dark={dark} /></div>
        ))}
      </div>
      {line}
      {hub && (
        <>
          <div className="seq-up mx-auto flex size-28 items-center justify-center rounded-full bg-teal text-base font-semibold" style={d(900)}>XPensari</div>
          {line}
        </>
      )}
      <div className="seq-up [&>div]:w-full" style={d(1100)}><Ledger l={ledger} dark={dark} /></div>
    </InView>
  );
}

function FlowDiagram({ sources, ledger, dark }: { sources: [string, string][]; ledger: [string, string]; dark?: boolean }) {
  return (
    <InView className="relative h-[300px] w-[560px]" >
      {sources.map(([i, t], k) => (
        <div key={t} className="seq-up absolute left-0 w-[212px]" style={{ top: 30 + k * 100, ...d(k * 200, { ["--dy" as string]: "12px" }) }}><Pill icon={i} text={t} dark={dark} /></div>
      ))}
      {[0, 1, 2].map((k) => <span key={k} className="seq-grow absolute left-[212px] h-0.5 w-[88px] bg-teal" style={{ top: 54 + k * 100, ...d(600 + k * 150) }} />)}
      <span className="seq-fade absolute left-[300px] top-[54px] h-[202px] w-0.5 bg-teal" style={d(1000)} />
      <span className="seq-grow absolute left-[300px] top-[154px] h-0.5 w-10 bg-teal" style={d(1200)} />
      <div className="seq-up absolute left-[340px] top-[79px]" style={d(1400)}><Ledger l={ledger} dark={dark} /></div>
    </InView>
  );
}

export function LibIntegration({ data }: { data: IntData }) {
  const h = data.h.std ? STD_INT_HEADER : data.h;
  const ledger = data.ledger ?? ["WorkMerate ledger", "One set of books for spend, payables and tax"];
  const link = <Button href="/products/integrations-api" variant={data.L === "C" ? "link-light" : "link"} icon="Arrow Right" className="self-start">{data.link ?? "How XPensari connects"}</Button>;
  if (data.L === "B")
    return (
      <section className="section-y bg-page">
        <div className="wrap flex flex-col items-center gap-8 md:gap-12">
          <SectionHeader align="center" eyebrow={h.e} title={h.t} body={h.b} />
          <MobileFlow sources={data.sources} ledger={ledger} hub />
          <div className="hidden w-full max-w-[1248px] lg:block">
            <ScaleToFit width={1248} height={320}>
              <InView className="relative h-[320px] w-[1248px]">
                {data.sources.map(([i, t], k) => (
                  <div key={t} className="seq-up absolute left-[120px] w-[240px]" style={{ top: 40 + k * 100, ...d(k * 200, { ["--dy" as string]: "12px" }) }}><Pill icon={i} text={t} /></div>
                ))}
                {[0, 1, 2].map((k) => <span key={k} className="seq-grow absolute left-[360px] h-0.5 w-[100px] bg-teal" style={{ top: 63 + k * 100, ...d(600 + k * 150) }} />)}
                <span className="seq-fade absolute left-[460px] top-[63px] h-[202px] w-0.5 bg-teal" style={d(1000)} />
                <span className="seq-grow absolute left-[460px] top-[163px] h-0.5 w-[94px] bg-teal" style={d(1100)} />
                <div className="seq-up absolute left-[554px] top-[94px] flex size-[140px] items-center justify-center rounded-full bg-teal text-base font-semibold" style={d(1300)}>XPensari</div>
                <span className="seq-grow absolute left-[694px] top-[163px] h-0.5 w-[174px] bg-teal" style={d(1600)} />
                <div className="seq-up absolute left-[868px] top-[89px]" style={d(1800)}><Ledger l={ledger} /></div>
              </InView>
            </ScaleToFit>
          </div>
          {link}
        </div>
      </section>
    );
  if (data.L === "C")
    return (
      <section className="section-y bg-navy">
        <div className="wrap flex flex-col-reverse items-center gap-8 md:gap-12 lg:flex-row lg:gap-16">
          <MobileFlow sources={data.sources} ledger={ledger} dark /><div className="hidden w-full max-w-[560px] lg:block"><ScaleToFit width={560} height={300}><FlowDiagram sources={data.sources} ledger={ledger} dark /></ScaleToFit></div>
          <div className="flex flex-1 flex-col gap-6">
            <SectionHeader dark eyebrow={h.e} title={h.t} body={h.b} />
            {link}
          </div>
        </div>
      </section>
    );
  if (data.L === "D")
    return (
      <section className="section-y bg-page">
        <div className="wrap flex flex-col items-center gap-8 md:gap-12 lg:flex-row lg:gap-16">
          <div className="flex flex-1 flex-col gap-6">
            <SectionHeader eyebrow={h.e} title={h.t} body={h.b} />
            {link}
          </div>
          {data.log && (
            <InView className="illus flex w-full max-w-[580px] flex-col rounded-2xl md:rounded-3xl border border-line bg-white px-4 pb-3 pt-5 min-[360px]:px-5 sm:px-7 sm:pt-6" >
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 pb-3">
                <span className="min-w-0 text-sm font-semibold">{data.log.title}</span>
                <Badge tone="neutral">Sample data</Badge>
              </div>
              {data.log.rows.map(([ic, t, s, b], k) => {
                const bb = badge(b);
                return (
                  <div key={t} className="seq-x flex items-center gap-3 border-t border-line py-3.5 sm:gap-4" style={d(200 + k * 250)}>
                    <IconChip icon={ic} size={36} iconSize={18} className="shrink-0" />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-sm font-medium">{t}</span>
                      <span className="text-xs text-ink-2">{s}</span>
                    </span>
                    {bb && <Badge tone={bb[0]}>{bb[1]}</Badge>}
                  </div>
                );
              })}
            </InView>
          )}
        </div>
      </section>
    );
  return (
    <section className="section-y bg-page">
      <div className="wrap">
        <div className="flex flex-col items-center gap-8 md:gap-12 rounded-3xl md:rounded-[32px] bg-teal-tint px-6 py-8 lg:flex-row lg:gap-16 lg:p-16">
          <div className="flex flex-1 flex-col gap-4">
            <SectionHeader eyebrow={h.e} title={h.t} body={h.b} />
            {link}
          </div>
          <MobileFlow sources={data.sources} ledger={ledger} /><div className="hidden w-full max-w-[560px] lg:block"><ScaleToFit width={560} height={300}><FlowDiagram sources={data.sources} ledger={ledger} /></ScaleToFit></div>
        </div>
      </div>
    </section>
  );
}

/* ================= CALCULATOR ================= */
export function LibCalculator({ data }: { data: CalcData }) {
  const h = data.h;
  const [sel, setSel] = useState(0);
  if (data.L === "B")
    return (
      <section className="section-y bg-page">
        <div className="wrap flex flex-col items-center gap-8 md:gap-12">
          <SectionHeader align="center" eyebrow={h.e} title={h.t} body={h.b} />
          <InView className="flex w-full flex-col gap-6 rounded-3xl md:rounded-[32px] border border-line bg-white p-6 md:p-12">
            {CALC_ITEMS.map(([l, v, p], i) => (
              <div key={l} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2.5 md:flex md:gap-6">
                <span className="text-sm text-ink-2 md:w-[200px]">{l}</span>
                <span className="col-span-2 h-3 overflow-hidden rounded-2xl bg-subtle md:order-2 md:h-10 md:flex-1">
                  <span className="seq-grow block h-full rounded-xl bg-teal-chip" style={{ width: `${p * 100}%`, ...d(i * 200) }} />
                </span>
                <span className="t-h3 md:order-3 md:w-[100px] md:text-right">{v}</span>
              </div>
            ))}
          </InView>
          <p className="text-xs text-ink-3">{CALC_NOTE}</p>
        </div>
      </section>
    );
  if (data.L === "C")
    return (
      <section className="section-y bg-page">
        <div className="wrap flex flex-col items-center gap-8 md:gap-12 lg:flex-row lg:gap-16">
          <div className="flex flex-1 flex-col gap-8">
            <SectionHeader eyebrow={h.e} title={h.t} body={h.b} />
            <div role="radiogroup" aria-label="Monthly transactions" className="flex flex-col gap-2">
              {CALC_ITEMS.map(([l], i) => (
                <button key={l} role="radio" aria-checked={sel === i} onClick={() => setSel(i)} className={cx("flex items-center gap-3 rounded-2xl border px-[18px] py-3.5 text-left text-sm font-medium transition-colors", sel === i ? "border-teal bg-teal-tint" : "border-line bg-white hover:border-line-strong")}>
                  <span className={cx("size-3 rounded-full border", sel === i ? "border-teal bg-teal" : "border-line-strong")} />
                  {l}
                </button>
              ))}
            </div>
            <p className="text-xs text-ink-3">{CALC_NOTE}</p>
          </div>
          <div aria-live="polite" className="flex h-[360px] w-full flex-col items-center justify-center gap-2 rounded-3xl md:rounded-[32px] bg-teal-tint lg:h-[440px] lg:w-[560px]">
            <span key={sel} className="panel-in font-display text-[96px] leading-none text-teal-text md:text-[144px]">{CALC_ITEMS[sel][1]}</span>
            <span className="text-base text-ink-2">{CALC_ITEMS[sel][0]}</span>
          </div>
        </div>
      </section>
    );
  if (data.L === "D")
    return (
      <section className="section-y bg-navy">
        <div className="wrap flex flex-col items-center gap-8 md:gap-12">
          <SectionHeader dark align="center" eyebrow={h.e} title={h.t} body={h.b} />
          <InView className="grid w-full grid-cols-1 overflow-hidden rounded-2xl md:rounded-3xl border border-navy-raised bg-navy-raised sm:grid-cols-2 lg:grid-cols-4">
            {CALC_ITEMS.map(([l, v, p], i) => (
              <div key={l} className="flex flex-col gap-4 border-t border-navy p-8 first:border-t-0 lg:border-l lg:border-t-0 lg:first:border-l-0">
                <span className="text-sm text-mist">{l}</span>
                <span className="t-h1 text-cream">{v}</span>
                <span className="h-2 rounded-full bg-navy"><span className="seq-grow block h-2 rounded bg-teal" style={{ width: `${p * 100}%`, ...d(i * 200) }} /></span>
              </div>
            ))}
          </InView>
          <p className="text-xs text-muted-dark">{CALC_NOTE}</p>
        </div>
      </section>
    );
  return (
    <section className="section-y bg-page">
      <div className="wrap flex flex-col items-center gap-8 md:gap-12">
        <SectionHeader align="center" eyebrow={h.e} title={h.t} body={h.b} />
        <InView className="flex w-full flex-col gap-3 lg:hidden">
          {CALC_ITEMS.map(([l, v, p], i) => (
            <div key={l} className="relative flex h-24 items-center overflow-hidden rounded-2xl border border-line bg-white">
              <div className={cx("seq-x absolute inset-y-0 left-0 flex items-center px-5", i === 3 ? "bg-teal" : "bg-teal-tint")} style={{ width: `${38 + p * 62}%`, ...d(i * 150) }}>
                <span className={cx("t-h3", i === 3 ? "text-ink" : "text-teal-text")}>{v}</span>
              </div>
              <span className={cx("relative ml-auto max-w-[45%] pr-5 text-right text-xs font-medium", i === 3 ? "text-ink" : "text-ink-2")}>{l}</span>
            </div>
          ))}
        </InView>
        <InView className="hidden w-full grid-cols-4 gap-6 lg:grid">
          {CALC_ITEMS.map(([l, v, p], i) => (
            <div key={l} className="relative flex h-[300px] flex-col overflow-hidden rounded-2xl md:rounded-3xl border border-line bg-white md:h-[400px]">
              <span className="p-5 text-sm font-medium text-ink-2 md:p-6">{i < 3 && l}</span>
              <div className={cx("seq-up absolute inset-x-0 bottom-0 flex flex-col justify-start gap-2 p-5 md:p-6", i === 3 ? "bg-teal" : "bg-teal-tint")} style={{ height: `${38 + p * 62}%`, ...d(i * 200) }}>
                <span className={cx("t-h1", i === 3 ? "text-ink" : "text-teal-text")}>{v}</span>
                {i === 3 && <span className="text-sm font-medium">{l}</span>}
              </div>
            </div>
          ))}
        </InView>
        <p className="text-xs text-ink-3">{CALC_NOTE}</p>
      </div>
    </section>
  );
}

/* ================= PAGE RENDERER ================= */
export function LibraryPageView({ page, kind }: { page: LibraryPage; kind: "product" | "solution" }) {
  const cta = page.cta;
  const sections = kind === "product" ? ["hero", "trust", "what", "feat", "hiw", "out", "int", "prod"] : ["hero", "trust", "hiw", "out", "prod", "int", "calc"];
  return (
    <>
      {sections.map((s) => {
        switch (s) {
          case "hero": return <LibHero key={s} data={page.hero} />;
          case "trust": return page.trust ? <LibTrust key={s} data={page.trust} /> : null;
          case "what": return page.what ? <WhatItDoes key={s} h={page.what.h} p={page.what.p} /> : null;
          case "feat": return page.feat ? <KeyFeatures key={s} h={page.feat.h} items={page.feat.items} /> : null;
          case "hiw": return page.hiw ? <LibHiw key={s} data={page.hiw} /> : null;
          case "out": return page.out ? <LibOutcomes key={s} data={page.out} /> : null;
          case "prod": return page.prod ? <LibProducts key={s} data={page.prod} /> : null;
          case "int": return page.int ? <LibIntegration key={s} data={page.int} /> : null;
          case "calc": return page.calc ? <LibCalculator key={s} data={page.calc} /> : null;
        }
        return null;
      })}
      {page.faq && <FaqSection eyebrow={page.faq.h.e} title={page.faq.h.t ?? "FAQ"} items={faqItems(page.faq)} />}
      {cta && (
        <CtaBand
          tone={(cta.tone as CtaTone) ?? "navy"}
          image={cta.img}
          eyebrow={cta.e}
          title={cta.t}
          body={cta.b}
          primary={{ label: cta.btns[0] ?? "Request a Demo", href: cta.btns[0]?.includes("sandbox") ? "/get-api-key" : DEMO_HREF }}
          secondary={cta.btns[1] ? { label: cta.btns[1], href: "/resources/developers" } : undefined}
        />
      )}
    </>
  );
}
