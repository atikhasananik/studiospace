import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Dashboard from "@/components/dashboard/Dashboard";
import { auth } from "@/lib/auth";

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
