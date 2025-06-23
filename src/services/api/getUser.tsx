import { UserNT } from "@/interfaces/usernt.interface";

export async function getUser(id: string): Promise<UserNT> {
  const response = await fetch(`/api/users/${id}`);

  if (!response.ok) {
    throw new Error(`Error fetching user: ${response.statusText}`);
  }

  const data = await response.json();
  return data.user;
}
