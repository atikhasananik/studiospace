import type { IStudio } from "@/components/type/studio.type";

export const STUDIO_CATEGORY_GROUPS = [
  { label: "Photo Studios", matches: ["Photo Studio"] },
  { label: "Sound Stages", matches: ["Film Stage"] },
  { label: "Podcast Rooms", matches: ["Podcast Room", "Podcast Suite"] },
  { label: "Music Suites", matches: ["Music Suite"] },
  { label: "Art Workshops", matches: ["Art Workshop"] },
] as const;

function normalizeCategory(category: string) {
  return category.trim().toLocaleLowerCase().replace(/\s+/g, " ");
}

export function getStudioCategoryValue(category: string) {
  const normalizedCategory = normalizeCategory(category);
  const group = STUDIO_CATEGORY_GROUPS.find(
    ({ label, matches }) =>
      normalizeCategory(label) === normalizedCategory ||
      matches.some((match) => normalizeCategory(match) === normalizedCategory),
  );

  return group?.label ?? category.trim();
}

export function studioMatchesCategory(
  selectedCategory: string,
  studioCategory: string,
) {
  const selectedValue = getStudioCategoryValue(selectedCategory);
  const group = STUDIO_CATEGORY_GROUPS.find(
    ({ label }) => normalizeCategory(label) === normalizeCategory(selectedValue),
  );

  return group
    ? [group.label, ...group.matches].some(
        (match) =>
          normalizeCategory(match) === normalizeCategory(studioCategory),
      )
    : normalizeCategory(selectedValue) === normalizeCategory(studioCategory);
}

export function getStudioCategoryOptions(studios: IStudio[]) {
  const groupedOptions = STUDIO_CATEGORY_GROUPS.map(({ label }) => ({
    label,
    value: label,
  }));
  const otherOptions = Array.from(
    new Set(studios.map((studio) => studio.category.trim())),
  )
    .filter(
      (studioCategory) =>
        !STUDIO_CATEGORY_GROUPS.some(({ label, matches }) => {
          const normalizedCategory = normalizeCategory(studioCategory);
          return (
            normalizeCategory(label) === normalizedCategory ||
            matches.some(
              (match) => normalizeCategory(match) === normalizedCategory,
            )
          );
        }),
    )
    .map((studioCategory) => ({
      label: studioCategory,
      value: studioCategory,
    }));

  return [...groupedOptions, ...otherOptions];
}
