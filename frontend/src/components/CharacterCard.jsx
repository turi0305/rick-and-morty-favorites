import { useMemo, useState } from "react";
import { saveFavorite, deleteFavorite } from "../services/backendApi";
import CharacterDetailModal from "./CharacterDetailModal";

export default function CharacterCard({
  character,
  favorites,
  refreshFavorites,
  showToast,
}) {
  const [showModal, setShowModal] = useState(false);
  const [busy, setBusy] = useState(false);

  const isFavorite = useMemo(
    () => favorites.some((fav) => fav.character_id === character.id),
    [favorites, character.id]
  );

  const handleSave = async () => {
    if (busy) return;

    if (isFavorite) {
      showToast(`${character.name} is already a favorite!`, "warning");
      return;
    }

    try {
      setBusy(true);
      await saveFavorite(character);
      await refreshFavorites(); // ✅ forzará UI update (sin caché por backendApi.js)
      showToast(`${character.name} saved as favorite!`, "success");
    } catch (err) {
      console.error(err);
      showToast("Error saving favorite", "error");
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    if (busy) return;

    try {
      const fav = favorites.find((f) => f.character_id === character.id);
      if (!fav) return;

      setBusy(true);
      await deleteFavorite(fav.id);
      await refreshFavorites();
      showToast(`${character.name} removed from favorites`, "success");
    } catch (err) {
      console.error(err);
      showToast("Error deleting favorite", "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div
        style={{
          border: "1px solid #333",
          padding: "12px",
          borderRadius: "12px",
          backgroundColor: "#1e1e1e",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <img
          src={character.image}
          alt={character.name}
          style={{ width: "100%", borderRadius: "12px", cursor: "pointer" }}
          onClick={() => setShowModal(true)}
        />

        <h3 style={{ margin: "12px 0" }}>{character.name}</h3>
        <p>Status: {character.status}</p>
        <p>Species: {character.species}</p>

        <button
          onClick={isFavorite ? handleDelete : handleSave}
          disabled={busy}
          style={{
            marginTop: "10px",
            padding: "10px 15px",
            borderRadius: "8px",
            border: "none",
            color: "#fff",
            fontWeight: "bold",
            cursor: busy ? "not-allowed" : "pointer",
            width: "100%",
            fontSize: "16px",
            opacity: busy ? 0.7 : 1,
            backgroundColor: isFavorite ? "#f44336" : "#4caf50",
          }}
        >
          {busy ? "Working..." : isFavorite ? "Remove Favorite" : "Save as Favorite"}
        </button>
      </div>

      {showModal && (
        <CharacterDetailModal
          character={character}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
