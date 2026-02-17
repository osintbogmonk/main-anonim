import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Регистрация
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Введите логин и пароль" });
    }

    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: "Такой пользователь уже есть" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({ username, passwordHash });

    res.status(201).json({ message: "Пользователь создан", id: user._id });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// Логин
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Неверный логин или пароль" });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(400).json({ message: "Неверный логин или пароль" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "dev_secret",
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

export default router;
