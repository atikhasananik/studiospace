import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Compass } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[70svh] flex-1 items-center justify-center overflow-hidden bg-background px-4 py-20 sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,hsl(var(--primary)/0.12),transparent_58%)]"
      />

      <section
        aria-labelledby="not-found-heading"
        className="relative mx-auto w-full max-w-2xl text-center"
      >
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-accent/25 bg-accent/5 text-accent">
          <Compass className="size-6" aria-hidden="true" />
        </span>

        <p className="mt-8 font-mono text-sm font-semibold tracking-[0.3em] text-primary">
          ERROR / 404
        </p>
        <h1
          id="not-found-heading"
          className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-foreground text-balance sm:text-5xl md:text-6xl"
        >
          This space doesn&apos;t <span className="text-primary">exist.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground text-balance md:text-lg">
          We couldn&apos;t find the page you were looking for. It may have moved,
          or the address might be incorrect.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            nativeButton={false}
            render={<Link href="/" />}
            className="h-11 gap-2 rounded-xl bg-primary px-5 font-semibold text-primary-foreground shadow-lg shadow-primary/10 transition-all hover:bg-primary/90"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to home
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/studios" />}
            variant="outline"
            className="h-11 gap-2 rounded-xl border-border px-5 font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
          >
            Explore studios
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </section>
    </main>
  );
}
