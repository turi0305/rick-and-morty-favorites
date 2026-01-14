export default function CharacterCard({ character }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
      <img
        src={character.image}
        alt={character.name}
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <h3>{character.name}</h3>
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>

      <button>
        Save as Favorite
      </button>
    </div>
  );
}
