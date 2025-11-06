import React, { useState, useEffect } from "react";
import { TranscriptType } from "../../types/transcriptType";

const getTranscript = async (): Promise<TranscriptType> => {
  return new Promise((resolve) => {
    chrome.storage.local.get("transcript", (result) => {
      const transcript = result.transcript || null;
      resolve(transcript);
    });
  });
};

const Transcript = () => {
  const [transcript, setTranscript] = useState<TranscriptType | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);
  const [url, setUrl] = useState("");

  const saveTranscript = async () => {
    const transcript = await getTranscript();
    return transcript;
  };

  const getUrl = async (): Promise<string> => {
    return new Promise((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        if (currentTab && currentTab.url) {
          resolve(currentTab.url);
        } else {
          resolve("");
        }
      });
    });
  };

  const parseUrl = async ({
    url,
    transcript,
  }: {
    url: string;
    transcript: TranscriptType;
  }) => {
    const parsedUrl = new URL(url);
    const videoId = parsedUrl.searchParams.get("v");
    console.log("videoId", videoId);
    if (transcript?.videoId !== videoId) {
      return false;
    } else {
      return true;
    }
  };
  const asyncFunction = async () => {
    const newUrl = await getUrl();
    setUrl(newUrl as unknown as string);
    const newTranscript = await saveTranscript();
    setTranscript(newTranscript);
    const showTranscript = await parseUrl({
      url: newUrl as unknown as string,
      transcript: newTranscript as unknown as TranscriptType,
    });
    setShowTranscript(showTranscript);
  };
  useEffect(() => {
    asyncFunction();
  }, [url]);
  const copyTranscript = async () => {
    const transcript = await getTranscript();
    navigator.clipboard.writeText(transcript.transcript as unknown as string);
  };
  if (!transcript || !showTranscript) {
    return (
      <div className="transcript_container">
        <h1 className="transcript_title">Transcript</h1>
        <div className="transcript_content">Please Generate Quiz first</div>
      </div>
    );
  }
  return (
    <div className="transcript_container">
      <h1 className="transcript_title">Transcript</h1>
      <div className="transcript_buttons">
        <button className="transcript_button" onClick={saveTranscript}>
          Load Transcript
        </button>
        <button className="transcript_button" onClick={copyTranscript}>
          Copy Transcript
        </button>
      </div>
      <div className="transcript_content">{transcript.transcript}</div>
    </div>
  );
};

export default Transcript;
