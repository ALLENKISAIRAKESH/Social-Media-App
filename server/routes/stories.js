import express from "express";
import { createStory, getStories } from "../controllers/stories.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, createStory);
router.get("/", verifyToken, getStories);

export default router;
