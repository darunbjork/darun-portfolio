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

/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - fullName
 *             properties:
 *               email:
 *                 type: string
 *               fullName:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */

export const createUser = (req: Request, res: Response) => {
  // Validate the request body using the schema
  const result = CreateUserSchema.safeParse(req.body);

  // If validation fails, return a 400 error with the validation errors
  if (!result.success) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: result.error.format(),
    });
  }

  // Extract the validated data from the result
  const { email, fullName } = result.data;

  // Create a new user object
  const newUser: User = {
    id: Date.now().toString(), // Using Date.now() is generally fine, but consider UUID for better uniqueness
    email,
    fullName,
    role: 'user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Respond with the new user data and a 201 status code
  res.status(201).json(newUser);
};
