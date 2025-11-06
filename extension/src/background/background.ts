import {  handleLogout, checkAuthStatus } from "./backgroundfunctions";
import { User, AuthResponse, AuthStatus } from "../popup/types/userType";
import { BackgroundMessage } from "./backgroundRequest";
import { 
  
} from "./authState";
import { getPersonalQuiz, getPersonalQuizChunks, answerQuestion, checkAnswer, saveQuestion, skipQuestion, submitQuiz } from "./quizconnections";
import { startQuizSession, addActivity,  endQuizSession } from "./quizsession";
import {  setWarningState } from "./warningState";
import { fetchIncompleteQuiz, fetchIncompleteQuizVideoId } from "./incompleteQuiz";
import { getQuizSession } from "./sessionState";

chrome.runtime.onInstalled.addListener(async () => {
  // TODO: on installed function
})

// Check authentication status on startup
chrome.runtime.onStartup.addListener(async () => {
  await checkAuthStatus();
});

// Check authentication when extension is loaded
chrome.runtime.onInstalled.addListener(async () => {
  await checkAuthStatus();
});

// Handle login requests from popup
chrome.runtime.onMessage.addListener(async (
  request: BackgroundMessage, 
  sender: chrome.runtime.MessageSender, 
  sendResponse: (response: AuthResponse | AuthStatus) => void
) => {
  if (request.action === 'logout') {
    handleLogout().then(sendResponse);
    return true;
  }
  if (request.action === 'checkAuth') {
    checkAuthStatus()
    return true;
  }
  if (request.action === 'getPersonalQuiz') {
    getPersonalQuiz({videoId:request.videoId, context:request.context, videoTimestamp:request.videoTimestamp}).then((data) => {
      sendResponse({success: data});
    });
    return true;
  }
  if (request.action === 'getPersonalQuizChunks') {
    getPersonalQuizChunks({videoId:request.videoId, context:request.context, videoTimestamp:request.videoTimestamp}).then((data) => {
      sendResponse({success: data});
    });
    return true;
  }
  if (request.action === 'getIncompleteQuizVideoId') {
    fetchIncompleteQuizVideoId().then((data) => {
      sendResponse({success: data});
    });
    return true;
  }
  if (request.action === 'FetchIncompleteQuiz') {
    fetchIncompleteQuiz({videoId:request.videoId}).then((data) => {
      sendResponse({success: data});
    });
    return true;
  }
  if (request.action === 'answerQuestion') {
    answerQuestion({quizProgressId:request.quizProgressId, questionId:request.questionId, answerId:request.answerId}).then((data) => {
      sendResponse({success: data});
    });
    return true;
  }
  if (request.action === 'checkAnswer') {
    checkAnswer({quizProgressId:request.quizProgressId, questionId:request.questionId}).then((data) => {
      sendResponse({success: data});
    });
    return true;
  }
  if (request.action === 'saveQuestion') {
    saveQuestion({quizProgressId:request.quizProgressId, questionId:request.questionId}).then((data) => {
      sendResponse({success: data});
    });
    return true;
  }
  if (request.action === 'skipQuestion') {
    skipQuestion({quizProgressId:request.quizProgressId, questionId:request.questionId}).then((data) => {
      sendResponse({success: data});
    });
    return true;
  }
  if (request.action === 'submitQuiz') {
    endQuizSession({ endTime:Date.now()});
    submitQuiz({quizProgressId:request.quizProgressId}).then((data) => {
      sendResponse({success: data});
    });
    return true;
  }
  if (request.action === 'startQuizSession') {
    startQuizSession({videoId:request.videoId, startTime:request.startTime, firstActivity:request.firstActivity, quizProgressId:request.quizProgressId}).then((data) => {
      sendResponse({success: true});
    });
    return true;
  }
  if (request.action === 'addActivity') {
    addActivity({videoId:request.videoId,   activityType:request.activityType, quizProgressId:request.quizProgressId, activityStartTime:request.activityStartTime, questionId:request.questionId}).then((data) => {
      sendResponse({success: true});
    });
    return true;
  }
  if (request.action === 'endQuizSession') {
    endQuizSession({ endTime:request.endTime}).then((data) => {
      sendResponse({success: true});
    });
    return true;
  }
  if (request.action === 'getCurrentTab') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      sendResponse({ success: true, url: currentTab?.url || '' });
    });
    return true;
  }
  if(request.action === 'returnToQuiz') {
    const quizSession = await getQuizSession();
    const videoId = quizSession.videoId;
    //check if videoId is present in any active tab the url
    if(videoId) {
      const tabs = await chrome.tabs.query({ });
      for(const tab of tabs) {
        if(tab.url && tab.url.includes(videoId) && tab.url.includes('youtube.com/')) {
          chrome.tabs.update(tab.id, { active: true});
          setWarningState({warning: false, videoId: videoId});
          sendResponse({ success: true });
        }
      }
      
    }
    sendResponse({ success: true });
    return true;
  }
  if(request.action === 'saveQuizToBackend') {
    const quizSession = await getQuizSession();
    const videoId = quizSession.videoId;
    const tabs = await chrome.tabs.query({ });
    for(const tab of tabs) {
      if(videoId) {
        if(tab.url && tab.url.includes('youtube.com/') && tab.url.includes(quizSession.videoId)) {
          chrome.tabs.remove(tab.id);
        }
      }
    }
    setWarningState({warning: false, videoId: videoId});
    sendResponse({success: true});
    return true;
  }
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.url && tab.active) {
    // Send URL change to content script
    //if url is youtube.com/watch?v=... then send urlChanged message
    if (changeInfo.url.includes('youtube.com/watch?')) {
      try {
        chrome.tabs.sendMessage(tabId, { 
          action: 'urlChanged', 
          url: changeInfo.url 
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  }
}); 


chrome.tabs.onRemoved.addListener(async (tabId) => {
  // console.log("tab closed from background")
  chrome.tabs.query({ active: true }, async (tabs) => {
    let flag = false;
    for(const tab of tabs) {
      const url = new URL(tab.url);
      const videoId = url.searchParams.get('v');
      if(videoId) {
        flag = true;
      }
    }
    // console.log("flag decides if endQuizSession is called from background", flag);
    if(!flag) {
      const quizSession = await getQuizSession();
      if(quizSession.videoId) {
        endQuizSession({ endTime: Date.now()});
      }
    }
  });
});



const getCurrentTabUrl = (tabId: number): Promise<string> => {
  return new Promise((resolve) => {
    try { 
    chrome.tabs.get(tabId, (tab) => {
        resolve(tab.url as string);
      });
    } catch (error) {
      resolve("");
    }
  });
}

let lastActiveTabId = null;
//identify tab switch
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  // console.log("tab switched from background", activeInfo);
  // console.log("tab id from background", activeInfo.tabId);
  // Add small delay to avoid race conditions
  // wait for 100ms
  await new Promise(resolve => setTimeout(resolve, 100));
    try {
      let lastTabUrl = await getCurrentTabUrl(lastActiveTabId);
      const quizSession = await getQuizSession();
      const videoId = quizSession.videoId;
      if(videoId) {
      if( lastTabUrl && lastTabUrl.includes('youtube.com/watch') && lastTabUrl.includes(videoId)) {
        // console.log("setting warning state from background", {warning: true, videoId: videoId});
       setWarningState({warning: true, videoId: videoId});
       // go to last tab
         chrome.tabs.update(lastActiveTabId, { active: true});
      } 
    }
    } catch (error) {
      console.log("Error in tab activation listener:", error);
    }
    lastActiveTabId = activeInfo.tabId;
});

chrome.tabs.onRemoved.addListener(async (tabId) => {
  if(lastActiveTabId === tabId) {
    lastActiveTabId = "";
  }
});

//external message coming from website
chrome.runtime.onMessageExternal.addListener(async (message, sender, sendResponse) => {
  if(message.action === 'ping') {
    // Respond to ping to confirm extension is installed
    sendResponse({success: true, message: 'Extension is active'});
    return true;
  }
  if(message.action === 'loggedIn') {
    checkAuthStatus();
    //close the tab
    chrome.tabs.remove(sender.tab.id);
  } else if(message.action === 'loggedOut') {
    checkAuthStatus();
  } 
});