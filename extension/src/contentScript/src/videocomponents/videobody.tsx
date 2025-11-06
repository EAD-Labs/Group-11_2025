import React, { useEffect, useState } from "react";
import { QuestionType, VideoQuizContainer } from "./question";
import "../styles/videostyles.css";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

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

const getVideoDuration = async () => {
  const videoDuration = await new Promise((resolve) => {
    const videoDuration = document.querySelector(
      ".ytp-time-duration"
    ) as HTMLSpanElement;
    resolve(videoDuration.textContent);
  });

  // Handle both MM:SS and HH:MM:SS formats
  const duration = videoDuration.toString().split(":");
  let seconds = 0;

  if (duration.length === 2) {
    // MM:SS format
    seconds = parseInt(duration[0]) * 60 + parseInt(duration[1]);
  } else if (duration.length === 3) {
    // HH:MM:SS format
    seconds =
      parseInt(duration[0]) * 3600 +
      parseInt(duration[1]) * 60 +
      parseInt(duration[2]);
  }

  return seconds;
};

const VideoBody = () => {
  const questionId = useSelector(
    (state: RootState) => state.questionId.questionId
  );
  const handler = useSelector((state: RootState) => state.handler.handler);

  const [videoTimestamp, setVideoTimestamp] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const saveVideoTimestamp = async () => {
    const timestamp = await getVideoTimestamp();
    setVideoTimestamp(timestamp);
  };
  const saveVideoDuration = async () => {
    const duration = await getVideoDuration();
    setVideoDuration(duration);
  };
  const interval = setInterval(() => {
    saveVideoTimestamp();
    saveVideoDuration();
  }, 100);

  useEffect(() => {
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="video_body">
      <div className="video_quiz">
        <VideoQuizContainer
          videoTimestamp={videoTimestamp}
          videoDuration={videoDuration}
        />
      </div>
    </div>
  );
};

export default VideoBody;
