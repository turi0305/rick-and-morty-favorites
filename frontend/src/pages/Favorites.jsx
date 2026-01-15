import { useState } from "react";
import { deleteFavorite } from "../services/backendApi";

export default function Favorites({ showToast, favorites, refreshFavorites }) {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id, name) => {
    if (deletingId) return;

    try {
      setDeletingId(id);
      await deleteFavorite(id);
      await refreshFavorites();
      showToast(`${name} removed from favorites`, "success");
    } catch (err) {
      console.error(err);
      showToast("Error deleting favorite", "error");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        favorites.map((fav) => (
          <div
            key={fav.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#1e1e1e",
              padding: "12px 15px",
              borderRadius: "8px",
              color: "#fff",
              border: "1px solid #2a2a2a",
            }}
          >
            <span>{fav.character_name}</span>

            <button
              onClick={() => handleDelete(fav.id, fav.character_name)}
              disabled={deletingId === fav.id}
              style={{
                backgroundColor: "#f44336",
                border: "none",
                padding: "8px 12px",
                borderRadius: "6px",
                color: "#fff",
                fontWeight: "bold",
                cursor: deletingId === fav.id ? "not-allowed" : "pointer",
                opacity: deletingId === fav.id ? 0.75 : 1,
              }}
            >
              {deletingId === fav.id ? "Deleting..." : "Delete"}
            </button>
          </div>
        ))
      )}
    </div>
  );
}
