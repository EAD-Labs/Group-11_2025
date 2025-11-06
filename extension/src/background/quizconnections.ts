import { QuestionType } from "../contentScript/src/videocomponents/question";
import { logoutFunction } from "./authState";
import { addQuizGenerationState, removeQuizGenerationState , getQuizGenerationState, QuizGenerationState} from "./quizGenerationState";

export type answeredType = {
  questionId: string;
  answerId: string;
  remark: string;
  isCorrect: boolean;
}

const getQuiz = async (): Promise<{ questions: QuestionType[]; _id: string , answered: answeredType[] }> => {
  return new Promise((resolve) => {
    chrome.storage.local.get("quiz", (result) => {
      const quiz = result.quiz || [];
      resolve(quiz);
    });
  });
};

const backendUrl = process.env.BACKEND_URL;

const saveQuiz = (quiz: any) => {
    chrome.storage.local.set({ quiz: quiz });
  };
  

const getPersonalQuiz = async ({videoId, context, videoTimestamp}: {videoId: string, context: any, videoTimestamp: number}) => {
  const date = new Date().toISOString();
  const quizGenerationState = await getQuizGenerationState();
  if(quizGenerationState.some((state: QuizGenerationState) => state.videoId === videoId && state.chunkNumber === Math.floor(videoTimestamp / 1800) + 1)) {
    return false;
  }
  else{
  addQuizGenerationState({videoId, chunkNumber: Math.floor(videoTimestamp / 1800) + 1});
    const response = await fetch(`${backendUrl}/quiz/personalquiz/${videoId}`, {
        method: "POST",
        body: JSON.stringify({ ...context, date, videoTimestamp}),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    if (response.status === 401) {
      logoutFunction();
      return false;
    }
    const data = await response.json();
    // console.log("data from quizconnections", data);
    removeQuizGenerationState({videoId, chunkNumber: Math.floor(videoTimestamp / 1800) + 1});
    saveQuiz(data.data);
    // console.log("Quiz generted from quizconnections");
    return true;
  }
}

const getPersonalQuizChunks = async ({videoId, context, videoTimestamp}: {videoId: string, context: any, videoTimestamp: number}) => {
  const quizGenerationState = await getQuizGenerationState();
  if(quizGenerationState.some((state: QuizGenerationState) => state.videoId === videoId && state.chunkNumber === Math.floor(videoTimestamp / 1800) + 1)) {
    console.log("not generating quiz for this chunk from quizconnections");
    console.log("quizGenerationState", quizGenerationState);
    // return false;
  }
else{
  addQuizGenerationState({videoId, chunkNumber: Math.floor(videoTimestamp / 1800) + 1});
    const response = await fetch(`${backendUrl}/quiz/personalquiz/chunks/${videoId}`, {
        method: "POST",
        body: JSON.stringify({ ...context, videoTimestamp}),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    if (response.status === 401) {
      logoutFunction();
      return false;
    }
    const data = await response.json();
    // console.log("data from quizconnections", data);
    removeQuizGenerationState({videoId, chunkNumber: Math.floor(videoTimestamp / 1800) + 1});
    saveQuiz(data.data);
    // console.log("Quiz generted from quizconnections");
    return true;
  }
}

const answerQuestion = async ({quizProgressId, questionId, answerId}: {quizProgressId: string, questionId: string, answerId: string}) => {
    const response = await fetch(`${backendUrl}/quiz/answerquestion`, {
        method: "POST",
        body: JSON.stringify({ quizProgressId, questionId, answerId }),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    if (response.status === 401) {
      logoutFunction();
      return false;
    }
    const data = await response.json();
    if (data.success) {
      const answered = data.data;
      const quiz = await getQuiz();
      const existingAnswer = quiz.answered.find((answer: answeredType) => answer.questionId.toString() === questionId.toString());
      if (existingAnswer) {
        existingAnswer.remark = answered.remark;
        existingAnswer.answerId = answered.answerId;
        existingAnswer.isCorrect = answered.isCorrect;
        saveQuiz(quiz);
        return true;
      } else {
        quiz.answered.push(answered);
        saveQuiz(quiz);
        return true;
      }
    }
    return false;
}

const checkAnswer = async ({quizProgressId, questionId}: {quizProgressId: string, questionId: string}) => {
  // console.log("Checking answer for question from quizconnections:", questionId);
  const response = await fetch(`${backendUrl}/quiz/checkanswer`, {
      method: "POST",
      body: JSON.stringify({ quizProgressId, questionId }),
      headers: {
          "Content-Type": "application/json",
      },
      credentials: "include",
  });
  if (response.status === 401) {
    logoutFunction();
    return false;
  }
  const data = await response.json();
  if (data.success) {
    const answered = data.data;
    const quiz = await getQuiz();
    
    // Ensure quiz has the proper structure
    if (!quiz || !quiz.answered) {
      // console.error("Quiz structure is invalid:", quiz);
      return false;
    }
    
    // Find and update the answered question
    const answeredQuestion = quiz.answered.find((answer: answeredType) => 
      answer.questionId.toString() === questionId.toString()
    );
    
    if (answeredQuestion) {
      answeredQuestion.remark = answered.remark;
      saveQuiz(quiz);
      // console.log("Updated quiz with answered question:", quiz);
      return true;
    } else {
      // console.error("Question not found in quiz.answered:", questionId);
      // console.log("Available answered questions:", quiz.answered);
      return false;
    }
  }
  return false;
}

const saveQuestion = async ({quizProgressId, questionId}: {quizProgressId: string, questionId: string}) => {
  const response = await fetch(`${backendUrl}/quiz/savequestion`, {
    method: "POST",
    body: JSON.stringify({ quizProgressId, questionId }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.status === 401) {
    logoutFunction();
    return false;
  }
  const data = await response.json();
  if (data.success) {
    const answered = data.data;
    const quiz = await getQuiz();
    
    // Ensure quiz has the proper structure
    if (!quiz || !quiz.answered) {
      // console.error("Quiz structure is invalid:", quiz);
      return false;
    }
    
    // Find and update the answered question
    const answeredQuestion = quiz.answered.find((answer: answeredType) => 
      answer.questionId.toString() === questionId.toString()
    );
    
    if (answeredQuestion) {
      answeredQuestion.remark = answered.remark;
      saveQuiz(quiz);
      // console.log("Updated quiz with answered question:", quiz);
      return true;
    } else {
      quiz.answered.push({questionId, answerId: "", remark: "saved", isCorrect: false});
        saveQuiz(quiz);
        return true;
    }
  }
  return false;
}

const skipQuestion = async ({quizProgressId, questionId}: {quizProgressId: string, questionId: string}) => {
  const response = await fetch(`${backendUrl}/quiz/skipquestion`, {
    method: "POST",
    body: JSON.stringify({ quizProgressId, questionId }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.status === 401) {
    logoutFunction();
    return false;
  }
  const data = await response.json();
  if (data.success) {
    const answered = data.data;
    const quiz = await getQuiz();
    
    // Ensure quiz has the proper structure
    if (!quiz || !quiz.answered) {
      // console.error("Quiz structure is invalid:", quiz);
      return false;
    }
    
    // Find and update the answered question
    const answeredQuestion = quiz.answered.find((answer: answeredType) => 
      answer.questionId.toString() === questionId.toString()
    );
    
    if (answeredQuestion) {
      answeredQuestion.remark = answered.remark;
      saveQuiz(quiz);
      //console.log("Updated quiz with answered question:", quiz);
      return true;
    } else {
      quiz.answered.push({questionId, answerId: "", remark: "skipped", isCorrect: false});
        saveQuiz(quiz);
        return true;  
    }
  }
  return false;
}

const presentQuestion = async ({quizProgressId, questionId}: {quizProgressId: string, questionId: string}) => {
  const response = await fetch(`${backendUrl}/quiz/presentquestion`, {
    method: "POST",
    body: JSON.stringify({ quizProgressId, questionId }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 401) {
    logoutFunction();
    return false;
  }
  const data = await response.json();
  if (data.success) {
    const answered = data.data;
    const quiz = await getQuiz();
    
    // Ensure quiz has the proper structure
    if (!quiz || !quiz.answered) {
      // console.error("Quiz structure is invalid:", quiz);
      return false;
    }
    
    // Find and update the answered question
    const answeredQuestion = quiz.answered.find((answer: answeredType) => 
      answer.questionId.toString() === questionId.toString()
    );
    
    if (answeredQuestion) {
      answeredQuestion.remark = answered.remark;
      saveQuiz(quiz);
      // console.log("Updated quiz with answered question:", quiz);
      return true;
    } else {
      quiz.answered.push({questionId, answerId: "", remark: "presenting", isCorrect: false});
        saveQuiz(quiz);
        return true;
    }
  }
  return false;
}

const submitQuiz = async ({quizProgressId}: {quizProgressId: string}) => {
  const response = await fetch(`${backendUrl}/quiz/submitquiz`, {
    method: "POST",
    body: JSON.stringify({ quizProgressId }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.status === 401) {
    logoutFunction();
    return false;
  }
  const data = await response.json();
  if (data.success) {
    return true;
  }
  return false;
}



export {  getPersonalQuiz, getPersonalQuizChunks, answerQuestion, checkAnswer, saveQuestion, skipQuestion, submitQuiz };