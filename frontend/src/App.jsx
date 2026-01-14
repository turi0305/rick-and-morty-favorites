import { useState } from "react";
import Characters from "./pages/Characters";
import Favorites from "./pages/Favorites";

export default function App() {
  const [toast, setToast] = useState({ message: "", type: "success" }); // type: success, error, warning
  const [favorites, setFavorites] = useState([]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "success" }), 3000); // desaparecer después de 3s
  };

  const toastColors = {
    success: "#4caf50",
    error: "#f44336",
    warning: "#ff9800",
  };

  return (
    <div>
      {/* Toast centralizado */}
      {toast.message && (
        <div
          style={{
            position: "fixed",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "10px 20px",
            backgroundColor: toastColors[toast.type],
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "5px",
            zIndex: 2000,
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
            transition: "all 0.5s ease",
            opacity: toast.message ? 1 : 0,
          }}
        >
          {toast.message}
        </div>
      )}

      {/* Componentes */}
      <Characters
        showToast={showToast}
        favorites={favorites}
        setFavorites={setFavorites}
      />
      <Favorites
        showToast={showToast}
        favorites={favorites}
        setFavorites={setFavorites}
      />
    </div>
  );
}
