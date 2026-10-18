import { Bell, CalendarDays, CheckCircle2, CreditCard, LayoutGrid, Search, Settings, TrendingUp, Users, Wifi } from "lucide-react";
import { Icon } from "@/lib/icons";

// Illustrative product mockups for the homepage. The figures are sample data
// that make the visuals feel alive; nothing here is read from the API.

/* ── Shared chart ─────────────────────────────────────────────────────────── */

const TREND = [14, 19, 17, 25, 22, 30, 28, 37, 33, 41, 39, 46];

function points(data: number[], w: number, h: number, pad = 6) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  return data.map((v, i) => [
    (i / (data.length - 1)) * w,
    pad + (1 - (v - min) / (max - min || 1)) * (h - pad * 2),
  ]);
}

export function TrendChart({ id, height = 120, data = TREND, labels }: { id: string; height?: number; data?: number[]; labels?: string[] }) {
  const w = 600;
  const pts = points(data, w, height);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${w},${height} L0,${height} Z`;
  const peaks = [pts[pts.length - 4], pts[pts.length - 1]];
  return (
    <div>
      <div className="relative" style={{ height }}>
        <svg viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <linearGradient id={`${id}-fill`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={f} x1="0" x2={w} y1={height * f} y2={height * f} stroke="white" strokeOpacity="0.06" vectorEffect="non-scaling-stroke" />
          ))}
          <path d={area} fill={`url(#${id}-fill)`} />
          <path d={line} fill="none" stroke="#8b9cff" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        </svg>
        {/* Dots are HTML over the stretched SVG so they stay round. */}
        {peaks.map(([x, y], i) => (
          <span
            key={i}
            className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgb(52_211_153/0.25),0_0_14px_rgb(52_211_153/0.8)]"
            style={{ left: `${(x / w) * 100}%`, top: y }}
          />
        ))}
      </div>
      {labels && (
        <div className="mt-2 flex justify-between text-[10px] text-white/35">
          {labels.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Hero: orbit of products + floating live card ─────────────────────────── */

type Satellite = { icon: string; label: string };

// Angles (deg) for up to five satellites, kept on the side the live card doesn't cover.
const ANGLES = [-90, -140, 180, 140, 90];
const HUB = { x: 36, y: 50 };
const RADIUS = 30;

export function HeroArt({ satellites, logoText }: { satellites: Satellite[]; logoText: string }) {
  const sats = satellites.slice(0, ANGLES.length).map((s, i) => {
    const a = (ANGLES[i] * Math.PI) / 180;
    return { ...s, x: HUB.x + RADIUS * Math.cos(a), y: HUB.y + RADIUS * Math.sin(a) };
  });

  return (
    <div className="relative mx-auto w-full max-w-[580px]">
      <div className="relative hidden aspect-square sm:block">
        {/* Orbit rings + animated spokes */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
          <circle cx={HUB.x} cy={HUB.y} r={RADIUS} fill="none" stroke="var(--brand)" strokeOpacity="0.18" strokeWidth="0.25" strokeDasharray="1 1.2" />
          <circle cx={HUB.x} cy={HUB.y} r={RADIUS - 13} fill="none" stroke="var(--brand)" strokeOpacity="0.12" strokeWidth="0.2" />
          {sats.map((s, i) => (
            <line
              key={i}
              x1={HUB.x}
              y1={HUB.y}
              x2={s.x}
              y2={s.y}
              stroke="var(--brand)"
              strokeOpacity="0.28"
              strokeWidth="0.25"
              strokeDasharray="1 1"
              className="animate-dash"
            />
          ))}
        </svg>

        {/* Hub */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${HUB.x}%`, top: `${HUB.y}%` }}>
          <span className="absolute inset-0 rounded-full bg-brand/25 animate-ping [animation-duration:3s]" />
          <div className="relative grid h-24 w-24 place-items-center rounded-full bg-[radial-gradient(circle_at_30%_25%,color-mix(in_oklab,var(--brand)_70%,white),var(--brand-dark)_70%)] shadow-2xl shadow-brand/40 ring-8 ring-white/70">
            <span className="font-display text-2xl font-extrabold tracking-tight text-white">{logoText}</span>
          </div>
        </div>

        {/* Satellites */}
        {sats.map((s, i) => (
          <div
            key={s.label}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 animate-float-slow"
            style={{ left: `${s.x}%`, top: `${s.y}%`, animationDelay: `${i * -1.4}s` }}
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-brand shadow-lg shadow-brand/15 ring-1 ring-slate-100">
              <Icon name={s.icon} className="h-5 w-5" />
            </span>
            <span className="whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-ink shadow-sm ring-1 ring-slate-100">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Live card: overlaps the orbit on larger screens, stands alone on phones. */}
      <div className="relative mx-auto w-full max-w-[320px] sm:absolute sm:right-0 sm:top-[8%] sm:mx-0 sm:w-[54%] lg:animate-float">
        <LiveCard />
      </div>
    </div>
  );
}

const BARS = [38, 52, 44, 63, 55, 78, 70, 92];

function LiveCard() {
  return (
    <div className="rounded-3xl border border-white bg-white/90 p-4 shadow-2xl shadow-brand/20 backdrop-blur-xl">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-linear-to-br from-emerald-400 to-teal-500 text-white shadow-md shadow-emerald-500/30">
          <CreditCard className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-ink">Live bookings</p>
          <p className="truncate text-[11px] text-muted">Search · book · ticket</p>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600 ring-1 ring-emerald-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-blink" /> Live
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        {[
          ["1,284", "Bookings"],
          ["+$48K", "This month"],
          ["642ms", "Avg search"],
        ].map(([v, l], i) => (
          <div key={l} className="rounded-xl border border-slate-100 bg-slate-50/80 px-1 py-2.5">
            <p className={`font-display text-sm font-extrabold sm:text-base ${i === 1 ? "text-emerald-600" : "text-brand"}`}>{v}</p>
            <p className="mt-0.5 text-[9px] font-medium uppercase tracking-wide text-muted">{l}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 space-y-2">
        <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-ink">DAC → DXB · Flight</span>
            <span className="font-bold text-emerald-600">+$842</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-[10px] text-muted">
            <span>1 adult · Economy</span>
            <span className="font-semibold text-emerald-600">Ticketed</span>
          </div>
        </div>
        <div className="rounded-xl border border-slate-100 bg-white p-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-ink">Bali · Hotel · 4 nights</span>
            <span className="font-bold text-ink">+$756</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-[10px] text-muted">
            <span>2 adults · Refundable</span>
            <span className="font-semibold text-brand">Confirming</span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex h-12 items-end gap-1.5">
        {BARS.map((h, i) => (
          <span
            key={i}
            className={`flex-1 origin-bottom rounded-t-md animate-grow ${i >= BARS.length - 2 ? "bg-linear-to-t from-emerald-400 to-emerald-300" : "bg-linear-to-t from-brand/40 to-brand/25"}`}
            style={{ height: `${h}%`, animationDelay: `${300 + i * 80}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Analytics card ──────────────────────────────────────────────────────── */

export function AnalyticsCard() {
  return (
    <div className="relative rounded-3xl border border-white/10 bg-[linear-gradient(160deg,color-mix(in_oklab,var(--brand-dark)_80%,var(--brand)),var(--brand-dark))] p-4 shadow-2xl shadow-brand-dark/40 sm:p-5">
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {[
          ["$428K", "Revenue", "text-emerald-400"],
          ["1,847", "Bookings", "text-white"],
          ["98.3%", "Success", "text-white"],
        ].map(([v, l, c]) => (
          <div key={l} className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
            <p className={`font-display text-lg font-extrabold sm:text-2xl ${c}`}>{v}</p>
            <p className="mt-0.5 text-[10px] text-white/45">{l}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-white/45">Revenue trend · this month</p>
        <TrendChart id="analytics" height={110} />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:gap-3">
        <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3">
          <p className="flex items-center gap-1 text-sm font-bold text-emerald-300">
            <TrendingUp className="h-4 w-4" /> 24.8%
          </p>
          <p className="text-[10px] text-white/45">vs last month</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="text-sm font-bold text-white">12</p>
          <p className="text-[10px] text-white/45">Active sales channels</p>
        </div>
      </div>
    </div>
  );
}

/* ── Dashboard preview ───────────────────────────────────────────────────── */

const KPIS = [
  { value: "$428,952", label: "Revenue this month", delta: "↑ 24.8% vs last month" },
  { value: "1,847", label: "Bookings this month", delta: "↑ 18.2% vs last month" },
  { value: "98.3%", label: "Booking success rate", delta: "↑ 1.2% improvement" },
  { value: "642ms", label: "Avg. search time", delta: "Across all suppliers" },
];

const DESTINATIONS = [
  { code: "AE", city: "Dubai, UAE", count: 428, value: "$142K", pct: 92 },
  { code: "GB", city: "London, UK", count: 312, value: "$98K", pct: 68 },
  { code: "SG", city: "Singapore", count: 198, value: "$62K", pct: 44 },
];

const LIVE = [
  { text: "Flight · DAC → DXB", amount: "+$842", tone: "bg-emerald-400", amountCls: "text-emerald-400" },
  { text: "Hotel · Marina Bay", amount: "+$1,240", tone: "bg-sky-400", amountCls: "text-emerald-400" },
  { text: "eSIM · 7 days UAE", amount: "Pending", tone: "bg-amber-400", amountCls: "text-amber-300" },
];

const CHANNELS = [
  { code: "WB", name: "Web storefront", sub: "B2C · Direct", bookings: 428, revenue: "$142K", perf: 92, status: "Active", color: "bg-brand" },
  { code: "MA", name: "Mobile app", sub: "iOS + Android", bookings: 312, revenue: "$98K", perf: 71, status: "Active", color: "bg-emerald-500" },
  { code: "PT", name: "Partner portal", sub: "B2B · Sub-agents", bookings: 198, revenue: "$62K", perf: 48, status: "Review", color: "bg-amber-500" },
];

export function DashboardPreview() {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(170deg,color-mix(in_oklab,var(--brand-dark)_85%,var(--brand)),var(--brand-dark)_60%)] p-3 shadow-2xl shadow-brand-dark/40 sm:p-5">
      <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
        {KPIS.map((k) => (
          <div key={k.label} className="rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4">
            <p className="font-display text-lg font-extrabold text-white sm:text-2xl">{k.value}</p>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-white/45">{k.label}</p>
            <p className="mt-1 text-[11px] font-semibold text-emerald-400">{k.delta}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[1.7fr_1fr]">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/50">Revenue trend</p>
            <p className="text-xs font-bold text-emerald-400">+$18,420 today</p>
          </div>
          <TrendChart id="dash" height={262} labels={["Apr 1", "Apr 5", "Apr 10", "Apr 15", "Apr 21"]} />
        </div>
        <div className="grid gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-white/50">Top destinations</p>
            <ul className="space-y-3">
              {DESTINATIONS.map((d) => (
                <li key={d.code} className="flex items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/10 text-[10px] font-bold text-white/60">{d.code}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between text-xs">
                      <span className="truncate font-semibold text-white">{d.city}</span>
                      <span className="font-bold text-[#a5b4fc]">{d.value}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-[10px] text-white/40">{d.count} bookings</span>
                      <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                        <span className="block h-full rounded-full bg-linear-to-r from-brand to-[#a5b4fc]" style={{ width: `${d.pct}%` }} />
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-blink" /> Live bookings
            </p>
            <ul className="divide-y divide-white/5">
              {LIVE.map((l) => (
                <li key={l.text} className="flex items-center justify-between gap-2 py-2 text-xs">
                  <span className="flex min-w-0 items-center gap-2 text-white/70">
                    <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${l.tone}`} />
                    <span className="truncate">{l.text}</span>
                  </span>
                  <span className={`font-bold ${l.amountCls}`}>{l.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-2 sm:p-4">
        <div className="grid grid-cols-[1.6fr_0.7fr_0.8fr_auto] gap-3 px-2 pb-2 text-[10px] font-semibold uppercase tracking-wider text-white/40 sm:grid-cols-[1.6fr_0.7fr_0.8fr_1.4fr_auto]">
          <span>Channel</span>
          <span>Bookings</span>
          <span>Revenue</span>
          <span className="hidden sm:block">Performance</span>
          <span>Status</span>
        </div>
        {CHANNELS.map((c) => (
          <div key={c.code} className="grid grid-cols-[1.6fr_0.7fr_0.8fr_auto] items-center gap-3 border-t border-white/5 px-2 py-3 text-xs sm:grid-cols-[1.6fr_0.7fr_0.8fr_1.4fr_auto]">
            <span className="flex min-w-0 items-center gap-2.5">
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[10px] font-bold text-white ${c.color}`}>{c.code}</span>
              <span className="min-w-0">
                <span className="block truncate font-semibold text-white">{c.name}</span>
                <span className="block truncate text-[10px] text-white/40">{c.sub}</span>
              </span>
            </span>
            <span className="font-bold text-white">{c.bookings}</span>
            <span className={`font-bold ${c.perf > 60 ? "text-emerald-400" : "text-amber-300"}`}>{c.revenue}</span>
            <span className="hidden items-center gap-2 sm:flex">
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                <span className="block h-full rounded-full bg-linear-to-r from-brand to-[#a5b4fc]" style={{ width: `${c.perf}%` }} />
              </span>
              <span className="w-8 text-right text-[10px] text-white/60">{c.perf}%</span>
            </span>
            <span
              className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                c.status === "Active" ? "bg-emerald-400/15 text-emerald-300" : "bg-amber-400/15 text-amber-300"
              }`}
            >
              {c.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Web + mobile mockups ────────────────────────────────────────────────── */

const FLIGHTS = [
  { code: "EK", color: "bg-rose-600", route: "DAC → DXB", meta: "EK 583 · 4h 30m · Non-stop", price: "$842", tags: ["Best", "Refundable"], best: true },
  { code: "FZ", color: "bg-sky-700", route: "DAC → DXB", meta: "FZ 502 · 7h 45m · 1 stop", price: "$694", tags: ["Refundable"] },
  { code: "QR", color: "bg-[#5c0632]", route: "DAC → DXB", meta: "QR 641 · 9h 20m · 1 stop", price: "$778", tags: [] },
];

export function BrowserMockup({ host }: { host: string }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/40 ring-1 ring-white/10">
      <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </div>
        <span className="flex-1 truncate rounded-md bg-white px-3 py-1 text-[11px] text-slate-400 ring-1 ring-slate-200">🔒 {host}/bookings/new</span>
      </div>
      <div className="flex">
        <div className="hidden w-12 shrink-0 flex-col items-center gap-4 border-r border-slate-100 py-4 text-slate-400 sm:flex">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand text-white"><LayoutGrid className="h-3.5 w-3.5" /></span>
          <Users className="h-4 w-4" />
          <CreditCard className="h-4 w-4" />
          <Bell className="h-4 w-4" />
          <Settings className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1 p-3 sm:p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="rounded-lg bg-brand px-3 py-1.5 text-[11px] font-semibold text-white">+ New booking</span>
            <div className="flex gap-1.5 text-[10px] text-slate-500">
              <span className="rounded-md border border-slate-200 px-2 py-1">Export</span>
              <span className="rounded-md border border-slate-200 px-2 py-1">Filter</span>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-slate-200 p-2.5">
            <div className="min-w-0 flex-1">
              <p className="text-[9px] uppercase tracking-wider text-slate-400">Flying from</p>
              <p className="text-sm font-bold text-ink">DAC</p>
            </div>
            <span className="grid h-6 w-6 place-items-center rounded-full bg-slate-100 text-[10px] text-slate-500">⇄</span>
            <div className="min-w-0 flex-1">
              <p className="text-[9px] uppercase tracking-wider text-slate-400">Flying to</p>
              <p className="text-sm font-bold text-ink">DXB</p>
            </div>
            <span className="flex items-center gap-1 rounded-lg bg-brand px-3 py-2 text-[11px] font-semibold text-white">
              <Search className="h-3 w-3" /> Search
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px]">
            <span className="font-bold text-ink">148 results found</span>
            <span className="text-slate-400">DAC → DXB · 14 Dec · 1 pax</span>
          </div>
          <ul className="mt-2 space-y-2">
            {FLIGHTS.map((f) => (
              <li key={f.code} className={`flex items-center gap-3 rounded-xl border p-2.5 ${f.best ? "border-emerald-300 bg-emerald-50/50" : "border-slate-200"}`}>
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[10px] font-bold text-white ${f.color}`}>{f.code}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-bold text-ink">{f.route}</span>
                  <span className="block truncate text-[10px] text-slate-400">{f.meta}</span>
                </span>
                <span className="text-right">
                  <span className="block text-sm font-extrabold text-ink">{f.price}</span>
                  <span className="flex justify-end gap-1">
                    {f.tags.map((t) => (
                      <span key={t} className={`rounded px-1 text-[8px] font-bold uppercase ${t === "Best" ? "bg-emerald-100 text-emerald-700" : "bg-brand/10 text-brand"}`}>{t}</span>
                    ))}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const PHONE_RESULTS = [
  { time: "02:15", arr: "05:45", meta: "4h 30m · Non-stop", price: "$842" },
  { time: "09:40", arr: "15:25", meta: "7h 45m · 1 stop", price: "$694" },
  { time: "18:05", arr: "01:25", meta: "9h 20m · 1 stop", price: "$778" },
];

export function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[250px]">
      <div className="absolute -left-8 bottom-24 z-10 flex items-center gap-2.5 rounded-2xl bg-white px-3 py-2.5 shadow-2xl shadow-black/40 animate-float sm:-left-20">
        <CheckCircle2 className="h-7 w-7 shrink-0 fill-emerald-500 text-white" />
        <span>
          <span className="block text-xs font-bold text-ink">Booking confirmed!</span>
          <span className="block text-[10px] text-slate-500">EK 583 · DAC to DXB · Synced</span>
        </span>
      </div>
      <div className="rounded-[2.5rem] border-[6px] border-[#1d2033] bg-[#0b0e1c] p-3 shadow-2xl shadow-black/60 ring-1 ring-white/10">
        <div className="flex items-center justify-between px-2 text-[10px] font-semibold text-white">
          <span>9:41</span>
          <span className="h-4 w-16 rounded-full bg-black" />
          <span className="flex items-center gap-1"><Wifi className="h-3 w-3" /> ▮</span>
        </div>
        <div className="mt-4 px-1">
          <p className="font-display text-lg font-extrabold text-white">DAC → DXB</p>
          <p className="flex items-center gap-1 text-[10px] text-white/50"><CalendarDays className="h-3 w-3" /> 14 Dec · 1 adult</p>
          <div className="mt-3 flex gap-1.5 text-[10px] font-semibold">
            <span className="rounded-full bg-brand px-2.5 py-1 text-white">Flights</span>
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-white/60">Hotels</span>
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-white/60">Tours</span>
          </div>
          <div className="mt-2 flex gap-1.5 text-[9px] font-bold">
            <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-emerald-300">Refundable</span>
            <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-amber-300">Partial</span>
            <span className="rounded bg-rose-500/20 px-1.5 py-0.5 text-rose-300">Non-refund</span>
          </div>
          <ul className="mt-3 space-y-2">
            {PHONE_RESULTS.map((r) => (
              <li key={r.time} className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                <div className="flex justify-between text-[9px] text-white/50">
                  <span>Emirates</span>
                  <span className="font-bold text-emerald-300">{r.price}</span>
                </div>
                <div className="mt-1 flex items-center justify-between font-display text-sm font-extrabold text-white">
                  <span>{r.time}</span>
                  <span className="mx-2 h-px flex-1 bg-white/20" />
                  <span>{r.arr}</span>
                </div>
                <p className="mt-1 text-[9px] text-white/40">{r.meta}</p>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex justify-around border-t border-white/10 pt-2 text-white/40">
            <LayoutGrid className="h-4 w-4" />
            <Search className="h-4 w-4 text-brand" />
            <CreditCard className="h-4 w-4" />
            <Users className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

