import Image from "next/image";
import Link from "next/link";

import { NewsletterForm } from "@/components/common/footer/NewsletterForm";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Explore studios", href: "/studios" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "About us", href: "/#about" },
  { label: "FAQs", href: "/#faq" },
  { label: "Contact", href: "/contact" },
] as const;

const STUDIO_CATEGORIES = [
  { label: "Photo studios", value: "Photo Studios" },
  { label: "Sound stages", value: "Sound Stages" },
  { label: "Podcast rooms", value: "Podcast Rooms" },
  { label: "Music suites", value: "Music Suites" },
  { label: "Art workshops", value: "Art Workshops" },
] as const;

function XLogo() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-[18px] fill-current"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramLogo() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-[18px] fill-none stroke-current stroke-2"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" className="fill-current stroke-none" />
    </svg>
  );
}

function YouTubeLogo() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-[18px] fill-current"
    >
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: "X", href: "https://x.com", icon: XLogo },
  { label: "Instagram", href: "https://instagram.com", icon: InstagramLogo },
  { label: "YouTube", href: "https://youtube.com", icon: YouTubeLogo },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/35">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.8fr_0.9fr_1.2fr] lg:gap-12">
          <div className="max-w-sm">
            <Link
              href="/"
              aria-label="StudioSpace home"
              className="inline-flex items-center gap-2.5"
            >
              <Image
                src="/icon.svg"
                alt=""
                width={36}
                height={36}
                unoptimized
                className="size-9"
              />
              <span className="font-heading text-xl font-extrabold tracking-tight text-foreground">
                Studio<span className="text-primary">Space</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              A space to make something remarkable. We connect creators with
              studios built for the work they want to bring to life.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit ${label}`}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer quick navigation">
            <h2 className="font-heading text-sm font-bold tracking-wide text-foreground">
              Explore
            </h2>
            <ul className="mt-4 space-y-3">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Popular studio categories">
            <h2 className="font-heading text-sm font-bold tracking-wide text-foreground">
              Popular categories
            </h2>
            <ul className="mt-4 space-y-3">
              {STUDIO_CATEGORIES.map(({ label, value }) => (
                <li key={value}>
                  <Link
                    href={`/studios?category=${encodeURIComponent(value)}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-heading text-sm font-bold tracking-wide text-foreground">
              Notes from the studio
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              A little inspiration for your next creative session.
            </p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} StudioSpace. All rights reserved.</p>
          <p className="max-w-xl leading-relaxed sm:text-right">
            By using StudioSpace, you agree to follow the applicable booking
            terms and policies shown with each studio and reservation.
          </p>
        </div>
      </div>
    </footer>
  );
}
