import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";
import "./ComingSoon.css";

export default function ComingSoon() {
  return (
    <div className="coming-soon-container">
      <div className="coming-soon-content">
        {/* Coming Soon Icon */}
        <div className="coming-soon-icon">
          <svg
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="9"
              cy="7"
              r="4"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
            />
            <path
              d="M23 21v-2a4 4 0 0 0-3-3.87"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 3.13a4 4 0 0 1 0 7.75"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Coming Soon Message */}
        <div className="coming-soon-message">
          <h1 className="coming-soon-title">Study Rooms</h1>
          <h2 className="coming-soon-subtitle">Coming Soon!</h2>
          <p className="coming-soon-description">
            We're building an amazing collaborative study experience where you
            can join virtual study rooms, work together with peers, and boost
            your learning productivity. Get ready for a revolutionary way to
            study!
          </p>
        </div>

        {/* Features Preview */}
        <div className="features-preview">
          <h3>What to expect:</h3>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="9"
                    cy="7"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M23 21v-2a4 4 0 0 0-3-3.87"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 3.13a4 4 0 0 1 0 7.75"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span>Collaborative Study Sessions</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span>Real-time Chat & Discussion</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="2"
                    y="3"
                    width="20"
                    height="14"
                    rx="2"
                    ry="2"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="8"
                    y1="21"
                    x2="16"
                    y2="21"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="12"
                    y1="17"
                    x2="12"
                    y2="21"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <span>Watch Together</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <TrendingUp />
              </div>
              <span>Study Analytics & Progress</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="coming-soon-actions">
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
            Back to Home
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

        {/* Notification Signup */}
        <div className="notification-signup">
          <h3>Want to be notified when Study Rooms launches?</h3>
          <p>
            Stay updated and be among the first to experience collaborative
            studying!
          </p>
          <div className="signup-form">
            <button className="notify-btn">Notify Me</button>
          </div>
        </div>
      </div>
    </div>
  );
}
