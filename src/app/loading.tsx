import { Aperture, AudioLines, Clapperboard, Mic } from "lucide-react";

const loadingCards = [
  { icon: Aperture, label: "STUDIO" },
  { icon: Clapperboard, label: "PRODUCTION" },
  { icon: Mic, label: "AUDIO" },
  { icon: AudioLines, label: "CREATIVE" },
];

export default function Loading() {
  return (
    <section
      className="relative isolate flex min-h-[calc(100svh-4rem)] flex-1 items-center overflow-hidden bg-background py-20 md:min-h-[calc(100svh-5rem)]"
      aria-busy="true"
      aria-label="Loading StudioSpace"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-56 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-72 -right-36 size-[32rem] rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.18)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.18)_1px,transparent_1px)] bg-[size:56px_56px] opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="relative mx-auto flex size-20 items-center justify-center">
            <span className="absolute inset-0 animate-ping rounded-[1.75rem] border border-primary/20 motion-reduce:animate-none" />
            <span className="absolute inset-2 rounded-2xl border border-accent/25 bg-accent/5" />
            <Aperture
              className="relative size-9 animate-spin text-primary motion-reduce:animate-none"
              strokeWidth={1.4}
              aria-hidden="true"
            />
          </div>

          <p className="mt-7 font-mono text-[10px] font-semibold tracking-[0.24em] text-accent sm:text-xs">
            STUDIOSPACE / CREATOR WORKSPACE
          </p>
          <h1 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Setting the <span className="text-primary">scene</span>
          </h1>
          <p
            role="status"
            className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            Preparing your creative space. This should only take a moment.
          </p>

          <div
            aria-hidden="true"
            className="mx-auto mt-8 h-1 w-48 overflow-hidden rounded-full bg-muted"
          >
            <span className="block h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-primary to-accent motion-reduce:animate-none" />
          </div>
        </div>

        <div
          aria-hidden="true"
          className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-4 sm:gap-4"
        >
          {loadingCards.map(({ icon: Icon, label }, index) => (
            <div
              key={label}
              className="animate-pulse rounded-2xl border border-border/80 bg-card/70 p-4 backdrop-blur-sm sm:p-5"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-xl border border-primary/15 bg-primary/5 text-primary/50">
                  <Icon className="size-4.5" strokeWidth={1.5} />
                </span>
                <span className="font-mono text-[9px] tracking-[0.16em] text-muted-foreground/50">
                  0{index + 1}
                </span>
              </div>
              <div className="mt-5 h-2 w-16 rounded-full bg-muted-foreground/15" />
              <p className="mt-2 font-mono text-[9px] tracking-[0.15em] text-muted-foreground/40">
                {label}
              </p>
            </div>
          ))}
        </div>

        <p className="sr-only">Loading page content...</p>
      </div>
    </section>
  );
}
