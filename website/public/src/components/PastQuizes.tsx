import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchQuizProgress } from "../store/slices/quizProgressSlice";
import { Link } from "react-router-dom";
import "./PastQuizes.css";

interface QuizSession {
  _id: string;
  videoId: string;
  userId: string;
  startTime: number;
  endTime: number;
  totalDuration: number; //in milliseconds
  activities: Activity[];
}

interface Activity {
  _id: string;
  type: string;
  startTime: number;
  questionId: string;
  duration: number;
  videoId: string;
  endTime: number;
}

const PastQuizes = () => {
  const dispatch = useAppDispatch();
  const { quizProgress, loading, error } = useAppSelector(
    (state) => state.quizProgress
  );
  const [quizDurations, setQuizDurations] = useState<Record<string, number>>(
    {}
  );

  useEffect(() => {
    dispatch(fetchQuizProgress());
  }, [dispatch]);

  useEffect(() => {
    const fetchAllQuizDurations = async () => {
      if (quizProgress.length > 0) {
        const submittedQuizzes = quizProgress;
        const durationPromises = submittedQuizzes.map(async (quiz: any) => {
          const duration = await fetchQuizDuration(quiz._id);
          return { quizId: quiz._id, duration };
        });

        const results = await Promise.all(durationPromises);
        const durationMap: Record<string, number> = {};
        results.forEach(({ quizId, duration }) => {
          durationMap[quizId] = duration;
        });
        setQuizDurations(durationMap);
      }
    };

    fetchAllQuizDurations();
  }, [quizProgress]);

  // Function to get YouTube thumbnail URL
  const getYouTubeThumbnail = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  // Function to handle thumbnail load error and fallback to lower quality
  const handleThumbnailError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const img = e.target as HTMLImageElement;
    const videoId = img.src.split("/vi/")[1]?.split("/")[0];
    if (videoId && img.src.includes("maxresdefault")) {
      // Fallback to high quality default
      img.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    } else if (videoId && img.src.includes("hqdefault")) {
      // Fallback to medium quality default
      img.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    } else if (videoId && img.src.includes("mqdefault")) {
      // Final fallback to default quality
      img.src = `https://img.youtube.com/vi/${videoId}/default.jpg`;
    }
  };

  // Function to fetch quiz sessions and calculate total duration
  const fetchQuizDuration = async (quizProgressId: string) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${backendUrl}/quizsession/getQuizSession`, {
        method: "POST",
        body: JSON.stringify({ quizProgressId }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.data && Array.isArray(data.data)) {
        const totalDuration = data.data.reduce(
          (acc: number, session: QuizSession) => acc + session.totalDuration,
          0
        );
        return totalDuration;
      }
      return 0;
    } catch (error) {
      console.error("Error fetching quiz duration:", error);
      return 0;
    }
  };

  // Function to format duration in a readable format
  const formatDuration = (duration: number) => {
    if (duration >= 3600000) {
      const hours = Math.floor(duration / 3600000);
      const minutes = Math.floor((duration % 3600000) / 60000);
      const seconds = Math.floor((duration % 60000) / 1000);
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (duration >= 60000) {
      const minutes = Math.floor(duration / 60000);
      const seconds = Math.floor((duration % 60000) / 1000);
      return `${minutes}m ${seconds}s`;
    } else {
      const seconds = Math.floor(duration / 1000);
      return `${seconds}s`;
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading past quizzes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (quizProgress.length === 0) {
    return (
      <div className="home-empty-container">
        <div className="home-empty-content">
          <h2>No Past Quizzes</h2>
          <p>You haven't taken any quizzes yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="past-quizzes-container">
      <div className="past-quizzes-header">
        <h1>Learning History</h1>
      </div>

      <div className="quizzes-grid">
        {quizProgress.map((quiz: any) => {
          return (
            <div key={quiz._id} className="quiz-card">
              <div className="quiz-thumbnail">
                <img
                  src={getYouTubeThumbnail(quiz.videoId)}
                  alt={`${quiz.title} thumbnail`}
                  onError={handleThumbnailError}
                  loading="lazy"
                />
                <div className="thumbnail-overlay">
                  <div className="play-button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M8 5v14l11-7z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="quiz-card-header">
                <Link
                  to={`/pastquizfullinfo/?quizId=${quiz._id}`}
                  className="quiz-title-link"
                >
                  <h2 className="quiz-title">{quiz.title}</h2>
                </Link>
                <div className="quiz-meta">
                  <span className="quiz-date">
                    {new Date(
                      quiz.startTime || Date.now()
                    ).toLocaleDateString()}
                  </span>
                  <span className="quiz-duration">
                    {quizDurations[quiz._id] !== undefined
                      ? formatDuration(quizDurations[quiz._id])
                      : "Loading..."}
                  </span>
                </div>
              </div>

              <div className="quiz-card-content">
                <div className="quiz-score">
                  <div className="score-info">
                    <span className="score-label">Quiz Score</span>
                    <span className="score-percentage">
                      {Math.round(
                        (quiz.answered?.filter(
                          (answer: any) => answer.isCorrect
                        ).length /
                          (quiz.questions?.length || 1)) *
                          100
                      )}
                      %
                    </span>
                  </div>
                  <div className="progress-bar-container">
                    <div
                      className="progress-bar"
                      style={{
                        width: `${Math.round(
                          (quiz.answered?.filter(
                            (answer: any) => answer.isCorrect
                          ).length /
                            (quiz.questions?.length || 1)) *
                            100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="quiz-actions">
                  <Link
                    to={`/pastquizfullinfo/?quizId=${quiz._id}`}
                    className="view-results-btn"
                  >
                    View Results
                  </Link>
                  <a
                    href={`https://www.youtube.com/watch?v=${quiz.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="watch-again-btn"
                  >
                    {quiz.submitted ? "Watch Again" : "Continue"}
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PastQuizes;
