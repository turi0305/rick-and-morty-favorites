import { useEffect, useState } from "react";
import { getCharacters } from "../services/rickAndMortyApi";
import CharacterCard from "../components/CharacterCard";

export default function Characters({ showToast, favorites, refreshFavorites }) {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);

  const loadCharacters = async () => {
    try {
      const data = await getCharacters(page);
      setCharacters(data.results);
    } catch (err) {
      console.error(err);
      showToast("Error loading characters", "error");
    }
  };

  useEffect(() => {
    loadCharacters();
  }, [page]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Rick & Morty Characters</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "10px",
        }}
      >
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            favorites={favorites}
            refreshFavorites={refreshFavorites}
            showToast={showToast}
          />
        ))}
      </div>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>Previous</button>
        <button onClick={() => setPage((p) => p + 1)} style={{ marginLeft: "10px" }}>
          Next
        </button>
      </div>
    </div>
  );
}
