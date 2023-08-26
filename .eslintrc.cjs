/* eslint-env node */
module.exports = {
  env: {
    browser: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'plugin:storybook/recommended'],
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
