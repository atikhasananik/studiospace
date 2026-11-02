import { Input } from "@/components/ui/input";
import type { IStudio } from "../type/studio.type";
import { FIELD_CONTROL_CLASS } from "./constants";
import { FormField } from "./FormField";
import { FormSectionHeading } from "./FormSectionHeading";

type PricingSectionProps = {
  studio?: IStudio;
};

export function PricingSection({ studio }: PricingSectionProps) {
  return (
    <section aria-labelledby="pricing-heading">
      <FormSectionHeading
        id="pricing-heading"
        step="02 / PRICING"
        title="Rates & capacity"
        description="Set expectations for your guests before they book."
      />

      <div className="grid gap-5 sm:grid-cols-3">
        <FormField id="hourlyRate" label="Hourly rate">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              $
            </span>
            <Input
              id="hourlyRate"
              name="hourlyRate"
              type="number"
              min="0"
              step="0.01"
              defaultValue={studio?.hourlyRate ?? ""}
              required
              placeholder="0.00"
              className={`${FIELD_CONTROL_CLASS} pl-8`}
            />
          </div>
        </FormField>

        <FormField id="securityDeposit" label="Security deposit">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              $
            </span>
            <Input
              id="securityDeposit"
              name="securityDeposit"
              type="number"
              min="0"
              step="0.01"
              defaultValue={studio?.securityDeposit ?? ""}
              required
              placeholder="0.00"
              className={`${FIELD_CONTROL_CLASS} pl-8`}
            />
          </div>
        </FormField>

        <FormField id="maxCapacity" label="Maximum capacity">
          <Input
            id="maxCapacity"
            name="maxCapacity"
            type="number"
            min="1"
            step="1"
            defaultValue={studio?.maxCapacity ?? ""}
            required
            placeholder="e.g. 12"
            className={FIELD_CONTROL_CLASS}
          />
        </FormField>
      </div>
    </section>
  );
}
