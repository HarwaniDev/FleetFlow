# FleetFlow

FleetFlow is a comprehensive fleet management system designed for managers, dispatchers, and safety officers to track vehicles, trips, and KPIs efficiently.

## Tech Stack

- **Backend**: FastAPI, SQLAlchemy (Async), PostgreSQL, Alembic, Pydantic v2
- **Infrastructure**: [uv](https://github.com/astral-sh/uv) for dependency management
- **Frontend**: Vite, React, Shadcn UI, Tailwind CSS

---

## 🛠 Backend Setup

### 1. Prerequisites
- Python 3.11+
- [uv](https://docs.astral-sh.sh/uv/getting-started/installation/) installed
- PostgreSQL database

### 2. Environment Configuration
Create a `.env` file in the root directory:
```env
# Database URLs (one for async app, one for sync migrations)
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/fleetflow
DATABASE_URL_ALEMBIC=postgresql+psycopg2://user:password@localhost:5432/fleetflow

# Security
SECRET_KEY=your_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

### 3. Install Dependencies
```bash
uv sync
```

### 4. Run Migrations
Before running the server, apply the database schema:
```bash
uv run alembic upgrade head
```

### 5. Running the Backend
```bash
uv run main.py
```
The server will be available at `http://localhost:8000`. 
Check documentation at `http://localhost:8000/docs`.

####  Automatic Seeding
On the first run, the system will automatically seed the database with:
- Initial users for all roles (`Manager`, `Dispatcher`, etc.)
- 3 Sample Vehicles (Available, On Trip, In Shop)
- Sample Drivers and a Dispatched Trip

---

##  Frontend Setup

The frontend is built with **Vite** and **Shadcn UI**.

### 1. Install Dependencies
```bash
npm install
```

### 2. Running the Frontend
```bash
npm run dev
```

---

##  Role-Based Access Control

- **Manager**: Full access to vehicles, KPIs, and user management.
- **Dispatcher**: Manage trips and driver assignments.
- **Safety Officer**: Monitor safety scores and maintenance.
- **Financial Analyst**: Access cost logs and financial reports.

---

##  Project Structure

- `alembic/`: Database migration scripts.
- `controllers/`: API request handlers.
- `core/`: Security, dependencies, and configuration.
- `database/`: Models, connection setup, and seed data.
- `repositories/`: Data access layer (SQLAlchemy).
- `routes/`: FastAPI router definitions.
- `schemas/`: Pydantic models for validation.
- `services/`: Business logic layer.
