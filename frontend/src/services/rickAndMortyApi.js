const API_URL = import.meta.env.VITE_RICK_MORTY_API;

export async function getCharacters(page = 1) {
  const response = await fetch(`${API_URL}/character?page=${page}`);
  if (!response.ok) {
    throw new Error("Failed to fetch characters");
  }
  return response.json();
}
