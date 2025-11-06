import React from "react";

const Option = ({
  option,
  onClick,
  isCorrect,
  answered,
}: {
  option: string;
  onClick: () => void;
  isCorrect: boolean;
  answered: boolean;
}) => {
  if (answered) {
    if (isCorrect) {
      return <div className="goqualify_option goqualify_correct">{option}</div>;
    } else {
      return (
        <div className="goqualify_option goqualify_incorrect">{option}</div>
      );
    }
  } else {
    return (
      <div
        className="goqualify_option goqualify_option_hover"
        onClick={onClick}
      >
        {option}
      </div>
    );
  }
};

export default Option;
