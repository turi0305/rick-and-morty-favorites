export default function Favorites({ showToast, favorites, refreshFavorites }) {
  const handleDelete = async (id, name) => {
    try {
      // Borra favorito del backend
      await fetch(`http://192.168.81.245:5000/api/favorites/${id}`, {
        method: "DELETE",
      });
      await refreshFavorites(); // actualiza estado global
      showToast(`${name} removed from favorites`, "success");
    } catch (err) {
      console.error(err);
      showToast("Error deleting favorite", "error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Favorites</h1>

      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
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
          {favorites.map((fav) => (
            <div
              key={fav.character_id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
                position: "relative",
              }}
            >
              <h3>{fav.character_name}</h3>
              <p>Saved at: {new Date(fav.saved_at).toLocaleString()}</p>
              <button
                onClick={() => handleDelete(fav.id, fav.character_name)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: "#f44336",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
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
