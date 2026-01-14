import { saveFavorite, getFavorites } from "../services/backendApi";
import CharacterDetailModal from "./CharacterDetailModal";
import { useState } from "react";

export default function CharacterCard({ character, favorites, setFavorites, showToast }) {
  const [showModal, setShowModal] = useState(false);

  const handleSave = async () => {
    if (favorites.some(fav => fav.character_id === character.id)) {
      showToast(`${character.name} is already a favorite!`, "warning");
      return;
    }

    try {
      await saveFavorite(character);
      const updatedFavorites = await getFavorites();
      setFavorites(updatedFavorites);

      showToast(`${character.name} saved as favorite!`, "success");
    } catch (err) {
      console.error(err);
      showToast("Error saving favorite", "error");
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

        <button onClick={(e) => { e.stopPropagation(); handleSave(); }}>Save as Favorite</button>
      </div>

      {showModal && <CharacterDetailModal character={character} onClose={() => setShowModal(false)} />}
    </>
  );
}
