import express from 'express';
import swaggerUi from 'swagger-ui-express';
import userRoutes from './routes/user.routes';
import { swaggerSpec } from './config/swagger';





const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Mount route
app.use('/api', userRoutes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/healthz', (_, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

app.listen(PORT, () => {
  console.log(`🚀 API running at http://localhost:${PORT}`);
});
