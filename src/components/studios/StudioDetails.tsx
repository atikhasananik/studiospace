import Link from "next/link";
import { ArrowLeft, CalendarDays, MapPin, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getSingleData } from "../data/getData";
import { StudioImageCarousel } from "./StudioImageCarousel";
import { BookingDialog } from "../myBookings/BookingDialog";

export async function StudioDetails({ id }: { id: string }) {
  const studio = await getSingleData(id);
  return (
    <section className="bg-background py-15 md:py-20">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <Button
          nativeButton={false}
          render={<Link href="/studios" />}
          variant="ghost"
          className="mb-6 gap-2 pl-0 text-muted-foreground hover:text-primary"
        >
          <ArrowLeft aria-hidden="true" />
          All studios
        </Button>

        <article className="overflow-hidden rounded-2xl border border-border bg-card">
          <StudioImageCarousel imageUrl={studio.imageUrl} title={studio.title} />

          <div className="grid gap-8 p-6 md:grid-cols-[minmax(0,1fr)_16rem] md:p-9">
            <div className="space-y-6">
              <div className="space-y-3">
                <Badge className="border border-primary/30 bg-primary/10 text-primary hover:bg-primary/10">
                  {studio.category}
                </Badge>
                <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  {studio.title}
                </h1>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <MapPin
                      className="size-4 text-primary"
                      aria-hidden="true"
                    />
                    {studio.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <Star
                      className="size-4 fill-primary text-primary"
                      aria-hidden="true"
                    />
                    {studio?.rating} rating
                  </span>
                </div>
              </div>

              <div>
                <h2 className="font-heading text-lg font-bold text-foreground">
                  About this space
                </h2>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                  {studio.detailedOverview ||
                    "Contact the host for more information about this creative space."}
                </p>
              </div>

              {studio.amenities?.length > 0 && (
                <div>
                  <h2 className="font-heading text-lg font-bold text-foreground">
                    Amenities
                  </h2>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {studio.amenities.map((amenity: string) => (
                      <li key={amenity}>
                        <Badge
                          variant="outline"
                          className="border-border bg-background text-muted-foreground"
                        >
                          {amenity}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <aside className="h-fit rounded-xl border border-border bg-background p-5">
              <p className="text-sm text-muted-foreground">Hourly rate</p>
              <p className="mt-1 font-heading text-3xl font-bold text-primary">
                ${studio.hourlyRate}
                <span className="ml-1 font-sans text-sm font-normal text-muted-foreground">
                  / hour
                </span>
              </p>
              <div className="mt-5 space-y-3 border-t border-border pt-4 text-sm">
                <p className="flex justify-between gap-3 text-muted-foreground">
                  <span>Capacity</span>
                  <span className="font-medium text-foreground">
                    {studio.maxCapacity} guests
                  </span>
                </p>
                <p className="flex justify-between gap-3 text-muted-foreground">
                  <span>Security deposit</span>
                  <span className="font-medium text-foreground">
                    ${studio.securityDeposit}
                  </span>
                </p>
              </div>
              <BookingDialog studio={studio} />
            </aside>
          </div>
        </article>
      </div>
    </section>
  );
}
