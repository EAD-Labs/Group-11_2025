import express from "express";
const router = express.Router();
import { getCaptions } from "../controllers/getcaptions.js";
import { wrapAsync } from "../utils/index.js";

router.post("/:videoId", wrapAsync(getCaptions));

export default router;
