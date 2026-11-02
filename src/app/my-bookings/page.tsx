import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import MyBookings from "@/components/myBookings/MyBookings";

export default async function MyBookingsPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login?callbackURL=%2Fmy-bookings");
  }

  return <MyBookings email={session.user.email} />;
}
