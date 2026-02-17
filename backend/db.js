import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://lorenzorenaissance_db_user:mainanonim2026@cluster0.nrqjc6m.mongodb.net/?appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB error:", err));

