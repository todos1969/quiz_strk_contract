import express from "express";
import {
  getAllQuiz,
  getMyQuiz,
  deleteMyQuiz,
  getQuiz,
} from "../controllers/quiz.js";
import { verifyToken } from "../middleware/verify.js";

const router = express.Router();

router.get("/get-all-quiz", verifyToken, getAllQuiz);
router.get("/get-my-quiz", verifyToken, getMyQuiz);
router.get("/:id", verifyToken, getQuiz);
router.delete("/delete-quiz/:id", verifyToken, deleteMyQuiz);

export default router;
