import { notFound } from "next/navigation";

import { getStudioById } from "@/components/data/getData";
import { StudioDetails } from "@/components/studios/StudioDetails";

type StudioPageProps = {
  params: Promise<{ id: string }>;
};

export default async function StudioPage({ params }: StudioPageProps) {
  const { id } = await params;
  const studio = await getStudioById(id);

  if (!studio) notFound();

  return <StudioDetails studio={studio} />;
}
