# GoQualify Website

A modern learning platform built with React and TypeScript.

## Features

### Authentication System

- **Login Page** (`/login`) - Email/password and Google OAuth login
- **Signup Page** (`/signup`) - User registration with referral code support
- **Forgot Password** (`/forgot-password`) - Password reset via email
- **OTP Verification** (`/verify-otp`) - Multi-purpose OTP verification for signup and password reset

### Study Analytics

- **Study Analytics** (`/studyanalytics`) - Learning progress tracking
- **Gamification** - Reward system for learning achievements

## Pages Overview

### Login Page

- Email/password authentication
- Google OAuth integration
- Forgot password link
- Form validation with error handling
- Success message display for password reset

### Signup Page

- Full name, email, and password fields
- Password confirmation
- Optional referral code
- Google OAuth signup
- Form validation
- Redirects to OTP verification

### Forgot Password Page

- Email input for password reset
- Sends OTP to email
- Redirects to OTP verification with password reset context

### OTP Verification Page

- 6-digit OTP input
- 5-minute countdown timer
- Resend OTP functionality
- Context-aware (signup vs password reset)
- Password reset fields when applicable
- Form validation

## Project Structure

```
websitegoqualify/
├── public/                    # Static assets
│   └── vite.svg             # Vite logo
├── src/                      # Source code
│   ├── assets/              # Images, icons, and other assets
│   │   └── react.svg        # React logo
│   ├── components/          # Reusable UI components
│   │   ├── Analytics.tsx    # Analytics component
│   │   ├── Gamification.tsx # Gamification component
│   │   ├── Navbar.tsx       # Navigation bar component
│   │   └── StudyGraph.tsx   # Study graph component
│   ├── context/             # React Context providers
│   │   └── AuthContext.tsx  # Authentication context
│   ├── pages/               # Page components
│   │   ├── Home.tsx         # Home page
│   │   ├── Login.tsx        # Login page
│   │   ├── Signup.tsx       # Signup page
│   │   ├── ForgotPassword.tsx # Forgot password page
│   │   ├── VerifyOTP.tsx    # OTP verification page
│   │   ├── StudyAnalytics.tsx # Study analytics page
│   │   ├── ThankYou.tsx     # Thank you page
│   │   └── NotFound.tsx     # 404 page
│   ├── App.tsx              # Main application component
│   ├── App.css              # Application styles
│   ├── index.css            # Global styles
│   └── main.tsx             # Application entry point
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── tsconfig.app.json        # App-specific TypeScript config
├── tsconfig.node.json       # Node-specific TypeScript config
├── vite.config.ts           # Vite build configuration
└── README.md                # This file
```

## Environment Setup

### 1. Create Environment File

Create a `.env` file in the root directory (`websitegoqualify/`):

```bash
# Navigate to the project directory
cd websitegoqualify

# Create .env file
touch .env
```

### 2. Configure Environment Variables

Add the following variables to your `.env` file:

```env
# Frontend Environment Variables
VITE_BACKEND_URL=http://localhost:3000

# Note: All Vite environment variables must start with VITE_
```

### 3. Environment Variables Explained

| Variable           | Description                        | Example                 |
| ------------------ | ---------------------------------- | ----------------------- |
| `VITE_BACKEND_URL` | URL of your Node.js backend server | `http://localhost:3000` |

### 4. Environment File Security

⚠️ **Important Security Notes:**

- Never commit `.env` files to version control
- The `.env` file is already in `.gitignore`
- Keep your backend URL secure in production
- Use different URLs for development, staging, and production

### 5. Production Environment

For production deployment, set these environment variables in your hosting platform:

```env
VITE_BACKEND_URL=https://your-backend-domain.com
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Backend server running (see Nodebackend/README.md)

### Installation Steps

1. **Install dependencies:**

```bash
npm install
```

2. **Set up environment variables:**

   - Copy `.env.example` to `.env` (if available)
   - Configure `VITE_BACKEND_URL` to point to your backend

3. **Start the development server:**

```bash
npm run dev
```

4. **Open your browser:**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)
   - The app should load with the home page

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript types
```

## Styling

All authentication pages use the same CSS file (`login.css`) for consistent styling:

- Modern gradient backgrounds
- Responsive design
- Smooth animations
- Error and success message styling
- Loading states

## API Integration

The frontend integrates with the Node.js backend for:

- **User Authentication**: Login, signup, and session management
- **OTP System**: Email-based verification for signup and password reset
- **Password Management**: Secure password reset via OTP
- **Google OAuth**: Social login integration
- **Session Management**: Persistent authentication state

### Backend Requirements

- Node.js server running on the URL specified in `VITE_BACKEND_URL`
- CORS enabled for frontend domain
- Session-based authentication with cookies
- All authentication endpoints under `/auth/*` route

## Troubleshooting

### Common Issues

#### 1. Environment Variables Not Working

```bash
# Check if .env file exists
ls -la .env

# Verify variable names start with VITE_
echo $VITE_BACKEND_URL
```

#### 2. Backend Connection Issues

- Ensure backend server is running
- Check `VITE_BACKEND_URL` in `.env` file
- Verify CORS configuration on backend
- Check browser console for network errors

#### 3. Authentication State Not Persisting

- Check if cookies are enabled
- Verify backend session configuration
- Check browser storage settings

#### 4. Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run type-check
```

### Getting Help

1. Check the browser console for error messages
2. Verify environment variables are set correctly
3. Ensure backend server is running and accessible
4. Check network tab for failed API requests

## Technology Stack

### Frontend

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **CSS3** - Custom styling with modern CSS features

### Development Tools

- **ESLint** - Code linting and formatting
- **TypeScript Compiler** - Type checking and compilation
- **Vite Dev Server** - Hot module replacement and fast refresh

## Development Workflow

### 1. Development Mode

```bash
npm run dev
```

- Starts development server on `http://localhost:5173`
- Hot module replacement enabled
- Fast refresh for React components
- Real-time error reporting

### 2. Building for Production

```bash
npm run build
```

- Creates optimized production build in `dist/` folder
- Minified and bundled JavaScript/CSS
- Tree-shaking for unused code removal
- Environment variable injection

### 3. Preview Production Build

```bash
npm run preview
```

- Serves production build locally for testing
- Useful for final testing before deployment

## Navigation Flow

1. **Signup Flow**: Signup → OTP Verification → Home (auto-login)
2. **Password Reset Flow**: Forgot Password → OTP Verification → Login (with success message)
3. **Login Flow**: Login → Home/Dashboard
4. **Logout Flow**: Logout → Home (unauthenticated state)
