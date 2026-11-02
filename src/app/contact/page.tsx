import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  MessageCircle,
  MessagesSquare,
  Sparkles,
} from "lucide-react";

import { createPageMetadata } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = createPageMetadata({
  title: "Contact StudioSpace",
  description:
    "Get in touch with StudioSpace about finding, booking, or listing a creative studio.",
  path: "/contact",
});

const CONTACT_PATHS = [
  {
    icon: CalendarDays,
    title: "Booking question",
    description: "Need help with a studio booking or reservation?",
    action: "View my bookings",
    href: "/my-bookings",
  },
  {
    icon: Building2,
    title: "List your studio",
    description: "Share your creative space with the StudioSpace community.",
    action: "Become a host",
    href: "/add-studio",
  },
] as const;

export default function ContactPage() {
  return (
    <section className="relative flex-1 overflow-hidden bg-background py-16 md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-96 size-80 rounded-full bg-accent/5 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <Badge
            variant="outline"
            className="gap-2 border-accent/30 bg-card/80 px-3 py-1 text-accent"
          >
            <Sparkles className="size-3.5" aria-hidden="true" />
            Let&apos;s talk
          </Badge>
          <h1 className="mt-5 font-heading text-4xl font-extrabold tracking-tight text-foreground text-balance sm:text-5xl md:text-6xl">
            Make room for a <span className="text-primary">conversation.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground text-balance md:text-lg">
            Whether you&apos;re looking for the right space or ready to share
            yours, we&apos;re here to help you take the next step.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <aside className="flex flex-col">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                <MessagesSquare className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-heading text-lg font-bold text-foreground">
                  How can we help?
                </h2>
                <p className="text-sm text-muted-foreground">
                  Choose a path to get started.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {CONTACT_PATHS.map(
                ({ icon: Icon, title, description, action, href }) => (
                  <Link
                    key={title}
                    href={href}
                    className="group rounded-2xl border border-border bg-card/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-card hover:shadow-lg hover:shadow-primary/5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-primary transition-colors group-hover:border-primary/30 group-hover:bg-primary/10">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <ArrowRight
                        className="mt-1 size-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="mt-4 font-heading text-base font-bold text-foreground">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                    <span className="mt-4 inline-block text-xs font-semibold text-primary">
                      {action}
                    </span>
                  </Link>
                ),
              )}
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-accent/20 bg-accent/5 p-5">
              <MessageCircle
                className="mt-0.5 size-5 shrink-0 text-accent"
                aria-hidden="true"
              />
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  A little more detail goes a long way
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Tell us what you&apos;re working on and what kind of help
                  you&apos;re looking for.
                </p>
              </div>
            </div>
          </aside>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
