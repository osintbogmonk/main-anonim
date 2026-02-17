import express from "express";
import Chat from "../models/Chat.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Создать чат или вернуть существующий
router.post("/", authMiddleware, async (req, res) => {
  const { receiverId } = req.body;

  try {
    let chat = await Chat.findOne({
      members: { $all: [req.userId, receiverId] }
    });

    if (!chat) {
      chat = await Chat.create({
        members: [req.userId, receiverId]
      });
    }

    res.json(chat);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Получить все чаты пользователя
router.get("/", authMiddleware, async (req, res) => {
  try {
    const chats = await Chat.find({
      members: { $in: [req.userId] }
    });

    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
