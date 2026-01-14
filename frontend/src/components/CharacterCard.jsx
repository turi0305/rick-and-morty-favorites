import { saveFavorite } from "../services/backendApi";

export default function CharacterCard({ character }) {

const handleSave = async () => {
  console.log("CLICK SAVE", character);

  try {
    await saveFavorite(character);
    alert(`${character.name} saved as favorite!`);
  } catch (error) {
    console.error(error);
    alert("Error saving favorite");
  }
};


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

      <button onClick={handleSave}>
        Save as Favorite
      </button>
    </div>
  );
}
