import React, { useEffect, useState } from "react";
import { User, AuthResponse, AuthStatus } from "../../types/userType";
import { getCurrentUser } from "../../../background/authState";
import { BackgroundMessage } from "../../../background/backgroundRequest";
import "./login.css";
import IncompleteQuiz from "./incompleteQuiz";

const Login = () => {
  const [user, setUser] = useState<User | null>(null);

  // Check authentication status from background script
  const checkAuthStatus = async (): Promise<void> => {
    try {
      const response = chrome.runtime.sendMessage({
        action: "checkAuth",
      } as BackgroundMessage);
    } catch (error) {
      console.error("Failed to get auth status:", error);
    }
  };

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

      // Open the main website in a new tab
      chrome.tabs.create({ url: redirectUrl });

      // Close the popup after redirecting
      window.close();
    } catch (error) {
      console.error("Login redirect error:", error);
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      const response = chrome.runtime.sendMessage({
        action: "logout",
      } as BackgroundMessage);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleStudyAnalytics = async (): Promise<void> => {
    const frontendUrl = process.env.FRONTEND_URL;
    const redirectUrl = frontendUrl + "/studyanalytics";
    chrome.tabs.create({ url: redirectUrl });
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <div className="login-container">
      <div className="card-inner">
        {!user && <div className="tagline">Learn with GoQualify</div>}
        {user && (
          <div className="user-info">
            {user.picture ? (
              <img
                src={user.picture}
                alt="User avatar"
                className="avatar-img"
              />
            ) : (
              <div className="avatar-placeholder">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
            )}
            <div className="user-name">{user.name}</div>
            <div className="user-email">{user.email}</div>
          </div>
        )}
        <div className="buttons">
          {user ? (
            <>
              <button className="btn" onClick={handleStudyAnalytics}>
                Study Analytics
              </button>
              <button className="btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button className="btn" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
      </div>
      {user && <IncompleteQuiz />}
    </div>
  );
};

export default Login;
