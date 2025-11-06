import { QuestionType } from "./question";
import { answeredType } from "../../../background/quizconnections";

const getQuiz = async (): Promise<{ questions: QuestionType[]; _id: string; answered: answeredType[]; videoId: string; chunkNumber: number[] }> => {
    return new Promise((resolve) => {
      chrome.storage.local.get("quiz", (result) => {
        const quiz = result.quiz || { questions: [], _id: "", answered: [], videoId: "", chunkNumber: [] };
        // console.log("quiz from chromeapis", quiz);
        resolve(quiz);
      });
    });
  };
  


export { getQuiz };