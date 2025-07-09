import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes'; 
import expressWinston from 'express-winston';
import { logger } from './utils/logger';
import { metricsMiddleware } from './metrics';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

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

app.listen(PORT, () => {
  console.log(` API running at http://localhost:${PORT}`);
});



