import { Plus, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AMENITIES, FIELD_CONTROL_CLASS } from "./constants";
import { FormSectionHeading } from "./FormSectionHeading";

type AmenitiesSectionProps = {
  amenities: string[];
  customAmenity: string;
  onCustomAmenityChange: (value: string) => void;
  onAddCustomAmenity: () => void;
  onToggleAmenity: (amenity: string, checked: boolean) => void;
};

export function AmenitiesSection({
  amenities,
  customAmenity,
  onCustomAmenityChange,
  onAddCustomAmenity,
  onToggleAmenity,
}: AmenitiesSectionProps) {
  return (
    <section aria-labelledby="amenities-heading">
      <FormSectionHeading
        id="amenities-heading"
        step="03 / FEATURES"
        title="Amenities & equipment"
        description="Select what guests can expect to find in your space."
      />

      <fieldset>
        <legend className="sr-only">Available amenities</legend>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {AMENITIES.map((amenity) => (
            <label
              key={amenity}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-background px-3 py-3 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground has-aria-checked:border-primary/40 has-aria-checked:bg-primary/5 has-aria-checked:text-foreground"
            >
              <Checkbox
                checked={amenities.includes(amenity)}
                onCheckedChange={(checked) =>
                  onToggleAmenity(amenity, checked === true)
                }
              />
              {amenity}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5">
        <Label
          htmlFor="customAmenity"
          className="mb-2 text-sm font-semibold text-foreground"
        >
          Add another amenity
        </Label>
        <div className="flex gap-2">
          <Input
            id="customAmenity"
            value={customAmenity}
            onChange={(event) => onCustomAmenityChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                onAddCustomAmenity();
              }
            }}
            placeholder="Type an amenity and add it"
            className={FIELD_CONTROL_CLASS}
          />
          <Button
            type="button"
            variant="outline"
            onClick={onAddCustomAmenity}
            className="h-11 shrink-0 gap-2"
          >
            <Plus aria-hidden="true" />
            Add
          </Button>
        </div>
        {amenities.some((amenity) => !AMENITIES.includes(amenity)) && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {amenities
              .filter((amenity) => !AMENITIES.includes(amenity))
              .map((amenity) => (
                <li key={amenity}>
                  <Badge
                    variant="outline"
                    className="gap-1.5 border-primary/30 bg-primary/5 py-1.5 text-foreground"
                  >
                    {amenity}
                    <button
                      type="button"
                      aria-label={`Remove ${amenity}`}
                      onClick={() => onToggleAmenity(amenity, false)}
                      className="rounded-full text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <X className="size-3" aria-hidden="true" />
                    </button>
                  </Badge>
                </li>
              ))}
          </ul>
        )}
      </div>
    </section>
  );
}
