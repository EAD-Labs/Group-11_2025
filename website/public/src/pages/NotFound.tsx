import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        {/* 404 Animation */}
        <div className="error-animation">
          <div className="error-number">4</div>
          <div className="error-icon">
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M8 8l8 8M16 8l-8 8"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="error-number">4</div>
        </div>

        {/* Error Message */}
        <div className="error-message">
          <h1 className="error-title">Oops! Page Not Found</h1>
          <p className="error-description">
            The page you're looking for seems to have wandered off into the
            digital void. Don't worry, even the best explorers sometimes take a
            wrong turn!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="error-actions">
          <Link to="/" className="btn-primary">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="9,22 9,12 15,12 15,22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="btn-secondary"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 12H5M12 19l-7-7 7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="helpful-links">
          <h3>Maybe you were looking for:</h3>
          <div className="links-grid">
            <Link to="/studyanalytics" className="help-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 19c-5 0-6-3-6-3s1-3 6-3 6 3 6 3-1 3-6 3z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 16c-5 0-6-3-6-3s1-3 6-3 6 3 6 3-1 3-6 3z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 13c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              Study Analytics
            </Link>
            <Link to="/profile" className="help-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="7"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              Profile
            </Link>
            <Link to="/contact" className="help-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline
                  points="22,6 12,13 2,6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Contact Us
            </Link>
            <Link to="/about" className="help-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="12"
                  y1="17"
                  x2="12.01"
                  y2="17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
