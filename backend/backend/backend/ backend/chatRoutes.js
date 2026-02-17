const express = require("express");
const router = express.Router();
const supabase = require("./supabase");

// Создать чат
router.post("/create", async (req, res) => {
  const { name } = req.body;

  const { data, error } = await supabase
    .from("chats")
    .insert([{ name }])
    .select();

  if (error) return res.status(400).json({ error: error.message });

  res.json(data[0]);
});

// Получить список чатов
router.get("/list", async (req, res) => {
  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});

// Получить сообщения чата
router.get("/:chat_id/messages", async (req, res) => {
  const chat_id = req.params.chat_id;

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chat_id)
    .order("created_at", { ascending: true });

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
});

// Отправить сообщение
router.post("/:chat_id/send", async (req, res) => {
  const chat_id = req.params.chat_id;
  const { user_id, text } = req.body;

  const { data, error } = await supabase
    .from("messages")
    .insert([{ chat_id, user_id, text }])
    .select();

  if (error) return res.status(400).json({ error: error.message });

  res.json(data[0]);
});

module.exports = router;
