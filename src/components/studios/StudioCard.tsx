import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";

import type { IStudio } from "@/components/type/studio.type";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function StudioCard({ studio }: { studio: IStudio }) {
  return (
    <Card className="group h-full flex-col gap-0 overflow-hidden rounded-xl border border-border bg-card py-0 transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        {studio.imageUrl ? (
          <Image
            src={studio.imageUrl}
            alt={studio.title}
            fill
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-secondary to-background">
            <span className="font-heading text-3xl font-bold text-muted-foreground/50">
              StudioSpace
            </span>
          </div>
        )}
        <Badge className="absolute left-3 top-3 border border-primary/30 bg-background/85 text-primary backdrop-blur-md hover:bg-background/85">
          {studio.category}
        </Badge>
      </div>

      <CardContent className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h2 className="line-clamp-2 font-heading text-lg font-bold tracking-tight text-foreground">
            {studio.title}
          </h2>
          <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-foreground">
            <Star
              className="size-4 fill-primary text-primary"
              aria-hidden="true"
            />
            {studio.rating.toFixed(1)}
          </span>
        </div>

        <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin
            className="size-4 shrink-0 text-primary"
            aria-hidden="true"
          />
          <span className="truncate">{studio.location}</span>
        </p>
      </CardContent>

      <CardFooter className="justify-between gap-3 rounded-b-xl border-t border-border bg-muted/50 p-4">
        <p className="min-w-0">
          <span className="font-heading text-xl font-bold text-primary">
            ${studio.hourlyRate}
          </span>
          <span className="ml-1 text-sm text-muted-foreground">/ hour</span>
        </p>
        <Button
          nativeButton={false}
          render={<Link href={`/studios/${encodeURIComponent(studio._id)}`} />}
          variant="outline"
          className="shrink-0 rounded-lg border-border bg-card px-4 text-foreground transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
