module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
    'react-native/react-native': true,
  },
  extends: [
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:promise/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-native/all',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    'import',
    'react',
    'react-native',
    '@typescript-eslint',
    'simple-import-sort',
    'prettier',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: __dirname,
      },
    },
  },
  rules: {
    'import/no-cycle': 'error',
    'react/display-name': 'warn',
    'prettier/prettier': 'error',
    '@typescript-eslint/no-shadow': 'warn',
    'import/default': 'off',
    'react-native/no-raw-text': 'off',
    'react/prop-types': 'off',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'react-native/no-inline-styles': 'warn',
  },
  ignorePatterns: [".eslintrc.js"]
};
