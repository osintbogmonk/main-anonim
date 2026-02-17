const express = require("express");
const router = express.Router();
const supabase = require("./supabase");

// Регистрация
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: "Registered", user: data.user });
});

// Логин
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: "Logged in", token: data.session.access_token });
});

module.exports = router;
