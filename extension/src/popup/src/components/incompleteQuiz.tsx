import React, { useEffect, useState } from "react";
import { getIncompleteQuizState } from "../../../background/incompleteQuizState";
import "./incompleteQuiz.css";
import IndividualIncompleteQuiz from "./individualincompleteQuiz";
import { getWarningState } from "../../../background/warningState";

export default function IncompleteQuiz() {
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

  //   get current url from chrome tabs and remove the videoId from incompleteQuizVideoId
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      if (
        currentTab &&
        currentTab.url &&
        currentTab.url.includes("youtube.com/watch?")
      ) {
        const url = new URL(currentTab.url);
        const videoIdToRemove = url.searchParams.get("v");
        setIncompleteQuizVideoId((prevVideoIds) =>
          prevVideoIds.filter((videoId) => videoId !== videoIdToRemove)
        );
      }
    });
  }, []);

  if (incompleteQuizVideoId.length === 0) {
    return <h2>No incomplete quiz</h2>;
  }
  return (
    <div className="incomplete-quiz-container">
      <h2>IncompleteQuiz</h2>
      <div className="incomplete-quiz-container-individual">
        {incompleteQuizVideoId.map((videoId) => (
          <IndividualIncompleteQuiz videoId={videoId} key={videoId} />
        ))}
      </div>
    </div>
  );
}
