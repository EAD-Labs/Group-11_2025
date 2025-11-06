import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const fronendurl = process.env.FRONTEND_URL;
const extentionurl = process.env.EXTENTION_URL;
const corsoptions = {
  origin: [extentionurl, fronendurl, "https://www.youtube.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
router.use(cors(corsoptions));
export default router;
