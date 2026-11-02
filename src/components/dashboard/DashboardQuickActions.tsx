import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  Compass,
  Plus,
  Store,
} from "lucide-react";

const actions = [
  {
    href: "/add-studio",
    label: "List a studio",
    detail: "Put your creative space in front of new people.",
    icon: Plus,
    tone: "text-primary bg-primary/10",
  },
  {
    href: "/my-listings",
    label: "Manage listings",
    detail: "Update details, pricing, and amenities.",
    icon: Store,
    tone: "text-accent bg-accent/10",
  },
  {
    href: "/my-bookings",
    label: "View bookings",
    detail: "Keep track of your upcoming sessions.",
    icon: CalendarDays,
    tone: "text-primary bg-primary/10",
  },
  {
    href: "/studios",
    label: "Explore studios",
    detail: "Find a space for your next creative project.",
    icon: Compass,
    tone: "text-accent bg-accent/10",
  },
];

export function DashboardQuickActions() {
  return (
    <section aria-labelledby="dashboard-actions-heading" className="mb-10">
      <div className="mb-4">
        <p className="font-mono text-[10px] font-semibold tracking-[0.18em] text-primary">
          02 / SHORTCUTS
        </p>
        <h2
          id="dashboard-actions-heading"
          className="mt-1 font-heading text-xl font-bold text-foreground"
        >
          Pick up where you left off
        </h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map(({ href, label, detail, icon: Icon, tone }) => (
          <Link
            key={href}
            href={href}
            className="group flex min-h-36 flex-col rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-lg hover:shadow-background/10 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <div className="flex items-start justify-between gap-3">
              <span
                className={`flex size-10 items-center justify-center rounded-xl border border-border ${tone}`}
              >
                <Icon className="size-4.5" aria-hidden="true" />
              </span>
              <ArrowUpRight
                className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                aria-hidden="true"
              />
            </div>
            <div className="mt-auto pt-5">
              <h3 className="font-heading text-base font-bold text-foreground">
                {label}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {detail}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
