import { Button, FeatureCard, Icon, SectionHeader, cx } from "./ui";
import { InView } from "./motion";
import { d } from "./seq";
import type { ReactNode } from "react";

export function SplitHero({ eyebrow, title, body, cta, ctaHref, alt = { label: "Talk to sales", href: "/contact" }, image, card, imgAlt = "" }: { eyebrow: string; title: string; body: string; cta: string; ctaHref: string; alt?: { label: string; href: string } | null; image: string; card?: { title: string }; imgAlt?: string }) {
  return (
    <InView as="section" className="bg-page pb-24 pt-16">
      <div className="wrap flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
        <div className="flex w-full max-w-[560px] flex-col gap-8">
          <SectionHeader as="h1" level="page" eyebrow={eyebrow} title={title} body={body} />
          <div className="flex flex-col gap-3">
            <Button href={ctaHref} className="self-start">{cta}</Button>
            {alt && (
              <span className="flex items-center gap-2 text-xs text-ink-2">Prefer a conversation? <Button href={alt.href} variant="link" size="sm" icon="Arrow Right">{alt.label}</Button></span>
            )}
          </div>
        </div>
        <div className="relative w-full flex-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={imgAlt} className="seq-up h-[360px] w-full rounded-[32px] object-cover md:h-[520px]" style={d(100)} />
          {card && (
            <div aria-hidden="true" className="illus seq-up absolute bottom-6 left-6 right-6 flex flex-col rounded-2xl border border-line bg-white px-6 py-5 sm:right-auto sm:w-[360px]" style={d(900)}>
              <div className="flex items-center gap-2 pb-3">
                <span className="flex size-6 items-center justify-center rounded-full bg-teal-chip"><Icon name="Sparkles" size={14} /></span>
                <span className="text-sm font-semibold">{card.title}</span>
              </div>
              {[["Spend", "Less"], ["Automate", "More"], ["Compliance", "Built in"]].map(([l, v], i) => (
                <div key={l} className="seq-x flex justify-between border-t border-line py-2.5" style={d(1400 + i * 250)}>
                  <span className="text-xs text-ink-2">{l}</span>
                  <span className="text-sm font-medium">{v}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </InView>
  );
}

export function MissionBand({ label, title, body }: { label: string; title: string; body: string }) {
  return (
    <section className="relative overflow-hidden bg-navy section-y">
      <span aria-hidden="true" className="absolute left-0 top-0 h-full w-1.5 bg-amber" />
      <div className="wrap flex flex-col gap-12 lg:flex-row lg:gap-16">
        <div className="flex flex-1 flex-col gap-6">
          <p className="t-eyebrow text-amber">{label}</p>
          <h2 className="t-h1 text-cream">{title}</h2>
          <p className="t-lead max-w-[600px] text-mist">{body}</p>
        </div>
        <div className="flex flex-col gap-6 lg:w-[440px]">
          {[["Vision", "To be one of Africa's leading AI-powered enterprise software companies."], ["Mission", "Help organisations spend less, automate finance work, and make smarter financial decisions."]].map(([k, v]) => (
            <div key={k} className="flex flex-col gap-2 rounded-2xl border border-navy-raised bg-navy-raised p-6">
              <span className="t-eyebrow text-teal-bright">{k}</span>
              <p className="text-lg leading-7 text-cream">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Pillars({ eyebrow, body }: { eyebrow: string; body: string }) {
  return (
    <section className="section-y bg-subtle">
      <div className="wrap flex flex-col items-center gap-12">
        <SectionHeader align="center" eyebrow={eyebrow} title="Our values. In every decision." body={body} />
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard highlight icon="Shield" title="Trust" body="We are transparent by default. Our clients' money, data, and confidence are treated with the utmost care." />
          <FeatureCard icon="Scan Eye" title="Intelligence" body="AI-powered insights that surface patterns, flag risks, and help teams make better financial decisions faster." />
          <FeatureCard icon="Layers" title="Simplicity" body="Plain language, purposeful interfaces, and workflows that reduce effort rather than multiply it." />
          <FeatureCard icon="Trending Up" title="Rooted & Global" body="Built in Africa, designed for the world. We hold local context and global ambition in equal regard." />
        </div>
      </div>
    </section>
  );
}

export function Roadmap({ eyebrow, title, items, current }: { eyebrow: string; title: string; items: [string, string, string][]; current: number }) {
  return (
    <section className="section-y bg-page">
      <div className="wrap flex flex-col items-center gap-12">
        <SectionHeader align="center" eyebrow={eyebrow} title={title} />
        <InView className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {items.map(([phase, t, b], i) => {
            const cur = i === current;
            return (
              <div key={t} className={cx("seq-up flex flex-col gap-6 rounded-2xl p-8", cur ? "bg-navy" : "bg-subtle")} style={d(i * 200)}>
                <div className="flex items-center gap-3">
                  <span className={cx("flex size-8 items-center justify-center rounded-full text-sm font-semibold", cur ? "bg-teal text-ink" : "bg-navy text-cream")}>{i + 1}</span>
                  <span className={cx("t-eyebrow", cur ? "text-muted-dark" : "text-ink-3")}>{phase}</span>
                </div>
                <h3 className={cx("t-h3", cur ? "text-cream" : "text-ink")}>{t}</h3>
                <p className={cx("text-sm leading-[22px]", cur ? "text-mist" : "text-ink-2")}>{b}</p>
              </div>
            );
          })}
        </InView>
      </div>
    </section>
  );
}

export function FormSection({ id, eyebrow, title, body, children }: { id?: string; eyebrow: string; title: string; body: string; children: ReactNode }) {
  return (
    <section id={id} className="section-y scroll-mt-20 bg-page">
      <div className="wrap flex flex-col gap-12 lg:flex-row lg:gap-16">
        <div className="lg:w-[480px]"><SectionHeader level="page" eyebrow={eyebrow} title={title} body={body} /></div>
        <div className="flex-1 rounded-[32px] bg-subtle p-4 md:p-10">
          <div className="rounded-3xl bg-white p-6 md:p-8">{children}</div>
        </div>
      </div>
    </section>
  );
}
