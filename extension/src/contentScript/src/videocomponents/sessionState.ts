
  
  
  export const getQuestionId = (): string => {
    chrome.storage.local.get(["questionId"], (result) => {
      return result.questionId || "";
    });
    return "";
  };
  

  
  export const getVideoId = (): string => {
    chrome.storage.local.get(["videoId"], (result) => {
      return result.videoId || "";
    });
    return "";
  };
  

  
  export const getActivity= (): {_id: string, type: string, startTime: number, questionId: string, videoId: string} => {
    try {
    chrome.storage.local.get(["activity"], (result) => {
      return result.activity || {_id: "", type: "", startTime: 0, questionId: "", videoId: ""};
    });
    } catch (error) {
      return {_id: "", type: "", startTime: 0, questionId: "", videoId: ""};
    }
    return {_id: "", type: "", startTime: 0, questionId: "", videoId: ""};
  };
  
  export const getQuizSession= (): {_id: string, videoId: string, userId: string, startTime: number, activities: {_id: string, type: string, startTime: number, questionId: string}[]} => {
    chrome.storage.local.get(["quizSession"], (result) => {
      return result.quizSession || {_id: "", videoId: "", userId: "", startTime: 0, activities: []};
    });
    return {_id: "", videoId: "", userId: "", startTime: 0, activities: []};
  };
  
  