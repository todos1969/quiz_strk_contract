import express from "express";
import { login, getUser } from "../controllers/auth.js";
import { verifyToken } from "../middleware/verify.js";

const router = express.Router();

router.post("/login", login);
router.get("/getUser", verifyToken, getUser);

export default router;
