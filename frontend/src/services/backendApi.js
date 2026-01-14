const API_URL = import.meta.env.VITE_BACKEND_API;

if (!API_URL) {
  console.error("❌ VITE_BACKEND_API is not defined");
} else {
  console.log("✅ Backend API URL:", API_URL);
}

async function parseResponse(response) {
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  return null;
}

export async function saveFavorite(character) {
  const response = await fetch(`${API_URL}/api/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: character.id,
      name: character.name,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to save favorite");
  }

  return parseResponse(response);
}

export async function getFavorites() {
  const response = await fetch(`${API_URL}/api/favorites`);
  if (!response.ok) {
    throw new Error("Failed to load favorites");
  }
  return parseResponse(response);
}

export async function deleteFavorite(id) {
  const response = await fetch(`${API_URL}/api/favorites/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete favorite");
  }

  return parseResponse(response);
}

export async function askAI(question) {
  const response = await fetch(`${API_URL}/api/ai-chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    throw new Error("AI request failed");
  }

  return response.json();
}
