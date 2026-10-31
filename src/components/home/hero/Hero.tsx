"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

type Slide = {
  image: string;
  alt: string;
  eyebrow: string;
  description: string;
  /** Hero copy re-animates whenever this changes */
  key: number;
};

/* Placeholder imagery (Unsplash, high-res) — swap `image` values for your
   own files in public/ when ready. Verified to return 200. */
const slides: Slide[] = [
  {
    key: 0,
    image:
      "https://images.unsplash.com/photo-1497015289639-54688650d173?auto=format&fit=crop&w=2400&q=85",
    alt: "Professional cinema camera and softbox lighting on a film set",
    eyebrow: "Film & Video Stages",
    description:
      "Cinema-grade gear, lit stages, zero setup — book by the hour and shoot the same day.",
  },
  {
    key: 1,
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=2400&q=85",
    alt: "Music production control room with mixing console and guitars",
    eyebrow: "Recording Studios",
    description:
      "Pro consoles, acoustically treated rooms, and signal chains built for radio-ready releases.",
  },
  {
    key: 2,
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=2400&q=85",
    alt: "Broadcast microphone on a boom arm in a dark podcast studio",
    eyebrow: "Podcast Suites",
    description:
      "Broadcast mics, silent rooms, one-take setup — walk in, hit record, and publish today.",
  },
];

const AUTOPLAY_MS = 6000;

/** Height shared by the hero container — one-line tweaks.
 *  100svh = full viewport on every device (mobile browser chrome included).
 *  The navbar overlays the hero, so no offset is needed. */
const HERO_HEIGHT = "h-svh min-h-[540px]";

/** Cyan pulse dot — brand "live" indicator (#00F2FE) */
function LiveDot() {
  return (
    <span className="relative flex size-1.5" aria-hidden="true">
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
      <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
    </span>
  );
}

export function Hero() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  // Track active slide → drives the animated text overlay and dots
  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setActive(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  // Autoplay — pauses while the hero is hovered or focused
  React.useEffect(() => {
    if (paused || !api) return;
    const timer = window.setInterval(() => api.scrollNext(), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [api, paused]);

  const slide = slides[active] ?? slides[0];

  const arrowClassName =
    "bottom-4 inset-y-auto left-auto z-30 hidden border-border bg-background/60 text-foreground backdrop-blur-md hover:bg-background/80 md:inline-flex";

  return (
    <section
      aria-label="Featured studios"
      className="hero-dark relative w-full overflow-hidden bg-background"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className={cn("relative w-full", HERO_HEIGHT)}>
        {/* ── Full-bleed image carousel ─────────────────────────────── */}
        <Carousel
          setApi={setApi}
          opts={{ loop: true, duration: 32 }}
          className="absolute inset-0 [&>[data-slot=carousel-content]]:h-full"
        >
          <CarouselContent className="ml-0 h-full">
            {slides.map((s, i) => (
              <CarouselItem key={s.key} className="h-full pl-0">
                <div className="relative h-full w-full">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    sizes="100vw"
                    priority={i === 0}
                    className={cn(
                      "object-cover object-center motion-safe:transition-transform motion-safe:ease-linear",
                      // Cinematic slow zoom on the active slide (ken-burns)
                      "motion-safe:duration-[6000ms]",
                      i === active ? "scale-105" : "scale-100",
                    )}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious
            className={cn("right-16", arrowClassName)}
            aria-label="Previous slide"
          />
          <CarouselNext
            className={cn("right-4", arrowClassName)}
            aria-label="Next slide"
          />
        </Carousel>

        {/* ── Theme-aware wash — strictly INSIDE the hero box; the image
             stays visible to the hero's edge so the filter visibly stops
             at the section boundary. ── */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-background/50"
        />

        {/* ── Centered hero copy — re-animates on every slide change ─── */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl space-y-5 text-center">
              {/* Static headline — matches the reference design. The slider
                  keeps rotating imagery + eyebrow + description below it. */}
              <h1 className="font-heading text-4xl font-extrabold tracking-tight text-foreground text-balance md:text-5xl lg:text-6xl">
                High-End Venues.{" "}
                <span className="text-primary">Create Freely.</span>
              </h1>

              <div key={slide.key} className="space-y-5">
                <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-card/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-700">
                  <LiveDot />
                  {slide.eyebrow}
                </span>

                <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground text-balance md:text-lg animate-in fade-in slide-in-from-bottom-4 fill-mode-both delay-75 duration-700">
                  {slide.description}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2 pointer-events-auto animate-in fade-in slide-in-from-bottom-4 fill-mode-both delay-150 duration-700">
                <Button
                  nativeButton={false}
                  render={<Link href="/studios" />}
                  className="h-11 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-orange-500/10 transition-all hover:bg-primary/90 active:scale-95"
                >
                  Explore Studios
                </Button>
                <Button
                  nativeButton={false}
                  variant="outline"
                  render={<Link href="/studios" />}
                  className="h-11 rounded-xl border-border bg-background/70 px-6 text-sm font-medium text-foreground backdrop-blur-md transition-all hover:bg-background/90 hover:text-foreground"
                >
                  Host Your Space
                </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Dot indicators in a self-contained glass pill ──────────── */}
        <div
          role="group"
          aria-label="Choose slide"
          className="absolute bottom-6 left-1/2 z-20 flex w-fit -translate-x-1/2 items-center justify-center gap-2.5 rounded-full border border-border/60 bg-background/60 px-3.5 py-2 shadow-lg backdrop-blur-md"
        >
          {slides.map((s, i) => (
            <button
              key={s.key}
              type="button"
              onClick={() => api?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}: ${s.eyebrow}`}
              aria-current={i === active ? "true" : undefined}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === active
                  ? "w-8 bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.6)]"
                  : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
