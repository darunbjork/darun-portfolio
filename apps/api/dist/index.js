"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use(express_1.default.json());
// ✅ This is critical
app.use('/api', user_routes_1.default);
app.get('/healthz', (_, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() });
});
app.listen(PORT, () => {
    console.log(` API running at http://localhost:${PORT}`);
});
