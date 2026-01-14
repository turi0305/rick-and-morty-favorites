import { deleteFavorite, getFavorites } from "../services/backendApi";

export default function Favorites({ showToast, favorites, setFavorites }) {
  const loadFavorites = async () => {
    try {
      const data = await getFavorites();
      setFavorites(data);
    } catch (err) {
      console.error(err);
      showToast("Error loading favorites", "error");
    }
  };

  const handleDelete = async (id, name) => {
    try {
      await deleteFavorite(id);
      await loadFavorites();
      showToast(`${name} removed from favorites`, "success");
    } catch (err) {
      console.error(err);
      showToast("Error deleting favorite", "error");
    }
  };

  return (
    <div>
      <h2>⭐ Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet</p>
      ) : (
        <ul>
          {favorites.map((fav) => (
            <li key={fav.id}>
              {fav.character_name}{" "}
              <button onClick={() => handleDelete(fav.id, fav.character_name)}>❌ Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
