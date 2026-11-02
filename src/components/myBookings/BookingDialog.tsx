"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Check, Clock3, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import type { IStudio } from "@/components/type/studio.type";
import { authClient, useSession } from "@/lib/auth-client";
import { postBookingData } from "../data/postData";
import type { IBookingData } from "../type/booking.type";

function isBookingAcknowledged(response: unknown): boolean {
  return (
    typeof response === "object" &&
    response !== null &&
    "acknowledged" in response &&
    response.acknowledged === true
  );
}

function getBookingResponseMessage(response: unknown): string | undefined {
  if (typeof response !== "object" || response === null) return;

  if ("mes" in response && typeof response.mes === "string") {
    return response.mes;
  }

  if ("error" in response && typeof response.error === "string") {
    return response.error;
  }
}

export function BookingDialog({ studio }: { studio: IStudio }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [startAt, setStartAt] = useState("");
  const [minimumDateTime, setMinimumDateTime] = useState("");
  const [durationHours, setDurationHours] = useState(2);
  const [guestCount, setGuestCount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const { data: session, isPending } = useSession();

  const total = studio.hourlyRate * durationHours;

  const submitBooking = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setIsShaking(false);
    setIsSubmitting(true);
    
    const {data, error} = await authClient.token()
    const token = data?.token as string

    const bookedby = session?.user.email ?? "";

    const bookingData = {
      studio,
      bookedby,
      startAt: new Date(startAt),
      endAt: new Date(
        new Date(startAt).getTime() + durationHours * 60 * 60 * 1000,
      ),
      durationHours,
      guestCount,
      status: "pending",
    } as IBookingData;

    try {
      const response= await postBookingData(bookedby, bookingData,token);

      if (!isBookingAcknowledged(response)) {
        setErrorMessage(
          getBookingResponseMessage(response) ??
            response.mes,
        );
        setIsShaking(true);
        window.setTimeout(() => setIsShaking(false), 500);
        return;
      }

      setBookingConfirmed(true);
      toast.add({
        title: "Booking request sent",
        description: "The host will review your request.",
        type: "success",
      });

      await new Promise<void>((resolve) => window.setTimeout(resolve, 1200));
      setOpen(false);
      router.push("/my-bookings");
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to reach the booking service. Please try again.",
      );
      setIsShaking(true);
      window.setTimeout(() => setIsShaking(false), 500);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalBtn = () => {
    if (isPending) return;

    if (!session?.user) {
      const callbackURL = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      router.push(`/login?callbackURL=${encodeURIComponent(callbackURL)}`);
      return;
    }

    setOpen(true);
  };

  return (
    <>
      <Button
        type="button"
        onClick={() => {
          setMinimumDateTime(
            new Date(Date.now() - new Date().getTimezoneOffset() * 60_000)
              .toISOString()
              .slice(0, 16),
          );
          handleModalBtn();
        }}
        className="mt-5 h-11 w-full rounded-lg bg-primary text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-all hover:bg-primary/90 hover:shadow-primary/25"
      >
        <CalendarDays aria-hidden="true" />
        Book Now
      </Button>

      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          if (isSubmitting && !nextOpen) return;
          setOpen(nextOpen);
          if (nextOpen) {
            setBookingConfirmed(false);
          } else {
            setErrorMessage("");
          }
        }}
      >
        <DialogContent
          className={`gap-0 border border-border bg-card sm:max-w-lg ${
            isShaking
              ? "motion-safe:animate-[booking-shake_450ms_ease-in-out]"
              : ""
          }`}
        >
          <DialogHeader className="border-b border-border p-6">
            <p className="font-mono text-xs font-semibold tracking-[0.18em] text-primary">
              RESERVATION / REQUEST
            </p>
            <DialogTitle className="mt-2 font-heading text-2xl font-bold">
              Book {studio.title}
            </DialogTitle>
            <DialogDescription>
              Choose a time for your session. Your request will be sent to the
              host as pending.
            </DialogDescription>
          </DialogHeader>

          {bookingConfirmed ? (
            <div
              className="flex flex-col items-center gap-3 px-6 py-12 text-center"
              role="status"
              aria-live="polite"
            >
              <span className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check
                  className="size-8 motion-safe:animate-[booking-success_700ms_ease-out_both]"
                  aria-hidden="true"
                />
              </span>
              <p className="font-heading text-xl font-bold">
                Booking request sent
              </p>
              <p className="text-sm text-muted-foreground">
                Taking you to your bookings...
              </p>
            </div>
          ) : (
            <form onSubmit={submitBooking}>
              <div className="grid gap-5 p-6 py-7">
                <div className="grid gap-2">
                  <Label htmlFor="booking-start">Date and start time</Label>
                  <div className="relative">
                    <CalendarDays
                      className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary"
                      aria-hidden="true"
                    />
                    <Input
                      id="booking-start"
                      type="datetime-local"
                      min={minimumDateTime}
                      value={startAt}
                      onChange={(event) => setStartAt(event.target.value)}
                      required
                      className="h-11 border-border bg-background pl-10"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="booking-duration">Duration</Label>
                    <div className="relative">
                      <Clock3
                        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary"
                        aria-hidden="true"
                      />
                      <select
                        id="booking-duration"
                        value={durationHours}
                        onChange={(event) =>
                          setDurationHours(Number(event.target.value))
                        }
                        className="h-11 w-full appearance-none rounded-lg border border-border bg-background pl-10 pr-3 text-sm text-foreground outline-none focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/20"
                      >
                        {[1, 2, 3, 4, 6, 8, 10, 12].map((hours) => (
                          <option key={hours} value={hours}>
                            {hours} {hours === 1 ? "hour" : "hours"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="booking-guests">Guests</Label>
                    <div className="relative">
                      <Users
                        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary"
                        aria-hidden="true"
                      />
                      <Input
                        id="booking-guests"
                        type="number"
                        min="1"
                        max={studio.maxCapacity}
                        value={guestCount}
                        onChange={(event) =>
                          setGuestCount(Number(event.target.value))
                        }
                        required
                        className="h-11 border-border bg-background pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Estimated total
                    </p>
                    <p className="mt-0.5 font-heading text-xl font-bold text-primary">
                      ${total}
                    </p>
                  </div>
                  <p className="text-right text-xs leading-relaxed text-muted-foreground">
                    ${studio.hourlyRate} / hour
                    <br />
                    Security deposit: ${studio.securityDeposit}
                  </p>
                </div>

                {errorMessage && (
                  <p role="alert" className="text-sm text-destructive">
                    {errorMessage}
                  </p>
                )}
              </div>

              <DialogFooter className="border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={isSubmitting}
                >
                  Not now
                </Button>
                <Button type="submit" className="gap-2" disabled={isSubmitting}>
                  <CalendarDays aria-hidden="true" />
                  {isSubmitting ? "Sending request..." : "Request booking"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
