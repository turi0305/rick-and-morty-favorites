from flask import Flask, request, jsonify
import psycopg2
import os

app = Flask(__name__)

DATABASE_URL = os.environ.get("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not set")

def get_db_connection():
    return psycopg2.connect(DATABASE_URL)

@app.route("/api/favorites", methods=["POST"])
def save_favorite():
    data = request.json

    if not data or "character_id" not in data or "character_name" not in data:
        return jsonify({"error": "Invalid payload"}), 400

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        """
        INSERT INTO favorites (character_id, character_name)
        VALUES (%s, %s)
        """,
        (data["character_id"], data["character_name"])
    )
    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"message": "Favorite saved"}), 201

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

if __name__ == "__main__":
    port = int(os.environ.get("BACKEND_PORT", 5000))
    app.run(host="0.0.0.0", port=port)
