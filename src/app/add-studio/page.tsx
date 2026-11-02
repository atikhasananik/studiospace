import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { AddStudioForm } from "@/components/addStudioForm/AddStudioForm";
import { auth } from "@/lib/auth";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "List a Creative Studio",
  description:
    "Add your photography, film, podcast, music, or production space to StudioSpace.",
  path: "/add-studio",
  noIndex: true,
});

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
