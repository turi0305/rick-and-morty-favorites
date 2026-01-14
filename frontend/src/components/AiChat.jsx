import { useState } from "react";
import { askAI } from "../services/backendApi";

export default function AiChat({ showToast }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) {
      showToast("Please enter a question", "warning");
      return;
    }

    try {
      setLoading(true);
      setAnswer("");

      const res = await askAI(question);
      setAnswer(res.answer);
    } catch (err) {
      console.error(err);
      showToast("Error contacting AI", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "0 auto" }}>
      <h2>Ask AI about Rick & Morty</h2>

      <textarea
        rows="3"
        placeholder="Ask something about a character..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ width: "100%", padding: "10px" }}
      />

      <button onClick={handleAsk} disabled={loading} style={{ marginTop: "10px" }}>
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {answer && (
        <div
  style={{
    marginTop: "20px",
    padding: "15px",
    background: "#f5f5f5",
    borderRadius: "8px",
    color: "#000",       
  }}
>
  <strong>Answer:</strong>
  <p style={{ marginTop: "8px" }}>{answer}</p>
</div>
      )}
    </div>
  );
}
