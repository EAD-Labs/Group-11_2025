//pastquizfullinfo.tsx

import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchQuizProgress } from "../store/slices/quizProgressSlice";
import { useEffect, useState } from "react";
import type { QuizProgress } from "../store/slices/quizProgressSlice";
import { Lock } from "lucide-react";
import "./PastQuizFullInfo.css";

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

const PastQuizFullInfo = () => {
  const [searchParams] = useSearchParams();
  const quizId = searchParams.get("quizId");
  const dispatch = useAppDispatch();
  const { quizProgress, loading, error } = useAppSelector(
    (state) => state.quizProgress
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [quizSessions, setQuizSessions] = useState<QuizSession[]>([]);
  const [currentQuestionTime, setCurrentQuestionTime] = useState(0);

  const quiz = quizProgress.find((quiz: QuizProgress) => quiz._id === quizId);

  // Function to find the first answered question index
  const getFirstAnsweredQuestionIndex = (): number => {
    if (!quiz) return 0;

    for (let i = 0; i < quiz.questions.length; i++) {
      const question = quiz.questions[i];
      const answered = quiz.answered.find((a) => a.questionId === question._id);
      if (answered) {
        return i;
      }
    }
    return 0; // If no questions answered, default to first question
  };

  useEffect(() => {
    dispatch(fetchQuizProgress());
  }, [dispatch]);

  // Set initial question to first answered question when quiz loads
  useEffect(() => {
    if (quiz) {
      const firstAnsweredIndex = getFirstAnsweredQuestionIndex();
      setCurrentQuestionIndex(firstAnsweredIndex);
    }
  }, [quiz]);

  //fetch quiz sessions
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const fetchQuizSessions = async () => {
    const response = await fetch(`${backendUrl}/quizsession/getQuizSession`, {
      method: "POST",
      body: JSON.stringify({ quizProgressId: quiz?._id }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setQuizSessions(data.data);
  };

  //go in activities and find the activity with the questionId and set the currentQuestionTime
  const getCurrentQuestionTime = (questionId: string) => {
    const activity = quizSessions.find((session: QuizSession) =>
      session.activities.find(
        (activity: Activity) => activity.questionId === questionId
      )
    );
    //get duration of all the activities with the questionId and add them up
    const duration = activity?.activities.reduce(
      (acc: number, activity: Activity) => acc + activity.duration,
      0
    );
    return duration || 0;
  };
  useEffect(() => {
    setCurrentQuestionTime(
      getCurrentQuestionTime(quiz?.questions[currentQuestionIndex]._id || "")
    );
  }, [currentQuestionIndex, quizSessions, quiz]);

  useEffect(() => {
    setTotalDuration(
      quizSessions.reduce(
        (acc: number, session: QuizSession) => acc + session.totalDuration,
        0
      )
    );
  }, [quizSessions]);

  useEffect(() => {
    fetchQuizSessions();
  }, [quiz?._id]);

  const handleQuestionSelect = (index: number) => {
    // If quiz is not submitted, only allow navigation to answered questions
    if (!quiz?.submitted && quiz) {
      const question = quiz.questions[index];
      const answered = quiz.answered.find((a) => a.questionId === question._id);
      if (!answered) {
        return; // Don't allow navigation to unanswered questions
      }
    }
    setCurrentQuestionIndex(index);
  };

  const getQuestionState = (questionIndex: number): string => {
    if (!quiz) return "unanswered";

    const question = quiz.questions[questionIndex];
    const answered = quiz.answered.find((a) => a.questionId === question._id);

    if (answered) {
      return answered.isCorrect ? "correct" : "incorrect";
    }

    // If quiz is not submitted, unanswered questions should be locked
    if (!quiz.submitted) {
      return "locked";
    }

    return "unanswered";
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading quiz details...</p>
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

  if (!quiz) {
    return (
      <div className="error-container">
        <h2>Quiz Not Found</h2>
        <p>The requested quiz could not be found.</p>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const currentAnswered = quiz.answered.find(
    (a) => a.questionId === currentQuestion._id
  );

  // Check if any questions are answered
  const hasAnsweredQuestions = quiz.answered.length > 0;

  return (
    <div className="past-quiz-container">
      <div className="quiz-header">
        <h1>Quiz Results</h1>
        <div className="quiz-meta">
          <span className="total-questions">
            Questions: {quiz.questions.length}
          </span>
          <span className="total-duration">
            Total Duration:{" "}
            {totalDuration >= 3600000 ? (
              <>{Math.floor(totalDuration / 3600000)}h </>
            ) : (
              <></>
            )}
            {totalDuration >= 60000 ? (
              <>{Math.floor((totalDuration % 3600000) / 60000)}m </>
            ) : (
              <></>
            )}
            {Math.floor((totalDuration % 60000) / 1000)}s
          </span>
        </div>
      </div>

      {!quiz.submitted && (
        <div className="continue-section">
          <div className="continue-content">
            <h3>Continue Your Learning</h3>
            <p>
              This quiz is not yet completed. Continue watching the video to
              unlock more questions.
            </p>
            <a
              href={`https://www.youtube.com/watch?v=${quiz.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="continue-video-btn"
            >
              Continue Video
            </a>
          </div>
        </div>
      )}

      {!quiz.submitted && !hasAnsweredQuestions && (
        <div className="no-answers-section">
          <div className="no-answers-content">
            <h3>No Questions Answered Yet</h3>
            <p>
              You haven't answered any questions in this quiz yet. Start
              watching the video to begin answering questions.
            </p>
            <a
              href={`https://www.youtube.com/watch?v=${quiz.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="start-quiz-btn"
            >
              Start Quiz
            </a>
          </div>
        </div>
      )}

      {hasAnsweredQuestions && (
        <>
          <div className="current-question-time">
            <span className="current-question-time-text">
              Current Question Time:{" "}
              {currentQuestionTime >= 3600000 ? (
                <>{Math.floor(currentQuestionTime / 3600000)}h </>
              ) : (
                <></>
              )}
              {currentQuestionTime >= 60000 ? (
                <>{Math.floor((currentQuestionTime % 3600000) / 60000)}m </>
              ) : (
                <></>
              )}
              {Math.floor((currentQuestionTime % 60000) / 1000)}s
            </span>
          </div>

          <div className="quiz-content">
            <div className="question-palette-section">
              <h3>Question Palette</h3>
              <div className="question-palette">
                {quiz.questions.map((_, index) => {
                  const state = getQuestionState(index);
                  const isCurrent = index === currentQuestionIndex;
                  const isLocked = state === "locked";

                  return (
                    <button
                      key={index}
                      className={`palette-item ${
                        isCurrent ? "current" : ""
                      } ${state}`}
                      onClick={() => handleQuestionSelect(index)}
                      disabled={isLocked}
                      title={
                        isLocked ? "Complete previous questions to unlock" : ""
                      }
                    >
                      {isLocked ? <Lock size={16} /> : index + 1}
                    </button>
                  );
                })}
              </div>

              <div className="palette-legend">
                <div className="legend-item">
                  <div className="legend-color correct"></div>
                  <span>Correct</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color incorrect"></div>
                  <span>Incorrect</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color unanswered"></div>
                  <span>Unanswered</span>
                </div>
                {!quiz.submitted && (
                  <div className="legend-item">
                    <div className="legend-color locked"></div>
                    <span>Locked</span>
                  </div>
                )}
              </div>
            </div>

            <div className="question-display">
              <div className="question-header">
                <h2>
                  Question {currentQuestionIndex + 1} of {quiz.questions.length}
                </h2>
                <div className="question-status">
                  {currentAnswered ? (
                    <span
                      className={`status ${
                        currentAnswered.isCorrect ? "correct" : "incorrect"
                      }`}
                    >
                      {currentAnswered.isCorrect ? "✓ Correct" : "✗ Incorrect"}
                    </span>
                  ) : (
                    <span className="status unanswered">Not Answered</span>
                  )}
                </div>
              </div>

              <div className="question-content">
                <h3 className="question-text">{currentQuestion.question}</h3>

                <div className="options-container">
                  {currentQuestion.options.map((option) => {
                    const isSelected = currentAnswered?.answerId === option._id;
                    const isCorrectOption = option.isCorrect;

                    return (
                      <div
                        key={option._id}
                        className={`option-item ${
                          isSelected
                            ? isCorrectOption
                              ? "correct-selected"
                              : "incorrect-selected"
                            : ""
                        } ${isCorrectOption ? "correct-answer" : ""}`}
                      >
                        <span className="option-text">{option.option}</span>
                        {isSelected && (
                          <span className="selection-indicator">
                            {isCorrectOption ? "✓" : "✗"}
                          </span>
                        )}
                        {isCorrectOption && !isSelected && (
                          <span className="correct-indicator">
                            ✓ Correct Answer
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {currentAnswered && currentAnswered.remarks && (
                  <div className="remarks-section">
                    <h4>Remarks:</h4>
                    <p className="remarks-text">{currentAnswered.remarks}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PastQuizFullInfo;
