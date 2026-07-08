import express from "express";
import {
  sendMessage,
  getChatHistory,
  getSidebarChats,
} from "../controllers/chatController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/send", authMiddleware, sendMessage);

router.get("/history", authMiddleware, getChatHistory);

// Sidebar recent chats
router.get("/sidebar", authMiddleware, getSidebarChats);

export default router;