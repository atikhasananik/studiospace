import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getStudioById } from "@/components/data/getData";
import { StudioDetails } from "@/components/studios/StudioDetails";
import { createPageMetadata } from "@/lib/seo";

type StudioPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: StudioPageProps): Promise<Metadata> {
  const { id } = await params;
  const studio = await getStudioById(id);

  if (!studio) {
    return createPageMetadata({
      title: "Studio not found",
      description: "This studio listing could not be found.",
      path: `/studios/${encodeURIComponent(id)}`,
      noIndex: true,
    });
  }

  const location = studio.location ? ` in ${studio.location}` : "";
  const description =
    studio.detailedOverview?.trim().replace(/\s+/g, " ").slice(0, 155) ||
    `Explore ${studio.title}, a ${studio.category.toLowerCase()} studio${location}. View space details and book your next creative session on StudioSpace.`;

  return createPageMetadata({
    title: `${studio.title} | ${studio.category} Studio`,
    description,
    path: `/studios/${encodeURIComponent(id)}`,
    image: studio.imageUrl || undefined,
    imageAlt: `${studio.title} creative studio`,
  });
}

export default async function StudioPage({ params }: StudioPageProps) {
  const { id } = await params;
  const studio = await getStudioById(id);

  if (!studio) notFound();

  return <StudioDetails id={studio._id} />;
}
