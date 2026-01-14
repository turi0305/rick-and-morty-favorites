const API_URL = import.meta.env.VITE_BACKEND_API;

if (!API_URL) {
  console.error("❌ VITE_BACKEND_API is not defined");
} else {
  console.log("✅ Backend API URL:", API_URL);
}

// ============================
// HELPER
// ============================
async function parseResponse(response) {
  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  throw new Error(text || "Response is not JSON");
}

// ============================
// SAVE FAVORITE
// ============================
export async function saveFavorite(character) {
  console.log("📤 SENDING TO BACKEND:", {
    id: character.id,
    name: character.name,
  });

  const response = await fetch(`${API_URL}/api/favorites`, {
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
    // Leer mensaje de error del backend si existe
    try {
      const errorData = await parseResponse(response);
      throw new Error(errorData.error || `Failed to save favorite (${response.status})`);
    } catch {
      throw new Error(`Failed to save favorite (${response.status})`);
    }
  }

  return parseResponse(response);
}

// ============================
// GET FAVORITES
// ============================
export async function getFavorites() {
  const response = await fetch(`${API_URL}/api/favorites`);

  if (!response.ok) {
    try {
      const errorData = await parseResponse(response);
      throw new Error(errorData.error || `Failed to load favorites (${response.status})`);
    } catch {
      throw new Error(`Failed to load favorites (${response.status})`);
    }
  }

  return parseResponse(response);
}

// ============================
// DELETE FAVORITE
// ============================
export async function deleteFavorite(id) {
  const response = await fetch(`${API_URL}/api/favorites/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    try {
      const errorData = await parseResponse(response);
      throw new Error(errorData.error || `Failed to delete favorite (${response.status})`);
    } catch {
      throw new Error(`Failed to delete favorite (${response.status})`);
    }
  }

  return parseResponse(response);
}
