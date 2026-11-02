import { ImagePlus, Star } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormSectionHeading } from "./FormSectionHeading";
import { FormField } from "./FormField";
import { CATEGORIES, FIELD_CONTROL_CLASS } from "./constants";
import { IStudio } from "../type/studio.type";


type ListingDetailsSectionProps = {
  studio?: IStudio;
  category: string | null;
  onCategoryChange: (category: string | null) => void;
};

export function ListingDetailsSection({
  studio,
  category,
  onCategoryChange,
}: ListingDetailsSectionProps) {
  return (
    <section aria-labelledby="listing-details-heading">
      <FormSectionHeading
        id="listing-details-heading"
        step="01 / LISTING"
        title="Studio details"
        description="Give your space a clear identity."
      />

      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <FormField
            id="title"
            label="Studio title"
            hint="Choose a name that helps creators understand what makes your space special."
          >
            <Input
              id="title"
              name="title"
              defaultValue={studio?.title ?? ""}
              required
              placeholder="e.g. The Northlight Photo Loft"
              className={FIELD_CONTROL_CLASS}
            />
          </FormField>
        </div>

        <FormField id="category" label="Category">
          <Select
            name="category"
            required
            value={category}
            onValueChange={onCategoryChange}
          >
            <SelectTrigger
              id="category"
              className={`${FIELD_CONTROL_CLASS} justify-between  py-5.5 data-popup-open:border-primary/40 data-popup-open:bg-card`}
            >
              <SelectValue placeholder="Choose a studio category" />
            </SelectTrigger>
            <SelectContent className="rounded-xl  border border-border bg-card p-2 shadow-2xl shadow-background/40 ring-1 ring-primary/10">
              {CATEGORIES.map(({ label, icon: Icon, detail }, index) => (
                <SelectItem
                  key={label}
                  value={label}
                  className="group my-0.5 min-h-14 rounded-xl py-2 px-2.5  text-sm text-foreground transition-colors data-highlighted:bg-primary/10 data-highlighted:text-foreground data-[selected]:bg-primary/5"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary transition-colors group-data-highlighted:border-primary/30 group-data-highlighted:bg-primary/10">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span className="flex min-w-0 flex-col gap-1">
                      <span className="font-semibold leading-none">
                        {label}
                      </span>
                      <span className="text-xs leading-none text-muted-foreground">
                        {detail}
                      </span>
                    </span>
                    <span className="ml-auto mr-1 font-mono text-[10px] tracking-widest text-muted-foreground/60">
                      0{index + 1}
                    </span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <FormField
          id="location"
          label="Location / address"
          hint="Include a city or neighborhood so guests can find your space."
        >
          <Input
            id="location"
            name="location"
            defaultValue={studio?.location ?? ""}
            required
            placeholder="e.g. 24 Mercer Street, New York"
            className={FIELD_CONTROL_CLASS}
          />
        </FormField>

        <FormField
          id="imageUrl"
          label="Cover image URL"
          hint="Use a direct link to a high-quality image of your studio."
        >
          <div className="relative">
            <ImagePlus
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="imageUrl"
              name="imageUrl"
              type="url"
              defaultValue={studio?.imageUrl ?? ""}
              placeholder="https://example.com/studio.jpg"
              className={`${FIELD_CONTROL_CLASS} pl-10`}
            />
          </div>
        </FormField>

        <FormField
          id="Rating"
          label="Studio Rating"
          hint="Rate your studio from 0 to 5."
        >
          <div className="relative">
            <Star
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="Rating"
              name="rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              defaultValue={studio?.rating ?? ""}
              placeholder="4.0"
              className={`${FIELD_CONTROL_CLASS} pl-10`}
            />
          </div>
        </FormField>
      </div>
    </section>
  );
}
