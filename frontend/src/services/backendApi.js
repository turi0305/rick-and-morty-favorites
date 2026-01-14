const BACKEND_URL = import.meta.env.VITE_BACKEND_API;

export async function saveFavorite(character) {
  console.log("SENDING TO BACKEND:", {
    id: character.id,
    name: character.name,
  });

  const response = await fetch(`${BACKEND_URL}/api/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: character.id,
      name: character.name,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to save favorite: ${errorText}`);
  }

  return response.json();
}
