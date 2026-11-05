"use client";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
export { d } from "./seq";
import { cx } from "./ui";

/** Arms a subtree for CSS sequence animations; sets data-in once it scrolls into view (plays once, holds final state). */
export function InView({ children, className = "", as = "div", style, threshold = 0.25 }: { children: ReactNode; className?: string; as?: "div" | "section"; style?: CSSProperties; threshold?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setArmed(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  const Tag = as;
  return (
    <Tag ref={ref} className={className} style={style} data-armed={armed ? "" : undefined} data-in={inView ? "" : undefined}>
      {children}
    </Tag>
  );
}


/** Auto-advancing step index (one pass, then holds). Pauses on hover/focus and when off-screen; disabled for reduced motion. */
export function useStepper(count: number, ms = 3000) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setAuto(false);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!auto || paused || !visible) return;
    if (i >= count - 1) return;
    const t = setTimeout(() => setI((v) => v + 1), ms);
    return () => clearTimeout(t);
  }, [i, auto, paused, visible, count, ms]);
  const select = (n: number) => {
    setAuto(false);
    setI(n);
  };
  const running = auto && !paused && visible && i < count - 1;
  const bind = {
    ref,
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocus: () => setPaused(true),
    onBlur: () => setPaused(false),
  };
  return { i, select, running, auto, paused: paused || !visible, bind };
}

export function StepBar({ active, done, running, paused, dark, className = "", ms = 3000 }: { active: boolean; done: boolean; running: boolean; paused: boolean; dark?: boolean; className?: string; ms?: number }) {
  return (
    <span className={cx("relative block h-0.5 w-full overflow-hidden", dark ? "bg-navy-raised" : "bg-line", className)}>
      {active && running ? (
        <span key="run" className={cx("step-fill absolute inset-0 bg-teal", paused && "paused")} style={{ ["--dur" as string]: `${ms}ms` }} />
      ) : (
        <span className="absolute inset-0 origin-left bg-teal transition-transform duration-300" style={{ transform: `scaleX(${active || done ? 1 : 0})` }} />
      )}
    </span>
  );
}
