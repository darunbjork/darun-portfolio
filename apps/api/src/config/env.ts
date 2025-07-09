import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

dotenv.config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV === 'staging' ? '.env.staging' : '.env',
  ),
});

const envSchema = z.object({
  PORT: z.string().min(2),
  NODE_ENV: z.enum(['development', 'production', 'staging']),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']),
});

export const ENV = envSchema.parse(process.env);
