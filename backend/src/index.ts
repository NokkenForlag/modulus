import express from "express";
import dotenv from "dotenv";
import { feideRouter } from "./routes/feideRoutes";

dotenv.config();

const app = express();

app.use(express.json());

// Koble til Feide-router
app.use("/api/feide", feideRouter);

// Ping-test
app.get("/ping", (_, res) => {
  res.send("pong ✅");
});

// Fallback for ukjente ruter (må være sist!)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});