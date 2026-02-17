const express = require("express");
const cors = require("cors");

const authRoutes = require("./authRoutes");
const chatRoutes = require("./chatRoutes"); // ← добавили чаты

const app = express();
app.use(express.json());
app.use(cors());

// Маршруты авторизации
app.use("/auth", authRoutes);

// Маршруты чатов
app.use("/chat", chatRoutes); // ← добавили чаты

app.listen(3000, () => console.log("Server running on port 3000"));
