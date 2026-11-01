"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";

import { AuthField, AuthLayout, GoogleMark } from "./AuthLayout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";

function getCallbackURL() {
  const requestedURL = new URLSearchParams(window.location.search).get(
    "callbackURL",
  );
  if (!requestedURL) return "/studios";

  let callbackURL: URL;
  try {
    callbackURL = new URL(requestedURL, window.location.origin);
  } catch (error) {
    if (error instanceof TypeError) return "/studios";
    throw error;
  }

  if (callbackURL.origin !== window.location.origin) return "/studios";

  return `${callbackURL.pathname}${callbackURL.search}${callbackURL.hash}`;
}

export default function Login() {
  const router = useRouter();
  const [notice, setNotice] = useState<{
    message: string;
    kind: "error" | "info";
  } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    try {
      const callbackURL = getCallbackURL();
      const { error } = await signIn.email({
        email,
        password,
        callbackURL,
      });

      if (error) {
        setNotice({
          kind: "error",
          message: error.message || "Unable to sign in. Check your details.",
        });
        return;
      }

      router.replace(callbackURL);
    } catch (error) {
      setNotice({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to sign in. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const signInWithGoogle = async () => {
    const callbackURL = getCallbackURL();
    const data = await signIn.social({
      provider: "google",
      callbackURL,
    });


    if (!data) {
      setNotice({
        kind: "info",
        message: "Google sign-in is not connected yet.",
      });
    }
  };

  return (
    <AuthLayout mode="login">
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          signInWithGoogle();
        }}
        className="h-12 w-full gap-3 rounded-xl border-border bg-background/70 font-semibold text-foreground hover:bg-secondary"
      >
        <GoogleMark />
        Continue with Google
      </Button>
      <div className="my-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium text-muted-foreground">
          OR CONTINUE WITH EMAIL
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthField
          id="email"
          label="Email address"
          icon={<Mail className="size-4" />}
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
        />
        <AuthField
          id="password"
          label="Password"
          icon={<LockKeyhole className="size-4" />}
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          autoComplete="current-password"
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

        <div className="flex items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              name="remember"
              className="size-4 rounded border-border accent-primary"
            />
            Remember me
          </label>
          <button
            type="button"
            onClick={() => {
              setNotice({
                kind: "info",
                message: "Password recovery is not available yet.",
              });
            }}
            className="text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Forgot password?
          </button>
        </div>

        {notice && (
          <Alert
            variant={notice.kind === "error" ? "destructive" : "default"}
            className={
              notice.kind === "error"
                ? "rounded-xl border-destructive/25 bg-destructive/5 px-4 py-3 text-sm"
                : "rounded-xl border-primary/25 bg-primary/5 px-4 py-3 text-sm"
            }
          >
            <AlertTitle className="font-semibold">
              {notice.kind === "error" ? "Unable to sign in" : "Not available"}
            </AlertTitle>
            <AlertDescription className="mt-1 leading-5">
              {notice.message}
            </AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="h-12 w-full gap-2 rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-lg shadow-primary/15 transition-all hover:bg-primary/90 hover:shadow-primary/25"
        >
          {isSubmitting ? "Logging in..." : "Log in"}
          <ArrowRight className="size-4" />
        </Button>
      </form>

      <p className="mt-7 text-center text-sm text-muted-foreground">
        New to StudioSpace?{" "}
        <Link
          href="/register"
          className="font-semibold text-foreground transition-colors hover:text-primary"
        >
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
