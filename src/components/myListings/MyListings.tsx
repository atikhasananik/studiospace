import { Building2, Plus } from "lucide-react";
import Link from "next/link";

import type { IStudio } from "@/components/type/studio.type";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import MylistingsCard from "./MylistingsCard";

type MyListingsProps = {
  studios: IStudio[];
  loadError: boolean;
};

export function MyListings({ studios, loadError }: MyListingsProps) {
  return (
    <section className="relative flex-1 overflow-hidden bg-background py-28 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_50%_0%,hsl(var(--primary)/0.08),transparent_68%)]"
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10 flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Badge
              variant="outline"
              className="gap-2 border-accent/30 bg-card/80 px-3 py-1 text-accent"
            >
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-accent"
              />
              HOST / YOUR WORKSPACES
            </Badge>
            <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              My <span className="text-primary">listings</span>
            </h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Keep your creative spaces up to date and ready to welcome their
              next project.
            </p>
          </div>
          <Button
            nativeButton={false}
            render={<Link href="/add-studio" />}
            className="h-11 shrink-0 gap-2 rounded-lg px-5 font-semibold shadow-lg shadow-primary/15"
          >
            <Plus aria-hidden="true" />
            Add a studio
          </Button>
        </header>

        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              Your spaces
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {loadError
                ? "Your listings could not be loaded."
                : `${studios.length} ${studios.length === 1 ? "space" : "spaces"} owned by your account`}
            </p>
          </div>
          {!loadError && studios.length > 0 && (
            <span className="hidden font-mono text-xs tracking-widest text-muted-foreground sm:inline">
              OWNER VERIFIED
            </span>
          )}
        </div>

        {loadError ? (
          <div
            role="alert"
            className="rounded-2xl border border-destructive/30 bg-destructive/5 px-6 py-12 text-center"
          >
            <h3 className="font-heading text-lg font-bold text-foreground">
              We couldn’t load your listings
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Please try again in a moment.
            </p>
          </div>
        ) : studios.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 text-primary">
              <Building2 className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-heading text-xl font-bold text-foreground">
              Your next creative space starts here
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              You don’t have any studio listings yet. Add a space to share it
              with the StudioSpace community.
            </p>
            <Button
              nativeButton={false}
              render={<Link href="/add-studio" />}
              className="mt-6 gap-2"
            >
              <Plus aria-hidden="true" />
              Add your first studio
            </Button>
          </div>
        ) : (
          <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
            {studios.map((studio) => (
              <MylistingsCard key={studio._id} studio={studio} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
