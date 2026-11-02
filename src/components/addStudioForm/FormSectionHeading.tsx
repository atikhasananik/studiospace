type FormSectionHeadingProps = {
  id: string;
  step: string;
  title: string;
  description: string;
};

export function FormSectionHeading({
  id,
  step,
  title,
  description,
}: FormSectionHeadingProps) {
  return (
    <div className="mb-6 border-b border-border pb-4">
      <p className="font-mono text-xs font-semibold tracking-[0.18em] text-primary">
        {step}
      </p>
      <h2
        id={id}
        className="mt-2 font-heading text-xl font-bold text-foreground"
      >
        {title}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
