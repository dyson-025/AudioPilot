# Database Design

## Overview

AudioPilot uses **PostgreSQL** as its primary relational database and **SQLAlchemy ORM** for database interaction.

The database stores user accounts, audio analyses, transcripts, AI-generated reports, and extracted audio metrics.

The design is intentionally simple and normalized to support the current feature set while remaining extensible for future enhancements such as Retrieval-Augmented Generation (RAG) and semantic search.

---

# Why PostgreSQL?

PostgreSQL was selected because it provides:

- ACID compliance
- Excellent SQL support
- Strong relational modeling
- Mature ecosystem
- High performance
- Compatibility with SQLAlchemy
- Future support for pgvector

As the project evolves, PostgreSQL can be extended with the **pgvector** extension without requiring a database migration.

---

# Database Architecture

```text
FastAPI
     │
     ▼
SQLAlchemy ORM
     │
     ▼
PostgreSQL
```

The application never communicates directly with SQL queries. Instead, SQLAlchemy ORM maps Python objects to database tables.

---

# Entity Relationship Diagram

```text
                User
─────────────────────────────────
id
name
email
password
─────────────────────────────────
        │
        │ 1
        │
        │
        │ N
─────────────────────────────────
             Analysis
─────────────────────────────────
id
user_id
filename
question
transcript
ai_report

clarity_score
energy
silence_percentage
noise_level
duration

created_at
─────────────────────────────────
```

---

# Relationships

Current relationship:

```text
One User
      │
      │
      ▼
Many Analyses
```

Every analysis belongs to exactly one user.

A user can own multiple analyses.

SQLAlchemy Relationship:

```python
User
    analyses

Analysis
    user
```

---

# User Table

Stores application users.

## Columns

| Column | Type | Description |
|---------|------|-------------|
| id | Integer | Primary Key |
| name | String | User name |
| email | String | Unique email |
| password | String | Hashed password |

---

## Constraints

- Email must be unique.
- Passwords are never stored in plain text.
- Every user has a unique identifier.

---

# Analysis Table

Stores one complete audio analysis.

## Columns

| Column | Description |
|---------|-------------|
| filename | Uploaded audio filename |
| question | User prompt |
| transcript | Whisper transcription |
| ai_report | AI generated report |
| clarity_score | Audio clarity |
| energy | Signal energy |
| silence_percentage | Silence ratio |
| noise_level | Estimated noise |
| duration | Audio duration |
| created_at | Timestamp |

---

# Database Session Management

AudioPilot uses SQLAlchemy sessions.

Each request follows:

```text
Create Session

↓

Execute Queries

↓

Commit / Read

↓

Close Session
```

Sessions are managed using FastAPI Dependency Injection.

---

# SQLAlchemy ORM

The ORM is responsible for:

- Mapping Python classes to tables
- Creating SQL queries
- Managing relationships
- Handling transactions

Benefits:

- Less raw SQL
- Better maintainability
- Easier migrations
- Cleaner code

---

# Current Data Flow

```text
Upload Audio
      │
      ▼
Generate Analysis
      │
      ▼
Create Analysis Object
      │
      ▼
SQLAlchemy
      │
      ▼
PostgreSQL
```

---

# Current Database Responsibilities

The database currently stores:

- User Accounts
- Audio Metadata
- User Questions
- Audio Transcripts
- AI Reports
- Audio Metrics
- Analysis History

---

# Current Limitations

The current schema does not yet include:

- Embeddings
- Conversation History
- Chat Sessions
- Vector Search
- Cached AI Responses

These will be introduced in future versions.

---

# Future Database Evolution

The planned schema after introducing RAG will look similar to:

```text
User
 │
 ├── Analysis
 │
 ├── AudioChunk
 │
 ├── Embedding
 │
 └── ChatHistory
```

Future additions include:

- pgvector
- Embedding storage
- Semantic search
- Conversation history
- Retrieval metadata

---

# Design Principles

The current database design emphasizes:

- Simplicity
- Data integrity
- Normalization
- Scalability
- Future extensibility

The schema intentionally avoids unnecessary complexity while providing a strong foundation for future AI features.
