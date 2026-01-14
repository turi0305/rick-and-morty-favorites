# 🧪 Rick and Morty Favorites — AI Chat Bonus Feature

This project is a full-stack application that allows users to explore **Rick & Morty characters**, save favorites, and interact with an **AI-powered chat feature** as a bonus functionality.

The application is fully **Dockerized** and can be run on **Linux or Windows (WSL2)**.

---

## 🚀 Features

- Browse Rick & Morty characters
- Save and manage favorites
- AI Chat to ask questions about characters *(Bonus Feature)*
- Dark theme UI
- REST API backend
- Fully containerized with Docker

---

## 🧱 Tech Stack

### Frontend
- React + Vite
- JavaScript
- Docker

### Backend
- Python (Flask)
- OpenAI API
- PostgreSQL
- Docker

---

## 📦 Requirements

You only need:

- Docker
- Docker Compose

### For Windows users
- Docker Desktop
- WSL2 enabled (recommended)
- Ubuntu installed in WSL

---

### Running the Project
Option 1: Linux / WSL (Recommended)
git clone https://github.com/turi0305/rick-and-morty-favorites.git
cd rick-and-morty-favorites
docker compose up --build

Option 2: Windows (without WSL)
git clone https://github.com/turi0305/rick-and-morty-favorites.git
cd rick-and-morty-favorites
docker compose up --build

## 🔐 Environment Variables

This project uses **environment variables in both the backend and the frontend**.

You must create **two `.env` files**:

---

### 📦 Backend `.env`

Create a `.env` file in the **root of the project**:

```env
OPENAI_API_KEY=your_openai_api_key_here
DATABASE_URL=your_db_url

