# FastAPI Application & Project Lifecycle

## Overview

Every FastAPI application begins with creating a FastAPI instance. This object becomes the central application that receives incoming HTTP requests, routes them to the appropriate handlers, and returns responses to clients.

In AudioPilot, the application lifecycle is managed inside **main.py**.

---

# Application Entry Point

The backend starts with the following command:

```bash
uvicorn app.main:app --reload
```

Breaking it down:

- **uvicorn** → ASGI server
- **app.main** → Python module containing the FastAPI application
- **app** → FastAPI application instance
- **--reload** → Automatically restart the server when source files change

---

# What Happens During Startup?

When the backend starts, FastAPI performs several initialization steps before accepting requests.

Current startup flow:

```text
Start Uvicorn
        │
        ▼
Import app.main
        │
        ▼
Execute Python File
        │
        ▼
Create Database Tables
        │
        ▼
Create FastAPI Application
        │
        ▼
Register Middleware
        │
        ▼
Register Routers
        │
        ▼
Application Ready
```

Only after these steps are complete does the application begin listening for incoming HTTP requests.

---

# Creating the FastAPI Application

AudioPilot creates the application using:

```python
app = FastAPI(
    title="AudioPilot API",
    description="AI Powered Audio Analysis Backend",
    version="1.0.0"
)
```

This object is responsible for:

- Registering routes
- Managing middleware
- Handling dependency injection
- Processing requests
- Returning responses
- Generating API documentation

Everything in the backend is attached to this application object.

---

# Database Initialization

Before the application starts serving requests, the database tables are created.

```python
Base.metadata.create_all(bind=engine)
```

Purpose:

- Detect all SQLAlchemy models
- Create missing database tables
- Prepare the database for use

Current tables include:

- users
- analyses

---

# Middleware Registration

AudioPilot currently registers CORS middleware.

```python
app.add_middleware(
    CORSMiddleware,
    ...
)
```

Purpose:

- Allow frontend requests
- Enable credentials
- Restrict allowed origins
- Handle browser security policies

Every request passes through middleware before reaching a route.

---

# Router Registration

Instead of placing every endpoint inside one file, AudioPilot organizes APIs into routers.

Current routers:

```python
auth_router

audio_router
```

Registration:

```python
app.include_router(
    auth_router,
    prefix="/api/auth",
    tags=["Authentication"]
)

app.include_router(
    audio_router,
    prefix="/api/audio",
    tags=["Audio Analysis"]
)
```

Benefits:

- Modular code
- Better organization
- Easier maintenance
- Clear API grouping

---

# Health Check Endpoint

AudioPilot exposes a simple health endpoint.

```python
@app.get("/")
```

Purpose:

- Verify backend availability
- Test deployments
- Confirm the server is running

Example response:

```json
{
    "message": "AudioPilot Backend Running",
    "status": "healthy",
    "version": "1.0.0"
}
```

---

# Complete Startup Flow

The startup process of AudioPilot can be visualized as:

```text
Run Uvicorn
      │
      ▼
Import main.py
      │
      ▼
Load Configuration
      │
      ▼
Create Database Tables
      │
      ▼
Create FastAPI App
      │
      ▼
Register Middleware
      │
      ▼
Register Routers
      │
      ▼
Expose Health Endpoint
      │
      ▼
Server Starts Listening
```

---

# Request Processing After Startup

Once initialization is complete, every request follows this lifecycle:

```text
HTTP Request
      │
      ▼
Middleware
      │
      ▼
Route Matching
      │
      ▼
Dependency Injection
      │
      ▼
Request Validation
      │
      ▼
Route Function
      │
      ▼
Service Layer
      │
      ▼
Database / AI Services
      │
      ▼
Generate Response
      │
      ▼
Middleware
      │
      ▼
HTTP Response
```

---

# Why This Architecture?

Separating startup responsibilities makes the application easier to understand and maintain.

Each startup step has a single responsibility:

- Database initialization
- Middleware configuration
- Route registration
- Application configuration

This modular approach also simplifies future additions such as:

- Redis initialization
- Logging
- Background workers
- Startup events
- AI model loading

---

# Best Practices

- Keep `main.py` lightweight.
- Register routers instead of defining routes directly.
- Centralize configuration.
- Initialize shared resources during startup.
- Keep startup logic simple and predictable.

---

# Common Mistakes

❌ Writing business logic in `main.py`.

❌ Creating database sessions globally.

❌ Hardcoding configuration values.

❌ Registering all routes in a single file.

❌ Performing expensive computations during application startup.

---

# Interview Questions

1. What is the purpose of `FastAPI()`?
2. What happens when `uvicorn app.main:app --reload` is executed?
3. Why use `include_router()`?
4. Why is `main.py` called the application entry point?
5. What is middleware registration?
6. Why is `Base.metadata.create_all()` called?
7. What is a health check endpoint?
8. What happens before FastAPI starts accepting requests?
9. Why should `main.py` remain lightweight?
10. How would you initialize Redis during application startup?

---

# Summary

`main.py` serves as the entry point of the AudioPilot backend. It initializes the database, creates the FastAPI application, registers middleware and routers, and prepares the server to handle incoming requests. Keeping startup responsibilities modular results in a cleaner, more maintainable backend architecture.
