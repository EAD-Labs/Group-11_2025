import { User } from "../popup/types/userType";



const setCurrentUser = (user: User ) => {
  chrome.storage.local.set({ "currentUser": user });
}

const setIsAuthenticated = (auth: boolean) => {
  chrome.storage.local.set({ "isAuthenticated": auth });
}

//define return type as user
const getCurrentUser = (): Promise<User> => {
  return new Promise((resolve) => {
    chrome.storage.local.get("currentUser", (result) => {
      resolve(result.currentUser);
    });
  });
}


const getIsAuthenticated = () => {
  chrome.storage.local.get("isAuthenticated", (result) => {
    return result.isAuthenticated;
  });
}

 const logoutFunction = () => {
  chrome.storage.local.remove(["quiz"]);
  chrome.storage.local.remove(["quizSession"]);
  chrome.storage.local.remove(["questionId"]);
  chrome.storage.local.remove(["videoId"]);
  chrome.storage.local.remove(["activity"]);
  chrome.storage.local.remove(["currentUser"]);
  chrome.storage.local.remove(["isAuthenticated"]);
}

export { 
  setCurrentUser, 
  setIsAuthenticated,
  getCurrentUser,
  getIsAuthenticated,
  logoutFunction
}; 

