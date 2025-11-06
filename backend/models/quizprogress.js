import mongoose from "mongoose";

const quizProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  videoId: {
    type: String,
    required: true,
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  questions: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
      },
      question: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Number,
        required: true,
      },
      options: [
        {
          _id: {
            type: mongoose.Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId(),
          },
          option: {
            type: String,
            required: true,
          },
          isCorrect: {
            type: Boolean,
            required: true,
          },
        },
      ],
    },
  ],
  answered: [
    {
      questionId: {
        type: String,
        required: true,
      },
      answerId: {
        type: String,
      },
      remark: {
        type: String,
        enum: ["answered", "skipped", "saved", "presented"],
        required: true,
      },
      isCorrect: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

const QuizProgress = mongoose.model("QuizProgress", quizProgressSchema);

export default QuizProgress;
