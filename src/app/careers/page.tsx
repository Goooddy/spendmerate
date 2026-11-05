import type { Metadata } from "next";
import { CtaBand, SectionHeader } from "@/components/ui";
import { MissionBand, Pillars, SplitHero } from "@/components/company";

export const metadata: Metadata = { title: "Careers", description: "Help build the platform Africa's enterprises deserve." };

export default function CareersPage() {
  return (
    <>
      <SplitHero eyebrow="Careers" title="Help build the platform Africa's enterprises deserve." body="Join us in making Nigerian businesses AI-native: finance software built for local tax, local money and local realities." cta="See open roles" ctaHref="#roles" alt={{ label: "Contact us", href: "/contact" }} image="/images/69f88811.jpg" card={{ title: "What you'd help build." }} />
      <MissionBand label="Why XPensari" title="Hard problems. Real impact." body="We're bringing AI-native finance to enterprises that foreign software has underserved, starting with compliance under the Nigeria Tax Act 2025." />
      <Pillars eyebrow="How we work" body="The same four pillars guide how we build, hire and work together." />
      <section id="roles" className="section-y scroll-mt-20 bg-page">
        <div className="wrap">
          <SectionHeader align="center" eyebrow="Open roles" title="No open roles right now." body="We're not hiring through the site yet. New roles will be listed here first, so check back soon." />
        </div>
      </section>
      <CtaBand eyebrow="Get in touch" title="Not seeing your role?" body="Tell us what you'd bring to XPensari. We read every message." primary={{ label: "Contact Us", href: "/contact" }} />
    </>
  );
}
