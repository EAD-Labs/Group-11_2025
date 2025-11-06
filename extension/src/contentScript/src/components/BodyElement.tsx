import React, { useEffect, useState } from "react";
import { QuizContainer } from "./question";
import LegendMenu from "./LegendMenu";
import Loading from "./loading";
import PersonalQuiz from "./personalquiz";
import { QuestionType } from "../videocomponents/question";
import { getIncompleteQuizState } from "../../../background/incompleteQuizState";

const getQuiz = async (): Promise<{
  questions: QuestionType[];
  videoId: string;
  _id: string;
  submitted: boolean;
}> => {
  return new Promise((resolve) => {
    chrome.storage.local.get("quiz", (result) => {
      const quiz = result.quiz || [];
      resolve(quiz);
    });
  });
};

const BodyElement = () => {
  const [quiz, setQuiz] = useState<{
    questions: QuestionType[];
    videoId: string;
    _id: string;
    submitted: boolean;
  }>({
    questions: [],
    videoId: "",
    _id: "",
    submitted: false,
  });
  const [showquiz, setShowquiz] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    onClickLoadQuiz();
  }, []);
  const onClickLoadQuiz = async () => {
    const newQuiz = await getQuiz();
    setQuiz(newQuiz);
  };
  const [incompleteQuizVideoId, setIncompleteQuizVideoId] = useState<string[]>(
    []
  );

  useEffect(() => {
    chrome.runtime.sendMessage({
      action: "getIncompleteQuizVideoId",
    });
  }, []);

  const fetchIncompleteQuizVideoId = async () => {
    const data = await getIncompleteQuizState();
    setIncompleteQuizVideoId(data);
  };

  //add event listener that warning state is changed from storage for our video id thing
  useEffect(() => {
    const handleStorageChange = async (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      if (changes.incompleteQuizState) {
        fetchIncompleteQuizVideoId();
      }
    };
    chrome.storage.onChanged.addListener(handleStorageChange);
    fetchIncompleteQuizVideoId();
    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  const handleUrlChange = (url: string) => {
    const currenturl = new URL(url);
    const currentvideoId = currenturl.searchParams.get("v");

    // Check if current video is in incomplete quiz list
    if (incompleteQuizVideoId.includes(currentvideoId)) {
      // console.log(
      //   "Current video is in incomplete quiz list, fetching quiz data"
      // );
      chrome.runtime.sendMessage({
        action: "FetchIncompleteQuiz",
        videoId: currentvideoId,
      });
    }

    if (quiz.videoId !== currentvideoId && !quiz.submitted) {
      setShowquiz(false);
    } else {
      setShowquiz(true);
    }
  };

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

  useEffect(() => {
    const currenturl = window.location.href;
    handleUrlChange(currenturl);
  }, [quiz, window.location.href, incompleteQuizVideoId]);
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
  const handleSubmitQuiz = async () => {
    const quizProgressId = quiz._id;
    chrome.runtime.sendMessage({
      action: "submitQuiz",
      quizProgressId,
    });
    // open new tab with redirectUrl http://localhost:3232/pastquizfullinfo/?quizId=68d2ed4babb76cfb97e0c5f1
    const redirectUrl = process.env.FRONTEND_URL + "/pastquizfullinfo";
    window.open(redirectUrl + "/?quizId=" + quizProgressId);
  };
  return (
    <div className="goqualify_container">
      <h1>Rewision</h1>
      {!showquiz && (
        <PersonalQuiz
          onLoadQuiz={onClickLoadQuiz}
          setIsLoading={setIsLoading}
        />
      )}

      {showquiz && (
        <div className="quizcontainer">
          <LegendMenu />
          <QuizContainer />
        </div>
      )}
      {showquiz && (
        <button className="goqualify_button" onClick={handleSubmitQuiz}>
          Submit Quiz
        </button>
      )}
      {isLoading && <Loading />}
    </div>
  );
};

export default BodyElement;
