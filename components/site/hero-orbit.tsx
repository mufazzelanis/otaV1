"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import {
  Bell, Check, Hotel, Loader2, Luggage, QrCode, RefreshCcw, Search, Tag, Ticket, X, Zap, type LucideIcon,
} from "lucide-react";

// Interactive hero showcase: eight feature nodes orbit the brand hub and a
// detail card cycles through them. Card figures are illustrative sample data.

type Feature = { icon: LucideIcon; label: string; color: string; card: () => ReactNode };

const AUTO_DELAY = 3200;
const CARD_W = 300;
const CARD_H = 330; // placement estimate; cards are close to this height
// Node angles (radians from 12 o'clock, clockwise), spaced like the reference design.
const ANGLES = [0, 0.4, 0.75, 1, 1.3, 1.6, 1.8, 0.18].map((t) => -Math.PI / 2 + Math.PI * t);
const RADIUS = 195 / 560; // fraction of the square

/* ── Card building blocks ────────────────────────────────────────────────── */

function Head({ icon: I, grad, title, sub, badge, badgeCls }: { icon: LucideIcon; grad: string; title: string; sub: string; badge: string; badgeCls: string }) {
  return (
    <div className="mb-3 flex items-start gap-2.5 pr-6">
      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-linear-to-br text-white shadow-md ${grad}`}>
        <I className="h-4.5 w-4.5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-bold text-ink">{title}</p>
        <p className="truncate text-[10.5px] text-muted">{sub}</p>
      </div>
      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9.5px] font-bold ring-1 ${badgeCls}`}>{badge}</span>
    </div>
  );
}

const GRN = "bg-emerald-50 text-emerald-600 ring-emerald-200";
const BLU = "bg-indigo-50 text-indigo-600 ring-indigo-200";
const GLD = "bg-amber-50 text-amber-600 ring-amber-200";

function Row({ children, hl }: { children: ReactNode; hl?: boolean }) {
  return (
    <div className={`mb-1.5 flex items-center gap-2.5 rounded-xl border px-2.5 py-2 ${hl ? "border-emerald-200 bg-emerald-50/70" : "border-slate-100 bg-slate-50/60"}`}>
      {children}
    </div>
  );
}

function RowText({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="min-w-0 flex-1">
      <p className="truncate text-[11.5px] font-semibold text-ink">{title}</p>
      <p className="truncate text-[9.5px] text-muted">{sub}</p>
    </div>
  );
}

function Logo({ code, cls }: { code: string; cls: string }) {
  return <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-[9px] font-extrabold text-white ${cls}`}>{code}</span>;
}

type StepState = "done" | "live" | "idle";
function Step({ state, title, sub, icon }: { state: StepState; title: string; sub: string; icon?: ReactNode }) {
  const box =
    state === "done" ? "border-emerald-200 bg-emerald-50/70" : state === "live" ? "border-indigo-200 bg-indigo-50/80 shadow-sm shadow-indigo-500/10" : "border-slate-100 bg-slate-50/50 opacity-70";
  const dot =
    state === "done" ? "bg-emerald-500 text-white" : state === "live" ? "bg-linear-to-br from-indigo-500 to-violet-500 text-white" : "bg-slate-200 text-slate-500";
  return (
    <div className={`mb-1.5 flex items-center gap-2.5 rounded-xl border px-2.5 py-2 ${box}`}>
      <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-md text-[10px] ${dot}`}>
        {state === "done" ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : state === "live" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : icon}
      </span>
      <RowText title={title} sub={sub} />
    </div>
  );
}

function Stats({ items }: { items: [string, string][] }) {
  return (
    <div className="mt-2 grid grid-cols-3 gap-1.5">
      {items.map(([v, l]) => (
        <div key={l} className="rounded-xl border border-slate-100 bg-slate-50/70 py-2 text-center">
          <p className="font-display text-sm font-extrabold text-brand">{v}</p>
          <p className="text-[8.5px] font-semibold uppercase tracking-wider text-muted">{l}</p>
        </div>
      ))}
    </div>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="mt-2 flex flex-wrap gap-1">
      {items.map((s) => (
        <span key={s} className="rounded-full border border-brand/15 bg-brand/5 px-2 py-0.5 text-[9px] font-semibold text-brand">{s}</span>
      ))}
    </div>
  );
}

/* ── The eight features ──────────────────────────────────────────────────── */

const FEATURES: Feature[] = [
  {
    icon: Zap, label: "Faster Search", color: "#4f46e5",
    card: () => (
      <>
        <Head icon={Search} grad="from-indigo-500 to-violet-500" title="Flight Search" sub="GDS + NDC + LCC · one request" badge="642ms" badgeCls={GRN} />
        <Row hl><Logo code="EK" cls="bg-linear-to-br from-red-700 to-red-900" /><RowText title="Emirates · EK 583" sub="02:15 → 05:45 · Non-stop" /><div className="text-right"><p className="text-xs font-extrabold text-ink">$842</p><p className="text-[9px] font-bold text-emerald-600">Best price</p></div></Row>
        <Row><Logo code="FZ" cls="bg-linear-to-br from-blue-800 to-blue-600" /><RowText title="flydubai · FZ 502" sub="07:30 → 11:00 · Non-stop" /><p className="text-xs font-extrabold text-ink">$694</p></Row>
        <Row><Logo code="QR" cls="bg-linear-to-br from-rose-950 to-rose-800" /><RowText title="Qatar Airways · QR 641" sub="10:20 → 16:40 · 1 stop" /><p className="text-xs font-extrabold text-ink">$778</p></Row>
        <Chips items={["GDS", "NDC", "LCC", "Cached", "Live price"]} />
      </>
    ),
  },
  {
    icon: Hotel, label: "Hotels", color: "#10b981",
    card: () => (
      <>
        <Head icon={Hotel} grad="from-emerald-500 to-teal-400" title="Hotel Search" sub="Bali · 20–24 Dec · 2 adults" badge="1,204 found" badgeCls={GRN} />
        {[
          ["Ocean Cliff Resort", "★★★★★ · Uluwatu · Refundable", "$189", true],
          ["Ubud Hanging Gardens", "★★★★★ · Ubud · Breakfast", "$264", false],
          ["Seminyak Beach Hotel", "★★★★ · Seminyak · Pay later", "$96", false],
        ].map(([n, s, p, hl]) => (
          <Row key={n as string} hl={hl as boolean}>
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-linear-to-br from-amber-300 to-orange-400 text-white"><Hotel className="h-3.5 w-3.5" /></span>
            <RowText title={n as string} sub={s as string} />
            <div className="text-right"><p className="text-xs font-extrabold text-ink">{p as string}</p><p className="text-[9px] text-muted">/night</p></div>
          </Row>
        ))}
        <Stats items={[["2M+", "Properties"], ["518ms", "Search"], ["1 ID", "Per hotel"]]} />
      </>
    ),
  },
  {
    icon: Ticket, label: "Ticketing", color: "#6366f1",
    card: () => (
      <>
        <Head icon={Ticket} grad="from-indigo-500 to-blue-500" title="Instant Ticketing" sub="Order TN-48291 · EK 583" badge="● Live" badgeCls={BLU} />
        <Step state="done" title="Price validated" sub="Fare re-checked · $842 confirmed" />
        <Step state="done" title="Booking created" sub="PNR MNPQRT · 1 adult" />
        <Step state="live" title="Issuing e-ticket" sub="Airline confirmation · ETA 4s" />
        <Step state="idle" title="Send to traveller" sub="Email + webhook" icon={<Bell className="h-3 w-3" />} />
      </>
    ),
  },
  {
    icon: Luggage, label: "Ancillary", color: "#f59e0b",
    card: () => (
      <>
        <Head icon={Luggage} grad="from-amber-500 to-orange-400" title="Ancillary Services" sub="EK 583 · checkout upsell" badge="+$107" badgeCls={GLD} />
        <div className="grid grid-cols-3 gap-1.5">
          {[
            ["🧳", "Extra bag", "+$45", true],
            ["💺", "Seat", "+$25", false],
            ["🍽", "Meal", "+$18", true],
            ["🛋", "Lounge", "+$32", true],
            ["🚗", "Transfer", "+$38", false],
            ["📱", "eSIM", "+$12", true],
          ].map(([i, n, p, sel]) => (
            <div key={n as string} className={`rounded-xl border p-2 text-center ${sel ? "border-amber-300 bg-amber-50" : "border-slate-100 bg-slate-50/60"}`}>
              <p className="text-base leading-none">{i as string}</p>
              <p className="mt-1 text-[9.5px] font-semibold text-ink">{n as string}</p>
              <p className={`text-[9px] font-bold ${sel ? "text-amber-600" : "text-muted"}`}>{p as string}</p>
            </div>
          ))}
        </div>
        <div className="mt-2"><Row hl><RowText title="Revenue uplift per booking" sub="4 add-ons selected" /><p className="text-xs font-extrabold text-emerald-600">+12.7%</p></Row></div>
      </>
    ),
  },
  {
    icon: QrCode, label: "Travel eSIM", color: "#0ea5e9",
    card: () => (
      <>
        <Head icon={QrCode} grad="from-sky-500 to-blue-600" title="Travel eSIM" sub="United Arab Emirates · 7 days" badge="175+ countries" badgeCls={BLU} />
        <div className="mb-2 flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-2.5">
          <div className="grid h-16 w-16 shrink-0 grid-cols-5 gap-0.5 rounded-lg bg-white p-1.5 ring-1 ring-slate-200">
            {Array.from({ length: 25 }).map((_, k) => (
              <span key={k} className={`rounded-[1px] ${[0, 1, 3, 5, 7, 9, 11, 12, 14, 16, 18, 20, 21, 23, 24].includes(k) ? "bg-ink" : "bg-transparent"}`} />
            ))}
          </div>
          <div className="min-w-0">
            <p className="text-[11.5px] font-bold text-ink">Scan to activate</p>
            <p className="text-[9.5px] text-muted">Instant QR · no roaming bills</p>
            <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-600"><Check className="h-2.5 w-2.5" strokeWidth={3} /> Activated</p>
          </div>
        </div>
        <Row hl><RowText title="5 GB · 7 days" sub="Premium local network" /><p className="text-xs font-extrabold text-ink">$9.50</p></Row>
        <Row><RowText title="Unlimited · 7 days" sub="Top-up anytime" /><p className="text-xs font-extrabold text-ink">$21</p></Row>
      </>
    ),
  },
  {
    icon: Tag, label: "Branded Fare", color: "#8b5cf6",
    card: () => (
      <>
        <Head icon={Tag} grad="from-violet-500 to-purple-400" title="Branded Fares" sub="Emirates · EK 583" badge="38% conv." badgeCls={BLU} />
        <div className="grid grid-cols-3 gap-1.5">
          {[
            ["Economy", "$842", [true, false, false], false],
            ["Flex ★", "$1,082", [true, true, true], true],
            ["Business", "$2,460", [true, true, true], false],
          ].map(([t, p, feats, best]) => (
            <div key={t as string} className={`rounded-xl border p-2 ${best ? "border-violet-300 bg-violet-50 shadow-md shadow-violet-500/10" : "border-slate-100 bg-slate-50/60"}`}>
              <p className={`text-[9.5px] font-bold ${best ? "text-violet-600" : "text-muted"}`}>{t as string}</p>
              <p className="text-[13px] font-extrabold text-ink">{p as string}</p>
              {(feats as boolean[]).map((ok, k) => (
                <p key={k} className="mt-0.5 flex items-center gap-1 text-[8.5px] text-slate-600">
                  {ok ? <Check className="h-2.5 w-2.5 text-emerald-500" strokeWidth={3} /> : <X className="h-2.5 w-2.5 text-rose-400" strokeWidth={3} />}
                  {["Cabin bag", "Checked bag", "Free change"][k]}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-2"><Row hl><RowText title="Upsell · Flex Economy" sub="Average extra revenue per booking" /><p className="text-xs font-extrabold text-violet-600">+$240</p></Row></div>
      </>
    ),
  },
  {
    icon: RefreshCcw, label: "Refund / Void", color: "#f43f5e",
    card: () => (
      <>
        <Head icon={RefreshCcw} grad="from-rose-500 to-orange-500" title="Automated Refund" sub="TN-48291 · EK 583 · $842" badge="● Running" badgeCls={GRN} />
        <Step state="done" title="Request received" sub="TN-48291 · EK 583 · $842" />
        <Step state="done" title="Policy verified" sub="Penalty $50 · Net refund $792" />
        <Step state="live" title="Processing with airline" sub="Supplier API · ETA 30s" />
        <Step state="idle" title="Refund to customer" sub="Pending supplier confirmation" icon={<RefreshCcw className="h-3 w-3" />} />
        <Stats items={[["98%", "Auto-rate"], ["4.2s", "Avg time"], ["$0", "Manual"]]} />
      </>
    ),
  },
  {
    icon: Bell, label: "Webhooks", color: "#14b8a6",
    card: () => (
      <>
        <Head icon={Bell} grad="from-teal-500 to-cyan-400" title="Webhooks" sub="Real-time booking events" badge="200 OK" badgeCls={GRN} />
        <div className="rounded-xl bg-[#0b1220] p-2.5 font-mono text-[9.5px] leading-relaxed">
          {[
            ["booking.confirmed", "TN-48291", "text-emerald-300"],
            ["ticket.issued", "176-2345678901", "text-sky-300"],
            ["payment.captured", "$842.00", "text-violet-300"],
            ["refund.completed", "$792.00", "text-amber-300"],
          ].map(([e, v, c], k) => (
            <p key={e} className="flex justify-between gap-2 animate-fade-up" style={{ animationDelay: `${k * 180}ms` }}>
              <span className={c}>● {e}</span>
              <span className="truncate text-white/50">{v}</span>
            </p>
          ))}
        </div>
        <Stats items={[["<1s", "Delivery"], ["3x", "Retries"], ["HMAC", "Signed"]]} />
      </>
    ),
  },
];

/* ── Orbit ───────────────────────────────────────────────────────────────── */

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (cb: () => void) => {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches;

export function HeroOrbit({ logoText }: { logoText: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(0);
  const [active, setActive] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const reduced = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize(el.clientWidth));
    ro.observe(el);
    setSize(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => setActive(0), 900);
    return () => window.clearTimeout(t);
  }, []);

  // Auto-advance; any manual pick restarts the timer because `active` changes.
  useEffect(() => {
    if (paused || reduced) return;
    const t = window.setTimeout(() => setActive((a) => ((a ?? -1) + 1) % FEATURES.length), AUTO_DELAY);
    return () => window.clearTimeout(t);
  }, [active, paused, reduced]);

  const pick = useCallback((i: number) => setActive((a) => (a === i ? null : i)), []);

  const nodes = ANGLES.map((a) => ({ x: 0.5 + RADIUS * Math.cos(a), y: 0.5 + RADIUS * Math.sin(a), cos: Math.cos(a), sin: Math.sin(a) }));

  // Place the card beside the active node, pushed away from the hub and clamped inside the square.
  let cardPos: { left: number; top: number; width: number } | null = null;
  if (active !== null && size) {
    const n = nodes[active];
    const nx = n.x * size, ny = n.y * size;
    const w = Math.min(CARD_W, size - 16);
    const h = Math.min(CARD_H, size - 16);
    const clampX = (v: number) => Math.max(8, Math.min(v, size - w - 8));
    const clampY = (v: number) => Math.max(8, Math.min(v, size - h - 8));
    if (Math.abs(n.cos) > Math.abs(n.sin)) {
      cardPos = { left: clampX(n.cos > 0 ? nx + 40 : nx - w - 40), top: clampY(ny - h / 2), width: w };
    } else {
      cardPos = { left: clampX(nx - w / 2), top: clampY(n.sin > 0 ? ny + 40 : ny - h - 40), width: w };
    }
  }

  const feat = active !== null ? FEATURES[active] : null;

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto aspect-square w-full max-w-[560px] select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onClick={(e) => {
        if (e.target === e.currentTarget) setActive(null);
      }}
    >
      {/* Rings + connectors */}
      <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <radialGradient id="orbitGlow">
            <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="36" fill="url(#orbitGlow)" />
        <circle cx="50" cy="50" r={RADIUS * 100} fill="none" stroke="var(--brand)" strokeOpacity="0.16" strokeWidth="0.25" strokeDasharray="0.8 1.6" />
        <circle cx="50" cy="50" r="23" fill="none" stroke="var(--brand)" strokeOpacity="0.12" strokeWidth="0.2" strokeDasharray="0.6 2" />
        {nodes.map((n, i) => {
          const on = i === active;
          return (
            <line
              key={i}
              x1="50" y1="50" x2={n.x * 100} y2={n.y * 100}
              stroke={on ? FEATURES[i].color : "var(--brand)"}
              strokeOpacity={on ? 0.75 : 0.18}
              strokeWidth={on ? 0.45 : 0.2}
              strokeDasharray="1 1"
              className={on ? "animate-dash" : ""}
              style={{ transition: "stroke-opacity .4s, stroke-width .4s" }}
            />
          );
        })}
      </svg>

      {/* Hub */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 grid h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2 place-items-center">
        <span className="absolute inset-0 rounded-full border border-brand/15" />
        <span className="absolute -inset-3 rounded-full border-2 border-transparent border-t-brand/40 border-r-brand/20 animate-orbit-slow" />
        <span className="absolute inset-0 rounded-full bg-brand/20 animate-ping [animation-duration:3s]" />
        <span className="relative grid h-[78%] w-[78%] place-items-center rounded-full bg-[radial-gradient(circle_at_30%_25%,color-mix(in_oklab,var(--brand)_55%,white),var(--brand-dark)_72%)] shadow-2xl shadow-brand/40 ring-[6px] ring-white/80">
          <span className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{logoText}</span>
        </span>
      </div>

      {/* Nodes */}
      {FEATURES.map((f, i) => {
        const n = nodes[i];
        const on = i === active;
        const I = f.icon;
        const side = Math.abs(n.sin) > Math.abs(n.cos) ? (n.sin < 0 ? "top" : "bottom") : n.cos < 0 ? "left" : "right";
        const labelPos = {
          top: "bottom-full mb-1.5 left-1/2 -translate-x-1/2",
          bottom: "top-full mt-1.5 left-1/2 -translate-x-1/2",
          // Phones keep side labels under the node so they never run off-screen.
          left: "top-full mt-1.5 left-1/2 -translate-x-1/2 sm:top-1/2 sm:left-auto sm:right-full sm:mt-0 sm:mr-2 sm:translate-x-0 sm:-translate-y-1/2",
          right: "top-full mt-1.5 left-1/2 -translate-x-1/2 sm:top-1/2 sm:left-full sm:mt-0 sm:ml-2 sm:translate-x-0 sm:-translate-y-1/2",
        }[side];
        return (
          <button
            key={f.label}
            type="button"
            onClick={() => pick(i)}
            aria-pressed={on}
            aria-label={f.label}
            className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${n.x * 100}%`, top: `${n.y * 100}%` }}
          >
            <span
              className={`relative grid h-11 w-11 place-items-center rounded-full bg-white shadow-lg ring-1 transition duration-300 sm:h-14 sm:w-14 ${
                on ? "scale-110 ring-2" : "ring-slate-100 group-hover:scale-105"
              }`}
              style={on ? { boxShadow: `0 0 0 6px ${f.color}22, 0 12px 30px -8px ${f.color}88`, color: f.color, ["--tw-ring-color" as string]: f.color } : { color: f.color }}
            >
              <I className="h-5 w-5 sm:h-6 sm:w-6" />
            </span>
            <span
              className={`absolute whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold shadow-sm ring-1 transition sm:text-[11px] ${labelPos} ${
                on ? "bg-ink text-white ring-ink" : "bg-white text-ink ring-slate-100"
              }`}
            >
              {f.label}
            </span>
          </button>
        );
      })}

      {/* Detail card */}
      {feat && cardPos && (
        <div
          key={active}
          className="absolute z-20 animate-pop-in rounded-2xl border border-white bg-white/95 p-3.5 shadow-2xl shadow-brand/25 backdrop-blur-xl"
          style={{ left: cardPos.left, top: cardPos.top, width: cardPos.width, borderTop: `3px solid ${feat.color}` }}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label="Close"
            className="absolute right-2.5 top-2.5 grid h-6 w-6 place-items-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          {feat.card()}
          {/* Progress bar to the next auto step */}
          {!paused && !reduced && (
            <span className="absolute inset-x-4 bottom-1.5 h-0.5 overflow-hidden rounded-full bg-slate-100">
              <span className="block h-full origin-left animate-progress rounded-full" style={{ background: feat.color, animationDuration: `${AUTO_DELAY}ms` }} />
            </span>
          )}
        </div>
      )}
    </div>
  );
}
