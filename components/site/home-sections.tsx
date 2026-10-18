import Link from "next/link";
import type { CSSProperties } from "react";
import { AlertTriangle, ArrowRight, Sparkles } from "lucide-react";
import { Icon } from "@/lib/icons";
import type { Content, FeaturePoint, IntegrationStatus, SectionHeading } from "@/lib/types";
import { Container, Eyebrow, Heading, RichTitle } from "./heading";
import { Reveal } from "./reveal";
import { Playground } from "./playground";
import { AnalyticsCard, BrowserMockup, DashboardPreview, PhoneMockup } from "./mockups";

const visible = <T extends { visible: boolean }>(xs: T[]) => xs.filter((x) => x.visible);
const pad = (n: number) => String(n).padStart(2, "0");

/** Group items by a field, keeping first-seen group order. */
function groupBy<T>(items: T[], key: (t: T) => string) {
  const map = new Map<string, T[]>();
  for (const it of items) {
    const k = key(it) || "Other";
    map.set(k, [...(map.get(k) ?? []), it]);
  }
  return [...map.entries()];
}

/* ── Challenge: without vs. with ─────────────────────────────────────────── */

export function ChallengeSection({ c }: { c: Content }) {
  const rows = visible(c.challenges);
  if (!rows.length) return null;
  const brand = c.settings.brandName;
  return (
    <section id="challenge" className="scroll-mt-24 bg-white py-24">
      <Container>
        <Heading heading={c.headings.challenge} />

        <div className="relative">
          <div className="mb-5 hidden h-px bg-linear-to-r from-brand/0 via-brand/50 to-emerald-400/60 lg:block" />
          <div className="mb-4 hidden grid-cols-[1fr_4rem_1fr] lg:grid">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-medium text-slate-500">
              <AlertTriangle className="h-3.5 w-3.5" /> Without {brand}
            </span>
            <span />
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg shadow-brand/30">
              <Sparkles className="h-3.5 w-3.5" /> With {brand}
            </span>
          </div>

          <div className="space-y-5">
            {rows.map((r, i) => (
              <Reveal key={r.id} delay={i * 70}>
                <div className="grid items-stretch gap-3 lg:grid-cols-[1fr_4rem_1fr] lg:gap-0">
                  {/* Problem */}
                  <div className="relative rounded-2xl border border-slate-200/80 bg-slate-50/80 p-6">
                    <span className="absolute right-5 top-4 font-display text-xs font-bold text-slate-300">{pad(i + 1)}</span>
                    <div className="flex gap-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-200/60 text-slate-500">
                        <Icon name={r.icon} className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 lg:hidden">Without {brand}</p>
                        <h3 className="font-display text-lg font-semibold text-slate-700">{r.problem}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{r.problemText}</p>
                        {r.problemTag && (
                          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-500 ring-1 ring-rose-100">
                            <span className="h-1.5 w-1.5 rounded-full bg-rose-400" /> {r.problemTag}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Connector */}
                  <div className="relative flex items-center justify-center">
                    <span className="absolute inset-x-0 top-1/2 hidden border-t border-dashed border-brand/30 lg:block" />
                    <span className="relative grid h-10 w-10 rotate-90 place-items-center rounded-full bg-linear-to-br from-brand to-emerald-400 text-white shadow-lg shadow-brand/30 lg:rotate-0">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>

                  {/* Solution */}
                  <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(140deg,var(--brand-dark),color-mix(in_oklab,var(--brand-dark)_75%,var(--brand)))] p-6 shadow-xl shadow-brand-dark/20">
                    <span className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-emerald-300/70 to-transparent" />
                    <span className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand/30 blur-3xl transition-opacity duration-500 group-hover:opacity-100 lg:opacity-60" />
                    <span className="absolute right-5 top-4 font-display text-xs font-bold text-white/25">{pad(i + 1)}</span>
                    <div className="relative flex gap-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-emerald-300 ring-1 ring-white/15">
                        <Icon name={r.solutionIcon} className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-[#a5b4fc] lg:hidden">With {brand}</p>
                        <h3 className="font-display text-lg font-semibold text-white">{r.solution}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-white/60">{r.solutionText}</p>
                        {r.solutionTag && (
                          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-400/30">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {r.solutionTag}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ── Split "showcase" sections ───────────────────────────────────────────── */

function ShowcaseCopy({ heading, points }: { heading: SectionHeading; points: FeaturePoint[] }) {
  return (
    <div>
      <Reveal>
        {heading.eyebrow && <Eyebrow>{heading.eyebrow}</Eyebrow>}
        <h2 className="mt-4 font-display text-3xl font-bold leading-[1.12] tracking-tight text-ink text-balance sm:text-4xl lg:text-[2.75rem]">
          <RichTitle text={heading.title} />
        </h2>
        {heading.subtitle && <p className="mt-5 max-w-xl leading-relaxed text-muted text-pretty">{heading.subtitle}</p>}
      </Reveal>
      <ul className="mt-8 divide-y divide-slate-200/80 border-y border-slate-200/80">
        {points.map((p, i) => (
          <Reveal key={p.id} delay={i * 70}>
            <li className="group flex gap-4 py-5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white">
                <Icon name={p.icon} className="h-4.5 w-4.5" />
              </span>
              <div>
                <h3 className="font-display font-semibold text-ink">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{p.text}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

export function InventorySection({ c }: { c: Content }) {
  const items = visible(c.playground);
  return (
    <section id="inventory" className="scroll-mt-24 overflow-hidden bg-white py-24">
      <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
        <ShowcaseCopy heading={c.inventory} points={c.inventory.points} />
        <Reveal delay={120}>
          <div className="relative rounded-[2rem] bg-[linear-gradient(160deg,color-mix(in_oklab,var(--brand-dark)_80%,var(--brand)),var(--brand-dark))] p-3 shadow-2xl shadow-brand-dark/30 sm:p-6">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand/40 blur-3xl" />
            <div className="absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-accent/20 blur-3xl" />
            <div className="relative">{items.length ? <Playground items={items} /> : null}</div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function AnalyticsSection({ c }: { c: Content }) {
  return (
    <section id="analytics" className="relative scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#f3f5fc,#ffffff)] py-24">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />
      <Container className="relative grid items-center gap-14 lg:grid-cols-[1fr_1fr]">
        <Reveal className="order-last lg:order-first">
          <AnalyticsCard />
        </Reveal>
        <ShowcaseCopy heading={c.analytics} points={c.analytics.points} />
      </Container>
    </section>
  );
}

/* ── Ecosystem ───────────────────────────────────────────────────────────── */

const MODULE_COLORS = [
  { text: "text-sky-300", dot: "bg-sky-400", stroke: "#38bdf8" },
  { text: "text-emerald-300", dot: "bg-emerald-400", stroke: "#34d399" },
  { text: "text-violet-300", dot: "bg-violet-400", stroke: "#a78bfa" },
  { text: "text-amber-300", dot: "bg-amber-400", stroke: "#fbbf24" },
];
// Card corners on desktop and the curve from the hub (400,240) to each.
const CORNERS = [
  { cls: "left-0 top-0", path: "M400,240 C330,200 320,140 262,118" },
  { cls: "right-0 top-0", path: "M400,240 C470,200 480,140 538,118" },
  { cls: "left-0 bottom-0", path: "M400,240 C330,280 320,340 262,362" },
  { cls: "right-0 bottom-0", path: "M400,240 C470,280 480,340 538,362" },
];

export function EcosystemSection({ c }: { c: Content }) {
  const e = c.ecosystem;
  const modules = e.modules.slice(0, 4);
  return (
    <section id="ecosystem" className="navy-bg relative scroll-mt-24 overflow-hidden py-24">
      <div className="dot-bg absolute inset-0 opacity-40" />
      <Container className="relative">
        <Heading heading={e} dark />

        <div className="relative mx-auto max-w-4xl lg:h-[480px]">
          <svg viewBox="0 0 800 480" preserveAspectRatio="none" className="absolute inset-0 hidden h-full w-full lg:block" aria-hidden>
            {modules.map((m, i) => (
              <g key={m.id}>
                <path d={CORNERS[i].path} fill="none" stroke={MODULE_COLORS[i].stroke} strokeOpacity="0.45" strokeWidth="1.5" strokeDasharray="4 6" className="animate-dash" />
                <circle r="4" fill={MODULE_COLORS[i].stroke}>
                  <animateMotion dur={`${2.6 + i * 0.4}s`} repeatCount="indefinite" path={CORNERS[i].path} />
                </circle>
              </g>
            ))}
          </svg>

          {/* Hub */}
          <div className="relative mx-auto mb-8 grid h-36 w-36 place-items-center lg:absolute lg:left-1/2 lg:top-1/2 lg:mb-0 lg:-translate-x-1/2 lg:-translate-y-1/2">
            <span className="absolute inset-0 rounded-full border border-white/10" />
            <span className="absolute inset-3 rounded-full border border-white/15 animate-orbit-slow [border-top-color:color-mix(in_oklab,var(--brand)_60%,white)]" />
            <span className="absolute inset-0 rounded-full bg-brand/20 animate-ping [animation-duration:3.5s]" />
            <span className="relative grid h-24 w-24 place-items-center rounded-full bg-[radial-gradient(circle_at_30%_25%,color-mix(in_oklab,var(--brand)_60%,white),var(--brand-dark)_75%)] shadow-2xl shadow-brand/50 ring-4 ring-white/10">
              <span className="font-display text-2xl font-extrabold text-white">{c.settings.logoText}</span>
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:contents">
            {modules.map((m, i) => (
              <Reveal key={m.id} delay={i * 90} className={`lg:absolute lg:w-[32%] ${CORNERS[i].cls}`}>
                <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-5 shadow-2xl shadow-black/20 backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/10">
                  <p className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] ${MODULE_COLORS[i].text}`}>
                    <span className="h-px w-4 bg-current" /> {m.label}
                  </p>
                  <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2.5">
                    {m.items.map((it) => (
                      <li key={it} className="flex items-center gap-2 text-sm text-white/85">
                        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${MODULE_COLORS[i].dot}`} /> {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ── Dashboard preview ───────────────────────────────────────────────────── */

export function DashboardSection({ c }: { c: Content }) {
  return (
    <section id="dashboard" className="relative scroll-mt-24 overflow-hidden py-24">
      <div className="sky-bg absolute inset-0 -z-10" />
      <div className="sky-grid absolute inset-0 -z-10" />
      <Container>
        <Heading heading={c.headings.dashboard} />
        <Reveal>
          <div className="relative mx-auto max-w-6xl">
            <div className="absolute -inset-x-10 -bottom-10 top-10 -z-10 rounded-[3rem] bg-brand/20 blur-3xl" />
            <DashboardPreview />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ── Integrations wall ───────────────────────────────────────────────────── */

const LOGO_GRADIENTS = [
  "from-indigo-500 to-blue-600",
  "from-rose-500 to-red-600",
  "from-sky-500 to-blue-700",
  "from-violet-500 to-purple-700",
  "from-amber-400 to-orange-500",
  "from-emerald-500 to-green-700",
  "from-cyan-500 to-teal-600",
  "from-fuchsia-500 to-pink-600",
];

const STATUS: Record<IntegrationStatus, { label: string; cls: string }> = {
  live: { label: "Live", cls: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/30" },
  certified: { label: "Certified", cls: "bg-indigo-400/10 text-indigo-300 ring-indigo-400/30" },
  new: { label: "New", cls: "bg-amber-400/10 text-amber-300 ring-amber-400/30" },
  soon: { label: "Soon", cls: "bg-white/5 text-white/50 ring-white/15" },
};

export function IntegrationsSection({ c }: { c: Content }) {
  const groups = groupBy(visible(c.integrations), (i) => i.group);
  const ticker = visible(c.playground).map((p) => `${p.label} · ${p.method} ${p.endpoint} · ${p.latency} ms`);
  let n = 0;
  return (
    <section id="integrations" className="ink-bg relative scroll-mt-24 overflow-hidden py-24">
      <Container className="relative">
        <Heading heading={c.headings.integrations} dark />

        <div className="space-y-10">
          {groups.map(([group, items]) => (
            <div key={group}>
              <div className="mb-4 flex items-center gap-4">
                <span className="h-px flex-1 bg-linear-to-r from-transparent to-white/15" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">{group}</span>
                <span className="h-px flex-1 bg-linear-to-l from-transparent to-white/15" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((it) => {
                  const st = STATUS[it.status] ?? STATUS.live;
                  const grad = LOGO_GRADIENTS[n++ % LOGO_GRADIENTS.length];
                  const soon = it.status === "soon";
                  return (
                    <Reveal key={it.id} delay={(n % 4) * 60}>
                      <div className="group relative flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07]">
                        {it.status === "live" && (
                          <span className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgb(52_211_153)]" />
                        )}
                        <span
                          className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-[11px] font-extrabold tracking-wide text-white shadow-lg ${
                            soon ? "border border-dashed border-white/25 bg-white/5 text-white/60" : `bg-linear-to-br ${grad}`
                          }`}
                        >
                          {it.code}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold text-white">{it.name}</span>
                          <span className="block truncate text-xs text-white/45">{it.note}</span>
                        </span>
                        <span className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold ring-1 ${st.cls}`}>{st.label}</span>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Container>

      {ticker.length > 0 && (
        <div className="relative mt-14 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max gap-3 animate-marquee [animation-duration:45s]">
            {[...ticker, ...ticker, ...ticker, ...ticker].map((t, i) => (
              <span key={i} className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-xs text-white/55">
                <span className={`h-1.5 w-1.5 rounded-full ${["bg-emerald-400", "bg-sky-400", "bg-violet-400", "bg-amber-400"][i % 4]}`} />
                {t}
                <span className="text-emerald-300">200 OK</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

/* ── Web + mobile sync ───────────────────────────────────────────────────── */

const SYNC_DOTS = ["bg-emerald-400", "bg-sky-400", "bg-violet-400", "bg-amber-400"];

export function SyncSection({ c }: { c: Content }) {
  const s = c.sync;
  let host = "app.example.com";
  try {
    host = `app.${new URL(`https://${c.settings.email.split("@")[1] ?? ""}`).hostname}`;
  } catch {}
  return (
    <section id="sync" className="ink-bg relative scroll-mt-24 overflow-hidden py-24">
      <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-brand/20 blur-3xl" />
      <Container className="relative">
        <Reveal className="max-w-2xl">
          {s.eyebrow && (
            <span className="inline-flex rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">{s.eyebrow}</span>
          )}
          <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.12] tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
            <RichTitle text={s.title} dark />
          </h2>
          {s.subtitle && <p className="mt-5 leading-relaxed text-white/60">{s.subtitle}</p>}
        </Reveal>

        <div className="mt-14 grid items-center gap-14 lg:grid-cols-[1.45fr_1fr]">
          <Reveal className="relative">
            <BrowserMockup host={host} />
            <span className="absolute -bottom-4 left-6 rounded-full bg-brand px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-brand/40">Web version</span>
          </Reveal>
          <Reveal delay={150} className="relative">
            <PhoneMockup />
            <span className="absolute -bottom-4 right-1/2 translate-x-[140px] rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/40">Mobile app</span>
          </Reveal>
        </div>

        {s.points.length > 0 && (
          <Reveal className="mt-16">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-5 sm:rounded-full">
              {s.points.map((p, i) => (
                <li key={p} className="flex items-center gap-2 text-sm text-white/75">
                  <span className={`h-2 w-2 rounded-full ${SYNC_DOTS[i % SYNC_DOTS.length]}`} /> {p}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </Container>
    </section>
  );
}

/* ── Pricing ─────────────────────────────────────────────────────────────── */

export function PricingSection({ c }: { c: Content }) {
  const p = c.pricing;
  return (
    <section id="pricing" className="scroll-mt-24 bg-[#f1f3f9] py-24">
      <Container className="max-w-3xl text-center">
        <Reveal>
          {p.eyebrow && (
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-600 ring-1 ring-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {p.eyebrow}
            </span>
          )}
          <h2 className="mt-5 font-display text-3xl font-bold leading-[1.12] tracking-tight text-ink text-balance sm:text-4xl lg:text-[2.75rem]">
            <RichTitle text={p.title} />
          </h2>
          {p.subtitle && <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted">{p.subtitle}</p>}
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-10 grid max-w-xl overflow-hidden rounded-3xl border border-white bg-white text-left shadow-xl shadow-slate-900/5 sm:grid-cols-(--plans)" style={{ "--plans": `repeat(${Math.max(p.plans.length, 1)}, minmax(0, 1fr))` } as CSSProperties}>
            {p.plans.map((plan, i) => (
              <div key={plan.id} className={`p-6 sm:p-7 ${i ? "border-t border-slate-100 sm:border-l sm:border-t-0" : ""}`}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">{plan.label}</p>
                <p className="mt-3 flex items-start font-display font-extrabold leading-none tracking-tight text-[color-mix(in_oklab,var(--brand-dark)_85%,var(--brand))]">
                  {plan.prefix && <span className="mt-1 text-xl">{plan.prefix}</span>}
                  <span className="text-5xl">{plan.amount}</span>
                  {plan.suffix && <span className="ml-1 self-end pb-1 text-sm font-medium text-muted">{plan.suffix}</span>}
                </p>
                <p className="mt-3 text-sm text-muted">{plan.note}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={160} className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/#demo" className="group inline-flex items-center gap-2 rounded-xl bg-[color-mix(in_oklab,var(--brand-dark)_85%,var(--brand))] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-dark/25 transition hover:-translate-y-0.5">
            {p.primary} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
          <Link href="/contact" className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-brand/30 hover:text-brand">
            {p.secondary}
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
