import express from "express";
import dotenv from "dotenv";
import { feideRouter } from "./routes/feideRoutes";

dotenv.config();

const app = express();

// 🟢 Koble til Feide-router først
app.use("/api/feide", feideRouter);

// 🔁 Eksempel: ping-rute
app.get("/ping", (_, res) => {
  res.send("pong ✅");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});