import Link from "next/link";

export function Logo({ light = false, scale = 1, link = true }: { light?: boolean; scale?: number; link?: boolean }) {
  const inner = (
    <span className="flex items-center gap-2" style={{ gap: 8 * scale }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={light ? "/images/logo-mark-light.svg" : "/images/logo-mark.svg"} alt="" width={26.84 * scale} height={35.98 * scale} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={light ? "/images/logo-word-light.svg" : "/images/logo-word.svg"} alt="XPensari" width={90 * scale} height={36 * scale} />
    </span>
  );
  if (!link) return inner;
  return (
    <Link href="/" aria-label="XPensari home" className="shrink-0">
      {inner}
    </Link>
  );
}
