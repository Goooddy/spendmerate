import type { Metadata } from "next";
import { CtaBand, Icon, SectionHeader } from "@/components/ui";
import { MissionBand, Pillars, Roadmap, SplitHero } from "@/components/company";

export const metadata: Metadata = { title: "About", description: "Africa's Intelligent Financial Operations Platform." };

const TEAM = [
  ["b9fe467a", "[Founder / CEO Name]", "Co-Founder & Chief Executive Officer"],
  ["2c33c24b", "[Co-Founder / CTO Name]", "Co-Founder & Chief Technology Officer"],
  ["78d4e0ba", "[Leadership Name]", "Chief Financial Officer"],
  ["89bd24db", "[Leadership Name]", "Head of Product"],
];

export default function AboutPage() {
  return (
    <>
      <SplitHero eyebrow="About XPensari" title="Africa's Intelligent Financial Operations Platform" body="Built to help organizations spend less, automate more, stay compliant, and make smarter financial decisions." cta="Explore our solutions" ctaHref="/solutions" image="/images/69f88811.jpg" card={{ title: "Your ambition. Fewer obstacles." }} />
      <section className="section-y bg-white">
        <div className="wrap flex flex-col items-center gap-8 md:gap-12 lg:flex-row lg:gap-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/4be01f3a.jpg" alt="Business owner reviewing finances" className="h-[420px] w-full rounded-3xl md:rounded-[32px] object-cover lg:h-[560px] lg:w-[520px]" loading="lazy" />
          <div className="flex flex-1 flex-col gap-8">
            <SectionHeader eyebrow="Our Story" title="Money is complex. Life isn't." />
            <p className="t-lead text-ink-2">XPensari is designed to bridge the gap between traditional ERP and native financial intelligence; built on a customised Odoo ERP. We advocate for Nigerians and African enterprises worldwide. Behind every balance is a bigger story: a first paycheck, an independent venture, a business ready for its next chapter. Financial tools should help that story move forward—not get in the way.</p>
            <ul className="flex flex-col gap-4">
              {[["People come first", "From daily expenses to your next milestone, make financial decisions with tools built for the way your business works."], ["Turn complexity into clarity", ""], ["Move your business forward", ""]].map(([t, b]) => (
                <li key={t} className="flex gap-3 border-t border-line pt-4">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-teal-chip"><Icon name="Check" size={14} /></span>
                  <span className="flex flex-col gap-1"><span className="text-base font-semibold">{t}</span>{b && <span className="text-sm text-ink-2">{b}</span>}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <MissionBand label="Mission & Vision" title="Less busywork. Smarter finance." body="Our purpose is to put clear, useful financial tools within reach—so people and businesses can spend less energy managing money and more energy shaping what comes next." />
      <Pillars eyebrow="Brand Pillars" body="Four pillars—Trust, Intelligence, Simplicity, Rooted & Global." />
      <Roadmap eyebrow="Roadmap" title="Built new, philosophically not replacement." current={1} items={[
        ["Phase 1", "Infrastructure & AI Model Training", "Infrastructure & AI model training on SMEs."],
        ["Phase 2", "Deep Core Integrations", "Deep core integrations, plus links with Nigerian HMEs."],
        ["Phase 3", "Full AI-Native Transformation", "Full AI-native transformation for legacy system users."],
      ]} />
      <section className="section-y bg-white">
        <div className="wrap flex flex-col items-center gap-8 md:gap-12">
          <SectionHeader align="center" eyebrow="Leadership" title="Different perspectives. One shared direction." body="Better finance takes more than technology. It takes curious minds, thoughtful design, and people who care about the person on the other side of the screen." />
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map(([img, n, r]) => (
              <figure key={r} className="flex flex-col items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/images/${img}.jpg`} alt={`Portrait of the ${r}`} className="h-80 w-full rounded-2xl bg-subtle object-cover" loading="lazy" />
                <figcaption className="flex flex-col items-center gap-1 text-center">
                  <span className="text-base font-semibold">{n}</span>
                  <span className="text-xs text-ink-3">{r}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <CtaBand image="73fee244" eyebrow="Your next chapter" title="LET'S MOVE FORWARD. TOGETHER." body="Find a simpler way to manage your money—and more room for your ambition." primary={{ label: "See Careers", href: "/careers" }} secondary={{ label: "Contact Us", href: "/contact" }} />
    </>
  );
}
