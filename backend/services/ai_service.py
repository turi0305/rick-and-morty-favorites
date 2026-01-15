import os
import requests
from openai import OpenAI

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

RM_API_BASE = "https://rickandmortyapi.com/api"


def find_character_by_name(name: str):
    """
    Verifica si el personaje existe usando la Rick & Morty API oficial.
    Devuelve el personaje si existe, o None si no existe.
    """
    try:
        response = requests.get(
            f"{RM_API_BASE}/character/",
            params={"name": name},
            timeout=10
        )

        if response.status_code == 404:
            return None

        response.raise_for_status()
        data = response.json()
        results = data.get("results", [])

        if not results:
            return None

        # Intentar match exacto (case-insensitive)
        name_lower = name.strip().lower()
        for char in results:
            if char.get("name", "").lower() == name_lower:
                return char

        # Si no hay match exacto, devolver el primero
        return results[0]

    except Exception as e:
        print("Rick & Morty API error:", e)
        return None


def extract_character_name(question: str) -> str:
    """
    Extracción simple del nombre.
    Para este test es suficiente (ej: 'Tell me about Father Bob').
    """
    return (
        question.replace("Tell me about", "")
        .replace("tell me about", "")
        .strip()
    )


def ask_ai_about_character(question: str) -> str:
    character_name = extract_character_name(question)

    character = find_character_by_name(character_name)

    if not character:
        return (
            "I couldn't find that character in the official Rick and Morty database, "
            "so I don't have reliable information about them."
        )

    # Contexto REAL desde la API
    context = {
        "name": character.get("name"),
        "status": character.get("status"),
        "species": character.get("species"),
        "gender": character.get("gender"),
        "origin": character.get("origin", {}).get("name"),
        "location": character.get("location", {}).get("name"),
        "episode_count": len(character.get("episode", [])),
    }

    prompt = f"""
You are an assistant that answers questions about Rick and Morty characters.

Use ONLY the factual data provided below.
If something is not present in the data, say you don't know.

Character data:
{context}

User question: {question}
"""

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt},
        ],
        max_tokens=180,
    )

    return response.choices[0].message.content.strip()
