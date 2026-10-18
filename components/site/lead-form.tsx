"use client";

import { useActionState, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { submitLead, type LeadState } from "@/app/actions/public";

const BUSINESS = ["Online Travel Agency", "Corporate / TMC", "Booking engine / SaaS", "Startup", "Loyalty / E-commerce", "Other"];

export function LeadForm({
  products,
  dark = false,
  submitLabel = "Request sandbox access",
}: {
  products: string[];
  /** Glass styling for navy sections. */
  dark?: boolean;
  submitLabel?: string;
}) {
  const [state, action, pending] = useActionState<LeadState, FormData>(submitLead, null);
  const [picked, setPicked] = useState<string[]>([]);
  const err = state?.errors ?? {};

  if (state?.ok) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-emerald-200 bg-emerald-50 p-10 text-center animate-fade-up">
        <CheckCircle2 className="h-12 w-12 text-emerald-600" />
        <h3 className="mt-4 font-display text-xl font-bold text-ink">Request received</h3>
        <p className="mt-2 max-w-sm text-sm text-muted">{state.message}</p>
      </div>
    );
  }

  const input = (hasErr?: string) =>
    dark
      ? `w-full rounded-xl border bg-white/[0.07] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-brand focus:bg-white/10 focus:ring-4 focus:ring-brand/20 [&>option]:text-ink ${
          hasErr ? "border-rose-400" : "border-white/10"
        }`
      : `w-full rounded-xl border bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-brand/10 ${
          hasErr ? "border-rose-400" : "border-slate-200"
        }`;
  const labelCls = dark ? "mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-white/60" : "mb-1.5 block text-sm font-medium text-ink";
  const errCls = dark ? "mt-1 block text-xs text-rose-300" : "mt-1 block text-xs text-rose-600";

  return (
    <form action={action} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Full name</span>
          <input name="name" className={input(err.name)} placeholder="Jane Doe" autoComplete="name" />
          {err.name && <span className={errCls}>{err.name}</span>}
        </label>
        <label className="block">
          <span className={labelCls}>Work email</span>
          <input name="email" type="email" className={input(err.email)} placeholder="jane@company.com" autoComplete="email" />
          {err.email && <span className={errCls}>{err.email}</span>}
        </label>
        <label className="block">
          <span className={labelCls}>Company</span>
          <input name="company" className={input(err.company)} placeholder="Company Ltd." autoComplete="organization" />
          {err.company && <span className={errCls}>{err.company}</span>}
        </label>
        <label className="block">
          <span className={labelCls}>Business type</span>
          <select name="businessType" className={input()} defaultValue={BUSINESS[0]}>
            {BUSINESS.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </label>
      </div>

      <fieldset>
        <legend className={dark ? "mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/60" : "mb-2 text-sm font-medium text-ink"}>Interested in</legend>
        <div className="flex flex-wrap gap-2">
          {products.map((p) => {
            const on = picked.includes(p);
            return (
              <label
                key={p}
                className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  on
                    ? "border-brand bg-brand text-white"
                    : dark
                      ? "border-white/15 bg-white/5 text-white/70 hover:border-white/30"
                      : "border-slate-200 bg-white text-slate-600 hover:border-brand/40"
                }`}
              >
                <input
                  type="checkbox"
                  name="products"
                  value={p}
                  checked={on}
                  onChange={() => setPicked((xs) => (on ? xs.filter((x) => x !== p) : [...xs, p]))}
                  className="sr-only"
                />
                {p}
              </label>
            );
          })}
        </div>
      </fieldset>

      <label className="block">
        <span className={labelCls}>Tell us about your project</span>
        <textarea name="message" rows={4} className={input()} placeholder="Expected monthly bookings, markets, timeline…" />
      </label>

      {state && !state.ok && <p className={`rounded-lg px-4 py-2.5 text-sm ${dark ? "bg-rose-500/15 text-rose-200" : "bg-rose-50 text-rose-700"}`}>{state.message}</p>}

      <button
        disabled={pending}
        className={`group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110 disabled:opacity-70 ${dark ? "bg-linear-to-r from-brand to-violet-500 shadow-brand/40" : "bg-brand shadow-brand/25"}`}
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {pending ? "Sending…" : submitLabel}
        {!pending && <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />}
      </button>
    </form>
  );
}
