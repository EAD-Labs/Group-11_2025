import React from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";
import LinkExtractor from "./src/linkextractor/linkextractor";
import Transcript from "./src/transcript/Transcript";
import Login from "./src/components/login";

const App: React.FC<{}> = () => {
  return (
    <div className="popup_body">
      <Login />
    </div>
  );
};

const rootElement = document.createElement("div");
document.body.appendChild(rootElement);
const root = createRoot(rootElement);
root.render(<App />);
