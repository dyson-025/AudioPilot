# Project Structure

## Overview

AudioPilot follows a modular full-stack architecture that separates the frontend and backend into independent applications. Each directory has a well-defined responsibility, making the project easier to maintain, extend, and scale.

```text
AudioPilot/
│
├── client/                 # React frontend
│
├── server/                 # FastAPI backend
│
├── docs/                   # Project documentation
│
└── README.md
```

---

# Frontend Structure

The frontend is located inside the `client/` directory and is responsible for rendering the user interface, managing application state, and communicating with the backend APIs.

```text
client/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── vite.config.js
```

## Folder Responsibilities

### assets/

Stores static resources such as images, icons, and other frontend assets.

---

### components/

Reusable UI components shared across multiple pages.

Examples:

- Navbar
- Sidebar
- Cards
- Buttons
- Forms

---

### context/

Contains React Context providers used for global state management.

Examples:

- Authentication Context
- Theme Context (if added)

---

### hooks/

Custom React hooks that encapsulate reusable logic.

Examples:

- API hooks
- Authentication hooks
- Utility hooks

---

### pages/

Application pages mapped to routes.

Examples:

- Login
- Register
- Dashboard
- Analysis History
- Settings

---

### routes/

Application routing configuration and protected routes.

---

### services/

Contains API communication logic.

Responsibilities:

- Axios configuration
- API requests
- Authentication requests

---

### utils/

Frontend helper functions and reusable utility methods.

---

# Backend Structure

The backend is located inside the `server/` directory and follows a layered architecture.

```text
server/
│
├── app/
│   ├── core/
│   ├── db/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   └── main.py
│
├── requirements.txt
└── runtime.txt
```

## Folder Responsibilities

### core/

Application configuration and shared backend settings.

Examples:

- Security
- Configuration
- Environment variables

---

### db/

Database configuration and session management.

Responsibilities:

- Database connection
- SQLAlchemy engine
- Session creation

---

### routes/

FastAPI API endpoints.

Responsibilities:

- Receive HTTP requests
- Validate requests
- Delegate business logic

---

### schemas/

Pydantic request and response models.

Responsibilities:

- Request validation
- Response serialization

---

### services/

Contains the core business logic.

Responsibilities:

- Authentication
- Audio processing
- AI integrations
- Database operations

---

### main.py

Application entry point.

Responsibilities:

- Create FastAPI application
- Register routers
- Configure middleware
- Start the application

---

# Documentation Structure

Project documentation is stored in the `docs/` directory.

```text
docs/
│
├── projects/
├── learning/
└── interview/
```

## projects/

Technical documentation describing the project architecture, implementation, and design.

---

## learning/

Personal notes for technologies used throughout the project.

---

## interview/

Interview-oriented notes and revision material based on concepts implemented in AudioPilot.

---

# Benefits of the Structure

The project structure is designed to provide:

- Clear separation of frontend and backend
- Modular and maintainable code
- Reusable components and services
- Easy scalability
- Simple onboarding for new contributors
