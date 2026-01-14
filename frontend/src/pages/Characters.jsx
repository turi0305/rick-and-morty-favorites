import { useEffect, useState } from "react";
import { getCharacters } from "../services/rickAndMortyApi";
import { getFavorites } from "../services/backendApi";
import CharacterCard from "../components/CharacterCard";

export default function Characters({ showToast, favorites, setFavorites }) {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);

  const loadFavorites = async () => {
    try {
      const data = await getFavorites();
      setFavorites(data);
    } catch (err) {
      console.error(err);
      showToast("Error loading favorites", "error");
    }
  };

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const data = await getCharacters(page);
        setCharacters(data.results);
      } catch (err) {
        console.error(err);
        showToast("Error loading characters", "error");
      }
    };

    loadCharacters();
    loadFavorites();
  }, [page]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Rick & Morty Characters</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            favorites={favorites}
            setFavorites={setFavorites}
            showToast={showToast}
          />
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>Previous</button>
        <button onClick={() => setPage((p) => p + 1)} style={{ marginLeft: "10px" }}>
          Next
        </button>
      </div>
    </div>
  );
}
