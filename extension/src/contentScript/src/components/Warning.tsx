import React, { useEffect, useState } from "react";
import "./Warning.css";
import { getWarningState } from "../../../background/warningState";

export default function Warning() {
  const [warning, setWarning] = useState({ value: false, videoId: "" });
  const [localvideoId, setlocalVideoId] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  //get videoId from url
  const url = window.location.href;
  useEffect(() => {
    setlocalVideoId(new URL(url).searchParams.get("v") || "");
  }, [url]);
  //listen if url changes from backend
  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      if (message.action === "urlChanged") {
        const newurl = new URL(message.url);
        setlocalVideoId(newurl.searchParams.get("v") || "");
      }
    });
  }, []);

  //add event listener that warning state is changed from storage
  useEffect(() => {
    const handleStorageChange = async (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      if (changes.warning) {
        const newWarning = await getWarningState();
        setWarning(newWarning);
      }
    };
    chrome.storage.onChanged.addListener(handleStorageChange);
    getWarningState().then((warning) => {
      setWarning(warning);
    });
    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);
  useEffect(() => {
    getWarningState().then((warning) => {
      if (warning.videoId !== localvideoId || warning.value === false) {
        setShowWarning(false);
      } else {
        setShowWarning(true);
      }
    });
  }, [localvideoId, url, warning]);

  const handleContinue = () => {
    chrome.runtime.sendMessage({
      action: "returnToQuiz",
    });
    setWarning({ value: false, videoId: "" });
    setShowWarning(false);
  };
  const handleSaveQuiz = () => {
    chrome.runtime.sendMessage({
      action: "saveQuizToBackend",
    });
    setWarning({ value: false, videoId: "" });
    setShowWarning(false);
  };

  if (showWarning) {
    return (
      <div className="rewision-warning-container">
        <div
          className="rewision-warning-backdrop"
          onClick={handleContinue}
        ></div>
        <div className="rewision-warning-modal">
          <div className="rewision-warning-icon">
            <svg
              className="rewision-warning-svg"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="rewision-warning-title">Warning</h3>
          <p className="rewision-warning-subtitle">
            Are you sure you want to leave?
          </p>
          <div className="rewision-warning-actions">
            <button
              onClick={handleContinue}
              className="rewision-warning-button rewision-warning-button-primary"
            >
              Continue Video
            </button>
            <button
              onClick={handleSaveQuiz}
              className="rewision-warning-button rewision-warning-button-secondary"
            >
              Save Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
}
