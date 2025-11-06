# GoQualify Chrome Extension

A powerful Chrome extension that transforms YouTube videos into interactive learning experiences by generating AI-powered quizzes from video content.

## Features

### 🎥 **Video Integration**

- **YouTube Integration**: Seamlessly works with YouTube videos
- **Transcript Analysis**: Extracts and processes video captions
- **Content Understanding**: AI-powered analysis of video content

### 🧠 **AI-Powered Learning**

- **Quiz Generation**: Automatically creates quizzes from video content
- **Smart Questions**: Context-aware question generation
- **Multiple Choice**: Interactive quiz format with explanations

### 🔐 **Authentication & User Management**

- **User Accounts**: Secure login and registration system
- **Progress Tracking**: Monitor learning progress across videos
- **Session Management**: Persistent user sessions and preferences

### 📊 **Learning Analytics**

- **Performance Metrics**: Track quiz scores and completion rates
- **Study History**: Review past quizzes and learning sessions
- **Personalized Insights**: AI-driven learning recommendations

### 🎯 **Quiz Management**

- **Quiz Sessions**: Active learning sessions with progress tracking
- **Personal Quizzes**: Customized learning experiences
- **Answer Validation**: Real-time feedback and scoring

## Project Structure

```
goqualify/
├── .git/                      # Git repository data
├── dist/                      # Build output directory (auto-generated)
├── node_modules/              # Dependencies (auto-generated)
├── src/                       # Source code
│   ├── background/            # Chrome extension background scripts
│   │   ├── authState.ts       # Authentication state management
│   │   ├── background.ts      # Main background service worker
│   │   ├── backgroundfunctions.ts # Background utility functions
│   │   ├── backgroundRequest.ts # HTTP request handling
│   │   ├── quizconnections.ts # Quiz API integration
│   │   ├── quizsession.ts     # Quiz session management
│   │   └── sessionState.ts    # Session state management
│   ├── contentScript/         # Content scripts for YouTube pages
│   │   ├── App.tsx            # Main content script React app
│   │   ├── VideoApp.tsx       # Video-specific React app
│   │   ├── contentScript.css  # Content script styles
│   │   ├── contentScript.ts   # Content script entry point
│   │   └── src/               # Content script components
│   │       ├── components/    # Reusable UI components
│   │       │   ├── BodyElement.tsx # Main body component
│   │       │   ├── generatequiz.tsx # Quiz generation UI
│   │       │   ├── LegendMenu.tsx # Navigation menu
│   │       │   ├── loading.tsx # Loading states
│   │       │   ├── option.tsx # Quiz option component
│   │       │   ├── personalquiz.tsx # Personal quiz UI
│   │       │   ├── question.tsx # Question display
│   │       │   └── questionpallete.tsx # Question navigation
│   │       ├── styles/        # Component-specific styles
│   │       │   ├── loading.css # Loading animations
│   │       │   └── videostyles.css # Video page styles
│   │       └── videocomponents/ # Video-specific components
│   │           ├── chromeapis.ts # Chrome API utilities
│   │           ├── option.tsx # Video quiz options
│   │           ├── question.tsx # Video quiz questions
│   │           ├── questionfunctions.ts # Question logic
│   │           ├── sessionState.ts # Video session state
│   │           ├── videobody.tsx # Video page body
│   │           └── videostyles.css # Video component styles
│   ├── options/               # Extension options page
│   │   ├── options.css        # Options page styles
│   │   └── options.tsx        # Options page React app
│   ├── popup/                 # Extension popup interface
│   │   ├── popup.css          # Popup styles
│   │   ├── popup.tsx          # Popup React app
│   │   ├── src/               # Popup components
│   │   │   ├── components/    # Popup UI components
│   │   │   │   ├── login.css  # Login component styles
│   │   │   │   └── Login.tsx  # Login component
│   │   │   ├── linkextractor/ # Link extraction utilities
│   │   │   │   ├── individualquestion.tsx # Individual question display
│   │   │   │   └── linkextractor.tsx # Link extraction logic
│   │   │   ├── transcript/    # Transcript processing
│   │   │   │   └── Transcript.tsx # Transcript display
│   │   │   └── types/         # TypeScript type definitions
│   │   │       ├── questionType.ts # Question data types
│   │   │       ├── transcriptType.ts # Transcript data types
│   │   │       └── userType.ts # User data types
│   │   └── types/             # Popup type definitions
│   └── static/                # Static assets and configuration
│       ├── icon.png           # Extension icon
│       └── manifest.json      # Chrome extension manifest
├── .gitattributes            # Git attributes configuration
├── .gitignore                # Git ignore rules
├── package.json              # Dependencies and scripts
├── package-lock.json         # Dependency lock file
├── tsconfig.json             # TypeScript configuration
├── webpack.common.js         # Webpack common configuration
├── webpack.dev.js            # Development webpack config
├── webpack.prod.js           # Production webpack config
└── README.md                 # This file
```

## Technology Stack

### Frontend Framework

- **React 19.1** - Modern React with hooks and functional components
- **TypeScript 5.8** - Type-safe JavaScript development
- **CSS3** - Custom styling with modern CSS features

### Build Tools

- **Webpack 5.99** - Module bundler and build tool
- **TypeScript Loader** - TypeScript compilation
- **CSS Loader** - CSS processing and injection
- **HTML Webpack Plugin** - HTML template generation

### Chrome Extension APIs

- **Chrome Extensions Manifest V3** - Modern extension architecture
- **Service Workers** - Background script execution
- **Content Scripts** - YouTube page integration
- **Popup & Options Pages** - Extension interface

### Development Tools

- **ESLint** - Code linting and formatting
- **TypeScript Compiler** - Type checking and compilation
- **Webpack Dev Server** - Development build and hot reloading

## Environment Setup

### 1. Prerequisites

- **Node.js** (version 18 or higher)
- **Chrome Browser** (for extension testing)
- **npm or yarn** package manager

### 2. Create Environment File

Create a `.env` file in the root directory:

```bash
# Navigate to the project directory
cd goqualify

# Create .env file
touch .env
```

### 3. Configure Environment Variables

Add the following variables to your `.env` file:

```env
# Backend API Configuration
BACKEND_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173

# Chrome Extension Configuration
EXTENSION_ID=your-extension-id-here

# Development Settings
NODE_ENV=development
DEBUG=true
```

### 4. Environment Variables Explained

| Variable       | Description              | Example                       |
| -------------- | ------------------------ | ----------------------------- |
| `BACKEND_URL`  | Backend API server URL   | `http://localhost:3000`       |
| `FRONTEND_URL` | Frontend application URL | `http://localhost:5173`       |
| `EXTENSION_ID` | Chrome extension ID      | `abcdefghijklmnop`            |
| `NODE_ENV`     | Environment mode         | `development` or `production` |
| `DEBUG`        | Debug mode flag          | `true` or `false`             |

### 5. Environment File Security

⚠️ **Important Security Notes:**

- Never commit `.env` files to version control
- The `.env` file is already in `.gitignore`
- Keep API URLs secure in production
- Use different URLs for development/staging/production

## Getting Started

### 1. Install Dependencies

```bash
# Install Node.js dependencies
npm install
```

### 2. Build the Extension

```bash
# Development build (with watch mode)
npm start

# Production build
npm run build
```

### 3. Load Extension in Chrome

1. **Open Chrome Extensions Page**:

   - Navigate to `chrome://extensions/`
   - Enable "Developer mode" (top right toggle)

2. **Load Extension**:

   - Click "Load unpacked"
   - Select the `dist/` folder from your project

3. **Verify Installation**:
   - Extension icon should appear in Chrome toolbar
   - Click icon to open popup

### 4. Test on YouTube

1. **Navigate to YouTube**:

   - Go to any YouTube video page
   - Extension should automatically activate

2. **Check Content Script**:
   - Look for GoQualify interface elements
   - Verify quiz generation functionality

## Development Workflow

### 1. Development Mode

```bash
npm start
```

- Watches for file changes
- Automatically rebuilds on save
- Generates development build in `dist/` folder
- Enables hot reloading for development

### 2. Production Build

```bash
npm run build
```

- Creates optimized production build
- Minifies JavaScript and CSS
- Optimizes bundle size
- Generates production-ready extension

### 3. Testing

```bash
# Manual testing in Chrome
1. Build extension: npm run build
2. Load in Chrome: chrome://extensions/
3. Test on YouTube videos
4. Check console for errors
```

## Chrome Extension Architecture

### Manifest V3 Structure

```json
{
  "manifest_version": 3,
  "name": "GoQualify",
  "version": "1.0.0",
  "permissions": [
    "storage",
    "tabs",
    "activeTab",
    "identity",
    "scripting",
    "cookies"
  ],
  "host_permissions": ["https://www.youtube.com/*"],
  "background": { "service_worker": "background.js" },
  "content_scripts": [
    { "matches": ["https://www.youtube.com/*"], "js": ["contentScript.js"] }
  ],
  "action": { "default_popup": "popup.html" },
  "options_page": "options.html"
}
```

### Background Scripts

- **Service Worker**: Handles extension lifecycle and events
- **Authentication**: Manages user login state and sessions
- **API Communication**: Handles backend API requests
- **Quiz Management**: Manages quiz sessions and progress

### Content Scripts

- **YouTube Integration**: Injects into YouTube video pages
- **Quiz Interface**: Displays quiz generation and interaction UI
- **Video Analysis**: Processes video content and captions
- **User Experience**: Provides seamless learning interface

### Popup Interface

- **Quick Access**: Extension toolbar popup
- **User Login**: Authentication interface
- **Settings**: Quick configuration options
- **Navigation**: Access to main features

## API Integration

### Backend Communication

The extension communicates with the Node.js backend for:

- **User Authentication**: Login, signup, and session management
- **Quiz Generation**: AI-powered quiz creation from video content
- **Progress Tracking**: User learning analytics and performance
- **Content Processing**: Video transcript analysis and processing

### Authentication Flow

1. **User Login**: Popup interface for credentials
2. **Session Management**: Background script maintains auth state
3. **API Requests**: Authenticated requests to backend
4. **Token Refresh**: Automatic session renewal

### Quiz Generation Process

1. **Video Detection**: Content script identifies YouTube videos
2. **Caption Extraction**: Retrieves video captions/transcripts
3. **AI Processing**: Sends content to backend for quiz generation
4. **Quiz Display**: Presents generated quiz to user
5. **Progress Tracking**: Records user performance and progress

## Build Configuration

### Webpack Setup

- **Multiple Entry Points**: Separate bundles for each extension component
- **TypeScript Support**: Full TypeScript compilation
- **CSS Processing**: Style injection and optimization
- **Asset Management**: Icon and static file handling
- **Environment Variables**: Dynamic configuration injection

### Build Outputs

```
dist/
├── background.js      # Background service worker
├── contentScript.js   # YouTube page content script
├── popup.js          # Extension popup interface
├── options.js        # Extension options page
├── popup.html        # Popup HTML template
├── options.html      # Options page HTML
├── icon.png          # Extension icon
└── manifest.json     # Extension manifest
```

## Testing & Debugging

### Chrome DevTools

1. **Background Script Debugging**:

   - Go to `chrome://extensions/`
   - Click "service worker" link for background script
   - Use DevTools for debugging

2. **Content Script Debugging**:

   - Open YouTube video page
   - Right-click → Inspect
   - Check Console tab for logs

3. **Popup Debugging**:
   - Right-click extension icon
   - Click "Inspect popup"
   - Use DevTools for debugging

### Common Issues

#### 1. Extension Not Loading

- Check `dist/` folder exists
- Verify manifest.json is valid
- Check Chrome console for errors

#### 2. Content Script Not Working

- Verify host permissions in manifest
- Check content script injection
- Verify YouTube URL matching

#### 3. Build Errors

- Check TypeScript compilation
- Verify webpack configuration
- Check for missing dependencies

## Deployment

### 1. Production Build

```bash
# Create production build
npm run build

# Verify dist/ folder contents
ls -la dist/
```

### 2. Chrome Web Store

1. **Package Extension**:

   - Zip the `dist/` folder contents
   - Ensure manifest.json is at root

2. **Upload to Store**:
   - Go to Chrome Web Store Developer Dashboard
   - Upload packaged extension
   - Complete store listing information

### 3. Manual Distribution

1. **Share dist/ folder**:

   - Users can load unpacked extension
   - Suitable for testing and development

2. **Self-hosted Distribution**:
   - Host extension files on your server
   - Provide installation instructions

## Contributing

### Development Guidelines

1. **Code Style**:

   - Use TypeScript for all new code
   - Follow React best practices
   - Maintain consistent formatting

2. **Testing**:

   - Test on multiple YouTube video types
   - Verify extension functionality
   - Check for console errors

3. **Pull Request Process**:
   - Fork the repository
   - Create feature branch
   - Test thoroughly
   - Submit pull request

### Project Structure Guidelines

- **Background Scripts**: Keep in `src/background/`
- **Content Scripts**: Organize in `src/contentScript/`
- **Popup Components**: Maintain in `src/popup/`
- **Shared Types**: Define in appropriate `types/` folders
- **Styles**: Keep CSS close to components

## Troubleshooting

### Common Issues

#### 1. Build Failures

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npx tsc --noEmit
```

#### 2. Extension Not Working

- Verify manifest.json permissions
- Check content script injection
- Verify backend API connectivity
- Check Chrome extension console

#### 3. Development Issues

- Ensure webpack is watching files
- Check for TypeScript compilation errors
- Verify environment variables are set
- Check Chrome extension reload

### Getting Help

1. Check Chrome extension console for errors
2. Verify build output in `dist/` folder
3. Test on different YouTube video types
4. Check backend API connectivity
5. Review Chrome extension documentation

## License

This project is licensed under the ISC License.

## Support

For support and questions:

- Check the troubleshooting section
- Review Chrome extension documentation
- Check backend API status
- Verify environment configuration
