import { Router, Request, Response } from "express";

export const feideRouter = Router();

feideRouter.get("/login", (req: Request, res: Response) => {
  // Placeholder: Redirect to Feide's auth endpoint (to be implemented)
  res.send("🔐 This will redirect to Feide's login page...");
});