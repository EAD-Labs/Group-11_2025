import React, { useState } from "react";
import Loading from "./loading";

export default function PersonalQuiz({
  onLoadQuiz,
  setIsLoading,
}: {
  onLoadQuiz: () => void;
  setIsLoading: (isLoading: boolean) => void;
}) {
  const getContext = async () => {
    const title = document.title;
    const description = document.getElementById("description")?.innerText;
    const youtuberelement = document.getElementById("channel-name");
    //goto inner most a element and  get text for  youtuber
    const youtuber = youtuberelement?.querySelector("a")?.innerText;
    return { title, description, youtuber };
  };
  const isAdPlaying = () => {
    const videoElement = document.getElementById("movie_player");
    if (videoElement) {
      const isAdPlaying =
        videoElement.classList.contains("ad-showing") ||
        videoElement.classList.contains("ad-interrupting");
      if (isAdPlaying) {
        console.log("ad is playing");
        return true;
      }
    }
    return false;
  };
  const onClickGeneratePersonalQuiz = async () => {
    console.log("onClickGeneratePersonalQuiz from personalquiz");
    const currentUrl = new URL(window.location.href);
    const videoId = currentUrl.searchParams.get("v");
    const context = await getContext();
    setIsLoading(true);

    const videoTimestamp = await getVideoTimestamp();
    chrome.runtime.sendMessage({
      action: "getPersonalQuiz",
      videoId: videoId,
      context: context,
      videoTimestamp: videoTimestamp,
    });

    onLoadQuiz();
    setIsLoading(false);
  };

  const getVideoTimestamp = async () => {
    const videoTimestamp = await new Promise((resolve) => {
      const videoTimestamp = document.querySelector(
        ".ytp-time-current"
      ) as HTMLSpanElement;
      resolve(videoTimestamp.textContent);
    });

    // Handle both MM:SS and HH:MM:SS formats
    const timestamp = videoTimestamp.toString().split(":");
    let seconds = 0;

    if (timestamp.length === 2) {
      // MM:SS format
      seconds = parseInt(timestamp[0]) * 60 + parseInt(timestamp[1]);
    } else if (timestamp.length === 3) {
      // HH:MM:SS format
      seconds =
        parseInt(timestamp[0]) * 3600 +
        parseInt(timestamp[1]) * 60 +
        parseInt(timestamp[2]);
    }

    return seconds;
  };
  return (
    <div>
      <button
        onClick={onClickGeneratePersonalQuiz}
        className="goqualify_button"
      >
        Generate Quiz
      </button>
    </div>
  );
}
