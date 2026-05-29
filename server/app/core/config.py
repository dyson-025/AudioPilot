from dotenv import load_dotenv
import os

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

GROQ_MODEL = os.getenv(
    "GROQ_MODEL",
    "llama-3.1-8b-instant"
)

GROQ_TRANSCRIPTION_MODEL = os.getenv(
    "GROQ_TRANSCRIPTION_MODEL",
    "whisper-large-v3"
)

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./audiopilot.db"
)

FRONTEND_URL = os.getenv(
    "FRONTEND_URL",
    "http://localhost:5173"
)

ACCESS_TOKEN_EXPIRE_DAYS = int(
    os.getenv(
        "ACCESS_TOKEN_EXPIRE_DAYS",
        7
    )
)

JWT_ALGORITHM = os.getenv(
    "JWT_ALGORITHM",
    "HS256"
)