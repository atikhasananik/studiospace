import Link from "next/link";
import { ArrowUpRight, Mail, UserRound } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type DashboardProfileProps = {
  name: string;
  email: string;
  image?: string | null;
};

function getInitials(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "U"
  );
}

export function DashboardProfile({
  name,
  email,
  image,
}: DashboardProfileProps) {
  return (
    <section
      aria-label="Your account"
      className="relative mb-8 overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-background/10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(ellipse_at_100%_50%,hsl(var(--accent)/0.1),transparent_68%)] sm:block"
      />
      <div className="relative flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
        <Avatar className="size-16 ring-2 ring-primary/15">
          {image && <AvatarImage src={image} alt="" />}
          <AvatarFallback className="bg-primary/10 font-heading text-lg font-bold text-primary">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate font-heading text-xl font-bold text-foreground">
              {name || "StudioSpace creator"}
            </h2>
            <Badge
              variant="outline"
              className="border-accent/25 bg-accent/5 text-accent"
            >
              <UserRound aria-hidden="true" />
              Host & creator
            </Badge>
          </div>
          <p className="mt-1 flex items-center gap-2 truncate text-sm text-muted-foreground">
            <Mail className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
            {email}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            nativeButton={false}
            render={<Link href="/my-listings" />}
            variant="outline"
            className="gap-2 border-border"
          >
            Manage studios
            <ArrowUpRight aria-hidden="true" />
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/add-studio" />}
            className="gap-2 shadow-lg shadow-primary/15"
          >
            Add a studio
            <ArrowUpRight aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
