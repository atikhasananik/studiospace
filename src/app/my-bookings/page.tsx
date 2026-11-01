import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { MyBookings } from "@/components/myBookings/MyBookings";
import { auth } from "@/lib/auth";

export default async function MyBookingsPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login?callbackURL=%2Fmy-bookings");
  }

  return <MyBookings />;
}
