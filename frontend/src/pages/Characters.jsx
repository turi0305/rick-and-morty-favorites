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

  const goToPage = (p) => setPage(Math.max(1, p));

  return (
    <div style={{ padding: "20px" }}>
      <h1>Rick & Morty Characters</h1>

      {/* ✅ Page quick nav (1–4) */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", margin: "10px 0 20px" }}>
        {[1, 2, 3, 4].map((p) => (
          <button
            key={p}
            onClick={() => goToPage(p)}
            disabled={page === p}
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              border: "1px solid #333",
              backgroundColor: page === p ? "#8aa4ff" : "#1e1e1e",
              color: "#fff",
              cursor: page === p ? "not-allowed" : "pointer",
              opacity: page === p ? 0.85 : 1,
              fontWeight: "bold",
            }}
          >
            {p}
          </button>
        ))}
      </div>

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

      {/* ✅ Existing pagination (kept exactly) */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <button onClick={() => setPage((p) => p + 1)} style={{ marginLeft: "10px" }}>
          Next
        </button>
      </div>
    </div>
  );
}
