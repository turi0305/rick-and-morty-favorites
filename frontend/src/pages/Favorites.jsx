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
    <div style={{ padding: "20px" }}>
      <h1>Favorites</h1>

      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div style={{ display: "grid", gap: "20px" }}>
          {favorites.map((fav) => (
            <div key={fav.id}>
              <h3>{fav.character_name}</h3>
              <button
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
