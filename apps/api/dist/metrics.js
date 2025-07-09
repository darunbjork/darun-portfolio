"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricsMiddleware = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
prom_client_1.default.collectDefaultMetrics();
const metricsMiddleware = async (_req, res) => {
    try {
        const metrics = await prom_client_1.default.register.metrics(); // ✅ await the Promise
        res.setHeader('Content-Type', prom_client_1.default.register.contentType);
        res.send(metrics); // ✅ use .send instead of .end
    }
    catch (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _err) {
        res.status(500).send('Error generating metrics');
    }
};
exports.metricsMiddleware = metricsMiddleware;
