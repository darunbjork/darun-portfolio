import request from 'supertest';
import express from 'express';
import { uptime } from 'process';

const app = express();
app.get('/healthz', (_, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime()});
});

describe('GET /healthz', () => {
  it('should return status ok', async () => {
    const res = await request(app).get('/healthz');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});
