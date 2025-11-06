export interface LoginRequest {
    action: "login";
    token: string;
  }
  
  export interface LogoutRequest {
    action: "logout";
  }
  
  export interface GetAuthStatusRequest {
    action: "getAuthStatus";
  }
  
  export interface CheckAuthRequest {
    action: "checkAuth";
  }
  
  export interface GenerateQuizRequest {
    action: "generateQuiz";
    videoId: string;
    num_questions: number;
    context: any;
  }
  
  export interface GetPersonalQuizRequest {
    action: "getPersonalQuiz";
    videoId: string;
    num_questions: number;
    context: any;
    videoTimestamp: number;
  }

  export interface GetPersonalQuizChunksRequest {
    action: "getPersonalQuizChunks";
    videoId: string;
    context: any;
    videoTimestamp: number;
  }

  export interface GetIncompleteQuizVideoIdRequest {
    action: "getIncompleteQuizVideoId";
  }
  
  export interface AnswerQuestionRequest {
    action: "answerQuestion";
    quizProgressId: string;
    questionId: string;
    answerId: string;
  }
  
  export interface CheckAnswerRequest {
    action: "checkAnswer";
    quizProgressId: string;
    questionId: string;
  }
  
  export interface SaveQuestionRequest {
    action: "saveQuestion";
    quizProgressId: string;
    questionId: string;
    answerId: string;
  }
  
  export interface SkipQuestionRequest {
    action: "skipQuestion";
    quizProgressId: string;
    questionId: string;
  }
  
  export interface StartQuizSessionRequest {
    action: "startQuizSession";
    videoId: string;
    startTime: number;
    firstActivity: {type: string, startTime: number, questionId: string};
    quizProgressId: string;
  }
  
  export interface AddActivityRequest {
    action: "addActivity";
    videoId: string;
    userId: string;
    activityType: string;
    activityStartTime: number;
    questionId: string;
    quizProgressId: string;
  }
  
  export interface EndActivityRequest {
    action: "endActivity";
    videoId: string;
    activityType: string;
    activityEndTime: number;
    questionId: string;
  }
  
  export interface EndQuizSessionRequest {
    action: "endQuizSession";
    videoId: string;
    endTime: number;
  }

  export interface GetCurrentTabRequest {
    action: "getCurrentTab";
  }

  export interface SubmitQuizRequest {
    action: "submitQuiz";
    quizProgressId: string;
  }

  export interface SetWarningStateRequest {
    action: "setWarningState";
    warning: boolean;
  }
  
  export interface GetWarningStateRequest {
    action: "getWarningState";
  }
  export interface ReturnToQuizRequest {
    action: "returnToQuiz";
    url: string;
    timestamp: number;
  }
  export interface ReturnToReportRequest {
    action: "returnToReport";
    url: string;
    timestamp: number;
  }

  export interface SaveQuizToBackendRequest {
    action: "saveQuizToBackend";
    url: string;
    timestamp: number;
  }
  export interface SaveQuizToBackendRequest {
    action: "saveQuizToBackend";
    url: string;
    timestamp: number;
  }

  export interface UrlChangedRequest {
    action: "urlChanged";
    url: string;
  }

  export interface FetchIncompleteQuizRequest {
    action: "FetchIncompleteQuiz";
    videoId: string;
  }
  
  export type BackgroundMessage = LoginRequest | LogoutRequest | GetAuthStatusRequest | CheckAuthRequest | GenerateQuizRequest | GetPersonalQuizRequest | GetPersonalQuizChunksRequest | GetIncompleteQuizVideoIdRequest | AnswerQuestionRequest | CheckAnswerRequest | SaveQuestionRequest | SkipQuestionRequest | StartQuizSessionRequest | AddActivityRequest | EndActivityRequest | EndQuizSessionRequest | GetCurrentTabRequest | SubmitQuizRequest | SetWarningStateRequest | GetWarningStateRequest | ReturnToQuizRequest | ReturnToReportRequest | SaveQuizToBackendRequest | SaveQuizToBackendRequest | UrlChangedRequest | FetchIncompleteQuizRequest;
  ;