export async function UpdateProfile({
  id,
  body,
}: {
  id: string;
  body: {
    avatar?: "avatar1" | "avatar2" | "avatar3" | "avatar4";
    bio: string;
    level?: SkillLevel;
    preferedPlayTime?: PreferedPlayTime;
  };
}): Promise<string> {
  const response = await fetch(`/api/users/${id}/update-profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Error fetching users: ${response.statusText}`);
  }

  const data = await response.json();
  return data.message;
}
