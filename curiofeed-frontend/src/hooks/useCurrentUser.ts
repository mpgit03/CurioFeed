"use client";

import { useAuth } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";

import { fetchCurrentUser } from "@/services/user";
import { CurrentUser } from "@/types/user";

const userCache = new Map<string, CurrentUser>();
const inFlightRequests = new Map<string, Promise<CurrentUser>>();

export function useCurrentUser() {
  const { getToken, isLoaded, isSignedIn, userId, sessionId } = useAuth();
  console.log("useCurrentUser hook start", {
    isLoaded,
    isSignedIn,
    userId,
    sessionId,
  });
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    console.log("useCurrentUser.refetch start", {
      isLoaded,
      isSignedIn,
      userId,
      sessionId,
    });

    if (!isLoaded) {
      return;
    }

    if (!isSignedIn || !userId) {
      console.log("useCurrentUser.refetch no signed-in user", {
        isSignedIn,
        userId,
      });
      setUser(null);
      setLoading(false);
      setError(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const cachedUser = userCache.get(userId);
      if (cachedUser) {
        console.log("useCurrentUser found cached user", { userId });
        setUser(cachedUser);
      }

      const token = await getToken();
      console.log("useCurrentUser got token", { token: !!token });

      if (!token) {
        throw new Error("Authentication failed");
      }

      const requestKey = `${userId}:${sessionId ?? "session"}`;
      const cachedRequest = inFlightRequests.get(requestKey);

      const currentUser = cachedRequest ?? fetchCurrentUser(token);

      if (!cachedRequest) {
        console.log("useCurrentUser making fetchCurrentUser request", {
          requestKey,
        });
        inFlightRequests.set(requestKey, currentUser);
      } else {
        console.log("useCurrentUser reusing in-flight request", {
          requestKey,
        });
      }

      const resolvedUser = await currentUser;
      console.log("useCurrentUser resolved user", { resolvedUser });
      userCache.set(userId, resolvedUser);
      inFlightRequests.delete(requestKey);
      setUser(resolvedUser);
    } catch (loadError) {
      const message =
        loadError instanceof Error
          ? loadError.message
          : "Failed to fetch current user";

      console.log("useCurrentUser.refetch error", { message, loadError });
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [getToken, isLoaded, isSignedIn, sessionId, userId]);

  useEffect(() => {
    if (!isLoaded) {
      setLoading(true);
      return;
    }

    if (!isSignedIn || !userId) {
      setUser(null);
      setLoading(false);
      setError(null);
      return;
    }

    const cachedUser = userCache.get(userId);
    if (cachedUser) {
      setUser(cachedUser);
      setLoading(false);
    }

    void refetch();
  }, [isLoaded, isSignedIn, refetch, userId]);

  return {
    user,
    loading,
    error,
    refetch,
  };
}
