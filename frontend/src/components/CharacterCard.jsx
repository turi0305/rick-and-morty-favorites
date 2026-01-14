import { useState } from "react";
import { saveFavorite, deleteFavorite } from "../services/backendApi";
import CharacterDetailModal from "./CharacterDetailModal";

export default function CharacterCard({ character, favorites, refreshFavorites, showToast }) {
  const [showModal, setShowModal] = useState(false);

  // Calcula dinámicamente si el personaje es favorito
  const isFavorite = favorites.some((fav) => fav.character_id === character.id);

  const handleSave = async () => {
    if (isFavorite) {
      showToast(`${character.name} is already a favorite!`, "warning");
      return;
    }
    try {
      await saveFavorite(character);
      await refreshFavorites(); // actualiza favoritos globalmente
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
      await refreshFavorites(); // actualiza favoritos globalmente
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
          cursor: "pointer",
        }}
        onClick={() => setShowModal(true)}
      >
        <img src={character.image} alt={character.name} style={{ width: "100%", borderRadius: "8px" }} />
        <h3>{character.name}</h3>
        <p>Status: {character.status}</p>
        <p>Species: {character.species}</p>

        {isFavorite ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          >
            Remove Favorite
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSave();
            }}
          >
            Save as Favorite
          </button>
        )}
      </div>

      {showModal && <CharacterDetailModal character={character} onClose={() => setShowModal(false)} />}
    </>
  );
}
