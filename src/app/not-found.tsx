import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Button, SectionHeader } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main" className="section-y bg-page">
        <div className="wrap flex flex-col items-center gap-8 py-16 text-center">
          <span aria-hidden="true" className="font-display text-[160px] leading-none text-teal-display md:text-[220px]">404</span>
          <SectionHeader as="h1" level="page" align="center" eyebrow="Page not found" title="This page took a wrong turn." body="The link may be broken, or the page may have moved. Head back home or try one of the pages below." />
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/">Back to homepage</Button>
            <Button href="/contact" variant="secondary">Contact support</Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
