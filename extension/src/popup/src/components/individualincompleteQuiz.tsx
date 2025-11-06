import React, { useEffect, useState } from "react";

const IndividualIncompleteQuiz = ({ videoId }: { videoId: string }) => {
  // fetch thumnail from youtube
  const [thumbnail, setThumbnail] = useState<string>("");
  useEffect(() => {
    const fetchThumbnail = async () => {
      const thumbnail = await fetch(
        `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      );
      setThumbnail(thumbnail.url);
    };
    fetchThumbnail();
  }, [videoId]);

  // fetch title from youtube
  const [title, setTitle] = useState<string>("");
  useEffect(() => {
    const fetchTitle = async () => {
      const title = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
      );
      const data = await title.json();
      setTitle(data.title);
    };
    fetchTitle();
  }, [videoId]);

  if (!thumbnail || !title || !videoId || thumbnail === "" || title === "") {
    return <div>Loading...</div>;
  }

  const handleContinue = () => {
    // open youtube video
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
  };

  return (
    <div className="individual-incomplete-quiz">
      <img
        src={thumbnail}
        alt="thumbnail"
        className="individual-incomplete-quiz-thumbnail"
      />
      <p className="individual-incomplete-quiz-title">{title}</p>
      <button
        className="individual-incomplete-quiz-button"
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  );
};

export default IndividualIncompleteQuiz;
