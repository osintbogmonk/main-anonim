const express = require("express");
const cors = require("cors");

const authRoutes = require("./authRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
