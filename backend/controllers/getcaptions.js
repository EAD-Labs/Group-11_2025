import dotenv from "dotenv";
import { spawn } from "cross-spawn";
import { Transcript, Quiz } from "../models/index.js";
import generateQuiz from "./generatequiz.js";
dotenv.config();

export const getCaptions = async (req, res) => {
  const { videoId } = req.params;
  if (!videoId) {
    return res.status(403).json({ error: "Video ID is required" });
  }
  const transcript = await Transcript.findOne({ videoId });
  if (transcript) {
    const quiz = await Quiz.findOne({ transcriptId: transcript._id });
    return res.json({ transcript: transcript.transcript, quiz: quiz });
  }
  // console.log(videoId);
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
      const transcript = json.map((item) => item.text).join(" ");
      const newTranscript = new Transcript({
        transcript,
        videoId,
      });
      await newTranscript.save();
      const quiz = await generateQuiz(transcript);
      console.log("quiz generated");
      console.log(quiz);
      const newQuiz = new Quiz({
        transcriptId: newTranscript._id,
        questions: [...quiz],
      });
      await newQuiz.save();
      res.json({ transcript, quiz: newQuiz });
    } catch (err) {
      res
        .status(500)
        .json({ error: "Failed to parse transcript", details: err.message });
    }
  });
};
