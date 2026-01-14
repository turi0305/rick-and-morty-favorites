import { useEffect, useState } from "react";
import { getCharacters } from "../services/rickAndMortyApi";
import CharacterCard from "../components/CharacterCard";

export default function Characters({ onFavoriteSaved }) {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadCharacters() {
      try {
        const data = await getCharacters(page);
        setCharacters(data.results);
      } catch (err) {
        console.error(err);
      }
    }

    loadCharacters();
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
            onFavoriteSaved={onFavoriteSaved} // 👈 SE PASA LA FUNCIÓN
          />
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
          Previous
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          style={{ marginLeft: "10px" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
