import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { AddStudioForm } from "@/components/studios/AddStudioForm";
import { auth } from "@/lib/auth";

export default async function AddStudioPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login?callbackURL=%2Fadd-studio");
  }

  return (
    <AddStudioForm
      user={{
        name: session.user.name,
        email: session.user.email,
      }}
    />
  );
}
