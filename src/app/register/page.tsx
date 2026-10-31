import type { Metadata } from "next";
import { AuthExperience } from "@/components/auth/AuthExperience";

export const metadata: Metadata = {
  title: "Create an account | StudioSpace",
  description: "Create a StudioSpace account and discover your next creative space.",
};

export default function RegisterPage() {
  return <AuthExperience mode="register" />;
}
