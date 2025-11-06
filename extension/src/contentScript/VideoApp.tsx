import React from "react";
import { createRoot } from "react-dom/client";
import "./contentScript.css";
import VideoBody from "./src/videocomponents/videobody";
import { Provider } from "react-redux";
import store from "./src/store/store";
const App = () => {
  return (
    <Provider store={store}>
      <div className="video_app">
        <VideoBody />
      </div>
    </Provider>
  );
};

const renderVideoApp = () => {
  const root = createRoot(document.getElementById("video_root"));
  root.render(<App />);
};

export { renderVideoApp };
