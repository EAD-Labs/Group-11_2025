import express from "express";
import {
  createQuizSession,
  endQuizSession,
  getAllQuizSession,
  addActivity,
  endActivity,
} from "../controllers/quizsession.js";
import { wrapAsync } from "../utils/index.js";

const router = express.Router();

router.post("/create", wrapAsync(createQuizSession));
router.post("/addActivity", wrapAsync(addActivity));
router.post("/endActivity", wrapAsync(endActivity));
router.post("/endQuizSession", wrapAsync(endQuizSession));
router.get("/getAllQuizSession", wrapAsync(getAllQuizSession));

export default router;
