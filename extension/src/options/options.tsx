import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./options.css";

const App: React.FC<{}> = () => {
  const [user, setUser] = useState<any>(null);
  const backendurl = process.env.BACKEND_URL;
  const authcheck = async () => {
    const response = await fetch(`${backendurl}/auth/check`);
    const data = await response.json();
    setUser(data.user);
  };
  useEffect(() => {
    authcheck().catch((err) => {
      console.log(err);
    });
  }, []);
  return (
    <div className="popup_body">
      {user ? (
        <div>
          <p>Welcome, {user.name}</p>
        </div>
      ) : (
        <div>
          <p>Please login to continue</p>
          <a href={`${backendurl}/auth/google`} target="_blank">
            Login
          </a>
        </div>
      )}
      <button onClick={authcheck}>Refresh authentication</button>
    </div>
  );
};

const rootElement = document.createElement("div");
document.body.appendChild(rootElement);
const root = createRoot(rootElement);
root.render(<App />);
