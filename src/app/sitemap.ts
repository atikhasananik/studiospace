import type { MetadataRoute } from "next";

import { getAllData } from "@/components/data/getData";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: new URL("/", SITE_URL).toString(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: new URL("/studios", SITE_URL).toString(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const studios = await getAllData();
  if (!studios) return staticRoutes;

  const studioRoutes = studios.map((studio) => ({
    url: new URL(`/studios/${encodeURIComponent(studio._id)}`, SITE_URL).toString(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
    ...(studio.imageUrl ? { images: [studio.imageUrl] } : {}),
  }));

  return [...staticRoutes, ...studioRoutes];
}
