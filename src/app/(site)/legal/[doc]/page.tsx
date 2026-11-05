import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Icon } from "@/components/ui";
import { LEGAL } from "@/data/legal";

export function generateStaticParams() {
  return Object.keys(LEGAL).map((doc) => ({ doc }));
}

export async function generateMetadata({ params }: { params: Promise<{ doc: string }> }): Promise<Metadata> {
  const d = LEGAL[(await params).doc];
  return d ? { title: d.title, description: d.intro } : {};
}

export default async function LegalPage({ params }: { params: Promise<{ doc: string }> }) {
  const d = LEGAL[(await params).doc];
  if (!d) notFound();
  return (
    <>
      <section className="bg-page pb-12 pt-16">
        <div className="wrap flex flex-col gap-4">
          <p className="t-eyebrow text-ink-3">Legal</p>
          <h1 className="t-h1">{d.title}</h1>
          <p className="t-lead max-w-[720px] text-ink-2">{d.intro}</p>
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="wrap flex flex-col gap-8 md:gap-12 lg:flex-row lg:gap-16">
          <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:w-[240px] lg:self-start">
            <p className="t-eyebrow mb-3 text-ink-3">On this page</p>
            <ol className="flex flex-col">
              {d.clauses.map(([t], i) => (
                <li key={t}><a href={`#c${i + 1}`} className="block py-2 text-sm text-ink-2 hover:text-teal-text">{i + 1}. {t}</a></li>
              ))}
            </ol>
          </nav>
          <div className="flex max-w-[880px] flex-1 flex-col">
            <p className="mb-4 flex items-center gap-3 rounded-xl bg-amber-tint px-5 py-4 text-sm text-ink">
              <Icon name="Info" size={20} className="shrink-0" /> Draft placeholder copy pending legal review. Not legal advice, and not for publishing as-is.
            </p>
            {d.clauses.map(([t, b], i) => (
              <section key={t} id={`c${i + 1}`} className="flex scroll-mt-28 flex-col gap-3 border-t border-line py-8">
                <h2 className="text-lg font-semibold leading-6">{i + 1}. {t}</h2>
                {b.split("\n").map((p) => <p key={p} className="text-base leading-6 text-ink-2">{p}</p>)}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
