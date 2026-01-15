import { deleteFavorite } from "../services/backendApi";

const buttonStyle = {
  marginTop: "8px",
  padding: "8px 12px",
  borderRadius: "6px",
  border: "none",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "14px",
  transition: "0.3s",
  width: "100px",
};

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
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "#fff", marginBottom: "15px" }}>Favorites</h1>

      {favorites.length === 0 ? (
        <p style={{ color: "#ccc" }}>No favorites yet.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "15px",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          {favorites.map((fav) => (
            <div
              key={fav.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#1e1e1e",
                padding: "12px 16px",
                borderRadius: "8px",
                color: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
              }}
            >
              <span>{fav.character_name}</span>
              <button
                style={{ ...buttonStyle, backgroundColor: "#f44336" }}
                onClick={() => handleDelete(fav.id, fav.character_name)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
