import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import MyBookings from "@/components/myBookings/MyBookings";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "My Studio Bookings",
  description:
    "View and manage your creative studio reservations and upcoming sessions.",
  path: "/my-bookings",
  noIndex: true,
});

export default async function MyBookingsPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login?callbackURL=%2Fmy-bookings");
  }

  return <MyBookings email={session.user.email} />;
}
