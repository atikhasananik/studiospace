"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 400);

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  if (!visible) return null;

  function scrollToTop() {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  return (
    <Button
      type="button"
      size="icon-lg"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className="fixed right-5 bottom-5 z-50 size-11 rounded-full border border-primary-foreground/20 bg-primary text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:-translate-y-1 hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/60 sm:right-7 sm:bottom-7"
    >
      <ArrowUp className="size-5" aria-hidden="true" />
    </Button>
  );
}
