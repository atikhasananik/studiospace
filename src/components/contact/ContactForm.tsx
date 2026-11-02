"use client";

import type { FormEvent } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";

const FIELD_CLASS =
  "h-11 rounded-xl border-border bg-background px-3.5 text-sm placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-primary/20";

export function ContactForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();

    toast.add({
      title: "Thanks for reaching out",
      description:
        "The form has been cleared. Message delivery is not enabled yet.",
      type: "success",
    });
  };

  return (
    <div
      id="contact-form"
      className="rounded-2xl border border-border bg-card/80 shadow-2xl shadow-primary/5 backdrop-blur-sm"
    >
      <div className="border-b border-border p-5 sm:p-7">
        <p className="font-mono text-xs font-semibold tracking-[0.18em] text-primary">
          CONTACT / 01
        </p>
        <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">
          Send us a message
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Fill in the details below and let us know how we can help.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-7">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="contact-name">Your name</Label>
            <Input
              id="contact-name"
              name="name"
              autoComplete="name"
              placeholder="Alex Morgan"
              required
              className={FIELD_CLASS}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email">Email address</Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="alex@example.com"
              required
              className={FIELD_CLASS}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-topic">What is this about?</Label>
          <select
            id="contact-topic"
            name="topic"
            defaultValue=""
            required
            className={`${FIELD_CLASS} w-full appearance-none border bg-background text-foreground`}
          >
            <option value="" disabled>
              Choose a topic
            </option>
            <option value="booking">A booking</option>
            <option value="listing">Listing a studio</option>
            <option value="account">My account</option>
            <option value="other">Something else</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-subject">Subject</Label>
          <Input
            id="contact-subject"
            name="subject"
            placeholder="What would you like to discuss?"
            className={FIELD_CLASS}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-message">Your message</Label>
          <Textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            placeholder="Share a few details so we can point you in the right direction..."
            className="min-h-36 resize-y rounded-xl border-border bg-background px-3.5 py-3 text-sm placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-primary/20"
          />
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
            This is a visual-only contact form. Message delivery is not enabled
            yet.
          </p>
          <Button
            type="submit"
            className="h-11 shrink-0 gap-2 rounded-xl px-5 font-semibold shadow-lg shadow-primary/15 transition-all hover:shadow-primary/25"
          >
            Send message
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </form>
    </div>
  );
}
