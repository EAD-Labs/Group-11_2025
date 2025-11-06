import { QuizProgress, Quiz, Transcript } from "../models/index.js";
import { apiError } from "../utils/index.js";
import { spawn } from "cross-spawn";
import generateQuiz from "./generatequiz.js";

export const generateGeneralQuiz = async ({
  videoId,
  num_questions,
  title,
  description,
}) => {
  return new Promise(async (resolve, reject) => {
    console.log(videoId);
    if (!videoId) {
      throw new apiError("Video ID is required", 400);
    }
    const transcript = await Transcript.findOne({ videoId });
    if (transcript) {
      console.log("transcript found");
      console.log("generating quiz");
      const quiz = await Quiz.findOne({ transcriptId: transcript._id });
      if (quiz) {
        resolve({ quiz: quiz });
      } else {
        const quiz = await generateQuiz({
          transcript: JSON.stringify(transcript.segments),
          num_questions,
          video_id: videoId,
          title,
          description,
        });
        const newQuiz = new Quiz({
          transcriptId: transcript._id,
          videoId,
          questions: [...quiz],
        });
        await newQuiz.save();
        resolve({ quiz: newQuiz });
      }
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
        const newTranscript = new Transcript({
          segments: json,
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
          videoId,
          questions: [...quiz],
        });
        await newQuiz.save();
        resolve({ quiz: newQuiz });
      } catch (err) {
        reject(new apiError(err.message, 500));
      }
    });
  });
};

const getPersonalQuiz = async (req, res, next) => {
  const { videoId } = req.params;
  console.log("videoId", videoId);
  const { num_questions, title, description } = req.body;
  const { quiz } = await generateGeneralQuiz({
    videoId,
    num_questions,
    title,
    description,
  });
  console.log("quiz", quiz);
  const quizprogress = await QuizProgress.findOne({
    user: req.user._id,
    quiz: quiz._id,
  });
  if (quizprogress) {
    console.log("quizprogress found");
    return res.json({ quiz: quizprogress });
  }
  const questions = quiz.questions;
  const randomQuestions = questions
    .sort(() => Math.random() - 0.5)
    .slice(0, num_questions);
  const sortedQuestions = randomQuestions.sort(
    (a, b) => a.timestamp - b.timestamp
  );
  const quizProgress = new QuizProgress({
    user: req.user._id,
    quiz: quiz._id,
    videoId,
    questions: sortedQuestions,
    answered: [],
    remarks: [],
  });
  console.log("quizProgress", quizProgress);
  await quizProgress.save();
  return res.json({ quiz: quizProgress });
};

export default getPersonalQuiz;
