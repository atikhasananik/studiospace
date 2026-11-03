"use client";

import { useState } from "react";

import type { IStudio } from "@/components/type/studio.type";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StudioCard } from "./StudioCard";
import { StudioFilters } from "./StudioFilters";
import {
  getStudioCategoryOptions,
  getStudioCategoryValue,
  studioMatchesCategory,
} from "./studio-categories";

type StudiosExplorerProps = {
  studios: IStudio[];
  initialCategory: string;
  initialSearch: string;
  loadError: boolean;
};

export function StudiosExplorer({
  studios,
  initialCategory,
  initialSearch,
  loadError,
}: StudiosExplorerProps) {
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(
    initialCategory ? getStudioCategoryValue(initialCategory) : "",
  );
  const categories = getStudioCategoryOptions(studios);
  const normalizedSearch = search.trim().toLocaleLowerCase();
  const visibleStudios = studios.filter((studio) => {
    const matchesCategory =
      !category || studioMatchesCategory(category, studio.category);
    const matchesSearch =
      !normalizedSearch ||
      [studio.title, studio.category, studio.location].some((value) =>
        value.toLocaleLowerCase().includes(normalizedSearch),
      );

    return matchesCategory && matchesSearch;
  });

  const clearFilters = () => {
    setSearch("");
    setCategory("");
  };

  return (
    <section
      aria-labelledby="studios-heading"
      className="bg-background py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="gap-2 border-accent/30 bg-card/80 px-3 py-1 text-accent"
          >
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
            Find your creative space
          </Badge>
          <h1
            id="studios-heading"
            className="mt-5 font-heading text-4xl font-bold tracking-tight text-foreground text-balance md:text-5xl"
          >
            Explore <span className="text-primary">studios</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground text-balance md:text-lg">
            Find the right space for your next shoot, recording session, or
            creative project.
          </p>
        </div>

        <StudioFilters
          search={search}
          category={category}
          categories={categories}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
        />

        <div className="mt-10 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-heading text-xl font-bold tracking-tight text-foreground">
              Available workspaces
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {loadError
                ? "Studios are temporarily unavailable."
                : `${visibleStudios.length} ${visibleStudios.length === 1 ? "space" : "spaces"} to explore`}
            </p>
          </div>
          {(search || category) && (
            <Button
              type="button"
              variant="ghost"
              onClick={clearFilters}
              className="h-9 text-muted-foreground hover:text-primary"
            >
              Clear filters
            </Button>
          )}
        </div>

        {visibleStudios.length > 0 ? (
          <div className="mt-5 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleStudios.map((studio) => (
              <StudioCard key={studio._id} studio={studio} />
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
            <h3 className="font-heading text-xl font-bold text-foreground">
              {loadError
                ? "We couldn’t load the studios"
                : "No studios match your search"}
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              {loadError
                ? "Please try again in a little while."
                : "Try another search or clear the selected filters to see all available spaces."}
            </p>
            {!loadError && (search || category) && (
              <Button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-lg px-5"
              >
                Clear filters
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
