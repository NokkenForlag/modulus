import { Router, Request, Response } from "express";
import { createLoginRedirectURL } from "../services/authService";
import axios from "axios";

export const feideRouter = Router();

feideRouter.get("/login", (req: Request, res: Response) => {
  try {
    const redirectURL = createLoginRedirectURL();
    res.redirect(302, redirectURL);
  } catch (err: any) {
    res.status(500).send("❌ Feide setup error: " + err.message);
  }
});

feideRouter.get("/callback", async (req: Request, res: Response): Promise<void> => {
  const code = req.query.code as string;

  if (!code) {
    res.status(400).send("Missing ?code from Feide");
    return;
  }

  // ✅ Simulert mock-login
  if (code === "mock") {
  const id_token = "test-id-token-123";
  const access_token = "mock-access-token-abc";

  const redirectURL = `${process.env.FRONTEND_REDIRECT_URI}?id_token=${id_token}&access_token=${access_token}`;
  res.redirect(302, redirectURL);
  return;
}

  try {
    const response = await axios.post(
      process.env.FEIDE_TOKEN_ENDPOINT!,
      new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.FEIDE_REDIRECT_URI!,
        client_id: process.env.FEIDE_CLIENT_ID!,
        client_secret: process.env.FEIDE_CLIENT_SECRET!
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    const { id_token, access_token } = response.data;
    res.json({ id_token, access_token });

  } catch (err: any) {
    console.error("Token exchange failed:", err.response?.data || err.message);
    res.status(500).send("Token exchange failed");
  }
});