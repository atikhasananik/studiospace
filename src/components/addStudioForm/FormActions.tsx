import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";

type FormActionsProps = {
  isEditing: boolean;
  isSubmitting: boolean;
};

export function FormActions({ isEditing, isSubmitting }: FormActionsProps) {
  return (
    <div className="flex flex-col-reverse gap-3 border-t border-border bg-muted/30 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
      <p className="text-xs leading-relaxed text-muted-foreground">
        {isEditing
          ? "Review all changes before updating your listing."
          : "Your listing will be added to StudioSpace when submitted."}
      </p>
      <div className="flex flex-col-reverse gap-3 sm:flex-row">
        <Button
          type="reset"
          variant="outline"
          className="h-11 px-5"
          disabled={isSubmitting}
        >
          {isEditing ? "Reset changes" : "Reset form"}
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-11 gap-2 rounded-lg px-6 font-semibold shadow-lg shadow-primary/15"
        >
          <Check aria-hidden="true" />
          {isSubmitting
            ? isEditing
              ? "Updating..."
              : "Adding..."
            : isEditing
              ? "Update Studio"
              : "Add Studio"}
        </Button>
      </div>
    </div>
  );
}
