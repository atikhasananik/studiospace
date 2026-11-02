import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Dashboard from "@/components/dashboard/Dashboard";
import { auth } from "@/lib/auth";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Creator Dashboard",
  description:
    "Manage your creative studio listings, bookings, and incoming reservations.",
  path: "/dashboard",
  noIndex: true,
});

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login?callbackURL=%2Fdashboard");
  }

  return (
    <Dashboard
      name={session?.user.name}
      email={session?.user.email}
      image={session?.user.image}
    />
  );
}
