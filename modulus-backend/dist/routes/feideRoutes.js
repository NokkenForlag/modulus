"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feideRouter = void 0;
const express_1 = require("express");
const authService_1 = require("../services/authService");
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
