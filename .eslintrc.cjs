/* eslint-env node */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
    // 'airbnb-base',
    // 'airbnb-typescript/base',
    // 'plugin:json/recommended',
    // 'plugin:mdx/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  root: true,
  ignorePatterns: ['.eslintrc.cjs'],
  overrides: [
    {
      files: ['*.js'],
      extends: ['eslint:recommended'],
      parserOptions: {
        ecmaVersion: 10,
      },
    },
  ],
  // rules: {
  //   'import/extensions': [
  //     'error',
  //     'ignorePackages',
  //     {
  //       js: 'never',
  //       jsx: 'never',
  //       ts: 'never',
  //       tsx: 'never',
  //     },
  //   ],
  // },
};
