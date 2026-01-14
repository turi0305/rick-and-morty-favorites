import { useState } from "react";
import { saveFavorite, deleteFavorite } from "../services/backendApi";
import CharacterDetailModal from "./CharacterDetailModal";

export default function CharacterCard({
  character,
  favorites,
  refreshFavorites,
  showToast,
}) {
  const [showModal, setShowModal] = useState(false);

  const isFavorite = favorites.some(
    (fav) => fav.character_id === character.id
  );

  const handleSave = async () => {
    try {
      await saveFavorite(character);
      await refreshFavorites();
      showToast(`${character.name} saved as favorite!`, "success");
    } catch (err) {
      console.error(err);
      showToast("Error saving favorite", "error");
    }
  };

  const handleDelete = async () => {
    try {
      const fav = favorites.find((f) => f.character_id === character.id);
      if (!fav) return;

      await deleteFavorite(fav.id);
      await refreshFavorites();
      showToast(`${character.name} removed from favorites`, "success");
    } catch (err) {
      console.error(err);
      showToast("Error deleting favorite", "error");
    }
  };

  return (
    <>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        {/* CLICK SOLO PARA ABRIR MODAL */}
        <img
          src={character.image}
          alt={character.name}
          style={{
            width: "100%",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={() => setShowModal(true)}
        />

        <h3>{character.name}</h3>
        <p>Status: {character.status}</p>
        <p>Species: {character.species}</p>

        {isFavorite ? (
          <button onClick={handleDelete}>
            Remove Favorite
          </button>
        ) : (
          <button onClick={handleSave}>
            Save as Favorite
          </button>
        )}
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
