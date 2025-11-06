import React from "react";
import { answeredType } from "../../../background/quizconnections";
import { QuestionType } from "./question";
import "./videocomplete.css";

type QuizProgress = {
  _id: string;
  questions: QuestionType[];
  answered: answeredType[];
  videoId: string;
  chunkNumber: number[];
};

const QuizReport = ({ quiz }: { quiz: QuizProgress }) => {
  // Calculate statistics
  const totalQuestions = quiz.questions.length;
  const answeredQuestions = quiz.answered.length;
  const correctAnswers = quiz.answered.filter(
    (answer) => answer.isCorrect
  ).length;
  const incorrectAnswers = quiz.answered.filter(
    (answer) => answer.remark === "answered" && !answer.isCorrect
  ).length;
  const skippedQuestions = quiz.answered.filter(
    (answer) => answer.remark === "skipped"
  ).length;
  const savedQuestions = quiz.answered.filter(
    (answer) => answer.remark === "saved"
  ).length;
  const unansweredQuestions = totalQuestions - answeredQuestions;

  const accuracy =
    answeredQuestions > 0
      ? Math.round((correctAnswers / answeredQuestions) * 100)
      : 0;
  const completionRate = Math.round((answeredQuestions / totalQuestions) * 100);

  // Get question details for the report
  const getQuestionStatus = (questionId: string) => {
    const answer = quiz.answered.find((a) => a.questionId === questionId);
    if (!answer)
      return { status: "unanswered", color: "goqualify-not-visited" };

    switch (answer.remark) {
      case "answered":
        return answer.isCorrect
          ? { status: "correct", color: "goqualify-correct" }
          : { status: "incorrect", color: "goqualify-incorrect" };
      case "skipped":
        return { status: "skipped", color: "goqualify-visited" };
      case "saved":
        return { status: "saved", color: "goqualify-saved" };
      default:
        return { status: "unanswered", color: "goqualify-not-visited" };
    }
  };

  return (
    <div className="quiz-report-container">
      <div className="quiz-report-header">
        <h2>📊 Quiz Performance Report</h2>
        <p>Here's how you performed on this video quiz</p>
      </div>

      <div className="quiz-stats-grid">
        <div className="stat-card">
          <div className="stat-number">{totalQuestions}</div>
          <div className="stat-label">Total Questions</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{answeredQuestions}</div>
          <div className="stat-label">Answered</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{correctAnswers}</div>
          <div className="stat-label">Correct</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{accuracy}%</div>
          <div className="stat-label">Accuracy</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{completionRate}%</div>
          <div className="stat-label">Completion</div>
        </div>
      </div>

      <div className="quiz-breakdown">
        <h3>Question Breakdown</h3>
        <div className="breakdown-stats">
          <div className="breakdown-item correct">
            <span className="breakdown-color"></span>
            <span>Correct: {correctAnswers}</span>
          </div>
          <div className="breakdown-item incorrect">
            <span className="breakdown-color"></span>
            <span>Incorrect: {incorrectAnswers}</span>
          </div>
          <div className="breakdown-item skipped">
            <span className="breakdown-color"></span>
            <span>Skipped: {skippedQuestions}</span>
          </div>
          <div className="breakdown-item saved">
            <span className="breakdown-color"></span>
            <span>Saved: {savedQuestions}</span>
          </div>
          <div className="breakdown-item unanswered">
            <span className="breakdown-color"></span>
            <span>Unanswered: {unansweredQuestions}</span>
          </div>
        </div>
      </div>

      <div className="question-list">
        <h3>Question Details</h3>
        <div className="questions-grid">
          {quiz.questions.map((question, index) => {
            const { status, color } = getQuestionStatus(question._id);
            return (
              <div key={question._id} className={`question-item ${color}`}>
                <div className="question-number">{index + 1}</div>
                <div className="question-status">{status}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const VideoComplete = ({
  handleCompleteQuiz,
  quiz,
}: {
  handleCompleteQuiz: () => void;
  quiz: QuizProgress;
}) => {
  return (
    <div className="goqualify_video_question_container">
      <div className="goqualify_video_question">
        <QuizReport quiz={quiz} />
        <div className="goqualify_video_question_text">
          <button
            onClick={handleCompleteQuiz}
            className="goqualify_button goqualify_video_ok"
          >
            Submit and go to dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
