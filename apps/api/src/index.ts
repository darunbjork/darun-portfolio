import express from 'express';
import userRoutes from './routes/user.routes'; 
import { logger } from './utils/logger';
import { metricsMiddleware } from './metrics';
import { ENV } from './config/env';

console.log(`[] Loaded environment: ${ENV.NODE_ENV}`);

const app = express();

app.use(express.json());

// Logging example
app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.path}`);
  next();
});

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

// Catch errors centrally
app.use((err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error(err.message, { stack: err.stack });
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(ENV.PORT, () => {
  logger.info(` API running at http://localhost:${ENV.PORT}`);
});