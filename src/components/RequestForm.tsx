"use client";
import { useState, type FormEvent } from "react";
import { Field, FormSuccess, validate } from "./Field";
import { Icon } from "./ui";

export type FieldDef = { name: string; label: string; required?: boolean; type?: string; placeholder?: string; as?: "input" | "select" | "textarea"; options?: string[]; full?: boolean };

export function RequestForm({ fields, submit, success }: { fields: FieldDef[]; submit: string; success: { title: string; body: string } }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate(new FormData(e.currentTarget), fields.filter((f) => f.required).map((f) => f.name), fields.filter((f) => f.type === "email").map((f) => f.name));
    setErrors(errs);
    if (Object.keys(errs).length) return (e.currentTarget.querySelector("[aria-invalid=true]") as HTMLElement | null)?.focus();
    setSent(true);
  };
  if (sent) return <FormSuccess {...success} />;
  return (
    <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {fields.map((f) => (
        <Field key={f.name} className={f.full || f.as === "textarea" || f.as === "select" ? "sm:col-span-2" : ""} name={f.name} label={f.label} required={f.required} type={f.type} placeholder={f.placeholder} as={f.as} options={f.options} defaultValue={f.as === "select" ? "" : undefined} error={errors[f.name]} />
      ))}
      <button type="submit" className="inline-flex items-center justify-center gap-2 justify-self-start rounded-lg bg-teal px-6 py-3 font-semibold text-ink hover:bg-[#13a382] sm:col-span-2">
        {submit} <Icon name="Arrow Right" size={20} />
      </button>
    </form>
  );
}
