"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  MenuIcon,
  Plus,
  Store,
} from "lucide-react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient, useSession } from "@/lib/auth-client";

const routes = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#about", label: "About Us" },
] as const;

const accountLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/add-studio", label: "Add New Studio", icon: Plus },
  { href: "/my-listings", label: "My Studio Listings", icon: Store },
  { href: "/my-bookings", label: "My Bookings", icon: CalendarDays },
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
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [logoutError, setLogoutError] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const user = session?.user;

  async function handleLogout() {
    setLogoutError("");
    setIsLoggingOut(true);

    try {
      const { error } = await authClient.signOut();
      if (error) {
        setLogoutError(error.message || "Unable to log out. Please try again.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      setLogoutError(
        error instanceof Error
          ? error.message
          : "Unable to log out. Please try again.",
      );
    } finally {
      setIsLoggingOut(false);
    }
  }

  const initials =
    user?.name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "U";

  // Fixed navbar floats over the hero — transparent at the top of the page,
  // gains its frosted background as soon as the user scrolls.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "site-navbar fixed inset-x-0 top-0 z-40 w-full border-b transition-all duration-300",
        scrolled
          ? "border-border bg-background/80 shadow-[0_4px_20px_-4px_hsl(var(--primary)/0.06)] backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
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

          {/* Desktop authentication actions / profile */}
          <div className="hidden items-center gap-1.5 md:flex">
            {!isPending && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  aria-label={`Open account menu for ${user.name || "your account"}`}
                  className="group relative rounded-full border border-border bg-background/70 p-1 transition-colors hover:border-primary/40 hover:bg-secondary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <Avatar className="size-9 border border-primary/30 bg-secondary">
                    <AvatarImage
                      src={session?.user.image || undefined}
                      alt={user.name || "Your avatar"}
                    />
                    <AvatarFallback className="bg-secondary font-heading text-xs font-bold text-primary">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="pointer-events-none absolute right-0 top-full z-50 mt-2 max-w-48 truncate rounded-lg border border-border bg-popover px-3 py-1.5 text-xs font-medium text-popover-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    {user.name || "My account"}
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-60 p-1.5">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="px-2 py-2">
                      <span className="block truncate text-sm font-semibold text-foreground">
                        {user.name || "StudioSpace member"}
                      </span>
                      <span className="mt-0.5 block truncate text-xs font-normal text-muted-foreground">
                        {user.email}
                      </span>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  {accountLinks.map(({ href, label, icon: Icon }) => (
                    <DropdownMenuItem
                      key={href}
                      nativeButton={false}
                      render={<Link href={href} />}
                      aria-current={isActive(href) ? "page" : undefined}
                      className={cn(
                        "cursor-pointer gap-2.5 px-2 py-2",
                        isActive(href) && "text-primary",
                      )}
                    >
                      <Icon className="size-4 text-muted-foreground" />
                      {label}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  {logoutError && (
                    <p
                      role="alert"
                      className="px-2 py-1.5 text-xs text-destructive"
                    >
                      {logoutError}
                    </p>
                  )}
                  <DropdownMenuItem
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="cursor-pointer gap-2.5 px-2 py-2 text-destructive focus:text-destructive"
                  >
                    <LogOut className="size-4" />
                    {isLoggingOut ? "Signing out…" : "Sign out"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : !isPending ? (
              <>
                <Button
                  nativeButton={false}
                  variant="ghost"
                  render={<Link href="/login" />}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Login
                </Button>
                <Button
                  nativeButton={false}
                  render={<Link href="/register" />}
                  className="rounded-xl bg-primary px-5 font-semibold text-primary-foreground shadow-lg shadow-orange-500/10 transition-all hover:bg-primary/90 active:scale-95"
                >
                  Register
                </Button>
              </>
            ) : (
              <span
                aria-label="Loading account"
                className="size-9 animate-pulse rounded-full bg-muted"
              />
            )}
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

              <nav aria-label="Mobile" className="flex flex-col gap-1 p-4">
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
                {!isPending && user ? (
                  <>
                    <div className="flex items-center gap-3 rounded-xl border border-border bg-card/60 p-3">
                      <Avatar className="size-10 shrink-0 border border-primary/30 bg-secondary">
                        <AvatarImage src={user.image || undefined} alt="" />
                        <AvatarFallback className="bg-secondary font-heading text-xs font-bold text-primary">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-foreground">
                          {user.name || "StudioSpace member"}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {user.email}
                        </span>
                      </span>
                    </div>
                    {accountLinks.map(({ href, label, icon: Icon }) => (
                      <SheetClose
                        key={href}
                        nativeButton={false}
                        render={<Link href={href} />}
                        aria-current={isActive(href) ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                          isActive(href)
                            ? "bg-secondary text-primary"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                        )}
                      >
                        <Icon className="size-4" />
                        {label}
                      </SheetClose>
                    ))}
                    {logoutError && (
                      <p
                        role="alert"
                        className="px-2 py-1 text-xs text-destructive"
                      >
                        {logoutError}
                      </p>
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="mt-2 w-full justify-start gap-2 rounded-xl border-border text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <LogOut className="size-4" />
                      {isLoggingOut ? "Signing out…" : "Sign out"}
                    </Button>
                  </>
                ) : !isPending ? (
                  <>
                    <Button
                      nativeButton={false}
                      variant="outline"
                      render={<Link href="/login" />}
                      className="w-full rounded-xl border-border text-foreground hover:bg-secondary"
                    >
                      Login
                    </Button>
                    <Button
                      nativeButton={false}
                      render={<Link href="/register" />}
                      className="w-full rounded-xl bg-primary font-semibold text-primary-foreground shadow-lg shadow-orange-500/10 transition-all hover:bg-primary/90 active:scale-95"
                    >
                      Register
                    </Button>
                  </>
                ) : (
                  <span className="h-20 animate-pulse rounded-xl bg-muted" />
                )}
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
