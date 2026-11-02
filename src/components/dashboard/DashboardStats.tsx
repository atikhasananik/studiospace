import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Store,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { DashboardData } from "./dashboard-data";

type DashboardStatsProps = Pick<
  DashboardData,
  | "listingCount"
  | "bookingCount"
  | "pendingOrderCount"
  | "confirmedOrderCount"
>;

const cards = [
  {
    key: "listingCount",
    label: "Your studios",
    detail: "Spaces currently in your portfolio",
    icon: Store,
    tone: "text-primary bg-primary/10",
  },
  {
    key: "bookingCount",
    label: "Your bookings",
    detail: "Reservations you have requested",
    icon: CalendarDays,
    tone: "text-accent bg-accent/10",
  },
  {
    key: "pendingOrderCount",
    label: "Needs your attention",
    detail: "Incoming requests awaiting review",
    icon: Clock3,
    tone: "text-primary bg-primary/10",
  },
  {
    key: "confirmedOrderCount",
    label: "Confirmed orders",
    detail: "Bookings approved by you",
    icon: CheckCircle2,
    tone: "text-accent bg-accent/10",
  },
] as const;

export function DashboardStats(props: DashboardStatsProps) {
  return (
    <section aria-labelledby="dashboard-overview-heading" className="mb-10">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] font-semibold tracking-[0.18em] text-primary">
            01 / OVERVIEW
          </p>
          <h2
            id="dashboard-overview-heading"
            className="mt-1 font-heading text-xl font-bold text-foreground"
          >
            Your activity
          </h2>
        </div>
        <span className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:inline-flex">
          Snapshot <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ key, label, detail, icon: Icon, tone }, index) => {
          const value = props[key];
          return (
            <Card
              key={key}
              className="group relative border border-border bg-card transition-colors duration-200 hover:border-primary/30"
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-muted-foreground">
                      {label}
                    </p>
                    <p className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground">
                      {value ?? "—"}
                    </p>
                  </div>
                  <span
                    className={`flex size-11 shrink-0 items-center justify-center rounded-xl border border-border ${tone}`}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                  <p className="text-xs text-muted-foreground">{detail}</p>
                  <span className="font-mono text-[10px] text-muted-foreground/60">
                    0{index + 1}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
