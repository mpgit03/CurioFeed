"use client";

import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useCurrentUser } from "@/hooks/useCurrentUser";

const FEED_PATHS = new Set([
  "/my-feed",
  "/explore",
  "/india",
  "/following",
]);

export default function OnboardingGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, error } = useCurrentUser();

  console.log("OnboardingGuard render", {
    pathname,
    loading,
    user,
    error,
  });

  useEffect(() => {
    console.log("OnboardingGuard effect", {
      pathname,
      loading,
      user,
      error,
    });

    if (loading || !user) {
      return;
    }

    if (pathname === "/onboarding") {
      if (user.onboardingCompleted) {
        console.log("OnboardingGuard redirecting from onboarding to /my-feed");
        router.replace("/my-feed");
      }

      return;
    }

    if (!user.onboardingCompleted && FEED_PATHS.has(pathname)) {
      console.log("OnboardingGuard redirecting to /onboarding");
      router.replace("/onboarding");
    }
  }, [loading, pathname, router, user]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-6 py-12 text-sm font-medium text-slate-700">
        <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <LoaderCircle className="h-4 w-4 animate-spin text-violet-500" />
          Loading your account...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-6 py-12 text-sm font-medium text-rose-600">
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 shadow-sm">
          Unable to load your account. Please refresh and try again.
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-6 py-12 text-sm font-medium text-slate-700">
        <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <LoaderCircle className="h-4 w-4 animate-spin text-violet-500" />
          Checking account state...
        </div>
      </div>
    );
  }

  if (!user.onboardingCompleted && FEED_PATHS.has(pathname)) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-6 py-12 text-sm font-medium text-slate-700">
        <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <LoaderCircle className="h-4 w-4 animate-spin text-violet-500" />
          Redirecting to onboarding...
        </div>
      </div>
    );
  }

  if (pathname === "/onboarding" && user.onboardingCompleted) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-6 py-12 text-sm font-medium text-slate-700">
        <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <LoaderCircle className="h-4 w-4 animate-spin text-violet-500" />
          Redirecting to your feed...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
