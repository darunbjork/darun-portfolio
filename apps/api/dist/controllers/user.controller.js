export const getUsers = (_req, res) => {
    const users = [
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
