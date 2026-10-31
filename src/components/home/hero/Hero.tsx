"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { cn } from "cn";
import {
  ArrowLeft,
  ArrowRight,
  AudioLines,
  Clapperboard,
  Mic,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

type Slide = {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  icon: LucideIcon;
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
    title: "Make room for",
    accent: "your vision.",
    description:
      "Find a film-ready stage and give every frame the space it deserves.",
    icon: Clapperboard,
  },
  {
    key: 1,
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=2400&q=85",
    alt: "Music production control room with mixing console and guitars",
    eyebrow: "Recording Studios",
    title: "Give every idea",
    accent: "its sound.",
    description:
      "Discover recording rooms made for finding your sound and bringing it to life.",
    icon: AudioLines,
  },
  {
    key: 2,
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=2400&q=85",
    alt: "Broadcast microphone on a boom arm in a dark podcast studio",
    eyebrow: "Podcast Suites",
    title: "Bring your voice",
    accent: "to the room.",
    description:
      "Explore podcast suites designed to help your conversations take center stage.",
    icon: Mic,
  },
];

const AUTOPLAY_MS = 6000;

/** Height shared by the hero container — one-line tweaks.
 *  100svh = full viewport on every device (mobile browser chrome included).
 *  The navbar overlays the hero, so no offset is needed. */
const HERO_HEIGHT = "h-svh min-h-[540px]";

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
        </Carousel>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,hsl(var(--background)/0.94)_0%,hsl(var(--background)/0.78)_42%,hsl(var(--background)/0.28)_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,hsl(var(--background)/0.76)_0%,transparent_32%,hsl(var(--background)/0.18)_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(hsl(var(--foreground)/0.16)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.16)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(90deg,black,transparent_78%)]"
        />

        <div className="pointer-events-none absolute inset-0">
          <div className="mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-5 pb-20 pt-24 sm:px-8 lg:px-10">
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_340px]">
              <div className="max-w-3xl">
                <div
                  key={slide.key}
                  className="space-y-6 animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700"
                >
                  <div className="flex items-center gap-3">
                    <span className="relative flex size-2" aria-hidden="true">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
                      <span className="relative inline-flex size-2 rounded-full bg-accent" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                      StudioSpace / {slide.eyebrow}
                    </span>
                  </div>

                  <h1 className="max-w-3xl font-heading text-5xl leading-[0.98] font-extrabold tracking-[-0.055em] text-foreground text-balance sm:text-6xl md:text-7xl xl:text-[5.5rem]">
                    {slide.title}
                    <br />
                    <span className="text-primary">{slide.accent}</span>
                  </h1>

                  <p className="max-w-xl text-base leading-relaxed text-foreground/75 text-balance sm:text-lg">
                    {slide.description}
                  </p>

                  <div className="pointer-events-auto flex flex-wrap items-center gap-3 pt-1">
                    <Button
                      nativeButton={false}
                      render={<Link href="/studios" />}
                      className="h-12 gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 active:scale-95"
                    >
                      Explore studios
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Button>
                    <Button
                      nativeButton={false}
                      variant="outline"
                      render={<Link href="/#host-guarantee" />}
                      className="h-12 rounded-xl border-foreground/25 bg-foreground/5 px-6 text-sm font-semibold text-foreground backdrop-blur-md transition-colors hover:border-foreground/50 hover:bg-foreground/10 hover:text-foreground"
                    >
                      List your space
                    </Button>
                  </div>
                </div>

                <div className="mt-12 flex items-center gap-4 border-t border-foreground/15 pt-5 text-xs text-foreground/60 sm:mt-16">
                  <span className="font-mono tracking-widest text-foreground">
                    {String(active + 1).padStart(2, "0")}
                    <span className="text-foreground/35"> / </span>
                    {String(slides.length).padStart(2, "0")}
                  </span>
                  <span className="h-px w-12 bg-primary" />
                  <span>Find a space. Make something unforgettable.</span>
                </div>
              </div>

              <div
                role="group"
                aria-label="Choose a studio category"
                className="pointer-events-auto hidden flex-col gap-2 lg:flex"
              >
                {slides.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = index === active;

                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => api?.scrollTo(index)}
                      aria-pressed={isActive}
                      className={cn(
                        "group flex items-center gap-4 rounded-2xl border p-4 text-left backdrop-blur-md transition-all duration-300",
                        isActive
                          ? "border-foreground/25 bg-background/45 shadow-xl shadow-background/20"
                          : "border-foreground/10 bg-background/20 hover:border-foreground/20 hover:bg-background/35",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-11 shrink-0 items-center justify-center rounded-xl border transition-colors",
                          isActive
                            ? "border-primary/40 bg-primary/15 text-primary"
                            : "border-foreground/10 bg-foreground/5 text-foreground/60 group-hover:text-foreground",
                        )}
                      >
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-heading text-sm font-bold text-foreground">
                          {item.eyebrow}
                        </span>
                        <span className="mt-1 block text-xs text-foreground/50">
                          {String(index + 1).padStart(2, "0")} /{" "}
                          {String(slides.length).padStart(2, "0")}
                        </span>
                      </span>
                      {isActive && (
                        <span className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_hsl(var(--accent)/0.8)]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-auto absolute right-5 bottom-6 left-5 z-20 flex items-center justify-between lg:hidden">
          <div
            role="group"
            aria-label="Choose a studio category"
            className="flex gap-2"
          >
            {slides.map((item, index) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`Show ${item.eyebrow}`}
                  aria-pressed={index === active}
                  className={cn(
                    "flex size-10 items-center justify-center rounded-xl border backdrop-blur-md transition-colors",
                    index === active
                      ? "border-primary/50 bg-primary/15 text-primary"
                      : "border-foreground/15 bg-background/30 text-foreground/65 hover:text-foreground",
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </button>
              );
            })}
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => api?.scrollPrev()}
              aria-label="Previous studio category"
              className="size-10 rounded-xl border-foreground/20 bg-background/30 text-foreground hover:bg-foreground/10 hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => api?.scrollNext()}
              aria-label="Next studio category"
              className="size-10 rounded-xl border-foreground/20 bg-background/30 text-foreground hover:bg-foreground/10 hover:text-foreground"
            >
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
