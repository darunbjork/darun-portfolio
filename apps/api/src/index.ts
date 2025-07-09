import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// ✅ This is critical
app.use('/api', userRoutes);

app.get('/healthz', (_, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

app.listen(PORT, () => {
  console.log(` API running at http://localhost:${PORT}`);
});