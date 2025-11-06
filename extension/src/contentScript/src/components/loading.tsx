import React from "react";
import "../styles/loading.css";

const Loading = () => {
  return (
    <div className="loading_container">
      <div className="loading_content">
        <div className="loading_spinner">
          <div className="spinner_ring"></div>
          <div className="spinner_ring"></div>
          <div className="spinner_ring"></div>
        </div>
        <div className="loading_text">Processing...</div>
      </div>
    </div>
  );
};

export default Loading;
