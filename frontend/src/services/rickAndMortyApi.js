// src/services/rickAndMortyApi.js

const API_URL = import.meta.env.VITE_RICK_MORTY_API;

if (!API_URL) {
  console.error("❌ VITE_RICK_MORTY_API is not defined");
}

/**
 * Get characters by page (pagination)
 */
export async function getCharacters(page = 1) {
  const response = await fetch(`${API_URL}/character?page=${page}`);

  if (!response.ok) {
    throw new Error("Failed to fetch characters");
  }

  return response.json(); // { info, results }
}

/**
 * Search characters by name
 * - If no results, Rick & Morty API returns 404
 * - We normalize that to an empty result set
 */
export async function searchCharactersByName(name) {
  const query = name.trim();

  if (!query) {
    return { results: [] };
  }

  const response = await fetch(
    `${API_URL}/character/?name=${encodeURIComponent(query)}`
  );

  if (response.status === 404) {
    // No characters found
    return { results: [] };
  }

  if (!response.ok) {
    throw new Error("Failed to search characters");
  }

  return response.json(); // { info, results }
}
