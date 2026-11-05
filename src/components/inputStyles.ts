import { cx } from "./ui";

/**
 * Form field states, from the Figma "Form field" component (94:189):
 * Default  – border #808095 1px, placeholder #64647E
 * Filled   – same border, value #222148
 * Focus    – 2px border #037459 (1px border + 1px ring)
 * Error    – border #D64545, helper text #B6232A
 * Disabled – fill #EBE7E2, border #D8D4D4, text #9B9AA8
 * Input text is 16px on mobile so iOS does not zoom.
 */
export function fieldClass({ error, dark, className = "" }: { error?: boolean; dark?: boolean; className?: string } = {}) {
  return cx(
    "w-full rounded-lg border px-4 py-3 text-base outline-none transition-[border-color,box-shadow] duration-150 focus:ring-1",
    "disabled:cursor-not-allowed disabled:border-line disabled:bg-subtle disabled:text-disabled disabled:placeholder:text-disabled",
    dark
      ? "bg-navy-raised text-cream placeholder:text-muted-dark"
      : "bg-white text-ink placeholder:text-ink-3",
    error
      ? "border-error focus:border-error focus:ring-error"
      : dark
        ? "border-line-dark focus:border-teal-bright focus:ring-teal-bright"
        : "border-line-strong focus:border-teal-text focus:ring-teal-text",
    className,
  );
}

/** Pill containers (input + button inside one rounded box): the whole pill takes the state. */
export function pillClass({ error, dark, className = "" }: { error?: boolean; dark?: boolean; className?: string } = {}) {
  return cx(
    "flex items-center gap-2 rounded-2xl border py-1.5 pl-5 pr-1.5 transition-[border-color,box-shadow] duration-150 focus-within:ring-1",
    dark ? "bg-navy-raised" : "bg-white",
    error
      ? "border-error focus-within:border-error focus-within:ring-error"
      : dark
        ? "border-line-dark focus-within:border-teal-bright focus-within:ring-teal-bright"
        : "border-line-strong focus-within:border-teal-text focus-within:ring-teal-text",
    className,
  );
}

/** The bare input inside a pill. */
export function pillInputClass(dark?: boolean) {
  return cx(
    "min-w-0 flex-1 bg-transparent text-base outline-none focus-visible:outline-none md:text-sm",
    dark ? "text-cream placeholder:text-muted-dark" : "text-ink placeholder:text-ink-3",
  );
}

export const helperClass = (error?: boolean, dark?: boolean) => cx("text-xs leading-4", error ? (dark ? "text-[#ff8a8a]" : "text-error-text") : dark ? "text-muted-dark" : "text-ink-3");
