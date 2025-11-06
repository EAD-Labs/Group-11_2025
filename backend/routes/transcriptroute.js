import express from "express";
const router = express.Router();
import { getCaptions } from "../controllers/getcaptions.js";
import { wrapasync } from "../utils/index.js";

router.get("/:videoId", wrapasync(getCaptions));

export default router;
