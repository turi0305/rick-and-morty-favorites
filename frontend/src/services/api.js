const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function saveFavorite(character) {
  const response = await fetch(`${API_BASE_URL}/api/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      character_id: character.id,
      character_name: character.name,
    }),
  });

  if (!response.ok) {
    throw new Error("Error saving favorite");
  }

  return response.json();
}

export async function getFavorites() {
  const response = await fetch(`${API_BASE_URL}/api/favorites`);

  if (!response.ok) {
    throw new Error("Error fetching favorites");
  }

  return response.json();
}

export async function deleteFavorite(id) {
  const response = await fetch(`${API_BASE_URL}/api/favorites/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error deleting favorite");
  }

  return response.json();
}
