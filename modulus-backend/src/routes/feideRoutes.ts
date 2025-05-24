import { Router, Request, Response } from "express";
import { createLoginRedirectURL } from "../services/authService";

export const feideRouter = Router();

feideRouter.get("/login", (req: Request, res: Response) => {
  try {
    const redirectURL = createLoginRedirectURL();
    res.redirect(302, redirectURL);
  } catch (err: any) {
    res.status(500).send("❌ Feide setup error: " + err.message);
  }
});