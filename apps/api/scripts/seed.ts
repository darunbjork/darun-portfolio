import { connectMongo } from '../src/config/mongo';

async function seed() {
  const db = await connectMongo();
  const users = db.collection('users');

  await users.deleteMany({}); // clear old data

  await users.insertMany([
    {
      id: '1',
      email: 'admin@darun.dev',
      fullName: 'Darun Staff Engineer',
      role: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);

  console.log('✅ Seeded DB with 1 user');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
