import { saveIncompleteQuizState, getIncompleteQuizState } from "./incompleteQuizState";
import { logoutFunction } from "./authState";

const saveQuiz = (quiz: any) => {
  chrome.storage.local.set({ quiz: quiz });
};

const fetchIncompleteQuizVideoId = async () => {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:4567';
  const response = await fetch(`${backendUrl}/quiz/allquizprogress`, {
    method: "GET",
    credentials: "include",
  });
  if (response.status === 401) {
    logoutFunction();
    return false;
  }
  const data = await response.json();
  saveIncompleteQuizState(data.data);
  return true;
};

const fetchIncompleteQuiz = async ({videoId}: {videoId: string}) => {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:4567';
  const response = await fetch(`${backendUrl}/quiz/incompletequiz/${videoId}`, {
    method: "GET",
    credentials: "include",
  });
  if (response.status === 401) {
    logoutFunction();
    return false;
  }
  const data = await response.json();
  saveQuiz(data.data);
  return true;
};


export { fetchIncompleteQuizVideoId, fetchIncompleteQuiz };