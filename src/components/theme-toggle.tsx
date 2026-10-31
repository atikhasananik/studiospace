"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "lucide-react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  // Hydration-safe mount detection (server: false → client: true)
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={
        mounted
          ? isDark
            ? "Switch to light theme"
            : "Switch to dark theme"
          : "Toggle theme"
      }
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      {/* Sun shows in light mode, Moon in dark — animated swap via .dark class */}
      <SunIcon className="size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <MoonIcon className="absolute size-4 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
    </Button>
  )
}
