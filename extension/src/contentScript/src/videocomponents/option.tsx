import React, { useState } from "react";

type OptionProps = {
  option: {
    option: string;
    _id: string;
    isCorrect: boolean;
  };
  handleOptionClick: () => void;
  answered: {
    questionId: string;
    answerId: string;
    remark: string;
  } | null;
};

const OptionRenderer = ({
  option,
  handleOptionClick,
  answered,
}: OptionProps) => {
  if (
    answered &&
    (answered.remark === "answered" || answered.remark === "presented") &&
    (answered.answerId === option._id || option.isCorrect === true)
  ) {
    return (
      <div
        className={`goqualify_video_option ${
          option.isCorrect ? "goqualify_correct" : "goqualify_incorrect"
        }`}
        key={option._id}
      >
        {option.option}
      </div>
    );
  }
  return (
    <div
      className={`goqualify_video_option`}
      key={option._id}
      onClick={() => handleOptionClick()}
    >
      {option.option}
    </div>
  );
};

export default OptionRenderer;
