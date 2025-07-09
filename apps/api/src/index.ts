import express from 'express';
import userRoutes from './routes/user.routes'; 
import expressWinston from 'express-winston';
import { logger } from './utils/logger';
import { metricsMiddleware } from './metrics';
import { ENV } from '../config/env';

console.log(`[] Loaded environment: ${ENV.NODE_ENV}`);

const app = express();
const PORT = ENV.PORT;

app.use(express.json());

app.use(
  expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    msg: '{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorize: false,
  }),
);

app.get('/healthz', (_, res) => {
  res.status(200).json({ status: 'ok', timestamp: Date.now() });
});

app.get('/readyz', (_, res) => {
  const isReady = true; // later: DB, cache, etc.
  res.status(isReady ? 200 : 500).json({ ready: isReady });
});

app.get('/metrics', metricsMiddleware);

// ✅ This is critical
app.use('/api', userRoutes);

app.listen(ENV.PORT, () => {
  console.log(` API running at http://localhost:${ENV.PORT}`);
});



