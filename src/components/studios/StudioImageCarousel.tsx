"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const IMAGE_VIEWS = [
  { label: "Full view", transform: "scale(1)" },
  { label: "Closer view", transform: "scale(1.12) translate(-2%, 1%)" },
  { label: "Detail view", transform: "scale(1.25) translate(2%, -2%)" },
];

type StudioImageCarouselProps = {
  imageUrl: string;
  title: string;
};

export function StudioImageCarousel({
  imageUrl,
  title,
}: StudioImageCarouselProps) {
  const [activeView, setActiveView] = useState(0);
  const showView = (index: number) =>
    setActiveView((index + IMAGE_VIEWS.length) % IMAGE_VIEWS.length);

  return (
    <div
      role="region"
      aria-label={`${title} image viewer`}
      className="group/gallery relative aspect-[16/9] w-full overflow-hidden bg-muted"
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={title}
          fill
          priority
          sizes="(min-width:1024px) 64rem, 100vw"
          style={{ transform: IMAGE_VIEWS[activeView].transform }}
          className="object-cover transition-transform duration-700 ease-in-out motion-reduce:transition-none"
        />
      ) : (
        <div className="flex h-full items-center justify-center bg-gradient-to-br from-secondary to-background">
          <span className="font-heading text-4xl font-bold text-muted-foreground/50">
            StudioSpace
          </span>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/45 via-transparent to-transparent" />

      {imageUrl && (
        <>
          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            aria-label="Show previous image view"
            onClick={() => showView(activeView - 1)}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border-border bg-background/85 text-foreground opacity-100 shadow-lg backdrop-blur-md transition-opacity hover:border-primary hover:bg-background hover:text-primary sm:opacity-0 sm:group-hover/gallery:opacity-100"
          >
            <ChevronLeft aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            aria-label="Show next image view"
            onClick={() => showView(activeView + 1)}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border-border bg-background/85 text-foreground opacity-100 shadow-lg backdrop-blur-md transition-opacity hover:border-primary hover:bg-background hover:text-primary sm:opacity-0 sm:group-hover/gallery:opacity-100"
          >
            <ChevronRight aria-hidden="true" />
          </Button>
          <div className="absolute inset-x-0 bottom-4 z-10 flex flex-col items-center gap-2">
            <span
              aria-live="polite"
              className="rounded-full bg-background/75 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-md"
            >
              {IMAGE_VIEWS[activeView].label}
            </span>
            <div className="flex justify-center gap-2">
              {IMAGE_VIEWS.map((view, index) => (
              <button
                key={view.label}
                type="button"
                aria-label={`Show ${view.label.toLowerCase()}`}
                aria-pressed={activeView === index}
                onClick={() => showView(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeView === index
                    ? "w-7 bg-primary"
                    : "w-1.5 bg-foreground/60 hover:bg-foreground"
                }`}
              />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
