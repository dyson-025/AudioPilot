# 🎙️ AudioPilot

### AI-Powered Audio Intelligence Platform

AudioPilot transforms audio recordings into actionable insights using advanced speech transcription, audio signal analysis, and Large Language Models.

Built as a full-stack AI application with React, FastAPI, PostgreSQL, Groq LLMs, and cloud deployment infrastructure.

---

## 🚀 Live Demo

**Frontend:** https://audio-pilot-three.vercel.app/

**Backend API:** https://audiopilot-ckl7.onrender.com

---

## ✨ Features

### 🔐 Authentication

- JWT Authentication
- User Registration & Login
- Protected Routes
- Profile Management
- Password Updates

### 🎙️ Audio Processing

- Audio Upload
- Speech-to-Text Transcription
- Audio Quality Analysis
- Signal Processing with Librosa

### 🧠 AI Insights

- Whisper Large V3 Transcription
- Groq LLM Powered Reports
- Context-Aware Audio Understanding
- Improvement Suggestions

### 📊 Audio Metrics

- Clarity Score
- Energy Analysis
- Noise Detection
- Silence Percentage
- Audio Duration

### 📁 Analysis Management

- Analysis History
- Persistent Storage
- User-Specific Reports

---

## 🏗️ System Architecture

```text
User Uploads Audio
        │
        ▼
 React Frontend
        │
        ▼
 FastAPI Backend
        │
 ┌──────┴──────┐
 ▼             ▼

Audio      Whisper
Metrics  Transcription

 ▼             ▼
 └──────┬──────┘
        ▼

   Groq LLM
 AI Insight Engine

        ▼

 PostgreSQL

        ▼

 User Dashboard
```

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- Axios

### Backend

- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT Authentication
- Pydantic

### AI & Audio

- Groq API
- Whisper Large V3
- Llama 3.1
- Librosa
- NumPy

### Deployment

- Vercel
- Render
- Neon PostgreSQL

---

## 📂 Project Structure

```text
AudioPilot
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── pages
│   │   ├── routes
│   │   ├── services
│   │   └── utils
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── server
│   ├── app
│   │   ├── core
│   │   ├── db
│   │   ├── routes
│   │   ├── schemas
│   │   └── services
│   │
│   ├── requirements.txt
│   └── runtime.txt
│
└── README.md
```

---

## 📸 Screenshots

<table>
  <tr>
    <td align="center">
      <strong>Home Page</strong><br>
      <img src="https://github.com/user-attachments/assets/9836db73-d8a7-4846-9836-e057b99aea92" width="450"/>
    </td>
    <td align="center">
      <strong>Analyze Audio</strong><br>
      <img src="https://github.com/user-attachments/assets/16666e5d-f59e-4c20-9d3a-9ec1cf45cd9a" width="450"/>
    </td>
    <td align="center">
      <strong>AI Report</strong><br>
      <img src="https://github.com/user-attachments/assets/ec342b81-3c45-4c8f-a57d-ccb3c73a9036" width="450"/>
    </td>
  </tr>

  <tr>
    <td align="center">
      <strong>Analysis History</strong><br>
      <img src="https://github.com/user-attachments/assets/0d21897b-a6b1-43f2-bcf4-8faa28a237e8" width="450"/>
    </td>
    <td align="center">
      <strong>Settings</strong><br>
      <img src="https://github.com/user-attachments/assets/e6f0b9df-2208-431d-9e65-987565513ca0" width="450"/>
    </td>
    <td>
      <strong>Login</strong><br>
      <img src="https://github.com/user-attachments/assets/a327b897-6d6f-4e82-b580-64c27d72ea0c" width="450"/>
    </td>
  </tr>
</table>


---

## ⚙️ Environment Variables

### Backend

```env
SECRET_KEY=

GROQ_API_KEY=

DATABASE_URL=

FRONTEND_URL=

ACCESS_TOKEN_EXPIRE_DAYS=7
```

### Frontend

```env
VITE_API_BASE_URL=
```

---

## 💻 Local Setup

### Clone Repository

```bash
git clone https://github.com/dyson-025/AudioPilot.git

cd AudioPilot
```

### Frontend

```bash
cd client

npm install

npm run dev
```

### Backend

```bash
cd server

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

## 🎯 Future Improvements

- Agentic AI Audio Coach
- Speaker Identification
- Sentiment Analysis
- Audio Comparison Reports
- Real-Time Audio Analysis
- Team Collaboration

---

## 👨‍💻 Author

**Aditya Aryan**

Built with React, FastAPI, PostgreSQL, Groq, and countless debugging sessions ☕🔥
