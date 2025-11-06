import { QuestionType } from "../contentScript/src/videocomponents/question";
import { answeredType } from "./quizconnections";
import {   getQuestionId,  saveQuestionId, getVideoId, saveVideoId, saveActivity, getActivity, saveQuizSession, getQuizSession} from "./sessionState";
import { logoutFunction } from "./authState";

const backendUrl = process.env.BACKEND_URL || 'http://localhost:4567';

const getQuiz = async (): Promise<{ questions: QuestionType[]; _id: string , answered: answeredType[] }> => {
    return new Promise((resolve) => {
      chrome.storage.local.get("quiz", (result) => {
        const quiz = result.quiz || [];
        resolve(quiz);
      });
    });
  };


const startQuizSession = async ({videoId, startTime, firstActivity, quizProgressId}: {videoId: string, startTime: number, firstActivity: {type: string, startTime: number, questionId: string}, quizProgressId: string}) => {
    const response = await fetch(`${backendUrl}/quizsession/create`, {
        method: "POST",
        body: JSON.stringify({videoId, startTime, firstActivity, quizProgressId}),
        headers: {  
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    if(response.status === 401) {
        logoutFunction();
        return {success: false};
    }
    if(firstActivity.type === "question") {
        saveQuestionId(firstActivity.questionId);
    }
    else if(firstActivity.type === "video") {
        saveVideoId(videoId);
    }
    const data = await response.json();
    // console.log("data in startQuizSession", data.data.quizSession);
    // console.log("data in startQuizSession", data.data.activity);
    saveQuizSession(data.data.quizSession);
    saveActivity(data.data.activity);
    return {success: true};
} 

let isProcessingActivity = false;

const addActivity = async ({videoId,  activityType, activityStartTime, questionId, quizProgressId}: {videoId: string, activityType: string, activityStartTime: number, questionId: string, quizProgressId: string}) => {
    if(isProcessingActivity) {
        // console.log("Returning from addActivity because isProcessingActivity is true");
        return;
    }
    try{
       
    
    isProcessingActivity = true;
    const quizSession = await getQuizSession();
    const activity = await getActivity();
    // console.log("activity in addActivity", activity);
    // console.log("request in addActivity", {videoId, activityType, activityStartTime, questionId, quizSessionId: quizSession._id});
    if(quizSession._id === "") {
        // console.log("creating quiz session in addActivity");
        const response = await startQuizSession({videoId, startTime: activityStartTime,quizProgressId: quizProgressId, firstActivity: {type: activityType, startTime: activityStartTime, questionId: questionId} });
        if(response.success) {
            return;
        }
        return;
    }
    if(questionId === activity.questionId && activityType === "quiz_taking" && activity.type === "quiz_taking") {
        return;
    }
    else if(videoId === activity.videoId && activityType === "video_viewing" && activity.type === "video_viewing") {
        return;
    }
    const endActivityResponse = await endActivity({activityEndTime: activityStartTime});
    const response = await fetch(`${backendUrl}/quizsession/addActivity`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({videoId,  activityType, activityStartTime, questionId, quizSessionId: quizSession._id}),
    });
    if(response.status === 401) {
        logoutFunction();
        return {success: false};
    }
    const data = await response.json();
    // console.log("data in addActivity", data);
    saveActivity(data.data);
    }
    catch(error) {
        console.log("error in addActivity", error);
    }
    finally {
        isProcessingActivity = false;
    }
} 


const endActivity = async ({ activityEndTime}: { activityEndTime: number}): Promise<{success: boolean}> => {
    return new Promise(async (resolve) => {
    const savedActivity = await getActivity();
    const quizSession = await getQuizSession();
    if(savedActivity.type === "") {
        resolve({success: false});
        return;
    }
    // console.log("endActivity in addActivity._id", savedActivity._id);
    const response = await fetch(`${backendUrl}/quizsession/endActivity`, {
        method: "POST",
        body: JSON.stringify({quizSessionId: quizSession._id, endTime:activityEndTime, activityId:savedActivity._id, quizProgressId: quizSession.quizProgressId}),
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if(response.status === 401) {
        logoutFunction();
        resolve({success: false});
        return;
    }
    const data = await response.json();
    // saveActivity({_id: "", type: "", startTime: 0, questionId: "", videoId: ""});
    resolve({success: true});
    });
} 

const endQuizSession = async ({endTime}: {endTime: number}) => {
    const quizSession = await getQuizSession();
    const activity = await getActivity();
    const response = await fetch(`${backendUrl}/quizsession/endQuizSession`, {
        method: "POST",
        body: JSON.stringify({quizSessionId: quizSession._id, endTime, activityId: activity._id, quizProgressId: quizSession.quizProgressId}),
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if(response.status === 401) {
        logoutFunction();
        return;
    }
    const data = await response.json();
    saveActivity({_id: "", type: "", startTime: 0, questionId: "", videoId: ""});
    saveQuizSession({_id: "", videoId: "", userId: "", startTime: 0, totalDuration: 0, activities: [], quizProgressId: ""});
} 

export { startQuizSession, addActivity, endActivity, endQuizSession};
