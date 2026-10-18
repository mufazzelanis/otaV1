import type { CSSProperties, ReactNode } from "react";
import type { SectionHeading } from "@/lib/types";
import { Reveal } from "./reveal";

/** Renders `*words*` in a title as the italic gradient highlight; everything else stays plain. */
export function RichTitle({ text, dark = false }: { text: string; dark?: boolean }) {
  const parts = text.split(/\*([^*]+)\*/);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 ? (
          <span key={i} className={`text-highlight ${dark ? "text-highlight-dark" : ""}`}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] ${
        dark ? "text-[color-mix(in_oklab,var(--brand)_35%,white)]" : "text-brand"
      }`}
    >
      <span className="h-px w-6 bg-current opacity-70" />
      {children}
    </span>
  );
}

export function Heading({
  heading,
  align = "center",
  dark = false,
  aside,
  className = "mb-14",
}: {
  heading: SectionHeading;
  align?: "center" | "left";
  dark?: boolean;
  aside?: ReactNode;
  className?: string;
}) {
  const center = align === "center";
  return (
    <Reveal className={`flex flex-col gap-6 ${className} ${center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"}`}>
      <div className={center ? "mx-auto max-w-3xl" : "max-w-2xl"}>
        {heading.eyebrow && <Eyebrow dark={dark}>{heading.eyebrow}</Eyebrow>}
        <h2
          className={`mt-4 font-display text-3xl font-bold leading-[1.12] tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          <RichTitle text={heading.title} dark={dark} />
        </h2>
        {heading.subtitle && (
          <p className={`mx-auto mt-5 max-w-2xl text-base leading-relaxed text-pretty ${dark ? "text-white/65" : "text-muted"}`}>
            {heading.subtitle}
          </p>
        )}
      </div>
      {aside}
    </Reveal>
  );
}

export function Container({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`} style={style}>{children}</div>;
}

export function Logo({ text, name, light = true }: { text: string; name: string; light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl bg-brand font-display text-sm font-extrabold text-white shadow-lg shadow-brand/30">
        <span className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-accent/90" />
        <span className="relative">{text}</span>
      </span>
      <span className={`font-display text-lg font-bold tracking-tight ${light ? "text-white" : "text-ink"}`}>{name}</span>
    </span>
  );
}
