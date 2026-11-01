import type { Metadata } from "next";
import Register from "@/components/auth/Register";

export const metadata: Metadata = {
  title: "Create an account | StudioSpace",
  description: "Create a StudioSpace account and discover your next creative space.",
};

export default function RegisterPage() {
  return <Register />;
}
