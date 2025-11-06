// src/Popup.tsx or any React component
import React, { useEffect, useState } from "react";
import IndividualQuestion from "./individualquestion";

const saveQuiz = (quiz: any) => {
  chrome.storage.local.set({ quiz: quiz });
};

const saveTranscript = (transcript: any) => {
  chrome.storage.local.set({ transcript: transcript });
};

const LinkExtractor = () => {
  // BACKEND_URL is in .env file
  const backendUrl = process.env.BACKEND_URL;
  const [url, setUrl] = useState("");

  const [transcript, setTranscript] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [reload, setReload] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      if (currentTab && currentTab.url) {
        setUrl(currentTab.url);
      }
    });
  }, []);
  const fetchTranscript = async () => {
    const video_id = url.split("v=")[1];
    const video_id_with_params = video_id.split("&")[0];
    const response = await fetch(
      `${backendUrl}/transcript/${video_id_with_params}`,
      {
        method: "POST",
        body: JSON.stringify({ num_questions: 3 }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    setTranscript(data.transcript);
    setQuiz(data.quiz.questions);
    saveQuiz(data.quiz.questions);
    saveTranscript(data.transcript);
  };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     await fetchTranscript();
  //     setLoading(false);
  //   };
  //   fetchData();
  // }, [url]);

  const handleReload = async () => {
    setReload(true);
    setLoading(true);
    await fetchTranscript();
    setLoading(false);
    setReload(false);
    console.log(transcript);
  };

  return (
    <div>
      <div className="button-container">
        <button onClick={handleReload} className="reload-button">
          Generate Transcript
        </button>
      </div>
      <div className="transcript-container">{/* <p>{transcript}</p> */}</div>
      {quiz.map((question, index) => (
        <IndividualQuestion question={question} key={index} />
      ))}
    </div>
  );
};

export default LinkExtractor;
