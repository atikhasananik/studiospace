"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, LoaderCircle, X } from "lucide-react";

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
import { toast } from "@/components/ui/toast";
import { updatebookingstatus } from "@/components/data/updateData";
import type { BookingStatus } from "@/components/type/booking.type";
import { authClient } from "@/lib/auth-client";

type IncomingOrderActionsProps = {
  bookingId: string;
  studioTitle: string;
  status: BookingStatus;
};

type OrderAction = "confirmed" | "completed" | "cancelled";

export function IncomingOrderActions({
  bookingId,
  studioTitle,
  status,
}: IncomingOrderActionsProps) {
  const router = useRouter();
  const [dialogAction, setDialogAction] = useState<OrderAction | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitStatus = async () => {
    if (!dialogAction || isSubmitting) return;
    setIsSubmitting(true);

    const {data,error} = await authClient.token()
    const token = data?.token as string

    try {
      const result = await updatebookingstatus(bookingId, dialogAction,token);
      if (result === false || result.modifiedCount === 0) {
        throw new Error("The booking status was not updated. Please try again.");
      }

      setDialogAction(null);
      toast.add({
        title:
          dialogAction === "confirmed"
            ? "Order confirmed"
            : dialogAction === "completed"
              ? "Order completed"
              : "Order cancelled",
        description:
          dialogAction === "cancelled"
            ? `${studioTitle} has been removed from your active orders.`
            : `${studioTitle} booking status was updated.`,
        type: "success",
      });
      router.refresh();
    } catch (error) {
      toast.add({
        title: "Unable to update order",
        description:
          error instanceof Error
            ? error.message
            : "Please try again in a moment.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "Completed") {
    return (
      <BadgeStatus status={status} />
    );
  }

  const isCancelling = dialogAction === "cancelled";

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {status === "Pending" ? (
          <>
            <Button
              type="button"
              size="sm"
              onClick={() => setDialogAction("confirmed")}
              className="h-9 gap-1.5 bg-accent px-3 text-accent-foreground hover:bg-accent/85"
            >
              <Check aria-hidden="true" />
              Confirm
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setDialogAction("cancelled")}
              className="h-9 gap-1.5 border-destructive/25 px-3 text-destructive hover:bg-destructive/5 hover:text-destructive"
            >
              <X aria-hidden="true" />
              Cancel
            </Button>
          </>
        ) : (
          <Button
            type="button"
            size="sm"
            onClick={() => setDialogAction("completed")}
            className="h-9 gap-1.5 px-3"
          >
            <Check aria-hidden="true" />
            Mark complete
          </Button>
        )}
      </div>

      <AlertDialog
        open={dialogAction !== null}
        onOpenChange={(open) => {
          if (!open && !isSubmitting) setDialogAction(null);
        }}
      >
        <AlertDialogContent className="border border-border bg-card sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogMedia
              className={
                isCancelling
                  ? "bg-destructive/10 text-destructive"
                  : "bg-accent/10 text-accent"
              }
            >
              {isCancelling ? (
                <X aria-hidden="true" />
              ) : (
                <Check aria-hidden="true" />
              )}
            </AlertDialogMedia>
            <AlertDialogTitle className="font-heading text-xl font-bold">
              {dialogAction === "confirmed"
                ? "Confirm this order?"
                : dialogAction === "completed"
                  ? "Mark this order complete?"
                  : "Cancel this order?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {dialogAction === "cancelled"
                ? "This will cancel and remove the order from your active list: "
                : "This will update the status for "}
              <span className="font-semibold text-foreground">
                {studioTitle}
              </span>
              .
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="border-border">
            <AlertDialogCancel disabled={isSubmitting}>
              Go back
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={submitStatus}
              disabled={isSubmitting}
              className={
                isCancelling
                  ? "gap-2 bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  : "gap-2 bg-accent text-accent-foreground hover:bg-accent/85"
              }
            >
              {isSubmitting ? (
                <LoaderCircle className="animate-spin" aria-hidden="true" />
              ) : isCancelling ? (
                <X aria-hidden="true" />
              ) : (
                <Check aria-hidden="true" />
              )}
              {isSubmitting
                ? isCancelling
                  ? "Cancelling..."
                  : "Updating..."
                : isCancelling
                  ? "Yes, cancel"
                  : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function BadgeStatus({ status }: { status: BookingStatus }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
      <Check className="size-4 text-accent" aria-hidden="true" />
      {status}
    </span>
  );
}
