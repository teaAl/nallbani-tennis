import { useState, useEffect } from "react";
import { getUser } from "@/services/api/getUser";
import { useGlobalState } from "@/context/globalStateContext";

interface UseUserResult {
  user: UserNT | null;
  loading: boolean;
  error: Error | null;
}

export function useUser(id: string): UseUserResult {
  const { user, setUser } = useGlobalState();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userData = await getUser(id);
        setUser(userData);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch user")
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id, setUser]);

  return { user, loading, error };
}
