"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowUpRight, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

type ErrorPageProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function ErrorPage({ error, retry }: ErrorPageProps) {
  useEffect(() => {
    console.error("Application route error:", error);
  }, [error]);

  return (
    <main className="relative flex min-h-[70svh] flex-1 items-center justify-center overflow-hidden bg-background px-4 py-20 sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,hsl(var(--destructive)/0.1),transparent_58%)]"
      />

      <section
        aria-labelledby="error-heading"
        className="relative mx-auto w-full max-w-2xl text-center"
      >
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-destructive/25 bg-destructive/5 text-destructive">
          <AlertTriangle className="size-6" aria-hidden="true" />
        </span>

        <p className="mt-8 font-mono text-sm font-semibold tracking-[0.3em] text-destructive">
          ERROR / 500
        </p>
        <h1
          id="error-heading"
          className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-foreground text-balance sm:text-5xl md:text-6xl"
        >
          Something went <span className="text-primary">wrong.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground text-balance md:text-lg">
          We couldn&apos;t load this page. You can try again, or head back to the
          homepage.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            type="button"
            onClick={retry}
            className="h-11 gap-2 rounded-xl bg-primary px-5 font-semibold text-primary-foreground shadow-lg shadow-primary/10 transition-all hover:bg-primary/90"
          >
            <RefreshCw className="size-4" aria-hidden="true" />
            Try again
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/" />}
            variant="outline"
            className="h-11 gap-2 rounded-xl border-border px-5 font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
          >
            Back to home
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </section>
    </main>
  );
}
