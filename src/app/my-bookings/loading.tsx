import { CalendarDays } from "lucide-react";

function BookingCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="group overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-background/10"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-muted sm:aspect-auto sm:min-h-52 sm:w-44">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-primary/10 via-muted to-accent/10" />
          <CalendarDays className="absolute left-1/2 top-1/2 size-9 -translate-x-1/2 -translate-y-1/2 text-primary/20" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-5 p-5">
          <div className="space-y-3">
            <div className="h-5 w-3/4 animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-1/2 animate-pulse rounded-md bg-muted" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="h-14 animate-pulse rounded-xl border border-border bg-background/70" />
            <div className="h-14 animate-pulse rounded-xl border border-border bg-background/70" />
          </div>
          <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
            <div className="h-5 w-20 animate-pulse rounded-md bg-muted" />
            <div className="h-9 w-24 animate-pulse rounded-lg bg-primary/10" />
          </div>
        </div>
      </div>
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
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-card/80 px-3 py-1 font-mono text-xs font-semibold tracking-[0.14em] text-accent">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            YOUR CREATIVE SCHEDULE
          </div>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            My <span className="text-primary">bookings</span>
          </h1>
          <p
            role="status"
            className="mt-3 flex items-center gap-2 text-base text-muted-foreground"
          >
            <span className="size-1.5 animate-pulse rounded-full bg-primary" />
            Gathering your upcoming sessions...
          </p>
        </header>

        <div className="grid gap-5 lg:grid-cols-2">
          <BookingCardSkeleton />
          <BookingCardSkeleton />
        </div>
      </div>
    </section>
  );
}
