import { useEffect, useState } from "react";
import Characters from "./pages/Characters";
import Favorites from "./pages/Favorites";
import AiChat from "./components/AiChat";
import { getFavorites } from "./services/backendApi";

export default function App() {
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [favorites, setFavorites] = useState([]);

  const showToast = (msg, type = "success") => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const refreshFavorites = async () => {
    try {
      const data = await getFavorites();
      setFavorites(data);
    } catch (err) {
      console.error(err);
      showToast("Error loading favorites", "error");
    }
  };

  useEffect(() => {
    refreshFavorites();
  }, []);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#121212",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: "20px",
          textAlign: "center",
          backgroundColor: "#1e1e1e",
          fontSize: "24px",
          fontWeight: "bold",
          boxShadow: "0 3px 10px rgba(0,0,0,0.3)",
          flexShrink: 0,
        }}
      >
        Rick & Morty Favorites
      </header>

      {/* Main content */}
      <main style={{ flex: 1, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", boxSizing: "border-box" }}>
        {/* AI Chat */}
        <section style={{ width: "100%", maxWidth: "700px", marginBottom: "40px" }}>
          <AiChat showToast={showToast} />
        </section>

        {/* Characters */}
        <section style={{ width: "100%", maxWidth: "1200px", marginBottom: "40px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Characters</h2>
          <Characters
            showToast={showToast}
            favorites={favorites}
            refreshFavorites={refreshFavorites}
          />
        </section>

        {/* Favorites */}
        <section style={{ width: "100%", maxWidth: "800px", marginBottom: "40px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Your Favorites</h2>
          <Favorites
            showToast={showToast}
            favorites={favorites}
            refreshFavorites={refreshFavorites}
          />
        </section>
      </main>

      {/* Toast */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: toastType === "success" ? "#4caf50" : "#f44336",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
            zIndex: 2000,
          }}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
