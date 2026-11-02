"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, X } from "lucide-react";

import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
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
import { updatebookingstatus } from "../data/updateData";
import type { BookingStatus } from "../type/booking.type";
import { authClient } from "@/lib/auth-client";

type BookingCancelBtnProps = {
  bookingId: string;
  studioTitle: string;
  bookingStatus: BookingStatus;
};

export default function BookingCancelBtn({
  bookingId,
  studioTitle,
  bookingStatus,
}: BookingCancelBtnProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const cancelBooking = async () => {
    if (bookingStatus !== "Pending") {
      toast.add({
        title: "Booking cannot be cancelled",
        description: "Only pending booking requests can be cancelled.",
        type: "error",
      });
      return;
    }

    setIsCancelling(true);

    try {
      const {data,error} = await authClient.token()
      const token = data?.token as string
      const response = await updatebookingstatus(bookingId, "cancelled",token);

      if (response === false || response.modifiedCount === 0) {
        toast.add({
          title: "Cancellation failed",
          description: "Unable to cancel this booking. Please try again.",
          type: "error",
        });
        return;
      }

      setIsOpen(false);
      toast.add({
        title: "Booking cancelled",
        description: `Your request for ${studioTitle} has been cancelled.`,
        type: "success",
      });
      router.refresh();
    } catch (error) {
      toast.add({
        title: "Cancellation failed",
        description:
          error instanceof Error
            ? error.message
            : "Unable to cancel this booking. Please try again.",
        type: "error",
      });
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="h-9 gap-2 border-destructive/25 px-3 text-xs text-destructive hover:border-destructive/40 hover:bg-destructive/5 hover:text-destructive"
      >
        <X aria-hidden="true" />
        Cancel
      </Button>

      <AlertDialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!isCancelling) setIsOpen(open);
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
              Your pending request for{" "}
              <span className="font-semibold text-foreground">
                {studioTitle}
              </span>{" "}
              will be cancelled.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="border-border">
            <AlertDialogCancel disabled={isCancelling}>
              Keep booking
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={cancelBooking}
              disabled={isCancelling}
              className="gap-2 bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isCancelling ? (
                <LoaderCircle className="animate-spin" aria-hidden="true" />
              ) : (
                <X aria-hidden="true" />
              )}
              {isCancelling ? "Cancelling..." : "Cancel booking"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
