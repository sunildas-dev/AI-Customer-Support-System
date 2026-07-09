import express from "express";
import {
  sendMessage,
  getChatHistory,
  getSidebarChats,
  deleteChat,
} from "../controllers/chatController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/send", authMiddleware, sendMessage);

router.get("/history", authMiddleware, getChatHistory);

// Sidebar recent chats
router.get("/sidebar", authMiddleware, getSidebarChats);
router.delete("/delete/:id", authMiddleware, deleteChat);

export default router;