import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  Inbox,
  MapPin,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { DashboardOrder } from "./dashboard-data";
import { IncomingOrderActions } from "./IncomingOrderActions";

type IncomingOrdersProps = {
  orders: DashboardOrder[];
  pendingCount: number | null;
  loadError?: string;
};

const statusClassNames = {
  Pending: "border-primary/30 bg-primary/10 text-primary",
  Confirmed: "border-accent/30 bg-accent/10 text-accent",
  Completed: "border-border bg-muted text-muted-foreground",
  Cancelled: "border-destructive/25 bg-destructive/5 text-destructive",
} as const;

function formatSession(value: string | null, duration: number | null) {
  if (!value) return "Session time unavailable";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Session time unavailable";

  const formattedDate = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
  return duration === null
    ? formattedDate
    : `${formattedDate} · ${duration} ${duration === 1 ? "hour" : "hours"}`;
}

function formatPrice(value: number | null) {
  if (value === null) return "—";
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

export function IncomingOrders({
  orders,
  pendingCount,
  loadError,
}: IncomingOrdersProps) {

  console.log(orders)
  return (
    <section
      aria-labelledby="incoming-orders-heading"
      className="mb-12 scroll-mt-24"
    >
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="w-full font-mono text-[10px] font-semibold tracking-[0.18em] text-primary">
              03 / HOST ACTIVITY
            </p>
            <h2
              id="incoming-orders-heading"
              className="font-heading text-xl font-bold text-foreground"
            >
              Incoming orders
            </h2>
            {pendingCount !== null && (
              <Badge
                variant="outline"
                className="border-primary/25 bg-primary/5 text-primary"
              >
                {pendingCount} pending
              </Badge>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Review requests, confirm sessions, and track completed bookings.
          </p>
        </div>
        <span className="font-mono text-xs tracking-wider text-muted-foreground">
          HOST / ORDERS
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-background/10">
        {loadError ? (
          <div
            role="alert"
            className="px-6 py-12 text-center text-sm text-destructive"
          >
            {loadError}
          </div>
        ) : orders.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center">
            <span className="flex size-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/5 text-accent">
              <Inbox className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-heading text-base font-bold text-foreground">
              Your order desk is clear
            </h3>
            <p className="mt-1 max-w-md text-sm leading-relaxed text-muted-foreground">
              New requests for your listed studios will show up here when
              creators book a session.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {orders.map((order) => (
              <li
                key={order.id}
                className="grid gap-5 p-5 transition-colors hover:bg-muted/20 sm:p-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_auto] lg:items-center"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="max-w-full truncate font-heading text-base font-bold text-foreground">
                      {order.studioTitle}
                    </h3>
                    <Badge
                      variant="outline"
                      className={statusClassNames[order.status]}
                    >
                      <span
                        aria-hidden="true"
                        className="size-1.5 rounded-full bg-current"
                      />
                      {order.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-foreground">
                    {order.creator}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {order.creatorEmail || "Creator contact unavailable"}
                  </p>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin
                      className="size-3.5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span className="truncate">
                      {order.studioLocation || "Location unavailable"}
                    </span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs sm:max-w-sm">
                  <div className="rounded-xl border border-border bg-background/70 p-3">
                    <p className="flex items-center gap-1.5 text-muted-foreground">
                      <CalendarDays
                        className="size-3.5 text-primary"
                        aria-hidden="true"
                      />
                      Session
                    </p>
                    <p className="mt-1.5 font-medium leading-relaxed text-foreground">
                      {formatSession(order.startAt, order.durationHours)}
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-background/70 p-3">
                    <p className="flex items-center gap-1.5 text-muted-foreground">
                      <Users
                        className="size-3.5 text-primary"
                        aria-hidden="true"
                      />
                      Guests / total
                    </p>
                    <p className="mt-1.5 font-medium text-foreground">
                      {order.guestCount ?? "—"} guests
                      <span className="mx-1.5 text-border">·</span>
                      {formatPrice(order.totalPrice)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 lg:flex-col lg:items-end">
                  <IncomingOrderActions
                    bookingId={order.id}
                    studioTitle={order.studioTitle}
                    status={order.status}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
        {!loadError && orders.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-border bg-muted/20 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-xs text-muted-foreground">
              {orders.length} active{" "}
              {orders.length === 1 ? "order" : "orders"} in your host workspace
            </p>
            <Button
              nativeButton={false}
              render={<Link href="/my-listings" />}
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5 self-start px-2 text-primary hover:text-primary sm:self-auto"
            >
              Manage studio listings
              <ArrowUpRight aria-hidden="true" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
