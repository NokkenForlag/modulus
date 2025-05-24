import { feideRouter } from "./routes/feideRoutes";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/ping", (_, res) => {
  res.send("pong ✅");
  app.use("/api/feide", feideRouter);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});