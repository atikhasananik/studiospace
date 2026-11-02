import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Users,
} from "lucide-react";

import type { BookingStatus } from "@/components/type/booking.type";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMyBookingsData } from "../data/getData";
import BookingCancelBtn from "./BookingCancelBtn";

const statusStyles: Record<BookingStatus, string> = {
  Pending: "border-primary/30 bg-primary/10 text-primary",
  Confirmed: "border-accent/30 bg-accent/10 text-accent",
  Completed: "border-border bg-muted text-muted-foreground",
  Cancelled: "border-destructive/25 bg-destructive/5 text-destructive",
};

type BookingRow = {
  _id: string;
  studioTitle?: string;
  studioLocation?: string;
  startAt?: string;
  durationHours?: number;
  guestCount?: number;
  totalPrice?: number;
  status: string;
};

function isBookingRow(value: unknown): value is BookingRow {
  if (typeof value !== "object" || value === null) return false;
  if (!("_id" in value) || typeof value._id !== "string") return false;
  if (!("status" in value) || typeof value.status !== "string") return false;

  return (
    (!("studioTitle" in value) || typeof value.studioTitle === "string") &&
    (!("studioLocation" in value) ||
      typeof value.studioLocation === "string") &&
    (!("startAt" in value) || typeof value.startAt === "string") &&
    (!("durationHours" in value) ||
      typeof value.durationHours === "number") &&
    (!("guestCount" in value) || typeof value.guestCount === "number") &&
    (!("totalPrice" in value) || typeof value.totalPrice === "number")
  );
}

function normalizeStatus(status: string): BookingStatus | null {
  switch (status.trim().toLowerCase()) {
    case "pending":
      return "Pending";
    case "confirmed":
      return "Confirmed";
    case "completed":
      return "Completed";
    case "cancelled":
    case "canceled":
      return "Cancelled";
    default:
      return null;
  }
}

function formatBookingDate(value?: string) {
  if (!value) return "Date unavailable";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function formatPrice(value?: number) {
  if (typeof value !== "number" || !Number.isFinite(value)) return "—";
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

export default async function MyBookings({ email }: { email: string }) {
  let bookings: BookingRow[] = [];
  let loadError = "";

  try {
    const response: unknown = await getMyBookingsData(email);
    if (!Array.isArray(response) || !response.every(isBookingRow)) {
      throw new Error("The booking service returned an unexpected response.");
    }
    bookings = response;
  } catch (error) {
    loadError =
      error instanceof Error
        ? error.message
        : "Unable to load your bookings. Please try again.";
  }

  const pendingCount = bookings.filter(
    (booking) => normalizeStatus(booking.status) === "Pending",
  ).length;

  return (
    <section className="relative flex-1 overflow-hidden bg-background py-28 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_50%_0%,hsl(var(--primary)/0.08),transparent_68%)]"
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10 border-b border-border pb-8">
          <Badge
            variant="outline"
            className="gap-2 border-accent/30 bg-card/80 px-3 py-1 text-accent"
          >
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-accent"
            />
            YOUR CREATIVE SCHEDULE
          </Badge>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            My <span className="text-primary">bookings</span>
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Keep every upcoming session and past studio reservation in one
            place.
          </p>
        </header>

        {loadError ? (
          <div
            role="alert"
            className="rounded-2xl border border-destructive/30 bg-destructive/5 px-6 py-12 text-center"
          >
            <h2 className="font-heading text-xl font-bold text-foreground">
              We couldn’t load your bookings
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{loadError}</p>
            <Button
              nativeButton={false}
              render={<Link href="/my-bookings" />}
              variant="outline"
              className="mt-6"
            >
              Try again
            </Button>
          </div>
        ) : bookings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 text-primary">
              <CalendarDays className="size-5" aria-hidden="true" />
            </span>
            <h2 className="mt-5 font-heading text-xl font-bold text-foreground">
              Your next session is waiting
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              You haven’t booked a studio yet. Find a space that fits your next
              creative project.
            </p>
            <Button
              nativeButton={false}
              render={<Link href="/studios" />}
              className="mt-6"
            >
              Explore studios
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground">
                  Booking overview
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {bookings.length}{" "}
                  {bookings.length === 1 ? "reservation" : "reservations"} in
                  your schedule
                </p>
              </div>
              <Badge
                variant="outline"
                className="border-primary/25 bg-primary/5 px-3 py-1 text-primary"
              >
                {pendingCount} pending
              </Badge>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-background/10">
              <Table>
                <caption className="sr-only">
                  Your studio booking requests and their current status
                </caption>
                <TableHeader className="bg-muted/50">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="pl-5">Studio</TableHead>
                    <TableHead>Session</TableHead>
                    <TableHead>Guests</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="pr-5 text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => {
                    const status = normalizeStatus(booking.status);

                    return (
                      <TableRow key={booking._id} className="group">
                        <TableCell className="min-w-52 py-4 pl-5">
                          <p className="max-w-56 truncate font-semibold text-foreground">
                            {booking.studioTitle || "Studio"}
                          </p>
                          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <MapPin
                              className="size-3.5 shrink-0 text-primary"
                              aria-hidden="true"
                            />
                            <span className="max-w-52 truncate">
                              {booking.studioLocation || "Location unavailable"}
                            </span>
                          </p>
                        </TableCell>
                        <TableCell className="min-w-48 py-4">
                          <p className="flex items-center gap-1.5 text-sm text-foreground">
                            <CalendarDays
                              className="size-3.5 shrink-0 text-primary"
                              aria-hidden="true"
                            />
                            {formatBookingDate(booking.startAt)}
                          </p>
                          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock3
                              className="size-3.5 shrink-0"
                              aria-hidden="true"
                            />
                            {booking.durationHours ?? "—"}{" "}
                            {booking.durationHours === 1 ? "hour" : "hours"}
                          </p>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Users
                              className="size-3.5 text-primary"
                              aria-hidden="true"
                            />
                            {booking.guestCount ?? "—"}
                          </span>
                        </TableCell>
                        <TableCell className="font-semibold text-foreground">
                          {formatPrice(booking.totalPrice)}
                        </TableCell>
                        <TableCell>
                          {status ? (
                            <Badge
                              variant="outline"
                              className={statusStyles[status]}
                            >
                              <span
                                aria-hidden="true"
                                className="size-1.5 rounded-full bg-current"
                              />
                              {status}
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="text-muted-foreground"
                            >
                              {booking.status || "Unknown"}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="pr-5 text-right">
                          {status === "Pending" ? (
                            <BookingCancelBtn
                              bookingId={booking._id}
                              studioTitle={booking.studioTitle || "this studio"}
                              bookingStatus={status}
                            />
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              —
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              You can cancel a pending request before it is reviewed by the
              host.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
