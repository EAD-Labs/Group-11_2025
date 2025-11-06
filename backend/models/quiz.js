import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  transcriptId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transcript",
    required: true,
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      options: [
        {
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
