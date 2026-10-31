import Link from "next/link";
import { ArrowDown, ArrowUpRight, CircleHelp } from "lucide-react";

import { Button } from "@/components/ui/button";

const FAQS = [
  {
    question: "What kinds of creative spaces can I find?",
    answer:
      "Explore spaces for photography, film, podcasts, music, and other creative work. Use the studio categories to find a space that fits your project.",
  },
  {
    question: "How do I choose the right studio?",
    answer:
      "Review each listing’s photos, location, equipment, amenities, availability, and booking details. Check the studio description and host information before choosing.",
  },
  {
    question: "What is included with a studio booking?",
    answer:
      "Inclusions vary by space. Check the listing for its equipment, amenities, access instructions, house rules, and any details provided by the host.",
  },
  {
    question: "How much does it cost to book a space?",
    answer:
      "Rates are set by each studio and can vary by space and booking duration. Review the listing’s current pricing and any additional charges before continuing.",
  },
  {
    question: "Can I list my own creative space?",
    answer:
      "StudioSpace is designed to connect creative-space hosts with creators. Use the host option to explore getting started, and prepare clear photos and details about your space.",
  },
  {
    question: "What if I need to change or cancel my booking?",
    answer:
      "Change and cancellation terms can depend on the studio and booking. Review the applicable policy on the listing or booking details, and contact the host if you need clarification.",
  },
] as const;

export default function FAQSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative overflow-hidden border-t border-border bg-background py-16 md:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-12 size-96 rounded-full bg-accent/5 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-card/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent backdrop-blur-md">
            <CircleHelp className="size-3.5" aria-hidden="true" />
            Good to know
          </span>
          <h2
            id="faq-heading"
            className="mt-5 font-heading text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl"
          >
            Frequently asked <span className="text-primary">questions</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground text-balance md:text-lg">
            A few helpful details to make finding your next creative space
            easier.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-4 md:grid-cols-2 md:gap-5">
          {FAQS.map((faq, index) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-border bg-card/40 transition-colors duration-200 open:border-primary/30 open:bg-card/70"
            >
              <summary className="flex cursor-pointer list-none items-start gap-4 rounded-xl p-5 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:p-6 [&::-webkit-details-marker]:hidden">
                <span className="mt-0.5 font-mono text-xs font-semibold tracking-widest text-primary/80">
                  0{index + 1}
                </span>
                <span className="flex-1 font-heading text-base leading-snug font-bold tracking-tight text-foreground sm:text-lg">
                  {faq.question}
                </span>
                <ArrowDown
                  className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180 group-open:text-primary"
                  aria-hidden="true"
                />
              </summary>
              <div className="pb-5 pl-[3.55rem] pr-5 sm:pb-6 sm:pl-[3.8rem] sm:pr-6">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 text-center sm:flex-row">
          <p className="text-sm text-muted-foreground">
            Ready to find a space for your next idea?
          </p>
          <Button
            nativeButton={false}
            render={<Link href="/studios" />}
            className="h-10 gap-2 rounded-xl bg-primary px-5 font-semibold text-primary-foreground shadow-lg shadow-primary/10 transition-all hover:bg-primary/90 active:scale-95"
          >
            Browse studios
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
