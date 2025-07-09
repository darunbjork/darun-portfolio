export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/apps/api'],
  testMatch: ['**/__tests__/**/*.test.ts'],
};