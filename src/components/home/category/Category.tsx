import Link from "next/link";
import {
  Aperture,
  ArrowUpRight,
  Clapperboard,
  Headphones,
  Mic,
  Palette,
  type LucideIcon,
} from "lucide-react";

import { getTopRatedData } from "@/components/data/getData";

type CategoryItem = {
  index: string;
  name: string;
  icon: LucideIcon;
  /** `?category=` value carried to /studios */
  param: string;
  /** Backend category values this tile maps to (for live counts) */
  matches: string[];
};

/** Curated browse taxonomy — labels are the product-facing names, `matches`
    maps them to the backend's actual `category` values for live counts. */
const CATEGORIES: CategoryItem[] = [
  {
    index: "01",
    name: "Photo Studios",
    icon: Aperture,
    param: "Photo Studios",
    matches: ["Photo Studio"],
  },
  {
    index: "02",
    name: "Sound Stages",
    icon: Clapperboard,
    param: "Sound Stages",
    matches: ["Film Stage"],
  },
  {
    index: "03",
    name: "Podcast Rooms",
    icon: Mic,
    param: "Podcast Rooms",
    matches: ["Podcast Room", "Podcast Suite"],
  },
  {
    index: "04",
    name: "Music Suites",
    icon: Headphones,
    param: "Music Suites",
    matches: ["Music Suite"],
  },
  {
    index: "05",
    name: "Art Workshops",
    icon: Palette,
    param: "Art Workshops",
    matches: ["Art Workshop"],
  },
];

const Category = async () => {
  const studios = await getTopRatedData();

  // Backend down → hide quietly, same contract as FeaturedSection
  if (!studios) return null;

  const countFor = (category: CategoryItem) =>
    studios.filter((s) => category.matches.includes(s.category)).length;

  return (
    <section
      aria-labelledby="browse-categories-heading"
      className="bg-background py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Header — centered, echoes the hero/featured rhythm ────── */}
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-card/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent backdrop-blur-md">
            <span className="relative flex size-1.5" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
            </span>
            Find Your Space
          </span>

          <h2
            id="browse-categories-heading"
            className="mt-5 font-heading text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl"
          >
            Browse by <span className="text-primary">Studio Categories</span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-balance md:text-lg">
            Five ways to explore StudioSpace — pick a discipline and we&apos;ll
            take you straight to it.
          </p>
        </div>

        {/* ── Minimal index tiles ───────────────────────────────────── */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:last:col-span-2 lg:grid-cols-5 lg:last:col-span-1">
          {CATEGORIES.map((category) => {
            const count = countFor(category);
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                href={`/studios?category=${encodeURIComponent(category.param)}`}
                className="group flex flex-col gap-6 rounded-xl border border-border bg-transparent p-6 shadow-sm transition-all duration-300 hover:border-primary/40 hover:bg-card hover:shadow-lg hover:shadow-primary/10 hover:ring-1 hover:ring-primary/30"
              >
                {/* Index + arrow */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-medium tracking-widest text-muted-foreground/70">
                    {category.index}
                  </span>
                  <ArrowUpRight
                    className="size-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                    aria-hidden="true"
                  />
                </div>

                {/* Hairline icon puck */}
                <span className="inline-flex size-11 items-center justify-center rounded-lg border border-border bg-card text-primary transition-colors duration-300 group-hover:border-primary/40 group-hover:bg-primary/10">
                  <Icon className="size-5" aria-hidden="true" />
                </span>

                {/* Label + live count */}
                <div className="space-y-1">
                  <span className="block font-heading text-lg font-bold tracking-tight text-foreground">
                    {category.name}
                  </span>
                  <span className="block text-sm text-muted-foreground">
                    {count > 0
                      ? `${count} ${count === 1 ? "studio" : "studios"}`
                      : "Coming soon"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Category;
