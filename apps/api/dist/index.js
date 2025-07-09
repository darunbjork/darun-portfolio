"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const logger_1 = require("./utils/logger");
const metrics_1 = require("./metrics");
const env_1 = require("./config/env");
console.log(`[] Loaded environment: ${env_1.ENV.NODE_ENV}`);
const app = (0, express_1.default)();
const PORT = env_1.ENV.PORT;
app.use(express_1.default.json());
// Logging example
app.use((req, res, next) => {
    logger_1.logger.info(`Incoming request: ${req.method} ${req.path}`);
    next();
});
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
// Catch errors centrally
app.use((err, req, res, next) => {
    logger_1.logger.error(err.message, { stack: err.stack });
    res.status(500).json({ error: 'Something went wrong' });
});
app.listen(env_1.ENV.PORT, () => {
    logger_1.logger.info(` API running at http://localhost:${env_1.ENV.PORT}`);
});
