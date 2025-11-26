import express from "express";
import { createChat, userChats, findChat, addMessage, getMessages } from "../controllers/chat.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, createChat);
router.get("/:userId", verifyToken, userChats);
router.get("/find/:firstId/:secondId", verifyToken, findChat);
router.post("/message", verifyToken, addMessage);
router.get("/message/:chatId", verifyToken, getMessages);

export default router;
