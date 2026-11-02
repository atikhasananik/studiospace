import { Badge } from "@/components/ui/badge";

type DashboardHeaderProps = {
  name: string;
};

export function DashboardHeader({ name }: DashboardHeaderProps) {
  const firstName = name.trim().split(/\s+/)[0] || "Creator";

  return (
    <header className="mb-8 flex flex-col gap-5 border-b border-border pb-8 md:mb-10 md:flex-row md:items-end md:justify-between">
      <div>
        <Badge
          variant="outline"
          className="gap-2 border-accent/30 bg-accent/5 px-3 py-1 font-mono text-[10px] tracking-[0.16em] text-accent"
        >
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-accent"
          />
          CREATOR WORKSPACE
        </Badge>
        <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
          Welcome back, <span className="text-primary">{firstName}</span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Your creative business, bookings, and studio activity — organized in
          one place.
        </p>
      </div>
      <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground">
        STUDIO SPACE / CONTROL ROOM
      </p>
    </header>
  );
}
