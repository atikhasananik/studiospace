"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  X,
} from "lucide-react";

import type { Booking, BookingStatus } from "@/components/type/booking.type";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const statusStyles: Record<BookingStatus, string> = {
  Pending: "border-primary/30 bg-primary/10 text-primary",
  Confirmed: "border-accent/30 bg-accent/10 text-accent",
  Completed: "border-border bg-muted text-muted-foreground",
  Cancelled: "border-destructive/25 bg-destructive/5 text-destructive",
};

function formatBookingDate(startAt: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(startAt));
}

export function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadBookings = async () => {
      setIsLoading(true);
      setLoadError("");

      try {
        const response = await fetch("/api/bookings", {
          cache: "no-store",
          signal: controller.signal,
        });
        const result: Booking[] | { error?: string } = await response.json();

        if (!response.ok || !Array.isArray(result)) {
          throw new Error(
            !Array.isArray(result) && result.error
              ? result.error
              : "Unable to load your bookings.",
          );
        }

        setBookings(result);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setLoadError(
          error instanceof Error
            ? error.message
            : "Unable to load your bookings.",
        );
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    void loadBookings();
    return () => controller.abort();
  }, []);

  const cancelBooking = async () => {
    if (!bookingToCancel) return;
    setIsCancelling(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: bookingToCancel._id,
          action: "cancel",
        }),
      });
      const result: { error?: string } = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to cancel this booking.");
      }

      setBookings((current) =>
        current.map((booking) =>
          booking._id === bookingToCancel._id
            ? { ...booking, status: "Cancelled" }
            : booking,
        ),
      );
      setBookingToCancel(null);
      toast.add({
        title: "Booking cancelled",
        description: "Your booking request has been cancelled.",
        type: "success",
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to cancel this booking.";
      toast.add({
        title: "Booking cancellation failed",
        description: message,
        type: "error",
      });
      setLoadError(message);
    } finally {
      setIsCancelling(false);
    }
  };

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

        {loadError && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
          >
            {loadError}
          </div>
        )}

        {isLoading ? (
          <div className="grid gap-5 md:grid-cols-2">
            {[0, 1].map((item) => (
              <div
                key={item}
                className="h-52 animate-pulse rounded-2xl border border-border bg-card"
              />
            ))}
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
          <div className="grid items-stretch gap-5 lg:grid-cols-2">
            {bookings.map((booking) => (
              <article
                key={booking._id}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-background/10 transition-all duration-300 hover:border-primary/30"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-muted sm:aspect-auto sm:w-44">
                    {booking.studioImageUrl ? (
                      <Image
                        src={booking.studioImageUrl}
                        alt={booking.studioTitle}
                        fill
                        sizes="(max-width: 640px) 100vw, 176px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex size-full min-h-32 items-center justify-center bg-[radial-gradient(ellipse_at_50%_50%,hsl(var(--primary)/0.1),transparent_70%)] text-primary/50">
                        <CalendarDays className="size-9" aria-hidden="true" />
                      </div>
                    )}
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="line-clamp-1 font-heading text-lg font-bold text-foreground">
                          {booking.studioTitle}
                        </h2>
                        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                          <MapPin
                            className="size-3.5 shrink-0 text-primary"
                            aria-hidden="true"
                          />
                          <span className="truncate">
                            {booking.studioLocation}
                          </span>
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={statusStyles[booking.status]}
                      >
                        <span
                          aria-hidden="true"
                          className="size-1.5 rounded-full bg-current"
                        />
                        {booking.status}
                      </Badge>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                      <p className="flex items-start gap-2 text-muted-foreground">
                        <CalendarDays
                          className="mt-0.5 size-4 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span>{formatBookingDate(booking.startAt)}</span>
                      </p>
                      <p className="flex items-center gap-2 text-muted-foreground">
                        <Clock3
                          className="size-4 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        {booking.durationHours}{" "}
                        {booking.durationHours === 1 ? "hour" : "hours"}
                      </p>
                      <p className="flex items-center gap-2 text-muted-foreground">
                        <Users
                          className="size-4 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        {booking.guestCount}{" "}
                        {booking.guestCount === 1 ? "guest" : "guests"}
                      </p>
                      <p className="text-right font-heading text-base font-bold text-primary">
                        ${booking.totalPrice}
                      </p>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
                      <p className="text-xs text-muted-foreground">
                        Requested{" "}
                        {new Intl.DateTimeFormat(undefined, {
                          dateStyle: "medium",
                        }).format(new Date(booking.createdAt))}
                      </p>
                      {booking.status === "Pending" && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setBookingToCancel(booking)}
                          className="h-9 gap-2 border-destructive/25 px-3 text-xs text-destructive hover:border-destructive/40 hover:bg-destructive/5 hover:text-destructive"
                        >
                          <X aria-hidden="true" />
                          Cancel booking
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <AlertDialog
        open={bookingToCancel !== null}
        onOpenChange={(open) => {
          if (!open && !isCancelling) setBookingToCancel(null);
        }}
      >
        <AlertDialogContent className="border border-border bg-card sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive">
              <X aria-hidden="true" />
            </AlertDialogMedia>
            <AlertDialogTitle className="font-heading text-xl font-bold">
              Cancel this booking?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your pending reservation for{" "}
              <span className="font-semibold text-foreground">
                {bookingToCancel?.studioTitle}
              </span>{" "}
              will be marked as cancelled.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="border-border">
            <AlertDialogCancel disabled={isCancelling}>
              Keep booking
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault();
                void cancelBooking();
              }}
              disabled={isCancelling}
              className="gap-2 bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              <X aria-hidden="true" />
              {isCancelling ? "Cancelling..." : "Cancel booking"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </section>
  );
}
