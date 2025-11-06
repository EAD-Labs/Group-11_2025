import express from "express";
import getPersonalQuiz from "../controllers/getpersonalquiz.js";
import {
  answerQuestion,
  saveQuestion,
  skipQuestion,
  checkAnswer,
} from "../controllers/answerquestion.js";
import { wrapAsync } from "../utils/index.js";

const router = express.Router();

router.post("/personalquiz/:videoId", wrapAsync(getPersonalQuiz));
router.post("/answerquestion", wrapAsync(answerQuestion));
router.post("/checkanswer", wrapAsync(checkAnswer));
router.post("/savequestion", wrapAsync(saveQuestion));
router.post("/skipquestion", wrapAsync(skipQuestion));

export default router;
