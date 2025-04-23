export async function getUsers(): Promise<UserNT[]> {
  const response = await fetch(`/api/users`);

  if (!response.ok) {
    throw new Error(`Error fetching users: ${response.statusText}`);
  }

  const data = await response.json();
  return data.users;
}
