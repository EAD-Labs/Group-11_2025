import mongoose from "mongoose";

const transcriptSchema = new mongoose.Schema({
  //here
  segments: {
    type: [
      {
        text: String,
        start: Number,
        duration: Number,
      },
    ],
    required: true,
    default: [],
  },
  videoId: {
    type: String,
    unique: true,
    index: true,
    required: true,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Transcript = mongoose.model("Transcript", transcriptSchema);

export default Transcript;
