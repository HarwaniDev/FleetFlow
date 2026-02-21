import contextlib
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.db import engine, SessionLocal
import database.models  # Ensure models are imported for table creation
from database.seed import seed_db
from routes.auth_routes import auth_router
from routes.manager_routes import manager_router
from config import settings


@contextlib.asynccontextmanager
async def lifespan(app: FastAPI):
    """
    On startup, seed the database if it's empty.
    """
    async with SessionLocal() as db:
        await seed_db(db)
    yield


app = FastAPI(title="FleetFlow API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(manager_router)

@app.get("/health-check")
async def health_check():
    return {"status": "ok", "message": "FleetFlow server is running"}

def main():
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

if __name__ == "__main__":
    main()
