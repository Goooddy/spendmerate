/**
 * CTA band artwork — rebuilt from the Figma CTA band component (442:16839) geometry.
 * Every page's band overrides the image inside the inner orbit ring, so `image` is per instance.
 * viewBox is the 560×560 box around the 450×450 art (the glow overhangs it by 55px).
 */
export type CtaArtTone = "navy" | "teal" | "amber" | "mint";

const TONES: Record<CtaArtTone, { glow: string; glowOpacity: number; orbit: string; orbitOpacity: number; accent: string }> = {
  navy: { glow: "#17B893", glowOpacity: 0.07, orbit: "#17B893", orbitOpacity: 1, accent: "#F2A93B" },
  teal: { glow: "#FFFFFF", glowOpacity: 0.14, orbit: "#222148", orbitOpacity: 0.3, accent: "#F2A93B" },
  amber: { glow: "#FFFFFF", glowOpacity: 0.16, orbit: "#222148", orbitOpacity: 0.3, accent: "#222148" },
  mint: { glow: "#17B893", glowOpacity: 0.1, orbit: "#17B893", orbitOpacity: 1, accent: "#F2A93B" },
};

export function CtaArt({ tone, image, className = "" }: { tone: CtaArtTone; image: string; className?: string }) {
  const t = TONES[tone];
  const uid = `cta-${tone}-${image.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg viewBox="80 -110 560 560" fill="none" overflow="visible" aria-hidden="true" focusable="false" className={className} style={{ overflow: "visible" }}>
      <defs>
        <filter id={`${uid}-glow`} x="0" y="-190" width="720" height="720" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="40" />
        </filter>
        <filter id={`${uid}-ring`} x="203.8" y="13.8" width="312.4" height="312.4" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
        <pattern id={`${uid}-img`} patternContentUnits="objectBoundingBox" width="1" height="1">
          <image href={`/images/cta/${image}.jpg`} width="1" height="1" preserveAspectRatio="xMidYMid slice" />
        </pattern>
      </defs>
      <g opacity={t.glowOpacity} filter={`url(#${uid}-glow)`}>
        <circle cx="360" cy="170" r="280" fill={t.glow} />
      </g>
      <circle cx="360" cy="170" r="224.5" stroke={t.orbit} opacity={t.orbitOpacity} />
      <g filter={`url(#${uid}-ring)`}>
        <circle cx="360" cy="170" r="145.5" stroke={`url(#${uid}-img)`} strokeWidth="19" />
      </g>
      <path
        d="M373.219 82.3937C383.039 68.3692 402.369 64.9608 416.394 74.7809C430.418 84.601 433.827 103.931 424.007 117.955L329.94 252.296C320.12 266.321 300.79 269.729 286.765 259.909C272.741 250.089 269.333 230.759 279.153 216.735L373.219 82.3937Z"
        fill={t.accent}
      />
    </svg>
  );
}
