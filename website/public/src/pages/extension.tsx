import React, { useState, useEffect } from "react";

const ExtensionPage: React.FC = () => {
  const [isExtensionInstalled, setIsExtensionInstalled] = useState<
    boolean | null
  >(null);
  const [isChecking, setIsChecking] = useState(true);

  // Get extension ID from environment variable or use default
  const extensionId =
    import.meta.env.VITE_EXTENSION_ID || "plnlebalhbapbdfehnikkmplemhpoddh";

  useEffect(() => {
    checkExtension();
  }, []);

  const checkExtension = () => {
    setIsChecking(true);

    // Check if chrome.runtime is available
    if (typeof chrome === "undefined" || !chrome.runtime) {
      setIsExtensionInstalled(false);
      setIsChecking(false);
      return;
    }

    // Try to send a ping message to the extension
    chrome.runtime.sendMessage(
      extensionId,
      {
        action: "ping",
        timestamp: Date.now(),
      },
      () => {
        if ((chrome as any).runtime.lastError) {
          // Extension not installed
          setIsExtensionInstalled(false);
        } else {
          // Extension is installed, notify it that user is logged in
          setIsExtensionInstalled(true);
          notifyExtensionLogin();
        }
        setIsChecking(false);
      }
    );
  };

  const notifyExtensionLogin = () => {
    chrome.runtime.sendMessage(extensionId, {
      action: "loggedIn",
    });
  };

  const handleInstallExtension = () => {
    const installUrl = `https://chrome.google.com/webstore/detail/${extensionId}`;
    window.open(installUrl, "_blank");
  };

  if (isChecking) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "18px",
          color: "#666",
        }}
      >
        Checking extension status...
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      {isExtensionInstalled ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            backgroundColor: "#f0f9ff",
            borderRadius: "8px",
            border: "1px solid #0ea5e9",
          }}
        >
          <h2 style={{ color: "#059669", marginBottom: "16px" }}>
            ✅ Extension Connected!
          </h2>
          <p
            style={{ fontSize: "16px", color: "#374151", marginBottom: "8px" }}
          >
            Your Rewision extension is installed and ready to use.
          </p>
          <p style={{ fontSize: "16px", color: "#374151" }}>
            You can now generate quizzes from YouTube videos!
          </p>
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            backgroundColor: "#fef2f2",
            borderRadius: "8px",
            border: "1px solid #fca5a5",
          }}
        >
          <h2 style={{ color: "#dc2626", marginBottom: "16px" }}>
            Extension Not Found
          </h2>
          <p
            style={{ fontSize: "16px", color: "#374151", marginBottom: "24px" }}
          >
            Please install the Rewision Chrome extension to get the full
            learning experience.
          </p>
          <button
            onClick={handleInstallExtension}
            style={{
              backgroundColor: "#4285F4",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            Install Extension
          </button>
        </div>
      )}
    </div>
  );
};

export default ExtensionPage;
