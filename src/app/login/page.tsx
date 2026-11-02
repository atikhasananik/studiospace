import type { Metadata } from "next";
import Login from "@/components/auth/Login";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Sign in",
  description:
    "Sign in to manage your StudioSpace listings, bookings, and creative studio reservations.",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return <Login />;
}
