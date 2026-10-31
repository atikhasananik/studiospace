"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address for the StudioSpace newsletter
        </label>
        <Input
          id="newsletter-email"
          name="email"
          type="email"
          placeholder="Your email address"
          autoComplete="email"
          required
          className="h-11 min-w-0 rounded-xl border-border bg-background/70 px-3 text-sm"
        />
        <Button
          type="submit"
          size="icon"
          aria-label="Subscribe to the newsletter"
          className="size-11 shrink-0 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {submitted ? (
            <Check className="size-4" aria-hidden="true" />
          ) : (
            <ArrowRight className="size-4" aria-hidden="true" />
          )}
        </Button>
      </form>
      <p
        aria-live="polite"
        className="mt-2 min-h-5 text-xs leading-relaxed text-muted-foreground"
      >
        {submitted
          ? "Thanks for your interest. Newsletter signup is not connected yet."
          : "Get studio inspiration and updates. No noise, just the good stuff."}
      </p>
    </div>
  );
}
