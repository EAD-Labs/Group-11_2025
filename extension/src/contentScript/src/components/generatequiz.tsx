import React, { useState } from "react";

const saveQuiz = (quiz: any) => {
  chrome.storage.local.set({ quiz: quiz });
};

const saveTranscript = (transcript: any) => {
  chrome.storage.local.set({ transcript: transcript });
};

const GenerateQuiz = ({
  onLoadQuiz,
  setIsLoading,
}: {
  onLoadQuiz: () => void;
  setIsLoading: (isLoading: boolean) => void;
}) => {
  const getContext = async () => {
    const title = document.title;
    const description = document.getElementById("description")?.innerText;
    return { title, description };
  };
  const onClickGenerateQuiz = async () => {
    const context = await getContext();
    const currentUrl = new URL(window.location.href);
    const videoId = currentUrl.searchParams.get("v");
    setIsLoading(true);
    chrome.runtime.sendMessage({
      action: "generateQuiz",
      videoId: videoId,
      context: context,
    });
    onLoadQuiz();
    setIsLoading(false);
  };
  return (
    <div className="goqualify_generate_quiz">
      <button onClick={onClickGenerateQuiz} className="goqualify_button">
        Generate Quiz
      </button>
    </div>
  );
};

export default GenerateQuiz;
