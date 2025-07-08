import { Request, Response } from 'express';
import { User } from 'types'; // Shared type from packages/types

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
    {
      id: '2',
      email: 'user@darun.dev',
      fullName: 'Darun Junior Dev',
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  res.json(users);
};
