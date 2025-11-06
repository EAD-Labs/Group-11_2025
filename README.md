# Rewision - A YouTube Video Quiz Platform

A comprehensive platform that automatically generates interactive quizzes from YouTube video transcripts using AI. The project consists of a Node.js backend API, a Chrome browser extension, and a React web application.

## 🏗️ Project Structure

```
.
├── backend/          # Node.js/Express API server
├── extension/        # Chrome browser extension
└── website/         # React web application
```

## ✨ Features

- **Automatic Quiz Generation**: Generates multiple-choice questions from YouTube video transcripts using Google Gemini AI
- **Transcript Extraction**: Fetches and stores video transcripts from YouTube
- **User Authentication**: Supports both local and Google OAuth authentication
- **Quiz Sessions**: Track user progress and quiz performance
- **Browser Extension**: Chrome extension for easy access to quiz features
- **Web Dashboard**: React-based web interface for managing quizzes

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Passport.js (Local & Google OAuth)
- **Session Management**: Express Session with MongoDB Store
- **Python Integration**: YouTube Transcript API

### Extension

- **Language**: TypeScript
- **Framework**: React 17
- **Build Tool**: Webpack 5
- **Type Definitions**: @types/chrome

### Website

- **Language**: TypeScript
- **Framework**: React 19
- **Build Tool**: Vite
- **Linting**: ESLint

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Python 3.x
- Google Cloud account (for Gemini API)
- Google OAuth credentials (for authentication)

## 🚀 Getting Started

### 1. Backend Setup

```bash
cd backend
npm install
```

Install Python dependencies:

```bash
pip install -r pythonrequirements.txt
```

Create a `.env` file in the `backend/` directory:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Session
SESSION_SECRET_KEY=your_session_secret_key

# Google OAuth
WEBCLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Google AI
GOOGLE_API_KEY=your_google_gemini_api_key

# Server
PORT=3000
BACKEND_URL=http://localhost:3000
```

Start the backend server:

```bash
npm start
```

The server will run on `http://localhost:3000`

### 2. Extension Setup

```bash
cd extension
npm install
```

Build the extension:

```bash
# Development build (watch mode)
npm start

# Production build
npm run build
```

Load the extension in Chrome:

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked"
4. Select the `extension/dist` folder

### 3. Website Setup

```bash
cd website
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## 📁 Project Components

### Backend API Routes

- `/auth` - Authentication routes (local and Google OAuth)
- `/transcript` - YouTube transcript fetching and management
- `/quiz` - Quiz generation and management
- `/quizsession` - Quiz session tracking and progress

### Backend Models

- **User**: User accounts with authentication
- **Transcript**: YouTube video transcripts with segments
- **Quiz**: Generated quizzes with questions and options
- **QuizSession**: User quiz session tracking
- **QuizProgress**: Individual quiz progress tracking

### Extension Components

- **Popup**: Extension popup interface
- **Options**: Extension settings page
- **Background**: Service worker for background tasks
- **Content Script**: Script injected into web pages

## 🔧 Environment Variables

### Backend (.env)

| Variable               | Description                       | Required |
| ---------------------- | --------------------------------- | -------- |
| `MONGODB_URI`          | MongoDB connection string         | Yes      |
| `SESSION_SECRET_KEY`   | Secret key for session encryption | Yes      |
| `WEBCLIENT_ID`         | Google OAuth client ID            | Yes      |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret        | Yes      |
| `GOOGLE_API_KEY`       | Google Gemini API key             | Yes      |
| `PORT`                 | Server port (default: 3000)       | No       |
| `BACKEND_URL`          | Backend server URL                | Yes      |

## 📝 API Endpoints

### Authentication

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/google` - Initiate Google OAuth
- `GET /auth/google/callback` - Google OAuth callback
- `POST /auth/logout` - Logout user

### Transcripts

- `POST /transcript/:videoId` - Fetch or generate transcript for a video

### Quizzes

- `POST /quiz/personalquiz/:videoId` - Get personal quiz for a video
- `POST /quiz/answerquestion` - Submit answer to a question
- `POST /quiz/checkanswer` - Check if answer is correct
- `POST /quiz/savequestion` - Save question for later
- `POST /quiz/skipquestion` - Skip a question

### Quiz Sessions

- `POST /quizsession/create` - Create a new quiz session
- `GET /quizsession/:sessionId` - Get session details
- `POST /quizsession/:sessionId/complete` - Complete a session

## 🔐 Authentication Flow

1. **Local Authentication**: Users can register/login with email and password
2. **Google OAuth**: Users can sign in with their Google account
3. Sessions are stored in MongoDB using `connect-mongo`
4. Passport.js handles authentication middleware

## 🤖 AI Quiz Generation

The platform uses AI to generate quizzes:

- Analyzes video transcripts
- Creates multiple-choice questions with 4 options
- Associates questions with video timestamps
- Filters out sponsor messages and focuses on core content

## 📊 Database Schema

### User

- Email (unique)
- Name
- Google ID (optional)
- Verification status
- Provider (local/google)

### Transcript

- Video ID (unique)
- Segments (text, start time, duration)
- Title
- Description

### Quiz

- Transcript reference
- Video ID
- Questions array (question, timestamp, options)
- Created/Updated timestamps

### QuizSession

- User reference
- Quiz reference
- Progress tracking
- Completion status