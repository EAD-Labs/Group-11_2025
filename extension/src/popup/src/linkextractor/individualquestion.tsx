import React from "react";

const IndividualQuestion = ({ question }: { question: any }) => {
  return (
    <div>
      Question: {question.question}
      <div>
        {question.options.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              name={question.question}
              value={option.option}
            />
            <label>{option.option}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndividualQuestion;
