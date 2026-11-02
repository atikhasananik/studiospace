import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getMyListingsData } from "@/components/data/getData";
import { MyListings } from "@/components/myListings/MyListings";
import { auth } from "@/lib/auth";
import { IStudio } from "@/components/type/studio.type";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "My Studio Listings",
  description: "Manage and update your StudioSpace creative studio listings.",
  path: "/my-listings",
  noIndex: true,
});

export default async function MyListingsPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login?callbackURL=%2Fmy-listings");
  }

  const ownerEmail = session.user.email.trim().toLocaleLowerCase();
  const studios = (await getMyListingsData(ownerEmail)) as IStudio[] | [];

  return <MyListings studios={studios} loadError={studios === null} />;
}
