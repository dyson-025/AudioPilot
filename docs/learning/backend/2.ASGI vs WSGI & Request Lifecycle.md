# ASGI vs WSGI & Request Lifecycle

## Why Do We Need ASGI?

A web framework needs a way to communicate with a web server.

Instead of talking directly to Nginx or Uvicorn, Python applications communicate through an interface.

There are two major interfaces:

- WSGI (Web Server Gateway Interface)
- ASGI (Asynchronous Server Gateway Interface)

---

# WSGI

WSGI is the traditional Python web standard.

Frameworks using WSGI include:

- Flask
- Django (traditional)
- Pyramid

Request flow:

```text
Browser
    │
    ▼
Web Server
(Gunicorn)
    │
    ▼
WSGI
    │
    ▼
Flask Application
```

Characteristics:

- Synchronous
- One request handled at a time per worker
- Simple
- Mature ecosystem

---

# Problems with WSGI

Suppose a user uploads a 15 MB audio file.

```text
Upload Audio

↓

Wait for Upload

↓

Transcribe

↓

Generate Report
```

While the server is waiting:

- Worker remains occupied
- Cannot efficiently handle other long-running operations

This becomes a bottleneck for AI applications.

---

# ASGI

ASGI is the modern Python standard.

Frameworks using ASGI include:

- FastAPI
- Starlette
- Quart

Request flow:

```text
Browser

↓

Uvicorn

↓

ASGI

↓

FastAPI
```

Unlike WSGI, ASGI supports asynchronous execution.

---

# Why ASGI Matters

Imagine two users.

User A uploads a large audio file.

User B simply opens the dashboard.

With WSGI

```text
Worker

↓

User A

↓

User B waits
```

With ASGI

```text
Worker

↓

User A uploading

↓

Worker switches

↓

Serve User B

↓

Return to User A
```

The server doesn't waste time waiting.

---

# AudioPilot Example

Your upload endpoint is:

```python
@router.post("/upload")
async def upload_audio(...)
```

Because the endpoint is asynchronous,

FastAPI can efficiently wait during file operations without blocking other requests.

---

# Async vs Sync

Synchronous

```text
Task A

↓

Finish

↓

Task B

↓

Finish

↓

Task C
```

Asynchronous

```text
Task A starts

↓

Waiting

↓

Task B runs

↓

Waiting

↓

Task C runs

↓

Resume Task A
```

Async doesn't necessarily make computation faster.

It makes waiting more efficient.

---

# AudioPilot Request Lifecycle

Let's trace a real request.

User uploads an audio file.

```text
React

↓

Axios

↓

POST /api/audio/upload

↓

FastAPI

↓

audio_routes.py

↓

Depends(get_db)

↓

Depends(get_current_user)

↓

process_audio()

↓

transcribe_audio()

↓

analyze_audio()

↓

generate_ai_report()

↓

create_analysis()

↓

PostgreSQL

↓

JSON Response

↓

React Dashboard
```

This is exactly how a request moves through your backend.

---

# Request Lifecycle Inside FastAPI

Internally the flow looks like:

```text
Incoming HTTP Request
        │
        ▼
Uvicorn
        │
        ▼
FastAPI
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
Return HTTP Response
```

Notice that middleware executes both **before** and **after** your route.

---

# Current AudioPilot Startup

When you run

```bash
uvicorn app.main:app --reload
```

FastAPI performs:

```text
Create FastAPI App

↓

Create Database Tables

↓

Configure CORS

↓

Register Routers

↓

Start Listening
```

Then it waits for incoming HTTP requests.

---

# Why AudioPilot Uses ASGI

AudioPilot performs operations such as:

- File uploads
- AI API calls
- Database operations

ASGI allows the backend to remain responsive while these operations are in progress.

This is especially important as the project grows to include:

- Streaming responses
- Background processing
- RAG
- Chat
- WebSockets

---

# Best Practices

- Use `async` only when appropriate.
- Avoid blocking operations inside async functions.
- Keep request handlers lightweight.
- Move heavy logic into services.
- Use background tasks for long-running work.

---

# Common Mistakes

❌ Making everything async without understanding why.

❌ Calling blocking functions inside async endpoints.

❌ Performing heavy computation inside route handlers.

❌ Writing business logic directly in routes.

---

# Interview Questions

1. What is WSGI?
2. What is ASGI?
3. Why does FastAPI use ASGI?
4. Difference between synchronous and asynchronous programming?
5. Does async make code faster?
6. What is Uvicorn?
7. Explain the FastAPI request lifecycle.
8. Why are AI applications better suited for ASGI frameworks?
9. When should you use async?
10. What happens when a request reaches FastAPI?

---

# Summary

ASGI enables FastAPI to efficiently handle concurrent requests, making it well-suited for AI applications like AudioPilot that involve file uploads, external API calls, and future features such as streaming, background tasks, and conversational AI.
