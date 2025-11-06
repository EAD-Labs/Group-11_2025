import React, { useState, useEffect } from "react";
import { getQuiz } from "./chromeapis";
import OptionRenderer from "./option";
import {
  handleShowQuestionLogic,
  handleSkipClick,
  handleSaveForLater,
  handleOkClick,
  handleOptionClick,
} from "./questionfunctions";
import { answeredType } from "../../../background/quizconnections";
import { getActivity } from "./sessionState";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setQuestionId } from "../store/questionIdSlice";
import { setHandler } from "../store/handlerSlice";
import { VideoComplete } from "./videocomplete";

export type QuestionState =
  | "goqualify-not-visited"
  | "goqualify-visited"
  | "goqualify-saved"
  | "goqualify-correct"
  | "goqualify-incorrect";

export type QuestionType = {
  question: string;
  timestamp: number;
  _id: string;
  options: {
    option: string;
    isCorrect: boolean;
    _id: string;
  }[];
};

type VideoQuizContainerProps = {
  videoTimestamp: number;
  videoDuration: number;
};

export const VideoQuizContainer: React.FC<VideoQuizContainerProps> = ({
  videoTimestamp,
  videoDuration,
}) => {
  const [quiz, setQuiz] = useState<{
    chunkNumber: number[];
    questions: QuestionType[];
    _id: string;
    answered: answeredType[];
    videoId: string;
  }>({
    chunkNumber: [],
    questions: [],
    _id: "",
    answered: [],
    videoId: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType | null>(
    null
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answered, setAnswered] = useState<{
    questionId: string;
    answerId: string;
    remark: string;
  } | null>(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [isAdPlayingNow, setIsAdPlayingNow] = useState(false);
  const reduxquestionId = useSelector(
    (state: RootState) => state.questionId.questionId
  );
  const handler = useSelector((state: RootState) => state.handler.handler);

  useEffect(() => {
    if (handler === "pallete") {
      //set the redux question id to the current question id
      dispatch(setQuestionId(reduxquestionId));
      //set the redux question to the current question
      const currentQuestion = quiz.questions.find(
        (question) => question._id === reduxquestionId
      );
      if (currentQuestion) {
        setCurrentQuestion(currentQuestion);
        setCurrentQuestionId(currentQuestion._id);
        setCurrentQuestionIndex(quiz.questions.indexOf(currentQuestion));
        setAnswered(
          quiz.answered.find(
            (answer) => answer.questionId === currentQuestion._id
          ) || null
        );
        if (videoElement) {
          videoElement.currentTime = currentQuestion.timestamp;
        }
      }

      dispatch(setHandler("invideo"));
    } else {
    }
  }, [handler, reduxquestionId]);
  useEffect(() => {
    // Handle edge cases first
    if (!quiz || !quiz.questions || quiz.questions.length === 0) {
      setCurrentQuestionId("");
      setCurrentQuestion(null);
      setAnswered(null);
      setCurrentQuestionIndex(-1);
      return;
    }

    // Find the appropriate question based on video timestamp
    let selectedQuestion: QuestionType | null = null;
    let selectedIndex = -1;

    // Case 1: Video timestamp is before the first question
    if (videoTimestamp < quiz.questions[0].timestamp) {
      // Don't show any question yet
      setCurrentQuestionId("");
      setCurrentQuestion(null);
      setAnswered(null);
      setCurrentQuestionIndex(-1);
      return;
    }

    // Case 2: Video timestamp is after the last question
    if (videoTimestamp >= quiz.questions[quiz.questions.length - 1].timestamp) {
      selectedQuestion = quiz.questions[quiz.questions.length - 1];
      selectedIndex = quiz.questions.length - 1;
    } else {
      // Case 3: Find the question that should be shown
      // We want to show the question whose timestamp is <= videoTimestamp
      // and the next question's timestamp is > videoTimestamp
      for (let i = 0; i < quiz.questions.length; i++) {
        const currentQuestion = quiz.questions[i];
        const nextQuestion = quiz.questions[i + 1];

        // If this is the last question or the next question's timestamp is greater than video timestamp
        if (!nextQuestion || nextQuestion.timestamp > videoTimestamp) {
          // Check if we've reached this question's timestamp
          if (videoTimestamp >= currentQuestion.timestamp) {
            selectedQuestion = currentQuestion;
            selectedIndex = i;
            break;
          }
        }
      }
    }

    // Update state with the selected question
    if (selectedQuestion) {
      setCurrentQuestionId(selectedQuestion._id);
      setCurrentQuestion(selectedQuestion);
      const answered = quiz.answered.find(
        (answer) => answer.questionId === selectedQuestion._id
      );
      setAnswered(answered || null);
      setCurrentQuestionIndex(selectedIndex);
    } else {
      // No question should be shown at this timestamp
      setCurrentQuestionId("");
      setCurrentQuestion(null);
      setAnswered(null);
      setCurrentQuestionIndex(-1);
    }
  }, [videoTimestamp, quiz]);

  const handleUrlChange = (url: string) => {
    const currenturl = new URL(url);
    const currentvideoId = currenturl.searchParams.get("v");
    if (quiz.videoId !== currentvideoId) {
      setShowQuiz(false);
    } else {
      setShowQuiz(true);
    }
  };

  useEffect(() => {
    const messageHandler = (message: any) => {
      if (message.action === "urlChanged") {
        handleUrlChange(message.url);
      }
    };

    chrome.runtime.onMessage.addListener(messageHandler);

    return () => {
      chrome.runtime.onMessage.removeListener(messageHandler);
    };
  }, [handleUrlChange]);
  useEffect(() => {
    const currenturl = window.location.href;
    handleUrlChange(currenturl);
  }, [quiz, window.location.href]);
  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      if (message.action === "urlChanged") {
        handleUrlChange(message.url);
      }
    });
    return () => {
      chrome.runtime.onMessage.removeListener((message) => {
        if (message.action === "urlChanged") {
          handleUrlChange(message.url);
        }
      });
    };
  }, [quiz]);

  useEffect(() => {
    // Listen for storage changes to automatically update quiz data
    const handleStorageChange = (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      if (changes.quiz) {
        // Use the new value directly from the change event
        if (changes.quiz.newValue) {
          setQuiz(changes.quiz.newValue);
        } else {
          // Fallback to getQuiz if newValue isn't available
          getQuiz().then((updatedQuiz) => {
            setQuiz(updatedQuiz);
          });
        }
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

  const videoElement = document.querySelector("video");

  useEffect(() => {
    handleShowQuestionLogic(
      showQuiz,
      currentQuestionId,
      answered,
      setShowQuestion,
      isAdPlayingNow,
      handler
    );
  }, [showQuiz, currentQuestionId, answered, videoTimestamp]);

  const trackQuestion = () => {
    const { questionId } = getActivity();
    if (questionId === currentQuestionId) {
      return;
    } else {
      if (showQuiz) {
        try {
          chrome.runtime.sendMessage({
            action: "addActivity",
            videoId: quiz.videoId,
            activityType: "quiz_taking",
            activityStartTime: Date.now(),
            questionId: currentQuestionId,
            quizProgressId: quiz._id,
          });
        } catch (error) {
          console.log("Error in trackQuestion", error);
        }
      }
    }
  };
  const trackVideo = () => {
    const { videoId } = getActivity();
    if (videoId === quiz.videoId) {
      return;
    } else {
      if (showQuiz) {
        try {
          chrome.runtime.sendMessage({
            action: "addActivity",
            videoId: quiz.videoId,
            activityType: "video_viewing",
            activityStartTime: Date.now(),
            questionId: currentQuestionId,
            quizProgressId: quiz._id,
          });
        } catch (error) {
          console.log("Error in trackVideo", error);
        }
      }
    }
  };

  useEffect(() => {
    if (videoElement) {
      if (showQuestion) {
        trackQuestion();
        videoElement.pause();
      } else {
        trackVideo();
      }
    }
  }, [showQuestion, videoTimestamp, videoDuration]);

  //check is ad is playing

  const isAdPlaying = () => {
    const videoElement = document.getElementById("movie_player");
    if (videoElement) {
      const isAdPlaying =
        videoElement.classList.contains("ad-showing") ||
        videoElement.classList.contains("ad-interrupting");
      return isAdPlaying;
    }
    return false;
  };

  useEffect(() => {
    const isAd = isAdPlaying();
    if (isAd) {
      setIsAdPlayingNow(true);
    } else {
      setIsAdPlayingNow(false);
    }
  }, [videoTimestamp]);

  useEffect(() => {
    if (showQuiz) {
      // checking for chunk after 5 minutes to generate quiz in advance
      const chunkNumber = Math.floor((videoTimestamp + 300) / 1800) + 1;
      if (!quiz.chunkNumber.includes(chunkNumber)) {
        chrome.runtime.sendMessage({
          action: "getPersonalQuizChunks",
          videoId: quiz.videoId,
          videoTimestamp: videoTimestamp + 300,
          context: {
            title: document.title,
            description: document.getElementById("description")?.innerText,
            youtuber: document.getElementById("channel-name")?.innerText,
          },
        });
      }
    }
  }, [videoTimestamp, videoDuration]);

  const handleCompleteQuiz = () => {
    chrome.runtime.sendMessage({
      action: "submitQuiz",
      quizProgressId: quiz._id,
    });
    const redirectUrl = process.env.FRONTEND_URL + "/pastquizfullinfo";
    window.open(redirectUrl + "/?quizId=" + quiz._id);
  };

  if (videoDuration <= videoTimestamp && showQuiz) {
    return (
      <VideoComplete handleCompleteQuiz={handleCompleteQuiz} quiz={quiz} />
    );
  }

  if (!showQuestion) {
    return <div></div>;
  } else {
    return (
      <div className="goqualify_video_question_container">
        <div className="goqualify_video_question">
          <div className="goqualify_video_question_text">
            {currentQuestionIndex + 1}. {currentQuestion?.question}
          </div>
          <div className="goqualify_video_options_container">
            {currentQuestion?.options.map((option) => {
              return (
                <OptionRenderer
                  option={option}
                  handleOptionClick={() =>
                    handleOptionClick({
                      option,
                      quizProgressId: quiz._id,
                      setQuiz: setQuiz,
                      currentQuestionId: currentQuestionId,
                    })
                  }
                  key={option._id}
                  answered={answered}
                />
              );
            })}
          </div>
          <div className="goqualify_video_question_buttons">
            {!answered && (
              <button
                onClick={() =>
                  handleSkipClick({
                    questionId: currentQuestionId,
                    quizProgressId: quiz._id,
                    setQuiz: setQuiz,
                    videoElement,
                  })
                }
                className="goqualify_button goqualify_video_skip"
              >
                Skip
              </button>
            )}
            {!answered && (
              <button
                onClick={() =>
                  handleSaveForLater({
                    questionId: currentQuestionId,
                    quizProgressId: quiz._id,
                    setQuiz: setQuiz,
                    videoElement,
                  })
                }
                className="goqualify_button goqualify_video_save"
              >
                Save For Later
              </button>
            )}
            {answered && answered?.remark === "presented" && (
              <>
                <button
                  onClick={() =>
                    handleOkClick({
                      questionId: currentQuestionId,
                      quizProgressId: quiz._id,
                      setQuiz: setQuiz,
                      videoElement,
                    })
                  }
                  className="goqualify_button goqualify_video_ok"
                >
                  Continue
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
};
