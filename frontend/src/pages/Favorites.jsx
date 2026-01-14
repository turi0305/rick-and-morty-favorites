import { deleteFavorite } from "../services/backendApi";

export default function Favorites({ favorites, onFavoriteUpdated }) {
  const handleDelete = async (id) => {
    try {
      await deleteFavorite(id); // Borra del backend
      if (onFavoriteUpdated) onFavoriteUpdated(); // 🔄 Actualiza lista
    } catch (err) {
      console.error(err);
      alert("Error deleting favorite");
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
              <button onClick={() => handleDelete(fav.id)}>❌ Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
