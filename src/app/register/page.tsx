import type { Metadata } from "next";
import Register from "@/components/auth/Register";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Create your account",
  description:
    "Join StudioSpace to discover bookable creative studios or list your own space for creators.",
  path: "/register",
  noIndex: true,
});

export default function RegisterPage() {
  return <Register />;
}
