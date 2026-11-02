import { Input } from "@/components/ui/input";
import { FIELD_CONTROL_CLASS } from "./constants";
import { FormField } from "./FormField";
import { FormSectionHeading } from "./FormSectionHeading";

type HostSectionProps = {
  user: {
    name: string;
    email: string;
  };
};

export function HostSection({ user }: HostSectionProps) {
  return (
    <section aria-labelledby="host-heading">
      <FormSectionHeading
        id="host-heading"
        step="05 / HOST"
        title="Host account"
        description="These details are read-only and associated with your account."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="hostName" label="Your name">
          <Input
            id="hostName"
            name="hostName"
            value={user.name}
            readOnly
            className={`${FIELD_CONTROL_CLASS} cursor-not-allowed bg-muted text-muted-foreground hover:border-border`}
          />
        </FormField>
        <FormField id="hostEmail" label="Your email">
          <Input
            id="hostEmail"
            name="hostEmail"
            type="email"
            value={user.email}
            readOnly
            className={`${FIELD_CONTROL_CLASS} cursor-not-allowed bg-muted text-muted-foreground hover:border-border`}
          />
        </FormField>
      </div>
    </section>
  );
}
