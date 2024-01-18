"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.static("dist"));
app.use("/static", express_1.default.static(path_1.default.join(__dirname, "dist")));
app.get("/*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "app", "index.html"));
});
const { PORT = 3040, DEV_HOST = "localhost" } = process.env || 3040;
app.listen(PORT, DEV_HOST, () => {
    console.log(`App up and runing on PORT http://${DEV_HOST}:${PORT}`);
});
