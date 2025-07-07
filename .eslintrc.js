module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:import/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['import', 'unused-imports'],
  rules: {
    'unused-imports/no-unused-imports': 'warn',
    'import/order': ['warn', { alphabetize: { order: 'asc' } }],
  },
  ignorePatterns: ['dist', 'node_modules'],
};
