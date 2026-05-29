from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from .db.database import engine, Base

from .routes.auth_routes import router as auth_router

from .routes.audio_routes import router as audio_router

from .core.config import FRONTEND_URL

# CREATE DATABASE TABLES
Base.metadata.create_all(bind=engine)

# FASTAPI APP
app = FastAPI(
    title="AudioPilot API",
    description="AI Powered Audio Analysis Backend",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# AUTH ROUTES
app.include_router(
    auth_router,
    prefix="/api/auth",
    tags=["Authentication"]
)

# AUDIO ROUTES
app.include_router(
    audio_router,
    prefix="/api/audio",
    tags=["Audio Analysis"]
)

# HEALTH CHECK
@app.get(
    "/",
    tags=["Health"]
)
def root():

    return {
        "message": "AudioPilot Backend Running",
        "status": "healthy",
        "version": "1.0.0"
    }