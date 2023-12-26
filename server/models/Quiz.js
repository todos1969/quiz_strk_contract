import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    questions: {
      type: Array,
      default: [],
    },
    ipfsJson: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", QuizSchema);

export default Quiz;
