import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(3),
  password: z.string().min(6),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;