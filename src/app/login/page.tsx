import type { Metadata } from "next";
import { AuthExperience } from "@/components/auth/AuthExperience";

export const metadata: Metadata = {
  title: "Sign in | StudioSpace",
  description: "Sign in to your StudioSpace account and find your next creative space.",
};

export default function LoginPage() {
  return <AuthExperience mode="login" />;
}
