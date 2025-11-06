import { renderApp } from "./App";
import { renderVideoApp } from "./VideoApp";
import "./contentScript.css";
import "./goqualify-colors.css";

// Track if we've already rendered to prevent multiple renders
let mainAppRendered = false;
let videoAppRendered = false;

// Function to safely render the main app (only once)
const renderMainApp = () => {
  if (mainAppRendered) return;
  
  try {
    // Check if root already exists
    if (document.getElementById("goqualify-root")) {
      mainAppRendered = true;
      return;
    }

    // Create a container div for your React app
    const newRoot = document.createElement("div");
    newRoot.id = "goqualify-root";

    // Find the element you want to inject into
    const title = document.getElementById("secondary-inner");

    // Inject and render only if the target exists
    if (title) {
      title.prepend(newRoot);
      renderApp();
      mainAppRendered = true;
    }
  } catch (error) {
    console.error("Error rendering GoQualify app:", error);
  }
};

// Function to safely render the video app (only once)
const renderVideoAppSafely = () => {
  if (videoAppRendered) return;
  
  try {
    // Check if root already exists
    if (document.getElementById("video_root")) {
      videoAppRendered = true;
      return;
    }

    const videoplayer = document.getElementById("movie_player");
    const videoRoot = document.createElement("ytd-player");
    videoRoot.id = "video_root";

    if (videoplayer) {
      videoplayer.appendChild(videoRoot);
      renderVideoApp();
      videoAppRendered = true;
    }
  } catch (error) {
    console.error("Error rendering video app:", error);
  }
};

// Function to attempt rendering with proper timing
const attemptRender = () => {
  renderMainApp();
  renderVideoAppSafely();
};

// Function to reset render flags when elements are removed
const resetRenderFlags = () => {
  if (!document.getElementById("goqualify-root")) {
    mainAppRendered = false;
  }
  if (!document.getElementById("video_root")) {
    videoAppRendered = false;
  }
};

// Set up MutationObserver to watch for DOM changes
const observer = new MutationObserver((mutations) => {
  let shouldAttemptRender = false;
  let shouldResetFlags = false;

  mutations.forEach((mutation) => {
    // Check if relevant elements were added
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        if (element.id === "panels" || element.id === "movie_player" || 
            element.querySelector("#panels") || element.querySelector("#movie_player")) {
          shouldAttemptRender = true;
        }
      }
    });

    // Check if our roots were removed
    mutation.removedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        if (element.id === "goqualify-root" || element.id === "video_root" ||
            element.querySelector("#goqualify-root") || element.querySelector("#video_root")) {
          shouldResetFlags = true;
        }
      }
    });
  });

  if (shouldResetFlags) {
    resetRenderFlags();
  }
  
  if (shouldAttemptRender) {
    // Small delay to ensure DOM is stable
    setTimeout(attemptRender, 100);
  }
});

// Start observing
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Try to render immediately
attemptRender();

// If DOM is still loading, wait for it
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", attemptRender, { once: true });
}

// Fallback: try once more after a short delay for dynamically added elements
setTimeout(attemptRender, 1000); 