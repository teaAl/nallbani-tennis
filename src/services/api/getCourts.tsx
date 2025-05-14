export async function getCourts(): Promise<any> {
  const response = await fetch(`/api/courts`);

  if (!response.ok) {
    throw new Error(`Error fetching users: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
