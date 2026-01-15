import { deleteFavorite } from "../services/backendApi";

export default function Favorites({ showToast, favorites, refreshFavorites }) {
  const handleDelete = async (id, name) => {
    try {
      await deleteFavorite(id);
      await refreshFavorites();
      showToast(`${name} removed from favorites`, "success");
    } catch (err) {
      console.error(err);
      showToast("Error deleting favorite", "error");
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
            }}
          >
            <span>{fav.character_name}</span>
            <button
              onClick={() => handleDelete(fav.id, fav.character_name)}
              style={{
                backgroundColor: "#f44336",
                border: "none",
                padding: "8px 12px",
                borderRadius: "6px",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
