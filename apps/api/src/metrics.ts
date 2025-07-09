import client from 'prom-client';
import { Request, Response } from 'express';

client.collectDefaultMetrics();

export const metricsMiddleware = async (_req:Request, res: Response) => {
  try {
    const metrics = await client.register.metrics(); // ✅ await the Promise
    res.setHeader('Content-Type', client.register.contentType);
    res.send(metrics); // ✅ use .send instead of .end
  } catch (err) {
    res.status(500).send('Error generating metrics');
  }
};