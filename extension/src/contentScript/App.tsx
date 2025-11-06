import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./contentScript.css";
import BodyElement from "./src/components/BodyElement";
import Warning from "./src/components/Warning";
import { Provider } from "react-redux";
import store from "./src/store/store";
import { User } from "../popup/types/userType";
import { getCurrentUser } from "../background/authState";
const App = () => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async (): Promise<void> => {
    const user = await getCurrentUser();
    setUser(user as User);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  //look for changes in user in the background
  useEffect(() => {
    chrome.storage.onChanged.addListener(fetchUser);

    return () => {
      chrome.storage.onChanged.removeListener(fetchUser);
    };
  }, []);

  const handleLogin = async (): Promise<void> => {
    try {
      // Redirect to the main website frontend for login
      const frontendUrl = process.env.FRONTEND_URL;
      const redirectUrl =
        frontendUrl + "/login?source=extension&redirectTo=/extension";

      //open new tab with redirectUrl like window.open(redirectUrl, "_blank");
      window.open(redirectUrl, "_blank");
    } catch (error) {
      console.error("Login redirect error:", error);
    }
  };
  return (
    <Provider store={store}>
      <div className="body_app">
        {user ? (
          <BodyElement />
        ) : (
          <div className="body_app">
            <div className="goqualify_container">
              <h1>Rewision</h1>
              <p>Please login to continue</p>
              <button className="goqualify_button" onClick={handleLogin}>
                Login
              </button>
            </div>
          </div>
        )}
      </div>
      <Warning />
    </Provider>
  );
};

const renderApp = () => {
  const root = createRoot(document.getElementById("goqualify-root"));
  root.render(<App />);
};

export { renderApp };
