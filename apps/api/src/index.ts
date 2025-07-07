import express from 'express';

const app = express();
const PORT = process.env.PORT || 4000;

app.get('/healthz', (_, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

app.listen(PORT, () => {
  console.log(`🚀 API running at http://localhost:${PORT}`);
});
