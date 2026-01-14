export default function Favorites({ favorites, onFavoriteDeleted }) {
  const handleDelete = async (id) => {
    try {
      await deleteFavorite(id);
      if (onFavoriteDeleted) onFavoriteDeleted();
    } catch (err) {
      console.error(err);
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
