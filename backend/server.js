const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./authRoutes");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://...твой_коннект...", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use("/auth", authRoutes);

app.listen(3000, () => console.log("Server running"));
