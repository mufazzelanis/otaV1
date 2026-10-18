import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Layers, Mail, MapPin, MessageCircle, Phone, Quote, Shield, Sparkles, Star, Tag, X, Zap } from "lucide-react";
import { Icon, TONES } from "@/lib/icons";
import type { CompareMark, Content } from "@/lib/types";
import { Container, Eyebrow, Heading } from "./heading";
import { Reveal } from "./reveal";
import { HeroArt } from "./mockups";
import { LeadForm } from "./lead-form";
import { CountUp } from "./count-up";
import { FaqList, VideoButton } from "./interactive";

const visible = <T extends { visible: boolean }>(xs: T[]) => xs.filter((x) => x.visible);

export function HeroSection({ c }: { c: Content }) {
  const { hero } = c;
  const satellites = visible(c.products).map((p) => ({ icon: p.icon, label: p.name.replace(/ API$/, "") }));
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="sky-bg absolute inset-0 -z-10" />
      <div className="sky-grid absolute inset-0 -z-10" />
      <div className="absolute -left-24 top-1/3 -z-10 h-72 w-72 rounded-full bg-white blur-3xl" />
      <Container className="relative grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <div>
          <Link
            href="/#products"
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand/15 bg-white/70 py-1 pl-1 pr-3 text-xs font-medium text-slate-600 shadow-sm backdrop-blur transition hover:border-brand/30 animate-fade-up"
          >
            {hero.badgeTag && <span className="shrink-0 rounded-full bg-brand px-2 py-0.5 text-[11px] font-bold text-white">{hero.badgeTag}</span>}
            <span className="truncate">{hero.badge}</span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0 text-brand" />
          </Link>
          <h1 className="mt-7 font-display text-[2.6rem] font-extrabold leading-[1.04] tracking-tight text-ink text-balance sm:text-6xl xl:text-[4.25rem]">
            {hero.titleLines.map((line, i) => (
              <span key={i} className="block animate-fade-up" style={{ animationDelay: `${80 * (i + 1)}ms` }}>
                {line}
              </span>
            ))}
            {hero.highlight && (
              <span className="block animate-fade-up" style={{ animationDelay: `${80 * (hero.titleLines.length + 1)}ms` }}>
                <span className="text-highlight">{hero.highlight}.</span>
              </span>
            )}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted text-pretty sm:text-lg animate-fade-up" style={{ animationDelay: "400ms" }}>
            {hero.subtitle}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3 animate-fade-up" style={{ animationDelay: "500ms" }}>
            <Link
              href="/#demo"
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand/30 transition hover:-translate-y-0.5 hover:brightness-110"
            >
              {hero.primaryCta}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <VideoButton light label={hero.secondaryCta} eyebrow={hero.videoLabel} brandName={c.settings.brandName} />
          </div>
          {hero.trustPoints.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-slate-200/80 pt-6 animate-fade-up" style={{ animationDelay: "600ms" }}>
              {hero.trustPoints.map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-brand/10 text-brand ring-1 ring-brand/20">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="relative animate-fade-up" style={{ animationDelay: "250ms" }}>
          <HeroArt satellites={satellites} logoText={c.settings.logoText} />
        </div>
      </Container>
    </section>
  );
}

export function StatsSection({ c }: { c: Content }) {
  const stats = visible(c.stats);
  if (!stats.length) return null;
  return (
    <section className="bg-[#f6f7fb] py-14">
      <Container className="max-w-5xl">
        <Reveal>
          <div className="grid grid-cols-2 rounded-3xl border border-white bg-white px-4 py-8 shadow-xl shadow-slate-900/5 lg:grid-cols-4 lg:divide-x lg:divide-slate-100">
            {stats.map((s) => (
              <div key={s.id} className="px-4 py-3 text-center">
                <div className="font-display text-4xl font-extrabold tracking-tight text-brand sm:text-5xl">
                  <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm font-medium text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

const PARTNER_DOTS = ["bg-amber-300", "bg-emerald-500", "bg-blue-500", "bg-sky-400", "bg-rose-500", "bg-indigo-500", "bg-violet-400", "bg-orange-400"];

export function PartnersSection({ c }: { c: Content }) {
  const items = visible(c.partners);
  if (!items.length) return null;
  const loop = [...items, ...items];
  return (
    <section className="bg-white py-14">
      <Container>
        <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-ink">{c.headings.partners.title}</p>
      </Container>
      <div className="relative mt-7 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {loop.map((p, i) => (
            <span key={`${p.id}-${i}`} className="flex items-center gap-2.5 border-r border-slate-200 px-8 text-[15px] font-semibold text-slate-500">
              <span className={`h-2 w-2 rounded-full ${PARTNER_DOTS[i % PARTNER_DOTS.length]}`} />
              {p.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AnnouncementSection({ c }: { c: Content }) {
  const a = c.announcement;
  if (!a.enabled) return null;
  return (
    <section className="bg-surface py-16">
      <Container className="text-center">
        <Reveal>
          <span className="inline-flex rounded-full bg-accent/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-ink">{a.eyebrow}</span>
          <h2 className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl">{a.title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">{a.text}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {a.links.map((l) => (
              <Link key={l} href="/#products" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-ink shadow-sm transition hover:border-brand/40 hover:text-brand">
                {l} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function AboutSection({ c }: { c: Content }) {
  const a = c.about;
  return (
    <section id="about" className="relative overflow-hidden py-24">
      <div className="grid-fade absolute inset-0 -z-10" />
      <Container className="max-w-4xl text-center">
        <Reveal>
          <Eyebrow>{a.eyebrow}</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink text-balance sm:text-4xl">{a.title}</h2>
          {a.paragraphs.map((p, i) => (
            <p key={i} className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
              {p}
            </p>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

export function BenefitsSection({ c }: { c: Content }) {
  return (
    <section className="bg-surface py-24">
      <Container>
        <Heading heading={c.headings.benefits} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visible(c.benefits).map((b, i) => (
            <Reveal key={b.id} delay={i * 80}>
              <div className="group h-full rounded-2xl border border-slate-200/70 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-xl hover:shadow-brand/10">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white">
                  <Icon name={b.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

const LG_SPAN = ["lg:col-span-4", "lg:col-span-3", "lg:col-span-2", "lg:col-span-1"];
const TAG_TONES: Record<string, string> = {
  brand: "border-brand/20 bg-brand/5 text-brand",
  accent: "border-amber-200 bg-amber-50 text-amber-700",
  rose: "border-rose-200 bg-rose-50 text-rose-600",
  violet: "border-violet-200 bg-violet-50 text-violet-600",
  sky: "border-sky-200 bg-sky-50 text-sky-600",
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-600",
  amber: "border-amber-200 bg-amber-50 text-amber-700",
  indigo: "border-indigo-200 bg-indigo-50 text-indigo-600",
};

export function ProductsSection({ c }: { c: Content }) {
  const products = visible(c.products);
  // The closing card fills whatever is left of the last row.
  const lgSpan = LG_SPAN[products.length % 4];
  const smSpan = products.length % 2 ? "sm:col-span-1" : "sm:col-span-2";
  return (
    <section id="products" className="relative scroll-mt-24 overflow-hidden bg-[#f3f5fb] py-24">
      <div className="sky-grid absolute inset-0 opacity-60" />
      <Container className="relative">
        <Heading heading={c.headings.products} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => {
            const tone = TONES[p.tone];
            return (
              <Reveal key={p.id} delay={(i % 4) * 70}>
                <Link
                  href={`/products/${p.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white bg-white p-6 shadow-sm shadow-slate-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/10"
                >
                  <span className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-transparent transition duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                  <span className={`grid h-12 w-12 place-items-center rounded-xl ${tone.bg} ${tone.text}`}>
                    <Icon name={p.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-base font-bold text-ink">{p.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.short}</p>
                  <span className={`mt-5 w-fit rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${TAG_TONES[p.tone] ?? TAG_TONES.brand}`}>
                    {p.tag || "API"}
                  </span>
                </Link>
              </Reveal>
            );
          })}
          <Reveal className={`${smSpan} ${lgSpan}`}>
            <div className="relative flex h-full flex-col justify-center gap-5 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,var(--brand-dark),color-mix(in_oklab,var(--brand-dark)_60%,var(--brand)))] p-7 sm:flex-row sm:items-center sm:justify-between">
              <div className="dot-bg absolute inset-0 opacity-40" />
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand/40 blur-3xl" />
              <div className="relative">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-accent">
                  <Sparkles className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-white">Need custom infrastructure?</h3>
                <p className="mt-1 max-w-sm text-sm text-white/60">Enterprise solutions for high-volume travel businesses.</p>
              </div>
              <Link href="/contact" className="relative w-fit shrink-0 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-dark transition hover:-translate-y-0.5 hover:shadow-lg">
                Contact Sales
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export function UseCasesSection({ c }: { c: Content }) {
  return (
    <section id="usecases" className="scroll-mt-20 bg-surface py-24">
      <Container>
        <Heading heading={c.headings.usecases} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible(c.useCases).map((u, i) => {
            const tone = TONES[u.tone];
            return (
              <Reveal key={u.id} delay={(i % 3) * 80}>
                <div className="group h-full rounded-2xl border border-slate-200/70 bg-white p-6 transition hover:shadow-lg">
                  <span className={`grid h-10 w-10 place-items-center rounded-lg ${tone.bg} ${tone.text}`}>
                    <Icon name={u.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold text-ink">{u.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{u.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

const GROUP_ICONS = [Layers, Zap, Shield, Tag];

function resolveMark(value: string, mark: CompareMark | undefined, fallback: CompareMark): CompareMark {
  if (mark) return mark;
  if (value === "yes") return "yes";
  if (value === "no") return "no";
  return fallback;
}

function MarkCell({ value, mark, ours }: { value: string; mark: CompareMark; ours?: boolean }) {
  const caption = value === "yes" ? "Included" : value === "no" ? "Not available" : value;
  const icon =
    mark === "yes" ? (
      <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200">
        <Check className="h-4 w-4" strokeWidth={2.5} />
      </span>
    ) : mark === "no" ? (
      <span className="grid h-7 w-7 place-items-center rounded-full bg-rose-50 text-rose-500 ring-1 ring-rose-200">
        <X className="h-4 w-4" strokeWidth={2.5} />
      </span>
    ) : (
      <span className="grid h-7 w-7 place-items-center rounded-full bg-amber-50 text-amber-500 ring-1 ring-amber-200">
        <CircleHalf />
      </span>
    );
  return (
    <div className="flex flex-col items-center gap-1.5 px-2 py-4 text-center">
      {icon}
      <span className={`text-[11px] sm:text-xs ${ours && mark === "yes" ? "font-semibold text-emerald-600" : "text-muted"}`}>{caption}</span>
    </div>
  );
}

function CircleHalf() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
      <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8 2a6 6 0 010 12z" fill="currentColor" />
    </svg>
  );
}

export function WhySection({ c }: { c: Content }) {
  const groups = Object.entries(
    visible(c.compare).reduce<Record<string, Content["compare"]>>((acc, r) => {
      (acc[r.group || ""] ??= []).push(r);
      return acc;
    }, {}),
  );
  const brand = c.settings.brandName;
  const cols = "grid grid-cols-[1.35fr_1fr_1fr] sm:grid-cols-[1.6fr_1fr_1fr]";
  return (
    <section id="why" className="scroll-mt-24 bg-white py-24">
      <Container className="max-w-5xl">
        <Heading heading={c.headings.why} />
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-900/5">
            <div className={`${cols} border-b border-slate-100 bg-slate-50/70`}>
              <div className="flex items-center px-4 py-5 text-sm font-bold text-ink sm:px-6">Feature</div>
              <div className="flex flex-col items-center justify-center gap-1 bg-brand/[0.06] px-2 py-5 text-center">
                <span className="inline-flex items-center gap-1 rounded-full bg-brand px-3 py-1 text-xs font-bold text-white shadow-md shadow-brand/30">
                  <Sparkles className="h-3 w-3" /> {brand}
                </span>
                <span className="text-[10px] text-muted sm:text-[11px]">Unified travel API</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-2 py-5 text-center">
                <span className="font-display text-sm font-bold text-ink sm:text-base">Direct integration</span>
                <span className="text-[10px] text-muted sm:text-[11px]">Supplier by supplier</span>
              </div>
            </div>
            {groups.map(([group, rows], gi) => {
              const G = GROUP_ICONS[gi % GROUP_ICONS.length];
              return (
                <div key={group || gi}>
                  {group && (
                    <div className={`${cols} border-b border-slate-100 bg-slate-50/50`}>
                      <p className="col-span-3 flex items-center gap-2 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-brand sm:px-6">
                        <G className="h-3.5 w-3.5" /> {group}
                      </p>
                    </div>
                  )}
                  {rows.map((r) => (
                    <div key={r.id} className={`${cols} border-b border-slate-100 last:border-0`}>
                      <div className="flex flex-col justify-center px-4 py-4 sm:px-6">
                        <span className="text-sm font-semibold text-ink">{r.label}</span>
                        {r.note && <span className="mt-0.5 text-xs text-muted">{r.note}</span>}
                      </div>
                      <div className="bg-brand/[0.04]">
                        <MarkCell value={r.us} mark={resolveMark(r.us, r.usMark, "yes")} ours />
                      </div>
                      <MarkCell value={r.them} mark={resolveMark(r.them, r.themMark, "partial")} />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function StepsSection({ c }: { c: Content }) {
  const steps = visible(c.steps);
  return (
    <section id="steps" className="scroll-mt-20 bg-surface py-24">
      <Container>
        <Heading heading={c.headings.steps} />
        <div className="relative grid gap-10 md:grid-cols-3">
          <div className="absolute left-[16%] right-[16%] top-7 hidden h-px bg-linear-to-r from-brand/10 via-brand/50 to-brand/10 md:block" />
          {steps.map((s, i) => (
            <Reveal key={s.id} delay={i * 120} className="relative text-center">
              <span className="relative mx-auto grid h-14 w-14 place-items-center rounded-full border-4 border-surface bg-white font-display text-lg font-bold text-brand shadow-md ring-2 ring-brand/20">
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function TestimonialsSection({ c }: { c: Content }) {
  const items = visible(c.testimonials);
  if (!items.length) return null;
  const grid = items.length % 3 === 0 || items.length < 3 ? "lg:grid-cols-3" : "lg:grid-cols-2 xl:grid-cols-4";
  return (
    <section className="navy-bg relative overflow-hidden py-24">
      <div className="dot-bg absolute inset-0 opacity-30" />
      <Container className="relative">
        <Heading heading={c.headings.testimonials} dark />
        <div className={`grid gap-5 md:grid-cols-2 ${grid}`}>
          {items.map((t, i) => (
            <Reveal key={t.id} delay={i * 80}>
              <figure className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.09]">
                <Quote className="h-7 w-7 text-[#a5b4fc]/60" />
                <div className="mt-4 flex gap-0.5 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, k) => (
                    <Star key={k} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-[15px] italic leading-relaxed text-white/80">{t.quote}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className={`grid h-10 w-10 place-items-center rounded-full bg-linear-to-br font-display text-sm font-bold text-white ${AVATARS[i % AVATARS.length]}`}>
                    {t.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-white">{t.name}</span>
                    <span className="block text-xs text-white/50">
                      {t.role}, {t.company}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

const AVATARS = ["from-indigo-500 to-blue-600", "from-emerald-400 to-teal-600", "from-amber-400 to-orange-500", "from-rose-400 to-pink-600"];

export function FaqSection({ c }: { c: Content }) {
  return (
    <section id="faq" className="relative scroll-mt-24 overflow-hidden py-24">
      <div className="sky-bg absolute inset-0 -z-10" />
      <div className="absolute -right-32 top-20 -z-10 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />
      <Container className="max-w-3xl">
        <Heading heading={c.headings.faq} />
        <Reveal>
          <FaqList items={visible(c.faqs)} />
        </Reveal>
      </Container>
    </section>
  );
}

export function ResourcesSection({ c }: { c: Content }) {
  return (
    <section className="bg-surface py-20">
      <Container className="max-w-5xl">
        <Heading heading={c.headings.resources} />
        <div className="grid gap-4 md:grid-cols-3">
          {visible(c.resources).map((r, i) => (
            <Reveal key={r.id} delay={i * 80}>
              <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg">
                <span className="rounded-full bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand">{r.tag}</span>
                <h3 className="mt-4 font-display font-semibold text-ink group-hover:text-brand">{r.title}</h3>
                <p className="mt-2 text-sm text-muted">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function CtaSection({ c }: { c: Content }) {
  const s = c.settings;
  const cta = c.cta;
  const address = s.address.replace(/\s*\n\s*/g, ", ");
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const contacts = [
    { icon: Mail, label: "Email us", value: s.email, href: `mailto:${s.email}` },
    { icon: Phone, label: "Call us", value: s.phone, href: `tel:${s.phone.replace(/\s/g, "")}` },
    { icon: MessageCircle, label: "WhatsApp", value: s.whatsapp, href: `https://wa.me/${s.whatsapp.replace(/\D/g, "")}` },
    { icon: MapPin, label: "Office", value: address, href: mapsUrl },
  ].filter((x) => x.value);
  return (
    <section id="demo" className="navy-bg relative scroll-mt-24 overflow-hidden py-24">
      <div className="dot-bg absolute inset-0 opacity-30" />
      <Container className="relative">
        <Heading heading={{ eyebrow: cta.eyebrow, title: cta.title, subtitle: cta.text }} dark />

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-3">
            {contacts.map(({ icon: I, label, value, href }, i) => (
              <Reveal key={label} delay={i * 60}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 transition hover:border-white/20 hover:bg-white/10"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand text-white shadow-lg shadow-brand/40 transition group-hover:scale-105">
                    <I className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#a5b4fc]">{label}</span>
                    <span className="block font-semibold text-white [overflow-wrap:anywhere]">{value}</span>
                  </span>
                </a>
              </Reveal>
            ))}

            <Reveal delay={260}>
              <div className="relative h-56 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <iframe
                  title={`${s.brandName} office map`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=15&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0 opacity-70 [filter:invert(0.92)_hue-rotate(185deg)_saturate(0.7)]"
                />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-brand-dark/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-blink" /> Visit our office
                </span>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-brand-dark/85 px-4 py-3 backdrop-blur transition hover:bg-brand-dark"
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-white">{s.brandName}</span>
                    <span className="block truncate text-xs text-white/50">{address}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-white">
                    Open in Maps <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              </div>
            </Reveal>

            {cta.perks.length > 0 && (
              <ul className="grid gap-3 pt-3 sm:grid-cols-2">
                {cta.perks.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-sm text-white/80">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400 text-brand-dark">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Reveal delay={120}>
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30 backdrop-blur sm:p-8">
              <h3 className="font-display text-xl font-bold text-white">{cta.primary}</h3>
              <p className="mt-1 text-sm text-white/55">Takes under a minute. We reply within one business day.</p>
              <div className="mt-6">
                <LeadForm
                  dark
                  submitLabel={cta.primary}
                  products={visible(c.products).map((p) => p.name.replace(/ API$/, ""))}
                />
              </div>
              {cta.secondary && s.whatsapp && (
                <p className="mt-5 text-center text-xs text-white/50">
                  Prefer a quick chat?{" "}
                  <a href={`https://wa.me/${s.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="font-semibold text-[#a5b4fc] hover:text-white">
                    {cta.secondary} on WhatsApp →
                  </a>
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

