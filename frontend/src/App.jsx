// App.jsx
import { useState } from "react";
import Characters from "./pages/Characters";
import Favorites from "./pages/Favorites";
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

  // Función para refrescar favoritos en todos los componentes
  const refreshFavorites = async () => {
    try {
      const data = await getFavorites();
      setFavorites(data);
    } catch (err) {
      console.error(err);
      showToast("Error loading favorites", "error");
    }
  };

  return (
    <div>
      {toastMessage && (
        <div style={{
          position: "fixed",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "10px 20px",
          backgroundColor: toastColors[toastType],
          color: "#fff",
          fontWeight: "bold",
          borderRadius: "5px",
          zIndex: 2000,
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
          animation: "fadein 0.3s, fadeout 0.3s 2.7s"
        }}>
          {toastMessage}
        </div>
      )}

      <Characters 
        showToast={showToast} 
        favorites={favorites} 
        refreshFavorites={refreshFavorites} 
      />
      <Favorites 
        showToast={showToast} 
        favorites={favorites} 
        refreshFavorites={refreshFavorites} 
      />
    </div>
  );
}

const toastColors = {
  success: "#4caf50",
  error: "#f44336",
  warning: "#ff9800",
};
