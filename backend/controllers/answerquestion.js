import { QuizProgress } from "../models/index.js";
import { apiError } from "../utils/index.js";

const answerQuestion = async (req, res, next) => {
  const { quizProgressId, questionId, answerId } = req.body;
  const quizProgress = await QuizProgress.findById(quizProgressId);
  if (!quizProgress) {
    return next(new apiError("Quiz progress not found", 404));
  }
  if (quizProgress.user.toString() !== req.user._id.toString()) {
    return next(new apiError("Unauthorized", 401));
  }
  const question = quizProgress.questions.find(
    (question) => question._id.toString() === questionId.toString()
  );
  if (!question) {
    return next(new apiError("Question not found", 404));
  }
  const answer = question.options.find(
    (answer) => answer._id.toString() === answerId.toString()
  );

  if (!answer) {
    return next(new apiError("Answer not found", 404));
  }
  const existingAnswer = quizProgress.answered.find(
    (answer) => answer.questionId.toString() === questionId.toString()
  );
  if (existingAnswer) {
    if (
      existingAnswer.remark === "presented" ||
      existingAnswer.remark === "answered"
    ) {
      return next(new apiError("Answer already exists", 400));
    }
    existingAnswer.remark = "presented";
    existingAnswer.answerId = answerId;
    existingAnswer.isCorrect = answer.isCorrect;
    await quizProgress.save();
    return res.status(200).json({
      success: true,
      data: existingAnswer,
    });
  }
  const answered = {
    questionId: questionId,
    answerId: answerId,
    remark: "presented",
    isCorrect: answer.isCorrect,
  };
  quizProgress.answered.push(answered);
  await quizProgress.save();
  res.status(200).json({
    success: true,
    data: answered,
  });
};

const checkAnswer = async (req, res, next) => {
  const { quizProgressId, questionId } = req.body;
  const quizProgress = await QuizProgress.findById(quizProgressId);
  if (!quizProgress) {
    return next(new apiError("Quiz progress not found", 404));
  }
  const question = quizProgress.questions.find(
    (question) => question._id.toString() === questionId.toString()
  );
  if (!question) {
    return next(new apiError("Question not found", 404));
  }
  const answered = quizProgress.answered.find(
    (answer) => answer.questionId.toString() === questionId.toString()
  );
  if (!answered) {
    return next(new apiError("Answer not found", 404));
  }
  answered.remark = "answered";
  await quizProgress.save();
  res.status(200).json({
    success: true,
    data: answered,
  });
};

const skipQuestion = async (req, res, next) => {
  const { quizProgressId, questionId } = req.body;
  const quizProgress = await QuizProgress.findById(quizProgressId);
  if (!quizProgress) {
    return next(new apiError("Quiz progress not found", 404));
  }
  if (quizProgress.user.toString() !== req.user._id.toString()) {
    return next(new apiError("Unauthorized", 401));
  }
  const question = quizProgress.questions.find(
    (question) => question._id.toString() === questionId.toString()
  );
  if (!question) {
    return next(new apiError("Question not found", 404));
  }
  const existingAnswer = quizProgress.answered.find(
    (answer) => answer.questionId.toString() === questionId.toString()
  );
  if (existingAnswer) {
    if (
      existingAnswer.remark === "presented" ||
      existingAnswer.remark === "answered"
    ) {
      return next(new apiError("Answer already exists", 400));
    }
    existingAnswer.remark = "skipped";
    existingAnswer.isCorrect = false;
    await quizProgress.save();
    return res.status(200).json({
      success: true,
      data: existingAnswer,
    });
  }
  quizProgress.answered.push({
    questionId: questionId,
    remark: "skipped",
    isCorrect: false,
  });
  await quizProgress.save();
  res.status(200).json({
    success: true,
  });
};

const saveQuestion = async (req, res, next) => {
  const { quizProgressId, questionId } = req.body;
  const quizProgress = await QuizProgress.findById(quizProgressId);
  if (!quizProgress) {
    return next(new apiError("Quiz progress not found", 404));
  }
  if (quizProgress.user.toString() !== req.user._id.toString()) {
    return next(new apiError("Unauthorized", 401));
  }
  const question = quizProgress.questions.find(
    (question) => question._id.toString() === questionId.toString()
  );
  if (!question) {
    return next(new apiError("Question not found", 404));
  }
  const existingAnswer = quizProgress.answered.find(
    (answer) => answer.questionId.toString() === questionId.toString()
  );
  if (existingAnswer) {
    if (
      existingAnswer.remark === "presented" ||
      existingAnswer.remark === "answered"
    ) {
      return next(new apiError("Answer already exists", 400));
    }
    existingAnswer.remark = "saved";
    existingAnswer.isCorrect = false;
    await quizProgress.save();
    return res.status(200).json({
      success: true,
      data: existingAnswer,
    });
  }
  quizProgress.answered.push({
    questionId: questionId,
    remark: "saved",
    isCorrect: false,
  });
  await quizProgress.save();
  res.status(200).json({
    success: true,
  });
};

export { answerQuestion, saveQuestion, skipQuestion, checkAnswer };
