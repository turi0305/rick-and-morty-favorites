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
    <div>
      {/* Characters */}
      <Characters
        showToast={showToast}
        favorites={favorites}
        refreshFavorites={refreshFavorites}
      />

      {/* Favorites */}
      <Favorites
        showToast={showToast}
        favorites={favorites}
        refreshFavorites={refreshFavorites}
      />

      {/* 🤖 AI Chat */}
      <AiChat showToast={showToast} />
    </div>
  );
}
