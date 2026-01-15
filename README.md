# 🧪 Rick and Morty Favorites — AI Chat Bonus Feature

This project is a full-stack application that allows users to explore **Rick & Morty characters**, save favorites, and interact with an **AI-powered chat feature** as an optional bonus.

The application is fully **Dockerized** and can be run on **Linux or Windows (WSL2)**.

---

## 🚀 Features

- Browse Rick & Morty characters from the public API
- View character image, name, status, and species
- Pagination (Next / Previous + direct page navigation)
- Character detail modal
- Save and remove favorite characters
- Bulk delete favorites
- AI Chat to ask questions about characters (**Bonus Feature**)
- AI Chat verifies character existence using the official Rick & Morty API before generating an answer
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
- PostgreSQL
- OpenAI API (Bonus)
- Docker

---

## 📦 Requirements

You only need:

- Docker
- Docker Compose

### For Windows users
- Docker Desktop
- WSL2 enabled (recommended)
- Ubuntu installed in WSL (optional)

---

## ▶️ Running the Project

### Linux / WSL (Recommended)

```bash
git clone https://github.com/turi0305/rick-and-morty-favorites.git
cd rick-and-morty-favorites
docker compose up --build
Windows (without WSL)
bash
git clone https://github.com/turi0305/rick-and-morty-favorites.git
cd rick-and-morty-favorites
docker compose up --build
🔐 Environment Variables
This project uses environment variables for both the backend and the frontend.

You must create two .env files.

📦 Backend .env
Create a .env file in the root of the project:

env
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_HOST=
POSTGRES_PORT=
DATABASE_URL=
BACKEND_PORT=
OPENAI_API_KEY=
OPENAI_API_KEY is optional and only required for the AI Chat bonus feature.

🌐 Frontend .env
Create a .env file inside the frontend directory:

env
VITE_BACKEND_API=http://localhost:5000
VITE_RICK_MORTY_API=https://rickandmortyapi.com/api


🌍 Access the Application
Once the containers are running:

Frontend: http://localhost:5173
Backend API: http://localhost:5000


🗄️ Database Behavior
PostgreSQL runs inside a Docker container
The database and table are created automatically at startup
Favorites are persisted while Docker containers are running
No manual database setup is required
Refresh the page to see recent database changes


🔌 Backend API
Required Endpoints
The required backend includes only these endpoints:
POST /api/favorites — Save a favorite character
GET /api/favorites — Get all saved favorites
DELETE /api/favorites/:id — Delete a favorite
Bonus Endpoint (Optional)
POST /api/ai-chat — AI-powered chat about characters (requires OPENAI_API_KEY)


📁 Project Structure
text
Copiar código
rick-and-morty-favorites/
├── backend/
│   ├── app.py
│   ├── services/
│   │   └── ai_service.py
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── services/
│   └── Dockerfile
├── db/
│   └── init.sql
├── docker-compose.yml
└── .env.example


👤 Author
Developed by Geovanni Arturo López Calderón