//save question id

export const saveQuestionId = (questionId: string) => {
  chrome.storage.local.set({ questionId });
};

//get question and answer from local storage

export const getQuestionId = (): Promise<string> => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["questionId"], (result) => {
      resolve(result.questionId || "");
    });
  });
};

export const saveVideoId = (videoId: string) => {
  chrome.storage.local.set({ videoId });
};

export const getVideoId = (): Promise<string> => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["videoId"], (result) => {
      resolve(result.videoId || "");
    });
  });
};

export const saveActivity = (activity: {_id: string, type: string, startTime: number, questionId: string, videoId: string}) => {
  chrome.storage.local.set({ activity });
};

export const getActivity = (): Promise<{_id: string, type: string, startTime: number, questionId: string, videoId: string}> => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["activity"], (result) => {
      resolve(result.activity || {_id: "", type: "", startTime: 0, questionId: "", videoId: ""});
    });
  });
};

export const saveQuizSession = (quizSession: {_id: string, videoId: string, userId: string, startTime: number, totalDuration: number, activities: {_id: string, type: string, startTime: number, questionId: string}[], quizProgressId: string}) => {
  chrome.storage.local.set({ quizSession });
};

export const getQuizSession = (): Promise<{_id: string, videoId: string, userId: string, startTime: number, totalDuration: number, activities: {_id: string, type: string, startTime: number, questionId: string}[], quizProgressId: string}> => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["quizSession"], (storageResult) => {
      const result = storageResult.quizSession || {_id: "", videoId: "", userId: "", startTime: 0, totalDuration: 0, activities: [], quizProgressId: ""};
      resolve(result);
    });
  });
};