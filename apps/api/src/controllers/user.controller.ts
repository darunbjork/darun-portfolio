import { Request, Response } from 'express';
import { User } from 'types';
import { CreateUserSchema } from '../validators/user.validator';

export const getUsers = (_req: Request, res: Response) => {
  const users: User[] = [
    {
      id: '1',
      email: 'admin@darun.dev',
      fullName: 'Darun Staff Engineer',
      role: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  res.json(users);
};

export const createUser = (req: Request, res: Response) => {
  const result = CreateUserSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: result.error.format(),
    });
  }

  const { email, fullName } = result.data;

  const newUser: User = {
    id: Date.now().toString(),
    email,
    fullName,
    role: 'user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  res.status(201).json(newUser);
};