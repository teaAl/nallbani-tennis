import { useState, useEffect } from "react";
import { getUsers } from "@/services/api/getUsers";

interface UseUsersResult {
  users: UserNT[] | [];
  loading: boolean;
  error: Error | null;
}

export function useUsers(): UseUsersResult {
  const [users, setUsers] = useState<UserNT[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch user")
        );
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return { users, loading, error };
}
