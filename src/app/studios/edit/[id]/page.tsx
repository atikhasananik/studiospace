import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { AddStudioForm } from "@/components/addStudioForm/AddStudioForm";
import { getMyListingsData } from "@/components/data/getData";
import type { IStudio } from "@/components/type/studio.type";
import { auth } from "@/lib/auth";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Update Studio Listing",
  description: "Edit your StudioSpace creative studio listing.",
  path: "/studios/edit",
  noIndex: true,
});

type UpdateStudioPageProps = {
  params: Promise<{ id: string }>;
};

function normalizeStudios(data: IStudio[] | IStudio | null): IStudio[] {
  if (!data) return [];
  return Array.isArray(data) ? data : [data];
}

export default async function UpdateStudioPage({
  params,
}: UpdateStudioPageProps) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect(`/login?callbackURL=${encodeURIComponent(`/studios/edit/${id}`)}`);
  }

  const email = session.user.email.trim().toLocaleLowerCase();
  const listings = normalizeStudios(await getMyListingsData(email));
  const studio = listings.find(
    (listing) =>
      listing._id === id &&
      (listing.ownerEmail ?? listing.hostEmail ?? "")
        .trim()
        .toLocaleLowerCase() === email,
  );

  if (!studio) notFound();

  return (
    <AddStudioForm
      user={{
        name: session.user.name,
        email: session.user.email,
      }}
      studio={studio}
    />
  );
}
