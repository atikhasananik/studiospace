export default function DashboardLoading() {
  return (
    <section
      className="relative flex-1 overflow-hidden bg-background pb-16 pt-28 md:pb-20 md:pt-32"
      aria-busy="true"
      aria-label="Loading dashboard"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_50%_0%,hsl(var(--primary)/0.08),transparent_68%)]"
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 space-y-4 border-b border-border pb-8">
          <div className="h-6 w-40 animate-pulse rounded-full bg-accent/10" />
          <div className="h-11 w-2/3 max-w-lg animate-pulse rounded-lg bg-muted" />
          <div className="h-4 w-full max-w-xl animate-pulse rounded bg-muted" />
        </header>

        <div className="mb-8 flex flex-col gap-5 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:p-6">
          <div className="size-16 animate-pulse rounded-full bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-5 w-44 animate-pulse rounded bg-muted" />
            <div className="h-4 w-56 animate-pulse rounded bg-muted" />
          </div>
          <div className="flex gap-2">
            <div className="h-9 w-28 animate-pulse rounded-lg bg-muted" />
            <div className="h-9 w-32 animate-pulse rounded-lg bg-primary/15" />
          </div>
        </div>

        <div className="mb-4 space-y-2">
          <div className="h-3 w-28 animate-pulse rounded bg-primary/15" />
          <div className="h-6 w-36 animate-pulse rounded bg-muted" />
        </div>
        <div className="mb-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[0, 1, 2, 3].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="h-4 w-28 animate-pulse rounded bg-muted" />
                  <div className="h-9 w-16 animate-pulse rounded bg-muted" />
                </div>
                <div className="size-11 animate-pulse rounded-xl bg-primary/5" />
              </div>
              <div className="mt-4 h-3 w-40 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>

        <div className="mb-4 space-y-2">
          <div className="h-3 w-28 animate-pulse rounded bg-primary/15" />
          <div className="h-6 w-48 animate-pulse rounded bg-muted" />
        </div>
        <div className="mb-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[0, 1, 2, 3].map((item) => (
            <div
              key={item}
              className="min-h-36 animate-pulse rounded-2xl border border-border bg-card p-5"
            >
              <div className="size-10 rounded-xl bg-accent/5" />
              <div className="mt-6 h-4 w-32 rounded bg-muted" />
              <div className="mt-2 h-3 w-full max-w-48 rounded bg-muted" />
            </div>
          ))}
        </div>

        <div className="mb-5 space-y-2">
          <div className="h-3 w-32 animate-pulse rounded bg-primary/15" />
          <div className="h-6 w-40 animate-pulse rounded bg-muted" />
        </div>
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="grid gap-5 border-b border-border p-5 last:border-0 sm:p-6 lg:grid-cols-[1.3fr_1fr_auto]"
            >
              <div className="space-y-3">
                <div className="h-4 w-40 animate-pulse rounded bg-muted" />
                <div className="h-3 w-32 animate-pulse rounded bg-muted" />
                <div className="h-3 w-48 animate-pulse rounded bg-muted" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="h-16 animate-pulse rounded-xl bg-muted/60" />
                <div className="h-16 animate-pulse rounded-xl bg-muted/60" />
              </div>
              <div className="h-9 w-28 animate-pulse rounded-lg bg-primary/10" />
            </div>
          ))}
        </div>
        <p role="status" className="sr-only">
          Loading your dashboard...
        </p>
      </div>
    </section>
  );
}
