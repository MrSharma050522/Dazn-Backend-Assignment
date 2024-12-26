module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,  // Since you're using Jest for testing
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-console': 'warn',  // Warning for console.log usage
    'semi': ['error', 'always'],  // Enforce semicolons
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Optionally turn off this rule
  },
};
