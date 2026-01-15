# 🧪 Rick and Morty Favorites — AI Chat Bonus Feature

This project is a full-stack application that allows users to explore **Rick & Morty characters**, save favorites, and interact with an **AI-powered chat feature** as a bonus functionality.

The application is fully **Dockerized** and can be run on **Linux or Windows (WSL2)**.

---

## 🚀 Features

- Browse Rick & Morty characters
- Save and manage favorites
- Remove favorites
- AI Chat to ask questions about characters (Bonus Feature)
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
- OpenAI API
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

### Option 1: Linux / WSL (Recommended)

```bash
git clone https://github.com/turi0305/rick-and-morty-favorites.git
cd rick-and-morty-favorites
docker compose up --build

Option 2: Windows (without WSL)
bash
Copiar código
git clone https://github.com/turi0305/rick-and-morty-favorites.git
cd rick-and-morty-favorites
docker compose up --build


🔐 Environment Variables
This project uses environment variables in both the backend and the frontend.
You must create two .env files.


📦 Backend .env
Create a .env file in the root of the project

env
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_HOST=
POSTGRES_PORT=
DATABASE_URL=
BACKEND_PORT=
OPENAI_API_KEY=

🌐 Frontend .env
Create a .env file inside the frontend directory:

env
VITE_BACKEND_API=
VITE_RICK_MORTY_API=


🌍 Access the Application

Once the containers are running:
Frontend: http://localhost:5173
Backend API: http://localhost:5000


🗄️ Database Behavior
PostgreSQL runs inside a Docker container

The database and table are created automatically at startup
Favorites are persisted while Docker containers are running
No manual database setup is required
Refresh the page to see the recent changes in the DB 

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
└── .env

Author

Developed by Geovanni Arturo López Calderón
