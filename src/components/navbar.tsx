"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";

const routes = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Studios" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/contact", label: "Contact" },
] as const;

function useIsActive() {
  const pathname = usePathname();
  return (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="StudioSpace home"
      className={cn("flex items-center gap-2.5", className)}
    >
      <Image
        src="/icon.svg"
        alt="StudioSpace logo"
        width={32}
        height={32}
        unoptimized
        className="size-8"
      />
      <span className="font-heading text-lg font-extrabold tracking-tight">
        Studio<span className="text-primary">Space</span>
      </span>
    </Link>
  );
}

/** Cyan pulse dot — brand "live availability" indicator (#00F2FE) */
function LiveDot() {
  return (
    <span className="relative flex size-1.5" aria-hidden="true">
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
      <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
    </span>
  );
}

export function Navbar() {
  const isActive = useIsActive();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 shadow-[0_4px_20px_-4px_hsl(var(--primary)/0.06)] backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ── Left: brand ─────────────────────────────────────────────── */}
        <Logo className="shrink-0" />

        {/* ── Center: route links (desktop, optically centered) ───────── */}
        <nav
          aria-label="Main"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex"
        >
          {routes.map((route) => {
            const active = isActive(route.href);
            return (
              <Link
                key={route.href}
                href={route.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {route.label}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-primary"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ── Right: live chip + auth actions ─────────────────────────── */}
        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full border border-accent/30 bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground lg:inline-flex">
            <LiveDot />
            Live Studios
          </span>

          {/* Theme toggle (desktop — mobile version lives in the sheet header) */}
          <ThemeToggle className="hidden md:inline-flex" />

          {/* Desktop auth */}
          <div className="hidden items-center gap-1.5 md:flex">
            <Button
              nativeButton={false}
              variant="ghost"
              render={<Link href="/login" />}
              className="text-muted-foreground hover:text-foreground"
            >
              Log In
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/register" />}
              className="rounded-xl bg-primary px-5 font-semibold text-primary-foreground shadow-lg shadow-orange-500/10 transition-all hover:bg-primary/90 active:scale-95"
            >
              Register
            </Button>
          </div>

          {/* Mobile menu trigger */}
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                  className="md:hidden"
                />
              }
            >
              <MenuIcon className="size-5" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-3/4 gap-0 border-l border-border bg-background p-0 text-foreground sm:max-w-sm"
            >
              <SheetHeader className="flex-row items-center justify-between border-b border-border p-4">
                <SheetTitle className="p-0">
                  <Logo />
                </SheetTitle>
                <ThemeToggle />
              </SheetHeader>

              <nav
                aria-label="Mobile"
                className="flex flex-col gap-1 p-4"
              >
                {routes.map((route) => {
                  const active = isActive(route.href);
                  return (
                    <SheetClose
                      key={route.href}
                      nativeButton={false}
                      render={<Link href={route.href} />}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        active
                          ? "bg-secondary text-primary"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                      )}
                    >
                      {route.label}
                      {active && (
                        <span
                          aria-hidden="true"
                          className="size-1.5 rounded-full bg-primary"
                        />
                      )}
                    </SheetClose>
                  );
                })}
              </nav>

              <Separator className="mx-4" />

              <SheetFooter className="mt-auto flex flex-col gap-2 border-t border-border p-4">
                <Button
                  nativeButton={false}
                  variant="outline"
                  render={<Link href="/login" />}
                  className="w-full rounded-xl border-border text-foreground hover:bg-secondary"
                >
                  Log In
                </Button>
                <Button
                  nativeButton={false}
                  render={<Link href="/register" />}
                  className="w-full rounded-xl bg-primary font-semibold text-primary-foreground shadow-lg shadow-orange-500/10 transition-all hover:bg-primary/90 active:scale-95"
                >
                  Register
                </Button>
                <span className="mt-2 inline-flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                  <LiveDot />
                  Live Studios booking now
                </span>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
