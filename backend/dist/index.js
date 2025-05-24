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
app.use(express_1.default.json());
// Koble til Feide-router
app.use("/api/feide", feideRoutes_1.feideRouter);
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
