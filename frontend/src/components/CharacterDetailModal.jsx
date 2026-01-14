import React from "react";

export default function CharacterDetailModal({ character, onClose }) {
  if (!character) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose} // cerrar al click fuera del modal
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          width: "90%",
          maxWidth: "400px",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()} // evitar cierre al click dentro
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            fontSize: "16px",
          }}
        >
          ❌
        </button>

        <img
          src={character.image}
          alt={character.name}
          style={{ width: "100%", borderRadius: "10px" }}
        />
        <h2>{character.name}</h2>
        <p><strong>Status:</strong> {character.status}</p>
        <p><strong>Species:</strong> {character.species}</p>
        {character.type && <p><strong>Type:</strong> {character.type}</p>}
        {character.gender && <p><strong>Gender:</strong> {character.gender}</p>}
        {character.origin?.name && <p><strong>Origin:</strong> {character.origin.name}</p>}
        {character.location?.name && <p><strong>Location:</strong> {character.location.name}</p>}
      </div>
    </div>
  );
}
