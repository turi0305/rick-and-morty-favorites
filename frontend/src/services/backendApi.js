const API_URL = import.meta.env.VITE_BACKEND_API;

if (!API_URL) {
  console.error("❌ VITE_BACKEND_API is not defined");
}

async function parseJsonSafe(response) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return response.json();
  return null;
}

export async function saveFavorite(character) {
  const response = await fetch(`${API_URL}/api/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({ id: character.id, name: character.name }),
  });

  if (!response.ok) throw new Error("Failed to save favorite");
  return parseJsonSafe(response);
}

export async function getFavorites() {
  const url = `${API_URL}/api/favorites?t=${Date.now()}`;
  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
    headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
  });

  if (!response.ok) throw new Error("Failed to load favorites");
  return parseJsonSafe(response);
}

export async function deleteFavorite(id) {
  const response = await fetch(`${API_URL}/api/favorites/${id}`, {
    method: "DELETE",
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Failed to delete favorite");
  return parseJsonSafe(response);
}

export async function askAI(question) {
  const response = await fetch(`${API_URL}/api/ai-chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({ question }),
  });

  if (!response.ok) throw new Error("AI request failed");
  return response.json();
}
