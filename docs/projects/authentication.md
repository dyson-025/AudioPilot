# Authentication

## Overview

AudioPilot uses **JWT (JSON Web Tokens)** for stateless authentication. Every authenticated user receives an access token after successful login. This token must be included in subsequent requests to access protected resources.

Authentication is implemented using:

- JWT
- OAuth2PasswordBearer
- bcrypt password hashing
- FastAPI Dependency Injection
- SQLAlchemy
- PostgreSQL

---

# Authentication Goals

The authentication system is designed to:

- Secure protected endpoints
- Prevent unauthorized access
- Store passwords securely
- Maintain stateless authentication
- Integrate seamlessly with FastAPI

---

# Authentication Flow

```text
                Register
                    │
                    ▼
          Hash Password (bcrypt)
                    │
                    ▼
            Store User in Database
                    │
                    ▼
                 Login
                    │
                    ▼
          Verify Password (bcrypt)
                    │
                    ▼
             Generate JWT Token
                    │
                    ▼
             Return Access Token
                    │
                    ▼
      Client Stores Access Token
                    │
                    ▼
      Protected API Request
                    │
                    ▼
          Verify JWT Signature
                    │
                    ▼
         Retrieve Current User
                    │
                    ▼
              Execute Request
```

---

# Components

## auth.py

Responsible for authentication-related utilities.

Responsibilities include:

- Password hashing
- Password verification
- JWT generation
- JWT validation
- Current user retrieval

---

## auth_service.py

Contains business logic related to authentication.

Responsibilities include:

- User registration
- User login
- Profile updates
- Password updates
- Access token generation

---

## auth_routes.py

Exposes authentication endpoints.

Current endpoints include:

- Register
- Login
- Update Profile
- Change Password

---

# Password Security

Passwords are never stored in plain text.

AudioPilot uses **bcrypt** through **Passlib**.

Registration flow:

```text
User Password
      │
      ▼
bcrypt Hash
      │
      ▼
Store Hashed Password
```

Login flow:

```text
Entered Password
       │
       ▼
Compare with Hash
       │
       ▼
Authentication Success / Failure
```

This ensures that original passwords cannot be recovered from the database.

---

# JWT Authentication

After successful login, the backend generates a JWT.

The token contains:

- User email (`sub`)
- Expiration time (`exp`)

General flow:

```text
User Login
      │
      ▼
Generate JWT
      │
      ▼
Return Token
      │
      ▼
Authorization Header
      │
      ▼
Bearer Token
```

The backend validates every incoming token before allowing access to protected resources.

---

# OAuth2PasswordBearer

AudioPilot uses FastAPI's `OAuth2PasswordBearer` dependency.

Responsibilities:

- Extract Bearer Token
- Pass token to authentication layer
- Simplify authentication in protected endpoints

---

# Current User Dependency

Protected routes use dependency injection to retrieve the authenticated user.

```text
Incoming Request
        │
        ▼
Extract Bearer Token
        │
        ▼
Decode JWT
        │
        ▼
Read User Email
        │
        ▼
Query Database
        │
        ▼
Return Current User
```

If the token is invalid or the user does not exist, the request is rejected.

---

# Protected Routes

Protected endpoints automatically require authentication.

Examples include:

- Upload Audio
- Get Analysis History
- Delete Analysis
- Update Profile
- Change Password

Authentication is enforced using:

```python
current_user = Depends(get_current_user)
```

---

# Database Interaction

Authentication interacts with the database to:

- Register users
- Find users by email
- Verify credentials
- Update profile
- Update password

Password hashes—not raw passwords—are stored in PostgreSQL.

---

# Token Expiration

Access tokens include an expiration time.

Current configuration:

- Configurable using environment variables
- Default expiration: **7 days**

Expired tokens are automatically rejected.

---

# Error Handling

Authentication handles several failure scenarios.

Current validation includes:

- Invalid email
- Incorrect password
- Invalid JWT
- Expired token
- Missing token
- User not found

Appropriate HTTP status codes are returned for each error.

---

# Security Practices

Current security measures include:

- bcrypt password hashing
- JWT expiration
- Stateless authentication
- Environment-based secret management
- Protected API endpoints
- Dependency Injection for authenticated users

---

# Current Limitations

The current authentication system does not yet include:

- Refresh Tokens
- Email Verification
- Password Reset via Email
- Multi-Factor Authentication (MFA)
- Role-Based Access Control (RBAC)
- Rate Limiting

These features may be introduced in future releases.

---

# Future Improvements

Potential authentication enhancements include:

- Refresh Token rotation
- Google OAuth Login
- GitHub OAuth Login
- Multi-device session management
- Account verification
- Login history
- Session revocation
- Role-based authorization
