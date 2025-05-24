"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const feideRoutes_1 = require("./routes/feideRoutes");
dotenv_1.default.config();
const app = (0, express_1.default)();
// 🟢 Koble til Feide-router først
app.use("/api/feide", feideRoutes_1.feideRouter);
// 🔁 Eksempel: ping-rute
app.get("/ping", (_, res) => {
    res.send("pong ✅");
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
