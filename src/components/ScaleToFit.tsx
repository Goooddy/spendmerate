"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

/** Renders a fixed-size illustration and scales it down to fit its container width. */
export function ScaleToFit({ width, height, children, className = "", max = 1 }: { width: number; height: number; children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [s, setS] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setS(Math.min(max, e.contentRect.width / width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [width, max]);
  return (
    <div ref={ref} className={className} style={{ width: "100%", height: height * s, overflow: "hidden" }}>
      <div style={{ width, height, transform: `scale(${s})`, transformOrigin: "top left" }}>{children}</div>
    </div>
  );
}
