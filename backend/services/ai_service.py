import os
from openai import OpenAI

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

def ask_ai_about_character(question: str) -> str:
    prompt = f"""
You are an assistant that ONLY answers questions about Rick and Morty characters.

Rules:
- If the character does not exist in Rick and Morty, say you don't have information.
- Use simple and clear language.
- Do not invent characters.

Question: {question}
"""

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=150
    )

    return response.choices[0].message.content.strip()
