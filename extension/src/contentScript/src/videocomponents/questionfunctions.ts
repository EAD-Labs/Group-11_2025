import { getQuiz } from "./chromeapis";

export const handleShowQuestionLogic = (showQuiz: boolean, currentQuestionId: string, answered: any, setShowQuestion: (show: boolean) => void, isAdPlayingNow: boolean, handler: string, fromPalette: boolean = false) => {
  if (isAdPlayingNow) {
    setShowQuestion(false);
    return;
  }
    if (!showQuiz ) {
      setShowQuestion(false);
      return;
    } else {
      if (handler === "pallete" || fromPalette) {
        setShowQuestion(true);
        return;
      }
      if (currentQuestionId === "") {
        setShowQuestion(false);
        return;
      } else if (
        answered &&
        (answered.remark === "answered" ||
          answered.remark === "saved" ||
          answered.remark === "skipped")
      ) {
        setShowQuestion(false);
        return;
      } else {
        setShowQuestion(true);
      }
    }
  };
  export const handleSkipClick = async ({questionId, quizProgressId , setQuiz, videoElement}: {questionId: string, quizProgressId: string, setQuiz: (quiz: any) => void,videoElement: HTMLVideoElement}) => {
    const response: { success: boolean } = await new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          action: "skipQuestion",
          quizProgressId: quizProgressId,
          questionId: questionId,
        },
        (response) => {
          resolve(response);
        }
      );
    });
    if (response && response.success) {
      const updatedQuiz = await getQuiz();
      videoElement.play();
      setQuiz(updatedQuiz);
    }
  };

  export const handleSaveForLater = async ({questionId, quizProgressId, setQuiz, videoElement}: {questionId: string, quizProgressId: string, setQuiz: (quiz: any) => void, videoElement: HTMLVideoElement}) => {
    const response: { success: boolean } = await new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          action: "saveQuestion",
          quizProgressId: quizProgressId,
          questionId: questionId,
          answerId: "",
        },
        (response) => {
          resolve(response);
        }
      );
    });
    console.log("response from save for later in question.tsx", response);
    if (response && response.success) {
      const updatedQuiz = await getQuiz();
      
      setQuiz(updatedQuiz);
      videoElement.play();
    }
  };

  export const handleOkClick = async ({questionId, quizProgressId, setQuiz, videoElement}: {questionId: string, quizProgressId: string, setQuiz: (quiz: any) => void, videoElement: HTMLVideoElement}) => {
    //TODO: check answer
    const response: { success: boolean } = await new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          action: "checkAnswer",
          quizProgressId: quizProgressId,
          questionId: questionId,
        },
        (response) => {
          resolve(response);
        }
      );
    });
    console.log("clicked ok in question.tsx");
      const updatedQuiz = await getQuiz();
      console.log("trying to play video in question.tsx");
      console.log("videoElement", videoElement);
      videoElement.play();
      setQuiz(updatedQuiz);
    
  };

  export const handleOptionClick = async ({option, quizProgressId, setQuiz, currentQuestionId,}: {option: {
    option: string;
    isCorrect: boolean;
    _id: string;
  }, quizProgressId: string, setQuiz: (quiz: any) => void, currentQuestionId: string}) => {
    const response: { success: boolean } = await new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          action: "answerQuestion",
          quizProgressId: quizProgressId,
          questionId: currentQuestionId,
          answerId: option._id,
        },
        (response) => {
          resolve(response);
        }
      );
    });
    if (response && response.success) {
      const updatedQuiz = await getQuiz();
      setQuiz(updatedQuiz);
    }
  };