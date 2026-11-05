const LOGOS = [
  { src: "/images/logo-workmerate.svg", alt: "WorkMerate", w: 240, h: 28 },
  { src: "/images/logo-access.png", alt: "Access Bank", w: 113, h: 28 },
  { src: "/images/logo-chamsaccess.svg", alt: "ChamsAccess", w: 75, h: 50 },
  { src: "/images/logo-zenith.svg", alt: "Zenith Bank", w: 38, h: 40 },
  { src: "/images/logo-gtbank.svg", alt: "GTBank", w: 36, h: 36 },
  { src: "/images/logo-uba.svg", alt: "UBA", w: 68, h: 32 },
  { src: "/images/logo-stanbic.png", alt: "Stanbic IBTC", w: 86, h: 30 },
  { src: "/images/logo-sterling.png", alt: "Sterling Bank", w: 104, h: 32 },
];

export function LogoMarquee() {
  return (
    <div className="relative overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)" }}>
      <div className="marquee-track flex w-max">
        {[0, 1, 2].map((set) => (
          <ul key={set} aria-hidden={set > 0} className="flex shrink-0 items-center gap-16 pr-16">
            {LOGOS.map((l) => (
              <li key={l.alt} className="flex h-16 items-center opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.src} alt={set === 0 ? l.alt : ""} width={l.w} height={l.h} style={{ height: l.h, width: "auto" }} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
