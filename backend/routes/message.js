import express from "express";
import Message from "../models/Message.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Отправить сообщение
router.post("/", authMiddleware, async (req, res) => {
  const { chatId, text } = req.body;

  try {
    const message = await Message.create({
      chatId,
      senderId: req.userId,
      text
    });

    res.json(message);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Получить сообщения чата
router.get("/:chatId", authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find({
      chatId: req.params.chatId
    });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
