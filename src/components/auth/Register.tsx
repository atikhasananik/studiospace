"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Check,
  Circle,
  Eye,
  EyeOff,
  Image as ImageIcon,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";

import { AuthField, AuthLayout } from "./AuthLayout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { signUp } from "@/lib/auth-client";

export default function Register() {
  const router = useRouter();
  const [notice, setNotice] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [registerAttempted, setRegisterAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordRequirements = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "One lowercase letter", valid: /[a-z]/.test(password) },
  ];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRegisterAttempted(true);
    setNotice("");

    if (passwordRequirements.some((requirement) => !requirement.valid)) {
      setNotice("Please meet all password requirements before continuing.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);

    try {
      const { error } = await signUp.email({
        name: String(formData.get("name") ?? "").trim(),
        email: String(formData.get("email") ?? "").trim(),
        password,
        image: String(formData.get("photoUrl") ?? "").trim() || undefined,
        callbackURL: "/studios",
      });

      if (error) {
        setNotice(error.message || "Unable to create your account.");
        return;
      }

      router.refresh();
      router.push('/')
    } catch (error) {
      setNotice(
        error instanceof Error
          ? error.message
          : "Unable to create your account. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout mode="register">
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthField
          id="name"
          label="Full name"
          icon={<UserRound className="size-4" />}
          placeholder="Your name"
          autoComplete="name"
        />
        <AuthField
          id="email"
          label="Email address"
          icon={<Mail className="size-4" />}
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
        />
        <AuthField
          id="photoUrl"
          label="Photo URL"
          icon={<ImageIcon className="size-4" />}
          type="url"
          placeholder="https://example.com/your-photo.jpg"
          autoComplete="url"
          required={false}
        />
        <AuthField
          id="password"
          label="Password"
          icon={<LockKeyhole className="size-4" />}
          type={showPassword ? "text" : "password"}
          placeholder="Create a password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => {
            setPassword(event.currentTarget.value);
            setNotice("");
          }}
          invalid={
            registerAttempted &&
            passwordRequirements.some((requirement) => !requirement.valid)
          }
          trailing={
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-3.5 flex items-center text-muted-foreground transition-colors hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          }
        />

        <ul
          aria-label="Password requirements"
          className="grid gap-1.5 text-xs sm:grid-cols-2"
        >
          {passwordRequirements.map((requirement) => (
            <li
              key={requirement.label}
              className={
                requirement.valid
                  ? "flex items-center gap-1.5 text-accent"
                  : registerAttempted
                    ? "flex items-center gap-1.5 text-destructive"
                    : "flex items-center gap-1.5 text-muted-foreground"
              }
            >
              {requirement.valid ? (
                <Check className="size-3.5" />
              ) : (
                <Circle className="size-3.5" />
              )}
              {requirement.label}
            </li>
          ))}
        </ul>

        {notice && (
          <Alert
            variant="destructive"
            className="rounded-xl border-destructive/25 bg-destructive/5 px-4 py-3 text-sm"
          >
            <AlertTitle className="font-semibold">
              Unable to create account
            </AlertTitle>
            <AlertDescription className="mt-1 leading-5">
              {notice}
            </AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="h-12 w-full gap-2 rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-lg shadow-primary/15 transition-all hover:bg-primary/90 hover:shadow-primary/25"
        >
          {isSubmitting ? "Creating account..." : "Create account"}
          <ArrowRight className="size-4" />
        </Button>
      </form>

      <p className="mt-7 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-foreground transition-colors hover:text-primary"
        >
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
