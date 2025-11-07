import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./QuizWarning.css";

export default function QuizWarning() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(1000);
  const chromeId = "plnlebalhbapbdfehnikkmplemhpoddh";

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleReturnToQuiz = () => {
    // Go back to the previous page (should be the quiz)

    chrome.runtime.sendMessage(chromeId, {
      action: "returnToQuiz",
      url: window.location.href,
      timestamp: Date.now(),
    });
  };

  const handleReturnToReport = () => {
    // Go back to the previous page (should be the quiz)

    chrome.runtime.sendMessage(chromeId, {
      action: "returnToReport",
      url: window.location.href,
      timestamp: Date.now(),
    });
  };

  const handleSaveQuiz = () => {
    chrome.runtime.sendMessage(chromeId, {
      action: "saveQuizToBackend",
      url: window.location.href,
      timestamp: Date.now(),
    });
  };

  return (
    <div className="quiz-warning-container">
      <div className="quiz-warning-content">
        <div className="warning-icon">⚠️</div>
        <h1>Quiz Warning</h1>
        <p className="warning-message">
          You are leaving your quiz! Your progress may be lost.
        </p>
        <p className="warning-subtitle">Are you sure you want to continue?</p>

        <div className="warning-actions">
          <button className="return-btn" onClick={handleReturnToQuiz}>
            Return to Quiz
          </button>
          <button className="continue-btn" onClick={handleReturnToReport}>
            Continue Anyway
          </button>
          <button className="save-btn" onClick={handleSaveQuiz}>
            Save Quiz
          </button>
        </div>

        <div className="countdown">
          <p>Auto-redirecting to home in {countdown} seconds...</p>
        </div>
      </div>
    </div>
  );
}
