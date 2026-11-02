import { Aperture } from "lucide-react";

function StudioCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-2xl border border-border bg-card"
    >
      <div className="relative aspect-[16/10] animate-pulse bg-muted">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <Aperture
          className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 text-primary/25"
          strokeWidth={1.5}
        />
        <span className="absolute right-4 top-4 h-6 w-20 rounded-full bg-background/70" />
      </div>
      <div className="space-y-4 p-5">
        <div className="h-3 w-1/4 animate-pulse rounded bg-primary/20" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
        <div className="flex items-center justify-between border-t border-border pt-4">
          <div className="h-5 w-20 animate-pulse rounded bg-muted" />
          <div className="h-9 w-24 animate-pulse rounded-lg bg-primary/15" />
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <section
      className="relative flex-1 overflow-hidden bg-background py-24 md:py-28"
      aria-busy="true"
      aria-label="Loading page"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_50%_0%,hsl(var(--primary)/0.08),transparent_68%)]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 border-b border-border pb-8">
          <p className="font-mono text-xs font-semibold tracking-[0.2em] text-primary">
            STUDIOSPACE
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Setting the <span className="text-primary">scene</span>
          </h1>
          <p
            role="status"
            className="mt-3 flex items-center gap-2 text-sm text-muted-foreground"
          >
            <span className="size-1.5 animate-pulse rounded-full bg-accent" />
            Loading your creative spaces...
          </p>
          <div
            aria-hidden="true"
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <span className="h-10 w-full animate-pulse rounded-xl border border-border bg-card sm:w-72" />
            <span className="h-10 w-32 animate-pulse rounded-xl border border-border bg-card" />
            <span className="h-10 w-28 animate-pulse rounded-xl border border-border bg-card" />
          </div>
        </header>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <StudioCardSkeleton />
          <StudioCardSkeleton />
          <StudioCardSkeleton />
        </div>
      </div>
    </section>
  );
}
