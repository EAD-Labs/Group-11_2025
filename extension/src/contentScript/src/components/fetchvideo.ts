

export const fetchQuiz = async ({videoId, incompleteQuizVideoId}: {videoId: string, incompleteQuizVideoId: string[]}) => {
//   if array includes videoId, then give request to background.js
//   else give request to background to generate quiz
if(incompleteQuizVideoId.includes(videoId)) {
    chrome.runtime.sendMessage({
        action: "getIncompleteQuizVideoId",
    });
}

};