import Link from "next/link";
import { FOOTER_GROUPS } from "@/data/site";
import { Logo } from "./Logo";
import { Icon } from "./ui";
import { NewsletterForm } from "./forms";

const SOCIAL = [
  { label: "X", href: "https://x.com", d: "M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.17h1.7L7.4 4.74H5.58l11.09 14.43Z", fill: true },
  { label: "LinkedIn", href: "https://linkedin.com", d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" },
  { label: "Instagram", href: "https://instagram.com", d: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm9 5.5h.01M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" },
];

export function Footer() {
  return (
    <footer className="bg-navy text-cream">
      <div className="wrap flex flex-col gap-8 pb-6 pt-12 md:gap-12 md:pb-8 md:pt-16">
        <div className="flex flex-col gap-8 md:gap-12 lg:flex-row lg:gap-16">
          <div className="flex w-full max-w-[360px] flex-col gap-6">
            <Logo light />
            <p className="text-sm leading-[22px] text-mist">The AI-native financial and revenue operating system for Nigerian and African enterprises.</p>
            <a href="mailto:support@spendmerate.com" className="flex items-center gap-2 text-sm leading-[22px] text-cream hover:underline">
              <Icon name="Mail" size={20} /> support@spendmerate.com
            </a>
            <div className="flex flex-col gap-3">
              <p className="text-base font-semibold leading-[22px]">Finance insights, once a month</p>
              <NewsletterForm dark />
            </div>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {FOOTER_GROUPS.map((g) => (
              <div key={g.label} className="flex flex-col gap-3">
                <p className="text-base font-semibold leading-[22px]">{g.label}</p>
                {g.links.map((l) => (
                  <Link key={l.href + l.title} href={l.href} className="text-sm leading-[22px] text-mist hover:text-cream">{l.title}</Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-4 border-t border-navy-raised pt-6 md:flex-row md:items-center">
          <p className="text-xs leading-[18px] text-muted-dark">© 2026 SpendMerate. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6 text-sm leading-[22px] text-mist">
            <Link href="/legal/terms" className="hover:text-cream">Terms and Conditions</Link>
            <Link href="/legal/privacy" className="hover:text-cream">Privacy Policy</Link>
            <Link href="/legal/cookies" className="hover:text-cream">Cookie Policy</Link>
          </div>
          <div className="flex gap-2">
            {SOCIAL.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noreferrer" className="flex size-9 items-center justify-center rounded-full bg-navy-raised text-teal-bright hover:bg-[#4a4b70]">
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill={s.fill ? "currentColor" : "none"} stroke={s.fill ? "none" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
