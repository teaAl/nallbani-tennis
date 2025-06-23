export async function addCourtApi({
  name,
  type,
  indoor,
}: {
  name: string;
  type: string;
  indoor: boolean;
}) {
  const response = await fetch("/api/courts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, type, indoor }),
  });
  if (!response.ok) {
    throw new Error("Failed to add court");
  }
  return response.json();
}
