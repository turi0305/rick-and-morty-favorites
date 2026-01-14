import os
from openai import OpenAI

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

def ask_ai_about_character(question: str) -> str:
    response = client.responses.create(
        model="gpt-4.1-mini",
        input=f"""
You are an assistant that answers questions about Rick and Morty characters.
Use simple, clear language.

Question: {question}
"""
    )

    return response.output_text
