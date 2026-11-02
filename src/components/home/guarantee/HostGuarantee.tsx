import {
  BadgeCheck,
  Check,
  Headset,
  PackageCheck,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

type Assurance = {
  title: string;
  description: string;
  icon: LucideIcon;
  details: string[];
  meta: string;
};

/** Platform assurances — static content, no backend dependency. */
const ASSURANCES: Assurance[] = [
  {
    title: "Liability Protection",
    description:
      "Every booking is covered end-to-end, so hosts open their doors and creators shoot with total peace of mind.",
    icon: ShieldCheck,
    details: [
      "Liability coverage up to $1M on every booking",
      "Built-in damage protection for host spaces",
      "Secure contracts and payments on-platform",
    ],
    meta: "$1M cover",
  },
  {
    title: "Verified Profiles",
    description:
      "Real people, real spaces, real reviews — every account is screened before it can book or list.",
    icon: BadgeCheck,
    details: [
      "Government-ID verification for hosts and creators",
      "Reviews come only from completed bookings",
      "Transparent host track records and response rates",
    ],
    meta: "ID checked",
  },
  {
    title: "Equipment Safety",
    description:
      "Gear is listed, photographed, and checked — you always know exactly what is waiting for you on set.",
    icon: PackageCheck,
    details: [
      "Listed gear inventories matched to studio photos",
      "Protective house rules on every studio page",
      "Optional damage deposits added at checkout",
    ],
    meta: "Inspected",
  },
  {
    title: "24/7 Host Support",
    description:
      "Studios don't keep office hours — neither do we. Help is one message away, before and during your shoot.",
    icon: Headset,
    details: [
      "Real humans on chat and phone, day or night",
      "On-call assistance during your session",
      "Priority rebooking if a space falls through",
    ],
    meta: "Always on",
  },
];

const HostGuarantee = () => {
  return (
    <section
      id="host-guarantee"
      aria-labelledby="host-guarantee-heading"
      className="bg-background py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Header — centered, echoes the site's section rhythm ──── */}
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-card/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent backdrop-blur-md">
            <span className="relative flex size-1.5" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
            </span>
            Book with Confidence
          </span>

          <h2
            id="host-guarantee-heading"
            className="mt-5 font-heading text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl"
          >
            Host Guarantee &amp;{" "}
            <span className="text-primary">Creator Support</span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-balance md:text-lg">
            From liability cover to round-the-clock help — StudioSpace protects
            the host&apos;s space and the creator&apos;s shoot, every step of
            the way.
          </p>
        </div>

        {/* ── Assurance cards ───────────────────────────────────────── */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ASSURANCES.map((assurance) => {
            const Icon = assurance.icon;

            return (
              <div
                key={assurance.title}
                className="scroll-reveal group flex flex-col rounded-xl border border-border bg-card/40 p-6 shadow-sm transition-all duration-300 hover:border-primary/40 hover:bg-card hover:shadow-lg hover:shadow-primary/10 hover:ring-1 hover:ring-primary/30"
              >
                {/* Hairline icon puck */}
                <span className="inline-flex size-11 items-center justify-center rounded-lg border border-border bg-card text-primary transition-colors duration-300 group-hover:border-primary/40 group-hover:bg-primary/10">
                  <Icon className="size-5" aria-hidden="true" />
                </span>

                {/* Title + description */}
                <h3 className="mt-5 font-heading text-lg font-bold tracking-tight text-foreground">
                  {assurance.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {assurance.description}
                </p>

                {/* Detail bullets */}
                <ul className="mt-4 space-y-2 border-t border-border/70 pt-4">
                  {assurance.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check
                        className="mt-0.5 size-3.5 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                {/* Meta chip — sticky to the bottom for equal heights */}
                <span className="mt-5 inline-flex w-fit items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                  {assurance.meta}
                </span>
              </div>
            );
          })}
        </div>

        {/* ── Trust strip ───────────────────────────────────────────── */}
        <p className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span>
            <span className="font-semibold text-foreground">$1M</span> liability
            cover on every booking
          </span>
          <span aria-hidden="true" className="hidden sm:inline">
            ·
          </span>
          <span>
            <span className="font-semibold text-foreground">4.9</span> average
            host rating
          </span>
          <span aria-hidden="true" className="hidden sm:inline">
            ·
          </span>
          <span>
            Under <span className="font-semibold text-foreground">2 hours</span>{" "}
            average response time
          </span>
        </p>
      </div>
    </section>
  );
};

export default HostGuarantee;
