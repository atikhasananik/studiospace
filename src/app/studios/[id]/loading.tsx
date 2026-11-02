import { Aperture } from "lucide-react";

export default function StudioDetailsLoading() {
  return (
    <section
      className="relative flex-1 overflow-hidden bg-background py-15 md:py-20"
      aria-busy="true"
      aria-label="Loading studio details"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_50%_0%,hsl(var(--primary)/0.08),transparent_68%)]"
      />
      <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 h-9 w-28 animate-pulse rounded-lg bg-muted" />

        <article className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-muted">
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-primary/10 via-muted to-accent/10" />
            <Aperture
              className="relative size-12 text-primary/25"
              strokeWidth={1.25}
              aria-hidden="true"
            />
            <span className="absolute bottom-5 h-1.5 w-16 animate-pulse rounded-full bg-foreground/20" />
          </div>

          <div className="grid gap-8 p-6 md:grid-cols-[minmax(0,1fr)_16rem] md:p-9">
            <div className="space-y-7">
              <div className="space-y-4">
                <div className="h-6 w-24 animate-pulse rounded-full bg-primary/10" />
                <div className="h-9 w-4/5 animate-pulse rounded-lg bg-muted md:h-11" />
                <div className="flex flex-wrap gap-5">
                  <div className="h-4 w-36 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="h-5 w-40 animate-pulse rounded bg-muted" />
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                <div className="h-4 w-11/12 animate-pulse rounded bg-muted" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
              </div>

              <div className="space-y-3">
                <div className="h-5 w-28 animate-pulse rounded bg-muted" />
                <div className="flex flex-wrap gap-2">
                  <span className="h-7 w-20 animate-pulse rounded-full bg-muted" />
                  <span className="h-7 w-24 animate-pulse rounded-full bg-muted" />
                  <span className="h-7 w-16 animate-pulse rounded-full bg-muted" />
                </div>
              </div>
            </div>

            <aside className="h-fit rounded-xl border border-border bg-background p-5">
              <div className="h-4 w-20 animate-pulse rounded bg-muted" />
              <div className="mt-3 h-9 w-32 animate-pulse rounded bg-primary/15" />
              <div className="mt-5 space-y-4 border-t border-border pt-4">
                <div className="flex justify-between gap-4">
                  <div className="h-4 w-16 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                </div>
                <div className="flex justify-between gap-4">
                  <div className="h-4 w-28 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-16 animate-pulse rounded bg-muted" />
                </div>
              </div>
              <div className="mt-6 h-11 animate-pulse rounded-lg bg-primary/20" />
            </aside>
          </div>
        </article>
        <p role="status" className="sr-only">
          Loading studio details...
        </p>
      </div>
    </section>
  );
}
