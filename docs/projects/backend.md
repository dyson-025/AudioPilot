# Backend Architecture

## Overview

The AudioPilot backend is built using **FastAPI** and follows a layered architecture that separates API routing, authentication, business logic, database operations, and AI processing into independent modules.

The backend is responsible for:

- User authentication and authorization
- Audio upload and validation
- Speech-to-text transcription
- Audio signal analysis
- AI-powered report generation
- Persistent storage of analyses
- Serving REST APIs to the frontend

The architecture follows the **Separation of Concerns (SoC)** principle, where each module has a clearly defined responsibility.

---

# Backend Goals

The backend is designed to achieve the following goals:

- Build a modular and maintainable codebase
- Keep business logic independent of API routes
- Secure APIs using JWT Authentication
- Centralize configuration management
- Provide scalable AI processing pipelines
- Persist user analyses efficiently
- Allow future integration of RAG and vector search

---

# Backend Directory Structure

```text
server/
│
├── app/
│
├── core/
│   ├── auth.py
│   └── config.py
│
├── db/
│   ├── database.py
│   └── models.py
│
├── routes/
│   ├── auth_routes.py
│   └── audio_routes.py
│
├── schemas/
│   └── auth.py
│
├── services/
│   ├── analysis_service.py
│   ├── audio_analysis.py
│   ├── audio_pipeline.py
│   ├── auth_service.py
│   ├── llm_report.py
│   └── transcription.py
│
└── main.py
```

---

# Layered Architecture

The backend follows a layered architecture where each layer has a single responsibility.

```text
                Client
                   │
                   ▼
            FastAPI Routes
                   │
                   ▼
        Dependency Injection
(Database Session + Current User)
                   │
                   ▼
            Service Layer
                   │
                   ▼
            SQLAlchemy ORM
                   │
                   ▼
              PostgreSQL
                   │
                   ▼
             JSON Response
```

Each request flows through these layers before a response is returned.

---

# Application Startup

The backend starts execution from **main.py**.

During startup the application performs the following steps:

1. Creates the FastAPI application.
2. Initializes database tables.
3. Registers CORS middleware.
4. Registers API routers.
5. Exposes a health check endpoint.

```text
Application Start
        │
        ▼
Create FastAPI App
        │
        ▼
Initialize Database
(Base.metadata.create_all)
        │
        ▼
Configure Middleware
        │
        ▼
Register Routers
        │
        ▼
Application Ready
```

---

# Request Lifecycle

Every API request follows the same execution flow.

```text
HTTP Request
      │
      ▼
FastAPI Route
      │
      ▼
Dependency Injection
(Database Session + Current User)
      │
      ▼
Business Logic
(Service Layer)
      │
      ▼
Database / AI Services
      │
      ▼
Return JSON Response
```

The route layer only coordinates the request.

All processing is delegated to the service layer.

---

# Configuration Management

Application configuration is centralized inside **core/config.py**.

Configuration values are loaded from environment variables using **python-dotenv**.

Current configuration includes:

- SECRET_KEY
- DATABASE_URL
- FRONTEND_URL
- GROQ_API_KEY
- GROQ_MODEL
- Whisper Model
- JWT Algorithm
- Access Token Expiration

Configuration is isolated from business logic, making deployments across environments easier.

---

# Dependency Injection

FastAPI's dependency injection system is used throughout the backend.

Current dependencies include:

- Database Session
- Current Authenticated User

Example flow:

```text
Incoming Request
        │
        ▼
Depends(get_db)
        │
        ▼
Create Database Session
        │
        ▼
Service Layer
        │
        ▼
Automatically Close Session
```

Authentication follows the same pattern.

```text
Incoming Request
        │
        ▼
OAuth2 Token
        │
        ▼
Decode JWT
        │
        ▼
Load User
        │
        ▼
Inject Current User
```

Dependency Injection keeps the route handlers clean while managing shared resources automatically.

---

# Authentication Architecture

Authentication is implemented using:

- OAuth2PasswordBearer
- JWT
- bcrypt password hashing
- jose JWT library

Authentication Flow

```text
Register
      │
      ▼
Hash Password
(bcrypt)
      │
      ▼
Store User
      │
      ▼
Login
      │
      ▼
Verify Password
      │
      ▼
Generate JWT
      │
      ▼
Return Token
      │
      ▼
Protected API Request
      │
      ▼
Decode JWT
      │
      ▼
Retrieve Current User
```

Every protected endpoint receives the authenticated user through dependency injection.

---

# Database Layer

AudioPilot uses **SQLAlchemy ORM** to communicate with PostgreSQL.

Database connectivity is centralized inside **db/database.py**.

Current features include:

- SQLAlchemy Engine
- Session Management
- Declarative Models
- Connection Pooling

Current engine configuration:

- pool_pre_ping
- pool_recycle
- SQLite compatibility for local development
- PostgreSQL support for production

---

## Database Session Lifecycle

Each request receives an isolated database session.

```text
Request
    │
    ▼
SessionLocal()
    │
    ▼
Database Operations
    │
    ▼
Session Closed
```

The session lifecycle is automatically managed using the `get_db()` dependency.

---

# Database Models

The current database contains two primary entities.

## User

Stores:

- Name
- Email
- Password (Hashed)

Each user can own multiple analyses.

---

## Analysis

Stores the result of each processed audio file.

Each analysis includes:

- Uploaded filename
- User question
- Transcript
- AI Report
- Audio metrics
- Timestamp

Stored audio metrics include:

- Clarity Score
- Energy
- Silence Percentage
- Noise Level
- Audio Duration

---

## Entity Relationship

```text
User
 │
 │ 1
 │
 └───────────────┐
                 │
                 │ N
                 ▼
             Analysis
```

One user can own multiple analyses.

Each analysis belongs to exactly one user.

---

# Route Layer

Routes define REST API endpoints and act as the entry point for every request.

Current route groups include:

```text
/api/auth
│
├── Register
├── Login
├── Update Profile
└── Change Password

/api/audio
│
├── Upload Audio
├── Get User Analysis
└── Delete Analysis
```

Routes remain lightweight and delegate business logic to services.

---

# Service Layer

The service layer contains nearly all application logic.

Current services include:

## Authentication Service

Responsible for:

- Registering users
- Authenticating users
- Password hashing
- JWT generation
- Profile updates
- Password updates

---

## Audio Pipeline

Acts as the orchestrator for the complete audio processing workflow.

Responsibilities:

- File validation
- File storage
- Speech transcription
- Audio analysis
- AI report generation

---

## Transcription Service

Uses Whisper Large V3 to convert speech into text.

---

## Audio Analysis Service

Uses Librosa and NumPy to extract signal-based metrics such as:

- Clarity
- Energy
- Silence
- Noise

---

## LLM Report Service

Uses Groq Llama models to generate structured reports using:

- User Question
- Transcript
- Audio Metrics

---

## Analysis Service

Responsible for:

- Saving analyses
- Fetching user analyses
- Deleting analyses

---

# Audio Processing Pipeline

The Audio Pipeline coordinates the complete AI workflow.

```text
Upload Audio
      │
      ▼
Validate File Extension
      │
      ▼
Validate File Size
      │
      ▼
Store Audio
      │
      ▼
Whisper Transcription
      │
      ├──────────────┐
      ▼              ▼
Transcript     Audio Analysis
      │              │
      └──────┬───────┘
             ▼
Generate AI Report
(Groq Llama)
             │
             ▼
Store Analysis
(PostgreSQL)
             │
             ▼
Return Response
```

The pipeline is orchestrated by `audio_pipeline.py`, while individual responsibilities are delegated to specialized services.

---

# Middleware

The backend currently uses **CORS Middleware**.

Responsibilities:

- Allow frontend requests
- Enable credential sharing
- Restrict origins to configured frontend URLs

Middleware is configured during application startup.

---

# Error Handling

Errors are handled using FastAPI's `HTTPException`.

Current validation includes:

- Unsupported file formats
- Maximum file size validation
- Invalid JWT tokens
- User authentication failures
- Missing analyses
- Invalid credentials

---

# Design Principles

The backend follows several software engineering principles:

- Separation of Concerns
- Layered Architecture
- Single Responsibility Principle
- Modular Services
- Dependency Injection
- Reusable Components
- Clean REST API Design

---

# Current Limitations

The current backend does not yet include:

- Background task processing
- Asynchronous job queues
- Retrieval-Augmented Generation (RAG)
- Vector databases
- Redis caching
- Automated testing
- Docker
- CI/CD
- Monitoring and structured logging

These capabilities are planned as part of future releases.

---

# Future Evolution

The backend architecture is intentionally designed to evolve without major structural changes.

Planned improvements include:

- Retrieval-Augmented Generation (RAG)
- pgvector integration
- Semantic search
- Conversational AI
- Redis caching
- Docker & Docker Compose
- GitHub Actions CI/CD
- Automated testing with Pytest
- AI evaluation (Ragas / DeepEval)
- Monitoring & structured logging
