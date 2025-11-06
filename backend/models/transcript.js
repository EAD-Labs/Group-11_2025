import mongoose from "mongoose";

const transcriptSchema = new mongoose.Schema({
  transcript: {
    type: String,
    required: true,
  },
  videoId: {
    type: String,
    unique: true,
    index: true,
    required: true,
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
