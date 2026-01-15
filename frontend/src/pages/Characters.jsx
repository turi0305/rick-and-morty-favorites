import { useEffect, useState } from "react";
import { getCharacters, searchCharactersByName } from "../services/rickAndMortyApi";
import CharacterCard from "../components/CharacterCard";

export default function Characters({ showToast, favorites, refreshFavorites }) {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);

  // ✅ Search states
  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadCharacters = async () => {
    try {
      setLoading(true);
      const data = await getCharacters(page);
      setCharacters(data.results);
    } catch (err) {
      console.error(err);
      showToast("Error loading characters", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // ✅ Only load paginated list when NOT searching
    if (!isSearching) loadCharacters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, isSearching]);

  const goToPage = (p) => setPage(Math.max(1, p));

  const handleSearch = async () => {
    const q = searchText.trim();
    if (!q) {
      showToast("Type a character name to search", "warning");
      return;
    }

    try {
      setLoading(true);

      const data = await searchCharactersByName(q);
      const results = data?.results || [];

      // ✅ Best UX: keep current list and only notify
      if (results.length === 0) {
        showToast(`No character found for "${q}"`, "warning");
        return;
      }

      setCharacters(results);
      setIsSearching(true);
      showToast(`Found ${results.length} result(s) for "${q}"`, "success");
    } catch (err) {
      console.error(err);
      showToast("Error searching characters", "error");
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchText("");
    setIsSearching(false);
    // opcional: volver a la 1 para que se sienta "reset"
    // setPage(1);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Rick & Morty Characters</h1>

      {/* ✅ Search bar */}
      <div style={{ display: "flex", gap: "10px", justifyContent: "center", margin: "10px 0 20px" }}>
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder='Search by name (e.g., "Rick", "Father Bob")'
          style={{
            width: "min(520px, 100%)",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #333",
            backgroundColor: "#1e1e1e",
            color: "#fff",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />

        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>

        {isSearching && (
          <button
            onClick={clearSearch}
            disabled={loading}
            style={{ backgroundColor: "#f44336", color: "#fff" }}
          >
            Clear
          </button>
        )}
      </div>

      {/* ✅ Quick page nav (1–4) — disabled while searching */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", margin: "0 0 20px" }}>
        {[1, 2, 3, 4].map((p) => (
          <button
            key={p}
            onClick={() => goToPage(p)}
            disabled={isSearching || page === p || loading}
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              border: "1px solid #333",
              backgroundColor: page === p ? "#8aa4ff" : "#1e1e1e",
              color: "#fff",
              cursor: isSearching || page === p ? "not-allowed" : "pointer",
              opacity: isSearching || page === p ? 0.75 : 1,
              fontWeight: "bold",
            }}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Cards grid */}
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

      {/* ✅ Keep Next/Previous but disable while searching */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={isSearching || page === 1 || loading}
        >
          Previous
        </button>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={isSearching || loading}
          style={{ marginLeft: "10px" }}
        >
          Next
        </button>

        {isSearching && (
          <p style={{ marginTop: "10px", opacity: 0.85 }}>
            Pagination is disabled while searching. Click <b>Clear</b> to return.
          </p>
        )}
      </div>
    </div>
  );
}
