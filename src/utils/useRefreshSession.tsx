// src/hooks/useRefreshSession.ts
"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function useRefreshSession(refreshInterval = 60000) {
  const { data: session, update } = useSession();

  // Function to refresh the session
  const refreshSession = async () => {
    try {
      await update();
    } catch (error) {
      console.error("Error refreshing session:", error);
    }
  };

  // Initial session refresh on mount
  useEffect(() => {
    refreshSession();
  }, []);

  // Optional: Set up periodic refresh
  useEffect(() => {
    if (refreshInterval > 0) {
      const interval = setInterval(refreshSession, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [refreshInterval]);

  return { session, refreshSession };
}
