import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getMyListingsData } from "@/components/data/getData";
import { MyListings } from "@/components/studios/MyListings";
import { auth } from "@/lib/auth";
import { IStudio } from "@/components/type/studio.type";

export default async function MyListingsPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login?callbackURL=%2Fmy-listings");
  }

  const ownerEmail = session.user.email.trim().toLocaleLowerCase();
  const studios = (await getMyListingsData(ownerEmail)) as IStudio[] | [];

  return <MyListings studios={studios} loadError={studios === null} />;
}
