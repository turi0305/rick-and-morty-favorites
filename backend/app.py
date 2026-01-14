from flask import Flask, request, jsonify
import psycopg2
import os

app = Flask(__name__)

DATABASE_URL = os.environ.get("DATABASE_URL")

def get_db_connection():
    return psycopg2.connect(DATABASE_URL)

@app.route("/api/favorites", methods=["POST"])
def save_favorite():
    data = request.json
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO favorites (character_id, character_name) VALUES (%s, %s)",
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
    cur.execute("SELECT * FROM favorites")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(rows)

@app.route("/api/favorites/<int:id>", methods=["DELETE"])
def delete_favorite(id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM favorites WHERE id = %s", (id,))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"message": "Favorite deleted"})
