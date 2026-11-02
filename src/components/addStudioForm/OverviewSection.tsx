import { Textarea } from "@/components/ui/textarea";
import type { IStudio } from "../type/studio.type";
import { FormField } from "./FormField";
import { FormSectionHeading } from "./FormSectionHeading";

type OverviewSectionProps = {
  studio?: IStudio;
};

export function OverviewSection({ studio }: OverviewSectionProps) {
  return (
    <section aria-labelledby="overview-heading">
      <FormSectionHeading
        id="overview-heading"
        step="04 / STORY"
        title="Tell us about your space"
        description="Add helpful details about the space, setup, and ideal projects."
      />

      <FormField
        id="detailedOverview"
        label="Detailed overview"
        hint="Share any important details guests should know before booking."
      >
        <Textarea
          id="detailedOverview"
          name="detailedOverview"
          defaultValue={studio?.detailedOverview ?? ""}
          required
          rows={6}
          placeholder="Describe the studio, its atmosphere, equipment, access, and what makes it a great place to create..."
          className="min-h-36 resize-y rounded-xl border-border bg-background px-3.5 py-3 text-sm shadow-sm transition-all placeholder:text-muted-foreground/70 hover:border-primary/40 focus-visible:border-primary focus-visible:ring-primary/20"
        />
      </FormField>
    </section>
  );
}
