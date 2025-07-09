"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const express_winston_1 = __importDefault(require("express-winston"));
const logger_1 = require("./utils/logger");
const metrics_1 = require("./metrics");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use(express_1.default.json());
app.use(express_winston_1.default.logger({
    winstonInstance: logger_1.logger,
    meta: true,
    msg: '{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorize: false,
}));
app.get('/healthz', (_, res) => {
    res.status(200).json({ status: 'ok', timestamp: Date.now() });
});
app.get('/readyz', (_, res) => {
    const isReady = true; // later: DB, cache, etc.
    res.status(isReady ? 200 : 500).json({ ready: isReady });
});
app.get('/metrics', metrics_1.metricsMiddleware);
// ✅ This is critical
app.use('/api', user_routes_1.default);
app.listen(PORT, () => {
    console.log(` API running at http://localhost:${PORT}`);
});
