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
    title: "Discover your space",
    description:
      "Explore creative studios for photography, film, podcasts, music, and the work you want to make.",
    icon: Search,
    details: [
      "Browse spaces by creative category",
      "See studio photos and descriptions",
      "Find a setting that fits your project",
    ],
    meta: "Start exploring",
  },
  {
    index: "02",
    title: "Compare the details",
    description:
      "Review the information each host provides to see whether a studio suits your session.",
    icon: CalendarClock,
    details: [
      "Check location and listed equipment",
      "Review amenities and studio details",
      "Compare rates and booking information",
    ],
    meta: "Find your fit",
  },
  {
    index: "03",
    title: "Choose your session",
    description:
      "Review the studio’s availability, pricing, and booking terms before you continue.",
    icon: Zap,
    details: [
      "Check current rates and availability",
      "Read the applicable booking details",
      "Contact the host if you need clarity",
    ],
    meta: "Know before you book",
  },
  {
    index: "04",
    title: "Get ready to create",
    description:
      "Use the listing’s access instructions and house rules to prepare for your time in the studio.",
    icon: Camera,
    details: [
      "Review the studio’s house rules",
      "Check access details before arrival",
      "Bring your idea to the right space",
    ],
    meta: "Make room for ideas",
  },
];

const HowBookingWork = () => {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="scroll-mt-20 border-y border-border bg-muted/20 py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Header — centered, echoes the hero/featured rhythm ────── */}
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-card/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent backdrop-blur-md">
            <span className="relative flex size-1.5" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
            </span>
            Your creative process
          </span>

          <h2
            id="how-it-works-heading"
            className="mt-5 font-heading text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl"
          >
            How It <span className="text-primary">Works</span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-balance md:text-lg">
            Find a space that fits your project, review the details, and get
            ready to create.
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
              Ready to find your space?
            </p>
            <Button
              nativeButton={false}
              render={<Link href="/studios" />}
              className="rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/10 transition-all hover:bg-primary/90 active:scale-95"
            >
              Explore studios
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Spaces for photo, film, podcasts, music, and more.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowBookingWork;
