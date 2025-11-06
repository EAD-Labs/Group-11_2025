import { QuizSession } from "../models/index.js";

const createQuizSession = async (req, res) => {
  const { videoId, startTime, firstActivity } = req.body;
  const userId = req.user._id;
  const quizSession = new QuizSession({
    videoId,
    userId,
    startTime: new Date(startTime),
    activities: [],
  });
  let activity;
  if (firstActivity.type === "quiz_taking") {
    quizSession.activities.push({
      type: firstActivity.type,
      startTime: new Date(firstActivity.startTime),
      questionId: firstActivity.questionId,
    });
    activity = quizSession.activities[quizSession.activities.length - 1];
  } else if (firstActivity.type === "video_viewing") {
    quizSession.activities.push({
      type: firstActivity.type,
      startTime: new Date(firstActivity.startTime),
    });
    activity = quizSession.activities[quizSession.activities.length - 1];
  }

  await quizSession.save();
  res.status(201).json({
    data: { quizSession: quizSession, activity: activity },
    success: true,
  });
};

const addActivity = async (req, res) => {
  const {
    videoId,
    activityType,
    activityStartTime,
    questionId,
    quizSessionId,
  } = req.body;
  const userId = req.user._id;
  const quizSession = await QuizSession.findOne({ _id: quizSessionId, userId });

  let activity;
  if (activityType === "quiz_taking") {
    quizSession.activities.push({
      type: activityType,
      startTime: activityStartTime,
      questionId: questionId, // Fixed: added questionId for quiz_taking
    });
    activity = quizSession.activities[quizSession.activities.length - 1];
  } else if (activityType === "video_viewing") {
    quizSession.activities.push({
      type: activityType,
      startTime: activityStartTime,
      videoId: videoId,
    });
    activity = quizSession.activities[quizSession.activities.length - 1];
  }

  await quizSession.save();
  res.status(200).json({ data: activity, success: true });
};

const endActivity = async (req, res) => {
  const { endTime, activityId, quizSessionId } = req.body;
  const userId = req.user._id;
  const quizSession = await QuizSession.findOne({ _id: quizSessionId, userId });
  const activity = quizSession.activities.find(
    (activity) => activity._id.toString() === activityId
  );
  activity.endTime = new Date(endTime);
  activity.duration = Number(new Date(endTime) - new Date(activity.startTime));
  await quizSession.save();
  res.status(200).json({ data: quizSession, success: true });
};

const endQuizSession = async (req, res) => {
  const { endTime, quizSessionId, activityId } = req.body;
  console.log("req.body in endQuizSession", req.body);
  const userId = req.user._id;
  const quizSession = await QuizSession.findOne({ _id: quizSessionId, userId });
  const activity = quizSession.activities.find(
    (activity) => activity._id.toString() === activityId
  );
  activity.endTime = new Date(endTime);
  activity.duration = Number(new Date(endTime) - new Date(activity.startTime));
  quizSession.endTime = new Date(endTime);
  quizSession.totalDuration = Number(
    new Date(endTime) - new Date(quizSession.startTime)
  );
  await quizSession.save();
  res.status(200).json({ data: quizSession, success: true });
};

const getAllQuizSession = async (req, res) => {
  const userId = req.user._id;
  const quizSessions = await QuizSession.find({ userId });
  res.status(200).json({ data: quizSessions, success: true });
};

export {
  createQuizSession,
  endQuizSession,
  getAllQuizSession,
  addActivity,
  endActivity,
};
