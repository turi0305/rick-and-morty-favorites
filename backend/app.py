from flask import Flask, request, jsonify
from flask_cors import CORS
from services.ai_service import ask_ai_about_character
import psycopg2
import os

app = Flask(__name__)
CORS(app)

DATABASE_URL = os.environ.get("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not set")

def get_db_connection():
    return psycopg2.connect(DATABASE_URL)

@app.route("/api/favorites", methods=["POST"])
def add_favorite():
    data = request.get_json()
    print("DATA RECIBIDA:", data)

    if not data:
        return jsonify({"error": "No data received"}), 400

    character_id = data.get("id")
    character_name = data.get("name")

    if character_id is None or character_name is None:
        return jsonify({"error": "Missing fields"}), 400

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute(
        """
        INSERT INTO favorites (character_id, character_name)
        VALUES (%s, %s)
        """,
        (character_id, character_name)
    )

    conn.commit()
    cur.close()
    conn.close()

    return jsonify({
        "message": "Favorite saved",
        "id": character_id,
        "name": character_name
    }), 201


@app.route("/api/favorites", methods=["GET"])
def get_favorites():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        """
        SELECT id, character_id, character_name, saved_at
        FROM favorites
        ORDER BY saved_at DESC
        """
    )
    rows = cur.fetchall()
    cur.close()
    conn.close()

    favorites = [
        {
            "id": row[0],
            "character_id": row[1],
            "character_name": row[2],
            "saved_at": row[3]
        }
        for row in rows
    ]

    return jsonify(favorites)

@app.route("/api/favorites/<int:id>", methods=["DELETE"])
def delete_favorite(id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM favorites WHERE id = %s", (id,))
    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"message": "Favorite deleted"}), 200

@app.route("/api/ai-chat", methods=["POST"])
def ai_chat():
    data = request.get_json()
    question = data.get("question")

    if not question:
        return jsonify({"error": "Question is required"}), 400

    try:
        answer = ask_ai_about_character(question)
        return jsonify({ "answer": answer })
    except Exception as e:
        print(e)
        return jsonify({"error": "AI service failed"}), 500




if __name__ == "__main__":
    port = int(os.environ.get("BACKEND_PORT", 5000))
    app.run(host="0.0.0.0", port=port)
