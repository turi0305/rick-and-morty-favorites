import { useState } from "react";
import { deleteFavorite } from "../services/backendApi";

export default function Favorites({ showToast, favorites, refreshFavorites }) {
  const [deletingId, setDeletingId] = useState(null);
  const [clearingAll, setClearingAll] = useState(false);

  const handleDeleteOne = async (id, name) => {
    if (deletingId || clearingAll) return;

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

  const handleDeleteAll = async () => {
    if (clearingAll || favorites.length === 0) return;

    const ok = window.confirm(
      `Delete ALL favorites? This cannot be undone. (${favorites.length} item(s))`
    );
    if (!ok) return;

    try {
      setClearingAll(true);

      // ✅ Opción segura: borrar en secuencia (menos carga al backend)
      for (const fav of favorites) {
        await deleteFavorite(fav.id);
      }

      await refreshFavorites();
      showToast("All favorites deleted", "success");
    } catch (err) {
      console.error(err);
      showToast("Error deleting all favorites", "error");
    } finally {
      setClearingAll(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      {/* ✅ Clear all button */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={handleDeleteAll}
          disabled={favorites.length === 0 || clearingAll || deletingId !== null}
          style={{
            backgroundColor: "#f44336",
            border: "none",
            padding: "10px 14px",
            borderRadius: "8px",
            color: "#fff",
            fontWeight: "bold",
            cursor:
              favorites.length === 0 || clearingAll || deletingId !== null
                ? "not-allowed"
                : "pointer",
            opacity:
              favorites.length === 0 || clearingAll || deletingId !== null ? 0.7 : 1,
          }}
        >
          {clearingAll ? "Deleting All..." : "Delete All"}
        </button>
      </div>

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
              onClick={() => handleDeleteOne(fav.id, fav.character_name)}
              disabled={clearingAll || deletingId === fav.id}
              style={{
                backgroundColor: "#f44336",
                border: "none",
                padding: "8px 12px",
                borderRadius: "6px",
                color: "#fff",
                fontWeight: "bold",
                cursor:
                  clearingAll || deletingId === fav.id ? "not-allowed" : "pointer",
                opacity: clearingAll || deletingId === fav.id ? 0.75 : 1,
              }}
            >
              {clearingAll
                ? "Locked..."
                : deletingId === fav.id
                ? "Deleting..."
                : "Delete"}
            </button>
          </div>
        ))
      )}
    </div>
  );
}
