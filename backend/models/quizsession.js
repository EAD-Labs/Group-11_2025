import mongoose from "mongoose";

const Schema = mongoose.Schema;

const quizSessionSchema = new Schema({
  videoId: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
  },
  totalDuration: {
    type: Number,
  },
  activities: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
      },

      type: {
        type: String,
        enum: ["quiz_taking", "video_viewing"],
        required: true,
      },
      startTime: {
        type: Date,
        required: true,
      },
      endTime: {
        type: Date,
      },
      duration: {
        type: Number,
      },
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
      },
      videoId: {
        type: String,
      },
    },
  ],
});

const QuizSession = mongoose.model("QuizSession", quizSessionSchema);

export default QuizSession;
