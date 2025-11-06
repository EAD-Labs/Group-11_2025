import React from "react";
import type { QuestionState, QuestionType } from "./question";

type QuestionPaletteProps = {
  quizArray: QuestionType[];
  currentQuestion: string;
  questionStates: QuestionState[];
  onQuestionSelect: (questionId: string) => void;
};

const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  quizArray,
  currentQuestion,
  questionStates,
  onQuestionSelect,
}) => {
  return (
    <div className="question-palette">
      <h3 className="palette-title">Question Palette</h3>
      <div className="palette-grid">
        {quizArray.map((item: QuestionType, index) => (
          <button
            key={item._id}
            className={`palette-item ${
              currentQuestion === item._id ? "current" : ""
            } ${questionStates[index]}`}
            onClick={() => onQuestionSelect(item._id)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionPalette;
