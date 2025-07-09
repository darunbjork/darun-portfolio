import request from 'supertest';
import express from 'express';
import userRoutes from '../routes/user.routes';

const app = express();
app.use(express.json());
app.use('/api', userRoutes);

describe('User Routes', () => {
  it('GET /api/users should return 200', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
