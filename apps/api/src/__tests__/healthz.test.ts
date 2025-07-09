import * as request from 'supertest';
import * as express from 'express';
import { uptime } from 'process';

const app = express.default();
app.get('/healthz', (_: express.Request, res: express.Response) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime()});
});

describe('GET /healthz', () => {
  it('should return status ok', async () => {
    const res = await request.default(app).get('/healthz');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});
