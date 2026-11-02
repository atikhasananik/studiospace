import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";

import { getTopRatedData } from "@/components/data/getData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

/** Cyan pulse dot — brand "live" indicator (#00F2FE), matches the hero */
function LiveDot() {
  return (
    <span className="relative flex size-1.5" aria-hidden="true">
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
      <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
    </span>
  );
}

const FeaturedSection = async () => {
  const topStudios = await getTopRatedData();

  // Backend down / empty → hide the section quietly (page and build stay healthy)
  if (!topStudios?.length) return null;

  return (
    <section
      aria-labelledby="featured-studios-heading"
      className="bg-background py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Header — centered, echoes the hero's rhythm ────────────── */}
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-card/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent backdrop-blur-md">
            <LiveDot />
            Top Rated Studios
          </span>

          <h2
            id="featured-studios-heading"
            className="mt-5 font-heading text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl"
          >
            Top Rated <span className="text-primary">Studio Spaces</span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-balance md:text-lg">
            The highest-rated spaces on StudioSpace — verified reviews,
            pro-grade gear, and same-day availability.
          </p>
        </div>

        {/* ── Card grid ─────────────────────────────────────────────── */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topStudios.map((studio) => (
            <Card
              key={studio._id}
              className="scroll-reveal group h-full flex-col gap-0 overflow-hidden rounded-xl border border-border bg-card py-0 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:ring-primary/40"
            >
              {/* 16:10 image with hover zoom + live badge */}
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={studio.imageUrl}
                  alt={studio.title}
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <Badge
                  variant="outline"
                  className="absolute right-3 top-3 gap-1.5 border-accent/30 bg-background/80 text-accent backdrop-blur-md hover:bg-background/80"
                >
                  <LiveDot />
                  Live
                </Badge>
              </div>

              <CardContent className="flex-1 py-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {studio.category}
                  </span>
                  <span className="flex shrink-0 items-center gap-1.5 text-sm">
                    <Star
                      className="size-3.5 fill-amber-400 text-amber-400"
                      aria-hidden="true"
                    />
                    <span className="font-bold text-foreground">
                      {studio.rating}
                    </span>
                  </span>
                </div>

                <h3 className="mt-2 line-clamp-2 font-heading text-lg font-bold tracking-tight text-foreground md:text-xl">
                  {studio.title}
                </h3>

                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin
                    className="size-3.5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span className="truncate">{studio.location}</span>
                </p>
              </CardContent>

              {/* Price + CTA — sticky to the card bottom for equal heights */}
              <CardFooter className="gap-3 rounded-b-xl border-t bg-muted/50 p-4">
                <p className="min-w-0 flex-1 truncate text-sm">
                  <span className="font-heading text-xl font-bold text-primary">
                    ${studio.hourlyRate}
                  </span>{" "}
                  <span className="text-muted-foreground">/ hour</span>
                </p>
                <Button
                  nativeButton={false}
                  render={<Link href={`/studios/${studio._id}` }/>}
                  variant="outline"
                  className="shrink-0 rounded-lg border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
