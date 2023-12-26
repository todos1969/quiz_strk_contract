import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";

import authRoutes from "./routes/auth.js";
import quizRoutes from "./routes/quiz.js";
import { createQuiz } from "./controllers/quiz.js";
import { verifyToken } from "./middleware/verify.js";

dotenv.config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());

app.use("/auth", authRoutes);
app.use("/quiz", quizRoutes);
app.post("/quiz/create-quiz", verifyToken, upload.single("image"), createQuiz);

// mongoose setup
const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log("server Port: " + PORT));
  })
  .catch((error) => console.log(error));
