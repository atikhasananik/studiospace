import { MapPin } from "lucide-react";

function BookingRowSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="grid min-w-[760px] grid-cols-[minmax(190px,1.35fr)_minmax(185px,1.25fr)_minmax(80px,0.55fr)_minmax(85px,0.6fr)_minmax(105px,0.7fr)_minmax(110px,0.75fr)] items-center gap-4 border-b border-border px-5 py-5 last:border-b-0"
    >
      <div className="space-y-2">
        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        <div className="flex items-center gap-1.5">
          <MapPin className="size-3.5 text-primary/30" />
          <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
        <div className="h-3 w-2/5 animate-pulse rounded bg-muted" />
      </div>
      <div className="h-4 w-8 animate-pulse rounded bg-muted" />
      <div className="h-4 w-14 animate-pulse rounded bg-muted" />
      <div className="h-6 w-20 animate-pulse rounded-full bg-primary/10" />
      <div className="ml-auto h-9 w-20 animate-pulse rounded-lg bg-destructive/10" />
    </div>
  );
}

export default function MyBookingsLoading() {
  return (
    <section
      className="relative flex-1 overflow-hidden bg-background py-28 md:py-32"
      aria-busy="true"
      aria-label="Loading your bookings"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_50%_0%,hsl(var(--primary)/0.08),transparent_68%)]"
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10 border-b border-border pb-8">
          <div className="h-6 w-52 animate-pulse rounded-full bg-accent/10" />
          <div className="mt-4 h-11 w-64 animate-pulse rounded-lg bg-muted" />
          <div className="mt-3 h-4 w-full max-w-xl animate-pulse rounded bg-muted" />
        </header>

        <div className="mb-5 flex items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="h-6 w-40 animate-pulse rounded bg-muted" />
            <div className="h-4 w-52 animate-pulse rounded bg-muted" />
          </div>
          <div className="h-7 w-24 animate-pulse rounded-full border border-primary/15 bg-primary/5" />
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-background/10">
          <div
            aria-hidden="true"
            className="grid min-w-[760px] grid-cols-[minmax(190px,1.35fr)_minmax(185px,1.25fr)_minmax(80px,0.55fr)_minmax(85px,0.6fr)_minmax(105px,0.7fr)_minmax(110px,0.75fr)] items-center gap-4 border-b border-border bg-muted/50 px-5 py-3"
          >
            {[20, 18, 10, 10, 12, 12].map((width, index) => (
              <div
                key={index}
                className="h-3 animate-pulse rounded bg-muted-foreground/15"
                style={{ width: `${width * 4}px` }}
              />
            ))}
          </div>
          <div className="overflow-x-auto">
            <BookingRowSkeleton />
            <BookingRowSkeleton />
            <BookingRowSkeleton />
          </div>
        </div>
        <p role="status" className="sr-only">
          Loading your bookings...
        </p>
      </div>
    </section>
  );
}
