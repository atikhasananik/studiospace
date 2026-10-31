import Link from "next/link";
import {
  ArrowUpRight,
  Camera,
  Compass,
  Mic2,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const CREATIVE_SPACES: {
  label: string;
  detail: string;
  icon: LucideIcon;
}[] = [
  {
    label: "Photo & film studios",
    detail: "A setting for every frame and every scene.",
    icon: Camera,
  },
  {
    label: "Podcast rooms",
    detail: "Purpose-built spaces to bring your voice to life.",
    icon: Mic2,
  },
  {
    label: "Music & creative suites",
    detail: "Room to focus, experiment, and make something yours.",
    icon: Compass,
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden border-t border-border bg-muted/20 py-16 md:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 size-96 rounded-full bg-primary/5 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-card/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
            About StudioSpace
          </span>

          <h2
            id="about-heading"
            className="mt-6 max-w-2xl font-heading text-4xl leading-[1.08] font-extrabold tracking-tight text-foreground text-balance md:text-5xl lg:text-6xl"
          >
            Great work starts with{" "}
            <span className="text-primary">the right space.</span>
          </h2>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-balance md:text-lg">
            StudioSpace brings creators and creative studios together. Find a
            space that fits your craft, explore what it offers, and spend less
            time searching for a room—and more time making something remarkable.
          </p>

          <p className="mt-4 max-w-xl border-l-2 border-primary/70 pl-4 text-sm leading-relaxed text-foreground/80 md:text-base">
            From the first idea to the final take, we believe your environment
            should help your creativity move forward.
          </p>

          <Button
            nativeButton={false}
            render={<Link href="/studios" />}
            className="mt-8 h-11 gap-2 rounded-xl bg-primary px-5 font-semibold text-primary-foreground shadow-lg shadow-primary/10 transition-all hover:bg-primary/90 active:scale-95"
          >
            Find your space
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Button>
        </div>

        <div className="relative rounded-2xl border border-border bg-card/60 p-5 shadow-xl shadow-background/10 backdrop-blur-sm sm:p-7">
          <div className="mb-5 flex items-center justify-between border-b border-border/80 pb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Made for the process
              </p>
              <p className="mt-1 font-heading text-xl font-bold tracking-tight text-foreground">
                Your craft comes first.
              </p>
            </div>
            <span className="flex size-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
              <Compass className="size-5" aria-hidden="true" />
            </span>
          </div>

          <ul className="divide-y divide-border/70">
            {CREATIVE_SPACES.map(({ label, detail, icon: Icon }, index) => (
              <li key={label} className="flex items-start gap-4 py-4 first:pt-1">
                <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary">
                  <Icon className="size-[18px]" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-heading text-sm font-bold tracking-tight text-foreground sm:text-base">
                      {label}
                    </h3>
                    <span className="font-mono text-[10px] tracking-widest text-muted-foreground/70">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {detail}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-2 flex items-center justify-between rounded-xl border border-accent/20 bg-accent/5 px-4 py-3">
            <span className="text-xs font-medium text-muted-foreground sm:text-sm">
              Make room for your next idea.
            </span>
            <span className="font-heading text-xs font-bold tracking-wide text-accent">
              CREATE FREELY
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
