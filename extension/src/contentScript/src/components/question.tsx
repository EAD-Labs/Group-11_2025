import React, { useState, useEffect } from "react";
import QuestionPalette from "./questionpallete";
import { getQuiz } from "../videocomponents/chromeapis";
import { useDispatch, useSelector } from "react-redux";
import { setQuestionId } from "../store/questionIdSlice";
import { RootState, AppDispatch } from "../store/store";
import { setHandler } from "../store/handlerSlice";

export type QuestionState =
  | "goqualify-not-visited"
  | "goqualify-visited"
  | "goqualify-saved"
  | "goqualify-correct"
  | "goqualify-incorrect";

export type QuestionType = {
  question: string;
  _id: string;
  options: {
    option: string;
    isCorrect: boolean;
    _id: string;
  }[];
};

type answeredType = {
  questionId: string;
  answerId: string;
  remark: string;
};

export const QuizContainer: React.FC = () => {
  const [quiz, setQuiz] = useState<{
    questions: QuestionType[];
    _id: string;
    answered: answeredType[];
  }>({
    questions: [],
    _id: "",
    answered: [],
  });

  const dispatch = useDispatch<AppDispatch>();
  const questionId = useSelector(
    (state: RootState) => state.questionId.questionId
  );

  // Fetch quiz data on component mount
  useEffect(() => {
    // Listen for storage changes to automatically update quiz data
    const handleStorageChange = (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      if (changes.quiz) {
        getQuiz().then((updatedQuiz) => {
          setQuiz(updatedQuiz);
        });
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    // Initial quiz load
    getQuiz().then((quiz) => {
      setQuiz(quiz);
    });

    // Cleanup listener on unmount
    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  // Get question state based on server data
  const getQuestionState = (questionIndex: number): QuestionState => {
    const question = quiz.questions[questionIndex];
    if (!question) return "goqualify-not-visited";

    const answered = quiz.answered.find(
      (answer) => answer.questionId === question._id
    );

    if (!answered) return "goqualify-not-visited";

    switch (answered.remark) {
      case "presented":
        return "goqualify-visited";
      case "answered":
        // Check if the selected answer was correct
        const selectedAnswer = answered.answerId;
        const correctOption = question.options.find((opt) => opt.isCorrect);
        return selectedAnswer === correctOption?._id
          ? "goqualify-correct"
          : "goqualify-incorrect";
      case "saved":
        return "goqualify-saved";
      case "skipped":
        return "goqualify-visited";
      default:
        return "goqualify-not-visited";
    }
  };

  // Get all question states for the palette
  const getQuestionStates = (): QuestionState[] => {
    return quiz.questions.map((_, index) => getQuestionState(index));
  };

  const goToQuestion = (questionId: string) => {
    dispatch(setQuestionId(questionId));
    dispatch(setHandler("pallete"));
  };

  if (!quiz || quiz.questions.length === 0) {
    return <div>No questions available</div>;
  }

  const questionStates = getQuestionStates();

  return (
    <>
      <QuestionPalette
        quizArray={quiz.questions}
        currentQuestion={questionId}
        questionStates={questionStates}
        onQuestionSelect={goToQuestion}
      />
    </>
  );
};
