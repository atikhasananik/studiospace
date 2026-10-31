import Link from "next/link";
import {
  ArrowUpRight,
  CalendarCheck2,
  Compass,
  HousePlus,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const SERVICES: {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  audience: string;
}[] = [
  {
    number: "01",
    title: "Discover your space",
    description:
      "Explore creative studios by discipline and get a clearer picture of each space through its listing details.",
    icon: Compass,
    audience: "For creators",
  },
  {
    number: "02",
    title: "Plan your session",
    description:
      "Compare equipment, amenities, location, and availability to find a setting that fits your project.",
    icon: CalendarCheck2,
    audience: "For every project",
  },
  {
    number: "03",
    title: "Make room for ideas",
    description:
      "Find a dedicated place to focus on your craft, from the first setup to the final take.",
    icon: Lightbulb,
    audience: "Made for making",
  },
  {
    number: "04",
    title: "Share your studio",
    description:
      "Introduce your creative space to people looking for the right place to bring a project to life.",
    icon: HousePlus,
    audience: "For hosts",
  },
];

export default function WhatWeDoSection() {
  return (
    <section
      id="what-we-do"
      aria-labelledby="what-we-do-heading"
      className="relative overflow-hidden border-t border-border bg-muted/20 py-16 md:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 top-0 size-96 rounded-full bg-primary/5 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-card/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
            What We Do
          </span>
          <h2
            id="what-we-do-heading"
            className="mt-5 font-heading text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl"
          >
            We make finding a creative space{" "}
            <span className="text-primary">feel simple.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground text-balance md:text-lg">
            StudioSpace helps creators discover studios and helps hosts share
            spaces built for creative work.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ number, title, description, icon: Icon, audience }) => (
            <article
              key={number}
              className="group relative flex min-h-64 flex-col overflow-hidden rounded-2xl border border-border bg-card/55 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold tracking-[0.18em] text-muted-foreground/70">
                  {number}
                </span>
                <span className="flex size-11 items-center justify-center rounded-xl border border-border bg-background text-primary transition-colors group-hover:border-primary/30 group-hover:bg-primary/10">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
              </div>

              <h3 className="mt-7 font-heading text-lg font-bold tracking-tight text-foreground">
                {title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-4">
                <span className="text-xs font-medium text-muted-foreground">
                  {audience}
                </span>
                <ArrowUpRight
                  className="size-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                  aria-hidden="true"
                />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            nativeButton={false}
            render={<Link href="/studios" />}
            className="h-11 gap-2 rounded-xl bg-primary px-5 font-semibold text-primary-foreground shadow-lg shadow-primary/10 transition-all hover:bg-primary/90 active:scale-95"
          >
            Explore studios
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
