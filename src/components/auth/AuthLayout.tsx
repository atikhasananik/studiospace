"use client";

import type { ChangeEventHandler, ReactNode } from "react";
import {
  AudioLines,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type AuthMode = "login" | "register";

const pageCopy: Record<
  AuthMode,
  { eyebrow: string; title: string; description: string }
> = {
  login: {
    eyebrow: "WELCOME BACK",
    title: "Your next great\nsession starts here.",
    description:
      "Sign in to pick up where you left off and get back to creating.",
  },
  register: {
    eyebrow: "MAKE ROOM TO CREATE",
    title: "Find your space.\nMake your mark.",
    description:
      "Create an account to discover and book your next creative space.",
  },
};

export function GoogleMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className="size-5">
      <path
        fill="#FFC107"
        d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"
      />
      <path
        fill="#FF3D00"
        d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z"
      />
      <path
        fill="#4CAF50"
        d="M12.6 27.7a12 12 0 0 1 0-7.4V15H5.8a20 20 0 0 0 0 18l6.8-5.3Z"
      />
      <path
        fill="#1976D2"
        d="M24 11.9c3 0 5.7 1 7.8 3.1l5.8-5.8A19.3 19.3 0 0 0 24 4 20 20 0 0 0 5.8 15l6.8 5.3c1.6-4.8 6.1-8.4 11.4-8.4Z"
      />
    </svg>
  );
}

export function AuthField({
  id,
  label,
  icon,
  type = "text",
  placeholder,
  autoComplete,
  value,
  onChange,
  invalid,
  required = true,
  trailing,
}: {
  id: string;
  label: string;
  icon: ReactNode;
  type?: string;
  placeholder: string;
  autoComplete?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  invalid?: boolean;
  required?: boolean;
  trailing?: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-muted-foreground">
          {icon}
        </span>
        <Input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          required={required}
          aria-invalid={invalid || undefined}
          className="h-12 rounded-xl border-border bg-background/70 pl-11 pr-12 text-sm placeholder:text-muted-foreground/75 focus-visible:bg-background aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20"
        />
        {trailing}
      </div>
    </div>
  );
}

export function AuthLayout({
  mode,
  children,
}: {
  mode: AuthMode;
  children: ReactNode;
}) {
  const text = pageCopy[mode];

  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] flex-1 items-center overflow-hidden px-4 pb-10 pt-24 sm:px-6 lg:px-8 lg:pt-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_50%_0%,hsl(var(--primary)/0.08),transparent_68%)]"
      />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[1.08fr_0.92fr] xl:gap-14">
        <aside className="relative hidden min-h-[660px] flex-col justify-between overflow-hidden rounded-[1.75rem] border border-border bg-card p-10 lg:flex xl:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_8%,hsl(var(--primary)/0.2),transparent_42%),radial-gradient(ellipse_at_90%_88%,hsl(var(--accent)/0.1),transparent_38%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
          />

          <div className="relative z-10 flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <AudioLines className="size-5" />
            </span>
            <span className="font-heading text-lg font-extrabold tracking-tight">
              Studio<span className="text-primary">Space</span>
            </span>
          </div>

          <div className="relative z-10 my-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/5 px-3 py-1.5 text-xs font-semibold tracking-[0.16em] text-accent">
              <Sparkles className="size-3.5" />
              {text.eyebrow}
            </div>
            <h1 className="max-w-xl whitespace-pre-line font-heading text-4xl leading-[1.08] font-extrabold tracking-tight xl:text-5xl">
              {text.title}
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">
              {text.description}
            </p>

            <div className="mt-10 rounded-2xl border border-border/80 bg-background/65 p-5 shadow-2xl shadow-background/20 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    YOUR CREATIVE HOME
                  </p>
                  <p className="mt-1 font-heading text-lg font-bold">
                    Spaces for the sound of ideas.
                  </p>
                </div>
                <span className="flex size-10 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
                  <AudioLines className="size-5" />
                </span>
              </div>
              <div
                aria-hidden="true"
                className="mt-6 flex h-16 items-center justify-center gap-1.5 overflow-hidden"
              >
                {Array.from({ length: 37 }, (_, index) => (
                  <span
                    key={index}
                    className="w-1 rounded-full bg-primary/75"
                    style={{
                      height: `${18 + ((index * 17 + 23) % 40)}%`,
                      opacity: 0.35 + ((index * 7) % 60) / 100,
                    }}
                  />
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                <span>Studios made for your craft</span>
                <span className="inline-flex items-center gap-1.5 text-accent">
                  <span className="size-1.5 rounded-full bg-accent" />
                  Ready when you are
                </span>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="size-4 text-accent" />A better space for
            every big idea.
          </div>
        </aside>

        <div className="mx-auto w-full max-w-[440px] py-4">
          <div className="mb-8 lg:hidden">
            <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-primary">
              <Sparkles className="size-3.5" />
              {text.eyebrow}
            </div>
            <h1 className="whitespace-pre-line font-heading text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
              {text.title}
            </h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {text.description}
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card/85 p-6 shadow-[0_24px_80px_-32px_hsl(var(--foreground)/0.2)] backdrop-blur-xl sm:p-8">
            <div className="mb-7">
              <p className="text-xs font-semibold tracking-[0.18em] text-primary">
                {mode === "login" ? "MEMBER ACCESS" : "JOIN STUDIOSPACE"}
              </p>
              <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight sm:text-[1.75rem]">
                {mode === "login"
                  ? "Sign in to your account"
                  : "Create your account"}
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {mode === "login"
                  ? "Enter your details below to continue."
                  : "A space for your next big idea starts here."}
              </p>
            </div>
            {children}
          </div>

          <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5" />
            Your creative journey, in a space of your own.
          </p>
        </div>
      </div>
    </section>
  );
}
