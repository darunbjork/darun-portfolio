"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUsers = void 0;
const user_validator_1 = require("../validators/user.validator");
const getUsers = (_req, res) => {
    const users = [
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
exports.getUsers = getUsers;
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
const createUser = (req, res) => {
    // Validate the request body using the schema
    const result = user_validator_1.CreateUserSchema.safeParse(req.body);
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
    const newUser = {
        id: Date.now().toString(),
        email,
        fullName,
        role: 'user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    // Respond with the new user data and a 201 status code
    res.status(201).json(newUser);
};
exports.createUser = createUser;
