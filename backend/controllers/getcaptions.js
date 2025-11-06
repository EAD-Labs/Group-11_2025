import dotenv from "dotenv";
import { spawn } from "cross-spawn";
import { Transcript, Quiz } from "../models/index.js";
import apiError from "../utils/apierror.js";
import generateQuiz from "./generatequiz.js";
dotenv.config();

export const getCaptions = async (req, res, next) => {
  const { videoId } = req.params;
  const { num_questions, title = "", description = "" } = req.body;
  console.log(req.body);
  console.log(videoId);
  if (!videoId) {
    return res.status(403).json({ error: "Video ID is required" });
  }
  const transcript = await Transcript.findOne({ videoId });
  if (transcript) {
    console.log("transcript found");
    const quiz = await Quiz.findOne({ transcriptId: transcript._id });
    return res.json({ transcript: transcript, quiz: quiz });
  }
  // console.log(videoId);
  console.log("Generating transcript");
  const process = spawn("python3", ["controllers/thing.py", videoId]);
  let output = "";

  process.stdout.on("data", (data) => {
    output += data.toString();
  });

  process.stderr.on("data", (data) => {
    // Optionally handle errors from Python
    console.error(`stderr: ${data}`);
  });

  process.on("close", async (code) => {
    try {
      const json = JSON.parse(output);
      console.log("transcript generated");
      const transcript = json.map((item) => item.text).join(" ");
      const newTranscript = new Transcript({
        transcript,
        videoId,
        title,
        description,
      });
      await newTranscript.save();
      console.log("Generating quiz");
      const transcriptString = JSON.stringify(json);
      const quiz = await generateQuiz({
        transcript: transcriptString,
        num_questions,
        video_id: videoId,
        title,
        description,
      });
      console.log("quiz generated");
      console.log(quiz);
      const newQuiz = new Quiz({
        transcriptId: newTranscript._id,
        questions: [...quiz],
      });
      await newQuiz.save();
      res.json({ transcript: newTranscript, quiz: newQuiz });
    } catch (err) {
      next(new apiError(err.message, 500));
    }
  });
};
