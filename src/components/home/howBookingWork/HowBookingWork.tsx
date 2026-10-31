import Link from "next/link";
import {
  Camera,
  CalendarClock,
  Check,
  Search,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type Step = {
  index: string;
  title: string;
  description: string;
  icon: LucideIcon;
  details: string[];
  meta: string;
};

/** 4-step booking workflow — static content, no backend dependency. */
const STEPS: Step[] = [
  {
    index: "01",
    title: "Discover Spaces",
    description:
      "Search verified studios near you and compare real photos, gear lists, and rates before you commit.",
    icon: Search,
    details: [
      "Live availability badges on every listing",
      "Verified reviews and ratings from real shoots",
      "Filter by category, gear, and price",
    ],
    meta: "≈ 2 min",
  },
  {
    index: "02",
    title: "Select Shoot Hours",
    description:
      "Pick your slot on a live hourly calendar — book an hour, a half-day, or lock in the full day.",
    icon: CalendarClock,
    details: [
      "Real-time hourly and half-day blocks",
      "Instant price breakdown as you select",
      "See blackout dates before checkout",
    ],
    meta: "≈ 3 min",
  },
  {
    index: "03",
    title: "Book Instantly",
    description:
      "Confirm with secure checkout — no calls, no email chains, no waiting on a host to reply.",
    icon: Zap,
    details: [
      "Secure checkout in a few clicks",
      "Host confirmation within minutes",
      "Free cancellation window on every booking",
    ],
    meta: "Instant",
  },
  {
    index: "04",
    title: "Create & Produce",
    description:
      "Show up and shoot. Everything you need is ready — then rate the space and rebook in one tap.",
    icon: Camera,
    details: [
      "Door codes sent before arrival",
      "On-site host support during your session",
      "Rate your space and rebook in one tap",
    ],
    meta: "Your session",
  },
];

const HowBookingWork = () => {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="border-y border-border bg-muted/20 py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Header — centered, echoes the hero/featured rhythm ────── */}
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-card/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent backdrop-blur-md">
            <span className="relative flex size-1.5" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
            </span>
            Simple Booking
          </span>

          <h2
            id="how-it-works-heading"
            className="mt-5 font-heading text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl"
          >
            How Booking <span className="text-primary">Works</span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-balance md:text-lg">
            From search to shoot in four steps — no phone calls, no waiting,
            no surprises.
          </p>
        </div>

        {/* ── Steps grid with dashed connector ──────────────────────── */}
        <div className="relative mt-12">
          {/* Dashed connector line behind the number badges (desktop only) */}
          <div
            aria-hidden="true"
            className="absolute top-8 right-[12%] left-[12%] hidden border-t border-dashed border-border lg:block"
          />

          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {STEPS.map((step) => {
              const Icon = step.icon;

              return (
                <li
                  key={step.index}
                  className="group relative flex flex-col rounded-xl border border-border bg-card/40 p-6 shadow-sm transition-all duration-300 hover:border-primary/40 hover:bg-card hover:shadow-lg hover:shadow-primary/10 hover:ring-1 hover:ring-primary/30"
                >
                  {/* Number badge — sits on the connector line */}
                  <span className="absolute -top-4 left-6 inline-flex size-8 items-center justify-center rounded-full border border-border bg-card font-mono text-xs font-bold tracking-wider text-primary shadow-sm">
                    {step.index}
                  </span>

                  {/* Icon puck */}
                  <span className="mt-4 inline-flex size-11 items-center justify-center rounded-lg border border-border bg-card text-primary transition-colors duration-300 group-hover:border-primary/40 group-hover:bg-primary/10">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>

                  {/* Title + description */}
                  <h3 className="mt-5 font-heading text-lg font-bold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>

                  {/* Detail bullets */}
                  <ul className="mt-4 space-y-2 border-t border-border/70 pt-4">
                    {step.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <Check
                          className="mt-0.5 size-3.5 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Meta chip — sticky to the bottom for equal heights */}
                  <span className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                    {step.meta}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        {/* ── Footer CTA + stat row ─────────────────────────────────── */}
        <div className="mt-12 flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
            <p className="font-heading text-lg font-bold tracking-tight text-foreground">
              Ready to shoot?
            </p>
            <Button
              nativeButton={false}
              render={<Link href="/studios" />}
              className="rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/10 transition-all hover:bg-primary/90 active:scale-95"
            >
              Start browsing studios
            </Button>
          </div>

          <p className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span>
              Avg. booking time:{" "}
              <span className="font-semibold text-foreground">under 5 min</span>
            </span>
            <span aria-hidden="true" className="hidden sm:inline">
              ·
            </span>
            <span>
              <span className="font-semibold text-foreground">2,400+</span>{" "}
              sessions booked
            </span>
            <span aria-hidden="true" className="hidden sm:inline">
              ·
            </span>
            <span>
              <span className="font-semibold text-foreground">100%</span>{" "}
              verified hosts
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowBookingWork;
