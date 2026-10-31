"use client";

import { Search, SlidersHorizontal } from "lucide-react";

import { Input } from "@/components/ui/input";

type StudioFiltersProps = {
  search: string;
  category: string;
  categories: { label: string; value: string }[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
};

export function StudioFilters({
  search,
  category,
  categories,
  onSearchChange,
  onCategoryChange,
}: StudioFiltersProps) {
  return (
    <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-border bg-card/70 p-4 shadow-lg shadow-primary/5 sm:p-5">
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(13rem,0.55fr)]">
        <label className="relative block">
          <span className="sr-only">Search studios</span>
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by studio, location, or category"
            className="h-12 rounded-xl border-border bg-background pl-11 text-sm"
          />
        </label>

        <label className="relative block">
          <span className="sr-only">Filter by category</span>
          <SlidersHorizontal
            className="pointer-events-none absolute left-4 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <select
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
            className="h-12 w-full appearance-none rounded-xl border border-input bg-background pl-11 pr-4 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="">All categories</option>
            {categories.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
