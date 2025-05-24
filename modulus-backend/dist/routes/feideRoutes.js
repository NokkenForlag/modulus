"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.feideRouter = void 0;
const express_1 = require("express");
const authService_1 = require("../services/authService");
const axios_1 = __importDefault(require("axios"));
exports.feideRouter = (0, express_1.Router)();
exports.feideRouter.get("/login", (req, res) => {
    try {
        const redirectURL = (0, authService_1.createLoginRedirectURL)();
        res.redirect(302, redirectURL);
    }
    catch (err) {
        res.status(500).send("❌ Feide setup error: " + err.message);
    }
});
exports.feideRouter.get("/callback", async (req, res) => {
    const code = req.query.code;
    if (!code) {
        res.status(400).send("Missing ?code from Feide");
        return;
    }
    // ✅ Simulert mock-login
    if (code === "mock") {
  const id_token = "test-id-token-123";
  const access_token = "mock-access-token-abc";
  res.redirect(`https://modulus.nokkenforlag.no/auth-bridge.html?id_token=${id_token}&access_token=${access_token}`);
  return;
}
    }
    try {
        const response = await axios_1.default.post(process.env.FEIDE_TOKEN_ENDPOINT, new URLSearchParams({
            grant_type: "authorization_code",
            code: code,
            redirect_uri: process.env.FEIDE_REDIRECT_URI,
            client_id: process.env.FEIDE_CLIENT_ID,
            client_secret: process.env.FEIDE_CLIENT_SECRET
        }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        const { id_token, access_token } = response.data;
        res.json({ id_token, access_token });
    }
    catch (err) {
        console.error("Token exchange failed:", err.response?.data || err.message);
        res.status(500).send("Token exchange failed");
    }
});
