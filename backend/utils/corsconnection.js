import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const fronendurl = process.env.FRONTEND_URL;
const corsoptions = {
  origin: fronendurl,
  methods: ["GET"],
  credentials: true,
};
router.use(cors(corsoptions));
export default router;
