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
        backgroundColor: "rgba(0,0,0,0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        padding: "10px",
        boxSizing: "border-box",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#2c2c2c",
          padding: "20px",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "400px",
          position: "relative",
          color: "#fff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
          overflowY: "auto",
          maxHeight: "90vh",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            fontSize: "16px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "#fff",
          }}
        >
          ❌
        </button>

        <img src={character.image} alt={character.name} style={{ width: "100%", borderRadius: "12px" }} />
        <h2 style={{ marginTop: "10px" }}>{character.name}</h2>
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
