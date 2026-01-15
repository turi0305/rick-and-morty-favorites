from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import psycopg2
from psycopg2.extras import RealDictCursor

from services.ai_service import ask_ai_about_character

app = Flask(__name__)
CORS(app)

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not set")

def get_db_connection():
    return psycopg2.connect(DATABASE_URL)

def db_fetch_all(query, params=None):
    params = params or ()
    with get_db_connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, params)
            return cur.fetchall()

def db_execute(query, params=None):
    params = params or ()
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(query, params)
        # conn.commit() ocurre automáticamente al salir del with si no hubo error

@app.route("/api/favorites", methods=["POST"])
def add_favorite():
    data = request.get_json(silent=True) or {}
    character_id = data.get("id")
    character_name = data.get("name")

    if character_id is None or character_name is None:
        return jsonify({"error": "Missing fields"}), 400

    try:
        db_execute(
            """
            INSERT INTO favorites (character_id, character_name)
            VALUES (%s, %s)
            """,
            (character_id, character_name),
        )
        return jsonify({"message": "Favorite saved", "id": character_id, "name": character_name}), 201
    except Exception as e:
        print("DB error:", e)
        return jsonify({"error": "Database error"}), 500

@app.route("/api/favorites", methods=["GET"])
def get_favorites():
    try:
        rows = db_fetch_all(
            """
            SELECT id, character_id, character_name, saved_at
            FROM favorites
            ORDER BY saved_at DESC
            """
        )
        # rows ya viene como dict gracias a RealDictCursor
        return jsonify(rows), 200
    except Exception as e:
        print("DB error:", e)
        return jsonify({"error": "Database error"}), 500

@app.route("/api/favorites/<int:id>", methods=["DELETE"])
def delete_favorite(id):
    try:
        db_execute("DELETE FROM favorites WHERE id = %s", (id,))
        return jsonify({"message": "Favorite deleted"}), 200
    except Exception as e:
        print("DB error:", e)
        return jsonify({"error": "Database error"}), 500

@app.route("/api/ai-chat", methods=["POST"])
def ai_chat():
    data = request.get_json(silent=True) or {}
    question = data.get("question")

    if not question:
        return jsonify({"error": "Question is required"}), 400

    try:
        answer = ask_ai_about_character(question)
        return jsonify({"answer": answer}), 200
    except Exception as e:
        print("AI error:", e)
        return jsonify({"error": "AI service failed"}), 500

if __name__ == "__main__":
    port = int(os.environ.get("BACKEND_PORT", 5000))
    app.run(host="0.0.0.0", port=port)
