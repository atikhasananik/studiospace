import type { Metadata } from "next";
import { AuthExperience } from "@/components/auth/AuthExperience";

export const metadata: Metadata = {
  title: "Reset password | StudioSpace",
  description: "Reset the password for your StudioSpace account.",
};

export default function ForgotPasswordPage() {
  return <AuthExperience mode="forgot-password" />;
}
