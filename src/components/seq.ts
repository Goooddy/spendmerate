import type { CSSProperties } from "react";

/** Inline style for a sequence-animation delay (server-safe). */
export const d = (ms: number, extra?: CSSProperties): CSSProperties => ({ ["--d" as string]: `${ms}ms`, ...extra });
