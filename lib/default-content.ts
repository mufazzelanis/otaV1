import type { Content } from "./types";
import { THEME_PRESETS } from "./themes";
import { DEFAULT_NAVIGATION, DEFAULT_PAGES } from "./default-pages";

const { preset, dark, brand, accent, accentInk } = THEME_PRESETS[0];
const defaultTheme = { preset, dark, brand, accent, accentInk };

const json = (v: unknown) => JSON.stringify(v, null, 2);

export const DEFAULT_CONTENT: Content = {
  theme: defaultTheme,

  settings: {
    brandName: "Tripnexa",
    logoText: "TN",
    tagline: "The travel API for OTAs, TMCs and travel platforms",
    description:
      "One connection to flights, hotels, transfers, activities, eSIM and more. Built for travel businesses that want to launch fast and scale without re-platforming.",
    email: "hello@tripnexa.com",
    phone: "+880 1700-000000",
    whatsapp: "+880 1700-000000",
    address: "Level 12, Gulshan Avenue\nDhaka 1212, Bangladesh",
    company: "Tripnexa Technologies Ltd.",
    facebook: "#",
    linkedin: "#",
    youtube: "#",
    footerNote: "Engineered for the next generation of travel.",
    ctaLabel: "Request API Access",
    whatsappEnabled: true,
    whatsappAgent: "Integration team",
    whatsappGreeting: "Hi there! Questions about our travel API? We usually reply within a few minutes.",
    whatsappMessage: "Hi! I'd like to know more about your travel API.",
  },

  announcement: {
    enabled: true,
    eyebrow: "New · Unified NDC + LCC search",
    title: "Every fare source, one response.",
    text: "Search GDS, airline-direct NDC and low-cost carriers in a single call, with results merged, de-duplicated and ranked before they reach you.",
    links: ["Migration guide", "Compare options", "Flight API"],
  },

  hero: {
    badgeTag: "v1",
    badge: "Travel API for OTAs, TMCs and travel platforms",
    titleLines: ["One travel API.", "Flights, hotels and more"],
    highlight: "in one schema",
    subtitle:
      "Search, book and ticket across global distribution systems, airline-direct NDC and low-cost carriers, plus hotels, transfers, activities, tour packages and eSIM, through a single integration. No supplier contracts to sign and a flat fee per booking instead of a percentage.",
    primaryCta: "Request API Access",
    secondaryCta: "Explore the API",
    videoLabel: "Watch the 60-second tour",
    trustPoints: ["No GDS contract needed", "Flat fee, never a percentage", "Free sandbox in minutes"],
    bgImage: "/images/hero-sky.jpg",
    bgVideo: "",
  },

  stats: [
    { id: "s1", value: 700, prefix: "", suffix: "+", label: "Airlines & LCC connections", visible: true },
    { id: "s2", value: 2, prefix: "", suffix: "M+", label: "Hotel properties worldwide", visible: true },
    { id: "s3", value: 9, prefix: "", suffix: "", label: "Product families, one integration", visible: true },
    { id: "s4", value: 1, prefix: "<", suffix: "s", label: "Typical search response time", visible: true },
  ],

  playground: [
    {
      id: "p1",
      label: "Flights",
      icon: "plane",
      method: "POST",
      endpoint: "/v1/flight/search",
      latency: 642,
      visible: true,
      request: json({
        journey_type: "OneWay",
        segments: [{ from: "DAC", to: "DXB", date: "2026-12-14" }],
        travelers: { adults: 1 },
        cabin: "Economy",
      }),
      response: json({
        status: "ok",
        results: 148,
        sources: ["GDS", "NDC", "LCC"],
        cheapest: { carrier: "XY", fare: 312.4, currency: "USD", stops: 0 },
      }),
    },
    {
      id: "p2",
      label: "Hotels",
      icon: "building",
      method: "POST",
      endpoint: "/v1/hotel/search",
      latency: 518,
      visible: true,
      request: json({
        destination: "Bali, ID",
        check_in: "2026-12-20",
        check_out: "2026-12-24",
        rooms: [{ adults: 2 }],
      }),
      response: json({
        status: "ok",
        properties: 1204,
        top: { name: "Ocean Cliff Resort", stars: 5, from: 189, currency: "USD", refundable: true },
      }),
    },
    {
      id: "p3",
      label: "Transfers",
      icon: "car",
      method: "POST",
      endpoint: "/v1/transfer/search",
      latency: 377,
      visible: true,
      request: json({
        pickup: "DXB Terminal 3",
        dropoff: "Downtown Dubai",
        datetime: "2026-12-14T18:30",
        passengers: 2,
      }),
      response: json({
        status: "ok",
        options: 9,
        best: { vehicle: "Sedan", price: 38, currency: "USD", meet_greet: true },
      }),
    },
    {
      id: "p4",
      label: "eSIM",
      icon: "qr",
      method: "GET",
      endpoint: "/v1/esim/plans?country=AE",
      latency: 214,
      visible: true,
      request: json({ country: "AE", days: 7 }),
      response: json({
        status: "ok",
        plans: [
          { data: "5 GB", days: 7, price: 9.5 },
          { data: "Unlimited", days: 7, price: 21 },
        ],
      }),
    },
  ],

  partners: [
    { id: "pa1", name: "Global GDS", visible: true },
    { id: "pa2", name: "NDC Airlines", visible: true },
    { id: "pa3", name: "Low-cost Carriers", visible: true },
    { id: "pa4", name: "Hotel Chains", visible: true },
    { id: "pa5", name: "Bed Banks", visible: true },
    { id: "pa7", name: "Transfer Networks", visible: true },
    { id: "pa8", name: "eSIM Carriers", visible: true },
  ],

  about: {
    eyebrow: "About us",
    title: "The infrastructure layer for modern travel businesses.",
    paragraphs: [
      "We aggregate inventory from global distribution systems, low-cost carriers, hotel chains, transfer suppliers and tour operators, then expose it through one normalized REST API. Connect once and reach a worldwide supply network without negotiating individual contracts or juggling data formats.",
      "We are a technology intermediary, not a travel operator. Bookings are fulfilled by the underlying suppliers; we provide the connectivity, normalization and developer experience so your team can focus on product, not plumbing.",
    ],
  },

  benefits: [
    { id: "b1", icon: "rocket", title: "Sell from day one", text: "Ready-to-use, normalized endpoints across every category, so you can take bookings in your first week.", visible: true },
    { id: "b2", icon: "merge", title: "Single integration", text: "Hundreds of global suppliers behind one clean API. No SDK sprawl, no per-supplier quirks.", visible: true },
    { id: "b3", icon: "layers", title: "Zero complexity", text: "We absorb the supplier contracts, formats and edge cases so your engineers don't have to.", visible: true },
    { id: "b4", icon: "trending", title: "Scale without limits", text: "From your first booking to millions, without rebuilding your stack mid-flight.", visible: true },
  ],

  products: [
    {
      id: "pr1", slug: "flight-api", name: "Flight Aggregation API", icon: "plane", tone: "brand",
      short: "GDS, NDC and low-cost carriers worldwide with real-time availability, dynamic pricing and instant ticketing.",
      description: "Search hundreds of airlines across GDS, airline-direct NDC and low-cost carriers in one request. Results arrive merged, de-duplicated and ranked, with branded fares, ancillaries and seat maps in one schema.",
      features: ["Unified GDS + NDC + LCC search", "Branded fares & ancillaries", "Seat maps and SSRs", "Instant ticketing & void", "Post-booking changes and refunds"],
      endpoints: ["POST /v1/flight/search", "POST /v1/flight/price", "POST /v1/flight/book", "POST /v1/flight/ticket"],
      tag: "Core",
      visible: true,
    },
    {
      id: "pr2", slug: "hotel-api", name: "Hotel Booking API", icon: "building", tone: "violet",
      short: "Millions of properties, from 5-star resorts to budget stays, with rich content and live availability.",
      description: "Content-rich hotel inventory mapped to a single property ID, with photos, amenities, cancellation policies and live rates from multiple suppliers.",
      features: ["2M+ properties mapped", "Rich content and imagery", "Live rates & availability", "Flexible cancellation data", "Multi-room bookings"],
      endpoints: ["POST /v1/hotel/search", "GET /v1/hotel/{id}", "POST /v1/hotel/book"],
      tag: "Core",
      visible: true,
    },
    {
      id: "pr3", slug: "transfer-api", name: "Transfer API", icon: "car", tone: "sky",
      short: "Private and airport transfers between airports, hotels and city addresses: search, book and cancel.",
      description: "Door-to-door transfers worldwide with fixed prices, vehicle classes and meet & greet options.",
      features: ["Airport, hotel & address pickups", "Fixed upfront pricing", "Meet & greet add-on", "Free cancellation windows"],
      endpoints: ["POST /v1/transfer/search", "POST /v1/transfer/book"],
      tag: "Ground",
      visible: true,
    },
    {
      id: "pr5", slug: "activities-api", name: "Activities & Tours API", icon: "ticket", tone: "amber",
      short: "Local tours, unique experiences, theme park tickets and iconic attractions worldwide.",
      description: "Bookable experiences with live availability, timeslots and instant mobile vouchers.",
      features: ["300k+ experiences", "Timeslot availability", "Instant mobile vouchers", "Multi-language content"],
      endpoints: ["GET /v1/activity/search", "POST /v1/activity/book"],
      tag: "Experiences",
      visible: true,
    },
    {
      id: "pr6", slug: "tour-package-api", name: "Tour Package API", icon: "map", tone: "violet",
      short: "Pre-packaged tours with city search, tour details, price validation, ordering and issuance in one flow.",
      description: "Sell curated multi-day packages with itineraries, inclusions and validated pricing.",
      features: ["City and theme search", "Day-by-day itineraries", "Price validation", "Order & issuance"],
      endpoints: ["GET /v1/package/search", "POST /v1/package/order"],
      tag: "Packages",
      visible: true,
    },
    {
      id: "pr9", slug: "lounge-api", name: "Business Lounge API", icon: "sofa", tone: "emerald",
      short: "Airport lounge access as a checkout add-on: seating, food, Wi-Fi and shower suites worldwide.",
      description: "Upsell lounge access at checkout with instant confirmation and QR passes.",
      features: ["1,500+ lounges", "Instant QR passes", "Checkout upsell", "Flexible cancellation"],
      endpoints: ["GET /v1/lounge/search", "POST /v1/lounge/book"],
      tag: "Add-on",
      visible: true,
    },
    {
      id: "pr10", slug: "fast-track-api", name: "Fast Track API", icon: "fast", tone: "sky",
      short: "Priority lanes through security, immigration and customs at 200+ airports.",
      description: "Departure, arrival and transit fast track services with a dedicated agent.",
      features: ["200+ airports", "Departure & arrival", "Transit assistance"],
      endpoints: ["GET /v1/fasttrack/search", "POST /v1/fasttrack/book"],
      tag: "Add-on",
      visible: true,
    },
    {
      id: "pr11", slug: "meet-greet-api", name: "Meet & Greet API", icon: "handshake", tone: "rose",
      short: "A multilingual assistant meets travellers on arrival, handles bags and escorts them through.",
      description: "VIP arrival and departure assistance for premium travellers and families.",
      features: ["Multilingual assistants", "Baggage help", "VIP escorts"],
      endpoints: ["POST /v1/meetgreet/book"],
      tag: "Add-on",
      visible: true,
    },
    {
      id: "pr12", slug: "esim-api", name: "Travel eSIM API", icon: "qr", tone: "violet",
      short: "Instant QR-code eSIM activation on premium local networks in 175+ countries.",
      description: "Sell data plans with instant activation, no roaming bills and in-app top-ups.",
      features: ["175+ countries", "Instant QR activation", "Top-ups", "Usage tracking"],
      endpoints: ["GET /v1/esim/plans", "POST /v1/esim/order"],
      tag: "Connectivity",
      visible: true,
    },
  ],

  useCases: [
    { id: "u1", icon: "monitor", tone: "rose", title: "Online Travel Agencies", text: "Launch a full consumer marketplace with flights, hotels, activities and transfers from one integration.", visible: true },
    { id: "u2", icon: "briefcase", tone: "indigo", title: "Corporate Travel Platforms", text: "Power TMC tools with policy controls, negotiated rates and approval flows.", visible: true },
    { id: "u3", icon: "building", tone: "violet", title: "Booking Engines & SaaS", text: "White-label booking infrastructure for vertical SaaS, hotel groups and tour operators.", visible: true },
    { id: "u4", icon: "bulb", tone: "amber", title: "Travel-Tech Startups", text: "Skip the year-long supplier approval cycle and ship your MVP in weeks.", visible: true },
    { id: "u5", icon: "cart", tone: "emerald", title: "E-commerce & Loyalty", text: "Add travel to existing storefronts, points programs and reward platforms.", visible: true },
    { id: "u6", icon: "cpu", tone: "sky", title: "AI Travel Agents", text: "Feed conversational and agentic travel apps with structured, machine-readable inventory.", visible: true },
  ],

  reasons: [
    { id: "r1", icon: "rocket", title: "Zero to launch in days", text: "Skip lengthy supplier approvals and complex coding. Integrate once and start selling.", visible: true },
    { id: "r2", icon: "globe", title: "Global supply network", text: "Worldwide inventory without negotiating contracts region by region.", visible: true },
    { id: "r3", icon: "trending", title: "Built for scale", text: "Infrastructure designed for high-volume OTAs and fast-growing startups.", visible: true },
    { id: "r4", icon: "code", title: "Developer-friendly", text: "Clean architecture, normalized JSON, sandbox keys and real engineers on support.", visible: true },
  ],

  compare: [
    { id: "c1", group: "Speed & setup", label: "Time to first booking", note: "From signup to live bookings", us: "Days", them: "6–12 months", themMark: "no", visible: true },
    { id: "c2", group: "Speed & setup", label: "Supplier contracts", note: "Agreements you sign and manage", us: "1", them: "Dozens", themMark: "no", visible: true },
    { id: "c3", group: "Technology", label: "Data normalization", note: "One schema across every supplier", us: "yes", them: "no", visible: true },
    { id: "c4", group: "Technology", label: "Sandbox environment", note: "Test before you go live", us: "yes", them: "Limited", themMark: "partial", visible: true },
    { id: "c5", group: "Technology", label: "Multi-category coverage", note: "Flights, hotels, transfers & more", us: "yes", them: "no", visible: true },
    { id: "c6", group: "Cost", label: "Engineering overhead", note: "Ongoing maintenance effort", us: "Low", them: "Very high", themMark: "no", visible: true },
  ],

  challenges: [
    {
      id: "ch1", icon: "layers", problem: "Siloed supplier connections", problemTag: "Months of integration",
      problemText: "GDS, NDC, low-cost carriers and hotel suppliers each need their own contract, credentials and integration, with no shared data model.",
      solutionIcon: "merge", solution: "One normalized API", solutionTag: "Single source of truth",
      solutionText: "Every supplier sits behind a single REST schema, so search, pricing and booking work the same way across all inventory.",
      visible: true,
    },
    {
      id: "ch2", icon: "support", problem: "Manual post-booking work", problemTag: "Ops bottleneck",
      problemText: "Voids, refunds and reissues are handled supplier by supplier, often over email or extranets, and errors compound silently.",
      solutionIcon: "zap", solution: "Automated booking lifecycle", solutionTag: "End-to-end via API",
      solutionText: "Ticketing, voids, refunds and changes run through the same API calls, with a status trail for every booking.",
      visible: true,
    },
    {
      id: "ch3", icon: "chart", problem: "Unpredictable unit costs", problemTag: "Shrinking margins",
      problemText: "Percentage-based fees and per-supplier pricing make margins hard to forecast as your volume grows.",
      solutionIcon: "wallet", solution: "Flat, predictable pricing", solutionTag: "Flat fee per booking",
      solutionText: "A flat fee per booking, never a percentage, so your unit economics stay clear from the first sale.",
      visible: true,
    },
    {
      id: "ch4", icon: "code", problem: "Supplier quirks in your codebase", problemTag: "Engineering drag",
      problemText: "Every supplier's edge cases leak into your product, and engineers spend their time firefighting instead of shipping.",
      solutionIcon: "shield", solution: "Clean developer experience", solutionTag: "Ship faster",
      solutionText: "Normalized JSON, sandbox keys and documented errors keep supplier complexity out of your stack.",
      visible: true,
    },
  ],

  inventory: {
    eyebrow: "Live inventory",
    title: "Every fare source through *one search call.*",
    subtitle: "Search flights, hotels and more across every connected source in a single request, with live pricing and full availability. Try it right here.",
    points: [
      { id: "in1", icon: "plane", title: "Flights + hotels", text: "Combined across GDS airlines, NDC, low-cost carriers and hotel suppliers in one request." },
      { id: "in2", icon: "globe", title: "GDS, NDC and LCC connections", text: "Pre-integrated and maintained by us, so new sources appear without new code on your side." },
      { id: "in3", icon: "zap", title: "Smart rate caching", text: "Intelligent caching keeps searches fast, while every price is re-validated before booking." },
    ],
  },

  ecosystem: {
    eyebrow: "Product ecosystem",
    title: "One API to drive *every travel product.*",
    subtitle: "Every product shares the same schema, credentials and booking flow: add a new category without starting a new integration.",
    modules: [
      { id: "m1", label: "Air", items: ["Search", "Price", "Book", "Ticket"] },
      { id: "m2", label: "Stay", items: ["Hotels", "Rooms", "Rates", "Vouchers"] },
      { id: "m3", label: "Ground", items: ["Transfers", "Activities", "Tours", "Packages"] },
      { id: "m4", label: "Add-ons", items: ["eSIM", "Lounges", "Fast track", "Meet & greet"] },
    ],
  },

  analytics: {
    eyebrow: "Analytics & reporting",
    title: "Better margins start with *better data.*",
    subtitle: "Every search, booking and ticket flows through one pipeline, so you can see what sells, where and through which channel, as it happens.",
    points: [
      { id: "an1", icon: "chart", title: "Live booking dashboard", text: "Bookings, tickets and payments update the moment a transaction is confirmed." },
      { id: "an2", icon: "map", title: "Route & destination insights", text: "See where demand is strongest by route, region and season." },
      { id: "an3", icon: "users", title: "Channel performance", text: "Compare conversion and revenue across your web, mobile and partner channels." },
      { id: "an4", icon: "layers", title: "Exportable reports", text: "Download booking and reconciliation reports, or pull the same data through the API." },
    ],
  },

  integrations: [
    { id: "ig1", group: "Flight supply", code: "GDS", name: "Global GDS", note: "Full-content flights", status: "live", visible: true },
    { id: "ig2", group: "Flight supply", code: "NDC", name: "NDC airlines", note: "Airline-direct offers", status: "live", visible: true },
    { id: "ig3", group: "Flight supply", code: "LCC", name: "Low-cost carriers", note: "Direct LCC content", status: "live", visible: true },
    { id: "ig4", group: "Flight supply", code: "BFA", name: "Branded fares", note: "Bundles, seats & bags", status: "certified", visible: true },
    { id: "ig5", group: "Stay & ground", code: "HTL", name: "Hotel chains", note: "Direct chain rates", status: "live", visible: true },
    { id: "ig6", group: "Stay & ground", code: "BED", name: "Bed banks", note: "Wholesale inventory", status: "live", visible: true },
    { id: "ig7", group: "Stay & ground", code: "TRF", name: "Transfers", note: "Airport & city rides", status: "live", visible: true },
    { id: "ig8", group: "Stay & ground", code: "ACT", name: "Activities", note: "Tours & attractions", status: "certified", visible: true },
    { id: "ig9", group: "Travel add-ons", code: "SIM", name: "eSIM carriers", note: "175+ countries", status: "new", visible: true },
    { id: "ig10", group: "Travel add-ons", code: "LNG", name: "Airport lounges", note: "1,500+ lounges", status: "live", visible: true },
    { id: "ig11", group: "Travel add-ons", code: "FST", name: "Fast track", note: "200+ airports", status: "live", visible: true },
    { id: "ig12", group: "Travel add-ons", code: "+", name: "More coming", note: "Request a supplier", status: "soon", visible: true },
  ],

  sync: {
    eyebrow: "Seamless sync",
    title: "One API for your web *and mobile app.*",
    subtitle: "Build your website and mobile app on the same endpoints. Travellers start a search on one device and pick up right where they left off on another.",
    points: ["Same schema on web and mobile", "Webhooks on every booking event", "Smart caching for fast results", "Scoped, secure API keys"],
  },

  pricing: {
    eyebrow: "Transparent pricing",
    title: "One API. *No hidden fees.*",
    subtitle: "Start free in the sandbox and pay a flat fee only when you book. No percentage of your sales, no revenue share, no surprises.",
    plans: [
      { id: "pl1", label: "Sandbox", prefix: "$", amount: "0", suffix: "", note: "Full API access with test data" },
      { id: "pl2", label: "Production", prefix: "", amount: "Flat", suffix: "/booking", note: "Never a percentage of your sales" },
    ],
    primary: "Book a free demo",
    secondary: "Talk to sales",
  },

  steps: [
    { id: "st1", title: "Sign up", text: "Register your business and receive sandbox API credentials instantly.", visible: true },
    { id: "st2", title: "Integrate", text: "Plug the API into your web or mobile app with clean docs and SDK examples.", visible: true },
    { id: "st3", title: "Go live", text: "Flip to production and offer global inventory to your customers.", visible: true },
  ],

  testimonials: [
    { id: "t1", quote: "We replaced four supplier integrations with one and launched our flight vertical in three weeks.", name: "Ayesha Rahman", role: "CTO", company: "SkyBazaar", rating: 5, visible: true },
    { id: "t2", quote: "The normalized schema is the real win. Our engineers stopped firefighting supplier quirks.", name: "Daniel Okafor", role: "Head of Engineering", company: "Wayfare", rating: 5, visible: true },
    { id: "t3", quote: "Flat per-booking pricing made our unit economics predictable from day one.", name: "Mei Tanaka", role: "Founder", company: "Kozue Travel", rating: 5, visible: true },
    { id: "t4", quote: "Sandbox to production in under a month, with support that actually answers.", name: "Rafael Lima", role: "Product Lead", company: "Viajei", rating: 5, visible: true },
  ],

  faqs: [
    { id: "f1", question: "What is this platform?", answer: "A unified travel API that gives you flights, hotels, transfers, activities, tour packages, eSIM and more through one normalized REST integration.", visible: true },
    { id: "f2", question: "Who is it for?", answer: "OTAs, TMCs, corporate booking tools, travel-tech startups, loyalty programs and AI travel agents.", visible: true },
    { id: "f3", question: "What inventory does the API support?", answer: "Flights (GDS, NDC and LCC), hotels, transfers, activities, tour packages, lounges, fast track, meet & greet and eSIM.", visible: true },
    { id: "f4", question: "How long does integration take?", answer: "Most teams make their first sandbox booking within a day and go live within two to six weeks.", visible: true },
    { id: "f5", question: "Are you a travel agent or an infrastructure provider?", answer: "An infrastructure provider. Bookings are fulfilled by the underlying suppliers; we provide connectivity and normalization.", visible: true },
    { id: "f6", question: "How is data secured?", answer: "TLS everywhere, encrypted storage, scoped API keys, IP allow-listing and audit logs.", visible: true },
    { id: "f7", question: "How do I get API access?", answer: "Request access, book a short kick-off call and receive sandbox credentials the same day.", visible: true },
  ],

  resources: [
    { id: "re1", tag: "Guide", title: "Best travel APIs compared", text: "How a unified aggregator stacks up against GDS-direct and single-airline NDC.", visible: true },
    { id: "re2", tag: "Playbook", title: "Migrating from a legacy GDS integration", text: "An endpoint map and a step-by-step migration plan.", visible: true },
    { id: "re3", tag: "Explainer", title: "What is a travel API aggregator?", text: "One connection to many suppliers: how it works and when it pays off.", visible: true },
  ],

  headings: {
    partners: { eyebrow: "Connected supply", title: "Inventory from every corner of travel", subtitle: "" },
    benefits: { eyebrow: "Why now", title: "Launch your travel business in days, not months.", subtitle: "Traditional travel integrations are slow, fragmented and expensive. We change that, whether you're building an OTA, a corporate tool or a niche platform." },
    products: { eyebrow: "Core products", title: "One API. *Unlimited travel inventory.*", subtitle: "Structured, normalized and ready to sell. Reach the whole globe through a single connection." },
    usecases: { eyebrow: "Use cases", title: "Built for the businesses shaping modern travel.", subtitle: "From scrappy startups to established platforms, we're the foundation underneath." },
    why: { eyebrow: "Why choose us", title: "Go from startup to global travel agency, *fast.*", subtitle: "See how a unified travel API measures up against building supplier integrations yourself, capability by capability." },
    steps: { eyebrow: "How it works", title: "Start selling in three simple steps.", subtitle: "Going live has never been easier." },
    testimonials: { eyebrow: "Loved by builders", title: "Teams ship *faster with us.*", subtitle: "" },
    faq: { eyebrow: "FAQ", title: "Everything you need *to know.*", subtitle: "Can't find what you're looking for? Get in touch." },
    resources: { eyebrow: "Resources", title: "Go deeper in the Playbook", subtitle: "" },
    challenge: {
      eyebrow: "The challenge",
      title: "Fragmented supplier integrations are *holding back your growth.*",
      subtitle: "Every new supplier means another contract, another data format and another integration to maintain. One unified travel API replaces that complexity.",
    },
    dashboard: {
      eyebrow: "Dashboard preview",
      title: "See your entire travel business in *one view.*",
      subtitle: "Track every booking, channel, payment and destination from one place, powered by the same API your customers book through.",
    },
    integrations: {
      eyebrow: "Integrations",
      title: "Access every source *your business depends on.*",
      subtitle: "Real-time inventory from global distribution systems, airline-direct NDC, low-cost carriers, bed banks and ancillary suppliers, all behind one integration.",
    },
  },

  cta: {
    eyebrow: "Book a demo",
    title: "Start in the sandbox. *Go live when you're ready.*",
    text: "Book a short kick-off call, get sandbox credentials at no charge, and build against the same schema you'll use in production.",
    primary: "Book a demo",
    secondary: "Talk to sales",
    perks: ["Free sandbox credentials", "No commitment required", "30-minute kick-off call", "Reply within one business day"],
  },

  // The redesigned homepage order. Older sections stay available but hidden.
  sections: [
    { id: "hero", label: "Hero", visible: true },
    { id: "partners", label: "Connected supply marquee", visible: true },
    { id: "challenge", label: "Challenge: without vs. with", visible: true },
    { id: "products", label: "Products grid", visible: true },
    { id: "inventory", label: "Live inventory + API playground", visible: true },
    { id: "ecosystem", label: "Product ecosystem", visible: true },
    { id: "why", label: "Comparison table", visible: true },
    { id: "stats", label: "Stats bar", visible: true },
    { id: "analytics", label: "Analytics & reporting", visible: true },
    { id: "dashboard", label: "Dashboard preview", visible: true },
    { id: "integrations", label: "Integrations", visible: true },
    { id: "testimonials", label: "Testimonials", visible: true },
    { id: "sync", label: "Web + mobile sync", visible: true },
    { id: "faq", label: "FAQ", visible: true },
    { id: "pricing", label: "Pricing", visible: true },
    { id: "cta", label: "Book a demo + contact", visible: true },
    { id: "announcement", label: "Announcement band", visible: false },
    { id: "about", label: "About", visible: false },
    { id: "benefits", label: "Benefits", visible: false },
    { id: "usecases", label: "Use cases", visible: false },
    { id: "steps", label: "How it works", visible: false },
    { id: "resources", label: "Resources", visible: false },
  ],

  navigation: DEFAULT_NAVIGATION,
  pages: DEFAULT_PAGES,
};
