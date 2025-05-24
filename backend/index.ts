import express from "express";
import dotenv from "dotenv";
import { corsMiddleware } from "./cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(corsMiddleware);

app.get("/healthz", (_, res) => {
  res.status(200).send("OK");
});

app.get("/api/ping", (_, res) => {
  res.send("pong ✅");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
